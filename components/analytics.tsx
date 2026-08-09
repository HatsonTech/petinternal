"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { pushEvent } from "@/lib/gtm";

/** Where on the page a link lives, for segmenting conversions in GTM. */
function linkSource(link: HTMLAnchorElement): string {
  const explicit = link.getAttribute("data-gtm-source");
  if (explicit) return explicit;
  if (link.closest("header")) return "header";
  if (link.closest("footer")) return "footer";
  return "icerik";
}

/**
 * Site-wide dataLayer instrumentation. Renders nothing.
 *
 * Phone and WhatsApp clicks are caught by one delegated listener rather than
 * an onClick on each link — the same href appears in the header, hero, contact
 * block, CTA band, footer and FAB, and new ones shouldn't need wiring up.
 */
export function Analytics() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  // App Router client navigations never reload the document, so GTM's own
  // pageview only ever fires for the entry page. Push our own for the rest —
  // skipping the first render so the entry page isn't counted twice.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    pushEvent("page_view", {
      page_path: pathname + window.location.search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as Element | null;
      const link = target?.closest?.("a");
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) {
        pushEvent("telefon_click", {
          link_url: href,
          source: linkSource(link),
        });
      } else if (href.includes("wa.me")) {
        pushEvent("whatsapp_click", {
          link_url: href,
          source: linkSource(link),
        });
      }
    }

    // Capture phase: fire before any handler that might stop propagation.
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}
