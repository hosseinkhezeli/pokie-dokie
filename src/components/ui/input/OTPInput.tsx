import React, {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

interface OTPInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  length?: number;
  error?: string | boolean;
  helperText?: string;
  value?: string; // controlled value (full OTP string)
  onChange?: (value: string) => void; // returns full OTP string
  autoFocus?: boolean;
  className?: string;
}

export const OTPInput = forwardRef<HTMLInputElement, OTPInputProps>(
  (props, ref) => {
    const {
      length = 5,
      error,
      helperText,
      value: controlledValue,
      onChange,
      autoFocus = false,
      className = '',
      name,
      required = false,
      ...rest
    } = props;

    // Internal state for uncontrolled usage
    const [internalValue, setInternalValue] = useState<string[]>(
      Array(length).fill('')
    );

    // Controlled or uncontrolled mode
    const isControlled = controlledValue !== undefined;

    // Use controlled value split into array or internal state
    const otpValues = isControlled
      ? controlledValue
          .split('')
          .slice(0, length)
          .concat(Array(length - controlledValue.length).fill(''))
      : internalValue;

    // Refs for each input to control focus
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    // Generate stable unique id for accessibility
    const reactId = useId();
    const baseId = name || `otp-input-${reactId}`;

    // Expose first input ref to parent via forwardRef
    useImperativeHandle(ref, () => inputRefs.current[0] as HTMLInputElement);

    // Handle input change per box
    function handleChange(e: ChangeEvent<HTMLInputElement>, idx: number) {
      const val = e.target.value;

      if (!/^\d*$/.test(val)) {
        // Only allow digits
        return;
      }

      const newOtpValues = [...otpValues];
      newOtpValues[idx] = val.slice(-1); // Only last digit

      if (!isControlled) {
        setInternalValue(newOtpValues);
      }

      if (onChange) {
        onChange(newOtpValues.join(''));
      }

      // Move focus to next input only if the current input was empty before
      // i.e., user is entering a new digit, not editing an existing one
      if (val && !otpValues[idx] && idx < length - 1) {
        inputRefs.current[idx + 1]?.focus();
      }
    }

    // Handle key events for navigation and deletion
    function handleKeyDown(
      e: React.KeyboardEvent<HTMLInputElement>,
      idx: number
    ) {
      if (e.key === 'Backspace') {
        e.preventDefault();
        if (otpValues[idx]) {
          // Clear current input
          const newOtpValues = [...otpValues];
          newOtpValues[idx] = '';
          if (!isControlled) {
            setInternalValue(newOtpValues);
          }
          if (onChange) {
            onChange(newOtpValues.join(''));
          }
        } else if (idx > 0) {
          // Move focus back and clear previous
          inputRefs.current[idx - 1]?.focus();
          const newOtpValues = [...otpValues];
          newOtpValues[idx - 1] = '';
          if (!isControlled) {
            setInternalValue(newOtpValues);
          }
          if (onChange) {
            onChange(newOtpValues.join(''));
          }
        }
      } else if (e.key === 'ArrowLeft' && idx > 0) {
        e.preventDefault();
        inputRefs.current[idx - 1]?.focus();
      } else if (e.key === 'ArrowRight' && idx < length - 1) {
        e.preventDefault();
        inputRefs.current[idx + 1]?.focus();
      }
    }

    // Autofocus first input on mount if requested
    useEffect(() => {
      if (autoFocus) {
        inputRefs.current[0]?.focus();
      }
    }, [autoFocus]);

    // Select input content on focus for easier editing
    function handleFocus(idx: number) {
      inputRefs.current[idx]?.select();
    }

    // // Determine if any input has value for label floating
    // const hasValue = otpValues.some((v) => v !== '');

    return (
      <div className='relative w-full h-max'>
        <div className={`relative w-full h-16 flex gap-2 justify-between `}>
          {Array.from({ length }).map((_, idx) => (
            <input
              key={idx}
              id={`${baseId}-${idx}`}
              name={name ? `${name}[${idx}]` : undefined}
              type='text'
              inputMode='numeric'
              pattern='\d*'
              maxLength={1}
              value={otpValues[idx]}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              onFocus={() => handleFocus(idx)}
              ref={(el) => {
                inputRefs.current[idx] = el;
              }}
              required={required}
              autoComplete='one-time-code'
              className={`text-bodyMd text-text-primary focus:outline-none !text-center w-16 h-16 peer rounded border border-border-primary focus:border-primary ${
                error ? '!border-error' : 'border-border-primary'
              } ${className}`}
              aria-label={`otp digit ${idx + 1}`}
              {...rest}
            />
          ))}
        </div>
        {(error || helperText) && (
          <span
            className={`mt-1 block text-bodyXs ${
              error ? 'text-error' : 'text-text-primary'
            }`}
          >
            {typeof error === 'string' ? error : helperText}
          </span>
        )}
      </div>
    );
  }
);

OTPInput.displayName = 'OTPInput';
