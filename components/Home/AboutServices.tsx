'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Globe, ChevronDown } from 'lucide-react';
import { useState, useRef } from 'react';

import FlexSectionWrapper from '@/components/Container/FlexSectionWrapper';

const accordionData = [
  {
    id: 1,
    icon: ShieldCheck,
    title: {
      ua: 'Експертиза та інновації: наш подвійний контроль',
      en: 'Expertise and Innovation: Our Dual Control',
    },
    content: {
      ua: 'В основі кожного документа UDocument лежить подвійний контроль: юридична експертиза досвідчених юристів та точність наших технологій. Це наш стандарт, який гарантує, що ви отримуєте не просто шаблон, а надійний правовий інструмент, що відповідає найвищим стандартам якості та чинному законодавству.',
      en: 'At the core of every UDocument lies dual control: the legal expertise of experienced lawyers and the precision of our technology. This is our standard, ensuring you receive not just a template, but a reliable legal instrument that meets the highest quality standards and current legislation.',
    },
  },
  {
    id: 2,
    icon: Globe,
    title: {
      ua: 'Комплексні рішення: від України до Великої Британії',
      en: 'Comprehensive Solutions: From Ukraine to Great Britain',
    },
    content: {
      ua: 'UDocument — це більше, ніж генератор документів. Це ваша єдина точка доступу до повного спектру юридичних послуг. Наприклад, ви можете створити договір для бізнесу в Україні, а потім звернутися до наших юристів для супроводу угоди. Або ж оформити довіреність у Великій Британії, а ми забезпечимо її нотаріальне засвідчення, апостиль та повну готовність до використання в Україні. Ми поєднуємо онлайн-сервіси та класичну юриспруденцію для вирішення ваших завдань.',
      en: 'UDocument is more than a document generator. It is your single point of access to a full spectrum of legal services. For example, you can create a contract for your business in Ukraine and then turn to our lawyers for full transaction support. Alternatively, you can issue a power of attorney in Great Britain, and we will handle its notarization, apostille, and ensure it is fully ready for use in Ukraine. We combine online services with traditional legal practice to solve your tasks.',
    },
  },
];

const AboutServices = ({ lang }: { lang: 'ua' | 'en' }) => {
  const [expanded, setExpanded] = useState<number | null>(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <div className="bg-main-black w-full rounded-xl">
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
                  className="flex min-h-32 w-full cursor-pointer items-center justify-between gap-4 p-5 text-left"
                >
                  <div className="flex items-center gap-4">
                    <IconComponent size={24} className={isOpen ? 'text-blue shrink-0' : 'text-muted-text shrink-0'} />
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
