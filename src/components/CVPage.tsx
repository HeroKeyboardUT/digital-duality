import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme, t } from '@/context/ThemeContext';
import { Github, Linkedin, Mail, Phone, MapPin, Calendar, GraduationCap, Briefcase, Code, Brain, ArrowRight, FileText, BookOpen, Download, Zap, Star, Terminal, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import hcmutLogo from '@/assets/hcmut-logo.png';

const skills = {
  languages: ['C++', 'C', 'Python', 'Java', 'JavaScript', 'TypeScript', 'SQL'],
  frontend: ['React', 'TailwindCSS', 'HTML/CSS', 'Framer Motion'],
  backend: ['Node.js', 'Express.js', 'FastAPI', 'REST APIs'],
  database: ['MySQL', 'MongoDB', 'PostgreSQL'],
  aiml: ['TensorFlow', 'CNN', 'Deep Learning', 'Reinforcement Learning'],
  tools: ['Git', 'Docker', 'Postman', 'Figma', 'LaTeX'],
};

const featuredProjects = [
  { id: 'cinema-management', name: 'Cinema Management System', nameVn: 'Hệ Thống Quản Lý Rạp Phim', tech: 'React, Node.js, Express', icon: 'CM' },
  { id: 'chat-app', name: 'Real-time Chat App', nameVn: 'Ứng Dụng Chat Thời Gian Thực', tech: 'React, MongoDB, WebSocket', icon: 'CH' },
  { id: 'emotion-detection', name: 'Emotion Detection AI', nameVn: 'AI Nhận Diện Cảm Xúc', tech: 'Python, TensorFlow, CNN', icon: 'AI' },
  { id: 'rl-playground', name: 'RL Grid World', nameVn: 'Sân Chơi RL Grid World', tech: 'React, TypeScript', link: '/rl-playground', icon: 'RL' },
];

const experiences = [
  {
    title: 'Computer Science Student',
    titleVn: 'Sinh Viên KHMT',
    company: 'HCMUT - Bach Khoa',
    period: '2023 - Present',
    description: 'Studying Computer Science with focus on Software Engineering, AI/ML, and System Design.',
    descriptionVn: 'Học Khoa học Máy tính với trọng tâm Kỹ thuật Phần mềm, AI/ML, và Thiết kế Hệ thống.',
  },
];

export function CVPage() {
  const { theme, language } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div ref={containerRef} className={`min-h-screen relative overflow-hidden ${theme === 'dark' ? 'hex-pattern' : ''}`}>
      {/* Animated Background Elements */}
      {theme === 'dark' && (
        <>
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            style={{ y: backgroundY }}
          >
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 200}%`,
                }}
                animate={{
                  opacity: [0.1, 0.6, 0.1],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </motion.div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
        </>
      )}

      <div className="container mx-auto max-w-6xl px-4 py-8 relative z-10">
        {/* CV Header with 3D effect */}
        <motion.div 
          className={`relative mb-8 p-8 border-2 border-foreground ${theme === 'dark' ? 'glow-border bg-background/80 backdrop-blur-sm' : 'bg-background'}`}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative corners */}
          <div className={`absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 ${theme === 'dark' ? 'border-accent' : 'border-foreground'}`} />
          <div className={`absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 ${theme === 'dark' ? 'border-accent' : 'border-foreground'}`} />
          <div className={`absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 ${theme === 'dark' ? 'border-accent' : 'border-foreground'}`} />
          <div className={`absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 ${theme === 'dark' ? 'border-accent' : 'border-foreground'}`} />
          
          <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
            {/* Avatar with glow effect */}
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className={`w-32 h-32 border-4 border-foreground flex items-center justify-center ${theme === 'dark' ? 'shadow-[0_0_30px_hsl(var(--neon-cyan)/0.5)]' : ''}`}>
                <img src={hcmutLogo} alt="HCMUT" className="w-28 h-28 object-contain" />
              </div>
              {theme === 'dark' && (
                <motion.div 
                  className="absolute inset-0 border-2 border-accent"
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              <div className={`absolute -bottom-2 -right-2 px-2 py-1 text-[8px] font-bold ${theme === 'dark' ? 'bg-accent text-background' : 'bg-foreground text-background'}`}>
                VER 2.0
              </div>
            </motion.div>

            {/* Info Section */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                  {theme === 'dark' && <Terminal size={16} className="text-accent" />}
                  <span className="text-xs font-mono text-muted-foreground">// DEVELOPER_PROFILE</span>
                </div>
                <h1 className={`text-4xl md:text-6xl font-sans font-black mb-2 ${theme === 'dark' ? 'neon-text' : ''}`}>
                  PHAM QUANG HIEU
                </h1>
                <div className={`text-lg font-bold flex items-center justify-center lg:justify-start gap-2 mb-4 ${theme === 'dark' ? 'text-accent' : 'text-muted-foreground'}`}>
                  <Zap size={16} className={theme === 'dark' ? 'animate-pulse' : ''} />
                  {t(language, 'Computer Science Student | Software Developer', 'Sinh Viên KHMT | Lập Trình Viên')}
                </div>
              </motion.div>

              {/* Contact badges */}
              <motion.div 
                className="flex flex-wrap gap-2 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {[
                  { icon: Mail, text: 'phamquanghieulop95@gmail.com', href: 'mailto:phamquanghieulop95@gmail.com' },
                  { icon: Phone, text: '0397961039', href: 'tel:0397961039' },
                  { icon: MapPin, text: 'Bien Hoa, Vietnam', href: null },
                ].map((item, i) => (
                  <motion.a
                    key={i}
                    href={item.href || undefined}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs border border-foreground/30 transition-all ${
                      theme === 'dark' 
                        ? 'hover:border-accent hover:text-accent hover:shadow-[0_0_10px_hsl(var(--neon-cyan)/0.3)]' 
                        : 'hover:bg-foreground hover:text-background'
                    } ${!item.href ? 'cursor-default' : ''}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <item.icon size={12} /> {item.text}
                  </motion.a>
                ))}
              </motion.div>

              {/* Social Links */}
              <motion.div 
                className="flex gap-3 mt-4 justify-center lg:justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {[
                  { icon: Github, href: 'https://github.com/HeroKeyboardUT', label: 'GitHub' },
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/phamquanghieuutcs/', label: 'LinkedIn' },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 border-2 border-foreground transition-all ${
                      theme === 'dark' ? 'cyber-btn hover:shadow-[0_0_20px_hsl(var(--neon-cyan))]' : 'hover:bg-foreground hover:text-background'
                    }`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))}
                <motion.button
                  className={`flex items-center gap-2 px-4 py-2 border-2 border-foreground font-bold text-sm ${
                    theme === 'dark' ? 'cyber-btn hover:shadow-[0_0_20px_hsl(var(--neon-green))]' : 'hover:bg-foreground hover:text-background'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download size={14} /> {t(language, 'Download CV', 'Tải CV')}
                </motion.button>
              </motion.div>
            </div>

            {/* Status Card */}
            <motion.div 
              className={`hidden xl:block p-4 border-2 border-dashed ${theme === 'dark' ? 'border-accent bg-accent/5' : 'border-foreground bg-muted/50'}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <motion.span 
                  className="w-3 h-3 bg-green-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-xs font-bold">{t(language, 'Open for Internship', 'Sẵn Sàng Thực Tập')}</span>
              </div>
              <p className="text-[10px] text-muted-foreground max-w-[180px]">
                {t(language, 
                  'Seeking opportunities in software development and AI/ML.',
                  'Tìm kiếm cơ hội trong phát triển phần mềm và AI/ML.'
                )}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Grid Layout */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Education Card */}
            <motion.section
              className={`p-5 border-2 border-foreground relative overflow-hidden ${theme === 'dark' ? 'glow-border' : ''}`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className={`absolute top-0 right-0 w-20 h-20 ${theme === 'dark' ? 'bg-primary/10' : 'bg-muted'} -mr-10 -mt-10 rounded-full`} />
              <div className="flex items-center gap-2 mb-4 relative">
                <GraduationCap size={18} className={theme === 'dark' ? 'text-accent' : ''} />
                <h2 className="text-sm font-bold uppercase tracking-wider">{t(language, 'Education', 'Học Vấn')}</h2>
              </div>
              <div className="space-y-2 relative">
                <h3 className="font-bold text-sm">VNU-HCM University of Technology</h3>
                <div className="text-xs text-muted-foreground">Bachelor of Computer Science</div>
                <div className="flex items-center gap-2 text-xs">
                  <Calendar size={12} /> 2023 - 2027
                </div>
                <motion.div 
                  className={`text-2xl font-black ${theme === 'dark' ? 'text-primary neon-text' : ''}`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', delay: 0.2 }}
                >
                  GPA: 3.5/4.0
                </motion.div>
              </div>
            </motion.section>

            {/* Skills Section with Progress */}
            <motion.section
              className={`p-5 border-2 border-foreground ${theme === 'dark' ? 'glow-border' : ''}`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Code size={18} className={theme === 'dark' ? 'text-accent' : ''} />
                <h2 className="text-sm font-bold uppercase tracking-wider">{t(language, 'Technical Skills', 'Kỹ Năng Kỹ Thuật')}</h2>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Languages', labelVn: 'Ngôn Ngữ', items: skills.languages, color: 'primary' },
                  { label: 'Frontend', labelVn: 'Frontend', items: skills.frontend, color: 'accent' },
                  { label: 'Backend', labelVn: 'Backend', items: skills.backend, color: 'primary' },
                  { label: 'Database', labelVn: 'Cơ Sở Dữ Liệu', items: skills.database, color: 'accent' },
                  { label: 'AI/ML', labelVn: 'AI/ML', items: skills.aiml, color: 'primary' },
                  { label: 'Tools', labelVn: 'Công Cụ', items: skills.tools, color: 'accent' },
                ].map((category, idx) => (
                  <motion.div 
                    key={category.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <div className="text-[10px] font-bold text-muted-foreground mb-1.5">
                      {t(language, category.label, category.labelVn)}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {category.items.map((item, i) => (
                        <motion.span
                          key={item}
                          className={`text-[9px] px-2 py-1 border border-foreground/40 transition-all cursor-default ${
                            theme === 'dark' ? 'hover:border-accent hover:text-accent hover:shadow-[0_0_8px_hsl(var(--neon-cyan)/0.3)]' : 'hover:bg-foreground hover:text-background'
                          }`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.05 + i * 0.02 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {item}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Soft Skills */}
            <motion.section
              className={`p-5 border-2 border-foreground ${theme === 'dark' ? 'glow-border' : ''}`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Brain size={18} className={theme === 'dark' ? 'text-accent' : ''} />
                <h2 className="text-sm font-bold uppercase tracking-wider">{t(language, 'Soft Skills', 'Kỹ Năng Mềm')}</h2>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: 'Team Collaboration', nameVn: 'Làm Việc Nhóm', icon: 'TC' },
                  { name: 'Time Management', nameVn: 'Quản Lý Thời Gian', icon: 'TM' },
                  { name: 'Self-Learning', nameVn: 'Tự Học', icon: 'SL' },
                  { name: 'Critical Thinking', nameVn: 'Tư Duy Phản Biện', icon: 'CT' },
                  { name: 'Problem Solving', nameVn: 'Giải Quyết Vấn Đề', icon: 'PS' },
                  { name: 'Communication', nameVn: 'Giao Tiếp', icon: 'CO' },
                ].map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    className={`p-2 text-center border border-foreground/20 ${theme === 'dark' ? 'hover:border-accent' : 'hover:bg-muted'} transition-all`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className={`text-xs font-bold mb-1 ${theme === 'dark' ? 'text-accent' : ''}`}>{skill.icon}</div>
                    <div className="text-[9px]">{t(language, skill.name, skill.nameVn)}</div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Right Column (2 cols wide) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Summary */}
            <motion.section
              className={`p-6 border-2 border-foreground ${theme === 'dark' ? 'glow-border' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-4">
                <FileText size={18} className={theme === 'dark' ? 'text-accent' : ''} />
                <h2 className="text-sm font-bold uppercase tracking-wider">{t(language, 'Professional Summary', 'Tóm Tắt')}</h2>
              </div>
              <p className="text-sm leading-relaxed">
                {t(language,
                  "Computer Science student at HCMUT with strong foundation in mathematics and programming. Experienced in full-stack development, AI/ML, and system design. Passionate about building real-world applications and continuously learning new technologies. Looking for internship opportunities to apply knowledge and gain practical experience.",
                  "Sinh viên Khoa học Máy tính tại Bách Khoa với nền tảng vững chắc về toán học và lập trình. Có kinh nghiệm phát triển full-stack, AI/ML và thiết kế hệ thống. Đam mê xây dựng ứng dụng thực tế và không ngừng học hỏi công nghệ mới. Tìm kiếm cơ hội thực tập để áp dụng kiến thức và tích lũy kinh nghiệm thực tế."
                )}
              </p>
            </motion.section>

            {/* Featured Projects with cards */}
            <motion.section
              className={`p-6 border-2 border-foreground ${theme === 'dark' ? 'glow-border' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Briefcase size={18} className={theme === 'dark' ? 'text-accent' : ''} />
                  <h2 className="text-sm font-bold uppercase tracking-wider">{t(language, 'Featured Projects', 'Dự Án Nổi Bật')}</h2>
                </div>
                <Link 
                  to="/projects"
                  className={`text-xs flex items-center gap-1 hover:underline ${theme === 'dark' ? 'text-accent' : ''}`}
                >
                  {t(language, 'View All', 'Xem Tất Cả')} <ArrowRight size={12} />
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {featuredProjects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    className={`p-4 border border-foreground/30 relative overflow-hidden group ${
                      theme === 'dark' ? 'hover:border-accent bg-background/50' : 'hover:bg-muted'
                    } transition-all`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Decorative icon */}
                    <span className="absolute top-2 right-2 text-2xl opacity-20 group-hover:opacity-40 transition-opacity">
                      {project.icon}
                    </span>
                    <Link to={project.link || `/project/${project.id}`}>
                      <h3 className={`font-bold text-sm mb-1 ${theme === 'dark' ? 'group-hover:text-accent' : ''} transition-colors`}>
                        {t(language, project.name, project.nameVn)}
                      </h3>
                      <div className="text-[10px] text-muted-foreground mb-2">{project.tech}</div>
                      <div className={`text-[10px] flex items-center gap-1 ${theme === 'dark' ? 'text-accent' : ''}`}>
                        <ExternalLink size={10} /> {t(language, 'View Details', 'Xem Chi Tiết')}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Experience Timeline */}
            <motion.section
              className={`p-6 border-2 border-foreground ${theme === 'dark' ? 'glow-border' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Star size={18} className={theme === 'dark' ? 'text-accent' : ''} />
                <h2 className="text-sm font-bold uppercase tracking-wider">{t(language, 'Experience', 'Kinh Nghiệm')}</h2>
              </div>
              <div className="relative pl-6">
                {/* Timeline line */}
                <div className={`absolute left-2 top-0 bottom-0 w-0.5 ${theme === 'dark' ? 'bg-primary' : 'bg-foreground/20'}`} />
                {experiences.map((exp, i) => (
                  <motion.div
                    key={i}
                    className="relative mb-4 last:mb-0"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {/* Timeline dot */}
                    <motion.div 
                      className={`absolute -left-4 top-1 w-3 h-3 rounded-full border-2 ${
                        theme === 'dark' ? 'border-accent bg-background' : 'border-foreground bg-background'
                      }`}
                      animate={theme === 'dark' ? { boxShadow: ['0 0 0 0 hsl(var(--neon-cyan))', '0 0 10px 2px hsl(var(--neon-cyan))', '0 0 0 0 hsl(var(--neon-cyan))'] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <h3 className="font-bold text-sm">{t(language, exp.title, exp.titleVn)}</h3>
                    <div className={`text-xs ${theme === 'dark' ? 'text-accent' : 'text-muted-foreground'}`}>
                      {exp.company} | {exp.period}
                    </div>
                    <p className="text-xs mt-1 text-muted-foreground">
                      {t(language, exp.description, exp.descriptionVn)}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Knowledge Base Preview */}
            <motion.section
              className={`p-6 border-2 border-foreground ${theme === 'dark' ? 'glow-border' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BookOpen size={18} className={theme === 'dark' ? 'text-accent' : ''} />
                  <h2 className="text-sm font-bold uppercase tracking-wider">{t(language, 'Knowledge Areas', 'Lĩnh Vực Kiến Thức')}</h2>
                </div>
                <Link 
                  to="/blog"
                  className={`text-xs flex items-center gap-1 hover:underline ${theme === 'dark' ? 'text-accent' : ''}`}
                >
                  {t(language, 'Explore', 'Khám Phá')} <ArrowRight size={12} />
                </Link>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {[
                  { label: 'DSA', labelVn: 'CTDL' },
                  { label: 'Algorithms', labelVn: 'Thuật Toán' },
                  { label: 'System Design', labelVn: 'Thiết Kế HT' },
                  { label: 'Machine Learning', labelVn: 'ML' },
                  { label: 'Web Dev', labelVn: 'Web' },
                  { label: 'Database', labelVn: 'CSDL' },
                ].map((topic, i) => (
                  <motion.div
                    key={topic.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to="/blog"
                      className={`block text-[10px] p-2 text-center border border-foreground/20 transition-all ${
                        theme === 'dark' ? 'hover:border-accent hover:text-accent hover:shadow-[0_0_10px_hsl(var(--neon-cyan)/0.2)]' : 'hover:bg-muted'
                      }`}
                    >
                      {t(language, topic.label, topic.labelVn)}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Relevant Coursework */}
            <motion.section
              className={`p-6 border-2 border-foreground ${theme === 'dark' ? 'glow-border' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap size={18} className={theme === 'dark' ? 'text-accent' : ''} />
                <h2 className="text-sm font-bold uppercase tracking-wider">{t(language, 'Relevant Coursework', 'Môn Học Liên Quan')}</h2>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Data Structures & Algorithms',
                  'Object-Oriented Programming', 
                  'Database Systems',
                  'Operating Systems',
                  'Computer Networks',
                  'Software Engineering',
                  'Artificial Intelligence',
                  'Computer Architecture',
                  'Discrete Mathematics',
                  'Linear Algebra',
                ].map((course, i) => (
                  <motion.span
                    key={course}
                    className={`text-[9px] px-2 py-1.5 bg-foreground/5 border border-foreground/20 ${
                      theme === 'dark' ? 'hover:border-primary hover:text-primary' : ''
                    } transition-colors`}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03 }}
                  >
                    {course}
                  </motion.span>
                ))}
              </div>
            </motion.section>
          </div>
        </div>

        {/* Footer Navigation */}
        <motion.div 
          className={`mt-8 p-6 border-2 border-foreground flex flex-wrap justify-between items-center gap-4 ${theme === 'dark' ? 'glow-border' : ''}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4">
            <Link 
              to="/projects" 
              className={`flex items-center gap-2 px-4 py-2 border-2 border-foreground font-bold text-sm transition-all ${
                theme === 'dark' ? 'cyber-btn hover:shadow-[0_0_15px_hsl(var(--neon-cyan))]' : 'hover:bg-foreground hover:text-background'
              }`}
            >
              <Briefcase size={14} /> {t(language, 'All Projects', 'Tất Cả Dự Án')}
            </Link>
            <Link 
              to="/blog" 
              className={`flex items-center gap-2 px-4 py-2 border-2 border-foreground font-bold text-sm transition-all ${
                theme === 'dark' ? 'cyber-btn hover:shadow-[0_0_15px_hsl(var(--neon-green))]' : 'hover:bg-foreground hover:text-background'
              }`}
            >
              <BookOpen size={14} /> {t(language, 'Knowledge Base', 'Kho Kiến Thức')}
            </Link>
          </div>
          <div className="text-xs text-muted-foreground">
            {t(language, 'Last updated: January 2025', 'Cập nhật: Tháng 1/2025')}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
