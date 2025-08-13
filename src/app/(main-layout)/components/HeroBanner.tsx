'use client';
import { useTransition } from 'react';
import Button from '@/components/ui/button/Button';
import { Card } from '@/components/ui/card/Card';
import { useQueryParams } from '@/hooks/useQueryParams';
import { SEARCH_PARAMS_KEYS } from '@/lib/consts';
import { EnterIcon } from '@/lib/icons/Enter';
import { PlusCircleIcon } from '@/lib/icons/PlusCircle';

export function HeroBanner() {
  const { addQueryParam } = useQueryParams();
  const [isPendingCreate, startTransitionCreate] = useTransition();
  const [isPendingJoin, startTransitionJoin] = useTransition();
  const handleOpenDialog = (mode: 'join' | 'create') => {
    if (mode === 'create') {
      startTransitionCreate(() => {
        addQueryParam(SEARCH_PARAMS_KEYS.dialogMode, mode);
      });
    } else {
      startTransitionJoin(() => {
        addQueryParam(SEARCH_PARAMS_KEYS.dialogMode, mode);
      });
    }
  };

  return (
    <Card className='!max-w-full flex flex-col gap-4 animate-slide-in'>
      <h2 className='text-display-md font-black'>شروع کنیم؟</h2>
      <p className='inline-flex flex-col gap-2 text-title-lg font-extrabold'>
        بیا تو جلسه پوکر پلنینگ!
        <span className='text-body-lg font-medium'>
          یا خودت یکی بساز تا با تیم‌ت کارهات رو تخمین بزنی. برنامه‌ریزی چابک رو
          هم جذاب و به‌صرفه کن.
        </span>
      </p>
      <div className='flex flex-row-reverse w-full gap-2'>
        <Button
          onClick={() => handleOpenDialog('create')}
          loading={isPendingCreate}
          endIcon={<PlusCircleIcon />}
        >
          نشست جدید بساز
        </Button>
        <Button
          variant='outlined'
          onClick={() => handleOpenDialog('join')}
          loading={isPendingJoin}
          endIcon={<EnterIcon fill='inherit' />}
        >
          ورود به نشست
        </Button>
      </div>
    </Card>
  );
}
