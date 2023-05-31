import { HeadingLevel } from '@/types/dom.type';
import { useCallback, useEffect, useRef, useState } from 'react';

interface UseHeadingObserverProps {
  levels?: HeadingLevel[];
}

export function useHeadingObserver({ levels = [1, 2, 3, 4, 5, 6] }: UseHeadingObserverProps = {}) {
  const observer = useRef<IntersectionObserver>();
  const [activeId, setActiveId] = useState('');

  const handleObsever = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      if (entry.isIntersecting) {
        setActiveId(id ?? '');
      }
    });
  }, []);

  useEffect(() => {
    const target = document.querySelectorAll(levels.map(level => `h${level}[id]`).join(', '));

    observer.current = new IntersectionObserver(handleObsever, {
      rootMargin: '-20% 0px -35% 0px',
      threshold: 0.5,
    });

    target.forEach(element => observer.current?.observe(element));

    return () => observer.current?.disconnect();
  }, [handleObsever, levels]);

  return { activeId };
}
