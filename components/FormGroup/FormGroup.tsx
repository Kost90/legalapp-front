import { ReactNode } from 'react';

import { cn } from '@/utils/cn';

interface FormGroupProps {
  label: string;
  description?: string;
  error?: string;
  children: ReactNode;
  labelClassName?: string;
}

export default function FormGroup({ label, description, error, children, labelClassName }: FormGroupProps) {
  return (
    <div className="mb-4">
      <label className={cn('text-main-black mb-1 block text-sm font-medium', labelClassName)}>{label}</label>
      {description && <p className="mb-1 text-xs text-gray-500">{description}</p>}
      {children}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
