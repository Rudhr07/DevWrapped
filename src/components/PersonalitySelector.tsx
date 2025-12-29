import { motion } from 'framer-motion';
import { Personality, personalities } from '@/lib/types';
import { themeConfigs } from '@/lib/theme';
import { Sparkles, Check } from 'lucide-react';

interface PersonalitySelectorProps {
  selected: Personality;
  onSelect: (personality: Personality) => void;
}

export const PersonalitySelector = ({ selected, onSelect }: PersonalitySelectorProps) => {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
        <Sparkles className="w-4 h-4" />
        Choose Your Personality
      </label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {personalities.map((p) => {
          const theme = themeConfigs[p.id];
          return (
            <motion.button
              key={p.id}
              type="button"
              onClick={() => onSelect(p.id)}
              className={`relative p-4 rounded-xl border transition-all text-left overflow-hidden ${
                selected === p.id
                  ? 'border-primary bg-primary/10'
                  : 'border-border/50 bg-muted/30 hover:border-primary/50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                boxShadow: selected === p.id ? `0 0 20px ${theme.primaryColor}30` : 'none'
              }}
            >
              {/* Color preview bar */}
              <div 
                className="absolute top-0 left-0 right-0 h-1"
                style={{ 
                  background: `linear-gradient(90deg, ${theme.primaryColor}, ${theme.secondaryColor})`
                }}
              />
              
              <span 
                className="font-display font-bold text-sm block mb-1"
                style={{ color: theme.primaryColor }}
              >
                {p.name}
              </span>
              <span className="text-xs text-muted-foreground block">
                {p.description}
              </span>
              <span 
                className="text-xs mt-1 block"
                style={{ color: theme.primaryColor, opacity: 0.7 }}
              >
                {p.colors}
              </span>
              
              {selected === p.id && (
                <motion.div
                  className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: theme.primaryColor }}
                  layoutId="selectedIndicator"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <Check className="w-3 h-3 text-background" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
