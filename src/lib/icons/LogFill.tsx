import { IIconProps } from '@/types/common.types';

export function LogFillIcon({
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
      <path d='m787-145 28-28-75-75v-112h-40v128l87 87ZM720-40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40ZM280-600h400v-80H280v80Zm187 480H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v268q-29-14-58.5-21t-61.5-7q-11 0-20.5.5T680-517v-3H280v80h245q-18 17-32.5 37T467-360H280v80h163q-2 10-2.5 19.5T440-240q0 33 6 61.5t21 58.5Z' />
    </svg>
  );
}
