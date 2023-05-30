import { CategoryItems } from '@/components/CommandMenu/CategoryItems';
import { CommandEmpty } from '@/components/CommandMenu/CommandEmpty';
import { CommandMenuBreadcrumb } from '@/components/CommandMenu/CommandMenuBreadcrumb';
import { CommandMenuProvider } from '@/components/CommandMenu/CommandMenuContext';
import { CommandMenuFooter } from '@/components/CommandMenu/CommandMenuFooter';
import { HomeItems } from '@/components/CommandMenu/HomeItems';
import { Command } from 'cmdk';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import './cmdk.css';

interface CommandMenuProps {
  open: boolean;
  onOpenChange: () => void;
}

export function CommandMenu({ open, onOpenChange }: CommandMenuProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inputValue, setInputValue] = useState('');

  const [pages, setPages] = useState<string[]>(['Home']);
  const currentPage = pages[pages.length - 1];
  const isHome = currentPage === 'Home';

  const popPage = useCallback(() => {
    setPages(pages => {
      const x = [...pages];
      x.splice(-1, 1);
      return x;
    });
  }, []);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (isHome || inputValue.length) {
        return;
      }

      if (e.key === 'Backspace') {
        e.preventDefault();
        popPage();
      }
    },
    [inputValue.length, isHome, popPage]
  );

  const handlePageChange = useCallback(
    (page: string) => {
      setPages(pages => [...pages, page]);
    },
    [setPages]
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange();
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [onOpenChange, popPage]);

  return (
    <CommandMenuProvider pages={pages} onOpenChange={onOpenChange}>
      <Command.Dialog open={open} onOpenChange={onOpenChange} ref={ref} onKeyDown={onKeyDown}>
        <CommandMenuBreadcrumb />
        <div className="input-wrapper flex gap-2 items-center">
          <Command.Input autoFocus placeholder="카테고리나 키워드를 검색해보세요" onValueChange={setInputValue} />
          <button className="kbd" onClick={onOpenChange}>
            ESC
          </button>
        </div>
        <Command.Separator alwaysRender />
        <div className="p-2">
          <Command.List>
            {isHome && <HomeItems searchProjects={handlePageChange} />}
            {!isHome && <CategoryItems />}
            <CommandEmpty />
          </Command.List>
        </div>
        <Command.Separator alwaysRender />
        <CommandMenuFooter />
      </Command.Dialog>
    </CommandMenuProvider>
  );
}
