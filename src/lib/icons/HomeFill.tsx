import { IIconProps } from '@/types/common.types';

export function HomeFillIcon({
  fill = '#e3e3e3',
  width = '24px',
  height = '24px',
}: IIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height={height}
      viewBox='0 -960 960 960'
      width={width}
      fill={fill}
    >
      <path d='M160-120v-480l320-240 320 240v480H560v-280H400v280H160Z' />
    </svg>
  );
}
