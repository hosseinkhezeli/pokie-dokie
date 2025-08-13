import React, { useEffect, useState, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { IconButton } from '../button/IconButton';
import { PlusCircleIcon } from '@/lib/icons/PlusCircle';

export interface ModalProps {
  isOpen: boolean | string | null | undefined;
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

  const handleClose = useCallback(() => {
    setIsClosing(true);
    closeTimeoutRef.current = window.setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
      onClose();
      closeTimeoutRef.current = null;
    }, 50);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
      setIsVisible(true);
      setIsClosing(false);
    } else if (isVisible) {
      handleClose();
    }
  }, [isOpen]);

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
        handleClose();
      }
    };
    if (isVisible) {
      document.addEventListener('keydown', onKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [handleClose, isVisible, onClose]);

  if (!isVisible) return null;

  return ReactDOM.createPortal(
    <div
      className={`fixed transition-all inset-0 z-50 flex items-center justify-center bg-black/50
        ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}
        opacity-100`}
      onClick={() => {
        if (closeOnOverlayClick) handleClose();
      }}
      aria-modal='true'
      role='dialog'
      aria-labelledby='modal-title'
      aria-describedby='modal-description'
    >
      <div
        className={`bg-surface rounded-2xl max-w-lg w-full mx-4 relative
          ${className} 
          ${isClosing ? 'animate-slide-down' : 'animate-slide-in'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <IconButton
          className='absolute rotate-45 top-6 left-6'
          onClick={() => handleClose()}
        >
          <PlusCircleIcon fill='var(--color-neutral-40)' />
        </IconButton>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
