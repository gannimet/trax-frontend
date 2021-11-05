import { CheckOutlined, CloseOutlined, FormOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import React, { BaseSyntheticEvent, useEffect, useRef, useState } from 'react';
import './text-inline-edit.scss';
import { TextInlineEditProps } from './text-inline-edit.types';

const TextInlineEdit = React.memo<TextInlineEditProps>(
  ({ onCancel, onSubmit, value, children, className, isNumeric = false }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(value);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, [isEditing]);

    const onInputChange = (e: BaseSyntheticEvent) => {
      setInputValue(e.target.value);
    };

    const onCancelEdit = () => {
      setInputValue(value);
      setIsEditing(false);
      onCancel && onCancel();
    };

    const onSubmitEdit = () => {
      setIsEditing(false);

      if (!onSubmit) {
        return;
      }

      if (inputValue == null) {
        onSubmit(null);

        return;
      }

      if (isNumeric) {
        if (typeof inputValue === 'string') {
          onSubmit(parseFloat(inputValue));

          return;
        }
      }

      onSubmit(inputValue);
    };

    const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape') {
        onCancelEdit();
      } else if (e.key === 'Enter') {
        onSubmitEdit();
      }
    };

    return isEditing ? (
      <span className={`inline-editing-container ${className}`}>
        <Input
          defaultValue={inputValue as string}
          onChange={onInputChange}
          type={isNumeric ? 'number' : 'text'}
          pattern={isNumeric ? '^[0-9]*$' : undefined}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ref={inputRef}
          onKeyUp={onKeyUp}
        />
        <Button
          icon={<CloseOutlined />}
          type="default"
          onClick={onCancelEdit}
        />
        <Button
          icon={<CheckOutlined />}
          type="primary"
          onClick={onSubmitEdit}
        />
      </span>
    ) : (
      <Space className={className}>
        <span style={{ cursor: 'pointer' }} onClick={() => setIsEditing(true)}>
          {children ? children : value}
        </span>
        <Button
          icon={<FormOutlined />}
          size="small"
          onClick={() => setIsEditing(true)}
        />
      </Space>
    );
  },
);

TextInlineEdit.displayName = 'TextInlineEdit';

export default TextInlineEdit;
