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
      'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      'Java': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
      'Go': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
      'Rust': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg',
      'C++': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
      'C#': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
      'Ruby': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg',
      'PHP': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
      'Swift': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg',
      'Kotlin': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg',
    };
    return icons[lang] || 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/devicon/devicon-original.svg';
  };

  const getAppIcon = (app: string) => {
    const icons: Record<string, string> = {
      'VS Code': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
      'Slack': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg',
      'GitHub': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
      'GitLab': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg',
      'Jira': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg',
      'Notion': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg',
      'Figma': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
      'Discord': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/discord/discord-original.svg',
      'Teams': 'https://www.svgrepo.com/show/373952/teams.svg',
      'Terminal': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg',
      'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      'Postman': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg',
    };
    return icons[app] || 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/devicon/devicon-original.svg';
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
          {data.periodType === 'monthly' && data.month ? (
            <p 
              className="font-display text-5xl font-black mt-3 uppercase tracking-wide"
              style={{ 
                color: theme.secondaryColor,
                textShadow: `0 0 30px ${theme.secondaryColor}, 0 0 60px ${theme.secondaryColor}80, 0 4px 10px rgba(0,0,0,0.5)`,
                letterSpacing: '0.1em'
              }}
            >
              {new Date(data.year, data.month - 1).toLocaleDateString('en-US', { month: 'long' })}
            </p>
          ) : (
            <p 
              className="text-sm mt-2 italic opacity-70"
              style={{ color: theme.primaryColor }}
            >
              Code, Coffee, and Deploys
            </p>
          )}
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
            <div className="flex justify-center gap-4 items-center">
              {data.mostUsedApps.slice(0, 3).map((app, i) => (
                <motion.div
                  key={app}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 + i * 0.1 }}
                  title={app}
                  className="w-10 h-10 flex items-center justify-center"
                >
                  <img 
                    src={getAppIcon(app)} 
                    alt={app}
                    className="w-full h-full object-contain"
                    style={{ filter: 'brightness(1.2)' }}
                  />
                </motion.div>
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
            <div className="flex justify-center gap-4 items-center">
              {data.mostUsedLanguages.slice(0, 3).map((lang, i) => (
                <motion.div
                  key={lang}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2 + i * 0.1 }}
                  title={lang}
                  className="w-10 h-10 flex items-center justify-center"
                >
                  <img 
                    src={getLanguageIcon(lang)} 
                    alt={lang}
                    className="w-full h-full object-contain"
                    style={{ filter: 'brightness(1.2)' }}
                  />
                </motion.div>
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
