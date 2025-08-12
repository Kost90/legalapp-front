'use client';

import { motion } from 'framer-motion';
import { Phone, Mail } from 'lucide-react';

import FlexSectionWrapper from '@/components/Container/FlexSectionWrapper';
import { SiteContent } from '@/types/dictionaries';

import { containerVariantsPromptSection } from './animations';

type ContactPromptProps = {
  dictionary: SiteContent;
};

const ContactPromptSection = ({ dictionary }: ContactPromptProps) => {
  const { contactPrompt, footer } = dictionary;

  return (
    <FlexSectionWrapper className="py-20">
      <motion.div
        className="flex w-full flex-col items-center text-center"
        variants={containerVariantsPromptSection}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="text-text-main-black text-3xl font-bold tracking-tight sm:text-4xl">{contactPrompt.title}</h2>
        <p className="text-text-blue-extra-ligth mt-4 max-w-2xl text-lg leading-8">{contactPrompt.subtitle}</p>
        <p className="text-md text-text-grey mt-2 max-w-2xl">{contactPrompt.description}</p>

        <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row">
          <motion.a
            href={`mailto:${footer.email}`}
            className="flex w-full items-center justify-center gap-3 rounded-lg bg-slate-900 px-8 py-4 text-center font-semibold text-white shadow-sm transition-all hover:bg-slate-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-slate-600 sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail className="h-5 w-5" />
            {contactPrompt.email_cta}
          </motion.a>

          <motion.a
            href={`tel:${footer.phone.replace(/[()-\s]/g, '')}`}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-300 bg-white px-8 py-4 text-center font-semibold text-slate-900 shadow-sm transition-all hover:bg-slate-50 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-slate-600 sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Phone className="h-5 w-5" />
            {contactPrompt.phone_cta}
          </motion.a>
        </div>
      </motion.div>
    </FlexSectionWrapper>
  );
};

export default ContactPromptSection;
