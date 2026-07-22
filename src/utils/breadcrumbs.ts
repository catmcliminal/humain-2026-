import { SITE } from '../config';

/** Builds a BreadcrumbList JSON-LD block. `crumbs` excludes Home — it's prepended automatically. */
export function breadcrumbJsonLd(crumbs: { name: string; url: string }[]) {
  const items = [{ name: 'Home', url: SITE }, ...crumbs];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
