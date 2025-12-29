import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toPng } from 'html-to-image';
import { Download, ChevronLeft, Share2, X } from 'lucide-react';
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
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [sharePopupData, setSharePopupData] = useState({ platform: '', url: '', copied: false });

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
      // Get the actual dimensions of the element
      const element = wrapRef.current;
      const rect = element.getBoundingClientRect();
      
      const dataUrl = await toPng(element, {
        quality: 1,
        pixelRatio: 2,
        cacheBust: true,
        width: rect.width,
        height: rect.height,
        style: {
          transform: 'none',
          margin: '0',
        }
      });
      
      const periodStr = data.periodType === 'monthly' && data.month
        ? `${data.year}-${String(data.month).padStart(2, '0')}`
        : `${data.year}`;
      
      const link = document.createElement('a');
      link.download = `software-engineer-wrap-${periodStr}-${data.personality}.png`;
      link.href = dataUrl;
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
    if (!wrapRef.current) return;
    
    // Check if mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Try native share API only on mobile
    if (isMobile && navigator.share) {
      try {
        setIsDownloading(true);
        
        const periodStr = data.periodType === 'monthly' && data.month
          ? `${new Date(data.year, data.month - 1).toLocaleDateString('en-US', { month: 'long' })} ${data.year}`
          : data.year.toString();
        
        const shareText = `Check out my ${periodStr} coding stats! 💻 ${data.linesOfCode} lines of code, ${data.commits} commits, and ${data.coffeesConsumed} coffees consumed!`;
        
        // Get the actual dimensions of the element
        const element = wrapRef.current;
        const rect = element.getBoundingClientRect();
        
        const dataUrl = await toPng(element, {
          quality: 1,
          pixelRatio: 2,
          cacheBust: true,
          width: rect.width,
          height: rect.height,
          style: {
            transform: 'none',
            margin: '0',
          }
        });
        
        // Convert data URL to blob
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        const file = new File([blob], `devwrapped-${periodStr}.png`, { type: 'image/png' });
        
        // Check if we can share files
        if (navigator.canShare?.({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: 'My Dev Wrapped',
            text: shareText,
          });
          
          toast({
            title: 'Shared!',
            description: 'Your wrap has been shared successfully.',
          });
          setIsDownloading(false);
          return;
        }
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          console.log('Native share failed, showing menu');
        }
        setIsDownloading(false);
      }
    }
    
    // Show custom share menu on desktop or as fallback
    setShowShareMenu(!showShareMenu);
  };

  const shareToSocial = async (platform: string) => {
    if (!wrapRef.current) return;
    
    const periodStr = data.periodType === 'monthly' && data.month
      ? `${new Date(data.year, data.month - 1).toLocaleDateString('en-US', { month: 'long' })} ${data.year}`
      : data.year.toString();
    
    const shareText = `Check out my ${periodStr} coding stats! 💻 ${data.linesOfCode} lines of code, ${data.commits} commits, and ${data.coffeesConsumed} coffees consumed!`;
    const shareUrl = window.location.href;
    
    // For Instagram, LinkedIn, and Facebook - copy image to clipboard and open platform
    if (platform === 'instagram' || platform === 'linkedin' || platform === 'facebook-image') {
      setIsDownloading(true);
      try {
        // Get the actual dimensions of the element
        const element = wrapRef.current;
        const rect = element.getBoundingClientRect();
        
        const dataUrl = await toPng(element, {
          quality: 1,
          pixelRatio: 2,
          cacheBust: true,
          width: rect.width,
          height: rect.height,
          style: {
            transform: 'none',
            margin: '0',
          }
        });
        
        // Convert data URL to blob
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        
        // Try to copy image to clipboard
        let copiedToClipboard = false;
        try {
          await navigator.clipboard.write([
            new ClipboardItem({
              'image/png': blob
            })
          ]);
          copiedToClipboard = true;
        } catch (clipboardError) {
          console.log('Clipboard copy failed, will download instead');
        }
        
        // Set platform info
        let platformUrl = '';
        let platformName = '';
        
        if (platform === 'instagram') {
          platformUrl = 'https://www.instagram.com/';
          platformName = 'Instagram';
        } else if (platform === 'linkedin') {
          platformUrl = 'https://www.linkedin.com/feed/?shareActive=true';
          platformName = 'LinkedIn';
        } else if (platform === 'facebook-image') {
          platformUrl = 'https://www.facebook.com/';
          platformName = 'Facebook';
        }
        
        // Handle fallback download if clipboard failed
        if (!copiedToClipboard) {
          const blobUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = blobUrl;
          link.download = `devwrapped-${periodStr}.png`;
          link.click();
        }
        
        // Show popup with instructions
        setSharePopupData({ platform: platformName, url: platformUrl, copied: copiedToClipboard });
        setShowSharePopup(true);
        setShowShareMenu(false);
        
        // Open platform after 7 seconds
        setTimeout(() => {
          window.open(platformUrl, '_blank');
          setShowSharePopup(false);
        }, 7000);
        
        setShowShareMenu(false);
      } catch (error) {
        toast({
          title: 'Share failed',
          description: 'There was an error generating your image.',
          variant: 'destructive',
        });
      } finally {
        setIsDownloading(false);
      }
      return;
    }
    
    let url = '';
    
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
        break;
      case 'telegram':
        url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        break;
      case 'reddit':
        url = `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl);
        toast({
          title: 'Link copied!',
          description: 'Share link has been copied to clipboard.',
        });
        setShowShareMenu(false);
        return;
    }
    
    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
      setShowShareMenu(false);
    }
  };

  return (
    <div className={`min-h-screen hero-gradient ${themeClass}`}>
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Header */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 relative z-50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button 
            onClick={() => navigate('/create')}
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
          >
            <ChevronLeft className="w-5 h-5" />
            Edit
          </button>
          <div className="flex gap-3 relative">
            <div className="relative">
              <motion.button
                onClick={handleShare}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all border border-white/20 font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </motion.button>
              
              {/* Share Menu */}
              {showShareMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full mt-2 right-0 bg-background/95 backdrop-blur-lg border border-border rounded-lg shadow-lg p-2 min-w-[200px] z-50"
                >
                  <button
                    onClick={() => shareToSocial('instagram')}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-accent rounded-md transition-colors text-left"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    <span className="font-medium">Instagram</span>
                  </button>
                  <button
                    onClick={() => shareToSocial('linkedin')}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-accent rounded-md transition-colors text-left"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    <span className="font-medium">LinkedIn</span>
                  </button>
                  <button
                    onClick={() => shareToSocial('facebook-image')}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-accent rounded-md transition-colors text-left"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    <span className="font-medium">Facebook</span>
                  </button>
                  <div className="h-px bg-border my-1" />
                  <button
                    onClick={() => shareToSocial('whatsapp')}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-accent rounded-md transition-colors text-left"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    <span className="font-medium">WhatsApp</span>
                  </button>
                  <button
                    onClick={() => shareToSocial('twitter')}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-accent rounded-md transition-colors text-left"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    <span className="font-medium">X (Twitter)</span>
                  </button>
                  <button
                    onClick={() => shareToSocial('telegram')}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-accent rounded-md transition-colors text-left"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                    <span className="font-medium">Telegram</span>
                  </button>
                  <button
                    onClick={() => shareToSocial('reddit')}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-accent rounded-md transition-colors text-left"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>
                    <span className="font-medium">Reddit</span>
                  </button>
                  <div className="h-px bg-border my-1" />
                  <button
                    onClick={() => shareToSocial('copy')}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-accent rounded-md transition-colors text-left"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    <span className="font-medium">Copy Link</span>
                  </button>
                </motion.div>
              )}
            </div>
            
            <motion.button
              onClick={handleDownload}
              disabled={isDownloading}
              className="btn-primary flex items-center gap-2 disabled:opacity-50 px-5 py-2.5 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-4 h-4" />
              {isDownloading ? 'Generating...' : 'Download'}
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
          className="text-center text-muted-foreground text-xs md:text-sm mt-6 md:mt-8 px-4"
        >
          Tip: Download and share on Instagram, Twitter, or LinkedIn!
        </motion.p>
      </div>

      {/* Share Instruction Popup */}
      {showSharePopup && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-br from-background/95 to-background/90 backdrop-blur-lg rounded-2xl p-6 md:p-8 max-w-md w-full border-2 border-primary/50 shadow-2xl"
          >
            <div className="text-center space-y-4 md:space-y-6">
              {/* Success Icon */}
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              {/* Title */}
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-primary mb-2">
                  {sharePopupData.copied ? '✅ Image Copied!' : '📥 Image Downloaded!'}
                </h3>
                <p className="text-base md:text-lg text-muted-foreground">
                  Opening {sharePopupData.platform} in 7 seconds...
                </p>
              </div>
              
              {/* Instructions */}
              <div className="bg-primary/10 rounded-lg p-3 md:p-4 border border-primary/30">
                <p className="text-sm md:text-base text-foreground font-medium">
                  {sharePopupData.copied ? (
                    <>
                      Click in the post area and press{' '}
                      <kbd className="px-1.5 md:px-2 py-0.5 md:py-1 bg-background/50 rounded border border-primary/50 font-mono text-xs md:text-sm">
                        Ctrl+V
                      </kbd>
                      {' '}to paste your wrap!
                    </>
                  ) : (
                    'Upload the downloaded image from your downloads folder.'
                  )}
                </p>
              </div>
              
              {/* Open Now Button */}
              <button
                onClick={() => {
                  window.open(sharePopupData.url, '_blank');
                  setShowSharePopup(false);
                }}
                className="w-full btn-primary py-2.5 md:py-3 text-base md:text-lg font-semibold"
              >
                Open {sharePopupData.platform} Now
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 py-6 md:py-8 mt-8 md:mt-12 border-t border-primary/20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <p className="text-muted-foreground text-xs md:text-sm mb-2">
              Built with caffeine ☕, debugging sessions 🐛, and questionable life choices 💭
            </p>
            <p className="text-foreground text-sm md:text-base font-medium">
              Crafted by{' '}
              <a 
                href="https://www.linkedin.com/in/rudhr-chauhan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors font-semibold"
              >
                Rudhr Chauhan
              </a>
              {' '}👨‍💻
            </p>
            <p className="text-muted-foreground text-xs mt-2">
              Because developers need their Spotify Style Wrapped too 🎯
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default Wrap;
