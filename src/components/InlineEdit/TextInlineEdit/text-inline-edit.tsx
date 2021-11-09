import { Input } from 'antd';
import React, { BaseSyntheticEvent, useRef, useState } from 'react';
import BaseInlineEdit from '../base-inline-edit';
import './text-inline-edit.scss';
import { TextInlineEditProps } from './text-inline-edit.types';

const TextInlineEdit = React.memo<TextInlineEditProps>(
  ({
    onSubmit,
    value,
    children,
    className,
    isNumeric = false,
    allowEdits = true,
  }) => {
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

          if (parsedValue !== value) {
            onSubmit(parsedValue);
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
            defaultValue={inputValue as string}
            onChange={onInputChange}
            type={isNumeric ? 'number' : 'text'}
            pattern={isNumeric ? '^[0-9]*$' : undefined}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            ref={inputRef}
          />
        }
      >
        {children}
      </BaseInlineEdit>
    );
  },
);

TextInlineEdit.displayName = 'TextInlineEdit';

export default TextInlineEdit;
