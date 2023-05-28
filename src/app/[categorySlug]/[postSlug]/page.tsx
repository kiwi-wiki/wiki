import { PostBreadcrumb } from '@/app/[categorySlug]/[postSlug]/PostBreadcrumb';
import { PostBody } from '@/components/PostBody';
import { PostHeader } from '@/components/PostHeader';
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
  const post = allPosts.find(post => {
    return post._raw.flattenedPath === decodeURI(params.postSlug);
  });

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
      <div className="flex flex-col gap-10 w-full">
        <PostBreadcrumb
          categoryUrl={params.categorySlug}
          postUrl={join(params.categorySlug, params.postSlug)}
          postTitle={post?.title}
        />
        <PostHeader title={post?.title ?? ''} />
        <PostBody content={post?.body.code ?? ''} />
      </div>
      <div className="w-64" />
    </div>
  );
}
