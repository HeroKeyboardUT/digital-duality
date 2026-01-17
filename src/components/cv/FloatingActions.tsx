import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Download, Mail, Share2, Printer, X } from 'lucide-react';
import { useTheme, t } from '@/context/ThemeContext';
import { floatingActions, contactInfo, profileInfo } from '@/data';

const iconMap: Record<string, any> = { Download, Mail, Share2, Printer };

const actions = floatingActions.map(action => ({
  ...action,
  IconComponent: iconMap[action.icon],
}));

export function FloatingActions() {
  const { theme, language } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleAction = (action: string) => {
    switch (action) {
      case 'download':
        window.print();
        break;
      case 'contact':
        window.location.href = `mailto:${contactInfo.email}`;
        break;
      case 'share':
        if (navigator.share) {
          navigator.share({
            title: `${profileInfo.name} - CV`,
            url: window.location.href,
          });
        } else {
          navigator.clipboard.writeText(window.location.href);
        }
        break;
      case 'print':
        window.print();
        break;
    }
    setIsOpen(false);
  };

  return (
    <motion.div
      className="fixed bottom-24 right-6 z-50"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
    >
      {/* Action buttons */}
      <AnimatePresence>
        {isOpen && (
          <div className="absolute bottom-16 right-0 flex flex-col gap-3">
            {actions.map((action, idx) => (
              <motion.button
                key={action.action}
                className={`flex items-center gap-2 px-4 py-2 border-2 whitespace-nowrap
                  ${theme === 'dark' 
                    ? 'border-primary bg-card text-foreground hover:bg-primary/20' 
                    : 'border-foreground bg-background hover:bg-foreground hover:text-background'}
                  transition-colors`}
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => handleAction(action.action)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <action.IconComponent size={16} />
                <span className="text-xs font-bold uppercase">
                  {language === 'en' ? action.label : action.labelVn}
                </span>
              </motion.button>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main toggle button */}
      <motion.button
        className={`w-14 h-14 flex items-center justify-center border-2
          ${theme === 'dark' 
            ? 'border-accent bg-card text-accent glow-border' 
            : 'border-foreground bg-foreground text-background'}
          ${isOpen ? 'rotate-45' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {isOpen ? <X size={24} /> : <Plus size={24} />}
      </motion.button>

      {/* Ripple effect */}
      {theme === 'dark' && !isOpen && (
        <motion.div
          className="absolute inset-0 border-2 border-accent pointer-events-none"
          animate={{
            scale: [1, 1.5, 1.5],
            opacity: [0.5, 0, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      )}
    </motion.div>
  );
}
