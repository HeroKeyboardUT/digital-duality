import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export function ScrollToTop() {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 z-50 p-3 border-2 border-foreground transition-all ${
            theme === 'dark'
              ? 'bg-card/90 backdrop-blur-md hover:border-accent hover:shadow-[0_0_20px_hsl(var(--neon-cyan)/0.5)]'
              : 'bg-background/95 backdrop-blur-md hover:bg-foreground hover:text-background'
          }`}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} className={theme === 'dark' ? 'text-primary' : ''} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
