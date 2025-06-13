import React, { forwardRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'password';
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  variant = 'default',
  className = '',
  type,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  
  const isPassword = variant === 'password' || type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  const baseClasses = 'w-full px-4 py-3 rounded-md text-sm transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    default: error 
      ? 'bg-red-50 border border-red-200 focus:border-red-500 focus:bg-white' 
      : 'bg-gray-100 border-0 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20',
    error: 'bg-red-50 border border-red-200 focus:border-red-500 focus:bg-white'
  };
  
  const appliedClasses = error ? variantClasses.error : variantClasses.default;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-gray-900 mb-1">
          {label}
        </label>
      )}
      
      <div className="relative">
        <input
          ref={ref}
          type={inputType}
          className={cn(
            baseClasses,
            appliedClasses,
            isPassword && 'pr-10',
            className
          )}
          {...props}
        />
        
        {isPassword && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff size={16} />
            ) : (
              <Eye size={16} />
            )}
          </button>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
