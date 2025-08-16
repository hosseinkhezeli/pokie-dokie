'use client';

import React from 'react';
import { ParticipantState, Role } from '@/types/session.types';
import { IUser } from '@/types/user.types';
import { Avatar } from './ui/avatar/Avatar';

type Props = {
  user: IUser;
  state?: ParticipantState;
};

const RoleBadge = ({ role }: { role?: Role }) => {
  if (!role || role === 'guest') return null;
  const label = 'میزبان';
  return (
    <span
      className='px-1.5 py-0.5 rounded text-[11px] font-medium bg-neutral-100 text-neutral-900 border border-neutral-200'
      aria-label={label}
    >
      {label}
    </span>
  );
};

export function ParticipantCard({ user, state }: Props) {
  const { role = 'guest' } = state || {};

  return (
    <div
      className={[
        'flex items-center gap-3',
        'px-3 py-2 rounded-lg',
        'hover:bg-primary-container',
        'transition-colors',
      ].join(' ')}
      role='listitem'
    >
      {/* Avatar */}
      <Avatar name={user.fullName} email={user.email} />

      {/* Main text */}
      <div className='min-w-0'>
        <div className='flex items-center gap-2'>
          <button className='text-body-md text-on-surface truncate'>
            {user.fullName}
          </button>
          <RoleBadge role={role} />
        </div>

        <div className='text-body-sm text-outline truncate'>{user.email}</div>
      </div>
    </div>
  );
}
