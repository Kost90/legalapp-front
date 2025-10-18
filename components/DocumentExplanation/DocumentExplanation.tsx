import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

import FaqAccordion from '@/components/FaqAccordion/FaqAccordion';
import Heading from '@/components/Heading/Heading';
import { DOCUMENT_TYPE } from '@/lib/constants/common-documents';
import { SiteContent } from '@/types/dictionaries';

interface IDocumentExplanationProps {
  lang: string;
  documentType: DOCUMENT_TYPE;
  dictionary: SiteContent;
}

function DocumentExplanation(props: IDocumentExplanationProps) {
  const content = props.dictionary?.documentPages[props.documentType];

  if (!content) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-2xl">Документ не знайдено</h1>
      </div>
    );
  }

  return (
    <motion.div
      key={props.documentType}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full max-w-7xl px-4 py-10 md:py-16"
    >
      <div className="lg:col-span-2">
        <Heading level="h1">{content.h1}</Heading>
        <p className="text-text-greyMuted mt-4 text-lg">{content.description}</p>

        <div className="mt-8">
          <Heading level="h3">{content.whenNeededTitle}</Heading>
          <ul className="mt-4 space-y-3">
            {content.whenNeededList.map((item, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle2 className="text-blue mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                <span className="text-text-greyMuted">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <FaqAccordion title={content.faqTitle} items={content.faqItems} />
      </div>
    </motion.div>
  );
}

export default DocumentExplanation;
