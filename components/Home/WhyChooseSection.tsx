'use client';

import { motion } from 'framer-motion';
import { BadgeCheck, BrainCircuit, FileText, Building2, Users, Home, Globe } from 'lucide-react';

import FlipCard from '@/components/Cards/FlipCard';
import StaticCard from '@/components/Cards/StaticCard';
import FlexSectionWrapper from '@/components/Container/FlexSectionWrapper';
import { SiteContent } from '@/types/dictionaries';

const colors = {
  yellow: '#FED773',
  blue: '#72A9FB',
  grey: '#F7F9FB',
};

const flipCardsTextColors = {
  blueBackGround: 'text-text-blue-extra-ligth',
  yellowBackGround: 'text-text-blue-dark',
};

export default function WhyChooseSection({ dictionary }: { dictionary: SiteContent }) {
  const { title, subtitle, advantages } = dictionary.why_choose_us;

  const icons = [
    <BadgeCheck key="badge" size={40} className="text-text-blue-dark" />,
    <FileText key="file" size={40} className="text-text-blue-extra-ligth" />,
    <BrainCircuit key="brain" size={40} className="text-text-main-black" />,
    <Globe key="globe" size={40} className="text-text-main-black" />,
    <Users key="users" size={40} className="text-text-blue-dark" />,
    <Building2 key="building" size={40} className="text-text-blue-extra-ligth" />,
    <Home key="home" size={40} className="text-text-main-black" />,
  ];

  const benefits = advantages.map((adv, idx) => ({
    icon: icons[idx],
    title: adv.title,
    description: adv.text,
  }));

  return (
    <FlexSectionWrapper id="why-udocument">
      <div className="mb-16 text-center">
        <h2 className="text-text-main-black text-3xl font-bold md:text-4xl">{title}</h2>
        {subtitle && <p className="text-text-grey-muted mt-2 text-lg">{subtitle}</p>}
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="flex gap-4">
            <FlipCard {...benefits[0]} bgColor={colors.yellow} textColor={flipCardsTextColors.yellowBackGround} small delay={0} />
            <FlipCard {...benefits[1]} bgColor={colors.blue} textColor={flipCardsTextColors.blueBackGround} small delay={0.15} />
          </div>
          <div className="flex-1">
            <StaticCard {...benefits[2]} bgColor={colors.grey} />
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="flex-1">
            <StaticCard {...benefits[3]} />
          </div>
          <div className="flex gap-4">
            <FlipCard {...benefits[4]} bgColor={colors.yellow} textColor={flipCardsTextColors.yellowBackGround} small delay={0} />
            <FlipCard {...benefits[5]} bgColor={colors.blue} textColor={flipCardsTextColors.blueBackGround} small delay={0.15} />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <StaticCard {...benefits[6]} bgColor={colors.grey} />
        </motion.div>
      </div>
    </FlexSectionWrapper>
  );
}
