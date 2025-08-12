'use client';

import { usePathname } from 'next/navigation';
// eslint-disable-next-line no-restricted-imports
import React from 'react';

import HeaderNavItem from '@/components/Header/HeaderNavItem/HeaderNavItem';

interface LanguageOption {
  code: string;
  label: string;
}

const supportedLanguages: LanguageOption[] = [
  { code: 'ua', label: 'UA' },
  { code: 'en', label: 'EN' },
];

interface LanguageSwitcherProps {
  currentLang: string;
  specialKey?: string;
}

export default function LanguageSwitcher({ currentLang, specialKey }: LanguageSwitcherProps) {
  const pathname = usePathname();

  const getLocalizedPath = (targetLang: string) => {
    const pathWithoutLang = pathname.startsWith(`/${currentLang}`) ? pathname.substring(`/${currentLang}`.length) : pathname;
    return `/${targetLang}${pathWithoutLang || '/'}`.replace(/\/\//g, '/');
  };

  return (
    <div className="flex flex-row items-center">
      {supportedLanguages.map((lang, index) => (
        <React.Fragment key={`${lang.code}${specialKey}${index}`}>
          <HeaderNavItem
            href={getLocalizedPath(lang.code)}
            label={lang.label}
            className={currentLang === lang.code ? 'text-orange! font-semibold' : 'text-text-blue-extra-ligth hover:text-black'}
          />
          {index < supportedLanguages.length - 1 && <div className="mx-1 h-4 w-[1px] bg-gray-400" />}
        </React.Fragment>
      ))}
    </div>
  );
}
