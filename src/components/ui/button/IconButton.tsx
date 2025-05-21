import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
} from 'react';
import { Spinner } from '@/components/Spinner';

export type TIconButtonSizes = 'medium' | 'small';

interface IIconButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isLoading?: boolean;
  size?: TIconButtonSizes;
}

export const IconButton = forwardRef<HTMLButtonElement, IIconButtonProps>(
  (
    {
      children,
      isLoading = false,
      size = 'medium',
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
        className={`transition-all hover:bg-background-low rounded-md p-1 ${disabled || isLoading ? 'btn-disabled' : ''} ${className ?? ''}`}
        {...restProps}
        disabled={isLoading || disabled}
      >
        {isLoading ? <Spinner /> : children}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
