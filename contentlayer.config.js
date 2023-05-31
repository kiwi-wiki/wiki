import { defineDocumentType, makeSource } from '@contentlayer/source-files';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import { visit } from 'unist-util-visit';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  contentType: 'mdx',
  filePathPattern: `**/*.mdx`,

  // 아래 필드는 .mdx 파일에 반드시 있어야 함
  fields: {
    title: { type: 'string', required: true },
    category: { type: 'string', required: true },
    description: { type: 'string', required: true },
    author: { type: 'string', required: true },

    // 글이 주기적으로 업데이트 되어야 하기 때문
    date: { type: 'date', required: true },
  },

  computedFields: {
    // url 이 필요한 경우 주석 해제
    // url: { type: 'string', resolve: post => `/posts/${post._raw.flattenedPath}` },

    // TOC 를 빌드타임에 만들기 위해 필요한 필드
    headings: {
      type: 'json',
      resolve: async doc => {
        // #, ##, ### 으로 시작하는 텍스트를 찾음
        const headingsRegex = /\n(?<flag>#{1,3})\s+(?<content>.+)/g;

        const headings = Array.from(doc.body.raw.matchAll(headingsRegex)).map(({ groups }) => {
          const flag = groups?.flag;
          const content = groups?.content;
          return {
            level: flag.length,
            id: content.split(' ').join('-').toLowerCase(),
            text: content,
          };
        });

        return headings;
      },
    },
  },
}));

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [
      /**
       * 1. prettify 전에 원시 code 텍스트를 node.raw에 추가
       * prettify 전에 raw를 추가해야 prettify 후에 raw를 pre에 추가할 수 있음
       **/
      () => tree => {
        visit(tree, node => {
          if (node?.type === 'element' && node?.tagName === 'pre') {
            const [codeEl] = node.children;

            if (codeEl.tagName !== 'code') return;

            node.raw = codeEl.children?.[0].value;
          }
        });
      },

      // 2. prettify
      [
        rehypePrettyCode,
        {
          theme: {
            dark: 'github-dark',
            light: 'github-light',
          },
        },
      ],

      /**
       * 3. prettify 후에 raw를 pre에 추가
       * 커스텀 MDX 컴포넌트(<Pre />)에서 raw를 사용할 수 있음
       */
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
      [rehypeSlug],

      // add anchor links to headings
      [rehypeAutolinkHeadings, { behavior: 'prepend' }],
    ],
  },
});
