export interface DropdownInlineEditProps<V extends { id: string } | string> {
  onSubmit?(itemId: string): void;
}
