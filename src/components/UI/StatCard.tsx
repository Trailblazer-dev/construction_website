import React from 'react';
import type { LucideProps } from 'lucide-react';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';

// Use a generic type for Lucide icons
type LucideIcon = React.ComponentType<LucideProps>;

type UserRole = 'admin' | 'project-manager' | 'engineer' | 'driver' | 'client';

export interface StatCardProps {
  title: string;
  value: number | string;
  total?: number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  color: 'primary' | 'accent' | 'success' | 'warning' | 'danger' | 'vibrant' | 'blue-green' | 'purple-pink';
  role?: UserRole;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

// Role-based styling following the StratoPath brand guidelines
const roleStyles = {
  'admin': {
    background: 'bg-gradient-to-br from-asphalt-600 to-asphalt-800',
    iconBg: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
    iconColor: 'text-white',
    textColor: 'text-white',
    subtitleColor: 'text-asphalt-200',
    valueColor: 'text-white',
    border: 'border-l-4 border-emerald-500',
    actionBtn: 'bg-emerald-500 text-white hover:bg-emerald-600',
    shadow: 'shadow-admin'
  },
  'project-manager': {
    background: 'bg-gradient-to-br from-charcoal-700 to-charcoal-900',
    iconBg: 'bg-gradient-to-br from-neon-400 to-neon-600',
    iconColor: 'text-charcoal-900',
    textColor: 'text-white',
    subtitleColor: 'text-charcoal-200',
    valueColor: 'text-white',
    border: 'border-l-4 border-neon-500',
    actionBtn: 'bg-neon-500 text-charcoal-900 hover:bg-neon-600',
    shadow: 'shadow-project-manager'
  },
  'engineer': {
    background: 'bg-gradient-to-br from-asphalt-400 to-asphalt-600',
    iconBg: 'bg-gradient-to-br from-teal-400 to-teal-600',
    iconColor: 'text-white',
    textColor: 'text-white',
    subtitleColor: 'text-asphalt-200',
    valueColor: 'text-white',
    border: 'border-l-4 border-teal-500',
    actionBtn: 'bg-teal-500 text-white hover:bg-teal-600',
    shadow: 'shadow-engineer'
  },
  'driver': {
    background: 'bg-gradient-to-br from-charcoal-800 to-black',
    iconBg: 'bg-gradient-to-br from-neon-500 to-teal-500',
    iconColor: 'text-charcoal-900',
    textColor: 'text-white',
    subtitleColor: 'text-charcoal-300',
    valueColor: 'text-white',
    border: 'border-l-4 border-neon-500',
    actionBtn: 'bg-neon-500 text-charcoal-900 hover:bg-neon-600',
    shadow: 'shadow-driver'
  },
  'client': {
    background: 'bg-white',
    iconBg: 'bg-gradient-to-br from-emerald-300 to-neon-300',
    iconColor: 'text-charcoal-800',
    textColor: 'text-charcoal-800',
    subtitleColor: 'text-asphalt-500',
    valueColor: 'text-charcoal-900',
    border: 'border-l-4 border-emerald-400',
    actionBtn: 'bg-emerald-500 text-white hover:bg-emerald-600',
    shadow: 'shadow-client'
  }
};

// Modern color classes with gradients and improved styling
const colorClasses = {
  primary: {
    icon: 'bg-primary-100 text-primary-600',
    iconBg: 'bg-primary-600',
    iconText: 'text-white',
    card: 'from-primary-500/20 to-primary-700/10',
    border: 'border-l-4 border-primary-500',
    actionBtn: 'text-primary-700 hover:text-primary-900 hover:bg-primary-100',
    headline: 'text-primary-800'
  },
  accent: {
    icon: 'bg-accent-100 text-accent-600',
    iconBg: 'bg-accent-600',
    iconText: 'text-white',
    card: 'from-accent-500/20 to-accent-700/10',
    border: 'border-l-4 border-accent-500',
    actionBtn: 'text-accent-700 hover:text-accent-900 hover:bg-accent-100',
    headline: 'text-accent-800'
  },
  success: {
    icon: 'bg-success-100 text-success-600',
    iconBg: 'bg-success-600',
    iconText: 'text-white',
    card: 'from-success-500/20 to-success-700/10',
    border: 'border-l-4 border-success-500',
    actionBtn: 'text-success-700 hover:text-success-900 hover:bg-success-100',
    headline: 'text-success-800'
  },
  warning: {
    icon: 'bg-warning-100 text-warning-600',
    iconBg: 'bg-warning-600',
    iconText: 'text-white',
    card: 'from-warning-500/20 to-warning-700/10',
    border: 'border-l-4 border-warning-500',
    actionBtn: 'text-warning-700 hover:text-warning-900 hover:bg-warning-100',
    headline: 'text-warning-800'
  },
  danger: {
    icon: 'bg-danger-100 text-danger-600',
    iconBg: 'bg-danger-600',
    iconText: 'text-white',
    card: 'from-danger-500/20 to-danger-700/10',
    border: 'border-l-4 border-danger-500',
    actionBtn: 'text-danger-700 hover:text-danger-900 hover:bg-danger-100',
    headline: 'text-danger-800'
  },
  vibrant: {
    icon: 'bg-gradient-to-br from-orange-100 to-pink-100 text-rose-600',
    iconBg: 'bg-gradient-to-br from-orange-500 to-pink-600',
    iconText: 'text-white',
    card: 'from-orange-500/20 to-pink-700/20',
    border: 'border-l-4 border-rose-500',
    actionBtn: 'text-rose-700 hover:text-rose-900 hover:bg-rose-100',
    headline: 'text-rose-800'
  },
  'blue-green': {
    icon: 'bg-gradient-to-br from-blue-100 to-teal-100 text-teal-600',
    iconBg: 'bg-gradient-to-br from-blue-500 to-teal-600',
    iconText: 'text-white',
    card: 'from-blue-500/20 to-teal-500/20',
    border: 'border-l-4 border-teal-500',
    actionBtn: 'text-teal-700 hover:text-teal-900 hover:bg-teal-100',
    headline: 'text-teal-800'
  },
  'purple-pink': {
    icon: 'bg-gradient-to-br from-purple-100 to-fuchsia-100 text-purple-600',
    iconBg: 'bg-gradient-to-br from-purple-500 to-fuchsia-600',
    iconText: 'text-white',
    card: 'from-purple-500/20 to-fuchsia-500/20',
    border: 'border-l-4 border-purple-500',
    actionBtn: 'text-purple-700 hover:text-purple-900 hover:bg-purple-100',
    headline: 'text-purple-800'
  }
};

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  total,
  icon: Icon,
  trend,
  trendUp,
  color,
  role,
  subtitle,
  actionLabel,
  onAction,
  className,
}) => {
  // Modern styled card using our design system
  const styles = role ? roleStyles[role] : {
    background: `bg-gradient-to-br ${colorClasses[color].card}`,
    iconBg: colorClasses[color].iconBg,
    iconColor: colorClasses[color].iconText,
    textColor: 'text-earth-600',
    subtitleColor: 'text-earth-500',
    valueColor: 'text-earth-900',
    border: colorClasses[color].border,
    actionBtn: colorClasses[color].actionBtn,
    shadow: 'shadow-card',
    headline: colorClasses[color].headline
  };

  return (
    <div className={clsx(
      "p-5 rounded-xl overflow-hidden relative border border-earth-200 transition-all duration-300",
      styles.background,
      styles.shadow,
      "hover:shadow-card-hover",
      className
    )}>
      {/* Decorative elements - 3D effect for depth */}
      <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-40"></div>
      <div className="absolute -left-16 -bottom-16 w-32 h-32 rounded-full bg-gradient-to-br from-white/10 to-transparent opacity-30"></div>
      
      {/* Subtle top accent line */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${styles.border.split(' ')[1]} ${styles.border.split(' ')[2]}`}></div>
      
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className={clsx(
          'w-12 h-12 rounded-xl flex items-center justify-center shadow-sm',
          styles.iconBg,
        )}>
          <Icon className={clsx('w-6 h-6', styles.iconColor)} />
        </div>
        {trend && (
          <div className="flex items-center px-2 py-1 rounded-full bg-white/90 shadow-sm">
            {trendUp ? (
              <TrendingUp className="w-4 h-4 text-success-500 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-danger-500 mr-1" />
            )}
            <span className={clsx(
              'text-sm font-medium',
              trendUp ? 'text-success-600' : 'text-danger-600'
            )}>
              {trend}
            </span>
          </div>
        )}
      </div>
      
      <div className="flex-1 relative z-10">
        <p className={clsx("text-sm font-medium mb-1", styles.textColor)}>{title}</p>
        <div className="flex items-baseline space-x-2">
          <p className={clsx("text-2xl font-bold", styles.valueColor)}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {total && (
            <p className={clsx("text-sm", styles.subtitleColor)}>
              of {total.toLocaleString()}
            </p>
          )}
        </div>
        {subtitle && (
          <p className={clsx("text-sm mt-1", styles.subtitleColor)}>{subtitle}</p>
        )}
      </div>
      
      {actionLabel && onAction && (
        <div className="mt-4 pt-3 border-t border-earth-200 relative z-10">
          <button 
            onClick={onAction}
            className={clsx(
              "text-sm font-medium flex items-center justify-end w-full",
              role ? styles.actionBtn : styles.headline
            )}
          >
            {actionLabel}
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      )}
    </div>
  );
};
