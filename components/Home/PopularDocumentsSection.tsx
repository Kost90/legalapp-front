'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import PopularDocumentCard from '@/components/Cards/PopularDocumentCard';
import FlexSectionWrapper from '@/components/Container/FlexSectionWrapper';
import Heading from '@/components/Heading/Heading';
import { LANG_VARIANTS } from '@/lib/constants/lang-variants';
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

export default function PopularDocumentsSection({ dictionary, lang }: { dictionary: SiteContent; lang: LANG_VARIANTS }) {
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
        <Heading level="h2">{title}</Heading>
        <p className="text-text-greyMuted mt-2 text-lg">{subtitle}</p>
      </motion.div>

      <motion.div
        className="flex w-full flex-col flex-wrap items-center justify-center gap-6 md:flex-row"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {documents.map((doc) => (
          <Link href={`/${lang}/documents-types/${doc.url}`} key={doc.title}>
            <PopularDocumentCard icon={doc.icon} title={doc.title} description={doc.description} tag={doc.tag} />
          </Link>
        ))}
      </motion.div>
    </FlexSectionWrapper>
  );
}
