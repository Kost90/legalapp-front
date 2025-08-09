interface IVerifyEmail {
  title: string;
  subtitle: string;
  instructions: string;
  back_button: string;
}

interface HeroData {
  title: string;
  titleBluePArt: string;
  subtitle_line1: string;
}

interface TrustSectionData {
  title: string;
  bluetext: string;
  greentext: string;
  redtext: string;
  description: string;
  descriptionStrong: string;
}

export interface OurBenefitsSection {
  titel: string;
  features: {
    lawDef: string;
    structure: string;
    contracts: string;
    notaryServices: string;
  };
}

interface AdvantageItem {
  title: string;
  text: string;
}

interface WhyChooseUsData {
  title: string;
  subtitle?: string;
  advantages: AdvantageItem[];
}

interface IFaq {
  question: string;
  answer: string;
}

interface LegalSupportServiceItem {
  name: string;
  desc: string;
  cta?: string;
}

interface LegalSupportData {
  title: string;
  intro_text: string;
  services_heading: string;
  services: LegalSupportServiceItem[];
}

interface RealEstateServiceItem {
  name: string;
  desc: string;
}

interface RealEstateServicesData {
  title: string;
  intro_text: string;
  services_heading: string;
  services: RealEstateServiceItem[];
  cta_button: string;
}

interface GeneratorAdvantageItem {
  highlight: string;
  text: string;
}

interface ComingSoonTemplateItem {
  name: string;
}

interface OnlineGenerationData {
  title: string;
  how_it_works_title: string;
  how_it_works_text: string;
  generator_advantages_title: string;
  generator_advantages: GeneratorAdvantageItem[];
  coming_soon_title: string;
  coming_soon_templates: ComingSoonTemplateItem[];
  strong_cta_button: string;
}

// --- Оновлені та нові інтерфейси ---
interface HeaderData {
  login: string;
  logout: string;
  dashboard: string;
  nav_contacts: string;
  button_generate: string;
  button_consultation: string;
  // Ключі для навігаційних посилань
  nav_main: string;
  nav_about_us: string;
  nav_services_page: string;
  nav_contact_us_page: string; // Для пункту меню, що веде на сторінку контактів
  // Ключі для ARIA атрибутів та sr-only текстів (опціонально, але рекомендовано)
  aria_close_menu?: string;
  aria_open_menu?: string;
  sr_close_menu?: string;
  sr_open_menu?: string;
}

interface MetaData {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  twitterTitle?: string;
  twitterDescription?: string;
  appleWebAppTitle?: string;
}

export interface SiteContent {
  header: HeaderData;
  verify_email: IVerifyEmail;
  hero: HeroData;
  trustSection: TrustSectionData;
  ourBenefitsSection: OurBenefitsSection;
  why_choose_us: WhyChooseUsData;
  faq: IFaq[];
  legal_support: LegalSupportData;
  real_estate_services: RealEstateServicesData;
  online_generation: OnlineGenerationData;
  meta: MetaData;
}
