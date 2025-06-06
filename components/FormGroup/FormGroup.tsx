import { cn } from '@/utils/cn';
import { ReactNode } from 'react';

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
      <label className={cn('block text-sm font-medium text-gray-700 mb-1', labelClassName)}>{label}</label>
      {description && <p className="text-xs text-gray-500 mb-1">{description}</p>}
      {children}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
