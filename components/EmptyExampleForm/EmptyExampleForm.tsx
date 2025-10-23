'use client';
import { FC, useEffect, useState } from 'react';

import Button from '@/components/ui/button/Button';
import { DOCUMENT_TYPE } from '@/lib/constants/common-documents';
import { cn } from '@/utils/cn';

interface EmptyExampleFormProps {
  lang: 'ua' | 'en';
  documentType: DOCUMENT_TYPE | string;
  onGetEmptyExample: (documentType: DOCUMENT_TYPE, email: string, textLang: 'ua' | 'en') => void;
}

const isValidEmail = (email: string) => {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
};

const EmptyExampleForm: FC<EmptyExampleFormProps> = ({ lang, documentType, onGetEmptyExample }) => {
  const [email, setEmail] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (!email) {
        setIsError(false);
      } else {
        setIsError(!isValidEmail(email));
      }
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [email]);

  const handleSubmit = () => {
    if (isError || !email) return;

    onGetEmptyExample(documentType as DOCUMENT_TYPE, email, lang);
    setEmail('');
  };

  return (
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
        <Button onClick={handleSubmit} className="mt-2">
          {lang === 'ua' ? 'Згенерувати пустий шаблон' : 'Generat empty example'}
        </Button>
      )}
    </div>
  );
};

export default EmptyExampleForm;
