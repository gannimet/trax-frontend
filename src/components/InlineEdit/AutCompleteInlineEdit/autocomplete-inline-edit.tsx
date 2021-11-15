import { AutoComplete } from 'antd';
import React, { Key, useEffect, useRef, useState } from 'react';
import BaseInlineEdit from '../base-inline-edit';
import './autocomplete-inline-edit.scss';
import { AutoCompleteInlineEditProps } from './autocomplete-inline-edit.types';

function AutoCompleteInlineEdit<V extends { id: string } | string>({
  onSubmit,
  getOptionView,
  getFilteredOptions,
  getDisplayValue,
  value,
  children,
  className,
  allowEdits,
}: AutoCompleteInlineEditProps<V>) {
  const [autoCompleteOptions, setAutoCompleteOptions] = useState<V[]>([]);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    handleSearch('');

    setSelectedValue(null);

    return () => {
      // Used to suppress error message on page load
      setAutoCompleteOptions([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onStartEditing = () => {
    setSelectedValue(null);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const onCancelEdit = () => {
    setAutoCompleteOptions([]);
  };

  const onSubmitEdit = () => {
    if (!onSubmit) {
      return;
    }

    onSubmit(selectedValue);
  };

  const handleSearch = (searchValue: string) => {
    getFilteredOptions(searchValue).then(setAutoCompleteOptions);

    if (searchValue === '') {
      setSelectedValue(null);
    }
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
      return getOptionView(item);
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
        allowClear
        backfill={true}
        placeholder="Type to serach …"
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
      onStartEditing={onStartEditing}
      editingView={renderEditingView()}
    >
      {children}
    </BaseInlineEdit>
  );
}

AutoCompleteInlineEdit.displayName = 'AutoCompleteInlineEdit';

export default React.memo(
  AutoCompleteInlineEdit,
) as typeof AutoCompleteInlineEdit;
