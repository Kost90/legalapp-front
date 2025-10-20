'use client';

import { motion, Variants } from 'framer-motion';
import { Mail, Phone, UserPlus } from 'lucide-react';

import FlexSectionWrapper from '@/components/Container/FlexSectionWrapper';
import Heading from '@/components/Heading/Heading';
import LinkButton from '@/components/ui/LinkButton/LinkButton';
import { SiteContent } from '@/types/dictionaries';

type ContactPromptProps = {
  dictionary: SiteContent;
  lang: string;
};

export const containerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
    },
  },
};

const ContactPromptSection = ({ dictionary, lang }: ContactPromptProps) => {
  const { contactPrompt, footer } = dictionary;

  return (
    <div className="bg-background-grey-extra-ligth w-full">
      <FlexSectionWrapper dataSectionTheme={'light'} className="py-16 md:py-24">
        <motion.div
          className="flex w-full flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Heading level="h2" className="tracking-tight">
            {contactPrompt.title}
          </Heading>
          <p className="text-text-greyMuted mt-4 max-w-2xl text-lg leading-8">{contactPrompt.subtitle}</p>
          <p className="text-text-greyMuted mt-4 max-w-2xl text-base leading-7">{contactPrompt.registration_benefit}</p>

          <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row sm:gap-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <LinkButton lang={lang} signUp={true} type="black">
                <UserPlus className="h-5 w-5" />
                {contactPrompt.signup_cta}
              </LinkButton>
            </motion.div>

            <div className="flex w-full gap-4 sm:w-auto">
              <motion.a
                href={`mailto:${footer.email}`}
                className="border-border-borderGrey text-text-mainBlack mt-3 flex flex-1 items-center justify-center gap-3 rounded-lg border bg-white px-5 py-3 text-center font-semibold shadow-sm transition-all hover:bg-gray-50 sm:flex-initial"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title={contactPrompt.email_cta}
              >
                <Mail className="h-5 w-5" />
              </motion.a>

              <motion.a
                href={`tel:${footer.phone.replace(/[()-\s]/g, '')}`}
                className="border-border-borderGrey text-text-mainBlack mt-3 flex flex-1 items-center justify-center gap-3 rounded-lg border bg-white px-5 py-3 text-center font-semibold shadow-sm transition-all hover:bg-gray-50 sm:flex-initial"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title={contactPrompt.phone_cta}
              >
                <Phone className="h-5 w-5" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </FlexSectionWrapper>
    </div>
  );
};

export default ContactPromptSection;
