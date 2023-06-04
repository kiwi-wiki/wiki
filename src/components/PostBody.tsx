import { Pre } from '@/components/mdx/Pre';
import postStyles from '@/styles/post.module.css';
import classNames from 'classnames';
import { MDXComponents } from 'mdx/types';
import { getMDXComponent } from 'next-contentlayer/hooks';

interface Props {
  content: string;
}

const compoenents: MDXComponents = {
  pre: ({ children, ...props }) => {
    return <Pre {...props}>{children}</Pre>;
  },
};

export function PostBody({ content }: Props) {
  const MDXContent = getMDXComponent(content);

  return (
    <article className={classNames('w-full select-none text-lg leading-relaxed text-gray-600', postStyles.markdown)}>
      <MDXContent components={compoenents} />
    </article>
  );
}
