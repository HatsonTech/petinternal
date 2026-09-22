// ── Blog post types + loader ─────────────────────────────────────────
// Posts live as JSON in lib/posts/*.json. They are auto-discovered so that
// posts published through /admin (committed by the Cloudflare Worker) appear
// on the next build with no code changes.

export type BlogBlock =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; text: string };

export type FAQ = { q: string; a: string };

export type Source = { title: string; publisher: string; url: string };

export type BlogPost = {
  slug: string;
  title: string;
  /** Shorter title for the <title> tag when `title` would be truncated in SERPs. */
  metaTitle?: string;
  category: string;
  /** Shorter description for the meta tag; `excerpt` stays the on-page teaser. */
  metaDescription?: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  readTime: string;
  date: string;
  dateISO: string;
  updatedISO: string;
  keywords: string[];
  intro: string;
  body?: BlogBlock[]; // legacy/structured posts
  contentHtml?: string; // HTML posts written via /admin
  faqs: FAQ[];
  /** Scientific / official references shown under "Kaynaklar". Only for
   *  posts that make evidence-based or legal claims — not for price or
   *  common-sense care guides. Every URL must be opened and checked. */
  sources?: Source[];
  author?: string;
  published?: boolean;
};

// Webpack auto-imports every .json in ./posts (build-time bundle).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ctx = (require as any).context("./posts", false, /\.json$/);

export const blogPosts: BlogPost[] = (ctx.keys() as string[])
  .map((key: string) => ctx(key) as BlogPost)
  .filter((p) => p.published !== false)
  .sort((a, b) => (a.dateISO < b.dateISO ? 1 : -1)); // newest first


// Kuyruktaki (henüz yayınlanmamış) bir yazıya verilen satır içi bağlantı, o yazı
// çıkana kadar 404 olurdu. Yükleme sırasında bu bağlantıları düz metne çeviriyoruz;
// hedef yayınlandığında bağlantı kendiliğinden geri gelir.
const liveSlugs = new Set(blogPosts.map((p) => p.slug));
const dropDeadLinks = (html: string) =>
  html.replace(
    /<a href="\/blog\/([^"]+)">(.*?)<\/a>/g,
    (full, slug: string, label: string) => (liveSlugs.has(slug) ? full : label),
  );

for (const post of blogPosts) {
  for (const block of post.body ?? []) {
    if ("text" in block) block.text = dropDeadLinks(block.text);
    if ("items" in block) block.items = block.items.map(dropDeadLinks);
  }
}

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
