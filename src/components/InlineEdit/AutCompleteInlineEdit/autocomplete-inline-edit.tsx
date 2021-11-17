import { AutoComplete } from 'antd';
import React, { Key, useEffect, useRef, useState } from 'react';
import { useCache } from '../../../hooks/use-cache';
import BaseInlineEdit from '../base-inline-edit';
import './autocomplete-inline-edit.scss';
import { AutoCompleteInlineEditProps } from './autocomplete-inline-edit.types';

function AutoCompleteInlineEdit<V extends { id: string } | string>({
  onSubmit,
  onStartEditing,
  onCancel,
  getOptionView,
  getFilteredOptions,
  getDisplayValue,
  value,
  children,
  className,
  allowEdits,
  placeholder = 'Type to search …',
}: AutoCompleteInlineEditProps<V>) {
  const [autoCompleteOptions, setAutoCompleteOptions] = useState<V[]>([]);
  const [getOptionsCacheItem, setOptionsCacheItem, clearOptionsCache] =
    useCache<V[]>();
  const [getViewCacheItem, setViewCacheItem, clearViewCache] =
    useCache<React.ReactNode>();
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    undefined,
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    handleSearch('');
    setSelectedValue(undefined);

    return () => {
      // Used to suppress error message on page load
      setAutoCompleteOptions([]);
      clearOptionsCache();
      clearViewCache();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStartEditing = () => {
    clearOptionsCache();
    clearViewCache();
    setSelectedValue(undefined);

    if (inputRef.current) {
      inputRef.current.focus();
    }

    onStartEditing && onStartEditing();
  };

  const onCancelEdit = () => {
    setAutoCompleteOptions([]);

    onCancel && onCancel();
  };

  const onSubmitEdit = () => {
    if (!onSubmit || !selectedValue) {
      return;
    }

    onSubmit(selectedValue);
  };

  const handleSearch = (searchValue: string) => {
    const cacheItem = getOptionsCacheItem(searchValue);

    if (cacheItem) {
      setAutoCompleteOptions(cacheItem);
    } else {
      getFilteredOptions(searchValue).then((options) => {
        setAutoCompleteOptions(options);
        setOptionsCacheItem(searchValue, options);
      });
    }

    setSelectedValue(undefined);
  };

  const onSelectOption = (value: string, option: { key?: Key }) => {
    setSelectedValue(option.key as string);
  };

  const getDisplayValueFromOption = (item: V) => {
    if (getDisplayValue) {
      return getDisplayValue(item);
    }

    if (typeof item === 'string') {
      return item;
    }

    return item.id;
  };

  const renderOptionView = (item: V) => {
    if (getOptionView) {
      const cacheKey = typeof item === 'string' ? item : item.id;
      const cacheValue = getViewCacheItem(cacheKey);

      if (cacheValue) {
        return cacheValue;
      } else {
        const optionView = getOptionView(item);
        setViewCacheItem(cacheKey, optionView);

        return optionView;
      }
    }

    if (typeof item === 'string') {
      return item;
    }

    return item.id;
  };

  const renderEditingView = () => {
    const options = autoCompleteOptions.map((option) => {
      return {
        key: typeof option === 'string' ? option : option.id,
        value: getDisplayValueFromOption(option),
        label: renderOptionView(option),
      };
    });

    return (
      <AutoComplete
        ref={inputRef}
        style={{ width: 'calc(100% - 67px)' }}
        onSearch={handleSearch}
        options={options}
        onSelect={onSelectOption}
        backfill={true}
        placeholder={placeholder}
      />
    );
  };

  return (
    <BaseInlineEdit<V>
      allowEdits={allowEdits}
      value={value}
      className={className}
      onCancel={onCancelEdit}
      onSubmit={onSubmitEdit}
      onStartEditing={handleStartEditing}
      editingView={renderEditingView()}
      submittable={!!selectedValue}
    >
      {children}
    </BaseInlineEdit>
  );
}

AutoCompleteInlineEdit.displayName = 'AutoCompleteInlineEdit';

export default React.memo(
  AutoCompleteInlineEdit,
) as typeof AutoCompleteInlineEdit;
