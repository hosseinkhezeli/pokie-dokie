import { ReactNode } from 'react';

export function Card({
  children,
  className='',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`max-w-md w-full h-full max-h-max bg-surface rounded-3xl p-8 ${className}`}
    >
      {children}
    </div>
  );
}
