// ── Local/geo landing pages (/veteriner/<slug>) ──────────────────────
// The clinic has ONE physical location: Öveçler, 1335. Sk. 8/B, Çankaya.
// "primary" pages describe that address directly (or, for the Ankara page,
// the city-wide 7/24 role of that one address). "nearby" pages describe how
// visitors from a neighbouring Çankaya district reach us — they must never
// imply a branch, office or second address in that district.
//
// Local facts rule: every road, rail station, landmark or distance below was
// checked against a source listed in that entry's `sources` (Vikipedi,
// EGO Genel Müdürlüğü hareket saatleri, Ankara Büyükşehir Belediyesi,
// OpenStreetMap). Distances are straight-line ("kuş uçuşu") from the clinic
// pin or the road length of the OpenStreetMap route, rounded. Never add travel
// minutes, parking promises or unverified bus/metro details.

import type { FAQ, Source } from "@/lib/posts";
import { site } from "@/lib/site";

/** The single NAP address string (identical to Google Maps). */
const ADDRESS = site.address.full;
const PHONE = site.phoneDisplay;

export type LocationKind = "primary" | "nearby";

export type LocationSection = {
  h2: string;
  paragraphs: string[];
  /** Optional internal links shown under the paragraphs. */
  links?: { label: string; href: string }[];
};

/** One row of the "güzergâh" table. */
export type RouteRow = {
  /** Starting area, e.g. "Oğuzlar, Ehlibeyt". */
  from: string;
  /** Roads in order, e.g. "Çetin Emeç Bulvarı → Kabil Caddesi". */
  via: string;
  /** Distance or a practical note. */
  note: string;
};

export type Location = {
  slug: string;
  /** District name as used in headings, e.g. "Çankaya" */
  district: string;
  /** Ablative form with the apostrophe, e.g. "Balgat'tan", "Söğütözü'nden".
   *  Turkish vowel harmony and consonant assimilation can't be derived from
   *  the name reliably, so it's written out per district. */
  fromDistrict: string;
  /** Origin passed to Google Maps directions, e.g. "Balgat, Çankaya, Ankara".
   *  Also used as the areaServed name in the layout schema. */
  directionsFrom: string;
  /** Directions button starts from the visitor's own location instead of
   *  `directionsFrom` (city-wide page, where no single origin makes sense). */
  directionsFromVisitor?: boolean;
  /** schema.org type for areaServed on this page. Default "Place". */
  areaType?: "City" | "AdministrativeArea" | "Place";
  kind: LocationKind;
  /** H1 and breadcrumb name. */
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  /** One-line, page-specific description for the /veteriner/ hub. */
  summary?: string;
  /** Short lede under the H1. */
  intro: string;
  /** "Kısaca" fact list right under the intro. */
  quickFacts?: { label: string; value: string }[];
  /** Page-specific body sections (h2 + paragraphs). */
  sections?: LocationSection[];
  /** Route / landmark table. */
  routes?: { caption: string; rows: RouteRow[] };
  /** "Ulaşım" paragraphs next to the map. */
  gettingHere: string[];
  /** Bullet list next to the map: transit and practical notes. */
  access: string[];
  /** Situations people from this area come for, each linked to a service. */
  visits?: { h2: string; items: { text: string; label: string; href: string }[] };
  /** "Yanınıza alın" list. */
  bring?: string[];
  faqs: FAQ[];
  /** Blog slugs surfaced on this page (must exist in lib/posts). */
  relatedPosts: string[];
  /** Service slugs linked from this page (must exist in lib/services). */
  services?: string[];
  /** Sources opened while writing the local facts on this page. */
  sources?: Source[];
};

/** Slug of the city-wide 7/24 page; linked from the homepage and hub. */
export const ANKARA_SLUG = "ankara-7-24-acik-veteriner";

const commonKeywords = (d: string) => [
  `${d} veteriner`,
  `${d} veteriner kliniği`,
  `veteriner ${d} Ankara`,
  `${d} acil veteriner`,
  `${d} 7/24 açık veteriner`,
];

// ── Sources (each one opened and checked) ─────────────────────────────
const wiki = (title: string, path: string): Source => ({
  title,
  publisher: "Vikipedi",
  url: `https://tr.wikipedia.org/wiki/${path}`,
});

const SRC = {
  osm: {
    title: "Kliniğin konumu ve çevre yollar (harita verisi)",
    publisher: "OpenStreetMap",
    url: "https://www.openstreetmap.org/?mlat=39.89256&mlon=32.83005#map=15/39.89256/32.83005",
  },
  ego451: {
    title: "451 Ulus–Kızılay–Öveçler–Kabil Cd. hattı hareket saatleri ve durakları",
    publisher: "EGO Genel Müdürlüğü",
    url: "https://www.ego.gov.tr/hareketsaatleri?hat_no=451",
  },
  ego454: {
    title: "454 Örnek–Kızılay–Öveçler–Lizbon Cd. hattı hareket saatleri ve durakları",
    publisher: "EGO Genel Müdürlüğü",
    url: "https://www.ego.gov.tr/hareketsaatleri?hat_no=454",
  },
  abb: {
    title: "Veteriner Hizmetleri",
    publisher: "Ankara Büyükşehir Belediyesi",
    url: "https://www.ankara.bel.tr/hizmetler/veteriner-hizmetleri",
  },
  avho: {
    title: "Ankara Veteriner Hekimleri Odası",
    publisher: "Türk Veteriner Hekimleri Birliği",
    url: "https://www.avho.org.tr/",
  },
  icatcare: {
    title: "Taking your cat to the vet",
    publisher: "International Cat Care",
    url: "https://icatcare.org/articles/taking-your-cat-to-the-vet",
  },
  merck: {
    title: "What to Do in a Dog or Cat Emergency",
    publisher: "Merck Veterinary Manual",
    url: "https://www.merckvetmanual.com/special-pet-topics/emergencies/what-to-do-in-a-dog-or-cat-emergency",
  },
  ovecler: wiki("Öveçler, Çankaya", "Öveçler,_Çankaya"),
  lizbon: wiki("Lizbon Caddesi", "Lizbon_Caddesi"),
  balgat: wiki("Balgat", "Balgat"),
  dikmen: wiki("Dikmen, Çankaya", "Dikmen,_Çankaya"),
  m5: wiki("M5 (Ankara Metrosu)", "M5_(Ankara_Metrosu)"),
  cukurambar: wiki("Çukurambar", "Çukurambar"),
  oran: wiki("Or-An", "Or-An"),
  sogutozu: wiki("Söğütözü", "Söğütözü"),
  sogutozuMetro: wiki("Söğütözü (Ankara Metrosu)", "Söğütözü_(Ankara_Metrosu)"),
  sogutozuAnkaray: wiki("Söğütözü (Ankaray)", "Söğütözü_(Ankaray)"),
  emek: wiki("Emek, Çankaya", "Emek,_Çankaya"),
  emekAnkaray: wiki("Emek (Ankaray)", "Emek_(Ankaray)"),
  milliKutuphane: wiki("Millî Kütüphane (Ankara Metrosu)", "Millî_Kütüphane_(Ankara_Metrosu)"),
  cankaya: wiki("Çankaya, Ankara", "Çankaya,_Ankara"),
} satisfies Record<string, Source>;

/** Shared, short: the one fact every page must state the same way. */
const busNight =
  "EGO'nun Kızılay'dan Öveçler'e inen 451 ve 454 hatlarında son seferler gece yarısından önce kalkıyor; dinî ve resmî bayramlarda bu hatlarda cumartesi tarifesi uygulanıyor. Gece yarısından sonra özel araç ya da taksi planlayın.";

export const locations: Location[] = [
  // ── Çankaya ─────────────────────────────────────────────────────────
  {
    slug: "cankaya-veteriner",
    district: "Çankaya",
    fromDistrict: "Çankaya'dan",
    directionsFrom: "Çankaya, Ankara",
    areaType: "AdministrativeArea",
    kind: "primary",
    title: "Çankaya'da 7/24 açık veteriner kliniği",
    metaTitle: "Çankaya Veteriner Kliniği · Öveçler'de 7/24 Açık",
    metaDescription:
      "Çankaya Öveçler'de gece, pazar ve bayram dâhil 7/24 açık veteriner kliniği. Kızılay, Ayrancı, Bahçelievler ve Çayyolu'ndan ulaşım. 0536 290 69 58.",
    keywords: [
      ...commonKeywords("Çankaya"),
      "çankaya gece açık veteriner",
      "çankaya nöbetçi veteriner",
    ],
    summary:
      "İlçenin tamamı için: Kızılay, Ayrancı, Bahçelievler, Esat, Yıldız ve Çayyolu'ndan hangi yolla gelinir.",
    intro:
      "Evet, Çankaya'da 7/24 açık bir veteriner kliniği var: Pet Internal, Çankaya'nın Öveçler semtinde, 1335. Sokak'ta. Gece, pazar ve resmî bayramlar dâhil kapımız açık; kedi ve köpeklerin yanı sıra kuş, tavşan ve ginepig gibi küçük dostları da kabul ediyoruz. Bu sayfada ilçenin farklı köşelerinden kliniğe hangi yollarla geleceğinizi ve gece gelirken nelere dikkat etmeniz gerektiğini topladık.",
    quickFacts: [
      { label: "Adres", value: ADDRESS },
      { label: "Çalışma saati", value: "7/24 — gece, hafta sonu ve resmî tatiller dâhil" },
      { label: "Ana bağlantı", value: "Çetin Emeç Bulvarı → Kabil Caddesi" },
      { label: "Kızılay'a uzaklık", value: "Kuş uçuşu yaklaşık 3,7 km" },
      { label: "Toplu taşıma", value: "Kızılay'dan Öveçler'e EGO 451 ve 454 (gece seferi yok)" },
    ],
    sections: [
      {
        h2: "Çankaya'nın neresindeyiz?",
        paragraphs: [
          "Çankaya, Ankara'nın en kalabalık ilçesi; 483 km²'lik alanında 124 mahalle var ve bunların 99'u şehir merkezinde. Bu kadar geniş bir ilçede \"Çankaya'da veteriner\" demek, Kızılay'da oturan biri için de Çayyolu'nda oturan biri için de farklı bir yol demek. Kliniğimiz Kızılay'ın güneybatısında, kuş uçuşu yaklaşık 3,7 km mesafedeki Öveçler'de; Balgat'ın güney sınırını çizen Çetin Emeç Bulvarı'ndan Kabil Caddesi'ne döndükten kısa süre sonra, 1335. Sokak üzerinde.",
          "Tek bir kliniğimiz var. Çankaya'nın başka bir semtinde şubemiz ya da muayene noktamız bulunmuyor; ilçe genelinden gelen tüm hastalarımızı bu adreste karşılıyoruz.",
        ],
      },
      {
        h2: "Çankaya içinde gece ve hafta sonu",
        paragraphs: [
          `Gece yarısı ya da pazar sabahı bir sorun çıktığında önce ${PHONE} numarasını arayın. Durumu kısaca anlatırsanız —ne zaman başladı, ne yedi, kaç kez oldu— siz yoldayken hazırlığa başlarız. Telefon aynı zamanda gelmeniz gerekip gerekmediğini birlikte değerlendirmenin en hızlı yolu.`,
          busNight,
          "Ankara'da eczanelerdeki gibi resmî bir nöbetçi veteriner çizelgesi yok; Ankara Veteriner Hekimleri Odası da nöbet listesi yayımlamıyor.",
        ],
        links: [
          { label: "Ankara'da 7/24 açık veteriner: gece, pazar ve bayram", href: `/veteriner/${ANKARA_SLUG}/` },
          { label: "Acil müdahale: hangi durumlar beklemez?", href: "/hizmetler/acil-mudahale/" },
        ],
      },
      {
        h2: "Semtinize özel ulaşım sayfaları",
        paragraphs: [
          "Çankaya'nın her semtinin yolu farklı. Balgat, Dikmen, Çukurambar, Or-An, Söğütözü ve Emek için hangi caddeden geleceğinizi, toplu taşıma seçeneklerini ve o semte özel soruları ayrı sayfalarda anlattık. Öveçler içinden geliyorsanız mahalle sayfamız size daha kısa bir tarif verir.",
        ],
        links: [
          { label: "Öveçler", href: "/veteriner/ovecler-veteriner/" },
          { label: "Balgat", href: "/veteriner/balgat-veteriner/" },
          { label: "Dikmen", href: "/veteriner/dikmen-veteriner/" },
          { label: "Çukurambar", href: "/veteriner/cukurambar-veteriner/" },
          { label: "Söğütözü", href: "/veteriner/sogutozu-veteriner/" },
          { label: "Emek", href: "/veteriner/emek-veteriner/" },
          { label: "Or-An", href: "/veteriner/or-an-veteriner/" },
        ],
      },
    ],
    routes: {
      caption:
        "Çankaya'nın farklı semtlerinden kliniğe giden ana yollar (OpenStreetMap güzergâhı; mesafeler yaklaşık, süre trafiğe göre değişir).",
      rows: [
        { from: "Kızılay", via: "Kızılay → Dikmen Caddesi → Çetin Emeç Bulvarı → Kabil Caddesi", note: "Kuş uçuşu ~3,7 km; EGO 451/454 aynı aksı izler" },
        { from: "Ayrancı", via: "Çetin Emeç Bulvarı (batı yönü) → Kabil Caddesi", note: "Kuş uçuşu ~2 km, yol ~2,6 km" },
        { from: "Bahçelievler", via: "Kazakistan Caddesi → Ziyabey Caddesi → Ceyhun Atuf Kansu Caddesi → Çetin Emeç Bulvarı", note: "Yol ~5,5 km" },
        { from: "Esat, Küçükesat", via: "Güvenlik Caddesi → Mesnevi Caddesi → Çetin Emeç Bulvarı → Kabil Caddesi", note: "Yol ~5,5 km" },
        { from: "Yıldız", via: "Sinan Caddesi → Mimar Caddesi → Kabil Caddesi", note: "Yol ~5,5 km" },
        { from: "Çayyolu, Ümitköy", via: "Eskişehir Yolu (Dumlupınar Bulvarı) → Muhsin Yazıcıoğlu Caddesi → Çetin Emeç Bulvarı", note: "Yol ~16 km" },
      ],
    },
    gettingHere: [
      "Çankaya'nın hangi semtinden gelirseniz gelin, son kısım çoğunlukla aynı: Çetin Emeç Bulvarı'ndan Kabil Caddesi'ne dönüp 1335. Sokak'a giriyorsunuz.",
    ],
    access: [
      `Adres: ${ADDRESS}.`,
      "Kızılay'dan toplu taşımayla: EGO 451 (Kabil Cd.) ve 454 (Lizbon Cd.) hatları Dikmen Caddesi ve Çetin Emeç Bulvarı üzerinden Öveçler'e iner.",
      "Kliniğin çevresinde metro ya da Ankaray istasyonu yok; en yakın raylı sistem istasyonları (M2 Millî Kütüphane ve Söğütözü) kuş uçuşu 2,5 km'den uzakta.",
    ],
    visits: {
      h2: "Çankaya'dan hangi durumlarda gelinir?",
      items: [
        { text: "Yıllık kontrol, aşı takvimi ve mikroçip kaydı", label: "Aşılama & Mikroçip", href: "/hizmetler/asilama-mikrocip/" },
        { text: "Çok su içme, kilo kaybı, iştahsızlık gibi şikâyetlerde tahlil ve ultrason", label: "Laboratuvar & Görüntüleme", href: "/hizmetler/laboratuvar-goruntuleme/" },
        { text: "Böbrek, tiroid, kalp gibi kronik hastalıkların takibi", label: "Dermatoloji & Dahiliye", href: "/hizmetler/dermatoloji-dahiliye/" },
        { text: "Gece ya da hafta sonu başlayan nefes güçlüğü, nöbet, idrar yapamama", label: "Acil Müdahale", href: "/hizmetler/acil-mudahale/" },
        { text: "Muhabbet kuşu, tavşan ve ginepig muayenesi", label: "Kuş, Tavşan & Küçük Dostlar", href: "/hizmetler/kus-tavsan-kucuk-memeliler/" },
      ],
    },
    bring: [
      "Başka bir klinikte yapılmış tahlil, ultrason ya da röntgen raporları (fotoğraf veya PDF yeterli)",
      "Kullandığı ilaçların adı ve son verilme saati",
      "Aşı karnesi ve mikroçip numarası",
      "Kedi için kapalı taşıma kabı, köpek için kısa tasma",
    ],
    faqs: [
      {
        q: "Çankaya'da 7/24 açık veteriner var mı?",
        a: `Evet. Kliniğimiz Çankaya'nın Öveçler semtinde (${ADDRESS}) 7/24 açık; gece, hafta sonu ve resmî bayramlarda da hasta kabul ediyoruz. Yola çıkmadan ${PHONE} numarasını aramanız, siz gelene kadar hazırlık yapmamızı sağlar.`,
      },
      {
        q: "Çankaya'da gece veya pazar günü açık veteriner bulabilir miyim?",
        a: "Kliniğimiz pazar dâhil her gün, gece de açık. Başka kliniklerin çalışma saatlerini bilemeyiz; hangi kliniğe giderseniz gidin gece yola çıkmadan önce arayıp açık olduğunu teyit etmenizi öneririz.",
      },
      {
        q: "Çankaya'da acil veteriner gerektiğinde ne yapmalıyım?",
        a: "Önce arayın ve durumu kısaca anlatın: ne zaman başladı, ne yemiş olabilir, kaç kez oldu. Nefes güçlüğü, bilinç kaybı, durmayan nöbet, kontrolsüz kanama ve erkek kedide idrar yapamama beklemez. Acil durumda randevu gerekmez.",
      },
      {
        q: "Çankaya'da nöbetçi veteriner listesi var mı?",
        a: "Ankara'da eczanelerdeki gibi resmî bir nöbetçi veteriner çizelgesi yok; Ankara Veteriner Hekimleri Odası da nöbet listesi yayımlamıyor. Bu yüzden gece açık olduğunu bildiğiniz bir kliniğin numarasını önceden kaydetmek en pratik yol.",
      },
      {
        q: "Çankaya'nın başka bir semtinde şubeniz var mı?",
        a: `Hayır. Tek kliniğimiz Öveçler'de: ${ADDRESS}. Balgat, Dikmen, Çukurambar gibi semtler için hazırladığımız sayfalar yalnızca oradan nasıl geleceğinizi anlatıyor.`,
      },
      {
        q: "Kızılay'dan toplu taşımayla gelebilir miyim?",
        a: "Gündüz ve akşam saatlerinde EGO'nun 451 ve 454 hatları Kızılay'dan Dikmen Caddesi ve Çetin Emeç Bulvarı üzerinden Öveçler'e iniyor. Son seferler gece yarısından önce kalktığı için gece özel araç ya da taksi planlayın; güncel saatler EGO'nun sitesinde.",
      },
      {
        q: "Kedi ve köpek dışında hangi hayvanlara bakıyorsunuz?",
        a: "Muhabbet kuşu gibi kafes kuşlarını, tavşanları, ginepigleri ve diğer küçük memelileri de kabul ediyoruz. Bu hayvanlarda belirtiler geç fark edildiği için iştahsızlık ya da kabarık tüy gibi değişikliklerde beklemeden arayın.",
      },
    ],
    relatedPosts: [
      "ankara-acil-veteriner-nereye-gidilir",
      "veteriner-acil-hangi-durumlar",
      "evcil-hayvan-check-up-neleri-kapsar",
      "kedilerde-kronik-bobrek-hastaligi",
      "mikrocip-cezasi-ve-petvet-2026",
    ],
    services: ["acil-mudahale", "genel-muayene-check-up", "laboratuvar-goruntuleme"],
    sources: [SRC.cankaya, SRC.balgat, SRC.osm, SRC.ego451, SRC.ego454, SRC.avho, SRC.milliKutuphane, SRC.sogutozuMetro],
  },

  // ── Öveçler ─────────────────────────────────────────────────────────
  {
    slug: "ovecler-veteriner",
    district: "Öveçler",
    fromDistrict: "Öveçler'den",
    directionsFrom: "Öveçler, Çankaya, Ankara",
    kind: "primary",
    title: "Öveçler veteriner kliniği: Kabil Caddesi yakınında, 7/24",
    metaTitle: "Öveçler Veteriner Kliniği · 1335. Sokak, 7/24 Açık",
    metaDescription:
      "Öveçler'de, Kabil Caddesi yakınında 1335. Sokak'ta 7/24 açık veteriner kliniği. Lizbon ve Kabil Caddesi'nden yürüyerek, EGO 451/454 ile ulaşım.",
    keywords: [
      ...commonKeywords("Öveçler"),
      "öveçler veteriner kliniği",
      "kabil caddesi veteriner",
      "lizbon caddesi veteriner",
    ],
    summary:
      "Kliniğin bulunduğu mahalle: Kabil ve Lizbon Caddesi'nden yürüyerek, Ata ve Huzur mahallelerinden kısa tarif.",
    intro: `Kliniğimiz Öveçler'in içinde: ${ADDRESS}. Öveçler'de oturuyorsanız büyük ihtimalle yürüyerek gelebileceğiniz bir mesafedeyiz. Gece, pazar ve bayram dâhil 7/24 açığız; aşı ve kontrol gibi planlı ziyaretlerden gece başlayan acil durumlara kadar aynı kapıdan giriyorsunuz.`,
    quickFacts: [
      { label: "Adres", value: ADDRESS },
      { label: "Konum", value: "Kabil Caddesi'nin Çetin Emeç Bulvarı'na yakın ucu" },
      { label: "Çalışma saati", value: "7/24 — gece, pazar ve bayram dâhil" },
      { label: "EGO", value: "451 Kabil Caddesi'ni, 454 Lizbon Caddesi'ni izler" },
    ],
    sections: [
      {
        h2: "Öveçler'in iki caddesi ve kliniğin yeri",
        paragraphs: [
          "Öveçler iki ana caddenin çevresinde şekillenmiş bir semt: Öveçler 2. Cadde olarak da bilinen Lizbon Caddesi ve Öveçler 4. Cadde olarak bilinen Kabil Caddesi. Lizbon Caddesi Dikmen Caddesi'nden başlayıp Çetin Emeç Bulvarı'na kadar uzanıyor ve Ata ile Huzur mahallelerini ikiye bölüyor. 1980'lerin başında gecekondu bölgesi olan Öveçler, kentsel dönüşümle bugünkü planlı görünümüne kavuştu.",
          "Kliniğimiz Kabil Caddesi'nin kuzey ucunda, Çetin Emeç Bulvarı'na yakın kesimde, 1335. Sokak üzerinde. Resmî adreste Öveçler yazsa da semt; Öveçler, Aşağı Öveçler, Yukarı Öveçler, Ata ve Huzur gibi birkaç mahalleye yayılıyor. Hangisinde oturursanız oturun tarif aynı: Kabil Caddesi'ni kuzeye, Çetin Emeç Bulvarı yönüne doğru izleyin.",
        ],
      },
      {
        h2: "Mahalle içinden yürüyerek gelirken",
        paragraphs: [
          "Yürüyerek gelmek kısa mesafede pratik, ama hayvan için her zaman en sakin yol değil. Kediler tanıdık sokakta bile ürkebilir; sert ve üstten açılan bir taşıma kabı, kabın üzerine örtülen bir havlu ve içine evden tanıdık kokan bir örtü yolculuğu kolaylaştırır. Kabı sapından sallamak yerine altından tutarak taşıyın.",
          "Köpeklerde kısa tasma kullanın; bekleme alanında başka hayvanlar olabilir. Ağrısı olan, yürümekte zorlanan ya da nefes almakta güçlük çeken bir hayvanı yürütmeyin; kısa mesafe olsa bile araçla ya da kucakta, bir battaniyeyle destekleyerek getirin.",
        ],
      },
      {
        h2: "Gece Öveçler'de bir sorun çıktığında",
        paragraphs: [
          `Gece yarısı kediniz sık sık kum kabına girip çıkıyor ya da köpeğiniz durmadan öğürüyorsa, beklemek yerine ${PHONE} numarasını arayın; mahalle içinden kısa sürede kapıda olabilirsiniz. Telefonda kısaca anlattığınız bilgiler, kapıdan girdiğiniz anda değerlendirmeye başlamamızı sağlar.`,
          "Kronik hastalığı olan dostlarda böbrek, tiroid ya da diyabet takibinin önemli bir parçası, kontrol aralıklarını aksatmamak. Kontrol tarihini çıkışta birlikte planlıyoruz.",
        ],
        links: [{ label: "Bu acil mi? Beklemeden gelmeniz gereken 14 belirti", href: "/blog/veteriner-acil-hangi-durumlar/" }],
      },
    ],
    routes: {
      caption: "Öveçler içinden kliniğe (OpenStreetMap ve EGO durak listeleri).",
      rows: [
        { from: "Kabil Caddesi (güneyi, Ata Mahallesi tarafı)", via: "Kabil Caddesi'ni kuzeye, Çetin Emeç Bulvarı yönüne izleyin → 1335. Sokak", note: "EGO 451 bu caddeyi izler" },
        { from: "Lizbon Caddesi (Ata–Huzur)", via: "Lizbon Caddesi → Çetin Emeç Bulvarı → Kabil Caddesi", note: "EGO 454 Lizbon Caddesi'ne iner" },
        { from: "Aşağı Öveçler", via: "Çetin Emeç Bulvarı → Kabil Caddesi → 1335. Sokak", note: "Bulvara yakın kesim" },
        { from: "Kızılay'dan otobüsle", via: "EGO 451: Kızılay → Dikmen Caddesi → Çetin Emeç Bulvarı → Kabil Caddesi", note: "Son sefer gece yarısından önce" },
      ],
    },
    gettingHere: [
      "Öveçler içinden geliyorsanız Kabil Caddesi'ni izlemeniz yeterli; klinik caddenin Çetin Emeç Bulvarı'na yakın ucunda, 1335. Sokak'ta. Araçla geliyorsanız Çetin Emeç Bulvarı'ndan Kabil Caddesi'ne dönün.",
    ],
    access: [
      `Adres: ${ADDRESS}.`,
      "EGO 451 (Ulus–Kızılay–Öveçler–Kabil Cd.) Kabil Caddesi boyunca, 454 (Örnek–Kızılay–Öveçler–Lizbon Cd.) Lizbon Caddesi'ne iner.",
      busNight,
    ],
    visits: {
      h2: "Öveçler'den hangi durumlarda gelinir?",
      items: [
        { text: "Yavru kedi ve köpeklerde ilk muayene, aşı takvimi ve parazit koruması", label: "Aşılama & Mikroçip", href: "/hizmetler/asilama-mikrocip/" },
        { text: "Kronik hastalık takibinde düzenli kan ve idrar kontrolleri", label: "Laboratuvar & Görüntüleme", href: "/hizmetler/laboratuvar-goruntuleme/" },
        { text: "Kısırlaştırma öncesi görüşme ve ameliyat sonrası kontroller", label: "Kısırlaştırma & Cerrahi", href: "/hizmetler/kisirlastirma-cerrahi/" },
        { text: "Tırnak kesimi, tüy bakımı gibi kısa işlemler", label: "Pet Kuaför & Bakım", href: "/hizmetler/pet-kuafor-bakim/" },
        { text: "Gece başlayan kusma, nefes güçlüğü ya da idrar yapamama", label: "Acil Müdahale", href: "/hizmetler/acil-mudahale/" },
      ],
    },
    bring: [
      "Kedi için üstten açılan sert taşıma kabı ve evden tanıdık kokan bir örtü",
      "Yavru için ilk ziyarette sahiplendiğiniz yerden aldığınız aşı ve parazit kayıtları",
      "Kronik takipte son kontrolden bu yana evde not ettiğiniz su tüketimi, kilo ve iştah değişiklikleri",
    ],
    faqs: [
      {
        q: "Öveçler'de 7/24 açık veteriner var mı?",
        a: `Evet. Kliniğimiz Öveçler'de, ${ADDRESS} adresinde 7/24 açık. Gece, pazar ve resmî bayramlarda da hasta kabul ediyoruz.`,
      },
      {
        q: "Gece ya da pazar günü Öveçler'den gelebilir miyiz?",
        a: `Evet. Yola çıkmadan önce ${PHONE} numarasını arayıp durumu kısaca anlatmanız, siz gelene kadar hazırlık yapmamızı sağlar. Mahalle içinden geliyorsanız kısa sürede kapıda olabilirsiniz.`,
      },
      {
        q: "Öveçler'de acil veteriner gerektiğinde ne yapmalıyım?",
        a: "Arayın ve gelin; acil durumda randevu gerekmez. Nefes güçlüğü, bilinç kaybı, durmayan nöbet, kontrolsüz kanama ve erkek kedide idrar yapamama beklemeyen durumlardır. Kanama varsa temiz bir bezle bastırmak dışında evde müdahale denemeyin.",
      },
      {
        q: "Klinik Öveçler'in neresinde, nasıl bulurum?",
        a: "Kabil Caddesi'nin Çetin Emeç Bulvarı'na yakın ucunda, 1335. Sokak üzerindeyiz. Öveçler'in içinden Kabil Caddesi'ni kuzeye doğru izlemeniz yeterli; araçla Çetin Emeç Bulvarı'ndan Kabil Caddesi'ne dönün.",
      },
      {
        q: "Öveçler'de eve muayene hizmeti veriyor musunuz?",
        a: "Muayene ve tetkikler klinikte yapılıyor. Pek çok şikâyette tanı için tahlil ve görüntüleme gerektiğinden muayeneyi klinikte yapıyoruz.",
      },
      {
        q: "Yavru kedi ya da köpeğimin aşılarını yaptırabilir miyiz?",
        a: "Evet. Aşı takvimi, iç ve dış parazit koruması ve mikroçip kaydı klinikte yapılıyor. İlk aşıdan önce genel bir muayeneyle başlıyoruz; aşı takvimini dostunuzun yaşına ve yaşam koşullarına göre birlikte planlıyoruz.",
      },
      {
        q: "Kedim yakın mesafede bile çok stresleniyor, ne yapabilirim?",
        a: "Taşıma kabını yalnızca veteriner günü çıkarmak yerine evde açık bırakın ki kediniz içinde uyumaya alışsın. Yolda kabın üzerini bir havluyla örtün ve kabı altından tutarak taşıyın. Geldiğinizde kedinizin stresli olduğunu söylerseniz bekleme süresini kısaltmaya çalışırız.",
      },
    ],
    relatedPosts: [
      "kedi-asi-takvimi",
      "kopek-asi-takvimi",
      "kedim-veterinerde-panikliyor",
      "yavru-kopek-bakim-rehberi",
      "kene-ve-pire-korunma",
    ],
    services: ["asilama-mikrocip", "genel-muayene-check-up", "acil-mudahale"],
    sources: [SRC.ovecler, SRC.lizbon, SRC.osm, SRC.ego451, SRC.ego454, SRC.icatcare],
  },

  // ── Balgat ──────────────────────────────────────────────────────────
  {
    slug: "balgat-veteriner",
    district: "Balgat",
    fromDistrict: "Balgat'tan",
    directionsFrom: "Balgat, Çankaya, Ankara",
    kind: "nearby",
    title: "Balgat'tan gelenler için veteriner: Öveçler'de, 7/24 açık",
    metaTitle: "Balgat'a Yakın Veteriner Kliniği · 7/24 Açık, Öveçler",
    metaDescription:
      "Balgat'ın güney sınırı Çetin Emeç Bulvarı'nın karşısında, Öveçler'de 7/24 açık veteriner kliniği. Ceyhun Atuf Kansu ve Ziyabey Caddesi'nden yol tarifi.",
    keywords: [...commonKeywords("Balgat"), "balgat gece açık veteriner"],
    summary:
      "Balgat'ın güney sınırı Çetin Emeç Bulvarı'nın öbür yakasındayız; Ceyhun Atuf Kansu Caddesi'nden kısa bir yol.",
    intro:
      "Balgat'ta şubemiz yok; kliniğimiz Balgat'ın hemen güneyinde, Çetin Emeç Bulvarı'nın karşı yakasındaki Öveçler'de. Balgat'tan gelen kedi, köpek, kuş ve tavşan sahipleri için gece, pazar ve bayram dâhil 7/24 açığız. Aşağıda Balgat'ın hangi kesiminden hangi yolla geleceğinizi ve gece gelirken nelere dikkat etmeniz gerektiğini anlattık.",
    quickFacts: [
      { label: "Klinik nerede", value: "Öveçler, Kabil Caddesi yakınında 1335. Sokak (Balgat'ta değil)" },
      { label: "Kuş uçuşu", value: "Balgat'ın güneyinden ~1,2 km, Balgat Mahallesi merkezinden ~2 km" },
      { label: "Ana bağlantı", value: "Ceyhun Atuf Kansu Caddesi → Çetin Emeç Bulvarı → Kabil Caddesi" },
      { label: "Çalışma saati", value: "7/24 — gece, pazar ve bayram dâhil" },
    ],
    sections: [
      {
        h2: "Balgat ile Öveçler arasında bir bulvar var",
        paragraphs: [
          "Balgat; Konya Yolu (Mevlânâ Bulvarı), Türkocağı Caddesi, Çetin Emeç Bulvarı ve İnönü Bulvarı arasında kalan, Nasuh Akar, Oğuzlar, Ehlibeyt ve Balgat mahallelerinden oluşan bir semt. Güney sınırını çizen Çetin Emeç Bulvarı'nı geçtiğinizde Öveçler başlıyor. Kliniğimiz bulvardan Kabil Caddesi'ne döndükten kısa süre sonra, 1335. Sokak üzerinde.",
          "Harita verisine göre Oğuzlar–Ehlibeyt tarafından kliniğe kuş uçuşu yaklaşık 1,2 km, Balgat Mahallesi'nin merkezinden yaklaşık 2 km var; araçla izlenen yol bunun biraz üzerinde. Süre saate ve trafiğe göre değiştiği için dakika vermiyoruz.",
        ],
      },
      {
        h2: "Gece ya da hafta sonu Balgat'tan gelirken",
        paragraphs: [
          `Gece yola çıkmadan önce ${PHONE} numarasını arayın. Durumu kısaca anlatırsanız siz Çetin Emeç Bulvarı'na varmadan hazırlığa başlarız. Gece trafiği hafif olsa da acele etmeyin; hayvanınız taşıma kabında ya da tasmada güvendeyken sakin sürüş, birkaç dakika kazanmaktan daha önemli.`,
          busNight,
        ],
      },
      {
        h2: "Balgat'tan planlı ziyaretler",
        paragraphs: [
          "Aşı, yıllık kontrol ya da kronik hastalık takibi gibi planlı ziyaretlerde önceden arayıp saat belirlemeniz bekleme süresini kısaltır.",
          "Çok su içme, kilo kaybı ya da iştah değişikliği gibi şikâyetlerde aynı ziyarette kan ve idrar tahlili isteyebiliriz. Aç gelmeniz gerekip gerekmediğini randevu alırken sorun; su her zaman serbest kalmalı.",
        ],
      },
    ],
    routes: {
      caption: "Balgat'tan kliniğe ana yollar (OpenStreetMap güzergâhı, mesafeler yaklaşık).",
      rows: [
        { from: "Balgat Mahallesi, Ziyabey Caddesi", via: "Ziyabey Caddesi → Ceyhun Atuf Kansu Caddesi → Çetin Emeç Bulvarı (doğu yönü) → Kabil Caddesi", note: "Yol ~2,7 km" },
        { from: "Oğuzlar, Ehlibeyt", via: "Çetin Emeç Bulvarı (doğu yönü) → Kabil Caddesi → 1335. Sokak", note: "Yol ~1,4 km" },
        { from: "Konya Yolu (Mevlânâ Bulvarı) tarafı", via: "Mevlânâ Bulvarı → Çetin Emeç Bulvarı → Kabil Caddesi", note: "Yol ~2,2 km" },
      ],
    },
    gettingHere: [
      "Balgat'ın neresinden çıkarsanız çıkın, rota Çetin Emeç Bulvarı'na bağlanıyor. Bulvarda doğuya ilerleyip Kabil Caddesi'ne dönün; klinik caddenin bulvara yakın ucunda, 1335. Sokak'ta.",
    ],
    access: [
      `Klinik adresi: ${ADDRESS}.`,
      "Balgat'tan Öveçler'e toplu taşımayla gelmeyi düşünüyorsanız güncel hat ve saatleri EGO'nun sitesinden kontrol edin; Kızılay'dan Öveçler'e EGO 451 ve 454 iner.",
    ],
    visits: {
      h2: "Balgat'tan hangi durumlarda gelinir?",
      items: [
        { text: "Aşı takvimi, yıllık kontrol ve mikroçip kaydı", label: "Aşılama & Mikroçip", href: "/hizmetler/asilama-mikrocip/" },
        { text: "Çok su içme, kilo kaybı, iştah değişikliği için kan-idrar tahlili", label: "Laboratuvar & Görüntüleme", href: "/hizmetler/laboratuvar-goruntuleme/" },
        { text: "Kısırlaştırma öncesi görüşme ve ameliyat sonrası kontroller", label: "Kısırlaştırma & Cerrahi", href: "/hizmetler/kisirlastirma-cerrahi/" },
        { text: "Gece başlayan kusma, nefes güçlüğü ya da idrar yapamama", label: "Acil Müdahale", href: "/hizmetler/acil-mudahale/" },
      ],
    },
    bring: [
      "Kedi için sert taşıma kabı, köpek için kısa tasma",
      "Kullandığı ilaçların kutuları ya da fotoğrafı",
      "Varsa önceki tahlil sonuçları ve aşı karnesi",
      "Kusma ya da ishal varsa bir fotoğrafı; ne zaman başladığını gösteren kısa bir not",
    ],
    faqs: [
      {
        q: "Balgat'ta 7/24 açık veteriner var mı?",
        a: "Balgat'ta şubemiz yok; ama Balgat'ın güney sınırındaki Çetin Emeç Bulvarı'nın karşısında, Öveçler'deki kliniğimiz 7/24 açık. Başka kliniklerin saatlerini bilemeyiz; hangi kliniğe giderseniz gidin gece yola çıkmadan arayıp açık olduğunu teyit edin.",
      },
      {
        q: "Gece ya da pazar günü Balgat'tan gelebilir miyiz?",
        a: `Evet. Gece, pazar ve resmî bayramlarda da açığız. Yola çıkmadan ${PHONE} numarasını arayıp durumu kısaca anlatmanız, siz gelene kadar hazırlık yapmamızı sağlar.`,
      },
      {
        q: "Balgat'tan acil bir durumda ne yapmalıyım?",
        a: "Önce arayın, sonra yola çıkın. Nefes güçlüğü, bilinç kaybı, durmayan nöbet, kontrolsüz kanama, zehirlenme şüphesi ve erkek kedide idrar yapamama beklemez. Acil durumda randevu gerekmez.",
      },
      {
        q: "Balgat'ta şubeniz var mı?",
        a: `Hayır. Tek kliniğimiz var ve adresi ${ADDRESS}. Balgat'tan gelen hastalarımızı bu adreste karşılıyoruz.`,
      },
      {
        q: "Balgat'tan hangi yoldan gelmeliyim?",
        a: "Balgat'ın içinden Ceyhun Atuf Kansu Caddesi'ni, Konya Yolu tarafından Mevlânâ Bulvarı'nı kullanarak Çetin Emeç Bulvarı'na çıkın; bulvarda doğuya ilerleyip Kabil Caddesi'ne dönün. Klinik caddenin bulvara yakın ucunda, 1335. Sokak'ta.",
      },
      {
        q: "Kedimi Balgat'tan nasıl taşımalıyım?",
        a: "Sert ve tercihen üstten açılan bir taşıma kabı kullanın, içine evden tanıdık kokan bir örtü koyun. Kabı araçta emniyet kemeriyle ya da ön koltuğun önündeki boşlukta sabitleyin ve üzerini bir havluyla örtün. Kısa mesafe bile olsa kucakta taşımak risklidir.",
      },
      {
        q: "Kronik hastalık takibi için ne sıklıkla gelmemiz gerekir?",
        a: "Böbrek, tiroid, diyabet ya da kalp hastalığı takibinde kontrol aralığı hastalığın evresine göre belirlenir; tek bir doğru sıklık yok. Muayene sonunda bir sonraki kontrol tarihini birlikte planlıyoruz.",
      },
    ],
    relatedPosts: [
      "veteriner-acil-hangi-durumlar",
      "kedilerde-kronik-bobrek-hastaligi",
      "kopegim-cok-su-iciyor",
      "anestezi-oncesi-ac-kalma-suresi",
    ],
    services: ["laboratuvar-goruntuleme", "asilama-mikrocip", "acil-mudahale"],
    sources: [SRC.balgat, SRC.osm, SRC.ego451, SRC.ego454, SRC.icatcare],
  },

  // ── Dikmen ──────────────────────────────────────────────────────────
  {
    slug: "dikmen-veteriner",
    district: "Dikmen",
    fromDistrict: "Dikmen'den",
    directionsFrom: "Dikmen, Çankaya, Ankara",
    kind: "nearby",
    title: "Dikmen'den gelenler için veteriner: Öveçler'de, 7/24 açık",
    metaTitle: "Dikmen'e Yakın Veteriner Kliniği · 7/24 Açık, Öveçler",
    metaDescription:
      "Dikmen Caddesi'nden Lizbon ya da Kabil Caddesi'ne inerek ulaşılan, Öveçler'de 7/24 açık veteriner kliniği. Gece, pazar ve bayramda açık.",
    keywords: [...commonKeywords("Dikmen"), "dikmen caddesi veteriner"],
    summary:
      "Dikmen Caddesi'nden Lizbon ya da Mimar Caddesi üzerinden Öveçler'e: Dikmen'in kuzeyinden, ortasından ve güneyinden tarif.",
    intro:
      "Dikmen'de şubemiz yok; kliniğimiz Dikmen'in batısındaki komşu semt Öveçler'de, 1335. Sokak'ta. Dikmen Caddesi'nden Öveçler'e inen yollarla Dikmen'in her kesiminden ulaşabilirsiniz. Gece, pazar ve bayram dâhil 7/24 açığız; bu sayfada Dikmen'in kuzeyinden, ortasından ve güneyinden gelirken kullanabileceğiniz yolları anlattık.",
    quickFacts: [
      { label: "Klinik nerede", value: "Öveçler, Kabil Caddesi yakınında 1335. Sokak (Dikmen'de değil)" },
      { label: "Kuş uçuşu", value: "Dikmen semt merkezinden ~1,6 km" },
      { label: "Ana bağlantı", value: "Dikmen Caddesi → Lizbon ya da Mimar Caddesi → Kabil Caddesi" },
      { label: "Raylı sistem", value: "Dikmen'e metro yok; M5 hattı henüz plan aşamasında" },
    ],
    sections: [
      {
        h2: "Dikmen Caddesi ve Öveçler'e inen yollar",
        paragraphs: [
          "Dikmen, 1936'da bucak olmuş, 1960'ta bucak teşkilatının kaldırılmasıyla Çankaya'nın bir semtine dönüşmüş eski bir yerleşim. Semtin omurgası Dikmen Caddesi: harita verisine göre cadde kuzeyde Ayrancı ve Kızılay tarafından başlayıp güneyde Or-An'a kadar uzanıyor. Öveçler, bu caddenin batısında kalıyor.",
          "Dikmen Caddesi'nden Öveçler'e geçmenin birkaç yolu var. Öveçler 2. Cadde olarak da bilinen Lizbon Caddesi doğrudan Dikmen Caddesi'nden başlıyor ve Çetin Emeç Bulvarı'na kadar iniyor. Dikmen'in orta kesiminden ise Mimar Caddesi sizi Kabil Caddesi'ne bağlıyor. Klinik, Kabil Caddesi'nin Çetin Emeç Bulvarı'na yakın ucunda.",
        ],
      },
      {
        h2: "Dikmen'den toplu taşıma",
        paragraphs: [
          "Dikmen'den kliniğe raylı sistemle gelmek şu an mümkün değil. Kızılay'dan Dikmen yönüne planlanan M5 metro hattının projesi Nisan 2025'te onaylandı, ancak yapım ihalesi için yatırım programına alınması bekleniyor.",
          `Gündüz ve akşam saatlerinde EGO'nun 451 ve 454 hatları Kızılay'dan Dikmen Caddesi'nin kuzey kesimini ve Çetin Emeç Bulvarı'nı izleyerek Öveçler'e iniyor. ${busNight}`,
        ],
      },
      {
        h2: "Yolda durum kötüleşirse",
        paragraphs: [
          `Dikmen'den gelirken dostunuzun durumu yolda kötüleşirse güvenli bir yerde durun ve ${PHONE} numarasını arayın. Telefonda yolda yapabileceklerinizi anlatabilir, siz gelene kadar hazırlığı tamamlayabiliriz. Nefes almakta zorlanan bir hayvanı sıkı sarmayın, aracı serin tutun ve camı tamamen açmayın.`,
          "Yaralı bir köpeği taşırken baş, boyun ve sırt hareketini azaltmak için düz ve sert bir yüzey ya da katlanmış bir battaniye kullanın. Acı çeken en sakin hayvan bile ısırabilir; kendinizi de koruyun.",
        ],
      },
    ],
    routes: {
      caption: "Dikmen'den kliniğe ana yollar (OpenStreetMap güzergâhı, mesafeler yaklaşık).",
      rows: [
        { from: "Dikmen'in kuzeyi (Dikmen Caddesi–Ayrancı tarafı)", via: "Dikmen Caddesi → Lizbon Caddesi ya da Çetin Emeç Bulvarı → Kabil Caddesi", note: "EGO 451/454 bu aksı izler" },
        { from: "Dikmen'in ortası (Aydınlar, İlkadım çevresi)", via: "Dikmen Caddesi → Mimar Caddesi → Kabil Caddesi", note: "Yol ~2,1 km" },
        { from: "Dikmen Caddesi'nin güney kesimi (Akpınar tarafı)", via: "Dikmen Caddesi → Kabil Caddesi (kuzey yönü)", note: "Yol ~5 km" },
      ],
    },
    gettingHere: [
      "Dikmen Caddesi'nden batıya, Öveçler'e doğru inin; Lizbon Caddesi ya da Mimar Caddesi sizi Kabil Caddesi'ne ulaştırır. Klinik, Kabil Caddesi'nin Çetin Emeç Bulvarı'na yakın ucunda, 1335. Sokak'ta.",
    ],
    access: [
      `Klinik adresi: ${ADDRESS}. Dikmen'de şubemiz yoktur.`,
      "EGO 451 ve 454, Kızılay'dan Dikmen Caddesi'nin kuzey kesimi ve Çetin Emeç Bulvarı üzerinden Öveçler'e iner.",
    ],
    visits: {
      h2: "Dikmen'den hangi durumlarda gelinir?",
      items: [
        { text: "Nefes güçlüğü, hızlı ya da ağızdan soluma", label: "Acil Müdahale", href: "/hizmetler/acil-mudahale/" },
        { text: "Kalp üfürümü, öksürük, egzersiz isteksizliği için muayene ve görüntüleme", label: "Laboratuvar & Görüntüleme", href: "/hizmetler/laboratuvar-goruntuleme/" },
        { text: "Tiroid ve diğer hormon hastalıklarının takibi", label: "Dermatoloji & Dahiliye", href: "/hizmetler/dermatoloji-dahiliye/" },
        { text: "Yıllık genel muayene ve check-up", label: "Genel Muayene & Check-up", href: "/hizmetler/genel-muayene-check-up/" },
      ],
    },
    bring: [
      "Nefes şikâyeti varsa evde dinlenirken saydığınız solunum sayısı ya da kısa bir video",
      "Kullandığı ilaçların adı ve son verilme saati",
      "Önceki ultrason, röntgen ya da ekokardiyografi raporları",
    ],
    faqs: [
      {
        q: "Dikmen'de 7/24 açık veteriner var mı?",
        a: "Dikmen'de bir şubemiz bulunmuyor. Dikmen Caddesi'nin batısında kalan Öveçler'deki kliniğimiz ise gece gündüz açık. Diğer kliniklerin çalışma saatleri hakkında bilgimiz yok; gece yola çıkmadan, gideceğiniz yeri arayıp teyit etmeniz en sağlıklısı.",
      },
      {
        q: "Gece ya da pazar günü Dikmen'den gelebilir miyiz?",
        a: `Evet. Pazar ve bayram dâhil gece de hasta kabul ediyoruz. Dikmen'den çıkmadan ${PHONE} numarasını arayın; hangi yoldan geleceğinizi ve yolda nelere dikkat edeceğinizi de birlikte konuşabiliriz.`,
      },
      {
        q: "Dikmen'den acil bir durumda ne yapmalıyım?",
        a: "Önce telefon, sonra yol: durumu anlatın, randevu beklemeden gelin. Nefes güçlüğü, bilinç kaybı, durmayan nöbet ve kontrolsüz kanama beklemez. Kanamada temiz bir bezle bastırmak dışında evde müdahale denemeyin.",
      },
      {
        q: "Dikmen'de bir şubeniz bulunuyor mu?",
        a: `Hayır. Tek adresimiz ${ADDRESS}. Dikmen'den gelen hastalarımızı bu klinikte karşılıyoruz.`,
      },
      {
        q: "Dikmen Caddesi'nden kliniğe nasıl inerim?",
        a: "Dikmen'in kuzey kesimindeyseniz Lizbon Caddesi ya da Çetin Emeç Bulvarı'nı, orta kesimindeyseniz Mimar Caddesi'ni kullanarak Kabil Caddesi'ne inin. Klinik Kabil Caddesi'nin Çetin Emeç Bulvarı'na yakın ucunda, 1335. Sokak'ta.",
      },
      {
        q: "Dikmen'den metroyla gelebilir miyim?",
        a: "Şu an hayır. Dikmen yönüne planlanan M5 hattı henüz yapım aşamasına geçmedi. Gündüz ve akşam EGO'nun 451 ve 454 hatlarını kullanabilirsiniz; gece için özel araç ya da taksi planlayın.",
      },
      {
        q: "Yolda dostumun durumu kötüleşirse ne yapmalıyım?",
        a: "Güvenli bir yerde durup bizi arayın. Solunum güçlüğü, bilinç kaybı ya da durmayan kanama gibi durumlarda telefonda size yolda uygulayabileceğiniz temel önlemleri anlatabilir, siz gelene kadar hazırlığı yapabiliriz.",
      },
    ],
    relatedPosts: [
      "kedilerde-nefes-darligi",
      "kedilerde-normal-solunum-sayisi",
      "kopeklerde-kalp-hastaligi-mmvd",
      "kedilerde-hipertiroidi",
    ],
    services: ["acil-mudahale", "laboratuvar-goruntuleme", "dermatoloji-dahiliye"],
    sources: [SRC.dikmen, SRC.lizbon, SRC.m5, SRC.osm, SRC.ego451, SRC.ego454, SRC.merck],
  },

  // ── Çukurambar ──────────────────────────────────────────────────────
  {
    slug: "cukurambar-veteriner",
    district: "Çukurambar",
    fromDistrict: "Çukurambar'dan",
    directionsFrom: "Çukurambar, Çankaya, Ankara",
    kind: "nearby",
    title: "Çukurambar'dan gelenler için veteriner: Öveçler'de, 7/24 açık",
    metaTitle: "Çukurambar'a Yakın Veteriner · 7/24 Açık, Öveçler",
    metaDescription:
      "Çukurambar'dan Muhsin Yazıcıoğlu Caddesi ve Çetin Emeç Bulvarı ile ulaşılan, Öveçler'de 7/24 açık veteriner kliniği. Gece, pazar ve bayramda açık.",
    keywords: [...commonKeywords("Çukurambar"), "çukurambar gece açık veteriner"],
    summary:
      "Muhsin Yazıcıoğlu Caddesi'nden Çetin Emeç Bulvarı'na: Çukurambar'daki sitelerden, Armada ve üniversiteler tarafından tarif.",
    intro:
      "Çukurambar'da şubemiz yok; kliniğimiz Çukurambar'ın güneydoğusundaki Öveçler'de, 1335. Sokak'ta. Muhsin Yazıcıoğlu Caddesi ya da Konya Yolu üzerinden Çetin Emeç Bulvarı'na çıkarak ulaşabilirsiniz. Gece, pazar ve bayram dâhil 7/24 açığız; bu sayfada Çukurambar'dan gelirken bilmeniz gerekenleri topladık.",
    quickFacts: [
      { label: "Klinik nerede", value: "Öveçler, Kabil Caddesi yakınında 1335. Sokak (Çukurambar'da değil)" },
      { label: "Kuş uçuşu", value: "Çukurambar Mahallesi merkezinden ~2,6 km" },
      { label: "Ana bağlantı", value: "Muhsin Yazıcıoğlu Caddesi → Çetin Emeç Bulvarı → Kabil Caddesi" },
      { label: "Çalışma saati", value: "7/24 — gece, pazar ve bayram dâhil" },
    ],
    sections: [
      {
        h2: "Çukurambar'dan Öveçler'e",
        paragraphs: [
          "Çukurambar, Kızılay'a yaklaşık 3,5 km uzaklıkta, 2000'lerden sonra kentsel dönüşümle hızla büyüyen bir mahalle. Çankaya Üniversitesi ve Ufuk Üniversitesi, Armada Alışveriş ve İş Merkezi ve ABD Büyükelçiliği bu mahallede; semte EGO otobüsleri ve Söğütözü metro istasyonu üzerinden ulaşılıyor.",
          "Kliniğe gelmek için Çukurambar'ın ana caddelerinden Muhsin Yazıcıoğlu Caddesi'ni güneye izleyip Hasan Celal Güzel Caddesi üzerinden Çetin Emeç Bulvarı'na çıkabilirsiniz. Bulvarda doğuya, Öveçler yönüne ilerleyip Kabil Caddesi'ne dönün. Harita verisine göre bu yol yaklaşık 3,8 km.",
        ],
      },
      {
        h2: "Site ve apartman yaşamında sık karşılaşılan konular",
        paragraphs: [
          "Yalnızca ev içinde yaşayan kedilerde idrar yolu sorunları, kusma ve kilo değişimleri sık görülen başvuru nedenleri arasında. Erkek bir kedinin kum kabına sık girip çıkması ama idrar yapamaması saatlerle yarışılan bir acil durum; bu durumda gece de beklemeden arayın.",
          "Kusma ya da kilo değişikliği gibi şikâyetlerde ilk ziyarette kan ve idrar tahlili istememiz olağan. Bazı tahliller için aç gelmeniz gerekebilir; randevu alırken şikâyeti anlatırsanız hangi hazırlığın gerektiğini önceden söyleriz.",
        ],
        links: [{ label: "Kedim kum kabına girip çıkıyor ama idrar yapamıyor", href: "/blog/kedi-kum-kabina-girip-cikiyor-idrar-yapamiyor/" }],
      },
      {
        h2: "Gece ve hafta sonu Çukurambar'dan",
        paragraphs: [
          `Gece ya da pazar günü bir sorun çıktığında yola çıkmadan ${PHONE} numarasını arayın; durumu kısaca anlatmanız siz gelene kadar hazırlık yapmamızı sağlar.`,
          "Söğütözü metro istasyonu kliniğe kuş uçuşu yaklaşık 2,8 km uzakta ve oradan Öveçler'e doğrudan raylı bağlantı yok. Gece, özellikle de hasta bir hayvanla, özel araç ya da taksi en güvenli seçenek.",
        ],
      },
    ],
    routes: {
      caption: "Çukurambar'dan kliniğe ana yollar (OpenStreetMap güzergâhı, mesafeler yaklaşık).",
      rows: [
        { from: "Çukurambar Mahallesi (üniversiteler tarafı)", via: "Ufuk Üniversitesi Caddesi → Muhsin Yazıcıoğlu Caddesi → Hasan Celal Güzel Caddesi → Çetin Emeç Bulvarı → Kabil Caddesi", note: "Yol ~3,8 km" },
        { from: "Konya Yolu (Mevlânâ Bulvarı) tarafı", via: "Mevlânâ Bulvarı (güney yönü) → Çetin Emeç Bulvarı → Kabil Caddesi", note: "Yol ~3,5 km" },
        { from: "Söğütözü metro istasyonu", via: "Metrodan sonra taksi ya da araçla Muhsin Yazıcıoğlu Caddesi üzerinden", note: "Kuş uçuşu ~2,8 km" },
      ],
    },
    gettingHere: [
      "Çukurambar'dan güneye, Çetin Emeç Bulvarı'na inin; bulvarda doğuya ilerleyip Kabil Caddesi'ne dönün. Klinik, caddenin bulvara yakın ucunda, 1335. Sokak'ta.",
    ],
    access: [
      `Klinik adresi: ${ADDRESS}. Çukurambar'da şubemiz yoktur.`,
      "Acil durumda randevu gerekmez; yola çıkmadan aramanız yeterli.",
    ],
    visits: {
      h2: "Çukurambar'dan hangi durumlarda gelinir?",
      items: [
        { text: "Kum kabına sık girip çıkma, idrarda kan, idrar yapamama", label: "Acil Müdahale", href: "/hizmetler/acil-mudahale/" },
        { text: "Kusma, ishal ve kilo değişiminde kan-idrar tahlili ve ultrason", label: "Laboratuvar & Görüntüleme", href: "/hizmetler/laboratuvar-goruntuleme/" },
        { text: "Ev kedilerinde kilo yönetimi ve mama seçimi", label: "Beslenme Danışmanlığı", href: "/hizmetler/beslenme-danismanligi/" },
        { text: "Diş taşı, ağız kokusu ve diş eti sorunları", label: "Diş Sağlığı", href: "/hizmetler/dis-sagligi/" },
      ],
    },
    bring: [
      "İdrar şikâyetinde son idrar yaptığı saati ve kum kabındaki değişiklikleri gösteren not ya da fotoğraf",
      "Kullandığınız mamanın adı ve günlük miktarı",
      "Tahlil için aç gelmeniz istendiyse son yemek saati",
    ],
    faqs: [
      {
        q: "Çukurambar'da 7/24 açık veteriner var mı?",
        a: "Çukurambar'da şubemiz yok. En yakın adresimiz, Muhsin Yazıcıoğlu Caddesi ve Çetin Emeç Bulvarı üzerinden ulaşılan Öveçler'deki kliniğimiz ve 7/24 açık. Başka kliniklerin gece açık olup olmadığını bilemeyiz; yola çıkmadan aramak her durumda doğru olur.",
      },
      {
        q: "Gece ya da pazar günü Çukurambar'dan gelebilir miyiz?",
        a: `Evet. Gece yarısı, pazar sabahı ya da bayramda da açığız. Çukurambar'dan çıkarken ${PHONE} numarasını arayıp kedinizin ya da köpeğinizin durumunu anlatırsanız, siz Çetin Emeç Bulvarı'na varmadan hazırlığa başlarız.`,
      },
      {
        q: "Çukurambar'dan acil bir durumda ne yapmalıyım?",
        a: "Telefonla haber verin ve doğrudan gelin; acil başvuruda randevu aranmaz. Erkek kedide idrar yapamama, nefes güçlüğü, bilinç kaybı, durmayan nöbet ve zehirlenme şüphesi sabahı beklemez.",
      },
      {
        q: "Çukurambar'da şubeniz var mı?",
        a: `Hayır. Tek kliniğimiz ${ADDRESS} adresinde. Çukurambar'dan gelen hastalarımızı burada karşılıyoruz.`,
      },
      {
        q: "Çukurambar'dan hangi yoldan gelmeliyim?",
        a: "Muhsin Yazıcıoğlu Caddesi'ni güneye izleyip Hasan Celal Güzel Caddesi üzerinden Çetin Emeç Bulvarı'na çıkın; bulvarda doğuya ilerleyip Kabil Caddesi'ne dönün. Konya Yolu tarafındaysanız Mevlânâ Bulvarı'ndan da Çetin Emeç Bulvarı'na bağlanabilirsiniz.",
      },
      {
        q: "Tahlil için dostumun aç gelmesi gerekir mi?",
        a: "Bazı kan tahlillerinde birkaç saatlik açlık istenir, bazılarında gerekmez. Randevu alırken şikâyeti anlatırsanız hangi hazırlığın gerektiğini önceden söyleriz. Su her zaman serbest bırakılmalı.",
      },
      {
        q: "Tahlil sonuçlarını aynı gün alabilir miyiz?",
        a: "Rutin kan ve idrar tahlillerinin büyük kısmı klinikte sonuçlanır ve aynı ziyarette değerlendirilir. Dış laboratuvara gönderilen özel testlerde süre değişir; bunu baştan belirtiyoruz.",
      },
    ],
    relatedPosts: [
      "kedilerde-idrar-tikanikligi-flutd",
      "kedi-kum-kabina-girip-cikiyor-idrar-yapamiyor",
      "kedilerde-kusma",
      "evcil-hayvanlarda-obezite",
    ],
    services: ["laboratuvar-goruntuleme", "beslenme-danismanligi", "acil-mudahale"],
    sources: [SRC.cukurambar, SRC.sogutozuMetro, SRC.osm],
  },

  // ── Or-An ───────────────────────────────────────────────────────────
  {
    slug: "or-an-veteriner",
    district: "Or-An",
    fromDistrict: "Or-An'dan",
    directionsFrom: "Or-An, Çankaya, Ankara",
    kind: "nearby",
    title: "Or-An'dan gelenler için veteriner: Öveçler'de, 7/24 açık",
    metaTitle: "Or-An'a Yakın Veteriner Kliniği · 7/24 Açık, Öveçler",
    metaDescription:
      "Or-An'dan Dikmen Caddesi ve Kabil Caddesi ile kuzeye çıkarak ulaşılan, Öveçler'de 7/24 açık veteriner kliniği. Sahipli hayvanlar için gece ve pazar açık.",
    keywords: [...commonKeywords("Or-An"), "oran veteriner", "oran gece açık veteriner"],
    summary:
      "Kuzeye, Dikmen Caddesi ya da Konya Yolu üzerinden: Or-An'dan gelenler ve belediyenin Oran merkezi hakkında bilinmesi gerekenler.",
    intro:
      "Or-An'da şubemiz yok; kliniğimiz Or-An'ın kuzeyinde, Öveçler'de, 1335. Sokak'ta. Dikmen Caddesi ya da Konya Yolu üzerinden kuzeye çıkarak ulaşabilirsiniz. Gece, pazar ve bayram dâhil 7/24 açığız; aşağıda Or-An'dan gelirken izleyebileceğiniz yolları ve sahipli hayvanınız için belediye ile özel klinik arasındaki farkı anlattık.",
    quickFacts: [
      { label: "Klinik nerede", value: "Öveçler, Kabil Caddesi yakınında 1335. Sokak (Or-An'da değil)" },
      { label: "Kuş uçuşu", value: "Or-An Mahallesi merkezinden ~4,9 km (kuzey yönü)" },
      { label: "Ana bağlantı", value: "Dikmen Caddesi → Kabil Caddesi (kuzey yönü)" },
      { label: "Çalışma saati", value: "7/24 — gece, pazar ve bayram dâhil" },
    ],
    sections: [
      {
        h2: "Or-An'dan kuzeye: iki ana seçenek",
        paragraphs: [
          "Adını \"Orta Anadolu\"nun kısaltmasından alan Or-An, Çankaya'nın güney mahallelerinden biri; TRT genel merkez binası da burada. Harita verisine göre hem Dikmen Caddesi hem de Konya Yolu (Mevlânâ Bulvarı) Or-An'a kadar uzanıyor; ikisi de sizi kuzeye, Öveçler'e taşıyabilir.",
          "Dikmen Caddesi'ni kuzeye izlerseniz Kabil Caddesi'ne bağlanıp onu da kuzeye doğru takip ederek kliniğe ulaşırsınız; klinik Kabil Caddesi'nin kuzey ucunda, Çetin Emeç Bulvarı'na yakın. Konya Yolu'nu tercih ederseniz Çetin Emeç Bulvarı'na kadar kuzeye çıkıp doğuya dönün ve Kabil Caddesi'ne girin. Or-An'ın merkezinden harita servisinin önerdiği yol yaklaşık 5–6 km.",
        ],
      },
      {
        h2: "Belediyenin Oran merkezi ve sahipli hayvanlar",
        paragraphs: [
          "Ankara Büyükşehir Belediyesi'nin veteriner hizmetleri arasında Oran Kısırlaştırma ve Sahiplendirme Merkezi de yer alıyor. Belediyenin sayfasında sıralanan bu birimler ağırlıklı olarak sokak hayvanlarına yönelik; aynı sayfada sahipli hayvanlar için acil servis, çalışma saati ya da telefon bilgisi yayımlanmıyor.",
          "Sahipli kedi ya da köpeğiniz gece kötüleşirse belediye merkezine gitmeyi planlamak yerine o saatte açık bir kliniği arayın. Belediyenin hangi hizmeti verdiğini öğrenmek isterseniz 153 Başkent çağrı merkezinden sorabilirsiniz.",
        ],
      },
      {
        h2: "Dışarı çıkan köpekler ve kene",
        paragraphs: [
          "Parka, bahçeye ya da kırsal alana çıkan köpeklerde kene, pire ve tatarcık koruması aşı takvimi kadar önemli. Koruma ürününün türü ve aralığı köpeğin kilosuna, yaşına ve yaşam biçimine göre belirlenir; muayenede birlikte planlıyoruz.",
          "Köpeğinizde kene gördüyseniz ezmeyin, yakmayın, üzerine yağ ya da kolonya dökmeyin. Kliniğe getirirseniz güvenli şekilde çıkarır, sonraki haftalarda nelere dikkat etmeniz gerektiğini anlatırız.",
        ],
        links: [{ label: "Köpeğimden kene çıkardım, şimdi ne olacak?", href: "/blog/kene-cikardim-simdi-ne-olacak/" }],
      },
    ],
    routes: {
      caption: "Or-An'dan kliniğe ana yollar (OpenStreetMap güzergâhı, mesafeler yaklaşık).",
      rows: [
        { from: "Or-An Mahallesi (Dikmen Caddesi tarafı)", via: "Dikmen Caddesi (kuzey yönü) → Kabil Caddesi (kuzey yönü) → 1335. Sokak", note: "Yol ~5,8 km" },
        { from: "Konya Yolu (Mevlânâ Bulvarı) tarafı", via: "Mevlânâ Bulvarı (kuzey yönü) → Çetin Emeç Bulvarı (doğu) → Kabil Caddesi", note: "Konya Yolu Or-An'dan geçer" },
      ],
    },
    gettingHere: [
      "Or-An'dan kuzeye çıkın: Dikmen Caddesi'nden Kabil Caddesi'ne bağlanıp caddeyi kuzey ucuna kadar izleyin. Klinik, Çetin Emeç Bulvarı'na yakın kesimde, 1335. Sokak'ta.",
    ],
    access: [
      `Klinik adresi: ${ADDRESS}. Or-An'da şubemiz yoktur.`,
      "Gece ve hafta sonu dâhil kesintisiz açığız; yola çıkmadan aramanız yeterli.",
    ],
    visits: {
      h2: "Or-An'dan hangi durumlarda gelinir?",
      items: [
        { text: "Kene, pire ve tatarcık koruma planı", label: "Aşılama & Mikroçip", href: "/hizmetler/asilama-mikrocip/" },
        { text: "Geçmeyen kaşıntı, tüy dökülmesi ve deri sorunları", label: "Dermatoloji & Dahiliye", href: "/hizmetler/dermatoloji-dahiliye/" },
        { text: "Topallama, yaralanma ya da gece başlayan ağrı", label: "Acil Müdahale", href: "/hizmetler/acil-mudahale/" },
        { text: "Tüy bakımı ve tırnak kesimi", label: "Pet Kuaför & Bakım", href: "/hizmetler/pet-kuafor-bakim/" },
      ],
    },
    bring: [
      "Kene çıkardıysanız keneyi kapalı küçük bir kapta",
      "Kullandığınız pire-kene ürününün adı ve son uygulama tarihi",
      "Aşı karnesi",
    ],
    faqs: [
      {
        q: "Or-An'da 7/24 açık veteriner var mı?",
        a: "Or-An'da şubemiz bulunmuyor; kliniğimiz Or-An'ın kuzeyinde, Öveçler'de ve 24 saat açık. Or-An'daki ya da çevresindeki diğer kliniklerin saatlerini bilmiyoruz; gece hangi adrese giderseniz gidin önce telefonla teyit edin.",
      },
      {
        q: "Gece ya da pazar günü Or-An'dan gelebilir miyiz?",
        a: `Evet; pazar, bayram ve gece saatlerinde de muayene yapıyoruz. Or-An'dan kuzeye çıkmadan önce ${PHONE} numarasını aramanız, yol boyunca size yön vermemizi ve hazırlık yapmamızı sağlar.`,
      },
      {
        q: "Or-An'dan acil bir durumda ne yapmalıyım?",
        a: "Bizi arayıp yola çıkın; acil durumlarda sıra beklenmez, aciliyete bakılır. Yaralanma, nefes güçlüğü, durmayan nöbet ya da zehirlenme şüphesinde beklemeyin. Yaralı köpeği düz bir yüzey ya da katlanmış battaniyeyle taşıyın.",
      },
      {
        q: "Or-An'da şubeniz var mı?",
        a: `Hayır. Tek adresimiz ${ADDRESS}. Or-An'dan gelen hastalarımızı bu klinikte karşılıyoruz.`,
      },
      {
        q: "Oran'daki belediye merkezi sahipli hayvanlara bakıyor mu?",
        a: "Ankara Büyükşehir Belediyesi'nin sayfasında Oran Kısırlaştırma ve Sahiplendirme Merkezi, ağırlıklı olarak sokak hayvanlarına yönelik birimler arasında sıralanıyor; sahipli hayvanlar için acil servis ya da çalışma saati yayımlanmıyor. Güncel durumu 153'ten sorabilirsiniz.",
      },
      {
        q: "Bahçeye çıkan köpeğimiz için hangi korumalar gerekli?",
        a: "Dış parazit koruması ve düzenli aşı takvimi. Ürünün türü ve uygulama aralığı köpeğin kilosuna, yaşına ve yaşam biçimine göre belirlenir; muayenede birlikte planlıyoruz.",
      },
      {
        q: "Kene tuttuğunda evde çıkarmalı mıyız?",
        a: "Yanlış çıkarma, kenenin ağız kısmının deride kalmasına yol açabilir. Kene gördüyseniz ezmeden, yakmadan bırakın ve kliniğe getirin; güvenli şekilde çıkarır, gerekiyorsa takip planı öneririz.",
      },
    ],
    relatedPosts: [
      "kene-ve-pire-korunma",
      "kene-cikardim-simdi-ne-olacak",
      "kopeklerde-leishmania-ve-tatarcik",
      "ankara-acil-veteriner-nereye-gidilir",
    ],
    services: ["dermatoloji-dahiliye", "asilama-mikrocip", "acil-mudahale"],
    sources: [SRC.oran, SRC.abb, SRC.osm, SRC.merck],
  },

  // ── Söğütözü ────────────────────────────────────────────────────────
  {
    slug: "sogutozu-veteriner",
    district: "Söğütözü",
    fromDistrict: "Söğütözü'nden",
    directionsFrom: "Söğütözü, Çankaya, Ankara",
    kind: "nearby",
    title: "Söğütözü'nden gelenler için veteriner: mesai sonrası da açık",
    metaTitle: "Söğütözü'ne Yakın Veteriner · Mesai Sonrası 7/24 Açık",
    metaDescription:
      "Söğütözü'nde çalışanlar ve oturanlar için Öveçler'de 7/24 açık veteriner kliniği. Mesai sonrası, gece ve hafta sonu muayene; Söğütözü Caddesi'nden tarif.",
    keywords: [...commonKeywords("Söğütözü"), "mesai sonrası veteriner ankara"],
    summary:
      "Plazalardan mesai çıkışı: Söğütözü Caddesi ve Muhsin Yazıcıoğlu Caddesi üzerinden, akşam ve gece muayene.",
    intro:
      "Söğütözü'nde şubemiz yok; kliniğimiz Söğütözü'nün güneydoğusunda, Öveçler'de, 1335. Sokak'ta. 7/24 açık olduğumuz için Söğütözü'nde çalışıp gün içinde işten çıkamayanlar akşam ya da gece de muayeneye gelebiliyor. Aşağıda Söğütözü'nden hangi yolla geleceğinizi ve mesai sonrası ziyaretleri nasıl planlayabileceğinizi anlattık.",
    quickFacts: [
      { label: "Klinik nerede", value: "Öveçler, Kabil Caddesi yakınında 1335. Sokak (Söğütözü'nde değil)" },
      { label: "Kuş uçuşu", value: "Söğütözü Mahallesi merkezinden ~3,7 km" },
      { label: "Ana bağlantı", value: "Söğütözü Caddesi → Muhsin Yazıcıoğlu Caddesi → Çetin Emeç Bulvarı" },
      { label: "Mesai sonrası", value: "Akşam ve gece muayene mümkün; önceden arayın" },
    ],
    sections: [
      {
        h2: "Söğütözü'nden Öveçler'e",
        paragraphs: [
          "Söğütözü, Eskişehir Yolu kenarından Atatürk Orman Çiftliği arazisine kadar uzanan aynı adlı cadde boyunca yer alan bir semt. TOBB ETÜ ve hastanesi, Armada ve Next Level alışveriş merkezleri, Congresium ve çok sayıda plaza bu bölgede.",
          "Kliniğe gelmek için Söğütözü Caddesi'nden Muhsin Yazıcıoğlu Caddesi'ne geçip güneye ilerleyin, Hasan Celal Güzel Caddesi üzerinden Çetin Emeç Bulvarı'na çıkın. Bulvarda doğuya, Öveçler yönüne gidip Kabil Caddesi'ne dönün. Harita verisine göre bu yol yaklaşık 5 km; mesai çıkışı yoğun saatlerde süre belirgin şekilde uzayabilir.",
        ],
      },
      {
        h2: "Mesai sonrası muayene",
        paragraphs: [
          `Gün içinde işten ayrılamayanlar için akşam ve gece saatleri pratik bir seçenek: kliniğimiz kesintisiz açık. Planlı bir kontrol ya da aşı için akşam saatini seçecekseniz ${PHONE} numarasını önceden arayıp geleceğinizi bildirin; şikâyeti dinleyip gerekiyorsa tahlil için hazırlık yapabiliriz.`,
          "Gün boyu evde yalnız kalan kedilerde iştah, su tüketimi ve kum kabındaki değişiklikler en erken uyarı işaretleridir. Akşam eve döndüğünüzde kum kabında hiç idrar yoksa ya da kediniz sık sık kaba girip çıkıyorsa sabahı beklemeyin.",
        ],
        links: [{ label: "Kedim yemek yemiyor: 24 saat neden önemli?", href: "/blog/kedim-yemek-yemiyor/" }],
      },
      {
        h2: "Söğütözü'nden toplu taşıma",
        paragraphs: [
          "Söğütözü'nde M2 (Kızılay–Koru) hattının Söğütözü istasyonu 2014'ten beri hizmet veriyor; aynı bölgedeki Ankaray istasyonunun inşaatı ise tamamlanmış olmasına rağmen henüz açılmadı. Bu istasyonlar kliniğe kuş uçuşu yaklaşık 2,8 km uzakta ve Öveçler'e doğrudan raylı bağlantı yok.",
          "Hasta bir hayvanla aktarmalı yolculuk hem sizi hem onu yorar. Söğütözü'nden gelirken, özellikle akşam ve gece, özel araç ya da taksi en pratik seçenek.",
        ],
      },
    ],
    routes: {
      caption: "Söğütözü'nden kliniğe ana yollar (OpenStreetMap güzergâhı, mesafeler yaklaşık).",
      rows: [
        { from: "Söğütözü Caddesi (plazalar)", via: "Söğütözü Caddesi → Muhsin Yazıcıoğlu Caddesi → Hasan Celal Güzel Caddesi → Çetin Emeç Bulvarı → Kabil Caddesi", note: "Yol ~4,9 km" },
        { from: "Eskişehir Yolu (Dumlupınar Bulvarı) tarafı", via: "Muhsin Yazıcıoğlu Caddesi (güney yönü) → Çetin Emeç Bulvarı → Kabil Caddesi", note: "Batıdan gelenlerin yolu" },
        { from: "Söğütözü metro istasyonu (M2)", via: "Taksi ya da araçla aynı güzergâh", note: "Kuş uçuşu ~2,8 km" },
      ],
    },
    gettingHere: [
      "Söğütözü'nden güneye, Muhsin Yazıcıoğlu Caddesi üzerinden Çetin Emeç Bulvarı'na inin; bulvarda doğuya ilerleyip Kabil Caddesi'ne dönün. Klinik, caddenin bulvara yakın ucunda, 1335. Sokak'ta.",
    ],
    access: [
      `Klinik adresi: ${ADDRESS}. Söğütözü'nde şubemiz yoktur.`,
      "Akşam ve gece başvurularında da açığız; planlı ziyaretlerde önceden aramanız yeterli.",
    ],
    visits: {
      h2: "Söğütözü'nden hangi durumlarda gelinir?",
      items: [
        { text: "Mesai sonrası planlı kontrol, aşı ve check-up", label: "Genel Muayene & Check-up", href: "/hizmetler/genel-muayene-check-up/" },
        { text: "İştahsızlık, kusma, tuvalet dışına idrar yapma", label: "Dermatoloji & Dahiliye", href: "/hizmetler/dermatoloji-dahiliye/" },
        { text: "Akşam fark edilen idrar yapamama ya da nefes güçlüğü", label: "Acil Müdahale", href: "/hizmetler/acil-mudahale/" },
        { text: "Tahlil ve ultrasonla ilerleyen tanı süreci", label: "Laboratuvar & Görüntüleme", href: "/hizmetler/laboratuvar-goruntuleme/" },
      ],
    },
    bring: [
      "Evde gözlemlediğiniz iştah, su ve kum kabı değişikliklerini not ettiğiniz bir liste",
      "Gün içinde evdeyse kameradan kısa bir video (nöbet, öksürük, topallama gibi durumlarda çok işe yarar)",
      "Kullandığı ilaçların adı ve son verilme saati",
    ],
    faqs: [
      {
        q: "Söğütözü'nde 7/24 açık veteriner var mı?",
        a: "Söğütözü'nde şubemiz yok; Söğütözü Caddesi'nden yaklaşık 5 km'lik bir yolla ulaşılan Öveçler'deki kliniğimiz 7/24 açık. Söğütözü'ndeki başka kliniklerin çalışma saatlerini bilemeyiz; gece gitmeden önce arayın.",
      },
      {
        q: "Gece ya da pazar günü Söğütözü'nden gelebilir miyiz?",
        a: `Evet. Akşam mesaiden çıktıktan sonra da, gece yarısı ya da pazar günü de gelebilirsiniz. Yola çıkmadan ${PHONE} numarasını arayıp durumu anlatmanız hazırlık için yeterli.`,
      },
      {
        q: "Söğütözü'nden acil bir durumda ne yapmalıyım?",
        a: "Arayıp durumu anlattıktan sonra yola çıkın; acil hastalar için randevu gerekmez. Nefes güçlüğü, bilinç kaybı, durmayan nöbet, erkek kedide idrar yapamama ve zehirlenme şüphesi beklemez.",
      },
      {
        q: "Söğütözü'nde şubeniz var mı?",
        a: `Hayır. Tek kliniğimiz ${ADDRESS} adresinde. Söğütözü'nden gelen hastalarımızı burada karşılıyoruz.`,
      },
      {
        q: "Mesai sonrası muayene mümkün mü?",
        a: "Evet. Klinik 7/24 açık olduğu için akşam ve gece saatlerinde de muayene yapılabiliyor. Planlı bir kontrol için akşam saatini seçecekseniz önceden telefonla bildirmeniz iyi olur.",
      },
      {
        q: "Söğütözü'nden metroyla gelebilir miyim?",
        a: "Metro Öveçler'e gitmiyor. M2'nin Söğütözü istasyonu kliniğe kuş uçuşu yaklaşık 2,8 km uzakta; metrodan sonra taksi ya da araç gerekir. Hasta bir hayvanla doğrudan özel araç ya da taksiyle gelmek daha pratik.",
      },
      {
        q: "Gün boyu evde yalnız kalan kedide nelere dikkat etmeliyiz?",
        a: "İştah, su tüketimi ve kum kabındaki değişiklikler en erken uyarı işaretleridir. Uzun süren iştahsızlık ya da idrar yapma çabası gördüğünüzde beklemeden arayın; erkek kedide idrar yapamama acildir.",
      },
    ],
    relatedPosts: [
      "kedim-yemek-yemiyor",
      "kedilerde-tuvalet-disina-isemesi",
      "kedilerde-idrar-tikanikligi-flutd",
      "evcil-hayvan-check-up-neleri-kapsar",
    ],
    services: ["genel-muayene-check-up", "laboratuvar-goruntuleme", "acil-mudahale"],
    sources: [SRC.sogutozu, SRC.sogutozuMetro, SRC.sogutozuAnkaray, SRC.osm],
  },

  // ── Emek ────────────────────────────────────────────────────────────
  {
    slug: "emek-veteriner",
    district: "Emek",
    fromDistrict: "Emek'ten",
    directionsFrom: "Emek, Çankaya, Ankara",
    kind: "nearby",
    title: "Emek'ten gelenler için veteriner: Öveçler'de, 7/24 açık",
    metaTitle: "Emek'e Yakın Veteriner Kliniği · 7/24 Açık, Öveçler",
    metaDescription:
      "Emek'ten Ziyabey ve Ceyhun Atuf Kansu Caddesi üzerinden ulaşılan, Öveçler'de 7/24 açık veteriner kliniği. Yaşlı kedi ve köpek takibi, gece ve pazar açık.",
    keywords: [...commonKeywords("Emek"), "emek gece açık veteriner"],
    summary:
      "Balgat üzerinden güneye: Ziyabey ve Ceyhun Atuf Kansu Caddesi'nden tarif, yaşlı kedi ve köpek takibi.",
    intro:
      "Emek'te şubemiz yok; kliniğimiz Emek'in güneyinde, Balgat'ın da ötesinde, Öveçler'de, 1335. Sokak'ta. Balgat'ın ana caddelerinden geçerek Çetin Emeç Bulvarı'na ulaşıyor, oradan Kabil Caddesi'ne dönüyorsunuz. Gece, pazar ve bayram dâhil 7/24 açığız; bu sayfada Emek'ten gelirken kullanabileceğiniz yolları ve yaşlı dostların takibine dair pratik bilgileri bulacaksınız.",
    quickFacts: [
      { label: "Klinik nerede", value: "Öveçler, Kabil Caddesi yakınında 1335. Sokak (Emek'te değil)" },
      { label: "Kuş uçuşu", value: "Emek Mahallesi merkezinden ~3,5 km (güney yönü)" },
      { label: "Ana bağlantı", value: "Ziyabey Caddesi → Ceyhun Atuf Kansu Caddesi → Çetin Emeç Bulvarı" },
      { label: "Çalışma saati", value: "7/24 — gece, pazar ve bayram dâhil" },
    ],
    sections: [
      {
        h2: "Emek'ten Balgat üzerinden Öveçler'e",
        paragraphs: [
          "Emek, Kültür ve Turizm Bakanlığı, Ulaştırma ve Altyapı Bakanlığı ile Aile, Çalışma ve Sosyal Hizmetler Bakanlığı binalarının bulunduğu bir mahalle. Ankaray'ın tek hemzemin istasyonu olan Emek istasyonu da burada; Konya Yolu (Mevlânâ Bulvarı) mahallenin içinden geçiyor.",
          "Emek ile Öveçler arasında Balgat var. Kliniğe gelmek için Balgat'ın ana caddeleri Ziyabey Caddesi ve Ceyhun Atuf Kansu Caddesi'ni izleyerek güneye, Çetin Emeç Bulvarı'na inin; bulvarda doğuya ilerleyip Kabil Caddesi'ne dönün. Harita verisine göre bu yol yaklaşık 5 km.",
        ],
      },
      {
        h2: "Yaşlı dostların takibi",
        paragraphs: [
          "Yaşlanan kedi ve köpeklerde böbrek, tiroid ve kalp hastalıkları çoğu zaman sessiz başlar. Yedi yaşını geçmiş dostlarda düzenli genel muayene ile kan ve idrar kontrolü, bu hastalıkları belirti çıkmadan yakalamanın en pratik yolu; kontrol sıklığını dostunuzun durumuna göre birlikte belirliyoruz.",
          "Yaşlı bir hayvan için kısa şehir içi yolculuk genellikle sorun olmaz. Taşıma kabını sabitleyin, aracı serin tutun ve eklem ağrısı olan dostlarda kabın tabanına yumuşak bir örtü koyun. Geceleri huzursuzluk, sebepsiz miyavlama ya da yön bulamama gibi yeni davranışlar da muayene gerektirir.",
        ],
        links: [{ label: "Kedim yedi yaşını geçti: yıllık kontrolde hangi testler?", href: "/blog/yasli-kedide-yillik-kontrol-hangi-testler/" }],
      },
      {
        h2: "Gece ve hafta sonu Emek'ten",
        paragraphs: [
          `Gece ya da pazar günü bir sorun çıktığında yola çıkmadan ${PHONE} numarasını arayın. Ankaray ve metro hatları Öveçler'e gitmiyor; Emek istasyonu kliniğe kuş uçuşu yaklaşık 3,7 km uzakta. Gece özel araç ya da taksi en güvenli yol.`,
        ],
      },
    ],
    routes: {
      caption: "Emek'ten kliniğe ana yollar (OpenStreetMap güzergâhı, mesafeler yaklaşık).",
      rows: [
        { from: "Emek Mahallesi", via: "Kazakistan Caddesi → Hakkı Turayliç Caddesi → Ziyabey Caddesi → Ceyhun Atuf Kansu Caddesi → Çetin Emeç Bulvarı → Kabil Caddesi", note: "Yol ~4,9 km" },
        { from: "Konya Yolu (Mevlânâ Bulvarı) tarafı", via: "Mevlânâ Bulvarı (güney yönü) → Çetin Emeç Bulvarı → Kabil Caddesi", note: "Konya Yolu Emek'ten geçer" },
        { from: "Emek Ankaray istasyonu", via: "Taksi ya da araçla Balgat üzerinden", note: "Kuş uçuşu ~3,7 km" },
      ],
    },
    gettingHere: [
      "Emek'ten güneye, Balgat'ın içinden Ceyhun Atuf Kansu Caddesi'ni izleyerek Çetin Emeç Bulvarı'na inin; bulvarda doğuya ilerleyip Kabil Caddesi'ne dönün. Klinik, caddenin bulvara yakın ucunda, 1335. Sokak'ta.",
    ],
    access: [
      `Klinik adresi: ${ADDRESS}. Emek'te şubemiz yoktur.`,
      "7/24 açığız; acil durumda randevu gerekmez.",
    ],
    visits: {
      h2: "Emek'ten hangi durumlarda gelinir?",
      items: [
        { text: "Yaşlı kedi ve köpeklerde düzenli check-up", label: "Genel Muayene & Check-up", href: "/hizmetler/genel-muayene-check-up/" },
        { text: "Böbrek, tiroid ve tansiyon takibi için tahlil", label: "Laboratuvar & Görüntüleme", href: "/hizmetler/laboratuvar-goruntuleme/" },
        { text: "Kronik hastalıklarda tedavi planı ve takip", label: "Dermatoloji & Dahiliye", href: "/hizmetler/dermatoloji-dahiliye/" },
        { text: "Yaşlı dostlarda diş taşı ve ağız ağrısı", label: "Diş Sağlığı", href: "/hizmetler/dis-sagligi/" },
      ],
    },
    bring: [
      "Son kontrolden bu yana kilo, iştah ve su tüketimindeki değişiklikler",
      "Kullandığı tüm ilaçların ve takviyelerin listesi",
      "Önceki tahlil sonuçları (karşılaştırma için çok değerli)",
    ],
    faqs: [
      {
        q: "Emek'te 7/24 açık veteriner var mı?",
        a: "Emek'te şubemiz yok. Emek'in güneyinde, Balgat'ın ötesindeki Öveçler'de bulunan kliniğimiz ise gece ve gündüz açık. Emek'teki diğer kliniklerin saatleri hakkında bilgimiz yok; gece yola çıkmadan gideceğiniz yeri arayın.",
      },
      {
        q: "Gece ya da pazar günü Emek'ten gelebilir miyiz?",
        a: `Evet. Yaşlı bir dostun gece kötüleşmesi ya da pazar günü fark edilen bir değişiklik için de gelebilirsiniz. Emek'ten çıkmadan ${PHONE} numarasını arayın; durumu dinleyip hazırlık yaparız.`,
      },
      {
        q: "Emek'ten acil bir durumda ne yapmalıyım?",
        a: "Telefonla haber verip gelin; acil başvuruda randevu istenmez. Nefes güçlüğü, bilinç kaybı, durmayan nöbet, ani arka bacak felci ve kontrolsüz kanama beklemez.",
      },
      {
        q: "Emek'te şubeniz var mı?",
        a: `Hayır. Tek adresimiz ${ADDRESS}. Emek'ten gelen hastalarımızı bu klinikte karşılıyoruz.`,
      },
      {
        q: "Emek'ten hangi yoldan gelmeliyim?",
        a: "Ziyabey Caddesi ve Ceyhun Atuf Kansu Caddesi üzerinden Balgat'ı geçerek Çetin Emeç Bulvarı'na inin, bulvarda doğuya ilerleyip Kabil Caddesi'ne dönün. Konya Yolu tarafındaysanız Mevlânâ Bulvarı'ndan güneye inip Çetin Emeç Bulvarı'na bağlanabilirsiniz.",
      },
      {
        q: "Yaşlı kedimiz için ne sıklıkla kontrol gerekir?",
        a: "Yedi yaş üstü kedi ve köpeklerde yılda en az bir, çoğu zaman iki genel muayene ile kan ve idrar kontrolü yaygın bir yaklaşımdır. Kronik bir hastalık takibi varsa aralık daha sık olabilir; planı muayenede birlikte belirliyoruz.",
      },
      {
        q: "Yolculuk yaşlı bir hayvana zarar verir mi?",
        a: "Kısa şehir içi mesafelerde çoğu yaşlı hasta sorunsuz seyahat eder. Taşıma kabını sabitleyin, aracı serin tutun ve yolculuğu olabildiğince sakin geçirin. Eklem ağrısı olan dostlarda kabın tabanına yumuşak bir örtü koymak rahatlatır.",
      },
    ],
    relatedPosts: [
      "yasli-kedi-kopek-bakimi",
      "yasli-kedide-yillik-kontrol-hangi-testler",
      "kedilerde-kronik-bobrek-hastaligi",
      "kedilerde-yuksek-tansiyon",
    ],
    services: ["genel-muayene-check-up", "laboratuvar-goruntuleme", "dermatoloji-dahiliye"],
    sources: [SRC.emek, SRC.emekAnkaray, SRC.balgat, SRC.osm],
  },

  // ── Ankara (city-wide 7/24) ─────────────────────────────────────────
  {
    slug: ANKARA_SLUG,
    district: "Ankara",
    fromDistrict: "Ankara'nın her yerinden",
    directionsFrom: "Ankara",
    directionsFromVisitor: true,
    areaType: "City",
    kind: "primary",
    title: "Ankara'da 7/24 açık veteriner: gece, pazar ve bayramda",
    metaTitle: "Ankara 7/24 Açık Veteriner · Gece, Pazar ve Bayramda",
    metaDescription:
      "Ankara'da gece, pazar ve bayramda açık veteriner: Çankaya Öveçler'deki kliniğimiz 7/24 açık. Nöbetçi liste yok; önce arayın: 0536 290 69 58.",
    keywords: [
      "ankara veteriner",
      "ankara 7/24 açık veteriner",
      "gece açık veteriner ankara",
      "pazar açık veteriner ankara",
      "bayramda açık veteriner ankara",
      "nöbetçi veteriner ankara",
      "acil veteriner ankara",
      "ankara açık veteriner",
    ],
    summary:
      "Gece, pazar ve bayramda veteriner arayanlar için: tek kliniğimiz, nöbetçi sistemi, ne zaman aramalı ve Ankara'nın her yerinden ulaşım.",
    intro: `Evet, Ankara'da gece, pazar ve bayramda açık bir veteriner kliniğine ulaşabilirsiniz: Pet Internal Veteriner Kliniği, Çankaya'nın Öveçler semtinde 7/24 açık. Ankara genelinde tek bir kliniğiz ve şubemiz yok; gece yarısı, hafta sonu ya da bayram sabahı veterinere ihtiyaç duyan Ankaralıları bu tek adreste karşılıyoruz. Yola çıkmadan önce ${PHONE} numarasını arayın.`,
    quickFacts: [
      { label: "Adres", value: ADDRESS },
      { label: "Açık olduğumuz zamanlar", value: "Her gün 24 saat; pazar ve resmî/dinî bayramlar dâhil" },
      { label: "Önce arayın", value: PHONE },
      { label: "Kabul ettiğimiz hastalar", value: "Kedi, köpek, kuş, tavşan, ginepig ve küçük memeliler" },
    ],
    sections: [
      {
        h2: "Tek klinik, Ankara'nın her yerinden gelenler",
        paragraphs: [
          "Kliniğimizin tek bir adresi var: Çankaya, Öveçler. Ankara'nın başka bir ilçesinde ya da semtinde şubemiz, ortak çalıştığımız bir muayene noktası ya da gezici hizmetimiz yok. Bu sayfayı, gece, hafta sonu ya da bayramda veteriner arayan Ankaralılar için hazırladık.",
          "Gündüz kendi veterinerinize gidiyorsanız bu düzeni bozmanızı gerektiren bir şey yok. Ama gece yarısı başlayan bir nefes güçlüğü, pazar sabahı fark edilen idrar yapamama ya da bayramın ilk günü yaşanan bir zehirlenme şüphesi beklemeye gelmez; böyle anlarda açık bir kliniğe ulaşmak gerekir.",
        ],
      },
      {
        h2: "Ankara'da nöbetçi veteriner sistemi var mı?",
        paragraphs: [
          "Hayır. Eczanelerdeki gibi resmî bir nöbetçi veteriner çizelgesi yok; Ankara Veteriner Hekimleri Odası'nın sitesinde de nöbet listesi yayımlanmıyor. İnternette karşınıza çıkan \"nöbetçi veteriner\" listelerinin güncel olup olmadığını denetleyen bir kurum bulunmuyor.",
          "Ankara Büyükşehir Belediyesi'nin veteriner hizmetleri —Kurtuluş Sokak Hayvanları Sağlık Merkezi, Oran Kısırlaştırma ve Sahiplendirme Merkezi, Karataş Hayvan Bakımevi, Vetbüs ve E-Pati gibi birimler— ağırlıklı olarak sokak hayvanlarına yönelik. Belediyenin sayfasında sahipli hayvanlar için acil servis ya da çalışma saati yayımlanmıyor; güncel durumu 153 Başkent çağrı merkezinden sorabilirsiniz.",
        ],
        links: [{ label: "Ankara'da acil veteriner: gece yarısı nereye gidilir?", href: "/blog/ankara-acil-veteriner-nereye-gidilir/" }],
      },
      {
        h2: "Gelmeden önce neden aramalısınız?",
        paragraphs: [
          `Acil bakım çoğu zaman bir telefonla başlar. ${PHONE} numarasını aradığınızda durumu kısaca anlatın: ne zaman başladı, ne yemiş ya da yutmuş olabilir, kaç kez oldu, hayvanınız kaç kilo ve hangi ilaçları kullanıyor. Bu bilgiler, gelmeniz gerekip gerekmediğini birlikte değerlendirmemizi ve siz yoldayken hazırlığa başlamamızı sağlar.`,
          "Ankara'nın uzak bir ilçesinden yola çıkacaksanız arama ayrıca önemli: yolda yapmanız ve yapmamanız gerekenleri anlatabiliriz. Evde kusturmayı denemeyin; bazı maddelerde bu tabloyu ağırlaştırır. Kanama varsa temiz bir bezle bastırmak dışında müdahale denemeyin.",
        ],
      },
      {
        h2: "Hangi durumlar sabahı beklemez?",
        paragraphs: [
          "Nefes almakta zorlanma ya da ağızdan soluma, bilinç kaybı, birkaç dakikadan uzun süren ya da tekrarlayan nöbet, durmayan kanama, trafik kazası ya da yüksekten düşme, karnın hızla şişmesi ve öğürüp kusamama, zehirlenme şüphesi, erkek kedide idrar yapamama ve doğumun ilerlememesi: bunların hiçbiri sabahı beklemez. Emin olamadığınızda karar vermeye çalışmak yerine arayın.",
          "Hangi belirtinin ne anlama geldiğini muayene olmadan söyleyemeyiz; ama hangisinin beklemeye gelmediğini telefonda birlikte netleştirebiliriz.",
        ],
        links: [
          { label: "Acil Müdahale hizmetimiz", href: "/hizmetler/acil-mudahale/" },
          { label: "Bu acil mi? Beklemeden gelmeniz gereken 14 belirti", href: "/blog/veteriner-acil-hangi-durumlar/" },
          { label: "Kedim kum kabına girip çıkıyor ama idrar yapamıyor", href: "/blog/kedi-kum-kabina-girip-cikiyor-idrar-yapamiyor/" },
        ],
      },
      {
        h2: "Gece, pazar ve bayramda yola çıkarken",
        paragraphs: [
          "Toplu taşımaya gece güvenmeyin. Öveçler'e inen EGO 451 ve 454 hatlarının son seferleri gece yarısından önce kalkıyor; dinî ve resmî bayramlarda bu hatlarda cumartesi tarifesi uygulanıyor. Kliniğin çevresinde metro ya da Ankaray istasyonu yok. Gece için kendi aracınızı ya da bir taksiyi planlayın.",
          "Bayram tatilleri ve uzun hafta sonları için şimdiden hazırlık yapın: numaramızı telefonunuza kaydedin, hayvanınızın güncel kilosunu ve kullandığı ilaçları bir nota yazın, aşı karnesinin fotoğrafını çekin ve taşıma kabını kolay ulaşılır bir yerde tutun.",
        ],
      },
    ],
    routes: {
      caption:
        "Ankara'nın büyük semt ve ilçelerinden kliniğe ana yollar (OpenStreetMap güzergâhı; mesafeler yaklaşık, gece de trafiğe göre değişir).",
      rows: [
        { from: "Kızılay ve merkez", via: "Dikmen Caddesi → Çetin Emeç Bulvarı → Kabil Caddesi", note: "Kuş uçuşu ~3,7 km" },
        { from: "Keçiören (kuzey)", via: "Konya Yolu (Mevlânâ Bulvarı) güneye → Çetin Emeç Bulvarı → Kabil Caddesi", note: "Keçiören'den yol ~13 km" },
        { from: "Mamak (doğu)", via: "Kızılay → Dikmen Caddesi → Çetin Emeç Bulvarı", note: "Mamak'tan yol ~12 km" },
        { from: "Yenimahalle, Batıkent (kuzeybatı)", via: "Söğütözü → Muhsin Yazıcıoğlu Caddesi → Çetin Emeç Bulvarı", note: "Batıkent'ten yol ~16 km" },
        { from: "Çayyolu, Ümitköy (Eskişehir Yolu)", via: "Eskişehir Yolu (Dumlupınar Bulvarı) → Muhsin Yazıcıoğlu Caddesi → Çetin Emeç Bulvarı", note: "Çayyolu'ndan yol ~16 km" },
        { from: "Etimesgut, Eryaman, Sincan (batı)", via: "Anadolu Bulvarı → 1071 Malazgirt Bulvarı → Kabil Caddesi", note: "Eryaman'dan yol ~25 km" },
        { from: "Gölbaşı (güney)", via: "Konya Yolu (D750) kuzeye → Dikmen Caddesi → Kabil Caddesi", note: "Gölbaşı'ndan yol ~13 km" },
      ],
    },
    gettingHere: [
      "Ankara'nın neresinden gelirseniz gelin, son kısım Çetin Emeç Bulvarı ya da Dikmen Caddesi üzerinden Kabil Caddesi'ne bağlanır; klinik Kabil Caddesi'nin Çetin Emeç Bulvarı'na yakın ucunda, 1335. Sokak'ta. Yol tarifi düğmesi Google Haritalar'ı bulunduğunuz konumdan başlatır.",
    ],
    access: [
      `Adres: ${ADDRESS}.`,
      "Kızılay'dan Öveçler'e EGO 451 ve 454 iner; gece yarısından sonra sefer yok.",
      "Yola çıkmadan arayın; acil durumda randevu gerekmez.",
    ],
    visits: {
      h2: "Gece, pazar ve bayramda hangi durumlar için gelinir?",
      items: [
        { text: "Nefes güçlüğü, nöbet, bilinç kaybı, travma", label: "Acil Müdahale", href: "/hizmetler/acil-mudahale/" },
        { text: "Zehirlenme şüphesi, yabancı cisim yutma", label: "Acil Müdahale", href: "/hizmetler/acil-mudahale/" },
        { text: "Acil değerlendirmede gereken kan tahlili ve görüntüleme", label: "Laboratuvar & Görüntüleme", href: "/hizmetler/laboratuvar-goruntuleme/" },
        { text: "Tavşanın yemeyi ve dışkılamayı bırakması, kuşun kabarıp tüneğe tutunamaması", label: "Kuş, Tavşan & Küçük Dostlar", href: "/hizmetler/kus-tavsan-kucuk-memeliler/" },
        { text: "Ameliyat sonrası gece fark edilen dikiş açılması ya da kanama", label: "Kısırlaştırma & Cerrahi", href: "/hizmetler/kisirlastirma-cerrahi/" },
      ],
    },
    bring: [
      "Zehirlenme şüphesinde maddenin kutusu, etiketi ya da bitkinin bir parçası",
      "Kullandığı ilaçların adı ve son verilme saati",
      "Kedi için kapalı taşıma kabı; köpek için kısa tasma (ağrılı hayvan ısırabilir)",
      "Kusma varsa bir örneği ya da fotoğrafı",
      "Kuş ya da tavşan için kendi kafesi veya kutusu, içinde tanıdık yem",
    ],
    faqs: [
      {
        q: "Ankara'da 7/24 açık veteriner var mı?",
        a: `Evet. Kliniğimiz Çankaya Öveçler'de (${ADDRESS}) 7/24 açık; gece, pazar ve bayramlarda da hasta kabul ediyoruz. Ankara genelinde tek bir kliniğiz, şubemiz yok.`,
      },
      {
        q: "Ankara'da nöbetçi veteriner nasıl bulunur?",
        a: "Ankara'da resmî bir nöbetçi veteriner çizelgesi yok; Ankara Veteriner Hekimleri Odası da liste yayımlamıyor. En pratik yol, gece açık olduğunu bildiğiniz bir kliniğin numarasını önceden kaydetmek ve gece yola çıkmadan arayıp teyit etmek.",
      },
      {
        q: "Pazar günü açık veteriner var mı?",
        a: `Kliniğimiz pazar dâhil her gün açık. Planlı bir muayene için de acil bir durum için de gelebilirsiniz; yola çıkmadan ${PHONE} numarasını aramanız yeterli.`,
      },
      {
        q: "Bayramda açık veteriner var mı?",
        a: "Evet. Ramazan ve Kurban Bayramı dâhil dinî ve resmî bayramlarda da açığız. Bayram tatiline girmeden numaramızı telefonunuza kaydetmenizi öneririz.",
      },
      {
        q: "Gece kaçta gelebilirim?",
        a: "Gecenin her saatinde. Kapımız 24 saat açık; ancak gelmeden önce aramanız, durumu değerlendirmemiz ve siz yoldayken hazırlık yapmamız için önemli.",
      },
      {
        q: "Acil durumda randevu gerekli mi?",
        a: "Hayır. Acil durumlarda randevu gerekmez ve sıra değil aciliyet belirleyicidir. Yine de yola çıkarken aramanızı rica ederiz.",
      },
      {
        q: "Ankara'nın başka bir semtinde şubeniz var mı?",
        a: `Hayır. Tek kliniğimiz ${ADDRESS} adresinde. Ankara'nın her yerinden gelen hastalarımızı bu adreste karşılıyoruz.`,
      },
      {
        q: "Kuş ya da tavşanım için de gece gelebilir miyim?",
        a: "Evet. Kuşlar, tavşanlar ve ginepigler hastalığı uzun süre saklar; tavşanın yemeyi ve dışkılamayı bırakması ya da kuşun kabarıp tüneğe tutunamaması beklemeye gelmez. Gece de arayıp gelebilirsiniz.",
      },
    ],
    relatedPosts: [
      "ankara-acil-veteriner-nereye-gidilir",
      "veteriner-acil-hangi-durumlar",
      "evcil-hayvanlarda-zehirlenme",
      "kedilerde-nefes-darligi",
      "kopeklerde-mide-burulmasi-gdv",
      "tavsanlarda-bagirsak-durmasi",
    ],
    services: ["acil-mudahale", "laboratuvar-goruntuleme", "kus-tavsan-kucuk-memeliler"],
    sources: [SRC.avho, SRC.abb, SRC.ego451, SRC.ego454, SRC.merck, SRC.osm],
  },
];

/** Slugs for sitemap wiring and static params. */
export const locationSlugs: string[] = locations.map((l) => l.slug);

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}
