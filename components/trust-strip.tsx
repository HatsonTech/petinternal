import { Clock, FlaskConical, Microscope, Stethoscope } from "lucide-react";
import { site } from "@/lib/site";

// Only specific, checkable claims the site already makes elsewhere: the vet's
// title/focus (lib/site.ts) and same-visit routine lab results (the Çukurambar
// FAQ in lib/locations.ts). No membership or patient-count claims.
const items = [
  { icon: Stethoscope, text: `${site.vet.specialty} alanında uzman veteriner hekim` },
  { icon: Clock, text: "7/24 acil veteriner desteği" },
  { icon: Microscope, text: "Modern laboratuvar & görüntüleme" },
  { icon: FlaskConical, text: "Rutin kan ve idrar tahlillerinin çoğu aynı ziyarette sonuçlanır" },
];

export function TrustStrip() {
  return (
    <section aria-label="Güven göstergeleri" className="bg-paper">
      <div className="container-px py-10 sm:py-12">
        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-hairline ring-1 ring-hairline sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, text }) => (
            <li
              key={text}
              className="flex items-center gap-3.5 bg-cream px-5 py-6"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-200">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-sm font-medium leading-snug text-ink/90">
                {text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
