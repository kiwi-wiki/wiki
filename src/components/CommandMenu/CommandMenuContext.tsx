import { createContext, useContext, useMemo } from 'react';

interface CommandMenuContextValue {
  pages: string[];
  currentPage: string;
}

interface CommandMenuActionsContextValue {
  onOpenChange: () => void;
}

const CommandMenuContext = createContext<CommandMenuContextValue | null>(null);
const CommandMenuActionsContext = createContext<CommandMenuActionsContextValue | null>(null);

interface CommandMenuProviderProps {
  children: React.ReactNode;
  pages: string[];
  onOpenChange: () => void;
}

export function CommandMenuProvider({ children, onOpenChange, pages }: CommandMenuProviderProps) {
  const currentPage = pages[pages.length - 1];

  const actions = useMemo(() => {
    return { onOpenChange };
  }, [onOpenChange]);

  const value = useMemo(() => {
    return { pages, currentPage };
  }, [currentPage, pages]);

  return (
    <CommandMenuActionsContext.Provider value={actions}>
      <CommandMenuContext.Provider value={value}>{children}</CommandMenuContext.Provider>
    </CommandMenuActionsContext.Provider>
  );
}

export function useCommandMenu() {
  const value = useContext(CommandMenuContext);
  if (!value) {
    throw new Error('useCommandMenu must be used within a CommandMenuProvider');
  }
  return value;
}

export function useCommandMenuActions() {
  const actions = useContext(CommandMenuActionsContext);
  if (!actions) {
    throw new Error('useCommandMenuActions must be used within a CommandMenuProvider');
  }
  return actions;
}
