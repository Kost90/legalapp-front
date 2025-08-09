'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useMemo } from 'react';

import FlexSectionWrapper from '@/components/Container/FlexSectionWrapper';
import { SiteContent } from '@/types/dictionaries';

export default function FAQSection({ dictionary, lang }: { dictionary: SiteContent; lang: string }) {
  const { faq } = dictionary;
  // Генерируем JSON-LD для SEO
  const faqSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((el) => ({
        '@type': 'Question',
        name: el.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: el.answer,
        },
      })),
    }),
    [faq],
  );

  return (
    <FlexSectionWrapper id="faq">
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>

      <div className="container mx-auto max-w-4xl px-4">
        <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 md:text-4xl">
          {lang === 'ua' ? (
            <>
              Як працює <span className="text-orange">генерація документів</span>?
            </>
          ) : (
            <>
              How <span className="text-orange">document generation</span> workin?
            </>
          )}
        </h2>

        <div className="space-y-6">
          {faq.map((el, idx) => (
            <div key={`${faq}${idx}`}>
              <motion.div
                key={el.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.15 }}
                className="bg-background-grey-extra-ligth flex flex-col items-center rounded-lg border border-gray-200 p-5 shadow-lg"
              >
                <h3 className="text-text-main-black text-lg font-semibold">{el.question}</h3>
                <p className="text-text-grey mt-2 text-justify">{el.answer}</p>
              </motion.div>
              {idx !== faq.length - 1 && <ChevronDown size={32} className="text-orange mx-auto mt-5 animate-bounce" aria-hidden="true" />}
            </div>
          ))}
        </div>
      </div>
    </FlexSectionWrapper>
  );
}
