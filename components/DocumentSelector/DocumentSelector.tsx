'use client';
import { FC } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface DocumentSelectorProps {
  options: Record<string, string>[];
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

//TODO:Add dictionary
const DocumentSelector: FC<DocumentSelectorProps> = ({ options, value, onChange, onNext, onBack }) => {
  return (
    <div className="space-y-4">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-btn-border-color rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-link-btn-text"
      >
        <option value="" disabled>
          Оберіть документ
        </option>
        {options.map((doc) => {
          const entries = Object.entries(doc);
          if (entries.length !== 1) return null;

          const [key, value] = entries[0];
          return (
            <option key={value} value={key}>
              {value}
            </option>
          );
        })}
      </select>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1 border border-btn-border-color bg-white text-main-black px-4 py-2 rounded-md hover:bg-base-btn-hover-bg"
        >
          <ChevronLeft size={16} /> Назад
        </button>

        <button
          onClick={onNext}
          disabled={!value}
          className="flex items-center gap-1 border border-btn-border-color bg-link-btn-text text-white px-4 py-2 rounded-md hover:opacity-90 disabled:opacity-50"
        >
          Далее <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default DocumentSelector;
