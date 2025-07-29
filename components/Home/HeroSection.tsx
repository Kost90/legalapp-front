'use client';

import { motion } from 'motion/react';
import Link from 'next/link';

import Button from '@/components/Button/Button';
import HeroIllustration from '@/components/HeroIlustration/HeroIlustration';
import { SiteContent } from '@/types/dictionaries';

import { containerVariants, itemVariants } from './animations';

export default function HeroSection({ dictionary, lang }: { dictionary: SiteContent; lang: string }) {
  return (
    <section className="bg-bg-body-main relative w-full">
      <motion.div
        className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 py-10 text-center sm:gap-20 sm:px-8 sm:py-24 lg:flex-row lg:text-left"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="flex max-w-xl flex-col items-center justify-center sm:items-start" variants={itemVariants}>
          <div className="flex items-center gap-4">
            <div className="bg-color-footer-link-blue-brt h-3.5 w-3.5 shrink-0 rounded-full md:h-5 md:w-5" />
            <h1 className="text-main-black text-4xl font-bold tracking-tight">{dictionary.hero.title}</h1>
          </div>
          <p className="text-muted-text my-6 text-base leading-7 sm:text-lg sm:leading-8">{dictionary.hero.subtitle_line1}</p>
          <Link href={`/${lang}/auth/login`}>
            <Button key={`login-${lang}desc`} type="black">
              {dictionary.header.button_generate}
            </Button>
          </Link>
        </motion.div>

        <motion.div className="relative w-full max-w-md lg:max-w-xl" variants={itemVariants}>
          <div
            aria-hidden="true"
            className="animate-glow absolute top-1/2 left-1/2 -z-10 h-[130%] w-[115%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-[#ffdd00] to-[#009df8] blur-lg"
          />

          <HeroIllustration className="h-auto w-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
