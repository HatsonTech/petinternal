// ── Blog post types + loader ─────────────────────────────────────────
// Posts live as JSON in lib/posts/*.json. They are auto-discovered so that
// posts published through /admin (committed by the Cloudflare Worker) appear
// on the next build with no code changes.

import { withTrailingSlash } from "@/lib/site";

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


// Yazı gövdesindeki satır içi bağlantılar yükleme sırasında iki işlemden geçer:
//
// 1. Kuyruktaki (henüz yayınlanmamış) bir yazıya verilen bağlantı, o yazı çıkana
//    kadar 404 olurdu. Bu bağlantılar düz metne çevrilir; hedef yayınlandığında
//    bağlantı kendiliğinden geri gelir.
// 2. Site `trailingSlash: true` ile yayınlanıyor. JSON'da "/blog/slug" ya da
//    "/hizmetler/slug" diye yazılmış bir bağlantı her tıklamada ve taramada 301
//    yönlendirmesine girerdi; href her zaman sonu "/" ile basılır. Kaynak JSON
//    bağlantıyı eğik çizgili de eğik çizgisiz de yazabilir.
const liveSlugs = new Set(blogPosts.map((p) => p.slug));
const INTERNAL_ANCHOR = /<a\b([^>]*?)\shref="(\/[^"]*)"([^>]*)>([\s\S]*?)<\/a>/g;
const BLOG_PATH = /^\/blog\/([^/?#]+)\/?(?:[?#].*)?$/;

const fixLinks = (html: string) =>
  html.replace(
    INTERNAL_ANCHOR,
    (_full, before: string, href: string, after: string, label: string) => {
      const blog = href.match(BLOG_PATH);
      if (blog && !liveSlugs.has(blog[1])) return label;
      return `<a${before} href="${withTrailingSlash(href)}"${after}>${label}</a>`;
    },
  );

for (const post of blogPosts) {
  post.intro = fixLinks(post.intro);
  if (post.contentHtml) post.contentHtml = fixLinks(post.contentHtml);
  for (const block of post.body ?? []) {
    if ("text" in block) block.text = fixLinks(block.text);
    if ("items" in block) block.items = block.items.map(fixLinks);
  }
  // SSS yanıtları düz metin olarak basılır (FaqAccordion ve FAQPage şeması);
  // içine yazılmış bir bağlantı etiketi ekranda ham HTML olarak görünürdü.
  for (const faq of post.faqs) faq.a = faq.a.replace(/<[^>]+>/g, "");
}

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
