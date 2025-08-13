import { toPersianDate } from '@/utils/dateUtils';

export function DateDisplayCard({ date }: { date: string | Date }) {
  const { weekDay, day, month, year } = toPersianDate(date) ?? {};
  return (
    <div className='bg-surface rounded-2xl flex flex-col items-center border border-surface-dim h-min w-max min-w-16 p-2'>
      <span className='text-primary text-title-sm font-bold pointer-events-none select-none'>
        {day}{' '}
        <span className='text-primary text-body-sm font-bold pointer-events-none select-none'>
          {month}
        </span>
      </span>

      <span className='inline-flex flex-col items-center text-on-surface text-body-sm pointer-events-none select-none'>
        <span>{year}</span>

        <span className='text-on-surface text-body-sm pointer-events-none select-none'>
          {weekDay}
        </span>
      </span>
    </div>
  );
}
