'use client';

import { motion, Variants } from 'framer-motion';
import { Briefcase, Car, FileText, Gavel, Users, type LucideProps } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

import Card from '@/components/ui/card/Card';
import { LANG_VARIANTS } from '@/lib/constants/lang-variants';

const iconMap: { [key: string]: FC<LucideProps> } = {
  FileText,
  Car,
  Briefcase,
  Gavel,
  Users,
};

interface PopularDocumentCardProps {
  lang: LANG_VARIANTS;
  url: string;
  icon: string;
  title: string;
  description: string;
  tag: string;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const PopularDocumentCard: FC<PopularDocumentCardProps> = ({ lang, url, icon, title, description, tag }) => {
  const IconComponent = iconMap[icon] || FileText;

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="h-full w-full md:w-80"
    >
      <Link href={`/${lang}/documents-types/${url}`} className="group h-full">
        <Card
          animated
          className="bg-background-mutedcard hover:border-blue relative flex h-full min-h-52 cursor-pointer flex-col border-transparent"
        >
          <div className="bg-yellow text-text-blue-dark absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-bold transition-transform duration-300 group-hover:scale-105">
            {tag}
          </div>

          <div className="mb-4">
            <IconComponent size={32} className="text-blue" />
          </div>

          <h3 className="text-text-mainBlack text-lg font-bold">{title}</h3>
          <p className="text-text-greyMuted mt-2 flex-grow text-base">{description}</p>
        </Card>
      </Link>
    </motion.div>
  );
};

export default PopularDocumentCard;
