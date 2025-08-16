'use client';
import { IStory, TStoryStatus } from '@/types/story.type';
import React from 'react';

type Props = {
  story: IStory;
  onOpen?: (id: number) => void;
  onReveal?: (id: number) => void;
  onClose?: (id: number) => void;
  onSkip?: (id: number) => void;
};

const statusColors: Record<TStoryStatus, string> = {
  PENDING: 'bg-primary-container',
  OPEN: 'bg-tertiary text-on-tertiary',
  REVEALED: 'bg-primary text-on-primary',
  CLOSED: 'bg-primary text-on-primary',
  SKIPPED: 'bg-outline text-on-primary',
};

const statusAppearances: Record<TStoryStatus, string> = {
  PENDING: 'bg-surface-bright',
  OPEN: 'bg-tertiary-container',
  REVEALED: 'bg-surface-bright opacity-70',
  CLOSED: 'bg-primary-container opacity-70',
  SKIPPED: 'bg-surface-dim opacity-70',
};

const statusLabel: Record<TStoryStatus, string> = {
  PENDING: 'در انتظار بررسی',
  OPEN: 'در حال بررسی',
  REVEALED: 'نمایش داده شده',
  CLOSED: 'بسته شده',
  SKIPPED: 'رد شده',
};

export function StoryItemCard({
  story,
  //   onOpen,
  //   onReveal,
  //   onClose,
  //   onSkip,
}: Props) {
  const { title, description, status, finalEstimate } = story;

  return (
    <div
      className={`${statusAppearances[status]} rounded-2xl border border-transparent   p-4  flex flex-col gap-3 hover:border-primary-container transition`}
      role='listitem'
    >
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h3 className='text-body-md font-medium text-on-surface truncate'>
          {title}
        </h3>
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${statusColors[status]}`}
        >
          {statusLabel[status]}
        </span>
      </div>

      {description && (
        <p className='text-body-sm text-outline line-clamp-2'>{description}</p>
      )}

      {/* Footer */}
      <div className='flex items-center justify-between text-xs text-overline'>
        {status === 'REVEALED' || status === 'CLOSED' ? (
          <span className='font-medium text-on-surface'>
            تخمین: {Number(finalEstimate).toLocaleString('fa-IR') ?? '—'}
          </span>
        ) : null}
      </div>
    </div>
  );
}
