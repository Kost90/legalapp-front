'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

import { cn } from '@/utils/cn';
import { useAuthTabs } from './context';

const tabs = [
  {
    labelEn: 'Log in',
    labelUa: 'Увійти',
    href: '/auth/login',
  },
  {
    labelEn: 'Sign up',
    labelUa: 'Реєстрація',
    href: '/auth/signup',
  },
];

export default function AuthTabs({ lang }: { lang: string }) {
  const { hideTabs } = useAuthTabs();
  const pathname = usePathname();

  if (hideTabs) return null;

  const langPrefix = `/${lang}`;
  const pathnameWithoutLang = pathname.startsWith(langPrefix) ? pathname.slice(langPrefix.length) : pathname;
  const activeTab = tabs.find((tab) => tab.href === pathnameWithoutLang);

  return (
    <div className="flex w-full items-center justify-between mx-auto max-w-md px-5 pt-5 border-b border-muted-text relative">
      {tabs.map((tab, index) => {
        const isActive = tab === activeTab;
        return (
          <div key={tab.href} className="flex-1 text-center relative">
            <Link href={`/${lang}${tab.href}`} className="inline-block">
              <div className="flex flex-col items-center pb-2">
                <span
                  className={cn(
                    'text-xl font-semibold transition-colors duration-300',
                    isActive ? 'text-main-black' : 'text-link-btn-text',
                  )}
                >
                  {lang === 'ua' ? tab.labelUa : tab.labelEn}
                </span>

                {isActive && (
                  <motion.div
                    layoutId="underline"
                    className="h-[2px] w-10 bg-main-black mt-1 rounded-full"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </div>
            </Link>

            {index < tabs.length - 1 && <div className="absolute top-1/2 right-0 transform -translate-y-1/2 h-6 w-px bg-muted-text" />}
          </div>
        );
      })}
    </div>
  );
}
