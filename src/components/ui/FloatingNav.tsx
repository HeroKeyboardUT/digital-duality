import { motion } from 'framer-motion';
import { useTheme, t } from '@/context/ThemeContext';
import { Home, User, Briefcase, BookOpen, Mail, FileText, Gamepad2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavItem {
  icon: React.ElementType;
  label: string;
  labelVn: string;
  href: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: 'Home', labelVn: 'Trang Chu', href: '/' },
  { icon: User, label: 'CV', labelVn: 'CV', href: '/cv' },
  { icon: Briefcase, label: 'Projects', labelVn: 'Du An', href: '/projects' },
  { icon: BookOpen, label: 'Blog', labelVn: 'Blog', href: '/blog' },
  { icon: Gamepad2, label: 'RL Lab', labelVn: 'RL Lab', href: '/rl-playground' },
];

export function FloatingNav() {
  const { theme, language } = useTheme();
  const location = useLocation();

  return (
    <motion.nav
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 lg:hidden ${
        theme === 'dark'
          ? 'bg-card/95 backdrop-blur-md border-2 border-primary/50 shadow-[0_0_30px_hsl(var(--neon-cyan)/0.2)]'
          : 'bg-background/95 backdrop-blur-md border-2 border-foreground shadow-lg'
      }`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex items-center gap-1 p-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex flex-col items-center px-3 py-2 transition-all ${
                isActive
                  ? theme === 'dark'
                    ? 'text-accent'
                    : 'bg-foreground text-background'
                  : theme === 'dark'
                    ? 'text-muted-foreground hover:text-primary'
                    : 'hover:bg-foreground/5'
              }`}
            >
              <Icon size={18} />
              <span className="text-[8px] mt-1 font-bold">
                {t(language, item.label, item.labelVn)}
              </span>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
