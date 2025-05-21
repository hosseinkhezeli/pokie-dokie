import { HTMLAttributes, useMemo } from 'react';

type TDividerProps = HTMLAttributes<HTMLDivElement> & {
  fullWidth?: boolean;
  children?: any;
  orientation?: 'horizontal' | 'vertical';
};

export function Divider({
                          fullWidth = false,
                          children,
                          orientation = 'horizontal',
                          ...props
                        }: TDividerProps) {
  const orientationClassNames = useMemo(() => {
    if (orientation === 'horizontal') {
      if (fullWidth) return 'w-full min-h-[1px]';
      return 'w-2/4 min-h-[1px]';
    } else {
      if (fullWidth) return 'h-full min-w-[1px]';
      return 'h-2/4 min-w-[1px]';
    }
  }, [fullWidth, orientation]);

  if (children)
    return (
      <span
        aria-hidden="true"
        className={`flex items-center gap-2 ${orientation === 'vertical' && 'flex-col'}`}
      >
        <span
          aria-hidden="true"
          {...props}
          className={`flex bg-border-disabled ${props.className ?? ''} ${orientationClassNames} `}
        />
        {children}
        <span
          aria-hidden="true"
          {...props}
          className={`flex bg-border-disabled ${props.className ?? ''} ${orientationClassNames} `}
        />
      </span>
    );
  return (
    <span
      aria-hidden="true"
      {...props}
      className={`flex bg-border-disabled ${props.className ?? ''} ${orientationClassNames} `}
    />
  );
}
