import { ReactNode, useMemo } from 'react';

type TTabItemProps = {
  id: string;
  label: ReactNode;
  isActive: boolean;
  onClick: (id: string) => void;
};

export function TabItem({ id, label, isActive, onClick }: TTabItemProps) {
  const classNames = useMemo(() => {
    return isActive
      ? 'text-text-primary font-semibold'
      : 'text-text-disabled hover:text-text-primary transition-colors';
  }, [isActive]);

  return (
    <li className={'px-4'} role='presentation'>
      <button
        id={`tab-${id}`}
        role='tab'
        aria-selected={isActive}
        tabIndex={isActive ? 0 : -1}
        onClick={() => onClick(id)}
        className={`text-titleMd min-h-8 py-2 focus:outline-none rounded ${classNames}`}
        type='button'
      >
        {label}
      </button>
    </li>
  );
}
