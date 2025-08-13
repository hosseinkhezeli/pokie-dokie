import { ReactNode } from 'react';

type BackgroundColor = 'primary' | 'secondary' | 'tertiary';

type TChipProps = {
  title: ReactNode;
  radius?: number;
  height?: number;
  backgroundColor?: string;
  paddingX?: number;
  paddingY?: number;
};
const backgroundColors: Record<BackgroundColor, string> = {
  primary: 'var(--color-primary-60)',
  secondary: 'var(--color-secondary-60)',
  tertiary: 'var(--color-tertiary-60)',
};

export function Chip({
  title,
  height = 32,
  backgroundColor = 'info',
  paddingX = 8,
  paddingY = 4,
}: TChipProps): ReactNode {
  const bgColor = backgroundColors[backgroundColor] ?? backgroundColors.primary;

  return (
    <span
      className='inline-flex items-center text-body-sm rounded-full w-max'
      style={{
        backgroundColor: bgColor,
        height,
        padding: `${paddingY}px ${paddingX}px`,
        lineHeight: `${height}px`,
      }}
    >
      {title}
    </span>
  );
}
