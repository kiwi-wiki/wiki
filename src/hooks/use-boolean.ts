import { useCallback, useMemo, useState } from 'react';

export function useBoolean(
  initialValue: boolean = false
): [boolean, { toggle: () => void; setTrue: () => void; setFalse: () => void }] {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback(() => setValue(!value), [value]);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  const actions = useMemo(() => {
    return { toggle, setTrue, setFalse };
  }, [setFalse, setTrue, toggle]);

  return [value, actions];
}
