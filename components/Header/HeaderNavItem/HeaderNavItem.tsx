'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/utils/cn';

import { HEADER_NAV_VARIANTS } from './variants';

interface HeaderNavItemProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: HEADER_NAV_VARIANTS;
}

export default function HeaderNavItem({ href, label, icon, onClick, className, variant }: HeaderNavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href) && href.length > 1);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        `text-text-main-black hover:bg-background-blue-lighter hover:text-text-blue-extra-ligth block rounded-md px-3 py-2 text-sm font-medium transition-colors focus:ring-2 focus:outline-none lg:inline-block`,
        className,
        {
          'border-border-border-grey hover:border-main-black border bg-transparent px-3 py-1': variant === HEADER_NAV_VARIANTS.BUTTON,
          'bg-main-black !text-white hover:!bg-black': variant === HEADER_NAV_VARIANTS.BLACKBUTTON,
          'text-blue': variant === HEADER_NAV_VARIANTS.INLINE,
        },
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {icon && <span className="mr-2 inline-flex items-center">{icon}</span>}
      {label}
    </Link>
  );
}
