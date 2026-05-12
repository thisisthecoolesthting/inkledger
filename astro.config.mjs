import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { visit } from 'unist-util-visit';

function rehypeAmazonRel() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (
        node.tagName === 'a' &&
        typeof node.properties?.href === 'string' &&
        node.properties.href.includes('amazon.com')
      ) {
        node.properties.rel = ['sponsored', 'nofollow', 'noopener'];
        node.properties.target = '_blank';
      }
    });
  };
}

export default defineConfig({
  site: 'https://inkledger.org',
  trailingSlash: 'never',
  integrations: [tailwind()],
  build: { format: 'directory' },
  markdown: {
    rehypePlugins: [rehypeAmazonRel],
  },
});
