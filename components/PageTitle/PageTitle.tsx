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
    <div className={cn('pt-10 pb-5', className)} {...props}>
      <div className="flex flex-col gap-4 sm:items-start sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-color-footer-link-blue-brt h-3.5 w-5 rounded-full sm:h-5" />

          <h1 className="text-main-black text-3xl font-semibold tracking-tight">{title}</h1>
        </div>

        {description && <p className="max-w-xl text-sm leading-snug text-gray-500">{description}</p>}
      </div>

      <div className="mt-6 border-t border-gray-200" />
    </div>
  );
}
