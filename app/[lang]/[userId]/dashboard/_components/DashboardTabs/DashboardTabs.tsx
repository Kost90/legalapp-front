'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useUser } from '@/context/user/UserProvider.client';
import { cn } from '@/utils/cn';

// TODO: Change for non sign in flow
const tabs = [
  { labelEn: 'Generate documents', labelUa: 'Згенерувати документ', href: '/dashboard/generate' },
  { labelEn: 'Your documents', labelUa: 'Ваші документи', href: '/dashboard/documents' },
];

export default function DashboardTabs({ lang }: { lang: string }) {
  const { user } = useUser();
  const pathname = usePathname();
  const langPrefix = `/${lang}`;
  const pathnameWithoutLang = pathname.startsWith(langPrefix) ? pathname.slice(langPrefix.length) : pathname;

  return (
    <div className="relative mx-auto flex w-full max-w-md justify-center px-5 pt-5">
      <div className="inline-flex flex-col items-center gap-x-6 gap-y-2 pb-2 sm:flex-row">
        {tabs.map((tab, index) => {
          const tabPath = `/${user.id}${tab.href}`;
          const isActive = pathnameWithoutLang === tabPath;

          return (
            <div key={tab.href} className="relative">
              <Link href={`/${lang}/${user.id}${tab.href}`} className="inline-block">
                <div className="flex flex-col items-center">
                  <span
                    className={cn(
                      'px-2.5 text-xl font-semibold whitespace-nowrap transition-colors duration-300',
                      isActive ? 'text-main-black' : 'text-muted-text',
                    )}
                  >
                    {lang === 'ua' ? tab.labelUa : tab.labelEn}
                  </span>

                  <div className="mt-1 h-[2px] w-full rounded-full">
                    {isActive && (
                      <motion.div
                        layoutId="underline"
                        className="bg-main-black mx-auto h-full w-1/2 rounded-full"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </div>
                </div>
              </Link>
              {index < tabs.length - 1 && (
                <div className="bg-muted-text absolute top-1/2 right-0 hidden h-6 w-px -translate-y-1/2 sm:block" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
