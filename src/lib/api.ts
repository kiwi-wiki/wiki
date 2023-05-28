import { allPosts } from 'contentlayer/generated';

export function findPostsByCategory(category: string) {
  const postsByCategory = allPosts.filter(post => post.category === category);
  postsByCategory.sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1));

  return postsByCategory;
}

/**
 * content 폴더 내의 모든 마크다운 파일의 카테고리를 찾아서 반환
 */
export function findCategories() {
  const categories = allPosts.map(post => post.category).filter(category => !!category);
  const uniqueCategories = [...new Set(categories)].sort((a, b) => (a.toLowerCase() > b.toLowerCase() ? 1 : -1));

  return uniqueCategories;
}
