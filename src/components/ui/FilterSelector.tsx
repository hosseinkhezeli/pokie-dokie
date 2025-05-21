import React, { useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQueryParams } from '@/hooks/useQueryParams';

export type TFilterOption = {
  id: string;
  label: string;
};

interface IFilterSelectorProps {
  searchParamKey: string;
  options: TFilterOption[];
  selectedValue?: string;
  onChange?: (value: string) => void;
  renderOption?: (
    option: TFilterOption,
    isActive: boolean,
    onClick: () => void
  ) => React.ReactNode;
  visible?: boolean;
}

export function FilterSelector({
  searchParamKey,
  options,
  selectedValue,
  onChange,
  renderOption,
  visible = true,
}: IFilterSelectorProps) {
  const searchParams = useSearchParams();
  const { addQueryParam } = useQueryParams();

  const activeValue = selectedValue ?? searchParams.get(searchParamKey);

  const handleClick = useCallback(
    (value: string) => {
      if (onChange) {
        onChange(value);
      } else {
        addQueryParam(searchParamKey, value);
      }
    },
    [searchParamKey, onChange, addQueryParam]
  );

  if (!visible) return null;

  return (
    <span className='flex gap-3'>
      {options.map((option, idx) => {
        const isActive =
          (!activeValue && idx === 0) || activeValue === option.id;

        if (renderOption) {
          return (
            <React.Fragment key={option.id}>
              {renderOption(option, isActive, () => handleClick(option.id))}
            </React.Fragment>
          );
        }

        return (
          <button
            key={option.id}
            className={`transition-all min-w-36 min-h-10 rounded-xl ${
              isActive
                ? 'bg-primary text-text-contrast'
                : 'bg-background-lowest text-text-primary border'
            }`}
            onClick={() => handleClick(option.id)}
          >
            {option.label}
          </button>
        );
      })}
    </span>
  );
}
