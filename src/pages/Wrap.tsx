import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import { Download, ChevronLeft, Share2 } from 'lucide-react';
import { WrapData, defaultWrapData } from '@/lib/types';
import { getThemeClass } from '@/lib/theme';
import { WrapCard } from '@/components/WrapCard';
import { useToast } from '@/hooks/use-toast';

const Wrap = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<WrapData>(defaultWrapData);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const storedData = sessionStorage.getItem('wrapData');
    if (storedData) {
      try {
        setData(JSON.parse(storedData));
      } catch {
        // Use default data if parsing fails
      }
    }
  }, []);

  const themeClass = getThemeClass(data.personality);

  const handleDownload = async () => {
    if (!wrapRef.current) return;
    
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(wrapRef.current, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
      });
      
      const periodStr = data.periodType === 'monthly' && data.month
        ? `${data.year}-${String(data.month).padStart(2, '0')}`
        : `${data.year}`;
      
      const link = document.createElement('a');
      link.download = `software-engineer-wrap-${periodStr}-${data.personality}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      
      toast({
        title: 'Downloaded!',
        description: 'Your wrap has been saved as an image.',
      });
    } catch (error) {
      toast({
        title: 'Download failed',
        description: 'There was an error generating your image.',
        variant: 'destructive',
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    const periodStr = data.periodType === 'monthly' && data.month
      ? `${new Date(data.year, data.month - 1).toLocaleDateString('en-US', { month: 'long' })} ${data.year}`
      : data.year.toString();
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `My Software Engineer Wrap ${periodStr}`,
          text: `Check out my ${periodStr} coding stats! ${data.linesOfCode} lines of code, ${data.commits} commits, and ${data.coffeesConsumed} coffees consumed!`,
          url: window.location.href,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'Link copied!',
        description: 'Share this link with your friends.',
      });
    }
  };

  return (
    <div className={`min-h-screen hero-gradient ${themeClass}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button 
            onClick={() => navigate('/create')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Edit
          </button>
          <div className="flex gap-3">
            <motion.button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 text-foreground hover:bg-muted transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Share2 className="w-4 h-4" />
              Share
            </motion.button>
            <motion.button
              onClick={handleDownload}
              disabled={isDownloading}
              className="btn-primary flex items-center gap-2 disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="w-4 h-4" />
              {isDownloading ? 'Generating...' : 'Download PNG'}
            </motion.button>
          </div>
        </motion.div>

        {/* Wrap Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <WrapCard ref={wrapRef} data={data} />
        </motion.div>

        {/* Footer hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center text-muted-foreground text-sm mt-8"
        >
          Tip: Download and share on Instagram, Twitter, or LinkedIn!
        </motion.p>
      </div>
    </div>
  );
};

export default Wrap;
