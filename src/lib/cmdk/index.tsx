import { Command } from 'cmdk';
import { useEffect, useRef, useState } from 'react';
import './cmdk.css';

interface CommandMenuProps {
  open: boolean;
  onOpenChange: () => void;
}

export const CommandMenu = ({ open, onOpenChange }: CommandMenuProps) => {
  const ref = useRef(null);

  const [search, setSearch] = useState('');
  const [pages, setPages] = useState([]);
  const page = pages[pages.length - 1];

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange();
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [onOpenChange]);

  return (
    <Command.Dialog open={open} onOpenChange={onOpenChange} label="Global Command Menu">
      <Command.Input value={search} onValueChange={setSearch} placeholder="Search documentation" />
      <Command.List>
        {!page && (
          <>
            <Command.Item onSelect={() => setPages([...pages, 'projects'])}>Search projects…</Command.Item>
            <Command.Item onSelect={() => setPages([...pages, 'teams'])}>Join a team…</Command.Item>
          </>
        )}

        {page === 'projects' && (
          <>
            <Command.Item>Project A</Command.Item>
            <Command.Item>Project B</Command.Item>
          </>
        )}

        {page === 'teams' && (
          <>
            <Command.Item>Team 1</Command.Item>
            <Command.Item>Team 2</Command.Item>
          </>
        )}
      </Command.List>
    </Command.Dialog>
  );
};
