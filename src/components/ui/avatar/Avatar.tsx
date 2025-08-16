import React from 'react';

export function Avatar({
  name,
  email,
  size = 36,
}: {
  name: string;
  email: string;
  size?: number;
}) {
  const bg = colorFromString(email || name);
  const initials = getInitials(name);

  return (
    <div
      className='relative shrink-0 rounded-full ring-1 ring-black/10'
      style={{ width: size, height: size, background: bg }}
      aria-hidden='true'
    >
      <div className='w-full h-full grid place-items-center text-white font-medium text-[0.75rem]'>
        {initials}
      </div>
    </div>
  );
}

// utils/person.ts
export const getInitials = (fullName: string) => {
  if (!fullName?.trim()) return '?';
  const parts = fullName.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
};

export const colorFromString = (seed: string) => {
  // Deterministic HSL from email; keeps avatars varied but consistent
  let hash = 0;
  for (let i = 0; i < seed.length; i++)
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  const h = Math.abs(hash) % 360;
  // Slightly muted saturation/lightness for a Meet-like feel
  return `hsl(${h} 65% 55%)`;
};
