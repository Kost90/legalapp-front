import clsx from 'clsx';
import { ReactNode } from 'react';

type HeadingProps = {
  level: 'h1' | 'h2' | 'h3' | 'h4';
  children: ReactNode;
  className?: string;
  id?: string;
};

export default function Heading({ level, children, className, id }: HeadingProps) {
  const baseStyles = {
    h1: 'text-3xl font-bold text-text-mainBlack md:text-4xl',
    h2: 'text-3xl font-bold text-text-mainBlack md:text-4xl',
    h3: 'text-xl font-bold text-text-mainBlack',
    h4: 'text-text-mainBlack text-center font-semibold',
  };

  const Tag = level;

  const combinedClasses = clsx(baseStyles[level], className);

  return (
    <Tag id={id} className={combinedClasses}>
      {children}
    </Tag>
  );
}
