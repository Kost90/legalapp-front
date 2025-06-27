'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
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
    <div className="border-muted-text relative mx-auto flex w-full max-w-md items-center justify-between border-b px-5 pt-5">
      {tabs.map((tab, index) => {
        const isActive = tab === activeTab;
        return (
          <div key={tab.href} className="relative flex-1 text-center">
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
                    className="bg-main-black mt-1 h-[2px] w-10 rounded-full"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </div>
            </Link>

            {index < tabs.length - 1 && <div className="bg-muted-text absolute top-1/2 right-0 h-6 w-px -translate-y-1/2 transform" />}
          </div>
        );
      })}
    </div>
  );
}
