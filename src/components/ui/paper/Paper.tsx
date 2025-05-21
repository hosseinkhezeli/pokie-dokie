import { ReactNode } from 'react';

export function Paper({
  children,
  className = '',
  wrapperClassName = '',
}: {
  children: ReactNode;
  className?: string;
  wrapperClassName?: string;
}) {
  return (
    <section className={`grow overflow-hidden ${wrapperClassName}`}>
      <div
        className={`bg-background-lowest overflow-hidden grow rounded-xl p-6 h-full max-h-[calc(100vh-100px)] ${className}`}
      >
        {children}
      </div>
    </section>
  );
}
