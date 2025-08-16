'use client';
import { ParticipantCard } from '@/components/ParticipantCard';
import { Card } from '@/components/ui/card/Card';
import { ParticipantState } from '@/types/session.types';
import { IUser } from '@/types/user.types';
import { useState } from 'react';
export function ParticipantsList() {
  const [collapse, setCollapse] = useState(false);
  const handleToggleCollapse = () => setCollapse((prev) => !prev);
  return (
    <Card
      className={`${collapse ? '!h-24' : '!h-[calc(100svh-204px)]'} transition-all !max-w-92 overflow-y-hidden gap-2 flex flex-col `}
    >
      <h3 className='text-title-lg font-black inline-flex justify-between w-full pb-6'>
        <span className='grow'>همنشین‌ها </span>
        <button onClick={handleToggleCollapse}>{collapse ? '+' : '-'}</button>
      </h3>
      <div
        role='list'
        className={`gap-2 flex flex-col overflow-y-auto h-full transition-all ${collapse ? 'opacity-0' : 'opacity-100'}`}
      >
        {mockUsersFa.map((u) => (
          <ParticipantCard key={u.id} user={u} state={mockStatesFa[u.id]} />
        ))}
      </div>
    </Card>
  );
}

export const mockUsersFa: IUser[] = [
  { id: 1, fullName: 'علی رضایی', email: 'ali.rezaei@example.com' },
  { id: 2, fullName: 'مینا محمدی', email: 'mina.mohammadi@example.com' },
  { id: 3, fullName: 'سارا احمدی', email: 'sara.ahmadi@example.com' },
  { id: 4, fullName: 'رضا کریمی', email: 'reza.karimi@example.com' },
  { id: 5, fullName: 'نگار شریفی', email: 'negar.sharifi@example.com' },
  // { id: 6, fullName: 'محمد جعفری', email: 'm.jafari@example.com' },
  // { id: 7, fullName: 'هانیه حسینی', email: 'haniyeh.hosseini@example.com' },
  // { id: 8, fullName: 'امیر نادری', email: 'amir.naderi@example.com' },
  // { id: 9, fullName: 'زهرا عباسی', email: 'zahra.abbasi@example.com' },
  // { id: 10, fullName: 'کیان نصیری', email: 'kian.nasiri@example.com' },
  // { id: 11, fullName: 'نرگس جلالی', email: 'narges.jalali@example.com' },
  // { id: 12, fullName: 'پویان قاسمی', email: 'pooyan.ghasemi@example.com' },
  // { id: 13, fullName: 'الهام رفیعی', email: 'elham.rafiei@example.com' },
  // { id: 14, fullName: 'شهاب مرادی', email: 'shahab.moradi@example.com' },
  // { id: 15, fullName: 'نازنین شمس', email: 'nazanin.shams@example.com' },
  // { id: 16, fullName: 'مهدی یوسفی', email: 'mehdi.yousefi@example.com' },
  // { id: 17, fullName: 'آرزو کاظمی', email: 'arezu.kazemi@example.com' },
  // { id: 18, fullName: 'حمید رحمانی', email: 'hamid.rahmani@example.com' },
  // { id: 19, fullName: 'سحر نوری', email: 'sahar.noori@example.com' },
  // { id: 20, fullName: 'حسین قاسمی', email: 'hossein.gh@example.com' },
];

export const mockStatesFa: Record<number, ParticipantState> = {
  1: { role: 'host' },
};
