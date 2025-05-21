'use client';
import { useRouter } from 'next/navigation';
import { IconButton } from '@/components/ui/button/IconButton';
import { ArrowIcon } from '@/assets/icons/Arrow';

type TBackButtonProps = {
  href?: string;
};

export function BackButton({ href }: TBackButtonProps) {
  const router = useRouter();
  return (
    <IconButton onClick={() => (href ? router.push(href) : router.back())}>
      <ArrowIcon transform='rotate(-90deg)' />
    </IconButton>
  );
}
