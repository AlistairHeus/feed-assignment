import React, { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "../../utils/cn";
import { motion } from "framer-motion";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: "default" | "password";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      variant = "default",
      className = "",
      type,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const isPassword = variant === "password" || type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    const baseClasses =
      "w-full px-3 py-3 rounded-md text-sm transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

    const variantClasses = {
      default: error
        ? "bg-destructive/10 border border-destructive/20 focus:border-destructive focus:bg-background"
        : "bg-muted border-0 focus:bg-background focus:ring-2 focus:ring-ring focus:ring-opacity-20",
      error:
        "bg-destructive/10 border border-destructive/20 focus:border-destructive focus:bg-background",
    };

    const appliedClasses = error
      ? variantClasses.error
      : variantClasses.default;

    return (
      <div className="w-full">
        {label && (
          <motion.label
            className="block text-sm font-semibold mb-1"
            animate={{
              color: isFocused
                ? "var(--color-primary)"
                : error
                ? "var(--color-destructive)"
                : "var(--color-foreground)",
            }}
            transition={{ duration: 0.2 }}
          >
            {label}
          </motion.label>
        )}

        <motion.div
          className="relative"
          animate={{
            scale: isFocused ? 1.01 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        >
          <input
            ref={ref}
            type={inputType}
            className={cn(
              baseClasses,
              appliedClasses,
              isPassword && "pr-10",
              className
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />

          {isPassword && (
            <motion.button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
              onClick={() => setShowPassword(!showPassword)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                initial={{ opacity: 0, rotate: -10 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 10 }}
                key={showPassword ? "eye-off" : "eye"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </motion.div>
            </motion.button>
          )}
        </motion.div>

        {error && (
          <motion.p
            className="mt-1 text-sm text-destructive"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {error}
          </motion.p>
        )}

        {helperText && !error && (
          <motion.p
            className="mt-1 text-sm text-muted-foreground font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {helperText}
          </motion.p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
