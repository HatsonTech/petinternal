import Link from "next/link";
import { MapPin } from "lucide-react";
import { locations } from "@/lib/locations";
import { cn } from "@/lib/cn";

/** Crawlable links to every /veteriner/<slug>/ page, labelled by district. */
export function LocationLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {locations.map((l) => (
        <li key={l.slug}>
          <Link
            href={`/veteriner/${l.slug}/`}
            className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3.5 py-1.5 text-sm font-medium text-ink/85 ring-1 ring-hairline transition-colors duration-200 ease-gentle hover:text-brand hover:ring-brand-300 dark:hover:ring-brand-700"
          >
            <MapPin className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
            {l.district}
          </Link>
        </li>
      ))}
    </ul>
  );
}
