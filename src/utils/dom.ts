interface GetHeadingsOptions {
  target?: HTMLElement | null;
  levels?: number[];
}

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface Heading {
  id: string;
  text: string | null;
  level: HeadingLevel;
}

export function getHeadings({ target = document.body, levels = [1, 2, 3, 4, 5, 6] }: GetHeadingsOptions = {}) {
  if (target === null) {
    return [];
  }

  const headings = [];

  const selector = levels.map(level => `h${level}`).join(', ');
  const headingsDOM = Array.from(target.querySelectorAll(selector));

  for (const heading of headingsDOM) {
    headings.push({
      id: heading.id,
      text: heading.textContent,
      level: parseInt(heading.tagName.slice(1), 10) as HeadingLevel,
    });
  }

  return headings;
}
