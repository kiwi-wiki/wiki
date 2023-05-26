import { disassembleHangul } from '@toss/hangul';

export function getFirstLetterUnicode(str: string) {
  return str.charAt(0).toLowerCase().charCodeAt(0);
}

export function classifyByFirstLetter<T extends { title: string }>(items: T[]) {
  const result: { [key: string]: T[] } = {};

  items.forEach(item => {
    const firstLetterUnicode = getFirstLetterUnicode(item.title);
    const firstLetter = String.fromCharCode(firstLetterUnicode);

    if (firstLetterUnicode >= 97 && firstLetterUnicode <= 122) {
      if (!result[firstLetter]) {
        result[firstLetter] = [];
      }
      result[firstLetter].push(item);
    } else {
      const hangulFirstLetter = disassembleHangul(firstLetter)[0];

      if (!result[hangulFirstLetter]) {
        result[hangulFirstLetter] = [];
      }
      result[hangulFirstLetter].push(item);
    }
  });

  return result;
}
