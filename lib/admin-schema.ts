import type { CollectionKey, SectionKey } from "./types";


export type FieldType = "text" | "textarea" | "number" | "image" | "checkbox" | "lines" | "select" | "date";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  help?: string;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
};

export type SectionSpec = {
  key: SectionKey;
  title: string;
  description?: string;
  fields: Field[];
};

export type CollectionSpec = {
  key: CollectionKey;
  title: string;
  singular: string;
  description?: string;
  fields: Field[];
  titleField: string;
  subtitleField?: string;
  imageField?: string;
  warning?: (item: Record<string, unknown>) => string | undefined;
};

export const ICON_OPTIONS = [
  { value: "sparkles", label: "Փայլ" },
  { value: "award", label: "Մրցանակ" },
  { value: "book", label: "Գիրք" },
  { value: "mic", label: "Միկրոֆոն" },
  { value: "shield", label: "Վահան" },
  { value: "globe", label: "Գլոբուս" },
  { value: "users", label: "Մարդիկ" },
  { value: "message", label: "Հաղորդագրություն" },
  { value: "calendar", label: "Օրացույց" },
  { value: "clock", label: "Ժամացույց" },
  { value: "video", label: "Տեսազանգ" },
  { value: "target", label: "Թիրախ" },
  { value: "star", label: "Աստղ" },
  { value: "smile", label: "Ժպիտ" },
];

export const sections: Record<SectionKey, SectionSpec> = {
  home: {
    key: "home",
    title: "Գլխավոր բաժին (Hero)",
    description: "Գլխավոր էջի վերին հատվածը և վիճակագրությունը։",
    fields: [
      { name: "badge", label: "Պիտակ", type: "text" },
      { name: "title", label: "Վերնագիր", type: "text", required: true },
      { name: "highlight", label: "Ընդգծված բառ", type: "text", help: "Ցուցադրվում է վերնագրից հետո՝ գունավոր" },
      { name: "subtitle", label: "Ենթավերնագիր", type: "textarea" },
      { name: "students", label: "Ուսանողների քանակ", type: "text", placeholder: "1000+" },
      { name: "teachers", label: "Դասընթացավարների քանակ", type: "text" },
      { name: "languages", label: "Լեզուների քանակ", type: "text" },
    ],
  },
  refund: {
    key: "refund",
    title: "Ուսման վարձի փոխհատուցում",
    description: "Պետական փոխհատուցման ծրագրի մասին բլոկը։",
    fields: [
      { name: "enabled", label: "Ցուցադրել կայքում", type: "checkbox" },
      { name: "title", label: "Վերնագիր", type: "text", required: true },
      { name: "amount", label: "Գումար", type: "text" },
      { name: "text", label: "Տեքստ", type: "textarea" },
      { name: "note", label: "Լրացուցիչ նշում", type: "textarea" },
    ],
  },
  about: {
    key: "about",
    title: "Կազմակերպության մասին",
    fields: [
      { name: "title", label: "Վերնագիր", type: "text", required: true },
      { name: "intro", label: "Ներածություն", type: "textarea" },
      { name: "body", label: "Հիմնական տեքստ", type: "textarea", help: "Պարբերությունները բաժանեք դատարկ տողով" },
      { name: "mission", label: "Առաքելություն", type: "textarea" },
      { name: "accreditation", label: "Հավատարմագրում", type: "textarea" },
    ],
  },
  coursesPage: {
    key: "coursesPage",
    title: "Դասընթացների էջի տեքստեր",
    fields: [
      { name: "intro", label: "Ներածություն", type: "textarea" },
      { name: "howTitle", label: "«Ինչպես» բաժնի վերնագիր", type: "text" },
      { name: "howText", label: "«Ինչպես» բաժնի տեքստ", type: "textarea" },
      { name: "pricingTitle", label: "Փաթեթների վերնագիր", type: "text" },
      { name: "pricingText", label: "Փաթեթների տեքստ", type: "textarea" },
    ],
  },
  texts: {
    key: "texts",
    title: "Վերնագրեր և տեքստեր",
    description: "Կայքի տարբեր բաժինների վերնագրերն ու կարճ տեքստերը։",
    fields: [
      { name: "heroPoints", label: "Գլխավոր էջ · առավելություններ վերնագրի տակ", type: "lines", help: "Յուրաքանչյուրը նոր տողում (լավագույնը՝ 3)" },
      { name: "whyTitle", label: "Գլխավոր էջ · «Ինչու մենք» վերնագիր", type: "text" },
      { name: "whyText", label: "Գլխավոր էջ · «Ինչու մենք» տեքստ", type: "textarea" },
      { name: "coursesTitle", label: "Գլխավոր էջ · լեզուների վերնագիր", type: "text" },
      { name: "coursesText", label: "Գլխավոր էջ · լեզուների տեքստ", type: "textarea" },
      { name: "testimonialsTitle", label: "Կարծիքների վերնագիր", type: "text" },
      { name: "testimonialsText", label: "Կարծիքների տեքստ", type: "textarea" },
      { name: "ctaTitle", label: "Ոսկեգույն ժապավեն · վերնագիր", type: "text", help: "Ցուցադրվում է էջերի ներքևում" },
      { name: "ctaText", label: "Ոսկեգույն ժապավեն · տեքստ", type: "textarea" },
      { name: "coursesHeroTitle", label: "Դասընթացների էջ · գլխավոր վերնագիր", type: "text" },
      { name: "teamTitle", label: "Մեր մասին · թիմի վերնագիր", type: "text" },
      { name: "teamText", label: "Մեր մասին · թիմի տեքստ", type: "textarea" },
      { name: "contactTitle", label: "Կապ · գլխավոր վերնագիր", type: "text" },
      { name: "contactText", label: "Կապ · տեքստ", type: "textarea" },
      { name: "footerText", label: "Էջի ներքևի (footer) նկարագրություն", type: "textarea" },
      { name: "kidsQuoteCaption", label: "Երեխաներին · հարցի տակի տեքստ", type: "text" },
      { name: "kidsSkillsTitle", label: "Երեխաներին · «զարգացնում է» վերնագիր", type: "text" },
      { name: "kidsStepsTitle", label: "Երեխաներին · քայլերի վերնագիր", type: "text" },
    ],
  },
  kids: {
    key: "kids",
    title: "Երեխաների համար էջ",
    description: "«Երեխաների համար» էջի բովանդակությունը։ Անջատված վիճակում էջը և ընտրացանկի հղումը թաքցվում են։",
    fields: [
      { name: "enabled", label: "Ցուցադրել կայքում", type: "checkbox" },
      { name: "ages", label: "Տարիք", type: "text", placeholder: "6–15 տարեկան" },
      { name: "title", label: "Վերնագիր", type: "text", required: true },
      { name: "intro", label: "Ներածություն", type: "textarea" },
      { name: "question", label: "Գլխավոր հարցը", type: "text", help: "Ցուցադրվում է մեծ տառերով, որպես մեջբերում" },
      { name: "outcomes", label: "Ինչ կկարողանա երեխան", type: "lines", help: "Յուրաքանչյուրը նոր տողում" },
      { name: "skills", label: "Ինչ է զարգացնում դասընթացը", type: "lines", help: "Յուրաքանչյուրը նոր տողում" },
      { name: "motivation", label: "Մոտիվացիայի մասին տեքստ", type: "textarea" },
      { name: "steps", label: "Ինչպես ենք սկսում", type: "lines", help: "Յուրաքանչյուր քայլը նոր տողում" },
      { name: "offer", label: "Հատուկ առաջարկ", type: "text" },
    ],
  },
  promo: {
    key: "promo",
    title: "Ակցիաների կարգավորում",
    description: "Միացրեք, որ ակցիաները երևան կայքում։ Անջատված վիճակում (կամ եթե ոչ մի ակցիա չկա) «Ակցիաներ» էջը և ընտրացանկի հղումը թաքցվում են։",
    fields: [
      { name: "enabled", label: "Ակցիաները միացված են", type: "checkbox" },
      { name: "title", label: "Վերնագիր", type: "text", required: true },
      { name: "text", label: "Նկարագրություն", type: "textarea" },
    ],
  },
  settings: {
    key: "settings",
    title: "Կոնտակտային տվյալներ",
    fields: [
      { name: "phone", label: "Հեռախոս", type: "text", required: true },
      { name: "phone2", label: "Լրացուցիչ հեռախոս", type: "text" },
      { name: "email", label: "Էլ. փոստ", type: "text" },
      { name: "address", label: "Հասցե", type: "text" },
      { name: "hours", label: "Աշխատանքային ժամեր", type: "text" },
      { name: "instagram", label: "Instagram հղում", type: "text" },
      { name: "facebook", label: "Facebook հղում", type: "text" },
      { name: "tiktok", label: "TikTok հղում", type: "text" },
      { name: "linkedin", label: "LinkedIn հղում", type: "text" },
      { name: "mapUrl", label: "Google Maps embed հղում", type: "text", help: "Google Maps → Share → Embed a map → src հղումը" },
    ],
  },
};

export const collections: Record<CollectionKey, CollectionSpec> = {
  features: {
    key: "features",
    title: "Առավելություններ",
    singular: "առավելություն",
    description: "«Ինչու՞ մենք» բաժինը գլխավոր էջում։",
    titleField: "title",
    subtitleField: "text",
    fields: [
      { name: "icon", label: "Պատկերակ", type: "select", options: ICON_OPTIONS },
      { name: "title", label: "Վերնագիր", type: "text", required: true },
      { name: "text", label: "Տեքստ", type: "textarea" },
    ],
  },
  team: {
    key: "team",
    title: "Մեր թիմը",
    singular: "դասընթացավար",
    titleField: "name",
    subtitleField: "language",
    imageField: "photo",
    fields: [
      { name: "photo", label: "Նկար", type: "image" },
      { name: "name", label: "Անուն Ազգանուն", type: "text", required: true },
      { name: "language", label: "Լեզու", type: "text", required: true, placeholder: "Անգլերեն" },
      { name: "bio", label: "Համառոտ տեղեկություն", type: "textarea" },
    ],
  },
  courses: {
    key: "courses",
    title: "Լեզուներ / դասընթացներ",
    singular: "դասընթաց",
    titleField: "name",
    subtitleField: "description",
    imageField: "image",
    fields: [
      { name: "image", label: "Նկար կամ դրոշ", type: "image", help: "Օրինակ՝ երկրի դրոշը։ Եթե նկար չկա, ցուցադրվում է կոդը" },
      { name: "name", label: "Լեզու", type: "text", required: true },
      { name: "code", label: "Կոդ", type: "text", placeholder: "EN", help: "2–3 տառ, ցուցադրվում է քարտի վրա" },
      { name: "description", label: "Նկարագրություն", type: "textarea" },
      { name: "levels", label: "Մակարդակներ", type: "lines", help: "Յուրաքանչյուրը նոր տողում (A1, A2, ...)" },
      { name: "format", label: "Ձևաչափ", type: "text" },
      { name: "duration", label: "Տևողություն", type: "text" },
    ],
  },
  steps: {
    key: "steps",
    title: "Ինչպես է անցնում ուսուցումը",
    singular: "քայլ",
    titleField: "title",
    subtitleField: "text",
    fields: [
      { name: "title", label: "Վերնագիր", type: "text", required: true },
      { name: "text", label: "Տեքստ", type: "textarea" },
    ],
  },
  packages: {
    key: "packages",
    title: "Փաթեթներ",
    singular: "փաթեթ",
    description: "Այստեղ նկարագրեք փաթեթները (անուն, ինչ է ներառված)։ Գները լրացրեք ներքևի «Գներ» աղյուսակում. առանց գնի փաթեթը կայքում չի երևում։",
    titleField: "name",
    subtitleField: "description",
    warning: (item) => {
      const prices = (item.prices ?? {}) as Record<string, string>;
      return Object.values(prices).some((p) => String(p).trim()) ? undefined : "Գին չկա · կայքում չի երևում";
    },
    fields: [
      { name: "name", label: "Անվանում", type: "text", required: true },
      { name: "period", label: "Ժամանակահատված", type: "text", placeholder: "ամսական" },
      { name: "description", label: "Նկարագրություն", type: "text" },
      { name: "features", label: "Ինչ է ներառված", type: "lines", help: "Յուրաքանչյուրը նոր տողում" },
      { name: "highlighted", label: "Ընդգծել որպես «Լավագույն ընտրություն»", type: "checkbox" },
    ],
  },
  testimonials: {
    key: "testimonials",
    title: "Կարծիքներ",
    singular: "կարծիք",
    titleField: "name",
    subtitleField: "text",
    imageField: "photo",
    fields: [
      { name: "photo", label: "Նկար (ոչ պարտադիր)", type: "image" },
      { name: "name", label: "Անուն", type: "text", required: true },
      { name: "course", label: "Դասընթաց", type: "text" },
      { name: "text", label: "Կարծիք", type: "textarea", required: true },
      { name: "rating", label: "Գնահատական (1–5)", type: "number", min: 1, max: 5 },
    ],
  },
  promotions: {
    key: "promotions",
    title: "Ակցիաներ",
    singular: "ակցիա",
    titleField: "title",
    subtitleField: "text",
    warning: (item) => {
      const until = String(item.validUntil ?? "");
      const today = new Date().toISOString().slice(0, 10);
      return until && until < today ? "Ժամկետն անցել է · ջնջեք կամ թարմացրեք" : undefined;
    },
    fields: [
      { name: "badge", label: "Պիտակ", type: "text", placeholder: "-20%" },
      { name: "title", label: "Վերնագիր", type: "text", required: true },
      { name: "text", label: "Տեքստ", type: "textarea" },
      { name: "validUntil", label: "Գործում է մինչև", type: "date" },
    ],
  },
};

export type AdminBlock =
  | { kind: "section"; key: SectionKey }
  | { kind: "collection"; key: CollectionKey }
  | { kind: "prices" };

export type AdminPage = { slug: string; title: string; icon: string; blocks: AdminBlock[] };

export const adminPages: AdminPage[] = [
  {
    slug: "home",
    title: "Գլխավոր էջ",
    icon: "home",
    blocks: [
      { kind: "section", key: "home" },
      { kind: "collection", key: "features" },
      { kind: "section", key: "refund" },
    ],
  },
  {
    slug: "about",
    title: "Մեր մասին և թիմ",
    icon: "users",
    blocks: [
      { kind: "section", key: "about" },
      { kind: "collection", key: "team" },
    ],
  },
  {
    slug: "courses",
    title: "Դասընթացներ",
    icon: "book",
    blocks: [
      { kind: "section", key: "coursesPage" },
      { kind: "collection", key: "courses" },
      { kind: "collection", key: "packages" },
      { kind: "prices" },
      { kind: "collection", key: "steps" },
    ],
  },
  {
    slug: "kids",
    title: "Երեխաների համար",
    icon: "smile",
    blocks: [{ kind: "section", key: "kids" }],
  },
  {
    slug: "testimonials",
    title: "Կարծիքներ",
    icon: "star",
    blocks: [{ kind: "collection", key: "testimonials" }],
  },
  {
    slug: "promotions",
    title: "Ակցիաներ",
    icon: "gift",
    blocks: [
      { kind: "section", key: "promo" },
      { kind: "collection", key: "promotions" },
    ],
  },
  {
    slug: "texts",
    title: "Վերնագրեր և տեքստեր",
    icon: "edit",
    blocks: [{ kind: "section", key: "texts" }],
  },
  {
    slug: "settings",
    title: "Կոնտակտներ",
    icon: "settings",
    blocks: [{ kind: "section", key: "settings" }],
  },
];
