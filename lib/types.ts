export type Settings = {
  phone: string;
  phone2: string;
  email: string;
  address: string;
  hours: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  linkedin: string;
  mapUrl: string;
};

export type HomeSection = {
  badge: string;
  title: string;
  highlight: string;
  subtitle: string;
  students: string;
  teachers: string;
  languages: string;
};

export type RefundSection = {
  enabled: boolean;
  title: string;
  amount: string;
  text: string;
  note: string;
};

export type AboutSection = {
  title: string;
  intro: string;
  body: string;
  mission: string;
  accreditation: string;
};

export type CoursesSection = {
  intro: string;
  howTitle: string;
  howText: string;
  pricingTitle: string;
  pricingText: string;
};

export type KidsSection = {
  enabled: boolean;
  ages: string;
  title: string;
  intro: string;
  question: string;
  outcomes: string[];
  skills: string[];
  motivation: string;
  steps: string[];
  offer: string;
};

export type TextsSection = {
  heroPoints: string[];
  whyTitle: string;
  whyText: string;
  coursesTitle: string;
  coursesText: string;
  testimonialsTitle: string;
  testimonialsText: string;
  ctaTitle: string;
  ctaText: string;
  coursesHeroTitle: string;
  teamTitle: string;
  teamText: string;
  contactTitle: string;
  contactText: string;
  footerText: string;
  kidsQuoteCaption: string;
  kidsSkillsTitle: string;
  kidsStepsTitle: string;
};

export type PromoSection = {
  enabled: boolean;
  title: string;
  text: string;
};

export type Feature = { id: string; icon: string; title: string; text: string };

export type Teacher = {
  id: string;
  name: string;
  language: string;
  bio: string;
  photo: string;
};

export type Course = {
  id: string;
  name: string;
  code: string;
  description: string;
  levels: string[];
  format: string;
  duration: string;
  image: string;
};

export type Step = { id: string; title: string; text: string };

export type Package = {
  id: string;
  name: string;
  prices: Record<string, string>;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
};

export type Testimonial = {
  id: string;
  name: string;
  course: string;
  text: string;
  rating: number;
  photo: string;
};

export type Promotion = {
  id: string;
  title: string;
  text: string;
  badge: string;
  validUntil: string;
};

export type Message = {
  id: string;
  name: string;
  phone: string;
  course: string;
  topic: string;
  message: string;
  createdAt: string;
  read: boolean;
};

export type Sections = {
  settings: Settings;
  home: HomeSection;
  refund: RefundSection;
  about: AboutSection;
  coursesPage: CoursesSection;
  kids: KidsSection;
  texts: TextsSection;
  promo: PromoSection;
};

export type Collections = {
  features: Feature[];
  team: Teacher[];
  courses: Course[];
  steps: Step[];
  packages: Package[];
  testimonials: Testimonial[];
  promotions: Promotion[];
};

export type SectionKey = keyof Sections;
export type CollectionKey = keyof Collections;

export type Content = Sections & Collections;
