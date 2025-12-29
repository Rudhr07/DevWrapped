import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

interface StatItemProps {
  icon: LucideIcon;
  label: string;
  value: number | string;
  suffix?: string;
  delay?: number;
  themeColor?: string;
}

export const StatItem = ({ 
  icon: Icon, 
  label, 
  value, 
  suffix = '', 
  delay = 0,
  themeColor = 'hsl(142, 70%, 45%)'
}: StatItemProps) => {
  const isNumber = typeof value === 'number';

  return (
    <motion.div
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4" style={{ color: 'white', opacity: 0.8, stroke: 'white' }} />
        <span 
          className="text-xs uppercase tracking-widest font-medium text-white"
          style={{ opacity: 0.8 }}
        >
          {label}
        </span>
      </div>
      {isNumber ? (
        <AnimatedCounter 
          value={value} 
          suffix={suffix} 
          className="font-display text-5xl md:text-6xl font-bold tracking-tight"
          style={{ 
            color: themeColor,
            textShadow: `0 0 30px ${themeColor}50`
          }}
        />
      ) : (
        <motion.span 
          className="font-display text-3xl md:text-4xl font-bold tracking-tight"
          style={{ 
            color: themeColor,
            textShadow: `0 0 30px ${themeColor}50`
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.3 }}
        >
          {value}
        </motion.span>
      )}
    </motion.div>
  );
};
