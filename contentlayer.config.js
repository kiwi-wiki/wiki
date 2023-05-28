import { defineDocumentType, makeSource } from '@contentlayer/source-files';
import rehypePrettyCode from 'rehype-pretty-code';
import { visit } from 'unist-util-visit';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  contentType: 'mdx',
  filePathPattern: `**/*.mdx`,

  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    category: { type: 'string', required: true },
    description: { type: 'string', required: true },
    author: { type: 'string', required: true },
  },

  computedFields: {
    url: { type: 'string', resolve: post => `/posts/${post._raw.flattenedPath}` },
  },
}));

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [
      () => tree => {
        visit(tree, node => {
          if (node?.type === 'element' && node?.tagName === 'pre') {
            const [codeEl] = node.children;

            if (codeEl.tagName !== 'code') return;

            node.raw = codeEl.children?.[0].value;
          }
        });
      },
      [
        rehypePrettyCode,
        {
          theme: {
            dark: 'github-dark',
            light: 'github-light',
          },
        },
      ],
      () => tree => {
        visit(tree, node => {
          if (node?.type === 'element' && node?.tagName === 'div') {
            if (!('data-rehype-pretty-code-fragment' in node.properties)) {
              return;
            }

            for (const child of node.children) {
              if (child.tagName === 'pre') {
                child.properties['raw'] = node.raw;
              }
            }
          }
        });
      },
    ],
  },
});
