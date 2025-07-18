import React from 'react';
import { clsx } from 'clsx';
import type { LucideProps } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

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
  role?: 'admin' | 'project-manager' | 'engineer' | 'driver' | 'client';
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
    primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800',
    secondary: 'bg-earth-200 text-earth-800 hover:bg-earth-300 active:bg-earth-400',
    accent: 'bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700',
    success: 'bg-success-500 text-white hover:bg-success-600 active:bg-success-700',
    warning: 'bg-warning-500 text-white hover:bg-warning-600 active:bg-warning-700',
    danger: 'bg-danger-500 text-white hover:bg-danger-600 active:bg-danger-700',
    outline: 'bg-transparent border border-earth-300 text-earth-700 hover:bg-earth-50 active:bg-earth-100',
    ghost: 'bg-transparent text-earth-600 hover:bg-earth-100 active:bg-earth-200',
  };

  // Role-based styling
  const roleClasses = {
    admin: 'bg-emerald-600 text-white hover:bg-emerald-700',
    'project-manager': 'bg-neon-500 text-charcoal-900 hover:bg-neon-600',
    engineer: 'bg-teal-500 text-white hover:bg-teal-600',
    driver: 'bg-accent-500 text-white hover:bg-accent-600',
    client: 'bg-primary-600 text-white hover:bg-primary-700'
  };

  // Button sizes
  const sizeClasses = {
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
        <Icon className="w-5 h-5 mr-2" />
      )}
      
      {children}
      
      {Icon && iconPosition === 'right' && !isLoading && (
        <Icon className="w-5 h-5 ml-2" />
      )}
    </button>
  );
};
