'use client';

import { MouseEvent, ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { togglePreventScroll } from '@/utils/methods';

export type TMenuProps = {
  open: boolean;
  onClose: (e: MouseEvent) => void;
  children: ReactNode;
  anchorEl: HTMLElement | HTMLDivElement | HTMLButtonElement | null;
  direction?: 'center' | 'ltr' | 'rtl';
  top?: number;
  left?: number;
};

export function Menu({
  open,
  onClose,
  children,
  anchorEl,
  direction = 'rtl',
  top = 0,
  left = 0,
}: TMenuProps): ReactNode | false {
  const [position, setPosition] = useState({ top, left });
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      togglePreventScroll(true);
      // Calculate the position of the trigger element
      if (anchorEl) {
        const rect = anchorEl?.getBoundingClientRect();
        setPosition({
          top: (rect?.bottom || 0) + window.scrollY + top,
          left: (rect?.left || 0) + window.scrollX + left,
        });
      }
    } else {
      togglePreventScroll(false);
    }
    return () => {
      togglePreventScroll(false);
    };
  }, [open, anchorEl]);

  if (!open) {
    return false;
  }

  return createPortal(
    <>
      <div
        role={'menu'}
        id={'med-menu'}
        ref={dropdownRef}
        className={`paper-menu 
          ${direction === 'ltr' ? 'items-end' : direction === 'center' ? 'items-center' : ''}`}
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
      >
        {children}
      </div>
      <div
        role={'presentation'}
        id={'backdrop'}
        onClick={onClose}
        className={'w-svw h-svh fixed top-0 right-0 bg-transparent z-[1200]'}
      />
    </>,
    document.body
  );
}
