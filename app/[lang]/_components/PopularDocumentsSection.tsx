import PopularDocumentCard from '@/app/[lang]/_components/PopularDocumentCard';
import FlexSectionWrapper from '@/components/Container/FlexSectionWrapper';
import Heading from '@/components/Heading/Heading';
import { LANG_VARIANTS } from '@/lib/constants/lang-variants';
import { SiteContent } from '@/types/dictionaries';

export default function PopularDocumentsSection({ dictionary, lang }: { dictionary: SiteContent; lang: LANG_VARIANTS }) {
  const { title, subtitle, documents } = dictionary.popularDocuments;

  return (
    <FlexSectionWrapper dataSectionTheme={'light'} id="popular-documents">
      <div className="mb-12 text-center">
        <Heading level="h2">{title}</Heading>
        <p className="text-text-greyMuted mt-2 text-lg">{subtitle}</p>
      </div>
      <div className="flex w-full flex-col flex-wrap items-center justify-center gap-6 md:flex-row">
        {documents.map((doc) => (
          <PopularDocumentCard
            key={doc.title}
            lang={lang}
            url={doc.url}
            icon={doc.icon}
            title={doc.title}
            description={doc.description}
            tag={doc.tag}
          />
        ))}
      </div>
    </FlexSectionWrapper>
  );
}
