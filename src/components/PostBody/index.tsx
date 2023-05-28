'use client';

import { Pre } from '@/components/mdx/Pre';
import classNames from 'classnames';
import { MDXComponents } from 'mdx/types';
import { useMDXComponent } from 'next-contentlayer/hooks';
import postStyle from './post.module.css';

interface Props {
  content: string;
}

const compoenents: MDXComponents = {
  pre: ({ children, ...props }) => {
    return <Pre {...props}>{children}</Pre>;
  },
};

export function PostBody({ content }: Props) {
  const MDXContent = useMDXComponent(content);

  return (
    <div className={classNames('max-w-2xl text-lg leading-relaxed text-gray-600', postStyle.markdown)}>
      <MDXContent components={compoenents} />
    </div>
  );
}
