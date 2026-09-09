import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Clock, MapPin, Phone, Stethoscope } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { FaqAccordion } from "@/components/faq";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/lib/site";
import { locations, getLocation } from "@/lib/locations";
import { getPost } from "@/lib/posts";

const BASE = "https://www.petinternal.com";
/** The layout's VeterinaryCare node — referenced, never redefined. */
const CLINIC_ID = "https://www.petinternal.com";

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const loc = getLocation(params.slug);
  if (!loc) return {};
  return {
    title: { absolute: loc.metaTitle },
    description: loc.metaDescription,
    keywords: loc.keywords,
    alternates: { canonical: `/veteriner/${loc.slug}` },
    openGraph: {
      type: "website",
      title: loc.metaTitle,
      description: loc.metaDescription,
      url: `/veteriner/${loc.slug}`,
      images: [{ url: "/og-image.png", alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: loc.metaTitle,
      description: loc.metaDescription,
      images: ["/og-image.png"],
    },
  };
}

export default function LocationPage({ params }: { params: { slug: string } }) {
  const loc = getLocation(params.slug);
  if (!loc) notFound();

  const posts = loc.relatedPosts
    .map((slug) => getPost(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const pageUrl = `${BASE}/veteriner/${loc.slug}`;

  // Reference the layout's business node by @id instead of redefining the
  // business (which would risk a second, wrong address in the graph).
  const clinicLd = {
    "@context": "https://schema.org",
    "@type": "VeterinaryCare",
    "@id": CLINIC_ID,
    name: site.name,
    url: CLINIC_ID,
    telephone: "+905362906958",
    areaServed: {
      "@type": "Place",
      name: `${loc.district}, Ankara`,
    },
    hasMap: site.mapsLink,
    subjectOf: { "@type": "WebPage", "@id": pageUrl, url: pageUrl },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: BASE },
      { "@type": "ListItem", position: 2, name: "Bölgeler", item: `${BASE}/veteriner` },
      { "@type": "ListItem", position: 3, name: loc.title, item: pageUrl },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: loc.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <main id="main">
        {/* Intro */}
        <section className="bg-paper py-12 sm:py-16">
          <div className="container-px">
            <div className="mx-auto max-w-3xl">
              <span className="eyebrow">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {loc.district} · Ankara
              </span>
              <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl">
                {loc.title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                {loc.intro}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <ButtonLink href="/#iletisim" variant="primary" size="lg">
                  Randevu Al
                </ButtonLink>
                <ButtonLink
                  href={site.phoneHref}
                  variant="secondary"
                  size="lg"
                  external={false}
                >
                  <Phone className="h-[1.15rem] w-[1.15rem]" aria-hidden="true" />
                  Ara: {site.phoneDisplay}
                </ButtonLink>
              </div>

              <p className="mt-8 flex items-center gap-2 text-sm text-muted">
                <Clock className="h-4 w-4 text-brand" aria-hidden="true" />
                7/24 açık — gece, hafta sonu ve resmî tatiller dâhil.
              </p>
            </div>
          </div>
        </section>

        {/* Hizmet kapsamı + iç hastalıkları uzmanlığı */}
        <section className="bg-paper pb-4">
          <div className="container-px">
            <Reveal>
              <div className="mx-auto flex max-w-3xl items-start gap-3 rounded-2xl border-l-4 border-brand bg-cream p-4 sm:p-5">
                <Stethoscope
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand"
                  aria-hidden="true"
                />
                <p className="leading-relaxed text-ink/90">
                  Kliniğimizde genel muayene ve aşılamadan cerrahiye, diş
                  sağlığından acil müdahaleye kadar tüm veteriner hizmetlerini
                  veriyoruz. İç hastalıkları — böbrek, karaciğer, pankreas,
                  hormon sistemi ve kalp sorunları — özel ilgi alanımız; bu
                  alanda tanı tek bir muayeneden çok laboratuvar ve görüntüleme
                  bulgularının birlikte yorumlanmasıyla ilerlediği için tetkik
                  planını her hasta için ayrı belirliyoruz.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Getting here + access */}
        <section className="bg-paper py-16 sm:py-20">
          <div className="container-px">
            <SectionHeading
              eyebrow="Ulaşım"
              title={`${loc.district}'ten kliniğe nasıl gelinir?`}
              align="left"
            />
            <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="flex flex-col gap-6">
                <div>
                  {loc.gettingHere.map((p, i) => (
                    <p key={i} className="mt-4 leading-relaxed text-muted first:mt-0">
                      {p}
                    </p>
                  ))}
                </div>

                <ul className="space-y-4">
                  {loc.access.map((a) => (
                    <li
                      key={a}
                      className="flex items-start gap-3.5 rounded-2xl border border-hairline bg-surface p-5 shadow-soft"
                    >
                      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-200">
                        <MapPin className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="text-sm leading-relaxed text-muted">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-6">
                <div className="overflow-hidden rounded-2xl border border-hairline shadow-soft">
                  <iframe
                    title="Pet Internal Veteriner Kliniği konum haritası"
                    src={site.mapsEmbed}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-[300px] w-full border-0 grayscale-[0.15]"
                  />
                </div>

                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <li className="flex items-start gap-3.5 rounded-2xl border border-hairline bg-surface p-5 shadow-soft">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-200">
                      <MapPin className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="text-sm leading-relaxed">
                      <span className="block font-semibold text-ink">Adres</span>
                      <a
                        href={site.mapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted transition-colors hover:text-brand"
                      >
                        {site.address.line}, {site.address.district}
                      </a>
                    </span>
                  </li>

                  <li className="flex items-start gap-3.5 rounded-2xl border border-hairline bg-surface p-5 shadow-soft">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-200">
                      <Clock className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="text-sm leading-relaxed">
                      <span className="block font-semibold text-ink">
                        Çalışma Saatleri
                      </span>
                      <span className="mt-1 block space-y-1 text-muted">
                        {site.hours.map((h) => (
                          <span
                            key={h.day}
                            className="flex items-center justify-between gap-3"
                          >
                            <span className="whitespace-nowrap">{h.day}</span>
                            <span className="whitespace-nowrap font-medium text-ink/80">
                              {h.time}
                            </span>
                          </span>
                        ))}
                      </span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-paper pb-16 sm:pb-20">
          <div className="container-px">
            <div className="mx-auto max-w-3xl">
              <SectionHeading
                eyebrow="Sık Sorulan Sorular"
                title={`${loc.district} için sık sorulanlar`}
                align="left"
              />
              <FaqAccordion items={loc.faqs} />
            </div>
          </div>
        </section>

        {/* Related guides */}
        {posts.length > 0 && (
          <section className="bg-paper pb-16 sm:pb-20">
            <div className="container-px">
              <div className="mx-auto max-w-3xl border-t border-hairline pt-8">
                <h2 className="font-display text-xl font-semibold text-ink">
                  İlgili rehberler
                </h2>
                <ul className="mt-4 space-y-2">
                  {posts.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/blog/${p.slug}`}
                        className="inline-flex items-center gap-2 text-brand transition-colors hover:text-brand-700"
                      >
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        <CtaBand />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([clinicLd, breadcrumbLd, faqLd]),
        }}
      />
    </>
  );
}
