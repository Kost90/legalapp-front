'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

import LanguageSwitcher from '@/components/LanguagesSwitcher/LanguagesSwitcher';
import { useAuth } from '@/context/AuthProvider';
import { useDevice } from '@/context/DeviceProvider';
import { SiteContent } from '@/types/dictionaries';

import { MenuVariants } from './animation-variants';
import DashboardHeader from './DashboardHeader';
import HeaderNavItem from './HeaderNavItem/HeaderNavItem';
import { HEADER_NAV_VARIANTS } from './HeaderNavItem/variants';
import Logo from './Logo/Logo';

export type NavItemType = {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export default function Header({ lang, params }: { lang: SiteContent; params: string }) {
  const deviceContext = useDevice();
  const { isAuthenticated } = useAuth();
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

  if ((pathname.includes('dashboard') && isAuthenticated) || (!pathname.includes('dashboard') && isAuthenticated)) {
    return <DashboardHeader lang={lang} params={params} />;
  }

  // TODO: Change for real and add button for changing lang
  const navItems: NavItemType[] = [
    { label: lang.header.button_consultation, href: `/${params}` },
    { label: lang.header.nav_contacts, href: `/${params}` },
    { label: lang.header.button_generate, href: `/${params}/auth/login` },
  ];

  return (
    <header className="sticky top-0 z-50 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          {isClient && isDesktop && (
            <nav className="hidden lg:flex lg:space-x-4">
              {navItems.map((item, i) => (
                <HeaderNavItem key={`${item.href}+${i}`} href={item.href} label={item.label} />
              ))}
              {lang.header.login && !isAuthenticated && (
                <HeaderNavItem
                  key={`login-${params}desc`}
                  href={`/${params}/auth/login`}
                  label={lang.header.login}
                  variant={HEADER_NAV_VARIANTS.BLACKBUTTON}
                />
              )}

              <LanguageSwitcher currentLang={params} specialKey={'desc'} />
            </nav>
          )}

          {isClient && !isDesktop && (
            <div className="lg:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-text-main-black inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
                aria-label={isMobileMenuOpen ? 'Закрити головне меню' : 'Відкрити головне меню'}
              >
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
            className="bg-background-main-body absolute mx-auto flex w-full flex-col border-b-2 py-8 lg:hidden"
            id="mobile-menu"
          >
            <nav className="mx-auto flex flex-col items-center justify-center gap-1 space-y-1 px-2 pt-2 pb-3 sm:px-3">
              {navItems.map((item, i) => (
                <HeaderNavItem key={`${item.href}+${i}mob`} href={item.href} label={item.label} onClick={toggleMobileMenu} />
              ))}
              {lang.header.login && !isAuthenticated && (
                <HeaderNavItem
                  key={`login-${params}mob`}
                  href={`/${params}/auth/login`}
                  label={lang.header.login}
                  variant={HEADER_NAV_VARIANTS.BUTTON}
                  onClick={toggleMobileMenu}
                />
              )}

              <LanguageSwitcher currentLang={params} specialKey={'mob'} />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
