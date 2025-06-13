import React, { useEffect } from "react";
import { createPortal } from "react-dom";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,

  closeOnBackdropClick = true,
  size = "md",
  icon,
}) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && closeOnBackdropClick) {
      onClose();
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-40"
      onClick={handleBackdropClick}
    >
      <div
        className={`relative w-full ${sizeClasses[size]} bg-gray-200 rounded-3xl shadow-2xl transform transition-all`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Content */}
        <div className="p-2">
          <div className="p-4 rounded-3xl bg-white">
            {/* Icon */}
            {icon && (
              <div className="flex justify-center mb-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center">
                  {icon}
                </div>
              </div>
            )}

            {/* Header */}
            {(title || subtitle) && (
              <div className="text-center mb-8">
                {title && (
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {title}
                  </h2>
                )}
                {subtitle && (
                  <p className="text-sm text-gray-500">{subtitle}</p>
                )}
              </div>
            )}

            {/* Main content */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );

  // Using portals here to avoid common and annoying z-index issues
  return createPortal(modalContent, document.body);
};

export default Modal;
