'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import Heading from '@/components/Heading/Heading';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  title: string;
  items: FaqItem[];
}

const FaqItemComponent = ({ item, index }: { item: FaqItem; index: number }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const buttonId = `faq-question-${index}`;
  const panelId = `faq-answer-${index}`;

  return (
    <div className="border-border-borderGrey border-b">
      <Heading level="h4" className="text-text-mainBlack mb-0 text-left text-lg font-semibold">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between py-4 text-left"
          aria-expanded={isOpen}
          aria-controls={panelId}
          id={buttonId}
        >
          <span>{item.question}</span>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown size={20} />
          </motion.div>
        </button>
      </Heading>
      <motion.div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
          marginTop: isOpen ? '0' : '-1rem',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <p className="text-text-greyMuted pt-1 pb-4">{item.answer}</p>
      </motion.div>
    </div>
  );
};

export default function FaqAccordion({ title, items }: FaqAccordionProps) {
  const titleId = 'faq-section-title';

  return (
    <section className="mt-8" aria-labelledby={titleId}>
      <Heading level="h3" id={titleId}>
        {title}
      </Heading>
      <div className="mt-4">
        {items.map((item, index) => (
          <FaqItemComponent key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
