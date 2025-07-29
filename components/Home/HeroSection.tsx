'use client';

import { motion } from 'motion/react';

import HeroIllustration from '@/components/HeroIlustration/HeroIlustration';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
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

export default function HeroSection() {
  return (
    <section className="bg-bg-body-main relative w-full">
      <motion.div
        className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 py-14 text-center sm:gap-20 sm:px-8 sm:py-24 lg:flex-row lg:text-left"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="max-w-xl" variants={itemVariants}>
          <h1 className="text-main-black text-3xl font-bold tracking-tight sm:text-5xl">UDocument — юридичні послуги нового покоління</h1>
          <p className="text-muted-text mt-6 text-base leading-7 sm:text-lg sm:leading-8">
            Понад 8 років досвіду у нерухомості, корпоративному, договірному праві, а також у сфері засвідчення документів у Великій
            Британії (нотаріус, апостиль, переклад). UDocument – це команда юристів та адвокатів, що поєднує експертизу з інноваціями. Наша
            фішка — онлайн-генерація юридичних документів за допомогою ШІ: професійні документи швидко, зручно та з високою юридичною
            точністю.
          </p>
        </motion.div>

        {/* <motion.div className="relative w-full max-w-md lg:max-w-xl" variants={itemVariants}>
          <motion.div
            className="absolute -inset-x-10 -inset-y-10 z-0"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              backgroundImage: 'radial-gradient(circle at center, #e0f2ff 0%, #cde4ff 50%, transparent 80%)',
              backgroundSize: '200% 200%',
              filter: 'blur(60px)',
              opacity: 0.5,
              borderRadius: '9999px',
            }}
          />
          <div className="relative z-10">
            <HeroIllustration className="h-auto w-full" />
          </div>
        </motion.div> */}
        <motion.div className="relative w-full max-w-md lg:max-w-xl" variants={itemVariants}>
          <div
            aria-hidden="true"
            className="animate-glow absolute top-1/2 left-1/2 -z-10 h-[115%] w-[115%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-[#ffdd00] to-[#087dc1] blur-3xl"
          />

          <HeroIllustration className="h-auto w-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
