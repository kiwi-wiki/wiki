import { findCategories } from '@/lib/api';
import { Route } from '@/types/navigation.type';

export function getCateogryRoutes(): Route[] {
  return findCategories().map(category => ({
    name: category,
    href: `/${encodeURI(category)}`,
  }));
}
