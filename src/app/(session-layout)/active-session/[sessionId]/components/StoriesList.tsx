'use client';
import { StoryItemCard } from '@/components/StoryItemCard';
import { Card } from '@/components/ui/card/Card';
import { IStory } from '@/types/story.type';
import { useState } from 'react';
export function StoriesList() {
  const [collapse, setCollapse] = useState(false);
  const handleToggleCollapse = () => setCollapse((prev) => !prev);
  return (
    <Card
      className={`${collapse ? '!h-24' : '!h-[calc(100svh-204px)]'} transition-all !max-w-92 overflow-y-hidden gap-2 flex flex-col `}
    >
      <h3 className='text-title-lg font-black inline-flex justify-between w-full pb-6'>
        <span className='grow'>داستان‌ها </span>
        <button onClick={handleToggleCollapse}>{collapse ? '+' : '-'}</button>
      </h3>
      <div
        role='list'
        className={`gap-2 flex flex-col overflow-y-auto h-full transition-all ${collapse ? 'opacity-0' : 'opacity-100'}`}
      >
        {mockStoriesFa.map((story) => (
          <StoryItemCard
            key={story.id}
            story={story}
            onOpen={(id) => console.log('open', id)}
            onReveal={(id) => console.log('reveal', id)}
            onClose={(id) => console.log('close', id)}
            onSkip={(id) => console.log('skip', id)}
          />
        ))}
      </div>
    </Card>
  );
}

export const mockStoriesFa: IStory[] = [
  {
    id: 1,
    title: 'ورود با گوگل',
    description: 'کاربر بتواند با حساب گوگل وارد سیستم شود.',
    status: 'OPEN',
    sessionId: 101,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    orderIndex: 1,
  },
  {
    id: 2,
    title: 'ثبت‌نام با ایمیل',
    description: 'امکان ثبت‌نام با ایمیل و رمز عبور ایجاد شود.',
    status: 'PENDING',
    sessionId: 101,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    orderIndex: 2,
  },
  {
    id: 3,
    title: 'بازیابی رمز عبور',
    description: 'کاربر بتواند رمز عبور خود را بازیابی کند.',
    status: 'PENDING',
    finalEstimate: '5',
    sessionId: 101,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    orderIndex: 3,
  },
  {
    id: 4,
    title: 'آپلود تصویر پروفایل',
    description: 'کاربر عکس پروفایل آپلود کند.',
    status: 'PENDING',
    finalEstimate: '3',
    sessionId: 101,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    orderIndex: 4,
  },
  {
    id: 5,
    title: 'ویرایش پروفایل',
    description: 'کاربر اطلاعات شخصی خود را ویرایش کند.',
    status: 'PENDING',
    sessionId: 101,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    orderIndex: 5,
  },
  {
    id: 6,
    title: 'لیست وظایف',
    description: 'کاربر لیست کارهای خود را مشاهده کند.',
    status: 'PENDING',
    sessionId: 101,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    orderIndex: 6,
  },
  {
    id: 7,
    title: 'افزودن وظیفه جدید',
    description: 'امکان افزودن آیتم جدید به لیست کارها.',
    status: 'PENDING',
    finalEstimate: '8',
    sessionId: 101,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    orderIndex: 7,
  },
  {
    id: 8,
    title: 'حذف وظیفه',
    description: 'کاربر بتواند یک وظیفه را حذف کند.',
    status: 'PENDING',
    sessionId: 101,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    orderIndex: 8,
  },
  {
    id: 9,
    title: 'ویرایش وظیفه',
    description: 'کاربر وظایف خود را ویرایش کند.',
    status: 'PENDING',
    sessionId: 101,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    orderIndex: 9,
  },
  {
    id: 10,
    title: 'اعلان‌ها',
    description: 'سیستم نوتیفیکیشن برای وظایف مهم.',
    status: 'PENDING',
    finalEstimate: '13',
    sessionId: 101,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    orderIndex: 10,
  },
  {
    id: 11,
    title: 'جستجوی وظایف',
    description: 'امکان جستجو در لیست کارها.',
    status: 'PENDING',
    sessionId: 101,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    orderIndex: 11,
  },
  {
    id: 12,
    title: 'فیلتر وظایف',
    description: 'کاربر بتواند کارها را براساس وضعیت فیلتر کند.',
    status: 'PENDING',
    sessionId: 101,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    orderIndex: 12,
  },
  {
    id: 13,
    title: 'ثبت زمان انجام کار',
    description: 'امکان ثبت زمان صرف شده برای هر وظیفه.',
    status: 'PENDING',
    sessionId: 101,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    orderIndex: 13,
  },
  {
    id: 14,
    title: 'گزارش هفتگی',
    description: 'گزارش وظایف انجام شده در طول هفته.',
    status: 'PENDING',
    finalEstimate: '5',
    sessionId: 101,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    orderIndex: 14,
  },
  {
    id: 15,
    title: 'اتصال به تقویم گوگل',
    description: 'همگام‌سازی وظایف با Google Calendar.',
    status: 'CLOSED',
    finalEstimate: '8',
    sessionId: 101,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    orderIndex: 15,
  },
  {
    id: 16,
    title: 'چت گروهی',
    description: 'افزودن امکان گفتگو بین اعضای تیم.',
    status: 'CLOSED',
    finalEstimate: '8',
    sessionId: 101,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    orderIndex: 16,
  },
  {
    id: 17,
    title: 'ارسال فایل',
    description: 'امکان ارسال فایل در چت گروهی.',
    status: 'CLOSED',
    finalEstimate: '3',
    sessionId: 101,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    orderIndex: 17,
  },
  {
    id: 18,
    title: 'نمایش پروفایل اعضا',
    description: 'کاربر اطلاعات هم‌تیمی‌ها را ببیند.',
    status: 'CLOSED',
    finalEstimate: '8',
    sessionId: 101,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    orderIndex: 18,
  },
  {
    id: 19,
    title: 'سیستم امتیازدهی',
    description: 'کاربران بتوانند به وظایف امتیاز بدهند.',
    status: 'SKIPPED',
    sessionId: 101,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    orderIndex: 19,
  },
  {
    id: 20,
    title: 'داشبورد مدیریتی',
    description: 'نمای کلی از وضعیت پروژه برای مدیر تیم.',
    status: 'SKIPPED',
    finalEstimate: '20',
    sessionId: 101,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    orderIndex: 20,
  },
];
