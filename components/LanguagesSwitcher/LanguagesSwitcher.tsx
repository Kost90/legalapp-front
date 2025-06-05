'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
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
            className={currentLang === lang.code ? 'text-accent font-semibold' : 'text-gray-300 hover:text-white'}
          />
          {index < supportedLanguages.length - 1 && <div className="h-4 w-[1px] bg-gray-400 mx-1" />}
        </React.Fragment>
      ))}
    </div>
  );
}
