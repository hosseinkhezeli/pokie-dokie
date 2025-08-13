import { IIconProps } from '@/types/common.types';

export function ChevronRightIcon({
  fill = '#e3e3e3',
  width = '24px',
  height = '24px',
  className = '',
}: IIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height={height}
      viewBox='0 -960 960 960'
      width={width}
      fill={fill}
    >
      <path
        className={className}
        d='M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z'
      />
    </svg>
  );
}
