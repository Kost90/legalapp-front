import { Metadata } from 'next';

import ContactPromptSection from '@/app/[lang]/_components/ContactPromptSection';
import HeroSection from '@/app/[lang]/_components/HeroSection';
import HowItWorksSection from '@/app/[lang]/_components/HowItWorksSection';
import PopularDocumentsSection from '@/app/[lang]/_components/PopularDocumentsSection';
import ServiceAdvantagesSection from '@/app/[lang]/_components/ServiceAdvantagesSection';
import TrustSection from '@/app/[lang]/_components/TrustSection';
import PageContainer from '@/components/Container/PageContainer';
import { SiteContent } from '@/types/dictionaries';

import { getDictionary } from './dictionaries';

import { PageProps } from '@/.next/types/app/[lang]/page';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const meta = dictionary.meta;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords || ['юридичні документи онлайн', 'генератор документів', 'зразок довіренності', 'консультація юриста'],

    openGraph: {
      title: meta.ogTitle,
      description: meta.ogDescription,
      // images: [
      //   {
      //     url: `${baseUrl}/og-image-home.png`,
      //     width: 1200,
      //     height: 630,
      //     alt: meta.ogTitle,
      //   },
      // ],
    },
  };
}

export default async function Home({ params }: PageProps) {
  const { lang } = await params;
  const dictionary: SiteContent = await getDictionary(lang);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        mainEntity: dictionary.faq.map((item) => ({
          '@type': 'Question',
          name: item.title,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.description,
          },
        })),
      },
      {
        '@type': 'ItemList',
        name: dictionary.popularDocuments.title,
        description: dictionary.popularDocuments.subtitle,
        itemListElement: dictionary.popularDocuments.documents.map((doc, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Service',
            name: doc.title,
            description: doc.description,
            url: `${baseUrl}/${lang}/documents-types/${doc.url}`,
          },
        })),
      },
    ],
  };

  return (
    <PageContainer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HeroSection dictionary={dictionary} lang={lang} />
      <PopularDocumentsSection dictionary={dictionary} lang={lang} />
      <TrustSection dictionary={dictionary} lang={lang} />
      <HowItWorksSection dictionary={dictionary} />
      <ServiceAdvantagesSection dictionary={dictionary} />
      <ContactPromptSection dictionary={dictionary} lang={lang} />
    </PageContainer>
  );
}
