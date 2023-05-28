import { PostCard } from '@/components/PostCard';
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
    <div className="flex">
      <div className="w-full h-full">
        <div className="flex flex-col gap-10">
          <h1 className="font-bold text-3xl">{decodeURI(params.categorySlug)}</h1>
          {Object.entries(classifiedPosts).map(([letter, posts]) => (
            <div key={letter}>
              <div className="flex items-center gap-3">
                <div className="font-bold text-gray-300">{letter}</div>
                <div className="flex-1 border-b border-gray-200"></div>
              </div>
              <div className="mt-3 mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
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
      </div>
      <div className="w-60" />
    </div>
  );
}
