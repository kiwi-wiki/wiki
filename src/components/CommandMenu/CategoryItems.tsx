import { useCommandMenu, useCommandMenuActions } from '@/components/CommandMenu/CommandMenuContext';
import { findPostsByCategory } from '@/lib/api';

import { CommandItem } from 'cmdk';
import type { Post } from 'contentlayer/generated';
import { useRouter } from 'next/navigation';
import { join } from 'path';
import { useCallback } from 'react';
import { RxFileText } from 'react-icons/rx';

export function CategoryItems() {
  const { currentPage } = useCommandMenu();
  const { onOpenChange } = useCommandMenuActions();
  const router = useRouter();
  const posts = findPostsByCategory(currentPage);

  const handleSelect = useCallback(
    (post: Post) => {
      onOpenChange();
      router.push(join(currentPage, post._raw.flattenedPath));
    },
    [currentPage, onOpenChange, router]
  );

  return (
    <>
      {posts.map(post => (
        <CommandItem key={post._id} onSelect={() => handleSelect(post)}>
          <RxFileText size={20} className="shrink-0" />
          <span>{post.title}</span>
        </CommandItem>
      ))}
    </>
  );
}
