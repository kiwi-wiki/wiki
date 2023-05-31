export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface Heading {
  id: string;
  text: string | null;
  level: HeadingLevel;
}
