import { CheckOutlined, CloseOutlined, FormOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useClickOutside } from '../../hooks/use-click-outside';
import { BaseInlineEditProps } from './TextInlineEdit/base-inline-edit.types';

const BaseInlineEdit = React.memo<BaseInlineEditProps>(
  ({
    value,
    children,
    allowEdits = true,
    editingView,
    className,
    onCancel,
    onSubmit,
    onStartEditing,
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useClickOutside(containerRef, () => {
      setIsEditing(false);
    });

    useEffect(() => {
      onStartEditing && onStartEditing();
    }, [onStartEditing, isEditing]);

    const onCancelEdit = () => {
      setIsEditing(false);
      onCancel && onCancel();
    };

    const onSubmitEdit = () => {
      setIsEditing(false);
      onSubmit && onSubmit();
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
        <div
          ref={containerRef}
          onKeyUp={onKeyUp}
          className={`inline-editing-container ${className}`}
        >
          {editingView}
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
        </div>
      );
    };

    return isEditing ? renderEditMode() : renderDisplayMode();
  },
);

BaseInlineEdit.displayName = 'BaseInlineEdit';

export default BaseInlineEdit;
