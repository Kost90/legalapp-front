'use client';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { FC, useEffect, useState } from 'react';

import Button from '@/components/ui/button/Button';
import { DOCUMENT_TYPE } from '@/lib/constants/common-documents';
import { cn } from '@/utils/cn';

interface DocumentSelectorProps {
  options: Record<string, string>[];
  value: DOCUMENT_TYPE | string;
  lang: string;
  documentLang: 'ua' | 'en';
  onChange: (value: DOCUMENT_TYPE) => void;
  onNext: () => void;
  onBack: () => void;
  handelChangeDocumentLang: (value: 'ua' | 'en') => void;
  handelGetEmptyExample?: (documentType: DOCUMENT_TYPE, email: string, textLang: 'ua' | 'en') => void;
}

const isValidEmail = (email: string) => {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
};

const DocumentSelector: FC<DocumentSelectorProps> = ({
  options,
  value,
  lang,
  documentLang,
  onChange,
  onNext,
  onBack,
  handelChangeDocumentLang,
  handelGetEmptyExample,
}) => {
  const [email, setEmail] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (email === '') {
        setIsError(false);
      } else {
        setIsError(!isValidEmail(email));
      }
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [email]);

  return (
    <div className="my-10 space-y-6 md:mt-20 md:mb-10">
      <select
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value as DOCUMENT_TYPE)}
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
      <div className="space-y-3 rounded-md border border-gray-200 p-4">
        <h3 className="text-sm font-medium text-gray-900">{lang === 'ua' ? 'Оберіть мову документу' : 'Choose document language'}</h3>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="lang-ua"
              name="document-language"
              value="ua"
              checked={documentLang === 'ua'}
              onChange={() => handelChangeDocumentLang('ua')}
              className="focus:ring-link-btn-text text-link-btn-text h-4 w-4 border-gray-300"
            />

            <label htmlFor="lang-ua" className="cursor-pointer text-sm font-medium text-gray-700">
              UA
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="lang-en"
              name="document-language"
              value="en"
              checked={documentLang === 'en'}
              onChange={() => handelChangeDocumentLang('en')}
              className="focus:ring-link-btn-text text-link-btn-text h-4 w-4 border-gray-300"
            />

            <label htmlFor="lang-en" className="cursor-pointer text-sm font-medium text-gray-700">
              EN
            </label>
          </div>
        </div>

        <p className="text-xs text-gray-500">
          {lang === 'ua'
            ? 'Якщо ви обрали EN, документ буде створено на двох мовах одразу, англійскій та українській.'
            : 'If you choose EN, document will generate on two languages Ukrainian and English.'}
        </p>

        {value && (
          <div className="mt-4">
            <p className="text-xs text-gray-500">
              {lang === 'ua' ? 'Ви можете замовити пустий шаблон документу.' : 'You can choose empty example of document.'}
            </p>
            <label className={'text-main-black mb-1 block text-sm font-medium'}>
              {lang === 'ua' ? 'Введіть email, для відправки пустого шаблону' : 'Enter email, for sending empty example'}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                e.preventDefault();
                setEmail(e.currentTarget.value);
              }}
              className={cn(
                'border-btn-border-color focus:ring-link-btn-text focus:border-link-btn-text mt-1 block w-full max-w-xs rounded-md border bg-white px-3 py-2 pr-10 focus:outline-none sm:text-sm',
                {
                  'border-red-500': isError,
                },
              )}
            />
            {isError && <p className="mt-1 text-sm text-red-600">{lang === 'ua' ? 'введіть валідний email' : 'enter valid email'}</p>}
            {!isError && email && (
              <Button
                onClick={() => {
                  if (handelGetEmptyExample) {
                    handelGetEmptyExample(value as DOCUMENT_TYPE, email, lang as 'ua' | 'en');
                  }
                  setEmail('');
                }}
              >
                {lang === 'ua' ? 'Згенерувати пустий шаблон' : 'Generat empty example'}
              </Button>
            )}
          </div>
        )}
      </div>
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
