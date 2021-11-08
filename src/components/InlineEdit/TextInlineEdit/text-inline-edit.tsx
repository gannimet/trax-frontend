import { CheckOutlined, CloseOutlined, FormOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import React, { BaseSyntheticEvent, useEffect, useRef, useState } from 'react';
import { useClickOutside } from '../../../hooks/use-click-outside';
import './text-inline-edit.scss';
import { TextInlineEditProps } from './text-inline-edit.types';

const TextInlineEdit = React.memo<TextInlineEditProps>(
  ({
    onCancel,
    onSubmit,
    value,
    children,
    className,
    isNumeric = false,
    allowEdits = true,
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(value);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, [isEditing]);

    useClickOutside(containerRef, () => {
      setIsEditing(false);
    });

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

    const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape') {
        onCancelEdit();
      } else if (e.key === 'Enter') {
        onSubmitEdit();
      }
    };

    const renderDisplayMode = () => {
      return allowEdits ? (
        <Space className={className}>
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => setIsEditing(true)}
          >
            {children ? children : value}
          </span>
          <Button
            icon={<FormOutlined />}
            size="small"
            onClick={() => setIsEditing(true)}
          />
        </Space>
      ) : (
        <>{children ? children : value}</>
      );
    };

    const renderEditMode = () => {
      return (
        <span
          ref={containerRef}
          className={`inline-editing-container ${className}`}
        >
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
      );
    };

    return isEditing ? renderEditMode() : renderDisplayMode();
  },
);

TextInlineEdit.displayName = 'TextInlineEdit';

export default TextInlineEdit;
