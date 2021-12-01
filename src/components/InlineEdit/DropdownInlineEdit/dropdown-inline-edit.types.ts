export interface DropdownInlineEditProps<V extends { id: string } | string> {
  onSubmit?(itemId: string): void;
  onCancel?(): void;
  onStartEditing?(): void;
  getOptionView?(item: V): React.ReactNode;
  getLabelValue?(item: V): string;
  placeholder?: string;
  value: V | null;
  options: V[];
  children?: React.ReactNode;
  className?: string;
  allowEdits?: boolean;
}
