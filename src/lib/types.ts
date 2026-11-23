export type IconName =
  | "apple"
  | "cap"
  | "people"
  | "heart"
  | "utensils"
  | "chef"
  | "briefcase"
  | "leaf"
  | "recycle"
  | "hands"
  | "handshake"
  | "water";

export type Link = { label: string; href: string };

export type Hero = {
  title: string;
  highlight: string;
  body: string;
  image: string;
  imageAlt: string;
  /** Which part of the photo to keep visible when it is cropped. */
  imagePosition?: "top" | "center" | "bottom";
};

export type SiteSettings = {
  name: string;
  logoTagline: string;
  addressLine1: string;
  addressLine2: string;
  mapUrl: string;
  phone: string;
  email: string;
  website: string;
  hoursLabel: string;
  hours: string;
  hoursDetail: string;
  footerTagline: string;
  footerAbout: string;
  footerBottomLeft: string;
  footerBottomRight: string;
  donateLabel: string;
  donateUrl: string;
  orderUrl: string;
  footerLinks: Link[];
  social: { platform: "facebook" | "instagram" | "youtube" | "linkedin" | "x"; url: string }[];
  seoDescription: string;
};

export type Feature = { icon: IconName; title: string; text: string };

export type HomeContent = {
  hero: Hero & { primaryCta: Link; secondaryCta: Link };
  features: Feature[];
};

export type AboutContent = {
  hero: Hero;
  mission: { title: string; body: string; image: string; imageAlt: string; cta: Link };
  story: { title: string; paragraphs: { text: string }[] };
  facts: { value: string; label: string }[];
};

export type ProgramCard = {
  icon: IconName;
  color: "orange" | "green" | "teal";
  image: string;
  imageAlt: string;
  title: string;
  text: string;
  link: Link;
};

export type ProgramsContent = {
  hero: Hero;
  cards: ProgramCard[];
};

export type InvolvedCard = {
  id: string;
  icon: IconName;
  color: "orange" | "green" | "teal";
  title: string;
  text: string;
  link: Link;
};

export type GetInvolvedContent = {
  hero: Hero;
  cards: InvolvedCard[];
};

export type EventItem = {
  title: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string;
  location: string;
  category: string;
  description: string;
  image: string;
  published: boolean;
};

export type EventsContent = {
  hero: Hero;
  categories: { name: string }[];
  emptyTitle: string;
  emptyText: string;
  items: EventItem[];
};

export type ContactContent = {
  hero: Hero;
  visitTitle: string;
  callTitle: string;
  emailTitle: string;
  formSuccess: string;
};

export type SiteContent = {
  site: SiteSettings;
  home: HomeContent;
  about: AboutContent;
  programs: ProgramsContent;
  getInvolved: GetInvolvedContent;
  events: EventsContent;
  contact: ContactContent;
};

export type SectionKey = keyof SiteContent;
