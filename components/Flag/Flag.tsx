import { cn } from '@/utils/cn';

import 'flag-icons/css/flag-icons.min.css';

export default function Flag({ value }: { value: string }) {
  return (
    <div className="flex items-center justify-center">
      <div className={cn(`fi`, `fi-${value}`)} />
    </div>
  );
}
