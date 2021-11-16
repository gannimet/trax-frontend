import { CheckOutlined, CloseOutlined, FormOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useClickOutside } from '../../hooks/use-click-outside';
import { BaseInlineEditProps } from './base-inline-edit.types';

function BaseInlineEdit<V>({
  value,
  children,
  allowEdits = true,
  editingView,
  className,
  submittable = true,
  onCancel,
  onSubmit,
  onStartEditing,
}: BaseInlineEditProps<V>) {
  const [isEditing, setIsEditing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => {
    onCancelEdit();
  });

  useEffect(() => {
    if (onStartEditing && isEditing) {
      onStartEditing();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing]);

  const onCancelEdit = () => {
    setIsEditing(false);
    onCancel && onCancel();
  };

  const onSubmitEdit = () => {
    if (submittable) {
      setIsEditing(false);
      onSubmit && onSubmit();
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
        <span style={{ cursor: 'pointer' }} onClick={() => setIsEditing(true)}>
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
          disabled={!submittable}
          onClick={onSubmitEdit}
        />
      </div>
    );
  };

  return isEditing ? renderEditMode() : renderDisplayMode();
}

BaseInlineEdit.displayName = 'BaseInlineEdit';

export default React.memo(BaseInlineEdit) as typeof BaseInlineEdit;
