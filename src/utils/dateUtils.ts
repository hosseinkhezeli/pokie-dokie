import { numberToPersianNumber, persianNumberToNumber } from './methods';

export type PersianDate = {
  year: string;
  month: string;
  day: string;
  weekDay: string;
  time: string;
};

export function toPersianDate(date: Date | string): PersianDate {
  const d = new Date(date);

  const formatter = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  const parts = formatter.formatToParts(d);

  const year = persianNumberToNumber(
    parts.find((p) => p.type === 'year')?.value || '0'
  );
  const day = persianNumberToNumber(
    parts.find((p) => p.type === 'day')?.value || '0'
  );
  const month = parts.find((p) => p.type === 'month')?.value || '';
  const weekDay = parts.find((p) => p.type === 'weekday')?.value || '';
  const time = d.toLocaleTimeString('fa-IR', {
    hour12: false,
    timeStyle: 'short',
  });

  return {
    year: numberToPersianNumber(year),
    month,
    day: numberToPersianNumber(day),
    weekDay,
    time,
  };
}
