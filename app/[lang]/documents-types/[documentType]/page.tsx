import { CheckCircle2, Clock } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link'; // 👈 ДОДАНО: Потрібно для relatedDocs

import { getDictionary } from '@/app/[lang]/dictionaries';
import FaqAccordion from '@/components/FaqAccordion/FaqAccordion';
import Heading from '@/components/Heading/Heading';
import LinkButton from '@/components/ui/LinkButton/LinkButton';
import { DOCUMENT_TYPE_FOR_LINK } from '@/lib/constants/common-documents';
import { AllowedDocumentsTypes, documentsImagesMap } from '@/lib/imageMap';
import { SiteContent } from '@/types/dictionaries';

import { PageProps } from '@/.next/types/app/[lang]/documents-types/[documentType]/page';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, documentType } = await params;
  const dictionary: SiteContent = await getDictionary(lang);

  if (!dictionary.documentPages[documentType as DOCUMENT_TYPE_FOR_LINK]) {
    return { title: 'Документ не знайдено' };
  }

  const pageContent = dictionary.documentPages[documentType as DOCUMENT_TYPE_FOR_LINK];
  const staticImage = documentsImagesMap[documentType as AllowedDocumentsTypes];

  return {
    title: pageContent.metaTitle,
    description: pageContent.metaDescription,
    openGraph: {
      title: pageContent.metaTitle,
      description: pageContent.metaDescription,
      images: [
        {
          url: `${baseUrl}${staticImage.src}`,
          width: 1200,
          height: 630,
          alt: pageContent.metaTitle,
        },
      ],
    },
    alternates: {
      canonical: `${baseUrl}/${lang}/documents-types/${documentType}`,
      languages: {
        'uk-UA': `${baseUrl}/ua/documents-types/${documentType}`,
        'en-GB': `${baseUrl}/en/documents-types/${documentType}`,
        'x-default': `${baseUrl}/ua/documents-types/${documentType}`,
      },
    },
  };
}

export default async function DocumentPage({ params }: PageProps) {
  const { lang, documentType } = await params;
  const dictionary: SiteContent = await getDictionary(lang);

  if (!dictionary.documentPages[documentType as DOCUMENT_TYPE_FOR_LINK]) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-2xl">Документ не знайдено</h1>
      </div>
    );
  }

  const content = dictionary.documentPages[documentType as AllowedDocumentsTypes];
  const staticImage = documentsImagesMap[documentType as AllowedDocumentsTypes];

  const pageUrl = `${baseUrl}/${lang}/documents-types/${documentType}`;

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: content.h1,
        description: content.description,
        image: `${baseUrl}${staticImage.src}`,
        serviceType: 'LegalService',
        provider: {
          '@type': 'Organization',
          name: 'UDocument',
          url: baseUrl,
        },
        brand: {
          '@type': 'Brand',
          name: 'UDocument',
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'UAH',
          url: pageUrl,
          availability: 'https://schema.org/OnlineOnly',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: content.faqItems.map((item: { question: string; answer: string }) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: lang === 'ua' ? 'Головна' : 'Home',
            item: `${baseUrl}/${lang}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: content.h1,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <div className="mx-auto w-full max-w-7xl px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
          <article className="lg:col-span-2">
            <Heading level="h1">{content.h1}</Heading>
            <p className="text-text-greyMuted mt-4 text-lg">{content.description}</p>

            <section className="mt-8" aria-labelledby="when-needed-title">
              <Heading level="h3" id="when-needed-title">
                {content.whenNeededTitle}
              </Heading>
              <ul className="mt-4 space-y-3">
                {content.whenNeededList.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="text-blue mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                    <span className="text-text-greyMuted">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {content.requiredDocsTitle && content.requiredDocsList && (
              <section className="mt-8" aria-labelledby="required-docs-title">
                <Heading level="h3" id="required-docs-title">
                  {content.requiredDocsTitle}
                </Heading>
                <ul className="mt-4 space-y-3">
                  {content.requiredDocsList.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="text-blue mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                      <span className="text-text-greyMuted">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <FaqAccordion title={content.faqTitle} items={content.faqItems} />

            {content.relatedDocs && content.relatedDocs.length > 0 && (
              <section className="mt-12" aria-labelledby="related-docs-title">
                <Heading level="h3" id="related-docs-title">
                  {lang === 'ua' ? 'Схожі документи' : 'Related Documents'}
                </Heading>
                <ul className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {content.relatedDocs.map((docKey) => {
                    const relatedDoc = dictionary.documentPages[docKey as AllowedDocumentsTypes];
                    if (!relatedDoc) return null;

                    const relatedDocUrl = `/${lang}/documents-types/${docKey}`;

                    return (
                      <li key={docKey} className="rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md">
                        <Link href={relatedDocUrl} className="group">
                          <h4 className="text-blue text-lg font-semibold group-hover:underline">{relatedDoc.h1}</h4>
                          <p className="text-text-greyMuted mt-1 line-clamp-2">{relatedDoc.description}</p>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}
          </article>
          <aside className="lg:col-span-1">
            <div className="bg-background-mutedcard sticky top-24 rounded-lg p-6 shadow-md">
              <Heading level="h3">{content.priceDetailsTitle}</Heading>

              <div className="my-4 text-center">
                <span className="text-blue text-5xl font-bold line-through">{content.price}</span>
                <span className="text-blue ml-1 text-xl font-semibold">{content.priceCurrency}</span>
                <p className="text-text-greyMuted mt-4 text-lg font-semibold">{lang === 'ua' ? 'Безкоштовно' : 'Free'}</p>
              </div>

              <div className="text-text-greyMuted mb-6 flex items-center justify-center">
                <Clock size={18} className="mr-2" />
                <span>{content.avgTime}</span>
              </div>

              <div className="flex items-center justify-center">
                <LinkButton href={`/${lang}/generate`} lang={lang} type="default">
                  {content.ctaButtonText}
                </LinkButton>
              </div>

              <div className="mt-8">
                <Heading level="h4">{content.sampleTitle}</Heading>
                <div className="border-border-borderGrey relative mt-2 h-64 w-full overflow-hidden rounded-md border">
                  <Image
                    src={staticImage}
                    alt={`Зразок документа: ${content.h1}`}
                    title={content.h1}
                    fill
                    className="object-cover object-top"
                    quality={80}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white"></div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
