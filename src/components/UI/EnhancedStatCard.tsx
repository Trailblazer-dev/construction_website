import React from 'react';
import type { LucideIcon } from 'lucide-react';

export interface EnhancedStatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
  subtitle?: string;
  total?: number;
  className?: string;
  onClick?: () => void;
}

export const EnhancedStatCard: React.FC<EnhancedStatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
  color = 'primary',
  subtitle,
  total,
  className = '',
  onClick
}) => {
  // Color schemes for different stat types
  const colorSchemes = {
    primary: {
      background: 'bg-primary-900/90',
      iconBg: 'bg-primary-800',
      iconColor: 'text-primary-300',
      textColor: 'text-white',
      subtitleColor: 'text-primary-300/70',
      valueColor: 'text-white',
      border: 'border-primary-700/50',
      shadow: 'shadow-lg shadow-primary-900/20',
      trendUp: 'text-success-400',
      trendDown: 'text-danger-400',
      progressBg: 'bg-primary-700/30',
      progressFill: 'bg-primary-500'
    },
    accent: {
      background: 'bg-accent-900/90',
      iconBg: 'bg-accent-800',
      iconColor: 'text-accent-300',
      textColor: 'text-white',
      subtitleColor: 'text-accent-300/70',
      valueColor: 'text-white',
      border: 'border-accent-700/50',
      shadow: 'shadow-lg shadow-accent-900/20',
      trendUp: 'text-success-400',
      trendDown: 'text-danger-400',
      progressBg: 'bg-accent-700/30',
      progressFill: 'bg-accent-500'
    },
    success: {
      background: 'bg-success-900/90',
      iconBg: 'bg-success-800',
      iconColor: 'text-success-300',
      textColor: 'text-white',
      subtitleColor: 'text-success-300/70',
      valueColor: 'text-white',
      border: 'border-success-700/50',
      shadow: 'shadow-lg shadow-success-900/20',
      trendUp: 'text-white',
      trendDown: 'text-white/70',
      progressBg: 'bg-success-700/30',
      progressFill: 'bg-success-500'
    },
    warning: {
      background: 'bg-warning-900/90',
      iconBg: 'bg-warning-800',
      iconColor: 'text-warning-300',
      textColor: 'text-white',
      subtitleColor: 'text-warning-300/70',
      valueColor: 'text-white',
      border: 'border-warning-700/50',
      shadow: 'shadow-lg shadow-warning-900/20',
      trendUp: 'text-white',
      trendDown: 'text-white/70',
      progressBg: 'bg-warning-700/30',
      progressFill: 'bg-warning-500'
    },
    danger: {
      background: 'bg-danger-900/90',
      iconBg: 'bg-danger-800',
      iconColor: 'text-danger-300',
      textColor: 'text-white',
      subtitleColor: 'text-danger-300/70',
      valueColor: 'text-white',
      border: 'border-danger-700/50',
      shadow: 'shadow-lg shadow-danger-900/20',
      trendUp: 'text-white',
      trendDown: 'text-white/70',
      progressBg: 'bg-danger-700/30',
      progressFill: 'bg-danger-500'
    },
    secondary: {
      background: 'bg-gray-800/90',
      iconBg: 'bg-gray-700',
      iconColor: 'text-gray-300',
      textColor: 'text-white',
      subtitleColor: 'text-gray-300/70',
      valueColor: 'text-white',
      border: 'border-gray-700/50',
      shadow: 'shadow-lg shadow-gray-900/20',
      trendUp: 'text-success-400',
      trendDown: 'text-danger-400',
      progressBg: 'bg-gray-700/30',
      progressFill: 'bg-gray-500'
    }
  };

  const styles = colorSchemes[color];
  const percentValue = total ? Math.round((typeof value === 'number' ? value : 0) / total * 100) : null;

  return (
    <div 
      className={`${styles.background} rounded-xl ${styles.border} ${styles.shadow} p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className={`font-medium ${styles.textColor}`}>{title}</h3>
          {subtitle && (
            <p className={`text-xs ${styles.subtitleColor} mt-1`}>{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${styles.iconBg}`}>
          <Icon className={`h-5 w-5 ${styles.iconColor}`} />
        </div>
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <p className={`text-2xl font-bold ${styles.valueColor}`}>
            {value}
            {total && (
              <span className={`text-sm font-normal ml-1 ${styles.subtitleColor}`}>
                / {total}
              </span>
            )}
          </p>
          {trend && (
            <div className="flex items-center mt-1">
              <span className={trendUp ? styles.trendUp : styles.trendDown}>
                {trend}
              </span>
              <span className={`text-xs ml-1 ${styles.subtitleColor}`}>
                vs last period
              </span>
            </div>
          )}
        </div>
      </div>
      
      {total && percentValue !== null && (
        <div className="mt-4">
          <div className="flex justify-between text-xs mb-1">
            <span className={styles.subtitleColor}>Progress</span>
            <span className={styles.textColor}>{percentValue}%</span>
          </div>
          <div className={`w-full h-1.5 ${styles.progressBg} rounded-full overflow-hidden`}>
            <div 
              className={`h-full ${styles.progressFill} rounded-full`}
              style={{ width: `${percentValue}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};
