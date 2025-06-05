'use client';

import { cn } from '@/utils/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
        `block px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2  hover:bg-gray-700 hover:text-white lg:inline-block`,
        className,
        {
          // 'bg-gray-900 text-white': isActive,
          'bg-blue-500 px-3 py-1': variant === HEADER_NAV_VARIANTS.BUTTON,
          'text-primary': variant === HEADER_NAV_VARIANTS.INLINE,
        },
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {icon && <span className="mr-2 inline-flex items-center">{icon}</span>}
      {label}
    </Link>
  );
}
