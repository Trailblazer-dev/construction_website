import React from 'react';
import { clsx } from 'clsx';
import type { LucideProps } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger' | 'outline' | 'ghost' | 'link' | 'text';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

// Use a generic type for Lucide icons
type LucideIcon = React.ComponentType<LucideProps>;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  isDisabled?: boolean;
  className?: string;
  role?: 'admin' | 'construction_manager' | 'engineer' | 'driver' | 'client';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon: Icon,
  iconPosition = 'left',
  isLoading = false,
  isDisabled = false,
  className,
  role,
  children,
  ...props
}) => {
  // Button variants based on our design system
  const variantClasses = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700',
    secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-700',
    accent: 'bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700',
    success: 'bg-success-500 text-white hover:bg-success-600 active:bg-success-700',
    warning: 'bg-warning-500 text-white hover:bg-warning-600 active:bg-warning-700',
    danger: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700',
    outline: 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 active:bg-gray-200',
    link: 'bg-transparent text-primary-500 hover:text-primary-600 underline active:text-primary-700',
    text: 'bg-transparent text-gray-600 hover:text-gray-800 shadow-none',
  };

  // Role-based styling
  const roleClasses = {
    admin: 'bg-primary-700 text-white hover:bg-primary-800',
    'construction_manager': 'bg-accent-500 text-white hover:bg-accent-600',
    engineer: 'bg-secondary-600 text-white hover:bg-secondary-700',
    driver: 'bg-accent-600 text-white hover:bg-accent-700',
    client: 'bg-primary-500 text-white hover:bg-primary-600'
  };

  // Button sizes
  const sizeClasses = {
    xs: 'py-1 px-2 text-xs',
    sm: 'py-1.5 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-2.5 px-5 text-lg',
  };

  // Common styles
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 shadow-button-3d active:shadow-button-active active:translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 inline-flex items-center justify-center';
  
  return (
    <button
      className={clsx(
        baseClasses,
        role ? roleClasses[role] : variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        isDisabled || isLoading ? 'opacity-60 cursor-not-allowed' : '',
        className
      )}
      disabled={isDisabled || isLoading}
      {...props}
    >
      {isLoading && (
        <span className="mr-2">
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
      )}
      
      {Icon && iconPosition === 'left' && !isLoading && (
        <Icon className={`${size === 'xs' ? 'w-3 h-3' : 'w-5 h-5'} mr-2`} />
      )}
      
      {children}
      
      {Icon && iconPosition === 'right' && !isLoading && (
        <Icon className={`${size === 'xs' ? 'w-3 h-3' : 'w-5 h-5'} ml-2`} />
      )}
    </button>
  );
};
