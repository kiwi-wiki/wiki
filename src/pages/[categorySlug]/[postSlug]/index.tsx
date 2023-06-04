import { PostBody } from '@/components/PostBody';
import { PostBreadcrumb } from '@/components/PostBreadcrumb';
import { PageHeader } from '@/components/PostHeader';
import { Profile } from '@/components/Profile';
import { TableOfContent } from '@/components/TableOofContent';
import { allPosts } from 'contentlayer/generated';
import { GetStaticPaths, GetStaticProps } from 'next';
import { join } from 'path';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = allPosts.map(post => {
    const categorySlug = post.category;
    const postSlug = post._raw.flattenedPath;
    return {
      params: {
        categorySlug,
        postSlug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postSlug = params?.postSlug as string;
  const post = allPosts.find(post => {
    return post._raw.flattenedPath === decodeURI(postSlug);
  });

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

  const profile = await getGithubProfile({ author: post?.author ?? '' });

  return {
    props: {
      params,
      profile,
    },
  };
};

interface Props {
  params: {
    categorySlug: string;
    postSlug: string;
  };
  profile: {
    avatar_url: string;
    name: string;
    bio: string;
  };
}

export default function PostPage({ params, profile }: Props) {
  const postSlug = params?.postSlug as string;
  const post = allPosts.find(post => {
    return post._raw.flattenedPath === decodeURI(postSlug);
  });

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
