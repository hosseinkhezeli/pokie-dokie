import { ChevronRightIcon } from '@/lib/icons/ChevronRight';
import { DateDisplayCard } from '../ui/date-display/DateDisplayCard';
import { TeamIcon } from '@/lib/icons/Team';
import { ClockIcon } from '@/lib/icons/Clock';
import { toPersianDate } from '@/utils/dateUtils';
import Link from 'next/link';
import { appRoutes } from '@/config/appRoutes';
import { TSession } from '@/types/session.types';

export function RecentSessionCard({ session }: { session: TSession }) {
  const isActive = session.active;

  return (
    <li
      className={`group relative w-full border rounded-2xl flex justify-end overflow-hidden ${
        isActive
          ? 'bg-primary-fixed-dim border-primary-container'
          : 'border-surface-dim brightness-95 opacity-60'
      }`}
    >
      <div
        className={`flex z-10 pl-2 pr-3 py-2 rounded-xl gap-1 transition-all ${
          isActive
            ? 'w-[98%] bg-primary-fixed group-hover:w-[80%]'
            : 'w-full bg-surface'
        }`}
      >
        <SessionInfo session={session} />
        <DateDisplayCard date={session.createdAt} />
      </div>

      <Link
        href={appRoutes.session.sessionById(String(session.id))}
        aria-label={`ورود به جلسه ${session.name}`}
        className='flex text-primary items-center transition-all absolute top-1/2 right-3/4 text-body-sm font-black -translate-y-1/2 translate-x-full group-hover:right-0 group-hover:translate-x-0 cursor-pointer'
      >
        <ChevronRightIcon fill='currentColor' />
        ورود
      </Link>
    </li>
  );
}

function SessionInfo({ session }) {
  return (
    <div className='grow flex flex-col gap-1 overflow-hidden'>
      <p className='text-title-sm font-black truncate'>{session.name}</p>
      <p className='text-body-sm font-medium grow'>{session.owner.fullName}</p>
      <div className='flex justify-between'>
        <span className='text-body-sm inline-flex items-center gap-1'>
          {session.participants?.length?.toLocaleString('fa-IR')}
          <TeamIcon
            fill='currentColor'
            width='18'
            height='18'
            className='opacity-50'
          />
        </span>
        <span className='text-body-sm inline-flex items-center gap-1'>
          {toPersianDate(session.createdAt).time}
          <ClockIcon
            fill='currentColor'
            width='18'
            height='18'
            className='opacity-50'
          />
        </span>
      </div>
    </div>
  );
}
