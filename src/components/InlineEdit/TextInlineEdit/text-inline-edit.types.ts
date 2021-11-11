import React from 'react';

export interface TextInlineEditProps<V> {
  onSubmit?(value: V | null | undefined): void;
  value: V | null | undefined;
  children?: React.ReactNode;
  className?: string;
  isNumeric?: boolean;
  allowEdits?: boolean;
}
