import type { Post } from '@/types/post.type';
import { generateFinder, getFileContents, makeAbsolutePath } from '@/utils/file';
import matter from 'gray-matter';

const contentDir = makeAbsolutePath('content');

export function findPost({ slug, fields = [] }: { slug: string; fields: string[] }) {
  const fullPath = makeAbsolutePath('content', `${slug}.md`);
  const fileContents = getFileContents(fullPath);
  const { data, content } = matter(fileContents);

  const post: Post = {
    title: data.title,
  };

  fields.forEach(field => {
    if (field === 'slug') {
      post[field] = slug;
    }
    if (field === 'content') {
      post[field] = content;
    }

    if (typeof data[field] !== 'undefined') {
      post[field] = data[field];
    }
  });

  return post;
}

type GetPostsParams = {
  fields: string[];
};

export function findPosts({ fields = [] }: GetPostsParams) {
  const findMarkdownFiles = generateFinder({ target: contentDir, ext: 'md' });
  const markdownFiles = findMarkdownFiles();
  const posts = markdownFiles.map(file => findPost({ slug: file.slug, fields }));

  return posts;
}

export function findPostsByCategory({ category, fields = [] }: { category: string; fields: string[] }) {
  fields.push('category');
  const posts = findPosts({ fields });
  const filteredPosts = posts.filter(post => post.category === category);
  filteredPosts.sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1));

  return filteredPosts;
}

/**
 * content 폴더 내의 모든 마크다운 파일의 카테고리를 찾아서 반환
 */
export function findCategories() {
  const posts = findPosts({ fields: ['category'] });
  const categories = posts.map(post => post.category).filter(category => !!category);
  const uniqueCategories = [...new Set(categories)].sort((a, b) => (a.toLowerCase() > b.toLowerCase() ? 1 : -1));

  return uniqueCategories;
}
