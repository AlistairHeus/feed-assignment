import React, { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "../../utils/cn";

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
          <label
            className={cn(
              "block text-sm font-semibold mb-1 transition-colors",
              isFocused ? "text-primary" : error ? "text-destructive" : "text-foreground"
            )}
          >
            {label}
          </label>
        )}

        <div
          className={cn(
            "relative transition-transform",
            isFocused ? "scale-[1.01]" : ""
          )}
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
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground hover-scale active-scale transition-transform"
              onClick={() => setShowPassword(!showPassword)}
            >
              <div className="animate-fade-in">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </div>
            </button>
          )}
        </div>

        {error && (
          <p className="mt-1 text-sm text-destructive animate-slide-in-down">
            {error}
          </p>
        )}

        {helperText && !error && (
          <p className="mt-1 text-sm text-muted-foreground font-light animate-fade-in delay-100">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
