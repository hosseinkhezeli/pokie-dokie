import React, { HTMLAttributes, ReactNode, useMemo } from 'react';

export type IBadgeProps = HTMLAttributes<HTMLDivElement> & {
  icon?: ReactNode;
  dot?: boolean;
  offset?: [number | string, number | string];
  status?:
    | 'success'
    | 'processing'
    | 'default'
    | 'error'
    | 'warning'
    | 'primary';
  bypass?: boolean;
  containerClassName?: string;
};

export function Badge({
  icon,
  dot,
  children,
  offset,
  status = 'default',
  bypass = false,
  containerClassName,
  className = '',
  ...props
}: IBadgeProps) {
  const badgeColor = useMemo(() => {
    switch (status) {
      case 'default':
        return 'bg-error';
      case 'primary':
        return 'bg-primary text-white';
      default:
        return 'bg-text-4';
    }
  }, [status]);
  if (bypass) return children;
  return (
    <span {...props} className={`relative w-full h-auto ${containerClassName}`}>
      {children}
      <span
        className={`absolute rounded-full flex justify-center items-center ${badgeColor} ${dot ? 'w-2 h-2' : ''}  ${className ?? ''}`}
        style={{ top: offset?.[0] ?? 8, right: offset?.[1] ?? 8 }}
      >
        {icon}
      </span>
    </span>
  );
}
