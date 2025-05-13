import React from 'react';
import { motion } from 'framer-motion';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  loading?: boolean;
};

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  fullWidth = false,
  icon,
  loading = false,
}: ButtonProps) {
  const baseStyles = 'btn-hover-effect inline-flex items-center justify-center rounded-md font-display transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transform hover:scale-105';
  
  const variantStyles = {
    primary: 'bg-amber-800 text-cream-50 hover:bg-amber-700 hover:shadow-lg shadow-md',
    secondary: 'bg-gold-500 text-amber-900 hover:bg-gold-400 hover:shadow-lg shadow-md',
    outline: 'bg-cream-50 border-2 border-amber-800 text-amber-800 hover:bg-amber-800 hover:text-cream-50 shadow-md',
    ghost: 'bg-cream-50/90 text-amber-800 hover:bg-amber-100 hover:text-amber-900 shadow-sm',
  };
  
  const sizeStyles = {
    sm: 'text-xs h-8 py-1 px-3',
    md: 'text-sm h-10 py-2 px-4',
    lg: 'text-base h-12 py-2.5 px-5',
  };
  
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.02 }}
      type={type}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && (
        <svg className="mr-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {icon && !loading && <span className="mr-2">{icon}</span>}
      {children}
    </motion.button>
  );
}