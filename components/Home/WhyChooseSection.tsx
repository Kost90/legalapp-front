'use client';

import { motion } from 'framer-motion';
import { BadgeCheck, BrainCircuit, FileText, Building2, Users, Home, Globe } from 'lucide-react';
import { ReactNode } from 'react';

// Wrapper component from your original code
import FlexSectionWrapper from '@/components/Container/FlexSectionWrapper';

// --- Data ---
// Benefit items data is moved here for clarity.
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
  {
    icon: <Users size={40} />,
    title: 'Індивідуальний підхід',
    description: 'Ваш запит — наше унікальне рішення.',
  },
  {
    icon: <Building2 size={40} />,
    title: 'Юридичний супровід для бізнесу та фізичних осіб',
    description: 'Всі юридичні потреби в одному місці: консультації, документи, супровід.',
  },
  {
    icon: <Home size={40} />,
    title: 'Послуги у сфері нерухомості',
    description: 'Оформлення, супровід, перевірка — повний цикл для житлової й комерційної нерухомості.',
  },
];

// Color schemes for the cards to cycle through
const colorSchemes = [
  { bg: 'bg-sky-50', iconBg: 'bg-sky-100', text: 'text-sky-700' },
  { bg: 'bg-amber-50', iconBg: 'bg-amber-100', text: 'text-amber-700' },
  { bg: 'bg-emerald-50', iconBg: 'bg-emerald-100', text: 'text-emerald-700' },
  { bg: 'bg-rose-50', iconBg: 'bg-rose-100', text: 'text-rose-700' },
];

// --- Sub-components for better structure ---

type BenefitCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  colors: (typeof colorSchemes)[0];
};

/**
 * A card component that flips on hover to reveal more details.
 * It uses framer-motion for the animation.
 */
const BenefitCard = ({ icon, title, description, colors }: BenefitCardProps) => {
  const cardVariants = {
    initial: { rotateY: 0 },
    hover: {
      rotateY: 180,
      transition: { duration: 0.6, ease: 'easeInOut' },
    },
  };

  return (
    // This outer div creates the 3D perspective for the flip effect.
    <div className="h-64 w-full [perspective:1000px]">
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        variants={cardVariants}
        initial="initial"
        whileHover="hover"
        whileFocus="hover" // Added for accessibility (keyboard navigation)
      >
        {/* Front of the card */}
        <div
          className={`absolute flex h-full w-full flex-col items-center justify-center rounded-xl p-6 text-center [backface-visibility:hidden] ${colors.bg}`}
        >
          <div className={`mb-4 rounded-full p-4 ${colors.iconBg} ${colors.text}`}>{icon}</div>
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        </div>

        {/* Back of the card */}
        <div
          className={`absolute flex h-full w-full [transform:rotateY(180deg)] flex-col items-center justify-center rounded-xl p-6 text-center [backface-visibility:hidden] ${colors.bg}`}
        >
          <h3 className="mb-2 text-lg font-bold text-gray-800">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </motion.div>
    </div>
  );
};

// --- Main Component ---

const WhyChooseSection = () => {
  return (
    <FlexSectionWrapper id="why-udocument">
      {' '}
      <div className="mb-16 text-center">
        <h2 className="text-text-main-black text-3xl font-bold md:text-4xl">Чому обирають UDocument?</h2>
        <p className="text-text-grey-muted mt-2 text-lg">Ваш надійний партнер у юридичних питаннях</p>
      </div>{' '}
      <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {' '}
        {benefits.map((item, idx) => (
          <BenefitCard
            key={item.title}
            icon={item.icon}
            title={item.title}
            description={item.description}
            // Cycle through the color schemes
            colors={colorSchemes[idx % colorSchemes.length]}
          />
        ))}{' '}
      </div>{' '}
    </FlexSectionWrapper>
  );
};

export default WhyChooseSection;
