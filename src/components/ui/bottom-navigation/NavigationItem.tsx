import Link, { useLinkStatus } from 'next/link';
import { INavItem } from './BottomNavigation';
import { ReactNode } from 'react';

export default function LoadingHandler({ children }: { children: ReactNode }) {
  const { pending } = useLinkStatus();

  return pending ? (
    <div
      role='status'
      aria-label='Loading'
      className=' opacity-50 scale-95 flex gap-1 flex-col justify-center items-center pointer-events-none select-none '
    >
      {children}
    </div>
  ) : (
    <>{children}</>
  );
}

export function NavigationItem({
  href,
  isActive,
  activeIcon,
  icon,
  label,
}: INavItem & { href: string; isActive: boolean }) {
  return (
    <Link
      href={href}
      prefetch={false}
      aria-current={isActive ? 'page' : undefined}
      className={`transition-all active:scale-95 flex min-w-28 max-w-28 flex-col items-center justify-center gap-1 rounded-full
              ${isActive ? 'text-primary ' : 'text-on-surface'}`}
    >
      <LoadingHandler>
        <div
          className={`transition-all min-w-16 px-4 py-[2px] rounded-full mx-auto flex justify-center  ${isActive ? 'bg-primary-container hover:bg-primary-container/90' : 'fill-on-surface -variant hover:bg-primary-container/20'}`}
        >
          {isActive ? activeIcon : icon}
        </div>
        <span
          className={`transition-all text-label-lg select-none ${isActive && 'font-semibold'}`}
        >
          {label}
        </span>
      </LoadingHandler>
    </Link>
  );
}
