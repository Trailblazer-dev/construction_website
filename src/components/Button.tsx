import React from 'react';
// No need for LucideProps import here as it's not used

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  isLoading = false,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  return (
    <button
      className={`flex items-center justify-center space-x-2 rounded-lg transition-all duration-200 focus:outline-none
        ${variant === 'primary' && 'bg-primary-600 text-white hover:bg-primary-700'}
        ${variant === 'secondary' && 'bg-secondary-600 text-white hover:bg-secondary-700'}
        ${variant === 'outline' && 'border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white'}
        ${variant === 'ghost' && 'text-primary-600 hover:bg-primary-600 hover:text-white'}
        ${variant === 'danger' && 'bg-danger-600 text-white hover:bg-danger-700'}
        ${size === 'sm' && 'px-3 py-1.5 text-sm'}
        ${size === 'md' && 'px-4 py-2 text-base'}
        ${size === 'lg' && 'px-5 py-3 text-lg'}
        ${fullWidth && 'w-full'}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <span className="loader"></span>
      )}
      {icon && iconPosition === 'left' && (
        <span className="icon-left">
          {icon}
        </span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="icon-right">
          {icon}
        </span>
      )}
    </button>
  );
};