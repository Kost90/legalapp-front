export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

export const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export const phoneVariants = {
  hidden: { opacity: 0, y: 50, rotate: -5 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.8,
      type: 'spring',
      stiffness: 70,
    },
  },
};

export const textBlockVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      delay: 0.2,
      ease: 'easeOut',
    },
  },
};
