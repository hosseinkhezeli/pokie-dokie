import React, { ReactNode } from 'react';
import { Spinner } from '../loading-indicator/Spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'contained' | 'outlined';
  endIcon?: ReactNode;
  startIcon?: ReactNode;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'contained',
  startIcon,
  endIcon,
  loading,
  children,
  ...props
}) => {
  function getVariantClasses(variant: ButtonProps['variant']) {
    switch (variant) {
      case 'contained':
        return containedClasses;
      case 'outlined':
        return outlinedClasses;
    }
  }
  return (
    <button
      {...props}
      disabled={props.disabled || loading}
      className={`${baseClasses} ${getVariantClasses(variant)} ${props.className}`}
    >
      {!loading && startIcon}
      {children}
      {!loading && endIcon}
      {loading && <Spinner spinnerFill='inherit' />}
    </button>
  );
};

export default Button;

const baseClasses =
  ' flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold transition-all min-w-24 active:scale-[99%]';
const containedClasses =
  'bg-primary text-on-primary hover:brightness-110 disabled:opacity-30 disabled:pointer-events-none disabled:saturate-0 fill-on-primary';
const outlinedClasses =
  'border outline-[1px] outline-transparent border-primary-40 text-primary-40 hover:bg-primary-10 bg-transparent hover:outline-primary fill-primary-40';
