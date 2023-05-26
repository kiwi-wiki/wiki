import { findCategories } from '@/lib/api';
import { Route } from '@/types/navigation.type';

export function getNavigationRoutes(): Route[] {
  return findCategories().map(category => ({
    name: category,
    href: `/${encodeURI(category)}`,
  }));
}
