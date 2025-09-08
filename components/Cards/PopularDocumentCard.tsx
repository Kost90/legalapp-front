'use client';

import { motion } from 'framer-motion';
import { Briefcase, Car, FileText, Gavel, Users, type LucideProps } from 'lucide-react';
import { FC } from 'react';

const iconMap: { [key: string]: FC<LucideProps> } = {
  FileText,
  Car,
  Briefcase,
  Gavel,
  Users,
};

interface PopularDocumentCardProps {
  icon: string;
  title: string;
  description: string;
  tag: string;
  delay: number;
}

const cardVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
};

const PopularDocumentCard = ({ icon, title, description, tag, delay }: PopularDocumentCardProps) => {
  const IconComponent = iconMap[icon] || FileText;

  return (
    <motion.div
      variants={cardVariants}
      transition={{
        duration: 0.5,
        delay: delay * 0.15,
        ease: 'easeOut',
      }}
      className="bg-background-mutedcard group hover:border-blue relative flex h-full transform cursor-pointer flex-col rounded-lg border border-transparent p-6 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg"
    >
      <div className="bg-yellow text-text-blue-dark absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-bold transition-transform duration-300 group-hover:scale-105">
        {tag}
      </div>

      <div className="mb-4">
        <IconComponent size={32} className="text-blue" />
      </div>

      <h3 className="text-text-mainBlack text-lg font-bold">{title}</h3>
      <p className="text-text-greyMuted mt-2 flex-grow text-base">{description}</p>
    </motion.div>
  );
};

export default PopularDocumentCard;
