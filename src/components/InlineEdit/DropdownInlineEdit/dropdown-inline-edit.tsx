import { Select } from 'antd';
import React, { useRef, useState } from 'react';
import BaseInlineEdit from '../base-inline-edit';
import { DropdownInlineEditProps } from './dropdown-inline-edit.types';

function DropdownInlineEdit<V extends { id: string } | string>({
  onSubmit,
  onCancel,
  onStartEditing,
  getOptionView,
  getLabelValue,
  placeholder,
  value,
  options,
  children,
  className,
  allowEdits,
}: DropdownInlineEditProps<V>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    undefined,
  );

  const handleStartEditing = () => {
    onStartEditing && onStartEditing();
  };

  const onCancelEdit = () => {
    setSelectedValue(getAtomicValue(value));

    onCancel && onCancel();
  };

  const onSubmitEdit = () => {
    if (!onSubmit || !selectedValue) {
      return;
    }

    onSubmit(selectedValue);
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

  const getAtomicValue = (item: V | null): string | undefined => {
    if (item == null) {
      return undefined;
    }

    if (typeof item === 'string') {
      return item;
    }

    return item.id;
  };

  const getLabelValueForItem = (item: V): string => {
    if (getLabelValue) {
      return getLabelValue(item);
    }

    if (typeof item === 'string') {
      return item;
    }

    return item.id;
  };

  const renderEditingView = () => {
    return (
      <Select
        ref={inputRef}
        value={getAtomicValue(value)}
        optionLabelProp="label"
        placeholder={placeholder}
        style={{ width: 'calc(100% - 67px)' }}
        onChange={setSelectedValue}
      >
        {options.map((item) => {
          return (
            <Select.Option
              key={getAtomicValue(item)}
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              value={getAtomicValue(item)!}
              label={getLabelValueForItem(item)}
            >
              {renderOptionView(item)}
            </Select.Option>
          );
        })}
      </Select>
    );
  };

  return (
    <BaseInlineEdit
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

DropdownInlineEdit.displayName = 'DropdownInlineEdit';

export default React.memo(DropdownInlineEdit) as typeof DropdownInlineEdit;
