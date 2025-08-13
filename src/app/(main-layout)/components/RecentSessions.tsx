'use client';
import { RecentSessionCard } from '@/components/session/RecentSessionCard';
import { Card } from '@/components/ui/card/Card';
import { PokerCardsIcon } from '@/lib/icons/PokerCards';
import { useGetRecentSession } from '@/services/api/session/hooks';

export function RecentSessions() {
  const { data: sessionRes } = useGetRecentSession();
  const sessions = sessionRes?.data;
  return (
    <Card className='!max-w-1/3 flex flex-col gap-4 animate-slide-in'>
      <Header />
      <ul className='flex flex-col gap-3'>
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

