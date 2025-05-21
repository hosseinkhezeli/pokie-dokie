'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { NavigationItem } from './NavigationItem';

export interface INavItem {
  label: string;
  activeIcon: React.ReactNode;
  icon: React.ReactNode;
  href: string;
}

export interface IBottomNavigationProps {
  items: INavItem[];
}

const BottomNavigation: React.FC<IBottomNavigationProps> = ({ items }) => {
  const pathname = usePathname();

  return (
    <nav
      aria-label='Bottom navigation'
      className={` min-h-20 max-h-20 pt-3 pb-4 fixed bg-surface bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-min  rounded-full flex justify-between px-4 `}
    >
      {items.map(({ label, icon, href, activeIcon }) => {
        const isActive = pathname === href;

        return (
          <NavigationItem
            activeIcon={activeIcon}
            href={href}
            icon={icon}
            isActive={isActive}
            label={label}
            key={href}
          />
        );
      })}
    </nav>
  );
};

export default BottomNavigation;
