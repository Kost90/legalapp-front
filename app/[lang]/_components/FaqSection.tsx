'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

import FlexSectionWrapper from '@/components/Container/FlexSectionWrapper';
import { SiteContent } from '@/types/dictionaries';

export default function FAQSection({ dictionary, lang }: { dictionary: SiteContent; lang: string }) {
  const { faq } = dictionary;

  return (
    <FlexSectionWrapper dataSectionTheme={'dark'} id="faq">
      <div className="container mx-auto max-w-4xl px-4">
        <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 md:text-4xl">
          {lang === 'ua' ? (
            <>
              Як створити документ: <span className="text-orange">5 простих кроків</span>
            </>
          ) : (
            <>
              How to Create a Document: <span className="text-orange">5 Simple Steps</span>
            </>
          )}
        </h2>

        <div className="space-y-6">
          {faq.map((el, idx) => (
            <div key={`${faq}${idx}`}>
              <motion.div
                key={el.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.15 }}
                className="bg-background-grey-extra-ligth flex flex-col items-center rounded-lg border border-gray-200 p-5 shadow-lg"
              >
                <h3 className="text-text-main-black text-center text-lg font-semibold">{el.title}</h3>
                <p className="text-text-grey mt-2 text-justify">{el.description}</p>
              </motion.div>
              {idx !== faq.length - 1 && <ChevronDown size={32} className="text-orange mx-auto mt-5 animate-bounce" aria-hidden="true" />}
            </div>
          ))}
        </div>
      </div>
    </FlexSectionWrapper>
  );
}
