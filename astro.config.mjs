// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';

/*
 * Host-specific code stays confined to this file (see CLAUDE.md): the site is
 * static, but the Keystatic admin routes (/keystatic, /api/keystatic) are
 * rendered on demand and need a server adapter. Vercel is the interim host;
 * the planned migration to Netlify (Phase 9) swaps `@astrojs/vercel` for
 * `@astrojs/netlify` here and nowhere else.
 */
export default defineConfig({
  integrations: [react(), keystatic()],
  adapter: vercel(),
});
