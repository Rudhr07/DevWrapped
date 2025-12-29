import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Code2, Sparkles, Zap, Calendar, CalendarDays } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { WrapPeriodType } from '@/lib/types';

const Landing = () => {
  const navigate = useNavigate();
  const [showPeriodDialog, setShowPeriodDialog] = useState(false);
  const [selectedPeriodType, setSelectedPeriodType] = useState<WrapPeriodType>('yearly');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const handleCreateWrap = () => {
    const periodData = {
      periodType: selectedPeriodType,
      year: selectedYear,
      month: selectedPeriodType === 'monthly' ? selectedMonth : undefined,
    };
    sessionStorage.setItem('wrapPeriod', JSON.stringify(periodData));
    navigate('/create');
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);
  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];

  return (
    <div className="min-h-screen hero-gradient relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/5 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-24 flex flex-col items-center justify-center min-h-screen">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary font-medium">Your Year in Code</span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-4xl md:text-7xl font-black text-center mb-4"
        >
          <span className="text-foreground">SOFTWARE ENGINEER</span>
          <br />
          <span className="text-gradient glow-text">WRAP</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-muted-foreground text-lg md:text-xl text-center max-w-2xl mb-12"
        >
          Celebrate your coding journey. Visualize your commits, coffees, and conquests 
          in a stunning, shareable wrap.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <button
            onClick={() => setShowPeriodDialog(true)}
            className="btn-primary group inline-flex items-center gap-3 text-lg"
          >
            <Zap className="w-5 h-5" />
            Create Your Wrap
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl"
        >
          {[
            {
              icon: Code2,
              title: 'Track Your Stats',
              description: 'Lines of code, commits, bugs fixed, and more',
            },
            {
              icon: Sparkles,
              title: 'Choose Your Vibe',
              description: '7 unique personalities from Batman to Cyberpunk',
            },
            {
              icon: Zap,
              title: 'Share Instantly',
              description: 'Download as PNG, ready for social media',
            },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              className="card-glass p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <feature.icon className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-display font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Period Selection Dialog */}
      <Dialog open={showPeriodDialog} onOpenChange={setShowPeriodDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">Choose Your Wrap Period</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Period Type Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-muted-foreground">Period Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedPeriodType('yearly')}
                  className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
                    selectedPeriodType === 'yearly'
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <Calendar className="w-6 h-6" />
                  <span className="font-medium">Yearly</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPeriodType('monthly')}
                  className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
                    selectedPeriodType === 'monthly'
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <CalendarDays className="w-6 h-6" />
                  <span className="font-medium">Monthly</span>
                </button>
              </div>
            </div>

            {/* Year Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-muted-foreground">Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="input-field w-full"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Month Selection (only for monthly) */}
            {selectedPeriodType === 'monthly' && (
              <div className="space-y-3">
                <label className="text-sm font-medium text-muted-foreground">Month</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                  className="input-field w-full"
                >
                  {months.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Continue Button */}
            <button
              onClick={handleCreateWrap}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Landing;
