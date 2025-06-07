'use client';
import { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

interface PageTitleProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  index?: number;
}

export default function PageTitle({ title, description, index, className, ...props }: PageTitleProps) {
  return (
    <div className={cn('pt-5 pb-5', className)} {...props}>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-5 w-5 rounded-full bg-color-footer-link-blue-brt" />

          <h1 className="text-3xl font-semibold text-main-black tracking-tight">{title}</h1>
        </div>

        {description && <p className="text-sm text-gray-500 max-w-xl leading-snug">{description}</p>}
      </div>

      <div className="mt-6 border-t border-gray-200" />
    </div>
  );
}
