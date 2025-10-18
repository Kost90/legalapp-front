'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef, RefObject } from 'react';

import Button from '@/components/Button/Button';
import LanguageSwitcher from '@/components/LanguagesSwitcher/LanguagesSwitcher';
import { useAuth } from '@/context/AuthProvider';
import { useDevice } from '@/context/DeviceProvider';
import { useHeaderTheme } from '@/hooks/useHeaderTheme';
import { useScrollPosition } from '@/hooks/useScrollPosition.ts';
import { SiteContent } from '@/types/dictionaries';

import { MenuVariants } from './animation-variants';
// import HeaderNavItem from './HeaderNavItem/HeaderNavItem';
import Logo from './Logo/Logo';

export type NavItemType = {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export default function DashboardHeader({ lang, params }: { lang: SiteContent; params: string }) {
  const deviceContext = useDevice();
  const { isAuthenticated, logout } = useAuth();
  const isScrolled = useScrollPosition();
  const headerRef = useRef<HTMLElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useHeaderTheme(headerRef as RefObject<HTMLElement>);

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
  //   const navItems: NavItemType[] = [
  //     { label: lang.header.button_consultation, href: `/${params}` },
  //     { label: lang.header.nav_contacts, href: `/${params}` },
  //   ];

  return (
    <header
      ref={headerRef}
      data-theme="light"
      className={clsx(
        'sticky top-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled ? 'shadow-md backdrop-blur-sm' : '',
        'data-[theme=light]:text-text-main-black data-[theme=light]:bg-white/80',
        'data-[theme=dark]:bg-gray-900/80 data-[theme=dark]:text-white',
        !isScrolled && 'bg-transparent',
      )}
    >
      <div
        className={clsx(
          'container mx-auto transition-all duration-300 ease-in-out',
          isDesktop && isScrolled ? 'px-8 lg:px-16' : 'px-4 sm:px-6 lg:px-8',
        )}
      >
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Logo lang={params} />
          </div>

          {/* Desktop Navigation */}
          {isClient && isDesktop && (
            <nav className="hidden lg:flex lg:space-x-4">
              {/* {navItems.map((item, i) => (
                <HeaderNavItem key={`${item.href}+${i}`} href={item.href} label={item.label} />
              ))} */}
              {lang.header.login && isAuthenticated && (
                <Button onClick={logout} type="black">
                  {lang.header.logout}
                </Button>
              )}

              <LanguageSwitcher currentLang={params} specialKey={'desc'} />
            </nav>
          )}

          {isClient && !isDesktop && (
            <div className="lg:hidden">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset"
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
            className="bg-bg-primary absolute mx-auto flex w-full flex-col border-b-2 py-8 lg:hidden"
            id="mobile-menu"
          >
            <nav className="mx-auto flex flex-col items-center justify-center gap-1 space-y-1 px-2 pt-2 pb-3 sm:px-3">
              {/* {navItems.map((item, i) => (
                <HeaderNavItem key={`${item.href}+${i}mob`} href={item.href} label={item.label} onClick={toggleMobileMenu} />
              ))} */}
              {lang.header.login && isAuthenticated && (
                <Button onClick={logout} type="black">
                  {lang.header.logout}
                </Button>
              )}

              <LanguageSwitcher currentLang={params} specialKey={'mob'} />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
