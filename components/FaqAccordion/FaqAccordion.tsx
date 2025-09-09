'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  title: string;
  items: FaqItem[];
}

const FaqItemComponent = ({ item }: { item: FaqItem }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="border-border-borderGrey border-b">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-text-mainBlack flex w-full items-center justify-between py-4 text-left font-semibold"
      >
        <span>{item.question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown size={20} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-text-greyMuted pb-4">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FaqAccordion({ title, items }: FaqAccordionProps) {
  return (
    <div className="mt-8">
      <h3 className="text-text-mainBlack text-2xl font-bold">{title}</h3>
      <div className="mt-4">
        {items.map((item, index) => (
          <FaqItemComponent key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
