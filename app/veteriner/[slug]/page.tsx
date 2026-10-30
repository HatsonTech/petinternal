import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Check, Clock, MapPin, Navigation, Phone } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { FaqAccordion } from "@/components/faq";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { CLINIC_ID, SITE_URL, directionsUrl, site } from "@/lib/site";
import { locations, getLocation } from "@/lib/locations";
import { getPost } from "@/lib/posts";
import { getService } from "@/lib/services";

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

const h2Class =
  "font-display text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-3xl";
const iconBubble =
  "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-200";

export default function LocationPage({ params }: { params: { slug: string } }) {
  const loc = getLocation(params.slug);
  if (!loc) notFound();

  const posts = loc.relatedPosts
    .map((slug) => getPost(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const serviceLinks = (loc.services ?? [])
    .map((slug) => getService(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const otherLocations = locations.filter((l) => l.slug !== loc.slug);

  const pageUrl = `${SITE_URL}/veteriner/${loc.slug}/`;
  const directions = loc.directionsFromVisitor
    ? directionsUrl()
    : directionsUrl(loc.directionsFrom);
  const directionsLabel = loc.directionsFromVisitor
    ? "Bulunduğunuz yerden yol tarifi"
    : `${loc.fromDistrict} yol tarifi`;

  // Reference the layout's business node by @id instead of redefining the
  // business (which would risk a second, wrong address in the graph).
  const areaType = loc.areaType ?? "Place";
  const clinicLd = {
    "@context": "https://schema.org",
    "@type": "VeterinaryCare",
    "@id": CLINIC_ID,
    name: site.name,
    url: `${SITE_URL}/`,
    telephone: "+905362906958",
    areaServed: {
      "@type": areaType,
      name: areaType === "City" ? loc.district : `${loc.district}, Ankara`,
    },
    hasMap: site.mapsLink,
    subjectOf: { "@type": "WebPage", "@id": pageUrl, url: pageUrl },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Bölgeler", item: `${SITE_URL}/veteriner/` },
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
                {loc.district === "Ankara" ? "Ankara" : `${loc.district} · Ankara`}
              </span>
              <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl">
                {loc.title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                {loc.intro}
              </p>

              {loc.kind === "nearby" && (
                <p className="mt-4 rounded-2xl border-l-4 border-brand bg-cream p-4 text-sm leading-relaxed text-ink/90">
                  {loc.district} semtinde şubemiz yoktur. Tek kliniğimiz:{" "}
                  {site.address.full}.
                </p>
              )}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <ButtonLink
                  href={site.phoneHref}
                  variant="primary"
                  size="lg"
                  external={false}
                >
                  <Phone className="h-[1.15rem] w-[1.15rem]" aria-hidden="true" />
                  Ara: {site.phoneDisplay}
                </ButtonLink>
                <ButtonLink href={directions} variant="secondary" size="lg">
                  <Navigation className="h-[1.15rem] w-[1.15rem]" aria-hidden="true" />
                  {directionsLabel}
                </ButtonLink>
              </div>

              <p className="mt-8 flex items-center gap-2 text-sm text-muted">
                <Clock className="h-4 w-4 text-brand" aria-hidden="true" />
                7/24 açık — gece, hafta sonu ve resmî tatiller dâhil.
              </p>

              {/* Kısaca */}
              {loc.quickFacts && loc.quickFacts.length > 0 && (
                <dl className="mt-8 divide-y divide-hairline rounded-2xl border border-hairline bg-surface px-5 shadow-soft">
                  {loc.quickFacts.map((f) => (
                    <div
                      key={f.label}
                      className="flex flex-col gap-1 py-3.5 sm:flex-row sm:gap-4"
                    >
                      <dt className="shrink-0 text-sm font-semibold text-ink sm:w-44">
                        {f.label}
                      </dt>
                      <dd className="text-sm leading-relaxed text-muted">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </div>
        </section>

        {/* Page-specific sections */}
        {loc.sections && loc.sections.length > 0 && (
          <section className="bg-paper pb-4">
            <div className="container-px">
              <div className="mx-auto max-w-3xl space-y-12">
                {loc.sections.map((s) => (
                  <div key={s.h2}>
                    <h2 className={h2Class}>{s.h2}</h2>
                    {s.paragraphs.map((p, i) => (
                      <p key={i} className="mt-4 leading-relaxed text-muted">
                        {p}
                      </p>
                    ))}
                    {s.links && s.links.length > 0 && (
                      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                        {s.links.map((l) => (
                          <li key={l.href}>
                            <Link
                              href={l.href}
                              className="font-medium text-brand underline-offset-4 transition-colors hover:text-brand-700 hover:underline"
                            >
                              {l.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Route / landmark table */}
        {loc.routes && loc.routes.rows.length > 0 && (
          <section className="bg-paper pt-12">
            <div className="container-px">
              <div className="mx-auto max-w-3xl">
                <h2 className={h2Class}>Hangi yoldan gelinir?</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {loc.routes.caption}
                </p>
                <ul className="mt-6 divide-y divide-hairline rounded-2xl border border-hairline bg-surface shadow-soft">
                  {loc.routes.rows.map((r) => (
                    <li key={r.from} className="grid gap-1 p-4 sm:grid-cols-[11rem_1fr] sm:gap-4 sm:p-5">
                      <span className="text-sm font-semibold text-ink">{r.from}</span>
                      <span className="text-sm leading-relaxed text-muted">
                        {r.via}
                        <span className="mt-1 block text-xs text-muted">{r.note}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Getting here + map */}
        <section className="bg-paper py-16 sm:py-20">
          <div className="container-px">
            <SectionHeading
              eyebrow="Ulaşım"
              title={`${loc.fromDistrict} kliniğe nasıl gelinir?`}
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
                      <span className={iconBubble}>
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
                    <span className={iconBubble}>
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
                        {site.address.full}
                      </a>
                      <a
                        href={directions}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1.5 flex items-center gap-1.5 font-medium text-brand hover:text-brand-700"
                      >
                        <Navigation className="h-3.5 w-3.5" aria-hidden="true" />
                        {directionsLabel}
                      </a>
                    </span>
                  </li>

                  <li className="flex items-start gap-3.5 rounded-2xl border border-hairline bg-surface p-5 shadow-soft">
                    <span className={iconBubble}>
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

        {/* Visits + what to bring */}
        {(loc.visits || (loc.bring && loc.bring.length > 0)) && (
          <section className="bg-paper pb-16 sm:pb-20">
            <div className="container-px">
              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 lg:grid-cols-2">
                {loc.visits && (
                  <div>
                    <h2 className={h2Class}>{loc.visits.h2}</h2>
                    <ul className="mt-5 space-y-3">
                      {loc.visits.items.map((v) => (
                        <li
                          key={v.text}
                          className="rounded-2xl border border-hairline bg-surface p-4 shadow-soft"
                        >
                          <span className="block leading-relaxed text-ink/90">{v.text}</span>
                          <Link
                            href={v.href}
                            className="mt-1 inline-block text-sm font-medium text-brand transition-colors hover:text-brand-700"
                          >
                            {v.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {loc.bring && loc.bring.length > 0 && (
                  <div>
                    <h2 className={h2Class}>Yanınıza alın</h2>
                    <ul className="mt-5 space-y-2.5">
                      {loc.bring.map((b) => (
                        <li key={b} className="flex items-start gap-3">
                          <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-200">
                            <Check className="h-3.5 w-3.5" aria-hidden="true" />
                          </span>
                          <span className="leading-relaxed text-muted">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

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

        {/* Related guides, services, other areas, sources */}
        <section className="bg-paper pb-16 sm:pb-20">
          <div className="container-px">
            <div className="mx-auto max-w-3xl space-y-10 border-t border-hairline pt-8">
              {posts.length > 0 && (
                <div>
                  <h2 className="font-display text-xl font-semibold text-ink">
                    İlgili rehberler
                  </h2>
                  <ul className="mt-4 space-y-2">
                    {posts.map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={`/blog/${p.slug}/`}
                          className="inline-flex items-center gap-2 text-brand transition-colors hover:text-brand-700"
                        >
                          {p.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {serviceLinks.length > 0 && (
                <div>
                  <h2 className="font-display text-xl font-semibold text-ink">
                    İlgili hizmetler
                  </h2>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {serviceLinks.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/hizmetler/${s.slug}/`}
                          className="inline-flex rounded-full bg-surface px-3.5 py-1.5 text-sm font-medium text-ink/85 ring-1 ring-hairline transition-colors hover:text-brand hover:ring-brand-300"
                        >
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h2 className="font-display text-xl font-semibold text-ink">
                  Diğer bölgelerden ulaşım
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {otherLocations.map((l) => (
                    <li key={l.slug}>
                      <Link
                        href={`/veteriner/${l.slug}/`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3.5 py-1.5 text-sm font-medium text-ink/85 ring-1 ring-hairline transition-colors hover:text-brand hover:ring-brand-300"
                      >
                        <MapPin className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
                        {l.district === "Ankara" ? "Ankara 7/24" : l.district}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {loc.sources && loc.sources.length > 0 && (
                <div>
                  <h2 className="font-display text-xl font-semibold text-ink">
                    Kaynaklar
                  </h2>
                  <p className="mt-2 text-sm text-muted">
                    Yol, istasyon ve semt bilgileri aşağıdaki kaynaklardan
                    kontrol edildi; süreler trafiğe göre değiştiği için
                    verilmemiştir.
                  </p>
                  <ul className="mt-3 space-y-1.5 text-sm">
                    {loc.sources.map((s) => (
                      <li key={s.url} className="text-muted">
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand transition-colors hover:text-brand-700"
                        >
                          {s.title}
                        </a>{" "}
                        — {s.publisher}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>

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
