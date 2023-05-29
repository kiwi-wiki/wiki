import { CategoryBreadcrumb } from '@/app/[categorySlug]/CategoryBreadcrumb';
import { Divider } from '@/components/Divider';
import { PostCard } from '@/components/PostCard';
import { PageHeader } from '@/components/PostHeader';
import { findPostsByCategory } from '@/lib/api';
import { makeTitle } from '@/utils/metadata';
import { classifyByFirstLetter } from '@/utils/misc';
import type { Metadata } from 'next';
import { join } from 'path';

interface Props {
  params: {
    categorySlug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: makeTitle({ title: params.categorySlug }),
  };
}

export default function CategoryPage({ params }: Props) {
  const posts = findPostsByCategory(decodeURI(params.categorySlug));
  const classifiedPosts = classifyByFirstLetter(posts);

  return (
    <main className="flex flex-col gap-4 md:gap-10 w-full h-full p-2 md:p-4 max-w-3xl">
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
