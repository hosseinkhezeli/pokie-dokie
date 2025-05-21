'use client';

import BottomNavigation from '@/components/ui/bottom-navigation/BottomNavigation';
import { appRoutes } from '@/config/appRoutes';
import { HomeIcon } from '@/lib/icons/Home';
import { HomeFillIcon } from '@/lib/icons/HomeFill';
import { InfoIcon } from '@/lib/icons/Info';
import { InfoFillIcon } from '@/lib/icons/InfoFill';
import { LogIcon } from '@/lib/icons/Log';
import { LogFillIcon } from '@/lib/icons/LogFill';
import { PokerChipIcon } from '@/lib/icons/PokerChip';
import { PokerChipFillIcon } from '@/lib/icons/PokerChipFill';
import { SettingIcon } from '@/lib/icons/Setting';
import { SettingFillIcon } from '@/lib/icons/SettingFill';
import { TeamIcon } from '@/lib/icons/Team';
import { TeamFillIcon } from '@/lib/icons/TeamFill';

const navItems = [
  {
    label: 'خانه',
    icon: <HomeIcon fill='inherit' />,
    activeIcon: <HomeFillIcon fill='inherit' />,
    href: appRoutes.home,
  },
  {
    label: 'نشست های فعال',
    activeIcon: <PokerChipFillIcon fill='inherit' />,
    icon: <PokerChipIcon fill='inherit' />,
    href: appRoutes['active-session'],
  },
  {
    label: 'تاریخچه',
    icon: <LogIcon fill='inherit' />,
    activeIcon: <LogFillIcon fill='inherit' />,
    href: appRoutes.history,
  },
  {
    label: 'تیم ها',
    icon: <TeamIcon fill='inherit' />,
    activeIcon: <TeamFillIcon fill='inherit' />,
    href: appRoutes.team,
  },
  {
    label: 'تنظیمات',
    icon: <SettingIcon fill='inherit' />,
    activeIcon: <SettingFillIcon fill='inherit' />,
    href: appRoutes.setting,
  },
  {
    label: 'اطلاعات بیشتر',
    icon: <InfoIcon fill='inherit' />,
    activeIcon: <InfoFillIcon fill='inherit' />,
    href: appRoutes.help,
  },
];

export default function SessionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className='bg-surface-dim min-h-screen'>{children}</main>
      <BottomNavigation items={navItems} />
    </>
  );
}
