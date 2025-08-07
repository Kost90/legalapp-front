import FlexSectionWrapper from '@/components/Container/FlexSectionWrapper';
import DocumentTemplateIllustration from '@/components/DocumentTemplateIllustration/DocumentTemplateIllustration';
import { SiteContent } from '@/types/dictionaries';

import FeatureList from './FeatureList';

interface IOurBenefitsSection {
  dictionary: SiteContent;
  lang: string;
}

function OurBenefitsSection({ ...props }: IOurBenefitsSection) {
  return (
    <FlexSectionWrapper className="mx-auto">
      <div className="flex w-full flex-col items-center justify-center gap-32 md:flex-row">
        <div className="relative flex w-full max-w-[500px] flex-1 shrink-0 justify-center">
          <div
            aria-hidden="true"
            className="animate-glow absolute top-1/2 left-1/2 -z-10 h-[130%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-[#FDBF32] to-[#72A9FB] blur-lg"
          />
          <DocumentTemplateIllustration />
        </div>
        <div className="bg-background-grey-extra-ligth shadow-custom-soft flex w-full max-w-[500px] flex-1 flex-col items-center gap-5 rounded-lg p-5 md:items-start">
          <h3 className="text-text-main-black text-2xl font-bold tracking-tight">{props.dictionary.ourBenefitsSection.titel}</h3>
          <FeatureList dictionary={props.dictionary.ourBenefitsSection} />
        </div>
      </div>
    </FlexSectionWrapper>
  );
}

export default OurBenefitsSection;
