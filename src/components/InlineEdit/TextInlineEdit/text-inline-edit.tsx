import { CheckOutlined, CloseOutlined, FormOutlined } from '@ant-design/icons';
import { Button, Input, InputNumber, Space } from 'antd';
import React, { BaseSyntheticEvent, useState } from 'react';
import './text-inline-edit.scss';
import { TextInlineEditProps } from './text-inline-edit.types';

const TextInlineEdit = React.memo<TextInlineEditProps>(
  ({ onCancel, onSubmit, value, children, className, isNumeric = false }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(value);

    const onInputChange = (e: BaseSyntheticEvent) => {
      setInputValue(e.target.value);
    };

    const onInputNumberChange = (n: number) => {
      console.log('new value:', n);
      setInputValue(n);
    };

    const cancelClicked = () => {
      setInputValue(value);
      setIsEditing(false);
      onCancel && onCancel();
    };

    const submitClicked = () => {
      setIsEditing(false);
      onSubmit && onSubmit(inputValue);
    };

    return isEditing ? (
      <span className={`inline-editing-container ${className}`}>
        {isNumeric ? (
          <InputNumber
            type="number"
            min={0}
            max={100}
            defaultValue={inputValue as number}
            onChange={onInputNumberChange}
          />
        ) : (
          <Input defaultValue={inputValue as string} onChange={onInputChange} />
        )}
        <Button
          icon={<CloseOutlined />}
          type="default"
          onClick={cancelClicked}
        />
        <Button
          icon={<CheckOutlined />}
          type="primary"
          onClick={submitClicked}
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
