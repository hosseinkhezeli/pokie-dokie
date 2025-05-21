import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'contained' | 'outlined';
}

const Button: React.FC<ButtonProps> = ({
  variant = 'contained',
  children,
  ...props
}) => {
  const baseClasses = ' flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold transition-all min-w-24 active:scale-[99%]';
  const containedClasses = 'bg-primary text-on-primary hover:brightness-110';
  const outlinedClasses =
    'border outline-[1px] outline-transparent border-primary-40 text-primary-40 hover:bg-primary-10 bg-transparent hover:outline-primary ';

  return (
    <button
      {...props}
      className={`${baseClasses}  ${variant === 'contained' ? containedClasses : outlinedClasses} ${props.className}`}
  
    >
      {children}
    </button>
  );
};

export default Button;
