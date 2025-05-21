import Link from 'next/link';
import { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge/Badge';

type TSidebarItemProps = {
  title: ReactNode;
  href: string;
  hasBadge?: boolean;
  isActive?: boolean;
};

export function SidebarItem({
  title,
  href,
  hasBadge = false,
  isActive,
}: TSidebarItemProps) {
  return (
    <Badge dot={hasBadge} offset={['13%', '93%']}>
      <Link href={href}>
        <button
          className={`med-sidebar-item ${isActive && 'bg-icon-gray text-text-contrast hover:bg-text-primary'}`}
        >
          {title}
        </button>
      </Link>
    </Badge>
  );
}
