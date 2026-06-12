// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import netlify from '@astrojs/netlify';

/*
 * Host-specific code stays confined to this file (see CLAUDE.md): the site is
 * static, but the Keystatic admin routes (/keystatic, /api/keystatic) are
 * rendered on demand and need a server adapter. Now on Netlify (Phase 9).
 */
export default defineConfig({
  integrations: [react(), markdoc(), keystatic()],
  adapter: netlify(),
});
