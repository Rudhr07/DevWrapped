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
        Choose Your Theme
      </label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {personalities.map((p) => {
          const theme = themeConfigs[p.id];
          return (
            <motion.button
              key={p.id}
              type="button"
              onClick={() => onSelect(p.id)}
              className={`relative p-0 rounded-xl border transition-all overflow-hidden ${
                selected === p.id
                  ? 'border-primary ring-2 ring-primary'
                  : 'border-border/50 hover:border-primary/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                boxShadow: selected === p.id ? `0 0 20px ${theme.primaryColor}50` : 'none'
              }}
            >
              {/* Mini preview card */}
              <div 
                className="aspect-[9/16] relative"
                style={{ 
                  background: theme.gradient
                }}
              >
                {/* Background Image */}
                {theme.defaultBgImage && (
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ 
                      backgroundImage: `url(${theme.defaultBgImage})`
                    }}
                  />
                )}
                
                {/* Background overlay */}
                <div 
                  className="absolute inset-0"
                  style={{ backgroundColor: theme.bgOverlay }}
                />
                
                {/* Gradient overlay */}
                <div 
                  className="absolute inset-0"
                  style={{ 
                    background: `radial-gradient(ellipse at 50% 30%, ${theme.primaryColor}20 0%, transparent 60%)`
                  }}
                />
                
                {/* Mini content */}
                <div className="absolute inset-0 p-3 flex flex-col justify-between z-10">
                  <div className="text-center">
                    <div 
                      className="text-[7px] font-bold tracking-wider mb-0.5"
                      style={{ color: 'hsl(0, 0%, 98%)' }}
                    >
                      SOFTWARE ENGINEER
                    </div>
                    <div 
                      className="text-xs font-black"
                      style={{ color: theme.primaryColor }}
                    >
                      WRAP
                    </div>
                  </div>
                  
                  {/* Sample stats grid */}
                  <div className="grid grid-cols-2 gap-1 mb-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div 
                        key={i}
                        className="rounded p-1"
                        style={{ 
                          backgroundColor: `${theme.primaryColor}15`,
                          border: `1px solid ${theme.primaryColor}40`
                        }}
                      >
                        <div className="text-[6px] font-semibold" style={{ color: theme.primaryColor }}>
                          {i === 1 ? '30k' : i === 2 ? '100' : i === 3 ? '400' : '1k'}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Theme name at bottom */}
                  <div className="text-center">
                    <div 
                      className="text-[9px] font-bold uppercase tracking-wide"
                      style={{ color: theme.primaryColor }}
                    >
                      {p.name}
                    </div>
                  </div>
                </div>
              </div>
              
              {selected === p.id && (
                <motion.div
                  className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center z-10"
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
