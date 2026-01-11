import { ThemeProvider, useTheme, t } from "@/context/ThemeContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GlitchTransition } from "@/components/GlitchTransition";
import { CRTOverlay } from "@/components/CRTOverlay";
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight, FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  titleVn: string;
  topic: string;
  topicVn: string;
  description: string;
  descriptionVn: string;
  tech: string[];
  featured?: boolean;
  links?: { github?: string; live?: string; pdf?: string };
  image?: string;
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
    featured: true,
    links: { live: '/rl-playground' },
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600',
  },
  {
    id: 'cinema-management',
    title: 'Cinema Management System',
    titleVn: 'Hệ Thống Quản Lý Rạp Chiếu Phim',
    topic: 'Fullstack, Booking System, Real-time Dashboard',
    topicVn: 'Fullstack, Hệ Thống Đặt Vé, Dashboard Thời Gian Thực',
    description: 'Fullstack web app for cinema operations: booking, administration, and real-time dashboards. One of my most complex projects.',
    descriptionVn: 'Ứng dụng web fullstack quản lý rạp phim: đặt vé, quản trị, dashboard thời gian thực. Một trong những dự án phức tạp nhất.',
    tech: ['ReactJS', 'NodeJS', 'ExpressJS', 'TailwindCSS'],
    featured: true,
    links: { github: 'https://github.com/HeroKeyboardUT/cine-verse-ticket-hub' },
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600',
  },
  {
    id: 'chat-app',
    title: 'Chat App - Social App',
    titleVn: 'Ứng Dụng Chat - Mạng Xã Hội',
    topic: 'Fullstack, Real-time Chat, Video Call',
    topicVn: 'Fullstack, Chat Thời Gian Thực, Video Call',
    description: 'Fullstack social web app with real-time messaging, video calls, friend management, and customizable theme colors.',
    descriptionVn: 'Ứng dụng mạng xã hội fullstack với chat thời gian thực, video call, quản lý bạn bè, và tùy chỉnh giao diện.',
    tech: ['ReactJS', 'ExpressJS', 'MongoDB', 'TailwindCSS'],
    featured: true,
    links: { github: 'https://github.com/HeroKeyboardUT/chatapp' },
    image: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=600',
  },
  {
    id: 'emotion-detection',
    title: 'Emotion Detection AI',
    titleVn: 'AI Nhận Diện Cảm Xúc',
    topic: 'AI, Deep Learning, CNN, Computer Vision',
    topicVn: 'AI, Deep Learning, CNN, Thị Giác Máy Tính',
    description: 'Human emotion detection using deep learning and Convolutional Neural Networks. Demonstrates AI concepts and practical implementation.',
    descriptionVn: 'Nhận diện cảm xúc con người bằng deep learning và CNN. Thể hiện kiến thức AI và triển khai thực tế.',
    tech: ['Python', 'TensorFlow', 'CNN'],
    featured: true,
    links: {
      github: 'https://github.com/TechWizGroup/Emotion_detection/tree/Hieu',
      pdf: '/Emotional_detection.pdf',
    },
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600',
  },
  {
    id: 'internship-crawler',
    title: 'HCMUT CSE Internship Crawler',
    titleVn: 'Crawler Thực Tập CSE HCMUT',
    topic: 'Data Crawling, Web Scraping, Useful Tool',
    topicVn: 'Thu Thập Dữ Liệu, Web Scraping, Công Cụ Hữu Ích',
    description: 'Data crawling tool with ReactJS frontend and NodeJS backend. Features data processing and nice display after crawling.',
    descriptionVn: 'Công cụ thu thập dữ liệu với frontend ReactJS và backend NodeJS. Có xử lý và hiển thị dữ liệu sau khi crawl.',
    tech: ['ReactJS', 'NodeJS', 'TailwindCSS'],
    links: { github: 'https://github.com/HeroKeyboardUT/HCMUT-CSE-Internship-Crawler' },
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600',
  },
  {
    id: 'tsp-solver',
    title: 'Traveling Salesman Solver',
    titleVn: 'Giải Bài Toán Người Bán Hàng',
    topic: 'Discrete Structure, Graph, Branch and Bound',
    topicVn: 'Cấu Trúc Rời Rạc, Đồ Thị, Nhánh Cận',
    description: 'Finding the shortest path to visit all cities using Branch and Bound algorithm. Guaranteed optimal solution but high time complexity for large input.',
    descriptionVn: 'Tìm đường đi ngắn nhất qua tất cả thành phố bằng thuật toán Nhánh Cận. Đảm bảo tối ưu nhưng độ phức tạp cao với đầu vào lớn.',
    tech: ['C++', 'JavaScript', 'HTML', 'CSS'],
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600',
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
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600',
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
    image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=600',
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { theme, language } = useTheme();

  return (
    <motion.article
      className={`grid-cell overflow-hidden ${project.featured ? 'md:col-span-2' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      {/* Image */}
      {project.image && (
        <div className="relative h-40 -mx-4 -mt-4 mb-4 overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          {project.featured && (
            <span className={`absolute top-2 right-2 text-[10px] px-2 py-1 ${
              theme === 'dark' ? 'bg-accent/90 text-background' : 'bg-foreground text-background'
            }`}>
              FEATURED
            </span>
          )}
        </div>
      )}

      {/* Header */}
      <div className="label-text mb-2">PRJ-{String(index + 1).padStart(3, '0')}</div>

      {/* Title */}
      <h3 className={`font-sans font-bold text-xl mb-1 ${theme === 'dark' ? 'text-flicker' : ''}`}>
        <Link to={project.links?.live || `/project/${project.id}`} className="hover:underline">
          {t(language, project.title, project.titleVn)}
        </Link>
      </h3>

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
              theme === 'dark' ? 'border-primary/30' : ''
            }`}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      {project.links && (
        <div className="flex gap-3 mt-auto pt-3 border-t border-foreground/20">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1 text-[10px] transition-colors ${
                theme === 'dark' ? 'hover:text-accent' : 'hover:text-muted-foreground'
              }`}
            >
              <Github size={12} /> CODE
            </a>
          )}
          {project.links.live && (
            <Link
              to={project.links.live}
              className={`flex items-center gap-1 text-[10px] transition-colors ${
                theme === 'dark' ? 'hover:text-accent' : 'hover:text-muted-foreground'
              }`}
            >
              <ExternalLink size={12} /> LIVE DEMO
            </Link>
          )}
          {project.links.pdf && (
            <a
              href={project.links.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1 text-[10px] transition-colors ${
                theme === 'dark' ? 'hover:text-accent' : 'hover:text-muted-foreground'
              }`}
            >
              <FileText size={12} /> REPORT
            </a>
          )}
        </div>
      )}
    </motion.article>
  );
}

function ProjectsContent() {
  const { theme, language } = useTheme();

  return (
    <section className={`py-12 px-4 ${theme === 'dark' ? 'hex-pattern' : ''}`}>
      <div className="container mx-auto max-w-6xl">
        {/* Back Link */}
        <Link 
          to="/"
          className={`inline-flex items-center gap-2 text-sm mb-8 hover:underline ${theme === 'dark' ? 'text-primary' : ''}`}
        >
          <ArrowLeft size={16} />
          {t(language, 'Back to CV', 'Quay lại CV')}
        </Link>

        {/* Section Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="label-text mb-2">{t(language, 'PORTFOLIO', 'HỒ SƠ')}</div>
          <h1 className={`text-4xl sm:text-5xl font-sans font-black mb-4 ${theme === 'dark' ? 'neon-text' : ''}`}>
            {t(language, 'MY PROJECTS', 'DỰ ÁN CỦA TÔI')}
          </h1>
          <p className="text-sm max-w-2xl">
            {t(language,
              'These are projects from subjects I studied and personal projects. Click on any project to see more details or try live demos.',
              'Đây là các dự án từ các môn học và dự án cá nhân. Nhấn vào dự án để xem chi tiết hoặc thử demo.'
            )}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* View GitHub Link */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <a
            href="https://github.com/HeroKeyboardUT"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-6 py-3 border-2 border-foreground text-sm font-bold hover:bg-foreground hover:text-background transition-colors ${
              theme === 'dark' ? 'cyber-btn' : ''
            }`}
          >
            {t(language, 'VIEW ALL ON GITHUB', 'XEM TẤT CẢ TRÊN GITHUB')}
            <ArrowUpRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

const Projects = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <GlitchTransition />
        <CRTOverlay />
        <Header />

        <main className="flex-1">
          <ProjectsContent />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Projects;
