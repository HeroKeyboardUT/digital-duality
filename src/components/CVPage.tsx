import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTheme, t } from '@/context/ThemeContext';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import {
  CVHeader,
  SkillsRadar,
  ProjectCarousel,
  HexagonGrid,
  ExperienceTimeline,
  FloatingActions,
  CVMinimap,
  EducationCard,
  TechSkillsCard,
  SoftSkillsCard,
  SummaryCard,
  CourseworkCard,
} from '@/components/cv';

export function CVPage() {
  const { theme, language } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <div ref={containerRef} className="relative min-h-screen">
      {/* Parallax background */}
      <motion.div
        className={`fixed inset-0 pointer-events-none ${theme === 'dark' ? 'hex-pattern opacity-50' : ''}`}
        style={{ y: backgroundY }}
      />

      {/* Floating particles for dark mode */}
      {theme === 'dark' && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-primary/20 rounded-full"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{ y: [0, -100], opacity: [0, 1, 0] }}
              transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 5 }}
            />
          ))}
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div id="cv-header">
          <CVHeader />
        </div>

        {/* Bento Grid Layout */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Row 1: Education + Summary */}
          <div className="lg:col-span-1">
            <EducationCard />
          </div>
          <div className="lg:col-span-2">
            <SummaryCard />
          </div>

          {/* Row 2: Skills Radar + Tech Skills */}
          <div className="lg:col-span-1 lg:row-span-2">
            <SkillsRadar />
          </div>
          <div className="lg:col-span-1 lg:row-span-2">
            <TechSkillsCard />
          </div>
          <div className="lg:col-span-1">
            <SoftSkillsCard />
          </div>
          
          {/* Hexagon Grid */}
          <div id="cv-knowledge" className="lg:col-span-1">
            <HexagonGrid />
          </div>

          {/* Row 3: Projects Carousel (full width) */}
          <div id="cv-projects" className="lg:col-span-3">
            <ProjectCarousel />
          </div>

          {/* Row 4: Experience + Coursework */}
          <div id="cv-experience" className="lg:col-span-2">
            <ExperienceTimeline />
          </div>
          <div className="lg:col-span-1">
            <CourseworkCard />
          </div>
        </div>

        {/* Footer navigation */}
        <motion.div
          className="mt-8 flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link to="/projects">
            <motion.span
              className={`flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase border-2
                ${theme === 'dark' 
                  ? 'border-primary hover:bg-primary/20' 
                  : 'border-foreground hover:bg-foreground hover:text-background'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t(language, 'View All Projects', 'Xem Tất Cả Dự Án')}
              <ArrowRight size={16} />
            </motion.span>
          </Link>
          <Link to="/blog">
            <motion.span
              className={`flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase border-2
                ${theme === 'dark' 
                  ? 'border-accent hover:bg-accent/20 text-accent' 
                  : 'border-foreground bg-foreground text-background hover:bg-foreground/80'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t(language, 'Knowledge Base', 'Kiến Thức')}
              <ArrowRight size={16} />
            </motion.span>
          </Link>
        </motion.div>
      </div>

      {/* Floating components */}
      <CVMinimap />
      <FloatingActions />
    </div>
  );
}
