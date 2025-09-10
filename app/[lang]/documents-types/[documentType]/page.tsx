import { CheckCircle2, Clock } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';

import { getDictionary } from '@/app/[lang]/dictionaries';
import FaqAccordion from '@/components/FaqAccordion/FaqAccordion';
import Heading from '@/components/Heading/Heading';
import LinkButton from '@/components/LinkButton/LinkButton';
import { DOCUMENT_TYPE_FOR_LINK } from '@/lib/constants/common-documents';
import { AllowedDocumentsTypes, documentsImagesMap } from '@/lib/imageMap';
import { SiteContent } from '@/types/dictionaries';

import { PageProps } from '@/.next/types/app/[lang]/documents-types/[documentType]/page';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, documentType } = await params;
  const dictionary: SiteContent = await getDictionary(lang);

  if (!dictionary.documentPages[documentType as DOCUMENT_TYPE_FOR_LINK]) {
    return { title: 'Документ не знайдено' };
  }

  const pageContent = dictionary.documentPages[documentType as DOCUMENT_TYPE_FOR_LINK];

  return {
    title: pageContent.metaTitle,
    description: pageContent.metaDescription,
    openGraph: {
      title: pageContent.metaTitle,
      description: pageContent.metaDescription,
    },
  };
}

export default async function DocumentPage({ params }: PageProps) {
  const { lang, documentType } = await params;
  const dictionary: SiteContent = await getDictionary(lang);

  if (!dictionary.documentPages[documentType as DOCUMENT_TYPE_FOR_LINK]) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-2xl">404 - Документ не знайдено</h1>
      </div>
    );
  }

  const content = dictionary.documentPages[documentType as AllowedDocumentsTypes];
  const staticImage = documentsImagesMap[documentType as AllowedDocumentsTypes];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 md:py-16">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
        <div className="lg:col-span-2">
          <Heading level="h1">{content.h1}</Heading>
          <p className="text-text-greyMuted mt-4 text-lg">{content.description}</p>

          <div className="mt-8">
            <Heading level="h3">{content.whenNeededTitle}</Heading>
            <ul className="mt-4 space-y-3">
              {content.whenNeededList.map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="text-blue mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                  <span className="text-text-greyMuted">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <FaqAccordion title={content.faqTitle} items={content.faqItems} />
        </div>

        <div className="lg:col-span-1">
          <div className="bg-background-mutedcard sticky top-24 rounded-lg p-6 shadow-md">
            <Heading level="h3">{content.priceDetailsTitle}</Heading>

            <div className="my-4 text-center">
              <span className="text-blue text-5xl font-bold">{content.price}</span>
              <span className="text-blue ml-1 text-xl font-semibold">{content.priceCurrency}</span>
            </div>

            <div className="text-text-greyMuted mb-6 flex items-center justify-center">
              <Clock size={18} className="mr-2" />
              <span>{content.avgTime}</span>
            </div>

            <div className="flex items-center justify-center">
              <LinkButton lang={lang} type="default">
                {content.ctaButtonText}
              </LinkButton>
            </div>

            <div className="mt-8">
              <Heading level="h4">{content.sampleTitle}</Heading>
              <div className="border-border-borderGrey relative mt-2 h-64 w-full overflow-hidden rounded-md border">
                <Image src={staticImage} alt={`Зразок документа: ${content.h1}`} fill className="object-cover object-top" quality={80} />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
