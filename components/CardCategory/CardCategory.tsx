'use client';
import { FC } from 'react';

import { cn } from '@/utils/cn';

interface CardCategoryProps {
  title: string;
  description: string;
  onClick: () => void;
  className?: string;
}

const CardCategory: FC<CardCategoryProps> = ({ title, description, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'border-btn-border-color focus:ring-link-btn-text cursor-pointer rounded-2xl border bg-white p-6 text-left shadow-sm transition-all duration-200 hover:shadow-md focus:ring-2 focus:outline-none',
        className,
      )}
    >
      <h3 className="text-main-black mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-muted-text text-sm">{description}</p>
    </button>
  );
};

export default CardCategory;
