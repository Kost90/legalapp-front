'use client';

import { motion } from 'framer-motion';
import { CalendarCheck2, CheckCircle2, PiggyBank, ShieldCheck, Smartphone, type LucideProps } from 'lucide-react';
import { FC } from 'react';

import FlexSectionWrapper from '@/components/Container/FlexSectionWrapper';
import Heading from '@/components/Heading/Heading';
import { itemVariantsLeft } from '@/lib/constants/animations-variants';
import { SiteContent } from '@/types/dictionaries';

const iconMap: { [key: string]: FC<LucideProps> } = {
  CalendarCheck2,
  PiggyBank,
  ShieldCheck,
  Smartphone,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function ServiceAdvantagesSection({ dictionary }: { dictionary: SiteContent }) {
  const { title, advantages } = dictionary.serviceAdvantages;

  return (
    <FlexSectionWrapper dataSectionTheme={'light'} id="service-advantages">
      <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          <Heading level="h2">{title}</Heading>
        </motion.div>

        <motion.ul
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {advantages.map((advantage) => {
            const Icon = iconMap[advantage.icon] || CheckCircle2;
            return (
              <motion.li
                key={advantage.title}
                className="flex items-start"
                transition={{
                  duration: 0.5,
                  ease: 'easeOut',
                }}
                variants={itemVariantsLeft}
              >
                <div className="mr-4 flex-shrink-0">
                  <Icon className="text-blue h-7 w-7" />
                </div>
                <div>
                  <Heading level="h3">{advantage.title}</Heading>
                  <p className="text-text-greyMuted mt-1">{advantage.description}</p>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </FlexSectionWrapper>
  );
}
