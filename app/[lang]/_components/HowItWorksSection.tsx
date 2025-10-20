'use client';

import { motion } from 'framer-motion';
import { Download, FilePenLine, FileSearch, LucideProps } from 'lucide-react';
import { FC } from 'react';

import FlexSectionWrapper from '@/components/Container/FlexSectionWrapper';
import Heading from '@/components/Heading/Heading';
import { containerVariantsOpacity, itemVariantsUp } from '@/lib/constants/animations-variants';
import { SiteContent } from '@/types/dictionaries';

const iconMap: { [key: string]: FC<LucideProps> } = {
  FileSearch,
  FilePenLine,
  Download,
};

export default function HowItWorksSection({ dictionary }: { dictionary: SiteContent }) {
  const { title, steps } = dictionary.howItWorks;

  return (
    <FlexSectionWrapper dataSectionTheme={'light'} id="how-it-works">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="text-text-mainBlack mb-16 text-center text-3xl font-bold md:text-4xl"
      >
        {title}
      </motion.h2>

      <motion.div
        className="flex w-full flex-col items-center justify-center gap-10 md:gap-6 lg:flex-row"
        variants={containerVariantsOpacity}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {steps.map((step, index) => {
          const Icon = iconMap[step.icon] || FileSearch;
          return (
            <motion.div
              key={step.title}
              className="relative flex max-w-80 flex-col items-center justify-center text-center md:items-start md:text-left"
              variants={itemVariantsUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="bg-blue relative mb-4 flex h-16 w-16 items-center justify-center rounded-full text-white">
                <Icon size={28} />
                <div className="bg-yellow text-text-blue-dark absolute -top-2 -left-2 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold">
                  {index + 1}
                </div>
              </div>
              <Heading level="h3">{step.title}</Heading>
              <p className="text-text-greyMuted mt-2 text-base">{step.description}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </FlexSectionWrapper>
  );
}
