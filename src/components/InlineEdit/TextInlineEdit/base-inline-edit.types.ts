import React from 'react';
import { ValueType } from './text-inline-edit.types';

export interface BaseInlineEditProps {
  allowEdits?: boolean;
  editingView: React.ReactNode;
  children: React.ReactNode;
  value: ValueType;
  className?: string;
  onCancel?(): void;
  onSubmit?(): void;
  onStartEditing?(): void;
}
