import { generateFinder, getFileContents, makeAbsolutePath } from '@/utils/file';
import matter from 'gray-matter';

const contentDir = makeAbsolutePath('content');

type Items = {
  [key: string]: string;
};

export function findPost({ slug, fields = [] }: { slug: string; fields: string[] }) {
  const fullPath = makeAbsolutePath('content', `${slug}.md`);
  const fileContents = getFileContents(fullPath);
  const { data, content } = matter(fileContents);

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

type GetPostsParams = {
  fields: string[];
};

export function findPosts({ fields = [] }: GetPostsParams) {
  const findMarkdownFiles = generateFinder({ target: contentDir, ext: 'md' });
  const markdownFiles = findMarkdownFiles();
  const posts = markdownFiles.map(file => findPost({ slug: file.slug, fields }));

  return posts;
}

/**
 * content 폴더 내의 모든 마크다운 파일의 카테고리를 찾아서 반환
 */
export function findCategories() {
  const posts = findPosts({ fields: ['category'] });
  const categories = posts.map(post => post.category).filter(category => !!category);
  const uniqueCategories = [...new Set(categories)];

  return uniqueCategories;
}
