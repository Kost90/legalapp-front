import { ShieldCheck, TableOfContents, FileSignature, Globe } from 'lucide-react';

import { OurBenefitsSection } from '@/types/dictionaries';

const FeatureList = ({ dictionary }: { dictionary: OurBenefitsSection }) => {
  return (
    <div className="text-text space-y-4 text-[16px]">
      <div className="flex items-center gap-3">
        <span className="rounded-md bg-orange-100 p-2">
          <ShieldCheck className="h-5 w-5 text-orange-500" />
        </span>
        <span>{dictionary.features.lawDef}</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="rounded-md bg-lime-100 p-2">
          <TableOfContents className="h-5 w-5 text-lime-600" />
        </span>
        <span>{dictionary.features.structure}</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="rounded-md bg-sky-100 p-2">
          <FileSignature className="h-5 w-5 text-sky-600" />
        </span>
        <span>{dictionary.features.contracts}</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="rounded-md bg-red-100 p-2">
          <Globe className="h-5 w-5 text-red-500" />
        </span>
        <span>{dictionary.features.notaryServices}</span>
      </div>
    </div>
  );
};

export default FeatureList;
