'use client';
import React, { useEffect, useRef, useState } from 'react';
import { IconButton } from '@/components/ui/button/IconButton';
import { commonMessages } from '@/lib/messages/commonMessages';
import { SearchNormalIcon } from '@/assets/icons/SearchNormal';
import { CloseCircleIcon } from '@/assets/icons/CloseCircle';

interface IInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  withoutDebounce?: boolean;
  debounceTime?: number;
  allowClear?: boolean;
  defaultValue?: string | number;
}

export function SearchInput({
  onChange,
  debounceTime = 300,
  withoutDebounce = false,
  allowClear = true,
  defaultValue,
  ...props
}: IInputProps) {
  const [value, setValue] = useState(defaultValue);
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);

    if (withoutDebounce) {
      return onChange(event);
    }

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      onChange(event);
    }, debounceTime);
  };

  const handleClear = (e: any) => {
    setValue('');
    onChange({ ...e, target: { value: '' } });
  };

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  return (
    <span className={`input-search-container ${props.className ?? ''}`}>
      <SearchNormalIcon />
      <input
        {...props}
        value={value}
        onChange={handleChange}
        className={`input-search`}
        placeholder={props.placeholder ?? commonMessages.search}
      />
      {allowClear && Boolean(value) && (
        <IconButton onClick={handleClear}>
          <CloseCircleIcon />
        </IconButton>
      )}
    </span>
  );
}
