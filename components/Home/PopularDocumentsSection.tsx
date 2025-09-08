'use client';

import { motion } from 'framer-motion';

import PopularDocumentCard from '@/components/Cards/PopularDocumentCard';
import FlexSectionWrapper from '@/components/Container/FlexSectionWrapper';
import { SiteContent } from '@/types/dictionaries';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function PopularDocumentsSection({ dictionary }: { dictionary: SiteContent }) {
  const { title, subtitle, documents } = dictionary.popularDocuments;

  return (
    <FlexSectionWrapper dataSectionTheme={'light'} id="popular-documents">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h2 className="text-text-mainBlack text-3xl font-bold md:text-4xl">{title}</h2>
        <p className="text-text-greyMuted mt-2 text-lg">{subtitle}</p>
      </motion.div>

      <motion.div
        className="flex w-full flex-col flex-wrap items-center justify-center gap-6 md:flex-row"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {documents.map((doc, index) => (
          <PopularDocumentCard
            key={doc.title}
            icon={doc.icon}
            title={doc.title}
            description={doc.description}
            tag={doc.tag}
            delay={index}
          />
        ))}
      </motion.div>
    </FlexSectionWrapper>
  );
}
