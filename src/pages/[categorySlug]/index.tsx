import { CategoryBreadcrumb } from '@/components/CategoryBreadcrumb';
import { Divider } from '@/components/Divider';
import { PostCard } from '@/components/PostCard';
import { PageHeader } from '@/components/PostHeader';
import { findCategories, findPostsByCategory } from '@/lib/api';
import { classifyByFirstLetter } from '@/utils/misc';
import type { Post } from 'contentlayer/generated';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { join } from 'path';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = findCategories().map(category => ({
    params: {
      categorySlug: category,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const categorySlug = params?.categorySlug as string;
  const posts = findPostsByCategory(decodeURI(categorySlug));
  const classifiedPosts = classifyByFirstLetter(posts);

  return {
    props: {
      classifiedPosts,
      params,
    },
  };
};

interface Props {
  classifiedPosts: {
    [key: string]: Post[];
  };
  params: {
    categorySlug: string;
  };
}

export default function CategoryPage({ classifiedPosts, params }: Props) {
  return (
    <main className="flex flex-col gap-4 md:gap-10 w-full h-full p-2 md:p-6 max-w-3xl">
      <CategoryBreadcrumb categoryUrl={params.categorySlug} />
      <div className="w-full flex flex-col gap-4 md:gap-10">
        <PageHeader title={decodeURI(params.categorySlug)} />
        {Object.entries(classifiedPosts).map(([letter, posts]) => (
          <div key={letter} className="w-full">
            <div className="w-full flex items-center gap-3 text-xs md:text-base">
              <div className="font-bold text-gray-300 dark:text-gray-600">{letter}</div>
              <Divider />
            </div>
            <div className="mt-3 mb-4 md:mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {posts.map(post => (
                <PostCard
                  key={post._raw.flattenedPath}
                  href={join(params.categorySlug, post._raw.flattenedPath)}
                  title={post.title}
                  description={post.description}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
