import { DOCUMENT_TYPE, DOCUMENT_TYPE_FOR_LINK } from '@/lib/constants/common-documents';

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
  title: string;
  description: string;
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

interface HeaderData {
  login: string;
  logout: string;
  dashboard: string;
  nav_contacts: string;
  button_generate: string;
  button_consultation: string;
  nav_main: string;
  nav_about_us: string;
  nav_services_page: string;
  nav_contact_us_page: string;
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

interface IFooterData {
  contacts_heading: string;
  email: string;
  phone: string;
  legal_heading: string;
  privacy_policy: string;
  follow_us_heading: string;
  follow_us_text: string;
  copyright: string;
}

interface IContactPromptData {
  title: string;
  subtitle: string;
  signup_cta: string;
  phone_cta: string;
  email_cta: string;
}

interface IPrivacyPolicy {
  meta_title: string;
  meta_description: string;
  title: string;
  last_updated: string;
  introduction_title: string;
  introduction_text: string;
  data_collection_title: string;
  data_collection_text: string;
  data_collection_list: string[];
  data_usage_title: string;
  data_usage_text: string;
  data_usage_list: string[];
  data_commitment_title: string;
  data_commitment_text: string;
  data_protection_title: string;
  data_protection_text: string;
  user_rights_title: string;
  user_rights_text: string;
  user_rights_list: string[];
  cookies_title: string;
  cookies_text: string;
  changes_title: string;
  changes_text: string;
  contact_us_title: string;
  contact_us_text: string;
  contact_us_email: string;
}

interface IPopularDocument {
  title: string;
  description: string;
  tag: string;
  icon: string;
  url: DOCUMENT_TYPE;
}

interface IPopularDocumentsSection {
  title: string;
  subtitle: string;
  documents: IPopularDocument[];
}

interface IDocumentFaqItem {
  question: string;
  answer: string;
}

interface IDocumentPageContent {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  description: string;
  whenNeededTitle: string;
  whenNeededList: string[];
  faqTitle: string;
  faqItems: IDocumentFaqItem[];
  priceDetailsTitle: string;
  price: string;
  priceCurrency: string;
  avgTime: string;
  ctaButtonText: string;
  sampleTitle: string;
  sampleImageUrl: string;
}

type DocumentPages = {
  [key in DOCUMENT_TYPE_FOR_LINK]: IDocumentPageContent;
};

interface IHowItWorksStep {
  icon: string;
  title: string;
  description: string;
}

interface IHowItWorksSection {
  title: string;
  steps: IHowItWorksStep[];
}

interface IServiceAdvantage {
  icon: string;
  title: string;
  description: string;
}

interface IServiceAdvantagesSection {
  title: string;
  advantages: IServiceAdvantage[];
}

export interface SiteContent {
  header: HeaderData;
  verify_email: IVerifyEmail;
  hero: HeroData;
  popularDocuments: IPopularDocumentsSection;
  trustSection: TrustSectionData;
  howItWorks: IHowItWorksSection;
  ourBenefitsSection: OurBenefitsSection;
  why_choose_us: WhyChooseUsData;
  serviceAdvantages: IServiceAdvantagesSection;
  faq: IFaq[];
  legal_support: LegalSupportData;
  real_estate_services: RealEstateServicesData;
  online_generation: OnlineGenerationData;
  meta: MetaData;
  contactPrompt: IContactPromptData;
  footer: IFooterData;
  privacy_policy: IPrivacyPolicy;
  documentPages: DocumentPages;
}
