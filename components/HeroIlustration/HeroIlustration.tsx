'use client';

import { motion, Variants } from 'framer-motion';

// Контейнер SVG управляет последовательностью основных этапов
const svgVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.8,
    },
  },
};

// "Отрисовка" прямоугольников
const drawRectVariants = (width: number): Variants => ({
  hidden: { width: 0, opacity: 0 },
  visible: {
    width: width,
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
});

// "Отрисовка" контура (для стрелки и галочки)
const drawPathVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: 'easeInOut',
    },
  },
};

// Плавное появление (для наконечника и документа)
const fadeInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const HeroIllustration = () => {
  return (
    <motion.svg
      viewBox="0 0 450 300"
      aria-hidden="true"
      variants={svgVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
    >
      {/* Defs и фон без изменений */}
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#F5F9FF' }} />
          <stop offset="100%" style={{ stopColor: '#FFFFFF' }} />
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="5" dy="10" stdDeviation="10" floodColor="#dbe5ea" floodOpacity="0.5" />
        </filter>
      </defs>
      <rect width="450" height="300" rx="12" fill="url(#grad1)" filter="url(#shadow)" />
      <rect x="1" y="1" width="448" height="298" rx="11" fill="none" stroke="#dbe5ea" strokeWidth="1" />

      {/* Элементы ввода */}
      <motion.g
        transform="translate(40, 50)"
        variants={{
          visible: { transition: { staggerChildren: 0.3 } },
        }}
      >
        <motion.rect variants={drawRectVariants(180)} height="30" rx="4" fill="#ecf4ff" stroke="#dbe5ea" />
        <motion.rect variants={drawRectVariants(120)} y="50" height="30" rx="4" fill="#F5F9FF" stroke="#dbe5ea" />
        <motion.rect variants={drawRectVariants(180)} y="100" height="80" rx="4" fill="#dbe5ea" />
      </motion.g>

      {/* Стрелка процесса */}
      <motion.g>
        <motion.path d="M 230 150 L 270 150" stroke="#6B8091" strokeWidth="2" fill="none" variants={drawPathVariants} />
        <motion.path d="M 265 145 L 275 150 L 265 155" fill="#6B8091" variants={fadeInVariants} transition={{ delay: 0.5 }} />
      </motion.g>

      {/* Иконка документа */}
      <g transform="translate(300, 90)">
        <motion.g variants={fadeInVariants}>
          <path d="M0 0 H50 L80 30 V120 H0 Z" fill="#FFFFFF" stroke="#087dc1" strokeWidth="2" />
          <path d="M50 0 V30 H80" fill="none" stroke="#087dc1" strokeWidth="2" />
          <rect x="15" y="50" width="50" height="5" rx="2" fill="#dbe5ea" />
          <rect x="15" y="65" width="50" height="5" rx="2" fill="#dbe5ea" />
          <rect x="15" y="80" width="35" height="5" rx="2" fill="#FFDD00" />
        </motion.g>
      </g>

      <motion.g
        transform="translate(410, 35)"
        variants={{
          visible: { transition: { staggerChildren: 0.3 } },
        }}
      >
        <motion.circle r="20" fill="#22C55E" variants={fadeInVariants} />
        <motion.path
          d="M -10,-2 L -2,6 L 10,-6"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinecap="round"
          variants={drawPathVariants}
        />
      </motion.g>
    </motion.svg>
  );
};

export default HeroIllustration;
