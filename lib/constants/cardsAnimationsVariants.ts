import { Variants } from 'framer-motion';

export const staticCardAppear: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export const flipCardAppear = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, delay, ease: 'easeOut' },
  },
});

export const flipCardRotate: Variants = {
  initial: { rotateY: 0 },
  hover: {
    rotateY: 180,
    transition: { duration: 0.6, ease: 'easeInOut' },
  },
};
