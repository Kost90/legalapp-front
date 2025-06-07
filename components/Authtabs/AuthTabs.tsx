'use client';
import Link from 'next/link';
import { motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

import { cn } from '@/utils/cn';

import { useAuthTabs } from './context';

const MotionLink = motion(Link);

const tabs = [
  {
    label: 'Log in',
    href: '/auth/login',
  },
  {
    label: 'Sign up',
    href: '/auth/signup',
  },
];

export default function AuthTabs() {
  const { hideTabs } = useAuthTabs();
  const pathname = usePathname();

  if (hideTabs) {
    return null;
  }

  // TODO:Add here lang
  const activeTab = tabs.find((tab) => tab.href === pathname);

  return (
    <div className="flex w-full items-center justify-between mx-auto max-w-md">
      {tabs.map((tab, index) => (
        <Fragment key={tab.href}>
          <MotionLink
            className={cn('py-5 text-center relative block group font-semibold', {
              'text-link-btn-text': tab !== activeTab,
              'text-main-black pointer-events-none': tab === activeTab,
            })}
            href={tab.href}
          >
            {tab.label}
          </MotionLink>

          {index < tabs.length - 1 && (
            <div className="w-12 h-20 flex-center">
              <div className="w-1 h-8 bg-border-default" />
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
}
