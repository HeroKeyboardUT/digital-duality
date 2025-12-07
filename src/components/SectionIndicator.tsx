import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, t } from '@/context/ThemeContext';
import { useEffect, useState } from 'react';
import { Home, User, Briefcase, BookOpen, Mail, ChevronUp, ChevronDown } from 'lucide-react';

interface Section {
  id: string;
  label: string;
  labelVn: string;
  icon: React.ElementType;
  description: string;
  descriptionVn: string;
}

const sections: Section[] = [
  { 
    id: 'hero', 
    label: 'HOME', 
    labelVn: 'TRANG CHỦ',
    icon: Home,
    description: 'Welcome to my digital portfolio',
    descriptionVn: 'Chào mừng đến portfolio của tôi'
  },
  { 
    id: 'about', 
    label: 'ABOUT', 
    labelVn: 'GIỚI THIỆU',
    icon: User,
    description: 'Biography, Education & Skills',
    descriptionVn: 'Tiểu sử, Học vấn & Kỹ năng'
  },
  { 
    id: 'projects', 
    label: 'PROJECTS', 
    labelVn: 'DỰ ÁN',
    icon: Briefcase,
    description: '7+ projects showcasing my work',
    descriptionVn: '7+ dự án thể hiện công việc'
  },
  { 
    id: 'blog', 
    label: 'BLOG', 
    labelVn: 'BÀI VIẾT',
    icon: BookOpen,
    description: 'Articles & learning journey',
    descriptionVn: 'Bài viết & hành trình học tập'
  },
  { 
    id: 'contact', 
    label: 'CONTACT', 
    labelVn: 'LIÊN HỆ',
    icon: Mail,
    description: 'Get in touch with me',
    descriptionVn: 'Liên hệ với tôi'
  },
];

export function SectionIndicator() {
  const { theme, language } = useTheme();
  const [activeSection, setActiveSection] = useState('hero');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(s => ({
        id: s.id,
        element: document.getElementById(s.id)
      }));

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section.element) {
          const offsetTop = section.element.offsetTop;
          if (scrollPosition >= offsetTop) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentSection = sections.find(s => s.id === activeSection) || sections[0];
  const currentIndex = sections.findIndex(s => s.id === activeSection);
  const Icon = currentSection.icon;

  const navigateTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsExpanded(false);
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      navigateTo(sections[currentIndex - 1].id);
    }
  };

  const goToNext = () => {
    if (currentIndex < sections.length - 1) {
      navigateTo(sections[currentIndex + 1].id);
    }
  };

  return (
    <motion.div
      className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
    >
      {/* Main Indicator Box */}
      <div 
        className={`relative ${
          theme === 'dark' 
            ? 'bg-card/90 backdrop-blur-md border-2 border-primary/50 shadow-[0_0_30px_hsl(var(--neon-cyan)/0.2)]' 
            : 'bg-background/95 backdrop-blur-md border-2 border-foreground shadow-lg'
        }`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Corner decorations */}
        <div className={`absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 ${theme === 'dark' ? 'border-accent' : 'border-foreground'}`} />
        <div className={`absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 ${theme === 'dark' ? 'border-accent' : 'border-foreground'}`} />
        <div className={`absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 ${theme === 'dark' ? 'border-accent' : 'border-foreground'}`} />
        <div className={`absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 ${theme === 'dark' ? 'border-accent' : 'border-foreground'}`} />

        <div className="p-3 min-w-[140px]">
          {/* Navigation arrows */}
          <div className="flex justify-between items-center mb-2">
            <button 
              onClick={goToPrev}
              disabled={currentIndex === 0}
              className={`p-1 transition-all ${
                currentIndex === 0 
                  ? 'opacity-30 cursor-not-allowed' 
                  : theme === 'dark' 
                    ? 'hover:text-accent hover:scale-110' 
                    : 'hover:scale-110'
              }`}
            >
              <ChevronUp size={14} />
            </button>
            <span className={`text-[8px] ${theme === 'dark' ? 'text-primary/50' : 'text-muted-foreground'}`}>
              {String(currentIndex + 1).padStart(2, '0')}/{String(sections.length).padStart(2, '0')}
            </span>
            <button 
              onClick={goToNext}
              disabled={currentIndex === sections.length - 1}
              className={`p-1 transition-all ${
                currentIndex === sections.length - 1 
                  ? 'opacity-30 cursor-not-allowed' 
                  : theme === 'dark' 
                    ? 'hover:text-accent hover:scale-110' 
                    : 'hover:scale-110'
              }`}
            >
              <ChevronDown size={14} />
            </button>
          </div>

          {/* Current Section */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="text-center"
            >
              <div className={`flex justify-center mb-2 ${theme === 'dark' ? 'text-accent' : ''}`}>
                <Icon size={20} className={theme === 'dark' ? 'animate-pulse' : ''} />
              </div>
              <div className={`text-[10px] font-bold tracking-wider ${theme === 'dark' ? 'text-primary neon-text' : ''}`}>
                {t(language, currentSection.label, currentSection.labelVn)}
              </div>
              <div className="text-[8px] text-muted-foreground mt-1 leading-tight">
                {t(language, currentSection.description, currentSection.descriptionVn)}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress bar */}
          <div className="mt-3 h-0.5 bg-foreground/10 overflow-hidden">
            <motion.div 
              className={`h-full ${theme === 'dark' ? 'bg-accent shadow-[0_0_10px_hsl(var(--neon-green))]' : 'bg-foreground'}`}
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / sections.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Expanded Section List */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className={`absolute left-full top-0 ml-2 ${
                theme === 'dark' 
                  ? 'bg-card/95 backdrop-blur-md border-2 border-primary/50' 
                  : 'bg-background/95 backdrop-blur-md border-2 border-foreground'
              }`}
              initial={{ opacity: 0, x: -10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-2 space-y-1">
                {sections.map((section, idx) => {
                  const SectionIcon = section.icon;
                  const isActive = section.id === activeSection;
                  return (
                    <motion.button
                      key={section.id}
                      onClick={() => navigateTo(section.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-left transition-all ${
                        isActive 
                          ? theme === 'dark'
                            ? 'bg-primary/20 border-l-2 border-accent'
                            : 'bg-foreground text-background'
                          : theme === 'dark'
                            ? 'hover:bg-primary/10'
                            : 'hover:bg-foreground/5'
                      }`}
                      whileHover={{ x: 4 }}
                    >
                      <SectionIcon size={12} />
                      <span className="text-[10px] font-bold tracking-wider whitespace-nowrap">
                        {t(language, section.label, section.labelVn)}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Vertical Line Connector */}
      <div className="absolute left-1/2 -translate-x-1/2 top-full h-8 w-px">
        <div className={`w-full h-full ${theme === 'dark' ? 'bg-gradient-to-b from-primary/50 to-transparent' : 'bg-gradient-to-b from-foreground/30 to-transparent'}`} />
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-full h-8 w-px">
        <div className={`w-full h-full ${theme === 'dark' ? 'bg-gradient-to-t from-primary/50 to-transparent' : 'bg-gradient-to-t from-foreground/30 to-transparent'}`} />
      </div>
    </motion.div>
  );
}
