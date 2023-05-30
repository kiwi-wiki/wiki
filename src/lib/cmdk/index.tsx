import { getNavigationRoutes } from '@/utils/navigation';
import { Command, useCommandState } from 'cmdk';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BiCategoryAlt } from 'react-icons/bi';
import './cmdk.css';

interface CommandMenuProps {
  open: boolean;
  onOpenChange: () => void;
}

export function CommandMenu({ open, onOpenChange }: CommandMenuProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inputValue, setInputValue] = useState('');

  const [pages, setPages] = useState<string[]>(['home']);
  const activePage = pages[pages.length - 1];
  const isHome = activePage === 'home';

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
    <Command.Dialog open={open} onOpenChange={onOpenChange} ref={ref} onKeyDown={onKeyDown}>
      <div className="input-wrapper flex gap-2 items-center">
        <Command.Input
          autoFocus
          placeholder="카테고리나 키워드를 검색해보세요"
          onValueChange={value => {
            setInputValue(value);
          }}
        />
        <button className="kbd">ESC</button>
      </div>
      <div className="p-2">
        <Command.List>
          <Command.Empty>
            <b>{inputValue}</b>
            <span>에 대한 검색 결과가 없습니다</span>
          </Command.Empty>
          {activePage === 'home' && <Home searchProjects={() => setPages([...pages, 'projects'])} />}
          {activePage === 'projects' && <Projects />}
        </Command.List>
      </div>
    </Command.Dialog>
  );
}

function Home({ searchProjects }: { searchProjects: Function }) {
  const routes = getNavigationRoutes();

  return (
    <>
      {routes.map(route => (
        <Command.Item key={route.href} onSelect={() => searchProjects()}>
          <BiCategoryAlt size={20} />
          {route.name}
        </Command.Item>
      ))}
      <SubItem />
    </>
  );
}

function SubItem() {
  const search = useCommandState(state => state.search);
  if (!search) return null;
  return <Command.Item>proj</Command.Item>;
}

function Projects() {
  return (
    <>
      <Command.Item>Project 1</Command.Item>
      <Command.Item>Project 2</Command.Item>
      <Command.Item>Project 3</Command.Item>
      <Command.Item>Project 4</Command.Item>
      <Command.Item>Project 5</Command.Item>
      <Command.Item>Project 6</Command.Item>
      <Command.Item>Project 4</Command.Item>
      <Command.Item>Project 5</Command.Item>
      <Command.Item>Project 6</Command.Item>
      <Command.Item>Project 4</Command.Item>
      <Command.Item>Project 5</Command.Item>
      <Command.Item>Project 6</Command.Item>
    </>
  );
}
