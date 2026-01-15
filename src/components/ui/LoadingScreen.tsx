import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export function LoadingScreen() {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if already loaded in this session
    const hasLoaded = sessionStorage.getItem('hasLoaded');
    if (hasLoaded) {
      setIsLoading(false);
      return;
    }

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            sessionStorage.setItem('hasLoaded', 'true');
          }, 300);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center ${
            theme === 'dark' ? 'bg-background' : 'bg-background'
          }`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Cyber grid background for dark mode */}
          {theme === 'dark' && (
            <div className="absolute inset-0 hex-pattern opacity-30" />
          )}

          {/* Logo / Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative mb-8"
          >
            <h1
              className={`font-sans font-black text-5xl sm:text-7xl ${
                theme === 'dark' ? 'neon-text glitch' : 'text-foreground'
              }`}
              data-text="HIEUDZ"
            >
              HIEU<span className={theme === 'dark' ? 'text-accent' : ''}>DZ</span>
            </h1>
          </motion.div>

          {/* Loading bar */}
          <div className="w-64 sm:w-80">
            <div className="flex justify-between text-[10px] mb-2 font-mono">
              <span className={theme === 'dark' ? 'text-primary' : ''}>LOADING...</span>
              <span className={theme === 'dark' ? 'text-accent' : ''}>{Math.min(100, Math.floor(progress))}%</span>
            </div>
            <div
              className={`h-1 overflow-hidden ${
                theme === 'dark' ? 'bg-primary/20' : 'bg-foreground/10'
              }`}
            >
              <motion.div
                className={`h-full ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-primary via-accent to-primary shadow-[0_0_10px_hsl(var(--neon-cyan))]'
                    : 'bg-foreground'
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, progress)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>

          {/* Status text */}
          <motion.div
            className="mt-4 text-[10px] text-muted-foreground font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {progress < 30 && 'Initializing system...'}
            {progress >= 30 && progress < 60 && 'Loading assets...'}
            {progress >= 60 && progress < 90 && 'Preparing interface...'}
            {progress >= 90 && 'Ready!'}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
