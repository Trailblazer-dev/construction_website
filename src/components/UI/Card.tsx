import React from 'react';
import { clsx } from 'clsx';
import type { LucideProps } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

// Use a generic type for Lucide icons
type LucideIcon = React.ComponentType<LucideProps>;

export interface CardProps {
  title?: string;
  subtitle?: string;
  icon?: LucideIcon;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  role?: 'admin' | 'project-manager' | 'engineer' | 'driver' | 'client';
  variant?: 'default' | 'elevated' | 'outline' | 'construction';
  color?: 'primary' | 'accent' | 'success' | 'warning' | 'danger';
  actionLabel?: string;
  onAction?: () => void;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  icon: Icon,
  actions,
  footer,
  className,
  bodyClassName,
  role,
  variant = 'default',
  color = 'primary',
  actionLabel,
  onAction,
  children,
}) => {
  // Standardized variants for consistent look
  const variantClasses = {
    default: 'bg-sky-950/70 border border-sky-800/30',
    elevated: 'bg-sky-950/70 shadow-card hover:shadow-card-hover border border-sky-800/30',
    outline: 'bg-sky-950/70 border border-sky-300/30',
    construction: 'bg-sky-950/70 shadow-construction border-l-4 border-sky-800/30',
  };

  const colorClasses = {
    primary: 'border-l-sky-400 text-sky-300',
    accent: 'border-l-accent-500 text-sky-300',
    success: 'border-l-success-500 text-sky-300',
    warning: 'border-l-warning-500 text-sky-300',
    danger: 'border-l-danger-500 text-sky-300',
  };

  const roleClasses = {
    admin: 'card-admin',
    'project-manager': 'card-project-manager',
    engineer: 'card-engineer',
    driver: 'card-driver',
    client: 'card-client',
  };

  return (
    <div 
      className={clsx(
        'rounded-xl overflow-hidden transition-all duration-300',
        variantClasses[variant],
        variant === 'construction' ? colorClasses[color].split(' ')[0] : '',
        role ? roleClasses[role] : '',
        className
      )}
    >
      {(title || actions) && (
        <div className="flex items-center justify-between p-4 border-b border-sky-800/30">
          <div className="flex items-center">
            {Icon && (
              <div className="w-8 h-8 rounded-lg mr-3 flex items-center justify-center bg-sky-300/20 text-sky-300">
                <Icon className="w-5 h-5" />
              </div>
            )}
            <div>
              {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
              {subtitle && <p className="text-sm text-sky-300/80">{subtitle}</p>}
            </div>
          </div>
          {actions && <div>{actions}</div>}
        </div>
      )}
      
      <div className={clsx('p-4', bodyClassName)}>
        {children}
      </div>
      
      {(footer || (actionLabel && onAction)) && (
        <div className="p-4 border-t border-sky-800/30 bg-sky-950/50">
          {footer || (
            <button 
              onClick={onAction}
              className="text-sm font-medium flex items-center justify-end w-full text-sky-300 hover:text-sky-400"
            >
              {actionLabel}
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
        
