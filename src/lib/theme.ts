import { Personality } from './types';

export const getThemeClass = (personality: Personality): string => {
  return `theme-${personality}`;
};

export interface ThemeConfig {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  gradient: string;
  bgOverlay: string;
  defaultBgImage: string;
}

export const themeConfigs: Record<Personality, ThemeConfig> = {
  batman: {
    name: 'Batman',
    primaryColor: 'hsl(142, 70%, 45%)',
    secondaryColor: 'hsl(142, 60%, 35%)',
    gradient: 'linear-gradient(180deg, hsl(220, 20%, 4%) 0%, hsl(220, 30%, 8%) 50%, hsl(142, 20%, 6%) 100%)',
    bgOverlay: 'rgba(0, 0, 0, 0.7)',
    defaultBgImage: 'https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=800&q=80',
  },
  ironman: {
    name: 'Iron Man',
    primaryColor: 'hsl(15, 90%, 55%)',
    secondaryColor: 'hsl(45, 100%, 50%)',
    gradient: 'linear-gradient(180deg, hsl(15, 30%, 6%) 0%, hsl(30, 40%, 8%) 50%, hsl(45, 30%, 6%) 100%)',
    bgOverlay: 'rgba(20, 5, 0, 0.75)',
    defaultBgImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
  },
  cyberpunk: {
    name: 'Cyberpunk',
    primaryColor: 'hsl(280, 100%, 65%)',
    secondaryColor: 'hsl(195, 100%, 50%)',
    gradient: 'linear-gradient(180deg, hsl(260, 30%, 5%) 0%, hsl(280, 40%, 8%) 50%, hsl(195, 30%, 6%) 100%)',
    bgOverlay: 'rgba(20, 0, 30, 0.7)',
    defaultBgImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
  },
  minimalist: {
    name: 'Minimalist',
    primaryColor: 'hsl(0, 0%, 90%)',
    secondaryColor: 'hsl(0, 0%, 70%)',
    gradient: 'linear-gradient(180deg, hsl(0, 0%, 5%) 0%, hsl(0, 0%, 10%) 50%, hsl(0, 0%, 5%) 100%)',
    bgOverlay: 'rgba(0, 0, 0, 0.85)',
    defaultBgImage: 'https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?w=800&q=80',
  },
  hacker: {
    name: 'Hacker',
    primaryColor: 'hsl(120, 100%, 40%)',
    secondaryColor: 'hsl(120, 80%, 30%)',
    gradient: 'linear-gradient(180deg, hsl(120, 50%, 2%) 0%, hsl(120, 40%, 4%) 50%, hsl(120, 30%, 3%) 100%)',
    bgOverlay: 'rgba(0, 10, 0, 0.8)',
    defaultBgImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
  },
  space: {
    name: 'Space',
    primaryColor: 'hsl(220, 100%, 65%)',
    secondaryColor: 'hsl(260, 80%, 55%)',
    gradient: 'linear-gradient(180deg, hsl(240, 50%, 4%) 0%, hsl(260, 40%, 8%) 50%, hsl(220, 50%, 6%) 100%)',
    bgOverlay: 'rgba(0, 0, 20, 0.7)',
    defaultBgImage: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80',
  },
  anime: {
    name: 'Anime',
    primaryColor: 'hsl(330, 100%, 65%)',
    secondaryColor: 'hsl(280, 100%, 60%)',
    gradient: 'linear-gradient(180deg, hsl(320, 40%, 5%) 0%, hsl(280, 35%, 8%) 50%, hsl(330, 40%, 6%) 100%)',
    bgOverlay: 'rgba(20, 0, 15, 0.7)',
    defaultBgImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&q=80',
  },
};

export const bgTemplates: { id: string; name: string; url: string; personalities: Personality[] }[] = [
  { id: 'batman-silhouette', name: 'Dark Knight', url: 'https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=800&q=80', personalities: ['batman'] },
  { id: 'batman-city', name: 'Gotham City', url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80', personalities: ['batman'] },
  { id: 'iron-tech', name: 'Tech Lab', url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80', personalities: ['ironman'] },
  { id: 'iron-fire', name: 'Fire & Gold', url: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&q=80', personalities: ['ironman'] },
  { id: 'cyber-neon', name: 'Neon City', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80', personalities: ['cyberpunk'] },
  { id: 'cyber-grid', name: 'Digital Grid', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', personalities: ['cyberpunk'] },
  { id: 'minimal-abstract', name: 'Abstract', url: 'https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?w=800&q=80', personalities: ['minimalist'] },
  { id: 'minimal-clean', name: 'Clean Lines', url: 'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=800&q=80', personalities: ['minimalist'] },
  { id: 'hacker-matrix', name: 'Matrix', url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80', personalities: ['hacker'] },
  { id: 'hacker-code', name: 'Code Stream', url: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?w=800&q=80', personalities: ['hacker'] },
  { id: 'space-galaxy', name: 'Galaxy', url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80', personalities: ['space'] },
  { id: 'space-nebula', name: 'Nebula', url: 'https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=800&q=80', personalities: ['space'] },
  { id: 'anime-sunset', name: 'Sunset', url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&q=80', personalities: ['anime'] },
  { id: 'anime-sakura', name: 'Sakura', url: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&q=80', personalities: ['anime'] },
];
