'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

import { cn } from '@/utils/cn';
import { useUser } from '@/context/user/UserProvider.client';
import { useEffect, useState } from 'react';

const tabs = [
  {
    labelEn: 'Generate documents',
    labelUa: 'Згенерувати документ',
    href: '/dashboard/generate',
  },
  {
    labelEn: 'Your documents',
    labelUa: 'Ваші документи',
    href: '/dashboard/documents',
  },
];

export default function DashboardTabs({ lang }: { lang: string }) {
  const [userId, setUserId] = useState('');
  const pathname = usePathname();
  const { user } = useUser();

  const langPrefix = `/${lang}`;
  const pathnameWithoutLang = pathname.startsWith(langPrefix) ? pathname.slice(langPrefix.length) : pathname;
  const activeTab = tabs.find((tab) => tab.href === pathnameWithoutLang);

  useEffect(() => {
    setUserId(user.data.id);
  }, [user]);

  return (
    <div className="flex w-full items-center justify-between mx-auto max-w-md px-5 pt-5 border-b border-muted-text relative">
      {tabs.map((tab, index) => {
        const isActive = tab === activeTab;
        return (
          <div key={tab.href} className="flex-1 text-center relative">
            <Link href={`/${lang}/${userId}/${tab.href}`} className="inline-block">
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
