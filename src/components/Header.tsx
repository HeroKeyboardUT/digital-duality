import { useState, useEffect } from 'react';
import { useTheme, t } from '@/context/ThemeContext';
import { motion } from 'framer-motion';

export function Header() {
  const { theme, language, toggleTheme, toggleLanguage } = useTheme();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toISOString().slice(11, 19);
  };

  return (
    <header className="border-b-[2px] border-foreground bg-background sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-12 px-2">
          {/* Logo - ASCII Style */}
          <div className="flex items-center gap-4">
            <motion.pre 
              className="text-[8px] leading-none font-mono select-none hidden sm:block"
              whileHover={{ scale: 1.05 }}
            >
{`╔══════════════╗
║  DAO.ARCH    ║
╚══════════════╝`}
            </motion.pre>
            <span className="sm:hidden font-sans font-black text-sm">DAO.ARCH</span>
          </div>

          {/* System Status */}
          <div className="hidden md:flex items-center gap-6 text-[10px]">
            <div className="flex items-center gap-2">
              <span className="label-text">{t(language, 'STATUS', 'TRẠNG THÁI')}</span>
              <div className="status-online" />
              <span className="font-mono">{t(language, 'ONLINE', 'TRỰC TUYẾN')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="label-text">UTC</span>
              <span className="font-mono tabular-nums">{formatTime(time)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="label-text">LAT/LONG</span>
              <span className="font-mono">21.0285°N, 105.8542°E</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <motion.button
              onClick={toggleLanguage}
              className="grid-cell !p-1 px-2 text-[10px] font-mono"
              whileTap={{ scale: 0.95 }}
            >
              {language === 'en' ? 'EN' : 'VN'}
            </motion.button>

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="grid-cell !p-1 px-3 text-[10px] font-mono flex items-center gap-2"
              whileTap={{ scale: 0.95 }}
              whileHover={{ 
                boxShadow: theme === 'dark' 
                  ? '0 0 20px hsl(180 100% 50% / 0.5)' 
                  : 'none' 
              }}
            >
              <span className={theme === 'dark' ? 'neon-text' : ''}>
                {t(language, 'SYSTEM TOGGLE', 'CHUYỂN CHẾ ĐỘ')}
              </span>
              <span className="hidden sm:inline">
                [{theme === 'light' ? 'ANALOGUE' : 'CYBER'}]
              </span>
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  );
}
