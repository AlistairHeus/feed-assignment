import React, { useEffect } from "react";
import { X } from "lucide-react";
import { useAnimation } from "../../hooks/useAnimation";
import { cn } from "../../utils/cn";

export interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type,
  isVisible,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const { shouldRender, animationClass, ref } = useAnimation(
    isVisible,
    {
      enterClass: "animate-slide-in-up",
      exitClass: "animate-slide-out-down",
      duration: 300
    }
  );

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      case "info":
        return "bg-blue-500";
      default:
        return "bg-gray-700";
    }
  };

  if (!shouldRender) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg text-white flex items-center justify-between min-w-[250px] max-w-md z-50",
        getBackgroundColor(),
        animationClass
      )}
    >
      <span className="pr-2">{message}</span>
      <button
        onClick={onClose}
        className="text-white p-1 rounded-full hover:bg-white/20 hover-scale active-scale transition-transform"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;
