'use client';

import { motion } from 'framer-motion';
import { FC, ReactNode, ElementType } from 'react';

import { cn } from '@/utils/cn';

interface CardProps {
  as?: ElementType;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  animated?: boolean;
}

const baseVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const Card: FC<CardProps> = ({ as: Component = 'div', onClick, children, className, animated = false }) => {
  const Comp = animated ? motion(Component) : Component;

  return (
    <Comp
      variants={animated ? baseVariants : undefined}
      onClick={onClick}
      className={cn(
        'focus:ring-link-btn-text rounded-2xl border bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md focus:ring-2 focus:outline-none',
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export default Card;
