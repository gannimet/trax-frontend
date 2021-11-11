import React from 'react';

export interface AutoCompleteInlineEditProps<V> {
  onSubmit?(value: V): void;
  getOptionView?(item: V): React.ReactNode;
  getFilteredOptions(searchValue: string): Promise<V[]>;
  options?: V[];
  value: V;
  children?: React.ReactNode;
  className?: string;
  allowEdits?: boolean;
}
