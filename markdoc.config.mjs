import { defineMarkdocConfig, component } from '@astrojs/markdoc/config';

export default defineMarkdocConfig({
  tags: {
    video: {
      render: component('./src/components/VideoEmbed.astro'),
      attributes: {
        url: { type: String, required: true },
      },
    },
  },
});
