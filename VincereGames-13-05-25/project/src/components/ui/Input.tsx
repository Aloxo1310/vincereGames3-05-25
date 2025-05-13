import React, { forwardRef } from 'react';

type InputProps = {
  label?: string;
  type?: string;
  placeholder?: string;
  error?: string;
  className?: string;
  fullWidth?: boolean;
  id?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, type = 'text', placeholder, error, className = '', fullWidth = false, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-amber-900 mb-1"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          placeholder={placeholder}
          className={`
            px-4 py-2 w-full bg-cream-100 rounded-md border transition-colors
            ${error ? 'border-red-500 focus:border-red-500' : 'border-amber-300 focus:border-amber-500'}
            focus:outline-none focus:ring-2 focus:ring-amber-500/30
            placeholder:text-amber-800/50 text-amber-900
          `}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;