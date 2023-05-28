import { PostBreadcrumb } from '@/app/[categorySlug]/[postSlug]/PostBreadcrumb';
import { PostBody } from '@/components/PostBody';
import { PostHeader } from '@/components/PostHeader';
import Profile from '@/components/Profile';
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

  const profile = await getGithubProfile({ author: post?.author ?? '' });

  return (
    <div className="flex p-4">
      <div className="flex flex-col gap-10 w-full">
        <PostBreadcrumb
          categoryUrl={params.categorySlug}
          postUrl={join(params.categorySlug, params.postSlug)}
          postTitle={post?.title}
        />
        <div className="flex flex-col gap-5">
          <PostHeader title={post?.title ?? ''} />
          <div className="flex gap-8 items-center">
            <a target="_blank" href={`https://github.com/${post?.author}`}>
              <Profile avartar={profile.avatar_url} name={profile.name} bio={profile.bio} />
            </a>
            <div className="flex flex-col gap-2">
              <span className="text-xs text-gray-400">{new Date(post?.date ?? '').toDateString()}</span>
            </div>
          </div>
        </div>
        <PostBody content={post?.body.code ?? ''} />
      </div>
      <div className="w-64" />
    </div>
  );
}

async function getGithubProfile({ author }: { author: string }) {
  const res = await fetch(`https://api.github.com/users/${author}`);
  const data = await res.json();

  return data;
}
