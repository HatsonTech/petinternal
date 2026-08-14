import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/posts";
import { services } from "@/lib/services";
import { locations } from "@/lib/locations";

const BASE = "https://www.petinternal.com";

// next.config.mjs sets `trailingSlash: true`, so every page is served at
// `/path/` and its <link rel="canonical"> ends in a slash. Sitemap URLs must
// match that exactly — without the slash each entry 301-redirects, which wastes
// crawl budget and makes the sitemap disagree with the canonicals it points at.
const url = (path = ""): string =>
  path ? `${BASE}/${path.replace(/^\/|\/$/g, "")}/` : `${BASE}/`;

export default function sitemap(): MetadataRoute.Sitemap {
  const posts: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: url(`blog/${p.slug}`),
    lastModified: new Date(p.updatedISO ?? p.dateISO),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: url(`hizmetler/${s.slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Geo landing pages. Çankaya/Öveçler are where the clinic physically is, so
  // they rank higher than the nearby areas we simply serve visitors from.
  const locationPages: MetadataRoute.Sitemap = locations.map((l) => ({
    url: url(`veteriner/${l.slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: l.kind === "primary" ? 0.9 : 0.7,
  }));

  return [
    {
      url: url(),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: url("hizmetler"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...servicePages,
    {
      url: url("veteriner"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...locationPages,
    {
      url: url("blog"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts,
  ];
}
