import { CSSProperties, HTMLAttributes } from 'react';

import './Spinner.css';
import { cn } from '@/utils/cn';

export default function Spinner({ size = 16, ...attrs }: { size?: number } & HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...attrs}
      className={cn('spinner', attrs.className)}
      style={
        {
          width: size,
          height: size,
          '--size': `${size}px`,
        } as CSSProperties
      }
    />
  );
}
