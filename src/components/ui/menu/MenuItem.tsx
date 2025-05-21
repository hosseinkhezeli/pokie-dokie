import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  MouseEvent,
  ReactNode,
} from 'react';

interface IMenuItemProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: string;
  icon?: ReactNode;
}

export type TActionMenuItems = {
  label: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  ariaLabel?: string;
  name: string;
  icon?: ReactNode;
};

export function MenuItem({
  children,
  icon,
  className,
  ...menuItemProps
}: IMenuItemProps): ReactNode {
  return (
    <button
      role={'menuitem'}
      id={'med-menu-item'}
      className={`btn-menu ${className}`}
      {...menuItemProps}
    >
      {icon}
      {children}
    </button>
  );
}
