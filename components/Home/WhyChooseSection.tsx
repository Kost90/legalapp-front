'use client';

import { motion } from 'framer-motion';
import { BadgeCheck, BrainCircuit, FileText, Building2, Users, Home, Globe } from 'lucide-react';
import { ReactNode } from 'react';

import FlexSectionWrapper from '@/components/Container/FlexSectionWrapper';

const benefits = [
  {
    icon: <BadgeCheck size={40} />,
    title: 'Досвід + Інновації ШІ',
    description: '8+ років практики та технології штучного інтелекту для швидких та безпечних рішень.',
  },
  {
    icon: <FileText size={40} />,
    title: 'Точна онлайн-генерація документів',
    description: 'Юридично правильні документи онлайн. Створено юристами, адаптовано ШІ відповідно до українського законодавства.',
  },
  {
    icon: <BrainCircuit size={40} />,
    title: 'Комплексний підхід',
    description: 'Правова підтримка: нерухомість, договори, компанії, сервіси у Великій Британії.',
  },
  {
    icon: <Globe size={40} />,
    title: 'Працюємо онлайн по всій Україні',
    description: 'Доступність і зручність для фізичних та юридичних осіб.',
  },
  { icon: <Users size={40} />, title: 'Індивідуальний підхід', description: 'Ваш запит — наше унікальне рішення.' },
  {
    icon: <Building2 size={40} />,
    title: 'Юридичний супровід для бізнесу',
    description: 'Всі юридичні потреби в одному місці: консультації, документи, супровід.',
  },
  {
    icon: <Home size={40} />,
    title: 'Послуги у сфері нерухомості',
    description: 'Оформлення, супровід, перевірка — повний цикл для житлової й комерційної нерухомості.',
  },
];

const yellowLighter = '#FED773';
const blueLighter = '#72A9FB';
const greyExtraLigth = '#F7F9FB';

type CardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  bgColor?: string;
  small?: boolean;
  delay?: number;
};

const FlipCard = ({ icon, title, description, bgColor, small, delay = 0 }: CardProps) => {
  const flipVariants = {
    initial: { rotateY: 0 },
    hover: { rotateY: 180, transition: { duration: 0.6, ease: 'easeInOut' } },
  };

  const appearVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, delay, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      className={`[perspective:1000px] ${small ? 'h-[215px] w-[205px]' : 'w-full'} flex-shrink-0 cursor-pointer`}
      variants={appearVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div
        className="relative h-full w-full rounded-xl [transform-style:preserve-3d]"
        variants={flipVariants}
        initial="initial"
        whileHover="hover"
      >
        <div
          className="absolute flex h-full w-full flex-col items-center justify-center rounded-xl p-4 text-center [backface-visibility:hidden]"
          style={{ backgroundColor: bgColor }}
        >
          <div className="mb-2">{icon}</div>
          <h3 className="text-base font-bold text-gray-800">{title}</h3>
        </div>

        <div
          className="absolute flex h-full w-full flex-col items-center justify-center rounded-xl p-4 text-center [backface-visibility:hidden]"
          style={{ backgroundColor: bgColor, transform: 'rotateY(180deg)' }}
        >
          <p className="text-sm text-gray-700">{description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const StaticCard = ({ icon, title, description }: CardProps) => (
  <motion.div
    className="flex h-full flex-col justify-center rounded-xl p-6 shadow-lg"
    style={{ backgroundColor: greyExtraLigth }}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true, amount: 0.3 }}
  >
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
    <p className="mt-2 text-gray-600">{description}</p>
  </motion.div>
);

export default function WhyChooseSection() {
  return (
    <FlexSectionWrapper id="why-udocument">
      <div className="mb-16 text-center">
        <h2 className="text-text-main-black text-3xl font-bold md:text-4xl">Чому обирають UDocument?</h2>
        <p className="text-text-grey-muted mt-2 text-lg">Ваш надійний партнер у юридичних питаннях</p>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="flex gap-4">
            <FlipCard {...benefits[0]} bgColor={yellowLighter} small delay={0} />
            <FlipCard {...benefits[1]} bgColor={blueLighter} small delay={0.15} />
          </div>
          <div className="flex-1">
            <StaticCard {...benefits[2]} />
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="flex-1">
            <StaticCard {...benefits[3]} />
          </div>
          <div className="flex gap-4">
            <FlipCard {...benefits[4]} bgColor={yellowLighter} small delay={0} />
            <FlipCard {...benefits[5]} bgColor={blueLighter} small delay={0.15} />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <StaticCard {...benefits[6]} />
        </motion.div>
      </div>
    </FlexSectionWrapper>
  );
}
