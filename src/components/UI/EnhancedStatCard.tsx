import React from 'react';
import type { LucideProps } from 'lucide-react';
import styles from './EnhancedStatCard.module.css';

interface EnhancedStatCardProps {
  title: string;
  value: number | string;
  total?: number;
  icon?: React.ComponentType<LucideProps>;
  trend?: string;
  trendUp?: boolean;
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger' | 'info';
  subtitle?: string;
  onClick?: () => void;
}

export const EnhancedStatCard: React.FC<EnhancedStatCardProps> = ({
  title,
  value,
  total,
  icon: Icon,
  trend,
  trendUp = true,
  color = 'primary',
  subtitle,
  onClick
}) => {
  // Unified color classes for consistency
  const colorClasses = {
    primary: {
      bg: 'bg-sky-300/20',
      text: 'text-sky-300',
      trendBg: 'bg-sky-950/40',
      trendText: trendUp ? 'text-sky-300' : 'text-danger-400'
    },
    secondary: {
      bg: 'bg-sky-300/20',
      text: 'text-sky-300',
      trendBg: 'bg-sky-950/40',
      trendText: trendUp ? 'text-sky-300' : 'text-danger-400'
    },
    accent: {
      bg: 'bg-sky-300/20',
      text: 'text-sky-300',
      trendBg: 'bg-sky-950/40',
      trendText: trendUp ? 'text-sky-300' : 'text-danger-400'
    },
    success: {
      bg: 'bg-sky-300/20',
      text: 'text-sky-300',
      trendBg: 'bg-sky-950/40',
      trendText: 'text-sky-300'
    },
    warning: {
      bg: 'bg-sky-300/20',
      text: 'text-sky-300',
      trendBg: 'bg-sky-950/40',
      trendText: trendUp ? 'text-sky-300' : 'text-danger-400'
    },
    danger: {
      bg: 'bg-sky-300/20',
      text: 'text-sky-300',
      trendBg: 'bg-sky-950/40',
      trendText: 'text-danger-400'
    },
    info: {
      bg: 'bg-sky-300/20',
      text: 'text-sky-300',
      trendBg: 'bg-sky-950/40',
      trendText: trendUp ? 'text-sky-300' : 'text-danger-400'
    }
  };
  
  const classes = colorClasses[color];
  
  return (
    <div 
      className="bg-sky-950/70 rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow duration-200 border border-sky-800/30"
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-white text-sm font-medium">{title}</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-bold text-white">{value}</p>
            {total && (
              <span className="ml-1 text-sm text-sky-300/80">/ {total}</span>
            )}
          </div>
          {subtitle && (
            <p className="mt-1 text-xs text-sky-300/80">{subtitle}</p>
          )}
        </div>
        
        {Icon && (
          <div className={`p-3 rounded-lg ${classes.bg}`}>
            <Icon className={`w-5 h-5 ${classes.text}`} />
          </div>
        )}
      </div>
      
      {trend && (
        <div className="mt-4 flex items-center">
          <div className={`text-xs font-medium flex items-center py-1 px-2 rounded-full ${classes.trendBg} ${classes.trendText}`}>
            {trendUp ? (
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            ) : (
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            )}
            {trend}
          </div>
          <span className="ml-2 text-xs text-sky-300/60">
            vs last month
          </span>
        </div>
      )}
    </div>
  );
};
