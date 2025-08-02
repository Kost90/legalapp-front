'use client';
import { motion } from 'framer-motion';
import { Handshake } from 'lucide-react';

import FlexSectionWrapper from '@/components/Container/FlexSectionWrapper';
import { SiteContent } from '@/types/dictionaries';

interface ITrustSectionProps {
  dictionary: SiteContent;
  lang: string;
}

export default function TrustSection({ ...props }: ITrustSectionProps) {
  return (
    <div className="bg-main-black w-full py-8">
      <FlexSectionWrapper className="mx-auto">
        <motion.div
          className="text-headerfooterwhite text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="text-2xl font-semibold sm:text-3xl">
            {props.dictionary.trustSection.title}{' '}
            <span className="text-color-footer-link-blue-brt">{props.dictionary.trustSection.bluetext}</span>,{' '}
            <span className="text-color-footer-link-green">{props.dictionary.trustSection.greentext}</span>{' '}
            {props.lang === 'ua' ? 'і' : 'and'}{' '}
            <span className="text-color-footer-link-red-brt">{props.dictionary.trustSection.redtext}</span>.
          </p>

          <p className="text-muted-text mt-6 text-lg leading-7 sm:text-xl sm:leading-8">
            {props.dictionary.trustSection.description}
            <br />
            <span className="text-headerfooterwhite flex flex-col items-center justify-center gap-2 font-medium md:flex-row">
              {props.dictionary.trustSection.descriptionStrong}
              <Handshake className="h-5 w-5" />
            </span>
          </p>
        </motion.div>
      </FlexSectionWrapper>
    </div>
  );
}
