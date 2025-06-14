'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useUser } from '@/context/user/UserProvider.client';
import { cn } from '@/utils/cn';

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
    <div className="flex w-full justify-center mx-auto max-w-md px-5 pt-5 relative">
      <div className="inline-flex gap-x-6 pb-2">
        {tabs.map((tab, index) => {
          const tabPath = `/${user.id}${tab.href}`;
          const isActive = pathnameWithoutLang === tabPath;

          return (
            <div key={tab.href} className="relative">
              <Link href={`/${lang}/${user.id}${tab.href}`} className="inline-block">
                <div className="flex flex-col items-center">
                  <span
                    className={cn(
                      'text-xl font-semibold transition-colors duration-300 whitespace-nowrap px-2.5',
                      isActive ? 'text-main-black' : 'text-link-btn-text',
                    )}
                  >
                    {lang === 'ua' ? tab.labelUa : tab.labelEn}
                  </span>

                  <div className="h-[2px] w-full mt-1 rounded-full">
                    {isActive && (
                      <motion.div
                        layoutId="underline"
                        className="h-full w-1/2 bg-main-black rounded-full mx-auto"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </div>
                </div>
              </Link>
              {index < tabs.length - 1 && <div className="absolute top-1/2 right-0 -translate-y-1/2 h-6 w-px bg-muted-text" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
