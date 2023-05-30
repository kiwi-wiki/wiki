import { CommandItem, useCommandState } from 'cmdk';

export function SubItems() {
  const search = useCommandState(state => state.search);
  if (!search) return null;
  return (
    <>
      <CommandItem>proj</CommandItem>
      <CommandItem>asdf</CommandItem>
      <CommandItem>proj2</CommandItem>
    </>
  );
}
