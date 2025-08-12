import { Variants } from 'motion/react';

export const mobileStepVariants: Variants = {
  enter: (direction: 'left' | 'right') => ({
    x: direction === 'right' ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: (direction: 'left' | 'right') => ({
    x: direction === 'right' ? '-100%' : '100%',
    opacity: 0,
    transition: { duration: 0.4, ease: 'easeIn' },
  }),
};
