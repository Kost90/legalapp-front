'use client';

import { Briefcase, Car, FileText, Gavel, Users, type LucideProps } from 'lucide-react';
import { FC } from 'react';

import Card from '@/components/ui/card/Card';

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
}

const PopularDocumentCard: FC<PopularDocumentCardProps> = ({ icon, title, description, tag }) => {
  const IconComponent = iconMap[icon] || FileText;

  return (
    <Card
      animated
      className="bg-background-mutedcard group hover:border-blue relative flex h-full min-h-52 w-full cursor-pointer flex-col border-transparent md:w-80"
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
  );
};

export default PopularDocumentCard;
