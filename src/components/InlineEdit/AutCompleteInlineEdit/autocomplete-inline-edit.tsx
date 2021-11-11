import { AutoComplete } from 'antd';
import React, { useEffect, useState } from 'react';
import BaseInlineEdit from '../base-inline-edit';
import './autocomplete-inline-edit.scss';
import { AutoCompleteInlineEditProps } from './autocomplete-inline-edit.types';

const { Option } = AutoComplete;

function AutoCompleteInlineEdit<V extends { id: string } | string>({
  onSubmit,
  getOptionView,
  getFilteredOptions,
  value,
  children,
  className,
  allowEdits,
}: AutoCompleteInlineEditProps<V>) {
  const [autoCompleteOptions, setAutoCompleteOptions] = useState<V[]>([]);

  useEffect(() => {
    handleSearch('');

    return () => {
      // Used to suppress error message on page load
      setAutoCompleteOptions([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onStartEditing = () => {
    console.log('on start editing');
  };

  const onCancelEdit = () => {
    console.log('on cancel');
  };

  const onSubmitEdit = () => {
    if (!onSubmit) {
      return;
    }

    // TODO implement
  };

  const handleSearch = (searchValue: string) => {
    getFilteredOptions(searchValue).then(setAutoCompleteOptions);
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
    return (
      <AutoComplete
        style={{ width: 'calc(100% - 67px)' }}
        onSearch={handleSearch}
      >
        {autoCompleteOptions.map((option) => {
          return (
            <Option
              key={typeof option === 'string' ? option : option.id}
              value={typeof option === 'string' ? option : option.id}
            >
              {renderOptionView(option)}
            </Option>
          );
        })}
      </AutoComplete>
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
