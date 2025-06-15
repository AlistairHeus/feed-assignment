import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../utils/cn";
import { useAnimation } from "../../hooks/useAnimation";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
}

const Modal: React.FC<ModalProps> & {
  Header: typeof ModalHeader;
  Content: typeof ModalContent;
  Footer: typeof ModalFooter;
} = ({
  isOpen,
  onClose,
  children,
  closeOnBackdropClick = true,
  closeOnEscape = true,
}) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen && closeOnEscape) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, closeOnEscape]);

  const backdrop = useAnimation(
    isOpen,
    {
      enterClass: "animate-fade-in",
      exitClass: "animate-fade-out",
      duration: 200
    }
  );

  const modal = useAnimation(
    isOpen,
    {
      enterClass: "animate-scale-in",
      exitClass: "animate-scale-out",
      duration: 300
    }
  );

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && closeOnBackdropClick) {
      onClose();
    }
  };

  if (!backdrop.shouldRender) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div
        ref={backdrop.ref}
        className={cn(
          "fixed inset-0 bg-black/40",
          backdrop.animationClass
        )}
      />
      
      {modal.shouldRender && (
        <div
          ref={modal.ref}
          className={cn(
            "relative w-full max-w-md bg-muted-dark rounded-4xl shadow-2xl overflow-hidden z-10",
            modal.animationClass
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      )}
    </div>
  );

  return createPortal(modalContent, document.body);
};

interface ModalHeaderProps {
  children?: React.ReactNode;
  className?: string;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ children, className }) => {
  return (
    <div 
      className={cn(
        "p-8 text-center animate-slide-in-down delay-100",
        className
      )}
    >
      {children}
    </div>
  );
};

interface ModalContentProps {
  children: React.ReactNode;
  className?: string;
}

const ModalContent: React.FC<ModalContentProps> = ({ children, className }) => {
  return (
    <div 
      className={cn(
        "px-8 pb-8 animate-fade-in delay-200",
        className
      )}
    >
      {children}
    </div>
  );
};

interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

const ModalFooter: React.FC<ModalFooterProps> = ({ children, className }) => {
  return (
    <div 
      className={cn(
        "bg-muted-dark px-8 py-6 text-center animate-slide-in-up delay-300",
        className
      )}
    >
      {children}
    </div>
  );
};

Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;

export default Modal;
