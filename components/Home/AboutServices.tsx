'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Zap, ChevronDown } from 'lucide-react';
import { useState, useRef } from 'react';

import FlexSectionWrapper from '@/components/Container/FlexSectionWrapper';

const accordionData = [
  {
    id: 1,
    icon: ShieldCheck,
    title: 'Експертиза та інновації',
    content:
      'Документи, створені за допомогою UDocument, розроблені кваліфікованими юристами та адвокатами з багаторічним досвідом. Ми поєднуємо юридичну експертизу з передовими технологіями, щоб надати вам точні, легальні та професійні документи без зайвих клопотів.',
  },
  {
    id: 2,
    icon: Zap,
    title: 'Як працює UDocument',
    content:
      'Забудьте про пошук знайомих юристів, складні погодження чи черги в офісах. UDocument дозволяє створити юридично коректний документ онлайн — без завантаження особистих даних, без втрати часу. Просто введіть необхідну інформацію та отримаєте документ, який можна використовувати у державних установах України, як на її території, так і за кордоном.',
  },
];

const AboutServices = () => {
  const [expanded, setExpanded] = useState<number | null>(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <div className="bg-base-btn-hover-bg w-full">
      <FlexSectionWrapper>
        <div className="flex w-full max-w-6xl flex-col gap-4 md:flex-row md:items-start">
          {accordionData.map((item, i) => {
            const isOpen = i === expanded;
            const IconComponent = item.icon;

            return (
              <motion.div
                key={item.id}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className={`border-btn-border-color flex-1 overflow-hidden rounded-lg border bg-white transition-shadow duration-300 ${
                  isOpen ? 'shadow-lg' : 'shadow-sm'
                }`}
              >
                <motion.button
                  layout="position"
                  initial={false}
                  onClick={() => setExpanded(isOpen ? null : i)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left"
                >
                  <div className="flex items-center gap-4">
                    <IconComponent size={24} className={isOpen ? 'text-blue-600' : 'text-muted-text'} />
                    <h3 className="text-main-black text-lg font-semibold">{item.title}</h3>
                  </div>

                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown size={24} className="text-muted-text" />
                  </motion.div>
                </motion.button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.section
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5">
                        <p className="text-muted-text text-justify leading-relaxed">{item.content}</p>
                      </div>
                    </motion.section>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </FlexSectionWrapper>
    </div>
  );
};

export default AboutServices;
