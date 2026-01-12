import { ThemeProvider } from '@/context/ThemeContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CRTOverlay } from '@/components/CRTOverlay';
import { motion } from 'framer-motion';
import { useTheme, t } from '@/context/ThemeContext';
import { Link } from 'react-router-dom';
import { Github, ExternalLink, FileText, ArrowLeft, Play, Filter } from 'lucide-react';
import { useState } from 'react';

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
  },
];

const categories = ['All', 'AI/ML', 'Fullstack', 'Algorithms', 'Tools'];

function ProjectsContent() {
  const { theme, language } = useTheme();
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className={`min-h-screen py-8 px-4 ${theme === 'dark' ? 'hex-pattern' : ''}`}>
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className={`inline-flex items-center gap-2 text-sm mb-4 hover:underline ${theme === 'dark' ? 'text-accent' : ''}`}
          >
            <ArrowLeft size={16} /> {t(language, 'Back to CV', 'Quay Lại CV')}
          </Link>
          
          <motion.h1 
            className={`text-4xl md:text-5xl font-sans font-black mb-4 ${theme === 'dark' ? 'neon-text' : ''}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t(language, 'MY PROJECTS', 'CÁC DỰ ÁN')}
          </motion.h1>
          <p className="text-sm max-w-2xl text-muted-foreground">
            {t(language,
              'Collection of my academic and personal projects. Click on any project to see more details.',
              'Tổng hợp các dự án học tập và cá nhân. Click vào bất kỳ dự án nào để xem chi tiết.'
            )}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <Filter size={14} className="text-muted-foreground" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 text-xs border transition-all ${
                activeCategory === cat
                  ? theme === 'dark' 
                    ? 'border-accent text-accent bg-accent/10' 
                    : 'border-foreground bg-foreground text-background'
                  : 'border-foreground/30 hover:border-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredProjects.map((project, i) => (
            <motion.article
              key={project.id}
              className={`border-2 border-foreground p-5 ${theme === 'dark' ? 'glow-border' : ''} ${
                project.featured ? 'md:col-span-2' : ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-1.5 py-0.5 border ${theme === 'dark' ? 'border-primary text-primary' : 'border-foreground/50'}`}>
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className={`text-[10px] ${theme === 'dark' ? 'text-accent' : ''}`}>[FEATURED]</span>
                  )}
                  {project.hasDemo && (
                    <span className={`text-[10px] flex items-center gap-1 ${theme === 'dark' ? 'text-accent' : 'text-green-600'}`}>
                      <Play size={10} /> DEMO
                    </span>
                  )}
                </div>
              </div>

              {/* Title */}
              <h2 className={`font-sans font-bold text-xl mb-1 ${theme === 'dark' ? 'text-flicker' : ''}`}>
                <Link 
                  to={project.links?.live || `/project/${project.id}`} 
                  className="hover:underline"
                >
                  {t(language, project.title, project.titleVn)}
                </Link>
              </h2>
              
              {/* Topic */}
              <div className={`text-sm mb-3 ${theme === 'dark' ? 'text-primary' : 'text-muted-foreground'}`}>
                {t(language, project.topic, project.topicVn)}
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed mb-4">
                {t(language, project.description, project.descriptionVn)}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1 mb-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className={`text-[9px] px-1.5 py-0.5 border border-foreground/30 ${
                      theme === 'dark' ? 'hover:border-accent hover:text-accent' : ''
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-3 pt-3 border-t border-foreground/20">
                {project.links?.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1 text-xs transition-colors ${
                      theme === 'dark' ? 'hover:text-accent' : 'hover:text-muted-foreground'
                    }`}
                  >
                    <Github size={14} /> Code
                  </a>
                )}
                {project.links?.live && (
                  <Link
                    to={project.links.live}
                    className={`flex items-center gap-1 text-xs transition-colors ${
                      theme === 'dark' ? 'hover:text-accent' : 'hover:text-muted-foreground'
                    }`}
                  >
                    <ExternalLink size={14} /> {project.hasDemo ? 'Try Demo' : 'Live'}
                  </Link>
                )}
                {project.links?.pdf && (
                  <a
                    href={project.links.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1 text-xs transition-colors ${
                      theme === 'dark' ? 'hover:text-accent' : 'hover:text-muted-foreground'
                    }`}
                  >
                    <FileText size={14} /> Report
                  </a>
                )}
                <Link
                  to={project.links?.live || `/project/${project.id}`}
                  className={`flex items-center gap-1 text-xs ml-auto transition-colors ${
                    theme === 'dark' ? 'hover:text-accent' : 'hover:text-muted-foreground'
                  }`}
                >
                  View Details →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* GitHub Link */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <a
            href="https://github.com/HeroKeyboardUT"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-6 py-3 border-2 border-foreground text-sm font-bold hover:bg-foreground hover:text-background transition-colors ${
              theme === 'dark' ? 'cyber-btn' : ''
            }`}
          >
            <Github size={16} /> {t(language, 'View All on GitHub', 'Xem Tất Cả Trên GitHub')}
          </a>
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
