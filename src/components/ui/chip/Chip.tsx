import { ReactNode } from 'react';

type BackgroundColor = 'info' | 'error' | 'caution' | 'success';

type TChipProps = {
  title: ReactNode;
  radius?: number;
  height?: number;
  backgroundColor?: string;
  paddingX?: number;
  paddingY?: number;
};
const backgroundColors: Record<BackgroundColor, string> = {
  info: 'var(--color-surface-info)',
  error: 'var(--color-surface-error)',
  caution: 'var(--color-surface-caution)',
  success: 'var(--color-success)',
};

export function Chip({
  title,
  radius = 10,
  height = 32,
  backgroundColor = 'info',
  paddingX = 8,
  paddingY = 4,
}: TChipProps): ReactNode {
  const bgColor = backgroundColors[backgroundColor] ?? backgroundColors.info;

  return (
    <span
      className='inline-flex items-center text-bodyXs'
      style={{
        borderRadius: radius,
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
