import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'contained' | 'outlined';
}

const Button: React.FC<ButtonProps> = ({
  variant = 'contained',
  children,
  ...props
}) => {
  const baseClasses = 'px-6 py-3 rounded-full font-semibold transition-all ';
  const containedClasses = 'bg-primary text-on-primary hover:brightness-105';
  const outlinedClasses =
    'border border-primary-40 text-primary-40 hover:bg-primary-10 bg-transparent';

  return (
    <button
      {...props}
      className={`${baseClasses}  ${variant === 'contained' ? containedClasses : outlinedClasses}`}
    >
      {children}
    </button>
  );
};

export default Button;
