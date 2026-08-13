import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { services } from "@/lib/services";

export function Services() {
  return (
    <section id="hizmetler" className="scroll-mt-24 bg-paper py-20 sm:py-24">
      <div className="container-px">
        <SectionHeading eyebrow="Hizmetlerimiz" title="Tek çatı altında bütünsel bakım">
          Koruyucu hekimlikten ileri cerrahiye kadar, dostlarınızın ihtiyaç
          duyabileceği her hizmet aynı şefkatli ekipten.
        </SectionHeading>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, desc, slug }, i) => (
            <Reveal key={title} delay={(i % 3) * 70}>
              {/* `relative` only anchors the stretched link overlay below — it
                  adds no visual change to the card. */}
              <article className="group relative h-full rounded-2xl border border-hairline bg-surface p-6 shadow-soft transition-all duration-200 ease-gentle hover:-translate-y-1 hover:border-brand-200 hover:shadow-card dark:hover:border-brand-700">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors duration-200 ease-gentle group-hover:bg-brand-100 dark:bg-brand-900/40 dark:text-brand-200">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-ink">
                  <Link
                    href={`/hizmetler/${slug}`}
                    className="rounded after:absolute after:inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                  >
                    {title}
                  </Link>
                </h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                  {desc}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
