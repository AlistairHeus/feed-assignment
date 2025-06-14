import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "disabled" | "children"> {
  variant?: "primary" | "secondary" | "ghost" | "icon";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  children,
  className = "",
  ...props
}) => {
  const baseClasses =
    "cursor-pointer inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary: "bg-primary hover:bg-primary/90 text-primary-foreground focus:ring-ring",
    secondary: "bg-secondary hover:bg-secondary/80 text-secondary-foreground focus:ring-ring",
    ghost: "bg-transparent hover:bg-accent text-accent-foreground focus:ring-ring",
    icon: "bg-transparent hover:bg-accent text-muted-foreground hover:text-accent-foreground focus:ring-ring p-2",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-4 py-2 text-sm rounded-md",
    lg: "px-6 py-3 text-md rounded-lg",
  };

  const iconSizeClasses = {
    sm: "w-8 h-8 rounded-md",
    md: "w-10 h-10 rounded-md",
    lg: "w-12 h-12 rounded-lg",
  };

  const appliedSizeClasses =
    variant === "icon" ? iconSizeClasses[size] : sizeClasses[size];

  return (
    <motion.button
      className={cn(
        baseClasses,
        variantClasses[variant],
        appliedSizeClasses,
        className
      )}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.03 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.97 } : {}}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 17 
      }}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
          Loading...
        </>
      ) : (
        children
      )}
    </motion.button>
  );
};

export default Button;
