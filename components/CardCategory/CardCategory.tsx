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
        'rounded-2xl p-6 text-left bg-white border border-btn-border-color shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-link-btn-text',
        className,
      )}
    >
      <h3 className="text-xl font-semibold mb-2 text-main-black">{title}</h3>
      <p className="text-muted-text text-sm">{description}</p>
    </button>
  );
};

export default CardCategory;
