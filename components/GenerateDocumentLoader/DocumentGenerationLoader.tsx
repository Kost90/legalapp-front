'use client';

import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      repeat: Infinity,
      repeatDelay: 1,
      duration: 3,
    },
  },
};

const lineVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};

const checkmarkVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      delay: 1.2,
      duration: 0.7,
      ease: 'easeOut',
    },
  },
};

export default function DocumentGenerationLoader() {
  return (
    <motion.svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      // Применяем варианты к контейнеру
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Статичная рамка документа */}
      <motion.path d="M30,10 H80 L90,20 V110 H30 Z" stroke="#087dc1" /* link-btn-text */ strokeWidth="4" fill="none" />
      <motion.path d="M80,10 V20 H90" stroke="#087dc1" /* link-btn-text */ strokeWidth="4" fill="none" />

      {/* Анимированные элементы */}
      <g transform="translate(40, 45)">
        {/* Линии текста */}
        <motion.line
          x1="0"
          y1="0"
          x2="40"
          y2="0"
          stroke="#6B8091" /* muted-text */
          strokeWidth="3"
          strokeLinecap="round"
          variants={lineVariants}
        />
        <motion.line
          x1="0"
          y1="12"
          x2="40"
          y2="12"
          stroke="#6B8091" /* muted-text */
          strokeWidth="3"
          strokeLinecap="round"
          variants={lineVariants}
        />
        <motion.line
          x1="0"
          y1="24"
          x2="40"
          y2="24"
          stroke="#6B8091" /* muted-text */
          strokeWidth="3"
          strokeLinecap="round"
          variants={lineVariants}
        />

        {/* Галочка */}
        <motion.path
          d="M10 40 L 20 50 L 40 30"
          stroke="#087dc1" /* link-btn-text */
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={checkmarkVariants}
        />
      </g>
    </motion.svg>
  );
}
