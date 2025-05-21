import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { IconButton } from '../button/IconButton';
import { PlusCircleIcon } from '@/lib/icons/PlusCircle';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  closeOnOverlayClick?: boolean;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  closeOnOverlayClick = true,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
      setIsVisible(true);
      setIsClosing(false);
    } else if (isVisible) {
      // Start closing animation and wait 600ms before unmounting
      setIsClosing(true);
      closeTimeoutRef.current = window.setTimeout(() => {
        setIsVisible(false);
        setIsClosing(false);
        onClose();
        closeTimeoutRef.current = null;
      }, 300);
    }
  }, [isOpen, isVisible]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  // Close on ESC key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isVisible) {
      document.addEventListener('keydown', onKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isVisible, onClose]);

  if (!isVisible) return null;
  console.log('isClosing', isClosing);

  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs
        ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}
        opacity-100`}
      onClick={() => {
        if (closeOnOverlayClick) onClose();
      }}
      aria-modal='true'
      role='dialog'
      aria-labelledby='modal-title'
      aria-describedby='modal-description'
    >
      <div
        className={`bg-surface rounded-2xl max-w-lg w-full mx-4 relative
          ${className} 
          ${isClosing ? 'animate-slide-down ' : 'animate-slide-up'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <IconButton className='absolute rotate-45 top-6 left-6' onClick={()=>onClose()}>
          <PlusCircleIcon fill='var(--color-neutral-40)' />
        </IconButton>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
