'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Zap, ChevronDown } from 'lucide-react';
import { useState, useRef } from 'react';

import FlexSectionWrapper from '@/components/Container/FlexSectionWrapper';

const accordionData = [
  {
    id: 1,
    icon: ShieldCheck,
    title: {
      ua: 'Експертиза та інновації',
      en: 'Expertise and Innovation',
    },
    content: {
      ua: 'Документи, створені за допомогою UDocument, розроблені кваліфікованими юристами та адвокатами з багаторічним досвідом. Ми поєднуємо юридичну експертизу з передовими технологіями, щоб надати вам точні, легальні та професійні документи без зайвих клопотів.',
      en: 'Documents created with UDocument are developed by qualified lawyers and attorneys with years of experience. We combine legal expertise with advanced technologies to provide you with accurate, legal, and professional documents without unnecessary hassle.',
    },
  },
  {
    id: 2,
    icon: Zap,
    title: {
      ua: 'Як працює UDocument',
      en: 'How UDocument Works',
    },
    content: {
      ua: 'Забудьте про пошук знайомих юристів, складні погодження чи черги в офісах. UDocument дозволяє створити юридично коректний документ онлайн — без завантаження особистих даних, без втрати часу. Просто введіть необхідну інформацію та отримаєте документ, який можна використовувати у державних установах України, як на її території, так і за кордоном.',
      en: 'Forget about finding familiar lawyers, complicated approvals, or queues at offices. UDocument allows you to create a legally compliant document online — without uploading personal data or wasting time. Simply enter the necessary information and receive a document that can be used in Ukrainian government institutions, both domestically and abroad.',
    },
  },
];

const AboutServices = ({ lang }: { lang: 'ua' | 'en' }) => {
  const [expanded, setExpanded] = useState<number | null>(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <div className="bg-background-blue-lighter w-full rounded-xl">
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
                className={`border-btn-border-color bg-background-grey-extra-ligth flex-1 overflow-hidden rounded-lg border transition-shadow duration-300 ${
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
                    <IconComponent size={24} className={isOpen ? 'text-blue' : 'text-muted-text'} />
                    <h3
                      className={`text-text-main-black text-lg font-semibold transition ${isOpen ? `bg-background-yellow-ligthter rounded-md p-2` : ''}`}
                    >
                      {item.title[lang]}
                    </h3>
                  </div>

                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown size={24} className="text-text-grey-muted" />
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
                        <p className="text-text-blue-dark text-justify leading-relaxed">{item.content[lang]}</p>
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
