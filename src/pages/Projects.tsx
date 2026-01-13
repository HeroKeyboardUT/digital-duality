import { ThemeProvider } from '@/context/ThemeContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CRTOverlay } from '@/components/CRTOverlay';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, t } from '@/context/ThemeContext';
import { Link } from 'react-router-dom';
import { Github, ExternalLink, FileText, ArrowLeft, Play, Filter, Search, Layers, Code2, Sparkles, ChevronRight } from 'lucide-react';
import { useState, useMemo } from 'react';

interface Project {
  id: string;
  title: string;
  titleVn: string;
  topic: string;
  topicVn: string;
  description: string;
  descriptionVn: string;
  tech: string[];
  category: string;
  featured?: boolean;
  hasDemo?: boolean;
  icon: string;
  links?: { github?: string; live?: string; pdf?: string };
}

const projects: Project[] = [
  {
    id: 'rl-playground',
    title: 'RL Grid World Playground',
    titleVn: 'Sân Chơi RL Grid World',
    topic: 'Reinforcement Learning, Q-Learning, SARSA, Interactive Demo',
    topicVn: 'Học Tăng Cường, Q-Learning, SARSA, Demo Tương Tác',
    description: 'Interactive RL playground with multiple algorithms (Q-Learning, SARSA, Expected SARSA, Monte Carlo), customizable environment, and real-time visualizations.',
    descriptionVn: 'Sân chơi RL tương tác với nhiều thuật toán, môi trường tùy chỉnh, và trực quan hóa thời gian thực.',
    tech: ['React', 'TypeScript', 'Reinforcement Learning'],
    category: 'AI/ML',
    featured: true,
    hasDemo: true,
    icon: '🎮',
    links: { live: '/rl-playground' },
  },
  {
    id: 'emotion-detection',
    title: 'Emotion Detection AI',
    titleVn: 'AI Nhận Diện Cảm Xúc',
    topic: 'AI, Deep Learning, CNN, Computer Vision',
    topicVn: 'AI, Deep Learning, CNN, Thị Giác Máy Tính',
    description: 'Human emotion detection using deep learning and Convolutional Neural Networks. Demonstrates AI concepts and practical implementation.',
    descriptionVn: 'Nhận diện cảm xúc con người bằng deep learning và CNN. Thể hiện kiến thức AI và triển khai thực tế.',
    tech: ['Python', 'TensorFlow', 'CNN', 'OpenCV'],
    category: 'AI/ML',
    featured: true,
    icon: '🤖',
    links: { 
      github: 'https://github.com/TechWizGroup/Emotion_detection/tree/Hieu',
      pdf: './image/Emotional_detection.pdf'
    },
  },
  {
    id: 'cinema-management',
    title: 'Cinema Management System',
    titleVn: 'Hệ Thống Quản Lý Rạp Chiếu Phim',
    topic: 'Fullstack, Booking System, Real-time Dashboard',
    topicVn: 'Fullstack, Hệ Thống Đặt Vé, Dashboard Thời Gian Thực',
    description: 'Fullstack web app for cinema operations: booking, administration, and real-time dashboards. One of my most complex projects.',
    descriptionVn: 'Ứng dụng web fullstack quản lý rạp phim: đặt vé, quản trị, dashboard thời gian thực. Một trong những dự án phức tạp nhất.',
    tech: ['ReactJS', 'NodeJS', 'ExpressJS', 'TailwindCSS', 'MySQL'],
    category: 'Fullstack',
    featured: true,
    icon: '🎬',
    links: { github: 'https://github.com/HeroKeyboardUT/cine-verse-ticket-hub' },
  },
  {
    id: 'chat-app',
    title: 'Chat App - Social App',
    titleVn: 'Ứng Dụng Chat - Mạng Xã Hội',
    topic: 'Fullstack, Real-time Chat, Video Call',
    topicVn: 'Fullstack, Chat Thời Gian Thực, Video Call',
    description: 'Fullstack social web app with real-time messaging, video calls, friend management, and customizable theme colors.',
    descriptionVn: 'Ứng dụng mạng xã hội fullstack với chat thời gian thực, video call, quản lý bạn bè, và tùy chỉnh giao diện.',
    tech: ['ReactJS', 'ExpressJS', 'MongoDB', 'Socket.io', 'WebRTC'],
    category: 'Fullstack',
    featured: true,
    icon: '💬',
    links: { github: 'https://github.com/HeroKeyboardUT/chatapp' },
  },
  {
    id: 'internship-crawler',
    title: 'HCMUT CSE Internship Crawler',
    titleVn: 'Crawler Thực Tập CSE HCMUT',
    topic: 'Data Crawling, Web Scraping, Useful Tool',
    topicVn: 'Thu Thập Dữ Liệu, Web Scraping, Công Cụ Hữu Ích',
    description: 'Data crawling tool with ReactJS frontend and NodeJS backend. Features data processing and nice display after crawling.',
    descriptionVn: 'Công cụ thu thập dữ liệu với frontend ReactJS và backend NodeJS. Có xử lý và hiển thị dữ liệu sau khi crawl.',
    tech: ['ReactJS', 'NodeJS', 'TailwindCSS', 'Cheerio'],
    category: 'Tools',
    featured: true,
    icon: '🕷️',
    links: { github: 'https://github.com/HeroKeyboardUT/HCMUT-CSE-Internship-Crawler' },
  },
  {
    id: 'tsp-solver',
    title: 'Traveling Salesman Solver',
    titleVn: 'Giải Bài Toán Người Bán Hàng',
    topic: 'Discrete Structure, Graph, Branch and Bound',
    topicVn: 'Cấu Trúc Rời Rạc, Đồ Thị, Nhánh Cận',
    description: 'Finding the shortest path to visit all cities using Branch and Bound algorithm. Guaranteed optimal solution but high time complexity for large input (>20 cities).',
    descriptionVn: 'Tìm đường đi ngắn nhất qua tất cả thành phố bằng thuật toán Nhánh Cận. Đảm bảo tối ưu nhưng độ phức tạp cao với đầu vào lớn (>20 thành phố).',
    tech: ['C++', 'JavaScript', 'HTML', 'CSS'],
    category: 'Algorithms',
    featured: true,
    icon: '🗺️',
  },
  {
    id: 'cutting-stock',
    title: 'Cutting Stock Problem',
    titleVn: 'Bài Toán Cắt Vật Liệu',
    topic: 'Math Modelling, Integer Linear Programming, Optimization',
    topicVn: 'Mô Hình Toán, Quy Hoạch Tuyến Tính, Tối Ưu',
    description: 'Cutting stock into pieces to minimize waste using First Fit Decreasing algorithm. Suitable for large input with low time complexity.',
    descriptionVn: 'Cắt vật liệu thành các mảnh để giảm thiểu lãng phí bằng thuật toán First Fit Decreasing.',
    tech: ['JavaScript', 'Python', 'HTML', 'CSS'],
    category: 'Algorithms',
    icon: '✂️',
  },
  {
    id: 'quiz-app',
    title: 'Quiz App',
    titleVn: 'Ứng Dụng Quiz',
    topic: 'Side Project, Practice, Quiz, Test',
    topicVn: 'Dự Án Phụ, Luyện Tập, Trắc Nghiệm',
    description: 'Simple quiz app for practicing and testing knowledge with custom questions. Easy to use interface.',
    descriptionVn: 'Ứng dụng quiz đơn giản để luyện tập và kiểm tra kiến thức với câu hỏi tùy chỉnh.',
    tech: ['JavaScript', 'HTML', 'CSS'],
    category: 'Tools',
    icon: '❓',
  },
];

const categories = ['All', 'AI/ML', 'Fullstack', 'Algorithms', 'Tools'];

function ProjectsContent() {
  const { theme, language } = useTheme();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch = searchQuery === '' || 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const stats = useMemo(() => ({
    total: projects.length,
    featured: projects.filter(p => p.featured).length,
    withDemo: projects.filter(p => p.hasDemo).length,
  }), []);

  return (
    <div className={`min-h-screen py-8 px-4 relative overflow-hidden ${theme === 'dark' ? 'hex-pattern' : ''}`}>
      {/* Background decorations */}
      {theme === 'dark' && (
        <>
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </>
      )}

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link 
            to="/" 
            className={`inline-flex items-center gap-2 text-sm mb-6 group ${theme === 'dark' ? 'text-accent hover:text-primary' : 'hover:text-muted-foreground'}`}
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            {t(language, 'Back to Home', 'Quay Lại Trang Chủ')}
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <motion.div 
                className="flex items-center gap-3 mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className={`p-2 border-2 border-foreground ${theme === 'dark' ? 'bg-primary/10' : 'bg-muted'}`}>
                  <Layers size={24} className={theme === 'dark' ? 'text-accent' : ''} />
                </div>
                <span className="text-xs font-mono text-muted-foreground">// PROJECT_SHOWCASE</span>
              </motion.div>
              <motion.h1 
                className={`text-4xl md:text-6xl font-sans font-black ${theme === 'dark' ? 'neon-text' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {t(language, 'MY PROJECTS', 'CÁC DỰ ÁN')}
              </motion.h1>
              <motion.p 
                className="text-sm max-w-xl mt-2 text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {t(language,
                  'Collection of academic and personal projects. Click on any project to explore.',
                  'Tổng hợp các dự án học tập và cá nhân. Click vào để khám phá.'
                )}
              </motion.p>
            </div>

            {/* Stats */}
            <motion.div 
              className="flex gap-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
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
            </motion.div>
          </div>
        </motion.div>

        {/* Search & Filter Bar */}
        <motion.div 
          className={`p-4 border-2 border-foreground mb-6 ${theme === 'dark' ? 'glow-border bg-background/80 backdrop-blur-sm' : 'bg-background'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder={t(language, 'Search projects or tech...', 'Tìm kiếm dự án hoặc công nghệ...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 text-sm border-2 border-foreground/30 bg-transparent focus:outline-none transition-all ${
                  theme === 'dark' ? 'focus:border-accent focus:shadow-[0_0_15px_hsl(var(--neon-cyan)/0.3)]' : 'focus:border-foreground'
                }`}
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter size={14} className="text-muted-foreground" />
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs font-bold border-2 transition-all ${
                    activeCategory === cat
                      ? theme === 'dark' 
                        ? 'border-accent text-accent bg-accent/10 shadow-[0_0_10px_hsl(var(--neon-cyan)/0.3)]' 
                        : 'border-foreground bg-foreground text-background'
                      : 'border-foreground/30 hover:border-foreground'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results count */}
        <motion.div 
          className="mb-4 text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {t(language, `Showing ${filteredProjects.length} projects`, `Hiển thị ${filteredProjects.length} dự án`)}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.article
                key={project.id}
                layout
                className={`group border-2 border-foreground p-6 relative overflow-hidden ${
                  theme === 'dark' ? 'glow-border bg-background/80 backdrop-blur-sm' : 'bg-background'
                } ${project.featured ? 'lg:col-span-2' : ''}`}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Background decoration */}
                <motion.div 
                  className={`absolute -right-10 -top-10 text-8xl opacity-10 pointer-events-none transition-all duration-500 ${
                    hoveredProject === project.id ? 'opacity-20 scale-110' : ''
                  }`}
                >
                  {project.icon}
                </motion.div>

                {/* Hover glow effect */}
                {theme === 'dark' && hoveredProject === project.id && (
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                )}

                {/* Header */}
                <div className="flex justify-between items-start mb-4 relative">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[10px] px-2 py-1 border-2 font-bold ${
                      theme === 'dark' ? 'border-primary text-primary' : 'border-foreground/50'
                    }`}>
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className={`text-[10px] flex items-center gap-1 ${theme === 'dark' ? 'text-accent' : ''}`}>
                        <Sparkles size={10} /> FEATURED
                      </span>
                    )}
                    {project.hasDemo && (
                      <span className={`text-[10px] flex items-center gap-1 px-2 py-0.5 ${
                        theme === 'dark' ? 'bg-accent/20 text-accent' : 'bg-green-100 text-green-700'
                      }`}>
                        <Play size={10} /> LIVE DEMO
                      </span>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h2 className={`font-sans font-bold text-xl mb-2 group-hover:translate-x-1 transition-transform ${
                  theme === 'dark' ? 'text-flicker' : ''
                }`}>
                  <Link 
                    to={project.links?.live || `/project/${project.id}`} 
                    className="hover:underline flex items-center gap-2"
                  >
                    {t(language, project.title, project.titleVn)}
                    <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </h2>
                
                {/* Topic */}
                <div className={`text-sm mb-4 ${theme === 'dark' ? 'text-primary' : 'text-muted-foreground'}`}>
                  {t(language, project.topic, project.topicVn)}
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed mb-5 text-muted-foreground">
                  {t(language, project.description, project.descriptionVn)}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tech.map((tech) => (
                    <motion.span
                      key={tech}
                      className={`text-[10px] px-2 py-1 border border-foreground/30 transition-all ${
                        theme === 'dark' ? 'hover:border-accent hover:text-accent' : 'hover:bg-foreground hover:text-background'
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-4 border-t border-foreground/20">
                  {project.links?.github && (
                    <motion.a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${
                        theme === 'dark' ? 'hover:text-accent' : 'hover:text-muted-foreground'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={14} /> Source
                    </motion.a>
                  )}
                  {project.links?.live && (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        to={project.links.live}
                        className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${
                          theme === 'dark' ? 'hover:text-accent' : 'hover:text-muted-foreground'
                        }`}
                      >
                        <ExternalLink size={14} /> {project.hasDemo ? 'Try Demo' : 'Live'}
                      </Link>
                    </motion.div>
                  )}
                  {project.links?.pdf && (
                    <motion.a
                      href={project.links.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${
                        theme === 'dark' ? 'hover:text-accent' : 'hover:text-muted-foreground'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FileText size={14} /> Report
                    </motion.a>
                  )}
                  <Link
                    to={project.links?.live || `/project/${project.id}`}
                    className={`flex items-center gap-1.5 text-xs font-bold ml-auto transition-colors ${
                      theme === 'dark' ? 'text-accent hover:text-primary' : ''
                    }`}
                  >
                    <Code2 size={14} /> {t(language, 'Details', 'Chi Tiết')} →
                  </Link>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-muted-foreground mb-4">
              {t(language, 'No projects found matching your criteria.', 'Không tìm thấy dự án phù hợp.')}
            </p>
            <button
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className={`text-sm underline ${theme === 'dark' ? 'text-accent' : ''}`}
            >
              {t(language, 'Clear filters', 'Xóa bộ lọc')}
            </button>
          </motion.div>
        )}

        {/* GitHub CTA */}
        <motion.div
          className={`mt-12 p-8 border-2 border-foreground text-center ${theme === 'dark' ? 'glow-border' : ''}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'neon-text' : ''}`}>
            {t(language, 'Want to see more?', 'Muốn xem thêm?')}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {t(language, 'Check out my GitHub for more projects and contributions.', 'Xem GitHub của tôi để thấy thêm dự án và đóng góp.')}
          </p>
          <motion.a
            href="https://github.com/HeroKeyboardUT"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-8 py-4 border-2 border-foreground text-sm font-bold transition-all ${
              theme === 'dark' ? 'cyber-btn hover:shadow-[0_0_30px_hsl(var(--neon-cyan))]' : 'hover:bg-foreground hover:text-background'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Github size={18} /> {t(language, 'View GitHub Profile', 'Xem GitHub')}
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <CRTOverlay />
        <Header />
        <main className="flex-1">
          <ProjectsContent />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
