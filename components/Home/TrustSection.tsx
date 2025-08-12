'use client';
import { motion } from 'framer-motion';
import { Handshake } from 'lucide-react';

import FlexSectionWrapper from '@/components/Container/FlexSectionWrapper';
import { SiteContent } from '@/types/dictionaries';

import { itemVariants } from './animations';

interface ITrustSectionProps {
  dictionary: SiteContent;
  lang: string;
}

export default function TrustSection({ ...props }: ITrustSectionProps) {
  return (
    <div className="bg-main-black w-full rounded-xl py-10">
      <FlexSectionWrapper className="mx-auto">
        <motion.div
          className="text-headerfooterwhite text-center"
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="text-2xl font-semibold sm:text-3xl">
            {props.dictionary.trustSection.title} <span className="text-blue">{props.dictionary.trustSection.bluetext}</span>,{' '}
            <span className="text-color-footer-link-green">{props.dictionary.trustSection.greentext}</span>{' '}
            {props.lang === 'ua' ? 'і' : 'and'} <span className="text-orange">{props.dictionary.trustSection.redtext}</span>.
          </p>

          <p className="text-text-grey mt-6 text-lg leading-7 sm:text-xl sm:leading-8">
            {props.dictionary.trustSection.description}
            <br />
            <span className="flex flex-col items-center justify-center gap-2 font-medium text-white md:flex-row">
              {props.dictionary.trustSection.descriptionStrong}
              <Handshake className="text-yellow h-5 w-5" />
            </span>
          </p>
        </motion.div>
      </FlexSectionWrapper>
    </div>
  );
}
