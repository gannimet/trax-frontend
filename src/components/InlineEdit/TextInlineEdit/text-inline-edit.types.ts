import React from 'react';

type ValueType = string | number | undefined | null;

export interface TextInlineEditProps {
  onCancel?(): void;
  onSubmit?(value: ValueType): void;
  value: ValueType;
  children?: React.ReactNode;
  className?: string;
  isNumeric?: boolean;
}
