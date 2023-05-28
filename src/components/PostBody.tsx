'use client';

import { Pre } from '@/components/mdx/Pre';
import postStyles from '@/styles/post.module.css';
import classNames from 'classnames';
import { MDXComponents } from 'mdx/types';
import { useMDXComponent } from 'next-contentlayer/hooks';

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
    <div className={classNames('max-w-2xl text-lg leading-relaxed text-gray-600', postStyles.markdown)}>
      <MDXContent components={compoenents} />
    </div>
  );
}
