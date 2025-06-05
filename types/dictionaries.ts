// --- Існуючі інтерфейси (без змін, якщо вони вас влаштовують) ---
interface BenefitItem {
  text: string;
}

interface HeroData {
  title: string;
  subtitle_line1: string;
  feature_highlight: string; // Містить HTML (<strong>)
  benefits_intro: string;
  benefits: BenefitItem[];
  closing_statement: string;
  cta_button: string;
}

interface AdvantageItem {
  title: string;
  text: string;
}

interface WhyChooseUsData {
  title: string;
  advantages: AdvantageItem[];
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
  nav_contacts: string; // Загальний контакт або кнопка, не пункт меню сторінки "Контакти"
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
  keywords: string; // Або string[] якщо ви вирішите зберігати як масив
  ogTitle: string;
  ogDescription: string;
  twitterTitle?: string; // Може бути опціональним, якщо використовується fallback
  twitterDescription?: string; // Може бути опціональним
  appleWebAppTitle?: string; // Може бути опціональним
}

// Головний інтерфейс, що описує всю структуру JSON
export interface SiteContent {
  header: HeaderData;
  hero: HeroData;
  why_choose_us: WhyChooseUsData;
  legal_support: LegalSupportData;
  real_estate_services: RealEstateServicesData;
  online_generation: OnlineGenerationData;
  meta: MetaData; // Додано нову секцію meta
}
