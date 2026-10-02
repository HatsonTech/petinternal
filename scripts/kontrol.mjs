#!/usr/bin/env node
// Kuyruktaki (published:false) taslaklari yayindan once dogrular.
//
//   node scripts/kontrol.mjs
//
// Hata varsa cikis kodu 1 olur ve otomatik yayin durur.

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const DIR = "lib/posts";
const BLOCKS = { h2: "text", p: "text", callout: "text", ul: "items" };
const REQUIRED = ["slug", "title", "category", "image", "imageAlt", "excerpt",
                  "readTime", "keywords", "intro", "body", "faqs"];
const SERVICES = [...readFileSync("lib/services.ts", "utf8").matchAll(/^    slug: "([^"]+)"/gm)]
  .map((m) => m[1]);

const posts = readdirSync(DIR)
  .filter((f) => f.endsWith(".json"))
  .map((f) => ({ file: f, data: JSON.parse(readFileSync(join(DIR, f), "utf8")) }));
const slugs = new Set(posts.map((p) => p.data.slug));
const queued = posts.filter((p) => p.data.published === false);

const errors = [];
const seenQueue = new Set();
const texts = (d) => [
  d.intro,
  ...d.body.flatMap((b) => b.items ?? [b.text]),
  ...d.faqs.flatMap((f) => [f.q, f.a]),
];

for (const { file, data: d } of queued) {
  const err = (msg) => errors.push(`${file}: ${msg}`);
  const missing = REQUIRED.filter((k) => !d[k] || (Array.isArray(d[k]) && d[k].length === 0));
  if (missing.length) { err(`eksik alan ${missing.join(", ")}`); continue; }
  if (`${d.slug}.json` !== file) err("slug dosya adiyla ayni olmali");
  if (d.queue !== undefined) {
    if (!Number.isInteger(d.queue) || seenQueue.has(d.queue)) err(`gecersiz veya tekrar eden queue: ${d.queue}`);
    seenQueue.add(d.queue);
  }
  if ((d.metaTitle ?? d.title).length > 60) err(`baslik ${(d.metaTitle ?? d.title).length} karakter (en fazla 60)`);
  if ((d.metaDescription ?? d.excerpt).length > 160) err(`aciklama ${(d.metaDescription ?? d.excerpt).length} karakter (en fazla 160)`);
  if (!existsSync(join("public", d.image))) err(`gorsel yok: ${d.image}`);
  for (const b of d.body) {
    const key = BLOCKS[b.type];
    if (!key || !b[key] || (key === "items" && !b.items.length)) err(`gecersiz blok ${b.type}`);
  }
  if (d.faqs.length < 3 || d.faqs.some((f) => !f.q || !f.a)) err("en az 3 eksiksiz SSS gerekli");
  for (const s of d.sources ?? []) {
    if (!s.title || !s.publisher || !/^https:\/\//.test(s.url ?? "")) err(`gecersiz kaynak ${JSON.stringify(s)}`);
  }
  const words = texts(d).join(" ").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  if (words < 350) err(`${words} kelime (en az 350)`);
  for (const t of texts(d)) {
    if (/<script/i.test(t)) err("metinde script olamaz");
    for (const [, path] of t.matchAll(/href="(\/[^"#?]*)"/g)) {
      const blog = path.match(/^\/blog\/([^/]+)\/?$/);
      const service = path.match(/^\/hizmetler\/([^/]+)\/?$/);
      if (blog ? !slugs.has(blog[1]) : service ? !SERVICES.includes(service[1]) : !["/", "/hizmetler", "/hizmetler/", "/blog", "/blog/"].includes(path)) {
        err(`kirik ic baglanti ${path}`);
      }
    }
  }
}

for (const e of errors) console.log("HATA  " + e);
if (errors.length) process.exit(1);
console.log(`Kuyruk gecerli: ${queued.length} taslak`);
