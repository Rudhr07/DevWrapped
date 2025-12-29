import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, GitCommit, Coffee, Clock, Bug, Rocket, 
  Video, Bot, Briefcase, Sparkles
} from 'lucide-react';
import { WrapData } from '@/lib/types';
import { getThemeClass, themeConfigs } from '@/lib/theme';
import { StatItem } from './StatItem';

interface WrapCardProps {
  data: WrapData;
}

export const WrapCard = forwardRef<HTMLDivElement, WrapCardProps>(({ data }, ref) => {
  const themeClass = getThemeClass(data.personality);
  const theme = themeConfigs[data.personality];
  
  const bgImage = data.customBgImage || data.backgroundImage || theme.defaultBgImage;

  const getLanguageIcon = (lang: string) => {
    const icons: Record<string, string> = {
      'JavaScript': '🟨',
      'TypeScript': '💙',
      'Python': '🐍',
      'Java': '☕',
      'Go': '🐹',
      'Rust': '🦀',
      'C++': '⚡',
      'C#': '💜',
      'Ruby': '💎',
      'PHP': '🐘',
      'Swift': '🍎',
      'Kotlin': '🟣',
    };
    return icons[lang] || '📝';
  };

  const getAppIcon = (app: string) => {
    const icons: Record<string, string> = {
      'VS Code': '💻',
      'Slack': '💬',
      'GitHub': '🐙',
      'GitLab': '🦊',
      'Jira': '📋',
      'Notion': '📝',
      'Figma': '🎨',
      'Discord': '🎮',
      'Teams': '👥',
      'Terminal': '⬛',
      'Docker': '🐳',
      'Postman': '📮',
    };
    return icons[app] || '📱';
  };

  return (
    <div 
      ref={ref}
      className={`relative w-full max-w-[540px] mx-auto aspect-[9/16] rounded-2xl overflow-hidden ${themeClass}`}
      style={{ background: theme.gradient }}
    >
      {/* Background Image */}
      {bgImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ 
            backgroundImage: `url(${bgImage})`,
          }}
        />
      )}
      
      {/* Overlay */}
      <div 
        className="absolute inset-0 z-[1]"
        style={{ backgroundColor: theme.bgOverlay }}
      />
      
      {/* Gradient overlay for depth */}
      <div 
        className="absolute inset-0 z-[2]"
        style={{ 
          background: `radial-gradient(ellipse at 50% 30%, ${theme.primaryColor}15 0%, transparent 60%)`
        }}
      />

      {/* Content */}
      <div className="relative z-[3] h-full p-6 flex flex-col justify-between">
        {/* Header */}
        <motion.div 
          className="text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 
            className="font-display text-xl font-bold tracking-wider mb-1"
            style={{ color: 'hsl(0, 0%, 98%)' }}
          >
            SOFTWARE ENGINEER
          </h1>
          <h2 
            className="font-display text-4xl font-black tracking-tight"
            style={{ 
              color: theme.primaryColor
            }}
          >
            WRAP<span className="text-xl align-top ml-1">{data.year}</span>
          </h2>
          <p 
            className="text-sm mt-2 italic opacity-70"
            style={{ color: theme.primaryColor }}
          >
            {data.periodType === 'monthly' && data.month 
              ? new Date(data.year, data.month - 1).toLocaleDateString('en-US', { month: 'long' })
              : 'Code, Coffee, and Deploys'
            }
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <StatItem icon={Code2} label="LINES OF CODE" value={data.linesOfCode} delay={0.1} themeColor={theme.primaryColor} />
          <StatItem icon={GitCommit} label="COMMITS" value={data.commits} delay={0.2} themeColor={theme.primaryColor} />
          <StatItem icon={Coffee} label="COFFEES CONSUMED" value={data.coffeesConsumed} suffix="+" delay={0.3} themeColor={theme.primaryColor} />
          <StatItem icon={Clock} label="HOURS CODED" value={data.hoursCoded} delay={0.4} themeColor={theme.primaryColor} />
          <StatItem icon={Bug} label="BUGS FIXED" value={data.bugsFixed} suffix="+" delay={0.5} themeColor={theme.primaryColor} />
          <StatItem icon={Rocket} label="PROJECTS SHIPPED" value={data.projectsShipped} delay={0.6} themeColor={theme.primaryColor} />
          <StatItem icon={Video} label="HOURS IN MEETINGS" value={data.hoursInMeetings} delay={0.7} themeColor={theme.primaryColor} />
          <StatItem icon={Bot} label="PROGRAMMER BUDDY" value={data.programmerBuddy} delay={0.8} themeColor={theme.primaryColor} />
        </div>

        {/* Apps & Languages */}
        <motion.div 
          className="space-y-2 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <div className="text-center">
            <span 
              className="text-xs uppercase tracking-widest block mb-2"
              style={{ color: `${theme.primaryColor}cc` }}
            >
              MOST USED APPS
            </span>
            <div className="flex justify-center gap-3 text-2xl">
              {data.mostUsedApps.slice(0, 3).map((app, i) => (
                <motion.span 
                  key={app}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 + i * 0.1 }}
                  title={app}
                >
                  {getAppIcon(app)}
                </motion.span>
              ))}
            </div>
          </div>
          <div className="text-center">
            <span 
              className="text-xs uppercase tracking-widest block mb-2"
              style={{ color: `${theme.primaryColor}cc` }}
            >
              MOST USED LANGUAGES
            </span>
            <div className="flex justify-center gap-3 text-2xl">
              {data.mostUsedLanguages.slice(0, 3).map((lang, i) => (
                <motion.span 
                  key={lang}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2 + i * 0.1 }}
                  title={lang}
                >
                  {getLanguageIcon(lang)}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div 
          className="pt-3 flex justify-between items-end flex-shrink-0"
          style={{ borderTop: `1px solid ${theme.primaryColor}30` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" style={{ color: theme.primaryColor }} />
            <div>
              <p className="font-semibold text-sm" style={{ color: 'hsl(0, 0%, 98%)' }}>{data.role}</p>
              <p className="text-xs" style={{ color: 'hsl(0, 0%, 60%)' }}>at {data.companyName}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 justify-end">
              <Sparkles className="w-3 h-3" style={{ color: theme.primaryColor }} />
              <span 
                className="text-xs uppercase tracking-widest"
                style={{ color: `${theme.primaryColor}cc` }}
              >
                PERSONALITY
              </span>
            </div>
            <p 
              className="font-display font-bold text-sm uppercase"
              style={{ 
                color: theme.primaryColor
              }}
            >
              {data.personality}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
});

WrapCard.displayName = 'WrapCard';
