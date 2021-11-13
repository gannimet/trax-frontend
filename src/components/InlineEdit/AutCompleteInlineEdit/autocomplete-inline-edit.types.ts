import React from 'react';

export interface AutoCompleteInlineEditProps<
  V extends { id: string } | string,
> {
  onSubmit?(itemId: string | null): void;
  getOptionView?(item: V): React.ReactNode;
  getDisplayValue?(item: V): string;
  getFilteredOptions(searchValue: string): Promise<V[]>;
  value: V | null;
  children?: React.ReactNode;
  className?: string;
  allowEdits?: boolean;
}
