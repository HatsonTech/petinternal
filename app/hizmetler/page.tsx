import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/reveal";
import { services } from "@/lib/services";

const BASE = "https://www.petinternal.com";

export const metadata: Metadata = {
  title: "Hizmetlerimiz",
  description:
    "Çankaya Öveçler'de veteriner hizmetlerimiz: genel muayene, aşılama ve mikroçip, kısırlaştırma, diş sağlığı, laboratuvar, dermatoloji ve 7/24 acil.",
  keywords: [
    "veteriner hizmetleri Çankaya",
    "Ankara veteriner kliniği hizmetler",
    "Öveçler veteriner",
    "kedi köpek veteriner Çankaya",
  ],
  alternates: { canonical: "/hizmetler" },
};

export default function HizmetlerIndexPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: BASE },
      {
        "@type": "ListItem",
        position: 2,
        name: "Hizmetler",
        item: `${BASE}/hizmetler`,
      },
    ],
  };

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Veteriner hizmetleri",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: services.length,
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.title,
      description: s.desc,
      url: `${BASE}/hizmetler/${s.slug}`,
    })),
  };

  return (
    <>
      <main id="main">
        <section className="bg-paper py-14 sm:py-20">
          <div className="container-px">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-brand"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Ana sayfa
            </Link>
            <h1 className="mt-6 max-w-2xl text-balance font-display text-4xl font-semibold leading-tight tracking-tight text-ink">
              Hizmetlerimiz
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
              Koruyucu hekimlikten ileri cerrahiye kadar, dostlarınızın ihtiyaç
              duyabileceği her hizmet Çankaya Öveçler'deki kliniğimizde aynı
              şefkatli ekipten. Ayrıntılar için hizmet başlıklarına göz atın.
            </p>

            <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map(({ icon: Icon, title, desc, slug }, i) => (
                <Reveal key={slug} delay={(i % 3) * 70}>
                  <article className="group relative h-full rounded-2xl border border-hairline bg-surface p-6 shadow-soft transition-all duration-200 ease-gentle hover:-translate-y-1 hover:border-brand-200 hover:shadow-card dark:hover:border-brand-700">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors duration-200 ease-gentle group-hover:bg-brand-100 dark:bg-brand-900/40 dark:text-brand-200">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h2 className="mt-5 font-display text-xl font-semibold text-ink">
                      <Link
                        href={`/hizmetler/${slug}`}
                        className="rounded after:absolute after:inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                      >
                        {title}
                      </Link>
                    </h2>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                      {desc}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <CtaBand />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbLd, itemListLd]),
        }}
      />
    </>
  );
}
