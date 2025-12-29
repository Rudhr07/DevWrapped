import { motion } from 'framer-motion';
import { ImagePlus, Check, X } from 'lucide-react';
import { Personality } from '@/lib/types';
import { bgTemplates, themeConfigs } from '@/lib/theme';

interface BackgroundSelectorProps {
  personality: Personality;
  selected: string;
  customBg: string;
  onSelect: (url: string) => void;
  onCustomBg: (url: string) => void;
}

export const BackgroundSelector = ({ 
  personality, 
  selected, 
  customBg,
  onSelect,
  onCustomBg 
}: BackgroundSelectorProps) => {
  const theme = themeConfigs[personality];
  const templates = bgTemplates.filter(t => t.personalities.includes(personality));

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onCustomBg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearCustomBg = () => {
    onCustomBg('');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <ImagePlus className="w-4 h-4" />
          Background Image
        </label>
        {(selected || customBg) && (
          <button
            type="button"
            onClick={() => {
              onSelect('');
              onCustomBg('');
            }}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Use default
          </button>
        )}
      </div>

      {/* Custom upload */}
      <div className="relative">
        {customBg ? (
          <div className="relative rounded-xl overflow-hidden border-2 border-primary">
            <img 
              src={customBg} 
              alt="Custom background" 
              className="w-full h-24 object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-2">
              <span className="text-sm text-white font-medium">Custom Image</span>
              <button
                type="button"
                onClick={clearCustomBg}
                className="p-1 rounded-full bg-destructive/80 hover:bg-destructive"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-border/50 rounded-xl cursor-pointer hover:border-primary/50 transition-colors bg-muted/30">
            <ImagePlus className="w-6 h-6 text-muted-foreground mb-1" />
            <span className="text-sm text-muted-foreground">Upload custom image</span>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileUpload}
            />
          </label>
        )}
      </div>

      {/* Pre-made templates */}
      <div>
        <p className="text-xs text-muted-foreground mb-2">
          Or choose a template for {theme.name}:
        </p>
        <div className="grid grid-cols-2 gap-2">
          {templates.map((template) => (
            <motion.button
              key={template.id}
              type="button"
              onClick={() => onSelect(template.url)}
              className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                selected === template.url && !customBg
                  ? 'border-primary ring-2 ring-primary/30'
                  : 'border-border/50 hover:border-primary/50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img 
                src={template.url} 
                alt={template.name}
                className="w-full h-16 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-2">
                <span className="text-xs text-white font-medium">{template.name}</span>
              </div>
              {selected === template.url && !customBg && (
                <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary-foreground" />
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};
