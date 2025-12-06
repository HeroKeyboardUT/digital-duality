import { useState, useEffect } from 'react';
import { useTheme, t } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '#about', label: 'About', labelVn: 'Giới Thiệu' },
  { href: '#projects', label: 'Projects', labelVn: 'Dự Án' },
  { href: '#blog', label: 'Blog', labelVn: 'Blog' },
  { href: '#contact', label: 'Contact', labelVn: 'Liên Hệ' },
];

export function Header() {
  const { theme, language, toggleTheme, toggleLanguage } = useTheme();
  const [time, setTime] = useState(new Date());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toISOString().slice(11, 19);
  };

  return (
    <header className="border-b-[2px] border-foreground bg-background sticky top-0 z-50">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between h-14 px-4">
          {/* Logo */}
          <motion.a 
            href="#"
            className="font-sans font-black text-lg tracking-tight"
            whileHover={{ scale: 1.05 }}
          >
            <span className={theme === 'dark' ? 'neon-text' : ''}>DMQ</span>
            <span className="text-muted-foreground">.dev</span>
          </motion.a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-xs font-bold uppercase tracking-wider hover:text-accent transition-colors ${
                  theme === 'dark' ? 'hover:text-primary' : ''
                }`}
              >
                {t(language, link.label, link.labelVn)}
              </a>
            ))}
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center gap-3">
            {/* Time Display */}
            <div className="hidden lg:flex items-center gap-2 text-[10px]">
              <span className="label-text">UTC</span>
              <span className="font-mono tabular-nums">{formatTime(time)}</span>
            </div>

            {/* Status */}
            <div className="hidden sm:flex items-center gap-2 text-[10px]">
              <div className="status-online" />
              <span className="font-mono">{t(language, 'ONLINE', 'TRỰC TUYẾN')}</span>
            </div>

            {/* Language Toggle */}
            <motion.button
              onClick={toggleLanguage}
              className="px-2 py-1 border-2 border-foreground text-[10px] font-bold hover:bg-foreground hover:text-background transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              {language === 'en' ? 'EN' : 'VN'}
            </motion.button>

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className={`px-3 py-1 border-2 border-foreground text-[10px] font-bold hover:bg-foreground hover:text-background transition-colors ${
                theme === 'dark' ? 'hover:shadow-[0_0_15px_hsl(180_100%_50%/0.5)]' : ''
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <span className={theme === 'dark' ? 'text-flicker' : ''}>
                {theme === 'light' ? 'CYBER' : 'ANALOG'}
              </span>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 border-2 border-foreground"
              whileTap={{ scale: 0.95 }}
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.nav
            className="md:hidden border-t-2 border-foreground"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-sm font-bold uppercase border-b border-foreground/20 hover:bg-foreground hover:text-background transition-colors"
              >
                {t(language, link.label, link.labelVn)}
              </a>
            ))}
          </motion.nav>
        )}
      </div>
    </header>
  );
}
