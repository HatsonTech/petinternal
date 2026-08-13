// ── Local/geo landing pages (/veteriner/<slug>) ──────────────────────
// The clinic has ONE physical location: Öveçler, 1335. Sk. 8/B, Çankaya.
// "primary" pages describe that address directly. "nearby" pages describe how
// visitors from a neighbouring Ankara district reach us — they must never
// imply a branch, office or second address in that district.

import type { FAQ } from "@/lib/posts";

export type LocationKind = "primary" | "nearby";

export type Location = {
  slug: string;
  /** District name as used in headings, e.g. "Çankaya" */
  district: string;
  kind: LocationKind;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  /** Short lede under the H1. */
  intro: string;
  /** "Buraya nasıl gelinir" paragraphs. */
  gettingHere: string[];
  /** Bullet list: transit, parking, landmarks. */
  access: string[];
  faqs: FAQ[];
  /** Blog slugs surfaced on this page (must exist in lib/posts). */
  relatedPosts: string[];
};

const commonKeywords = (d: string) => [
  `${d} veteriner`,
  `${d} veteriner kliniği`,
  `veteriner ${d} Ankara`,
  `${d} acil veteriner`,
  `${d} iç hastalıkları veteriner`,
];

/** Shared FAQ answers that are true for every page (single clinic, 7/24). */
const emergencyFaq: FAQ = {
  q: "Gece ya da hafta sonu gelebilir miyiz?",
  a: "Evet. Kliniğimiz 7/24 açıktır; hafta sonu ve resmî tatiller dâhil acil başvuruları kabul ediyoruz. Yola çıkmadan önce 0536 290 69 58 numarasını arayıp durumu kısaca anlatmanız, siz gelene kadar hazırlık yapmamızı sağlar.",
};

export const locations: Location[] = [
  {
    slug: "cankaya-veteriner",
    district: "Çankaya",
    kind: "primary",
    title: "Çankaya Veteriner Kliniği",
    metaTitle: "Çankaya Veteriner Kliniği · İç Hastalıkları ve 7/24 Acil",
    metaDescription:
      "Çankaya Öveçler'de 7/24 açık veteriner kliniği. İç hastalıkları odaklı muayene, laboratuvar, görüntüleme ve acil bakım. 0536 290 69 58.",
    keywords: commonKeywords("Çankaya"),
    intro:
      "Pet Internal Veteriner Kliniği, Çankaya'nın Öveçler mahallesinde, 1335. Sokak üzerinde hizmet veriyor. Kedi ve köpeklerde iç hastalıkları — böbrek, karaciğer, hormon, kalp ve sindirim sistemi sorunları — üzerine yoğunlaşan bir klinik olarak, ilçe genelinden gelen hastaları 7/24 kabul ediyoruz.",
    gettingHere: [
      "Kliniğimiz Çankaya ilçe sınırları içinde, Öveçler'de yer alıyor. Kızılay, Bahçelievler, Yıldız ve Öveçler yönlerinden özel araçla ortalama 10–20 dakikada ulaşabilirsiniz; trafik yoğunluğu saatine göre değişir.",
      "İç hastalıkları vakalarında tanı çoğu zaman tek bir muayeneyle bitmez: kan ve idrar tahlili, ultrason ya da röntgen gerekebilir. Bu nedenle randevunuzu telefonla oluşturup dostunuzun şikâyetini önceden aktarmanız, aynı ziyarette gerekli tetkiklerin planlanmasını kolaylaştırır.",
    ],
    access: [
      "Adres: Öveçler, 1335. Sk. 8/B, 06460 Çankaya / Ankara.",
      "Sokak üzerinde ve çevre sokaklarda kısa süreli park imkânı bulunur; yoğun saatlerde biraz yürümeyi göze almanız gerekebilir.",
      "Toplu taşımayla gelenler Öveçler duraklarını kullanabilir; duraktan klinik yürüme mesafesindedir.",
      "Taşıma kabıyla gelmeniz, özellikle kediler için hem güvenli hem de muayeneyi kolaylaştırır.",
    ],
    faqs: [
      emergencyFaq,
      {
        q: "Çankaya'da iç hastalıkları için ayrı bir randevu almak gerekiyor mu?",
        a: "Ayrı bir hat yok; tüm başvurular aynı randevu numarasından alınıyor. Ancak şikâyetiniz kronik bir iç hastalığı takibiyse (böbrek, tiroid, diyabet, kalp) telefonda belirtmeniz, tahlil ve görüntüleme için yeterli süre ayırmamızı sağlar.",
      },
      {
        q: "Önceki tahlil sonuçlarımızı getirmeli miyiz?",
        a: "Kesinlikle getirin. Başka bir klinikte yapılmış kan tahlili, ultrason raporu ya da kullanılan ilaçların listesi, hastalığın seyrini görmek açısından çok değerlidir. Fotoğraf ya da PDF olarak da yeterlidir.",
      },
      {
        q: "Randevusuz gelirsek muayene olabilir miyiz?",
        a: "Acil durumlarda randevusuz gelebilirsiniz; kliniğimiz kesintisiz açıktır. Rutin kontrol ve aşı gibi planlı ziyaretlerde ise önceden aramanız bekleme süresini kısaltır.",
      },
    ],
    relatedPosts: [
      "veteriner-acil-hangi-durumlar",
      "evcil-hayvan-check-up-neleri-kapsar",
      "kedilerde-kronik-bobrek-hastaligi",
      "kopeklerde-kalp-hastaligi-mmvd",
      "mikrocip-cezasi-ve-petvet-2026",
    ],
  },
  {
    slug: "ovecler-veteriner",
    district: "Öveçler",
    kind: "primary",
    title: "Öveçler Veteriner Kliniği",
    metaTitle: "Öveçler Veteriner Kliniği · 1335. Sokak, 7/24 Açık",
    metaDescription:
      "Öveçler 1335. Sokak'ta bulunan veteriner kliniğimiz 7/24 açık. Kedi ve köpeklerde iç hastalıkları, laboratuvar, görüntüleme ve acil muayene.",
    keywords: commonKeywords("Öveçler"),
    intro:
      "Kliniğimizin adresi Öveçler, 1335. Sokak 8/B. Mahallenin içinde olduğumuz için Öveçler'de yaşayan pek çok aile bize yürüyerek geliyor. Kedi ve köpeklerde iç hastalıkları odaklı çalışıyor, acil başvuruları gece gündüz kabul ediyoruz.",
    gettingHere: [
      "1335. Sokak, Öveçler'in ana arterlerinden yürüme mesafesinde. Mahalle içinden gelen komşularımız için klinik genellikle 5–10 dakikalık bir yürüyüş mesafesindedir; tabelamız sokak üzerindedir.",
      "Öveçler'de oturuyorsanız kronik hastalık takibi ciddi bir avantaja dönüşüyor: böbrek, tiroid ya da diyabet takibinde tahlil aralıklarını aksatmadan sürdürmek, hastalığın seyrini değiştiren en önemli faktörlerden biri.",
    ],
    access: [
      "Adres: Öveçler, 1335. Sk. 8/B, 06460 Çankaya / Ankara.",
      "Mahalle içinden yürüyerek gelenler için taşıma kabı öneriyoruz; kediler tanıdık sokakta bile ürkebilir.",
      "Araçla gelenler sokak üzerinde ve yakın ara sokaklarda park yeri arayabilir.",
      "Acil bir durumda yola çıkmadan önce arayın; hazırlığı siz yoldayken yapalım.",
    ],
    faqs: [
      emergencyFaq,
      {
        q: "Öveçler'de eve muayene hizmeti veriyor musunuz?",
        a: "Muayene ve tetkikler klinikte yapılıyor. İç hastalıklarında tanı için laboratuvar ve görüntüleme cihazlarına ihtiyaç duyulduğundan, dostunuzun kliniğe getirilmesi hem daha hızlı hem de daha doğru sonuç veriyor.",
      },
      {
        q: "Yavru kedi/köpek aşılarını da yaptırabilir miyiz?",
        a: "Evet. Aşı takvimi, iç ve dış parazit koruması ve mikroçip kaydı gibi koruyucu hekimlik uygulamalarının tamamı klinikte yapılıyor. İlk aşı öncesi genel bir muayene ile başlıyoruz.",
      },
      {
        q: "Bekleme alanında kedi ve köpekler ayrı mı?",
        a: "Yoğunluk durumuna göre kedi sahiplerine ayrı bekleme alanı veya doğrudan muayeneye alınma önerisi yapıyoruz. Kediniz stresliyse geldiğinizde belirtmeniz yeterli.",
      },
    ],
    relatedPosts: [
      "kedi-asi-takvimi",
      "kopek-asi-takvimi",
      "yavru-kopek-bakim-rehberi",
      "evcil-hayvan-check-up-neleri-kapsar",
      "kene-ve-pire-korunma",
    ],
  },
  {
    slug: "balgat-veteriner",
    district: "Balgat",
    kind: "nearby",
    title: "Balgat'tan Gelen Dostlarımız İçin",
    metaTitle: "Balgat'a Yakın Veteriner Kliniği · Öveçler, 7/24 Açık",
    metaDescription:
      "Balgat'tan araçla kısa sürede ulaşabileceğiniz Öveçler'deki kliniğimiz 7/24 açık. İç hastalıkları odaklı muayene, laboratuvar ve acil bakım.",
    keywords: commonKeywords("Balgat"),
    intro:
      "Kliniğimiz Balgat'ta değil, komşu mahalle Öveçler'de: 1335. Sokak 8/B. Balgat'tan gelen kedi ve köpek sahipleri düzenli hastalarımız arasında; bu sayfada bize nasıl ulaşacağınızı ve ne beklemeniz gerektiğini anlattık.",
    gettingHere: [
      "Balgat ile Öveçler komşu bölgeler. Konya Yolu ve Öveçler bağlantıları üzerinden özel araçla trafiğe göre yaklaşık 5–15 dakikada kliniğe ulaşabilirsiniz.",
      "Balgat'tan gelen sahiplerin en sık sorduğu şey acil durumlarda ne kadar sürede varabilecekleri. Kliniğimiz kesintisiz açık olduğu için gece de kapıyı çalabilirsiniz; yola çıkmadan telefonla haber vermeniz siz gelene kadar hazırlık yapmamızı sağlar.",
    ],
    access: [
      "Klinik adresi: Öveçler, 1335. Sk. 8/B, 06460 Çankaya / Ankara. Balgat'ta şubemiz yoktur.",
      "Toplu taşımayla gelenler Öveçler yönüne giden hatları kullanabilir; klinik durağa yürüme mesafesindedir.",
      "Araçla gelenler sokak üzerinde ve yakın ara sokaklarda park yeri arayabilir.",
      "Acil vakalarda yola çıkmadan önce 0536 290 69 58'i arayın.",
    ],
    faqs: [
      emergencyFaq,
      {
        q: "Balgat'ta şubeniz var mı?",
        a: "Hayır. Tek bir kliniğimiz var ve adresi Öveçler, 1335. Sk. 8/B. Balgat'tan gelen hastalarımızı bu adreste karşılıyoruz.",
      },
      {
        q: "Balgat'tan gelirken kedimi nasıl taşımalıyım?",
        a: "Sert taşıma kabı en güvenli seçenek. Kabın içine evden tanıdık kokan bir örtü koyun, araçta emniyet kemeriyle sabitleyin ve camı açık bırakmayın. Kısa mesafe bile olsa kucakta taşımak riskli.",
      },
      {
        q: "Kronik hastalık takibi için düzenli gelmemiz gerekir mi?",
        a: "Böbrek, tiroid, diyabet ya da kalp hastalığı takibinde kontrol aralıkları hastalığın evresine göre belirlenir. Mesafenin kısa olması bu takibi kolaylaştırıyor; kontrol tarihinizi çıkışta birlikte planlıyoruz.",
      },
    ],
    relatedPosts: [
      "veteriner-acil-hangi-durumlar",
      "kedilerde-kronik-bobrek-hastaligi",
      "kopegim-cok-su-iciyor",
      "evcil-hayvan-check-up-neleri-kapsar",
    ],
  },
  {
    slug: "dikmen-veteriner",
    district: "Dikmen",
    kind: "nearby",
    title: "Dikmen'den Gelen Dostlarımız İçin",
    metaTitle: "Dikmen'e Yakın Veteriner Kliniği · Öveçler, 7/24 Açık",
    metaDescription:
      "Dikmen'den ulaşabileceğiniz Öveçler'deki 7/24 açık veteriner kliniği. Kedi ve köpeklerde iç hastalıkları, tahlil, görüntüleme ve acil muayene.",
    keywords: commonKeywords("Dikmen"),
    intro:
      "Kliniğimiz Dikmen'de değil, Öveçler'de — 1335. Sokak 8/B. Dikmen ve çevresinden gelen kedi ve köpek sahipleri için ulaşım, park ve acil başvuru konularını burada topladık.",
    gettingHere: [
      "Dikmen Caddesi ve Öveçler bağlantı yolları üzerinden özel araçla trafiğe göre yaklaşık 10–20 dakikalık bir mesafedeyiz.",
      "Dikmen'in eğimli sokaklarından çıkarken, özellikle nefes darlığı ya da kalp şikâyeti olan hastalarda aracı serin tutmanızı ve gereksiz beklemeden yola çıkmanızı öneriyoruz. Durumu telefonda anlatırsanız gelir gelmez muayeneye alınmanız için hazırlık yapabiliriz.",
    ],
    access: [
      "Klinik adresi: Öveçler, 1335. Sk. 8/B, 06460 Çankaya / Ankara. Dikmen'de şubemiz yoktur.",
      "Toplu taşımayla gelenler Öveçler yönüne giden hatlarla klinik yakınına ulaşabilir.",
      "Sokak üzerinde ve çevre sokaklarda kısa süreli park imkânı bulunur.",
      "7/24 açığız; gece başvurularında da kapımız açık.",
    ],
    faqs: [
      emergencyFaq,
      {
        q: "Dikmen'de bir şubeniz bulunuyor mu?",
        a: "Hayır. Tek adresimiz Öveçler, 1335. Sk. 8/B. Dikmen'den gelen hastalarımızı bu klinikte karşılıyoruz.",
      },
      {
        q: "Yolda dostumun durumu kötüleşirse ne yapmalıyım?",
        a: "Aracı durdurup bizi arayın. Solunum güçlüğü, bilinç kaybı ya da durmayan kanama gibi durumlarda telefonda size yolda uygulayabileceğiniz temel önlemleri anlatabilir, siz gelene kadar hazırlığı yapabiliriz.",
      },
      {
        q: "İç hastalıkları odaklı olmanız ne anlama geliyor?",
        a: "Kliniğimiz kedi ve köpeklerde iç organ hastalıklarının tanı ve takibine yoğunlaşıyor: böbrek, karaciğer, pankreas, hormon sistemi, kalp ve sindirim sistemi. Bu alanlarda tanı, tek bir muayeneden çok laboratuvar ve görüntüleme sonuçlarının birlikte yorumlanmasıyla ilerliyor.",
      },
    ],
    relatedPosts: [
      "kedilerde-nefes-darligi",
      "veteriner-acil-hangi-durumlar",
      "kopeklerde-kalp-hastaligi-mmvd",
      "kedilerde-hipertiroidi",
    ],
  },
  {
    slug: "cukurambar-veteriner",
    district: "Çukurambar",
    kind: "nearby",
    title: "Çukurambar'dan Gelen Dostlarımız İçin",
    metaTitle: "Çukurambar'a Yakın Veteriner Kliniği · Öveçler, 7/24 Açık",
    metaDescription:
      "Çukurambar'dan kısa sürede ulaşabileceğiniz Öveçler'deki veteriner kliniği. 7/24 açık; iç hastalıkları, tahlil, görüntüleme ve acil bakım.",
    keywords: commonKeywords("Çukurambar"),
    intro:
      "Kliniğimiz Çukurambar'da değil, komşu bölge Öveçler'de: 1335. Sokak 8/B. Çukurambar'daki sitelerden gelen kedi ve köpek sahipleri için ulaşım ve randevu bilgilerini bu sayfada topladık.",
    gettingHere: [
      "Çukurambar ile Öveçler arası kısa bir mesafe; özel araçla trafiğe göre yaklaşık 5–15 dakika. Kliniğe gelmeden önce telefonla randevu oluşturmanız bekleme süresini kısaltır.",
      "Apartman ve site içinde yaşayan kediler için en sık karşılaştığımız başvuru nedenleri idrar sorunları, kusma ve kilo değişimleri. Bu şikâyetlerde ilk gün kan ve idrar tahlili istememiz olağan; aç gelmeniz gerekip gerekmediğini telefonda söyleyebiliriz.",
    ],
    access: [
      "Klinik adresi: Öveçler, 1335. Sk. 8/B, 06460 Çankaya / Ankara. Çukurambar'da şubemiz yoktur.",
      "Araçla gelenler sokak üzerinde ve yakın ara sokaklarda park yeri arayabilir.",
      "Toplu taşımayla Öveçler yönüne giden hatları kullanabilirsiniz.",
      "Acil durumda randevu gerekmez; kliniğimiz kesintisiz açıktır.",
    ],
    faqs: [
      emergencyFaq,
      {
        q: "Çukurambar'da şubeniz var mı?",
        a: "Hayır. Tek kliniğimiz Öveçler, 1335. Sk. 8/B adresinde. Çukurambar'dan gelen hastalarımızı burada karşılıyoruz.",
      },
      {
        q: "Tahlil için dostumun aç gelmesi gerekir mi?",
        a: "Bazı kan tahlillerinde 8–12 saatlik açlık istenir, bazılarında gerekmez. Randevu alırken şikâyeti anlatırsanız hangi hazırlığın gerektiğini önceden söyleyebiliriz. Su her zaman serbest bırakılmalı.",
      },
      {
        q: "Sonuçları aynı gün alabilir miyiz?",
        a: "Rutin kan ve idrar tahlillerinin büyük kısmı klinikte kısa sürede sonuçlanır ve aynı ziyarette değerlendirilir. Dış laboratuvara gönderilen özel testlerde süre değişir; bu durumu baştan belirtiyoruz.",
      },
    ],
    relatedPosts: [
      "kedilerde-idrar-tikanikligi-flutd",
      "kedilerde-kusma",
      "evcil-hayvanlarda-obezite",
      "evcil-hayvan-check-up-neleri-kapsar",
    ],
  },
  {
    slug: "or-an-veteriner",
    district: "Or-An",
    kind: "nearby",
    title: "Or-An'dan Gelen Dostlarımız İçin",
    metaTitle: "Or-An'a Yakın Veteriner Kliniği · Öveçler, 7/24 Açık",
    metaDescription:
      "Or-An'dan ulaşabileceğiniz Öveçler'deki 7/24 açık veteriner kliniği. İç hastalıkları odaklı muayene, laboratuvar, görüntüleme ve acil bakım.",
    keywords: commonKeywords("Or-An"),
    intro:
      "Kliniğimiz Or-An'da değil, Öveçler'de: 1335. Sokak 8/B. Or-An ve çevresinden gelen kedi ve köpek sahipleri için ulaşım, randevu ve acil başvuru bilgilerini burada bulabilirsiniz.",
    gettingHere: [
      "Or-An'dan Öveçler'e özel araçla trafiğe göre yaklaşık 10–20 dakikada ulaşılıyor. Konya Yolu ve Öveçler bağlantılarını kullanabilirsiniz.",
      "Or-An'da bahçeli yaşam yaygın olduğu için kene, pire ve dış parazit başvuruları bizde sık görülüyor. Bahçeye çıkan kedi ve köpeklerde koruma takvimini aksatmamak, sadece kaşıntıyı değil kenenin taşıdığı hastalıkları da önlüyor.",
    ],
    access: [
      "Klinik adresi: Öveçler, 1335. Sk. 8/B, 06460 Çankaya / Ankara. Or-An'da şubemiz yoktur.",
      "Sokak üzerinde ve çevre sokaklarda kısa süreli park imkânı bulunur.",
      "Toplu taşımayla Öveçler yönüne giden hatlarla klinik yakınına ulaşabilirsiniz.",
      "Gece ve hafta sonu dâhil kesintisiz açığız.",
    ],
    faqs: [
      emergencyFaq,
      {
        q: "Or-An'da şubeniz var mı?",
        a: "Hayır. Tek adresimiz Öveçler, 1335. Sk. 8/B. Or-An'dan gelen hastalarımızı bu klinikte karşılıyoruz.",
      },
      {
        q: "Bahçeye çıkan köpeğimiz için hangi korumalar gerekli?",
        a: "Dış parazit (kene, pire, tatarcık) koruması ve düzenli aşı takvimi bahçeli yaşamda daha da önemli. Koruma ürününün türü ve aralığı dostunuzun kilosu, yaşı ve yaşam biçimine göre belirlenir; muayenede birlikte planlıyoruz.",
      },
      {
        q: "Kene tuttuğunda evde çıkarmalı mıyız?",
        a: "Yanlış çıkarma kenenin ağız kısmının deride kalmasına yol açabilir. Kene gördüyseniz ezmeden, yakmadan bırakın ve kliniğe getirin; hem güvenli şekilde çıkarır hem de gerekiyorsa takip planı öneririz.",
      },
    ],
    relatedPosts: [
      "kene-ve-pire-korunma",
      "kopeklerde-leishmania-ve-tatarcik",
      "kopek-asi-takvimi",
      "yaz-sicaginda-pati-bakimi",
    ],
  },
  {
    slug: "sogutozu-veteriner",
    district: "Söğütözü",
    kind: "nearby",
    title: "Söğütözü'nden Gelen Dostlarımız İçin",
    metaTitle: "Söğütözü'ne Yakın Veteriner Kliniği · Öveçler, 7/24 Açık",
    metaDescription:
      "Söğütözü'nden ulaşabileceğiniz Öveçler'deki veteriner kliniği. 7/24 açık; iç hastalıkları odaklı muayene, tahlil, görüntüleme ve acil bakım.",
    keywords: commonKeywords("Söğütözü"),
    intro:
      "Kliniğimiz Söğütözü'nde değil, Öveçler'de: 1335. Sokak 8/B. Söğütözü'nde çalışan ve yaşayan kedi-köpek sahipleri için ulaşım ve randevu bilgilerini bu sayfada topladık.",
    gettingHere: [
      "Söğütözü'nden Öveçler'e özel araçla trafiğe göre yaklaşık 10–20 dakika. Ofis çıkışı yoğun saatlerde bu süre uzayabildiği için randevunuzu telefonda esnek planlayabiliriz.",
      "Gün içinde işten ayrılamayan sahipler için akşam ve gece saatleri pratik bir alternatif: kliniğimiz kesintisiz açık olduğundan mesai sonrası muayene mümkün.",
    ],
    access: [
      "Klinik adresi: Öveçler, 1335. Sk. 8/B, 06460 Çankaya / Ankara. Söğütözü'nde şubemiz yoktur.",
      "Araçla gelenler sokak üzerinde ve yakın ara sokaklarda park yeri arayabilir.",
      "Toplu taşımayla Öveçler yönüne giden hatları kullanabilirsiniz.",
      "Akşam ve gece başvurularında da açığız; önceden aramanız yeterli.",
    ],
    faqs: [
      emergencyFaq,
      {
        q: "Söğütözü'nde şubeniz var mı?",
        a: "Hayır. Tek kliniğimiz Öveçler, 1335. Sk. 8/B adresinde. Söğütözü'nden gelen hastalarımızı burada karşılıyoruz.",
      },
      {
        q: "Mesai sonrası muayene mümkün mü?",
        a: "Evet. Klinik 7/24 açık olduğu için akşam ve gece saatlerinde de muayene yapılabiliyor. Planlı bir kontrol için akşam saatini seçecekseniz telefonla bildirmeniz iyi olur.",
      },
      {
        q: "Gün boyu evde yalnız kalan kedide nelere dikkat etmeliyiz?",
        a: "İştah, su tüketimi ve kum kabındaki değişiklikler evde yalnız kalan kedilerde en erken uyarı işaretleridir. İki günden uzun süren iştahsızlık ya da idrar yapma çabası gördüğünüzde beklemeden kliniğe başvurun.",
      },
    ],
    relatedPosts: [
      "kedim-yemek-yemiyor",
      "kedilerde-tuvalet-disina-isemesi",
      "kedilerde-idrar-tikanikligi-flutd",
      "evcil-hayvan-check-up-neleri-kapsar",
    ],
  },
  {
    slug: "emek-veteriner",
    district: "Emek",
    kind: "nearby",
    title: "Emek'ten Gelen Dostlarımız İçin",
    metaTitle: "Emek'e Yakın Veteriner Kliniği · Öveçler, 7/24 Açık",
    metaDescription:
      "Emek'ten ulaşabileceğiniz Öveçler'deki 7/24 açık veteriner kliniği. Kedi ve köpeklerde iç hastalıkları, tahlil, görüntüleme ve acil muayene.",
    keywords: commonKeywords("Emek"),
    intro:
      "Kliniğimiz Emek'te değil, Öveçler'de: 1335. Sokak 8/B. Emek ve çevresinden gelen kedi ve köpek sahipleri için ulaşım, park ve acil başvuru bilgilerini burada topladık.",
    gettingHere: [
      "Emek'ten Öveçler'e özel araçla trafiğe göre yaklaşık 15–25 dakikalık bir mesafe var. Rutin kontrolleri gün ortasına, acil başvuruları ise beklemeden yapmanızı öneriyoruz.",
      "Emek gibi yerleşik mahallelerde yaşlı kedi ve köpek nüfusu yüksek. Yaşlı dostlarda altı ayda bir yapılan kan ve idrar kontrolü, böbrek ve tiroid hastalıklarını belirti çıkmadan yakalamanın en pratik yolu.",
    ],
    access: [
      "Klinik adresi: Öveçler, 1335. Sk. 8/B, 06460 Çankaya / Ankara. Emek'te şubemiz yoktur.",
      "Sokak üzerinde ve çevre sokaklarda kısa süreli park imkânı bulunur.",
      "Toplu taşımayla Öveçler yönüne giden hatlarla klinik yakınına ulaşabilirsiniz.",
      "7/24 açığız; acil durumda randevu gerekmez.",
    ],
    faqs: [
      emergencyFaq,
      {
        q: "Emek'te şubeniz var mı?",
        a: "Hayır. Tek adresimiz Öveçler, 1335. Sk. 8/B. Emek'ten gelen hastalarımızı bu klinikte karşılıyoruz.",
      },
      {
        q: "Yaşlı kedimiz için ne sıklıkla kontrol gerekir?",
        a: "Yedi yaş üstü kedi ve köpeklerde altı ayda bir genel muayene ile kan-idrar kontrolü yaygın bir yaklaşımdır. Kronik bir hastalık takibi varsa aralık daha sık olabilir; planı muayenede birlikte belirliyoruz.",
      },
      {
        q: "Uzun yolculuk yaşlı bir hayvana zarar verir mi?",
        a: "Kısa şehir içi mesafelerde çoğu yaşlı hasta sorunsuz seyahat eder. Taşıma kabını sabitleyin, aracı serin tutun ve yolculuğu mümkün olduğunca sakin geçirin. Eklem ağrısı olan dostlarda kabın tabanına yumuşak bir örtü koymak rahatlatır.",
      },
    ],
    relatedPosts: [
      "yasli-kedi-kopek-bakimi",
      "kedilerde-kronik-bobrek-hastaligi",
      "kedilerde-hipertiroidi",
      "kedilerde-eklem-agrisi-monoklonal-antikor",
    ],
  },
];

/** Slugs for sitemap wiring and static params. */
export const locationSlugs: string[] = locations.map((l) => l.slug);

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}
