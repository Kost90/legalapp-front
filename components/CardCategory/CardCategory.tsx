'use client';

import { FC } from 'react';

import Card from '@/components/ui/card/Card';
import { cn } from '@/utils/cn';

interface CardCategoryProps {
  title: string;
  description: string;
  onClick: () => void;
  className?: string;
}

const CardCategory: FC<CardCategoryProps> = ({ title, description, onClick, className }) => {
  return (
    <Card as="button" onClick={onClick} className={cn('text-left', className)}>
      <h3 className="text-main-black mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-muted-text text-sm">{description}</p>
    </Card>
  );
};

export default CardCategory;
