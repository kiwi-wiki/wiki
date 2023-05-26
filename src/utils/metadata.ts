import { decodeUrl } from '@/utils/navigation';

export function makeTitle({ title, suffix = 'Kiwi' }: { title: string; suffix?: string }): string {
  return `${decodeUrl(title)} | ${suffix}`;
}
