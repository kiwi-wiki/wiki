'use client';

import { Pre } from '@/components/mdx/Pre';
import postStyles from '@/styles/post.module.css';
import classNames from 'classnames';
import { MDXComponents } from 'mdx/types';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { useRef } from 'react';

interface Props {
  content: string;
}

const compoenents: MDXComponents = {
  pre: ({ children, ...props }) => {
    return <Pre {...props}>{children}</Pre>;
  },
};

export function PostBody({ content }: Props) {
  const ref = useRef<HTMLElement>(null);
  const MDXContent = useMDXComponent(content);
  console.log('🚀 ~ file: PostBody.tsx:22 ~ PostBody ~ ref:', ref.current);

  return (
    <article
      className={classNames('w-full select-none text-lg leading-relaxed text-gray-600', postStyles.markdown)}
      ref={ref}
    >
      <MDXContent components={compoenents} />
    </article>
  );
}
