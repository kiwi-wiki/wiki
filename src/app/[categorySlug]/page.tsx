import { PostCard } from '@/components/PostCard';
import { findPostsByCategory } from '@/lib/api';
import { classifyByFirstLetter } from '@/utils/misc';

interface Props {
  params: {
    categorySlug: string;
  };
}

export default function CategoryPage({ params }: Props) {
  const posts = findPostsByCategory({
    category: decodeURI(params.categorySlug),
    fields: ['title', 'slug', 'description', 'coverImage', 'excerpt', 'date'],
  });

  const classifiedPosts = classifyByFirstLetter(posts);

  return (
    <div className="mt-10 ">
      {Object.entries(classifiedPosts).map(([letter, posts]) => (
        <div key={letter}>
          <div className="flex items-center gap-3">
            <div className="font-bold text-gray-300">{letter}</div>
            <div className="flex-1 border-b border-gray-200"></div>
          </div>
          <div className="mt-3 mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {posts.map(post => (
              <PostCard
                key={post.slug}
                href={`/posts/${post.slug}`}
                title={post.title}
                description={post.description}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
