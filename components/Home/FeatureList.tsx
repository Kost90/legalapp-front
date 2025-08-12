import { ShieldCheck, TableOfContents, FileSignature, Globe } from 'lucide-react';

import { OurBenefitsSection } from '@/types/dictionaries';

const FeatureList = ({ dictionary }: { dictionary: OurBenefitsSection }) => {
  return (
    <div className="text-text-grey-muted space-y-6 text-[17px] leading-relaxed">
      <div className="flex items-center gap-4">
        <span className="rounded-md p-3" style={{ backgroundColor: 'rgba(254, 215, 115, 0.3)' }}>
          <ShieldCheck className="text-orange h-6 w-6" />
        </span>
        <span>{dictionary.features.lawDef}</span>
      </div>

      <div className="flex items-center gap-4">
        <span className="rounded-md p-3" style={{ backgroundColor: 'rgba(163, 230, 53, 0.25)' }}>
          <TableOfContents className="h-6 w-6 text-lime-600" />
        </span>
        <span>{dictionary.features.structure}</span>
      </div>

      <div className="flex items-center gap-4">
        <span className="rounded-md p-3" style={{ backgroundColor: 'rgba(125, 211, 252, 0.3)' }}>
          <FileSignature className="text-blue h-6 w-6" />
        </span>
        <span>{dictionary.features.contracts}</span>
      </div>

      <div className="flex items-center gap-4">
        <span className="rounded-md p-3" style={{ backgroundColor: 'rgba(252, 165, 165, 0.3)' }}>
          <Globe className="h-6 w-6 text-red-500" />
        </span>
        <span>{dictionary.features.notaryServices}</span>
      </div>
    </div>
  );
};

export default FeatureList;
