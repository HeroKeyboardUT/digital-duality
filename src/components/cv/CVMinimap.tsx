import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme, t } from '@/context/ThemeContext';
import { User, GraduationCap, Code, Briefcase, FolderOpen, Brain, Book } from 'lucide-react';

const sections = [
  { id: 'cv-header', icon: User, label: 'Profile', labelVn: 'Hồ Sơ' },
  { id: 'cv-education', icon: GraduationCap, label: 'Education', labelVn: 'Học Vấn' },
  { id: 'cv-skills', icon: Code, label: 'Skills', labelVn: 'Kỹ Năng' },
  { id: 'cv-projects', icon: FolderOpen, label: 'Projects', labelVn: 'Dự Án' },
  { id: 'cv-experience', icon: Briefcase, label: 'Experience', labelVn: 'Kinh Nghiệm' },
  { id: 'cv-knowledge', icon: Brain, label: 'Knowledge', labelVn: 'Kiến Thức' },
  { id: 'cv-coursework', icon: Book, label: 'Courses', labelVn: 'Môn Học' },
];

export function CVMinimap() {
  const { theme, language } = useTheme();
  const [activeSection, setActiveSection] = useState('cv-header');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      className={`fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:block`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <motion.div
        className={`p-2 border-2 
          ${theme === 'dark' 
            ? 'border-primary/50 bg-card/80 backdrop-blur-sm' 
            : 'border-foreground/30 bg-background/80 backdrop-blur-sm'}`}
        animate={{ width: isExpanded ? 140 : 40 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <div className="space-y-1">
          {sections.map((section, idx) => {
            const isActive = activeSection === section.id;
            const Icon = section.icon;
            
            return (
              <motion.button
                key={section.id}
                className={`w-full flex items-center gap-2 p-1.5 transition-all duration-200
                  ${isActive 
                    ? theme === 'dark' 
                      ? 'bg-primary/20 text-accent' 
                      : 'bg-foreground text-background'
                    : theme === 'dark'
                      ? 'text-primary/60 hover:text-primary hover:bg-primary/10'
                      : 'text-foreground/60 hover:text-foreground hover:bg-muted'
                  }`}
                onClick={() => scrollToSection(section.id)}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={14} className="flex-shrink-0" />
                <motion.span
                  className="text-[10px] font-bold uppercase tracking-tight whitespace-nowrap overflow-hidden"
                  animate={{ opacity: isExpanded ? 1 : 0, width: isExpanded ? 'auto' : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {language === 'en' ? section.label : section.labelVn}
                </motion.span>
              </motion.button>
            );
          })}
        </div>

        {/* Progress indicator */}
        <motion.div
          className={`mt-2 h-1 ${theme === 'dark' ? 'bg-primary/20' : 'bg-muted'}`}
        >
          <motion.div
            className={`h-full ${theme === 'dark' ? 'bg-accent' : 'bg-foreground'}`}
            style={{
              width: `${((sections.findIndex(s => s.id === activeSection) + 1) / sections.length) * 100}%`,
            }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
