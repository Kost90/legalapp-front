'use client';

import { motion } from 'motion/react';

import FlexSectionWrapper from '@/components/Container/FlexSectionWrapper';
import HeroIllustration from '@/components/HeroIlustration/HeroIlustration';
import LinkButton from '@/components/LinkButton/LinkButton';
import { SiteContent } from '@/types/dictionaries';

import { containerVariants, itemVariants } from './animations';

export default function HeroSection({ dictionary, lang }: { dictionary: SiteContent; lang: string }) {
  return (
    <FlexSectionWrapper className="relative mt-16 md:mt-40">
      <motion.div
        className="mx-auto flex flex-col items-center gap-12 text-center sm:gap-20 lg:flex-row lg:text-left"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="flex flex-col items-center justify-center sm:items-start" variants={itemVariants}>
          <div className="flex items-center gap-4">
            <div className="bg-color-footer-link-blue-brt hidden h-3.5 w-3.5 shrink-0 rounded-full md:block md:h-5 md:w-5" />
            <h1 className="text-main-black text-4xl font-bold tracking-tight">{dictionary.hero.title}</h1>
          </div>
          <p className="text-muted-text my-6 text-base leading-7 sm:text-lg sm:leading-8">{dictionary.hero.subtitle_line1}</p>
          <LinkButton lang={lang} type="black">
            {dictionary.header.button_generate}
          </LinkButton>
        </motion.div>

        <motion.div className="relative w-full max-w-md lg:max-w-xl" variants={itemVariants}>
          <div
            aria-hidden="true"
            className="animate-glow absolute top-1/2 left-1/2 -z-10 h-[130%] w-[115%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-[#ffdd00] to-[#009df8] blur-lg"
          />

          <HeroIllustration className="h-auto w-full" />
        </motion.div>
      </motion.div>
    </FlexSectionWrapper>
  );
}
