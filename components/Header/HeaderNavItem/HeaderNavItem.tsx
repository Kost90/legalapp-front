'use client';

import { cn } from '@/utils/cn';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderNavItemProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function HeaderNavItem({ href, label, icon, onClick, className }: HeaderNavItemProps) {
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
          // isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
        },
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {icon && <span className="mr-2 inline-flex items-center">{icon}</span>}
      {label}
    </Link>
  );
}
