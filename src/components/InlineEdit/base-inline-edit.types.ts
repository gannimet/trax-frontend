import React from 'react';

export interface BaseInlineEditProps<V> {
  allowEdits?: boolean;
  editingView: React.ReactNode;
  children: React.ReactNode;
  value: V | null | undefined;
  className?: string;
  submittable?: boolean;
  onCancel?(): void;
  onSubmit?(): void;
  onStartEditing?(): void;
}
