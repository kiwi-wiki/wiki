import { PostBody } from '@/components/PostBody';
import { makeTitle } from '@/utils/metadata';
import { allPosts } from 'contentlayer/generated';
import type { Metadata } from 'next';

import { join } from 'path';

interface Props {
  params: {
    categorySlug: string;
    postSlug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = allPosts.find(post => post._raw.flattenedPath === join(params.categorySlug, params.postSlug));

  return {
    title: makeTitle({ title: post?.title ?? '' }),
  };
}

export default async function PostPage({ params }: Props) {
  const post = allPosts.find(post => {
    return post._raw.flattenedPath === decodeURI(params.postSlug);
  });

  return (
    <div className="flex p-4">
      <div>
        <PostBody content={post?.body.code ?? ''} />
      </div>
      <div className="w-64" />
    </div>
  );
}
