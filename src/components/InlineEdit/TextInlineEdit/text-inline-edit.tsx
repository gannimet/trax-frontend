import { Input } from 'antd';
import React, { BaseSyntheticEvent, useRef, useState } from 'react';
import BaseInlineEdit from '../base-inline-edit';
import { TextInlineEditProps } from './text-inline-edit.types';

function TextInlineEdit<V>({
  onSubmit,
  value,
  children,
  className,
  isNumeric = false,
  allowEdits = true,
}: TextInlineEditProps<V>) {
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  const onInputChange = (e: BaseSyntheticEvent) => {
    setInputValue(e.target.value);
  };

  const onStartEditing = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const onCancelEdit = () => {
    setInputValue(value);
  };

  const onSubmitEdit = () => {
    if (!onSubmit) {
      return;
    }

    if (inputValue == null) {
      onSubmit(null);

      return;
    }

    if (isNumeric) {
      if (typeof inputValue === 'string') {
        const parsedValue = parseFloat(inputValue);

        if (Number(parsedValue) !== Number(value)) {
          onSubmit(parsedValue as unknown as V);
        }

        return;
      }
    }

    if (inputValue !== value) {
      onSubmit(inputValue);
    }
  };

  return (
    <BaseInlineEdit
      allowEdits={allowEdits}
      value={value}
      className={className}
      onCancel={onCancelEdit}
      onSubmit={onSubmitEdit}
      onStartEditing={onStartEditing}
      editingView={
        <Input
          defaultValue={inputValue as unknown as string}
          onChange={onInputChange}
          type={isNumeric ? 'number' : 'text'}
          pattern={isNumeric ? '^[0-9]*$' : undefined}
          style={{ width: 'calc(100% - 67px)' }}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ref={inputRef}
        />
      }
    >
      {children}
    </BaseInlineEdit>
  );
}

TextInlineEdit.displayName = 'TextInlineEdit';

export default React.memo(TextInlineEdit) as typeof TextInlineEdit;
