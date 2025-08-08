'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

import FlexSectionWrapper from '@/components/Container/FlexSectionWrapper';
import PhoneIlustration from '@/public/phone_generation_ilustration_grey.png';
import { SiteContent } from '@/types/dictionaries';

import { phoneVariants, textBlockVariants } from './animations';
import FeatureList from './FeatureList';

interface IOurBenefitsSection {
  dictionary: SiteContent;
  lang: string;
}

function OurBenefitsSection({ dictionary }: IOurBenefitsSection) {
  return (
    <FlexSectionWrapper className="mx-auto">
      <div className="flex w-full flex-col items-center justify-center gap-32 md:flex-row">
        <motion.div
          className="relative flex w-full max-w-[500px] flex-1 shrink-0 justify-center"
          variants={phoneVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Image
            src={PhoneIlustration}
            alt="phone_ilustration_legal_generation_picture"
            className="max-h-[560px] w-full object-contain"
            width={500}
            height={560}
            priority
          />
        </motion.div>

        <motion.div
          className="bg-background-grey-extra-ligth shadow-custom-soft flex w-full max-w-[500px] flex-1 flex-col items-center gap-5 rounded-lg p-5 md:items-start"
          variants={textBlockVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-text-main-black text-2xl font-bold tracking-tight">{dictionary.ourBenefitsSection.titel}</h3>
          <FeatureList dictionary={dictionary.ourBenefitsSection} />
        </motion.div>
      </div>
    </FlexSectionWrapper>
  );
}

export default OurBenefitsSection;
