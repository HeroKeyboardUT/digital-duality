import { MainLayout } from '@/layouts/MainLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, t } from '@/context/ThemeContext';
import { Link } from 'react-router-dom';
import { ArrowLeft, Layers, Sparkles } from 'lucide-react';
import { useState, useMemo } from 'react';
import { projects, projectCategories } from '@/data/projects';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { SearchFilter, CategoryFilter } from '@/components/filters/SearchFilter';
import { useFilter } from '@/hooks/useFilter';

function ProjectsContent() {
  const { theme, language } = useTheme();
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const {
    filteredItems: filteredProjects,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
  } = useFilter({
    items: projects,
    searchFields: ['title', 'titleVn'],
    categoryField: 'category',
    arraySearchFields: ['tech'],
  });

  const stats = useMemo(() => ({
    total: projects.length,
    featured: projects.filter(p => p.featured).length,
    withDemo: projects.filter(p => p.hasDemo).length,
  }), []);

  return (
    <div className={`min-h-screen py-8 px-4 relative overflow-hidden ${theme === 'dark' ? 'hex-pattern' : ''}`}>
      {theme === 'dark' && (
        <>
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </>
      )}

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div className="mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/" className={`inline-flex items-center gap-2 text-sm mb-6 group ${theme === 'dark' ? 'text-accent hover:text-primary' : 'hover:text-muted-foreground'}`}>
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            {t(language, 'Back to Home', 'Quay Lại Trang Chủ')}
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 border-2 border-foreground ${theme === 'dark' ? 'bg-primary/10' : 'bg-muted'}`}>
                  <Layers size={24} className={theme === 'dark' ? 'text-accent' : ''} />
                </div>
                <span className="text-xs font-mono text-muted-foreground">// PROJECT_SHOWCASE</span>
              </div>
              <h1 className={`text-4xl md:text-6xl font-sans font-black ${theme === 'dark' ? 'neon-text' : ''}`}>
                {t(language, 'MY PROJECTS', 'CÁC DỰ ÁN')}
              </h1>
            </div>

            <div className="flex gap-4">
              {[
                { value: stats.total, label: t(language, 'Total', 'Tổng') },
                { value: stats.featured, label: t(language, 'Featured', 'Nổi Bật') },
                { value: stats.withDemo, label: 'Demo' },
              ].map((stat, i) => (
                <div key={i} className={`text-center p-3 border border-foreground/20 ${theme === 'dark' ? 'bg-background/50' : ''}`}>
                  <div className={`text-2xl font-black ${theme === 'dark' ? 'text-accent' : ''}`}>{stat.value}</div>
                  <div className="text-[10px] text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Filter Bar */}
        <motion.div 
          className={`p-4 border-2 border-foreground mb-6 ${theme === 'dark' ? 'glow-border bg-background/80 backdrop-blur-sm' : 'bg-background'}`}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <SearchFilter 
              searchQuery={searchQuery} 
              onSearchChange={setSearchQuery}
              placeholder="Search projects or tech..."
              placeholderVn="Tìm kiếm dự án hoặc công nghệ..."
            />
            <CategoryFilter 
              categories={projectCategories} 
              activeCategory={activeCategory} 
              onCategoryChange={setActiveCategory} 
            />
          </div>
        </motion.div>

        <div className="mb-4 text-xs text-muted-foreground">
          {t(language, `Showing ${filteredProjects.length} projects`, `Hiển thị ${filteredProjects.length} dự án`)}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <ProjectCard 
                key={project.id}
                project={project}
                index={i}
                isHovered={hoveredProject === project.id}
                onHover={setHoveredProject}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

const Projects = () => (
  <MainLayout>
    <ProjectsContent />
  </MainLayout>
);

export default Projects;
