export type Personality = 
  | 'batman' 
  | 'ironman' 
  | 'cyberpunk' 
  | 'minimalist' 
  | 'hacker' 
  | 'space' 
  | 'anime';

export type WrapPeriodType = 'yearly' | 'monthly';

export interface WrapData {
  periodType: WrapPeriodType;
  year: number;
  month?: number;
  linesOfCode: number;
  commits: number;
  coffeesConsumed: number;
  hoursCoded: number;
  bugsFixed: number;
  projectsShipped: number;
  hoursInMeetings: number;
  mostUsedIDE: string;
  mostUsedLanguages: string[];
  mostUsedApps: string[];
  role: string;
  companyName: string;
  personality: Personality;
  programmerBuddy: string;
  backgroundImage?: string;
  customBgImage?: string;
}

export const defaultWrapData: WrapData = {
  periodType: 'yearly',
  year: new Date().getFullYear(),
  month: undefined,
  linesOfCode: 30000,
  commits: 100,
  coffeesConsumed: 400,
  hoursCoded: 1000,
  bugsFixed: 150,
  projectsShipped: 7,
  hoursInMeetings: 40,
  mostUsedIDE: 'VS Code',
  mostUsedLanguages: ['JavaScript', 'Python', 'TypeScript'],
  mostUsedApps: ['VS Code', 'Slack', 'GitHub'],
  role: 'Sr. SDE',
  companyName: 'TechCorp',
  personality: 'batman',
  programmerBuddy: 'Copilot',
  backgroundImage: '',
  customBgImage: '',
};

export const personalities: { id: Personality; name: string; description: string; colors: string }[] = [
  { id: 'batman', name: 'Batman', description: 'Dark & mysterious', colors: 'Neon Green' },
  { id: 'ironman', name: 'Iron Man', description: 'Bold & futuristic', colors: 'Red & Gold' },
  { id: 'cyberpunk', name: 'Cyberpunk', description: 'Glitch aesthetic', colors: 'Purple & Cyan' },
  { id: 'minimalist', name: 'Minimalist', description: 'Clean elegance', colors: 'White & Grey' },
  { id: 'hacker', name: 'Hacker', description: 'Matrix terminal', colors: 'Matrix Green' },
  { id: 'space', name: 'Space', description: 'Cosmic explorer', colors: 'Blue & Purple' },
  { id: 'anime', name: 'Anime', description: 'Kawaii vibes', colors: 'Pink & Purple' },
];

export const ideOptions = [
  'VS Code', 'IntelliJ IDEA', 'WebStorm', 'PyCharm', 'Vim', 'Neovim', 
  'Sublime Text', 'Atom', 'Eclipse', 'Xcode', 'Android Studio'
];

export const languageOptions = [
  'JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'Rust', 
  'C++', 'C#', 'Ruby', 'PHP', 'Swift', 'Kotlin', 'Scala'
];

export const appOptions = [
  'VS Code', 'Slack', 'GitHub', 'GitLab', 'Jira', 'Notion', 
  'Figma', 'Discord', 'Teams', 'Terminal', 'Docker', 'Postman'
];

export const roleOptions = [
  'Jr. SDE', 'SDE', 'Sr. SDE', 'Staff Engineer', 'Principal Engineer',
  'Tech Lead', 'Engineering Manager', 'Intern', 'Freelancer', 'Founder'
];

export const buddyOptions = [
  'Copilot', 'ChatGPT', 'Claude', 'Gemini', 'Stack Overflow', 'None'
];
