import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Code2, GitCommit, Coffee, Clock, Bug, Rocket, Video, Bot,
  Briefcase, Building2, Monitor, ChevronLeft, Sparkles, Image
} from 'lucide-react';
import { 
  WrapData, defaultWrapData, ideOptions, languageOptions, 
  appOptions, roleOptions, buddyOptions, Personality 
} from '@/lib/types';
import { PersonalitySelector } from '@/components/PersonalitySelector';
import { BackgroundSelector } from '@/components/BackgroundSelector';
import { getThemeClass, themeConfigs } from '@/lib/theme';

const Create = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<WrapData>(defaultWrapData);

  useEffect(() => {
    const periodData = sessionStorage.getItem('wrapPeriod');
    if (periodData) {
      const { periodType, year, month } = JSON.parse(periodData);
      setFormData(prev => ({
        ...prev,
        periodType,
        year,
        month
      }));
    }
  }, []);
  const themeClass = getThemeClass(formData.personality);
  const theme = themeConfigs[formData.personality];

  const updateField = <K extends keyof WrapData>(field: K, value: WrapData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem('wrapData', JSON.stringify(formData));
    navigate('/wrap');
  };

  const toggleArrayItem = (field: 'mostUsedLanguages' | 'mostUsedApps', item: string) => {
    const current = formData[field];
    if (current.includes(item)) {
      updateField(field, current.filter(i => i !== item));
    } else if (current.length < 4) {
      updateField(field, [...current, item]);
    }
  };

  return (
    <div className={`min-h-screen hero-gradient ${themeClass}`}>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Create Your{' '}
            <span 
              style={{ 
                background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Wrap
            </span>
          </h1>
          <p className="text-muted-foreground mt-2">
            {formData.periodType === 'yearly' 
              ? `Enter your ${formData.year} developer stats`
              : `Enter your ${new Date(formData.year, (formData.month || 1) - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} developer stats`
            }
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Stats Section */}
          <motion.section 
            className="card-glass p-6 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="font-display font-semibold text-foreground flex items-center gap-2">
              <Sparkles className="w-5 h-5" style={{ color: theme.primaryColor }} />
              Your Stats
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                  <Code2 className="w-4 h-4" /> Lines of Code
                </label>
                <input
                  type="number"
                  value={formData.linesOfCode}
                  onChange={(e) => updateField('linesOfCode', parseInt(e.target.value) || 0)}
                  className="input-field w-full"
                  placeholder="30000"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                  <GitCommit className="w-4 h-4" /> Commits
                </label>
                <input
                  type="number"
                  value={formData.commits}
                  onChange={(e) => updateField('commits', parseInt(e.target.value) || 0)}
                  className="input-field w-full"
                  placeholder="100"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                  <Coffee className="w-4 h-4" /> Coffees Consumed
                </label>
                <input
                  type="number"
                  value={formData.coffeesConsumed}
                  onChange={(e) => updateField('coffeesConsumed', parseInt(e.target.value) || 0)}
                  className="input-field w-full"
                  placeholder="400"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4" /> Hours Coded
                </label>
                <input
                  type="number"
                  value={formData.hoursCoded}
                  onChange={(e) => updateField('hoursCoded', parseInt(e.target.value) || 0)}
                  className="input-field w-full"
                  placeholder="1000"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                  <Bug className="w-4 h-4" /> Bugs Fixed
                </label>
                <input
                  type="number"
                  value={formData.bugsFixed}
                  onChange={(e) => updateField('bugsFixed', parseInt(e.target.value) || 0)}
                  className="input-field w-full"
                  placeholder="150"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                  <Rocket className="w-4 h-4" /> Projects Shipped
                </label>
                <input
                  type="number"
                  value={formData.projectsShipped}
                  onChange={(e) => updateField('projectsShipped', parseInt(e.target.value) || 0)}
                  className="input-field w-full"
                  placeholder="7"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                  <Video className="w-4 h-4" /> Hours in Meetings
                </label>
                <input
                  type="number"
                  value={formData.hoursInMeetings}
                  onChange={(e) => updateField('hoursInMeetings', parseInt(e.target.value) || 0)}
                  className="input-field w-full"
                  placeholder="40"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                  <Bot className="w-4 h-4" /> Programmer Buddy
                </label>
                <select
                  value={formData.programmerBuddy}
                  onChange={(e) => updateField('programmerBuddy', e.target.value)}
                  className="input-field w-full"
                >
                  {buddyOptions.map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.section>

          {/* Tools Section */}
          <motion.section 
            className="card-glass p-6 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="font-display font-semibold text-foreground flex items-center gap-2">
              <Monitor className="w-5 h-5" style={{ color: theme.primaryColor }} />
              Your Tools
            </h2>
            
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Most Used IDE</label>
              <select
                value={formData.mostUsedIDE}
                onChange={(e) => updateField('mostUsedIDE', e.target.value)}
                className="input-field w-full"
              >
                {ideOptions.map(ide => (
                  <option key={ide} value={ide}>{ide}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Most Used Languages (select up to 4)
              </label>
              <div className="flex flex-wrap gap-2">
                {languageOptions.map(lang => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => toggleArrayItem('mostUsedLanguages', lang)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                      formData.mostUsedLanguages.includes(lang)
                        ? 'text-primary-foreground'
                        : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                    }`}
                    style={{
                      backgroundColor: formData.mostUsedLanguages.includes(lang) ? theme.primaryColor : undefined
                    }}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Most Used Apps (select up to 4)
              </label>
              <div className="flex flex-wrap gap-2">
                {appOptions.map(app => (
                  <button
                    key={app}
                    type="button"
                    onClick={() => toggleArrayItem('mostUsedApps', app)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                      formData.mostUsedApps.includes(app)
                        ? 'text-primary-foreground'
                        : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                    }`}
                    style={{
                      backgroundColor: formData.mostUsedApps.includes(app) ? theme.primaryColor : undefined
                    }}
                  >
                    {app}
                  </button>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Profile Section */}
          <motion.section 
            className="card-glass p-6 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="font-display font-semibold text-foreground flex items-center gap-2">
              <Briefcase className="w-5 h-5" style={{ color: theme.primaryColor }} />
              Your Profile
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                  <Briefcase className="w-4 h-4" /> Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => updateField('role', e.target.value)}
                  className="input-field w-full"
                >
                  {roleOptions.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                  Developer Name
                </label>
                <input
                  type="text"
                  value={formData.developerName}
                  onChange={(e) => updateField('developerName', e.target.value)}
                  className="input-field w-full"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                  <Building2 className="w-4 h-4" /> Company Name
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => updateField('companyName', e.target.value)}
                  className="input-field w-full"
                  placeholder="TechCorp"
                />
              </div>
            </div>
          </motion.section>

          {/* Theme Section */}
          <motion.section 
            className="card-glass p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <PersonalitySelector
              selected={formData.personality}
              onSelect={(p: Personality) => {
                updateField('personality', p);
                updateField('backgroundImage', '');
              }}
            />
          </motion.section>

          {/* Background Section */}
          <motion.section 
            className="card-glass p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <BackgroundSelector
              personality={formData.personality}
              selected={formData.backgroundImage || ''}
              customBg={formData.customBgImage || ''}
              onSelect={(url) => updateField('backgroundImage', url)}
              onCustomBg={(url) => updateField('customBgImage', url)}
            />
          </motion.section>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <button 
              type="submit" 
              className="w-full text-lg font-semibold py-4 rounded-lg transition-all"
              style={{
                backgroundColor: theme.primaryColor,
                color: 'hsl(220, 20%, 4%)',
                boxShadow: `0 0 30px ${theme.primaryColor}40`
              }}
            >
              Generate My Wrap
            </button>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default Create;
