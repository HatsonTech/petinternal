// ── Google Tag Manager ────────────────────────────────────────────────
// The container snippet lives in app/layout.tsx (inlined in <head> so it
// loads before hydration). This module owns the container ID, the typed
// dataLayer push that conversion events call into, and the Consent Mode v2
// state that gates Google's own tags.

export const GTM_ID = "GTM-KRJ2PKVS";

/** localStorage key holding the visitor's banner choice. */
export const CONSENT_STORAGE_KEY = "pi-cookie-consent";

export type ConsentChoice = "accepted" | "rejected";

type DataLayerEntry = Record<string, unknown> | IArguments;

declare global {
  interface Window {
    dataLayer?: DataLayerEntry[];
  }
}

/**
 * Push a conversion event to the dataLayer.
 *
 * Fires regardless of consent state, by design. Consent Mode redacts at the
 * tag level, so events stay in the dataLayer and are never lost at the source
 * — a visitor who accepts later still has their session measured.
 */
export function pushEvent(
  event: string,
  params: Record<string, unknown> = {}
): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

type GtagFn = (...args: unknown[]) => void;

/**
 * gtag() shim for Consent Mode commands.
 *
 * Forwards the real `arguments` object rather than a rest array: GTM routes
 * gtag commands by detecting Arguments, and a plain array is ignored.
 */
export const gtag: GtagFn = function () {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
};

/** The four signals Google reads. Storage we control stays granted. */
function consentSignals(granted: boolean) {
  const state = granted ? "granted" : "denied";
  return {
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
    analytics_storage: state,
  };
}

/** Apply the visitor's banner decision to every Google tag in the container. */
export function updateConsent(choice: ConsentChoice): void {
  const granted = choice === "accepted";
  gtag("consent", "update", consentSignals(granted));
  gtag("set", "ads_data_redaction", !granted);
  pushEvent("consent_update", { consent_choice: choice });
}

/**
 * Consent defaults, inlined ahead of the GTM loader.
 *
 * Reads the stored choice synchronously so a returning visitor who accepted
 * starts *granted* rather than denied-then-upgraded — otherwise every entry
 * page would be measured cookieless before the banner effect ran.
 *
 * `wait_for_update` holds tags briefly for a first-time visitor's decision,
 * and `url_passthrough` keeps gclid/gbraid alive across pages without cookies
 * so ad clicks still attribute while consent is denied.
 */
export const consentDefaultsSnippet = `(function(w,k){w.dataLayer=w.dataLayer||[];
function gtag(){w.dataLayer.push(arguments)}
var granted=false;try{granted=w.localStorage.getItem(k)==='accepted'}catch(e){}
var s=granted?'granted':'denied';
gtag('consent','default',{ad_storage:s,ad_user_data:s,ad_personalization:s,analytics_storage:s,functionality_storage:'granted',security_storage:'granted',wait_for_update:500});
gtag('set','ads_data_redaction',!granted);
gtag('set','url_passthrough',true);
})(window,'${CONSENT_STORAGE_KEY}');`;
