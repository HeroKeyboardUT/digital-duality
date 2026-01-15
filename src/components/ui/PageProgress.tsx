import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export function PageProgress() {
  const { theme } = useTheme();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollProgress);
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress();
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 h-1 z-[100] ${
        theme === 'dark'
          ? 'bg-primary/20'
          : 'bg-foreground/10'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className={`h-full origin-left ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-primary via-accent to-primary shadow-[0_0_10px_hsl(var(--neon-cyan))]'
            : 'bg-foreground'
        }`}
        style={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
    </motion.div>
  );
}
