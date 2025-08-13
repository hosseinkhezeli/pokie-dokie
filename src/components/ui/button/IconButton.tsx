import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
} from 'react';

export type TIconButtonSizes = 'medium' | 'small';

interface IIconButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isLoading?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IIconButtonProps>(
  (
    {
      children,
      isLoading = false,
      className,
      type = 'button',
      form,
      disabled,
      ...restProps
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        {...(form && { form })}
        className={`${baseClasses} ${disabled || isLoading ? 'btn-disabled' : ''} ${className ?? ''}`}
        {...restProps}
        disabled={isLoading || disabled}
      >
        {isLoading ? '...' : children}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
const baseClasses =
  'transition-all hover:bg-background-low rounded-md p-1 active:scale-95';
