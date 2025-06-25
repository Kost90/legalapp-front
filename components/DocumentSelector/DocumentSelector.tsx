'use client';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { FC } from 'react';

interface DocumentSelectorProps {
  options: Record<string, string>[];
  value: string | null;
  lang: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const DocumentSelector: FC<DocumentSelectorProps> = ({ options, value, lang, onChange, onNext, onBack }) => {
  return (
    <div className="my-10 space-y-4 md:my-20">
      <select
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className="border-btn-border-color focus:ring-link-btn-text w-full rounded-md border px-4 py-2 text-sm focus:ring-2 focus:outline-none"
      >
        <option value="" disabled>
          {lang === 'ua' ? 'Оберіть документ' : 'Choose document'}
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
          className="border-btn-border-color text-main-black hover:bg-base-btn-hover-bg flex items-center gap-1 rounded-md border bg-white px-4 py-2"
        >
          <ChevronLeft size={16} /> {lang === 'ua' ? 'Назад' : 'Back'}
        </button>

        <button
          onClick={onNext}
          disabled={!value}
          className="border-btn-border-color bg-link-btn-text flex items-center gap-1 rounded-md border px-4 py-2 text-white hover:opacity-90 disabled:opacity-50"
        >
          {lang === 'ua' ? 'Далі' : 'Continue'} <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default DocumentSelector;
