import { findCategories } from '@/lib/api';
import { Route } from '@/types/navigation.type';

export function getNavigationRoutes(): Route[] {
  return findCategories().map(category => ({
    name: category,
    href: `/${encodeUrl(category)}`,
  }));
}

/**
 * 문장의 %20을 공백으로 변환
 * @param str
 * @returns
 */
export function decodeUrl(str: string): string {
  return str.replace(/%20/g, ' ');
}

/**
 * 문자의 공백을 %20으로 변환
 * @param str
 * @returns
 */
export function encodeUrl(str: string): string {
  return str.replace(/ /g, '%20');
}
