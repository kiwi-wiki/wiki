export function makeTitle({ title, suffix = 'Kiwi' }: { title: string; suffix?: string }): string {
  return `${decodeURI(title)} | ${suffix}`;
}
