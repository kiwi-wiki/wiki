import { generateFinder, getFileContents, makeAbsolutePath } from '@/utils/file';
import matter from 'gray-matter';

const contentDir = makeAbsolutePath('content');

export function getPostBySlug({ slug, fields = [] }: { slug: string; fields: string[] }) {
  const fullPath = makeAbsolutePath('content', `${slug}.md`);
  const fileContents = getFileContents(fullPath);

  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  fields.forEach(field => {
    if (field === 'slug') {
      items[field] = slug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts({ fields = [] }: { fields: string[] }) {
  const findMarkdownFiles = generateFinder(contentDir, 'md');
  const markdownFiles = findMarkdownFiles();
  const posts = markdownFiles.map(file => getPostBySlug({ slug: file.slug, fields }));

  return posts;
}

export function getPostsByCategory({ category, fields = [] }: { category: string; fields: string[] }) {
  fields.push('category');
  const posts = getAllPosts({ fields }).filter(post => post.category === category);

  return posts;
}

export function getCategories() {
  const posts = getAllPosts({ fields: ['category'] });
  const categories = posts.map(post => post.category).filter(category => !!category);
  const uniqueCategories = [...new Set(categories)];

  return uniqueCategories;
}

// export function getTags() {
//   const posts = getAllPosts({ fields: ['tags'] });
//   const tags = posts
//     .map(post => post.tags)
//     .flat()
//     .filter(tag => !!tag);
//   const uniqueTags = [...new Set(tags)];

//   return uniqueTags;
// }
