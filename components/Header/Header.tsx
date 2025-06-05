'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

import { useDevice } from '@/context/DeviceProvider';
import HeaderNavItem from './HeaderNavItem/HeaderNavItem';
import Logo from './Logo/Logo';
import { Menu, X } from 'lucide-react';
import { SiteContent } from '@/types/dictionaries';
import Button from '../Button/Button';
import { MenuVariants } from './animation-variants';

export type NavItemType = {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export default function Header({ lang, params }: { lang: SiteContent; params: string }) {
  const deviceContext = useDevice();
  const [isClient, setIsClient] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isDesktop = isClient && deviceContext.isLg === true;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const pathname = usePathname();
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // TODO: Change for real and add button for changing lang
  const navItems: NavItemType[] = [
    { label: lang.header.button_consultation, href: `/${params}` },
    { label: lang.header.nav_contacts, href: `/${params}` },
    { label: lang.header.button_generate, href: `/${params}` },
  ];

  return (
    <header className="bg-gray-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          {isClient && isDesktop && (
            <nav className="hidden lg:flex lg:space-x-4">
              {navItems.map((item) => (
                <HeaderNavItem key={`${item.href}${item.label}`} href={item.href} label={item.label} />
              ))}
              <div className="flex flex-row items-center">
                <HeaderNavItem href="/ua" className={params === 'ua' ? 'text-accent' : 'text-gray-300'} label="UA" />

                <div className="h-6 w-[1px] bg-white" />
                <HeaderNavItem href="/en" className={params === 'en' ? 'text-accent' : 'text-gray-300'} label="EN" />
              </div>
            </nav>
          )}

          {isClient && !isDesktop && (
            <div className="lg:hidden">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
                aria-label={isMobileMenuOpen ? 'Закрити головне меню' : 'Відкрити головне меню'}
              >
                <span className="sr-only">{isMobileMenuOpen ? 'Закрити меню' : 'Відкрити меню'}</span>
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {!isDesktop && isClient && isMobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={MenuVariants}
            className="lg:hidden absolute w-full bg-gray-800 shadow-lg mx-auto flex flex-col"
            id="mobile-menu"
          >
            <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <HeaderNavItem
                  key={`${item.href}${item.label}`}
                  href={item.href}
                  label={item.label}
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              ))}
              <div className="flex flex-row items-center">
                <HeaderNavItem href="/ua" className={params === 'ua' ? 'text-accent' : 'text-gray-300'} label="UA" />

                <div className="h-6 w-[1px] bg-white" />
                <HeaderNavItem href="/en" className={params === 'en' ? 'text-accent' : 'text-gray-300'} label="EN" />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
