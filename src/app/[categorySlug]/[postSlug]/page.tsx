import { PostBreadcrumb } from '@/app/[categorySlug]/[postSlug]/PostBreadcrumb';
import { PostBody } from '@/components/PostBody';
import { PageHeader } from '@/components/PostHeader';
import { Profile } from '@/components/Profile';
import { TableOfContent } from '@/components/TableOofContent';
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

export async function generateStaticParams() {
  return [
    {
      slug: 'blog',
    },
  ];
}

export default async function PostPage({ params }: Props) {
  const post = allPosts.find(post => {
    return post._raw.flattenedPath === decodeURI(params.postSlug);
  });

  const profile = await getGithubProfile({ author: post?.author ?? '' });

  return (
    <>
      <main className="flex flex-col gap-4 md:gap-10 p-2 md:p-6 w-full min-w-0">
        <PostBreadcrumb
          categoryUrl={params.categorySlug}
          postUrl={join(params.categorySlug, params.postSlug)}
          postTitle={post?.title}
        />
        <div className="flex flex-col gap-4 md:gap-5">
          <PageHeader title={post?.title ?? ''} />
          <div className="flex gap-8 items-end justify-between">
            <a target="_blank" href={`https://github.com/${post?.author}`}>
              <Profile avartar={profile.avatar_url} name={profile.name} bio={profile.bio} />
            </a>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] md:text-xs text-gray-400 dark:text-gray-600">{`Updated on ${new Date(
                post?.date ?? ''
              ).toDateString()}`}</span>
            </div>
          </div>
        </div>
        <PostBody content={post?.body.code ?? ''} />
      </main>
      <TableOfContent title={post?.title} headings={post?.headings ?? []} />
    </>
  );
}

async function getGithubProfile({ author }: { author: string }) {
  if (process.env.NODE_ENV === 'development') {
    return {
      avatar_url: 'https://avatars.githubusercontent.com/u/32444953?v=4',
      name: 'Kiwi',
      bio: 'Frontend Developer',
    };
  }

  const res = await fetch(`https://api.github.com/users/${author}`);
  const data = await res.json();

  return data;
}
