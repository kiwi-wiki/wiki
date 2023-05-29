import { getValidChildren } from '@/utils/react';
import { cloneElement, forwardRef } from 'react';

interface BreadCrumbProps extends React.HTMLAttributes<HTMLElement> {
  seperator?: React.ReactNode;
}

export const Breadcrumb = forwardRef<HTMLElement, BreadCrumbProps>((props, ref) => {
  const { children, seperator = '/' } = props;

  const validChildren = getValidChildren(children);

  const clone = validChildren.map((child, index) =>
    cloneElement(child, {
      seperator,
      isLastChild: index === validChildren.length - 1,
    })
  );

  return (
    <nav ref={ref} className="flex text-xs md:text-sm items-center gap-1.5">
      {clone}
    </nav>
  );
});

Breadcrumb.displayName = 'Breadcrumb';
