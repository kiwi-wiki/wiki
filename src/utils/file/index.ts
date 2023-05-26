import type { FilePath } from '@/utils/file/type';
import { validateExtension } from '@/utils/validation';
import fs from 'fs';
import { join } from 'path';

type GenerateFinderParams = {
  target: string;
  ext?: string;
};

export function generateFinder({ target, ext }: GenerateFinderParams) {
  const files: FilePath[] = [];

  return function findFiles(parent: string = target) {
    while (true) {
      const items = fs.readdirSync(parent);

      items.forEach(item => {
        const fullPath = join(parent, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          findFiles(fullPath);
        } else {
          if (!!ext && !validateExtension(item, ext)) {
            return;
          }

          const relativePath = fullPath.replace(target, '');
          const slug = relativePath.replace(/\.md$/, '');
          const filename = item.replace(/\.md$/, '');

          const file = {
            filename,
            fullPath,
            relativePath,
            slug,
          };

          files.push(file);
        }
      });

      break;
    }

    return files;
  };
}

export function getFileContents(path: string) {
  return fs.readFileSync(path, 'utf8');
}

export function makeAbsolutePath(...relativePath: string[]) {
  return join(process.cwd(), ...relativePath);
}
