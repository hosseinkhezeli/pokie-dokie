'use client';
import { MedLogo } from '@/components/MedLogo';
import { Divider } from '@/components/ui/divider/Divider';
import { mockUserData } from '@/data/mockUserData';
import { SidebarItem } from '@/components/ui/sidebar/SidebarItem';
import { appRoutes } from '@/configs/appRoutes';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export function Sidebar() {
  const sidebarOptions = appRoutes?.filter((item) => item.id !== 'profile');
  const [activeState, setActiveState] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/') {
      setActiveState('/dashboard');
    } else {
      const location = pathname?.split('/')[1];
      setActiveState(`/${location}`);
    }
  }, [pathname]);

  const getBadgeState = useCallback((id: string) => {
    return false;
    // return id === 'chats';
  }, []);

  return (
    <aside className='med-sidebar'>
      <MedLogo />
      <Divider fullWidth />
      <h3 className={'text-titleLg min-h-10 flex items-center'}>
        {mockUserData?.pharmacyName}
      </h3>
      <nav className='flex flex-col gap-4'>
        {sidebarOptions?.map((route) => {
          return (
            <SidebarItem
              href={route?.href}
              title={route?.title}
              key={route?.id}
              isActive={activeState === route.href}
              hasBadge={getBadgeState(route.id)}
            />
          );
        })}
      </nav>
    </aside>
  );
}
