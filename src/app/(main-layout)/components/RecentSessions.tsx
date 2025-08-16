'use client';
import { RecentSessionCard } from '@/components/session/RecentSessionCard';
import { Card } from '@/components/ui/card/Card';
import { PokerCardsIcon } from '@/lib/icons/PokerCards';
import { useGetRecentSession } from '@/services/api/session/hooks';

export function RecentSessions() {
  const { data: sessionRes } = useGetRecentSession();
  const sessions = sessionRes?.data;
  return (
    <Card className='2xl:!max-w-1/3 w-full !max-w-full items-center 2xl:items-start flex 2xl:flex-col gap-4 animate-slide-in'>
      <Header />
      <ul className='flex  w-full 2xl:flex-col gap-3 grow'>
        {sessions?.map((session) => (
          <RecentSessionCard key={session.id} session={session} />
        ))}
      </ul>
    </Card>
  );
}

function Header() {
  return (
    <h3 className='text-title-lg font-black inline-flex gap-2'>
      نشست‌های اخیر
      <PokerCardsIcon fill='currentColor' width='32px' height='32px' />
    </h3>
  );
}
