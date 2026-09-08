import { Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { site, testimonials } from "@/lib/site";

export function Testimonials() {
  // No genuine reviews on file yet -> render nothing rather than invent any.
  if (testimonials.length === 0) return null;

  return (
    <section className="bg-cream py-20 sm:py-24">
      <div className="container-px">
        <SectionHeading eyebrow="Pati Aileleri" title="Bize güvenen ailelerin sözleri">
          Google profilimize bırakılan yorumlardan bir bölümü.
        </SectionHeading>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 4) * 80}>
              <figure className="flex h-full flex-col rounded-2xl border border-hairline bg-surface p-6 shadow-soft sm:p-7">
                <Quote className="h-7 w-7 text-brand-300" aria-hidden="true" />
                {t.rating ? (
                  <div
                    className="mt-3 flex items-center gap-0.5 text-gold"
                    aria-label={`5 üzerinden ${t.rating} yıldız`}
                  >
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                ) : null}
                <blockquote className="mt-4 flex-1 text-[1.02rem] leading-relaxed text-ink/90">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-hairline pt-5">
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-100 font-display text-lg font-semibold text-brand-700 dark:bg-brand-900/50 dark:text-brand-200"
                  >
                    {t.name.charAt(0)}
                  </span>
                  <span className="leading-tight">
                    <span className="block font-semibold text-ink">{t.name}</span>
                    {t.source ? (
                      <span className="block text-sm text-muted">{t.source} yorumu</span>
                    ) : null}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted">
          <a
            href={site.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand underline-offset-4 hover:underline"
          >
            Tüm yorumları Google&apos;da okuyun
          </a>
        </p>
      </div>
    </section>
  );
}
