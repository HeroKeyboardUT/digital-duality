import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Github, FileText } from 'lucide-react';
import { useTheme, t } from '@/context/ThemeContext';
import { Link } from 'react-router-dom';
import { featuredProjects } from '@/data';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export function ProjectCarousel() {
  const { theme, language } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <motion.div
      className={`p-5 border-2 
        ${theme === 'dark' ? 'border-primary/50 bg-card/50 backdrop-blur glow-border' : 'border-foreground bg-background'}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 ${theme === 'dark' ? 'bg-accent' : 'bg-foreground'}`} />
          <h2 className="text-sm font-bold uppercase tracking-wider">
            {t(language, 'Featured Projects', 'Dự Án Nổi Bật')}
          </h2>
        </div>
        <div className="text-xs text-muted-foreground">
          {activeIndex + 1} / {featuredProjects.length}
        </div>
      </div>

      <Carousel 
        className="w-full" 
        opts={{ loop: true }}
        setApi={(api) => {
          api?.on('select', () => {
            setActiveIndex(api.selectedScrollSnap());
          });
        }}
      >
        <CarouselContent>
          {featuredProjects.map((project, idx) => (
            <CarouselItem key={project.id}>
              <motion.div
                className={`p-6 border-2 h-full min-h-[220px]
                  ${theme === 'dark' 
                    ? 'border-primary/30 bg-secondary/30 hover:border-primary/60' 
                    : 'border-foreground/30 hover:border-foreground'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {/* Project header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <motion.span 
                      className="text-3xl"
                      animate={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                      {project.icon}
                    </motion.span>
                    <div>
                      <h3 className="font-bold text-lg">
                        {language === 'en' ? project.name : project.nameVn}
                      </h3>
                      <div className={`text-xs uppercase tracking-wider 
                        ${theme === 'dark' ? 'text-accent' : 'text-muted-foreground'}`}>
                        {t(language, 'Featured Project', 'Dự Án Nổi Bật')}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {language === 'en' ? project.description : project.descriptionVn}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIdx) => (
                    <motion.span
                      key={techIdx}
                      className={`px-2 py-0.5 text-xs border
                        ${theme === 'dark' 
                          ? 'border-primary/40 text-primary' 
                          : 'border-foreground/40 text-foreground'}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: techIdx * 0.1 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {project.github && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-1 px-3 py-1.5 text-xs border-2
                        ${theme === 'dark' 
                          ? 'border-primary/50 hover:bg-primary/20' 
                          : 'border-foreground/50 hover:bg-foreground hover:text-background'}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={12} />
                      GitHub
                    </motion.a>
                  )}
                  {project.link && (
                    <Link to={project.link}>
                      <motion.span
                        className={`flex items-center gap-1 px-3 py-1.5 text-xs border-2
                          ${theme === 'dark' 
                            ? 'border-accent/50 bg-accent/10 hover:bg-accent/20' 
                            : 'border-foreground bg-foreground text-background hover:bg-foreground/80'}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink size={12} />
                        {t(language, 'Live Demo', 'Xem Demo')}
                      </motion.span>
                    </Link>
                  )}
                </div>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <CarouselPrevious 
          className={`-left-4 ${theme === 'dark' ? 'border-primary text-primary hover:bg-primary/20' : ''}`}
        />
        <CarouselNext 
          className={`-right-4 ${theme === 'dark' ? 'border-primary text-primary hover:bg-primary/20' : ''}`}
        />
      </Carousel>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mt-4">
        {featuredProjects.map((_, idx) => (
          <motion.div
            key={idx}
            className={`h-1 transition-all duration-300
              ${idx === activeIndex 
                ? `w-6 ${theme === 'dark' ? 'bg-accent' : 'bg-foreground'}` 
                : `w-2 ${theme === 'dark' ? 'bg-primary/30' : 'bg-foreground/30'}`}`}
          />
        ))}
      </div>
    </motion.div>
  );
}
