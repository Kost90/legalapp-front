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
        `hover:text-link-btn-text! block rounded-md px-3 py-2 text-sm font-medium transition-colors focus:ring-2 focus:outline-none lg:inline-block`,
        className,
        {
          // 'bg-gray-900 text-white': isActive,
          'text-link-btn-text border-btn-border-color hover:bg-base-btn-hover-bg hover:border-btn-hover-border bg-white px-3 py-1':
            variant === HEADER_NAV_VARIANTS.BUTTON,
          'text-link-btn-text': variant === HEADER_NAV_VARIANTS.INLINE,
        },
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {icon && <span className="mr-2 inline-flex items-center">{icon}</span>}
      {label}
    </Link>
  );
}
