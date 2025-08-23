'use client';

import { FC } from 'react';

import { SiteContent } from '@/types/dictionaries';

interface PrivacyClientPageProps {
  dictionary: SiteContent['privacy_policy'];
}

const PolicySection: FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-8 md:mb-10">
    <h2 className="text-text-mainBlack border-border-borderGrey mb-4 border-b pb-2 text-2xl font-semibold md:text-3xl">{title}</h2>
    <div className="text-text-greyMuted space-y-4 text-base lg:text-lg">{children}</div>
  </section>
);

export const PrivacyClientPage: FC<PrivacyClientPageProps> = ({ dictionary }) => {
  return (
    <div className="bg-bg-primary min-h-screen">
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="rounded-lg bg-white p-6 shadow-md md:p-10">
          <header className="mb-8 text-center md:mb-12">
            <h1 className="text-text-mainBlack text-4xl font-bold md:text-5xl">{dictionary.title}</h1>
            <p className="text-text-grey mt-2 text-sm">{dictionary.last_updated}</p>
          </header>

          <PolicySection title={dictionary.introduction_title}>
            <p>{dictionary.introduction_text}</p>
          </PolicySection>

          <PolicySection title={dictionary.data_collection_title}>
            <p>{dictionary.data_collection_text}</p>
            <ul className="list-inside list-disc space-y-2 pl-4">
              {dictionary.data_collection_list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </PolicySection>

          <PolicySection title={dictionary.data_usage_title}>
            <p>{dictionary.data_usage_text}</p>
            <ul className="list-inside list-disc space-y-2 pl-4">
              {dictionary.data_usage_list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </PolicySection>

          <PolicySection title={dictionary.data_commitment_title}>
            <p className="text-text-mainBlack bg-background-muted border-yellow rounded-md border-l-4 p-4 font-semibold">
              {dictionary.data_commitment_text}
            </p>
          </PolicySection>

          <PolicySection title={dictionary.data_protection_title}>
            <p>{dictionary.data_protection_text}</p>
          </PolicySection>

          <PolicySection title={dictionary.user_rights_title}>
            <p>{dictionary.user_rights_text}</p>
            <ul className="list-inside list-disc space-y-2 pl-4">
              {dictionary.user_rights_list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </PolicySection>

          <PolicySection title={dictionary.cookies_title}>
            <p>{dictionary.cookies_text}</p>
          </PolicySection>

          <PolicySection title={dictionary.changes_title}>
            <p>{dictionary.changes_text}</p>
          </PolicySection>

          <PolicySection title={dictionary.contact_us_title}>
            <p>
              {dictionary.contact_us_text}{' '}
              <a href={`mailto:${dictionary.contact_us_email}`} className="text-link-btn-text hover:underline">
                {dictionary.contact_us_email}
              </a>
            </p>
          </PolicySection>
        </div>
      </main>
    </div>
  );
};
