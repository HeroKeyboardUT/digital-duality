import { motion } from 'framer-motion';
import { useTheme, t } from '@/context/ThemeContext';
import { Github, Linkedin, Mail, Phone, MapPin, Calendar, GraduationCap, Briefcase, Code, Brain, ArrowRight, FileText, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
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
  { id: 'cinema-management', name: 'Cinema Management System', nameVn: 'Hệ Thống Quản Lý Rạp Phim', tech: 'React, Node.js, Express' },
  { id: 'chat-app', name: 'Real-time Chat App', nameVn: 'Ứng Dụng Chat Thời Gian Thực', tech: 'React, MongoDB, WebSocket' },
  { id: 'emotion-detection', name: 'Emotion Detection AI', nameVn: 'AI Nhận Diện Cảm Xúc', tech: 'Python, TensorFlow, CNN' },
  { id: 'rl-playground', name: 'RL Grid World', nameVn: 'Sân Chơi RL Grid World', tech: 'React, TypeScript', link: '/rl-playground' },
];

export function CVPage() {
  const { theme, language } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'hex-pattern' : ''}`}>
      <div className="container mx-auto max-w-5xl px-4 py-8">
        {/* CV Container with decorative border */}
        <div className={`relative border-2 border-foreground ${theme === 'dark' ? 'glow-border' : ''}`}>
          {/* Corner decorations */}
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-foreground" />
          <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-foreground" />
          <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-foreground" />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-foreground" />

          {/* Header Section */}
          <div className="border-b-2 border-foreground p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Photo/Logo */}
              <motion.div 
                className={`w-24 h-24 border-2 border-foreground flex items-center justify-center ${theme === 'dark' ? 'bg-background/50' : 'bg-muted'}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <img src={hcmutLogo} alt="HCMUT" className="w-20 h-20 object-contain" />
              </motion.div>

              {/* Name & Title */}
              <div className="flex-1">
                <motion.h1 
                  className={`text-4xl md:text-5xl font-sans font-black mb-2 ${theme === 'dark' ? 'neon-text' : ''}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  PHAM QUANG HIEU
                </motion.h1>
                <div className={`text-lg font-bold mb-3 ${theme === 'dark' ? 'text-accent' : 'text-muted-foreground'}`}>
                  {t(language, 'Computer Science Student | Software Developer', 'Sinh Viên KHMT | Lập Trình Viên')}
                </div>
                
                {/* Contact Info Row */}
                <div className="flex flex-wrap gap-4 text-xs">
                  <a href="mailto:phamquanghieulop95@gmail.com" className="flex items-center gap-1 hover:underline">
                    <Mail size={12} /> phamquanghieulop95@gmail.com
                  </a>
                  <a href="tel:0397961039" className="flex items-center gap-1 hover:underline">
                    <Phone size={12} /> 0397961039
                  </a>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} /> Bien Hoa, Vietnam
                  </span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-2">
                {[
                  { icon: Github, href: 'https://github.com/HeroKeyboardUT', label: 'GitHub' },
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/phamquanghieuutcs/', label: 'LinkedIn' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 border border-foreground transition-all ${
                      theme === 'dark' ? 'hover:border-accent hover:text-accent' : 'hover:bg-foreground hover:text-background'
                    }`}
                  >
                    <social.icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content - Two Columns */}
          <div className="grid md:grid-cols-[1fr,1.5fr] divide-x-0 md:divide-x-2 divide-foreground">
            {/* Left Column */}
            <div className="p-6 space-y-6">
              {/* Education */}
              <section>
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-foreground/30">
                  <GraduationCap size={16} className={theme === 'dark' ? 'text-accent' : ''} />
                  <h2 className="text-sm font-bold uppercase tracking-wider">
                    {t(language, 'Education', 'Học Vấn')}
                  </h2>
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-sm">VNU-HCM University of Technology</h3>
                  <div className="text-xs text-muted-foreground">Bachelor of Computer Science</div>
                  <div className="flex items-center gap-1 text-xs">
                    <Calendar size={10} /> 2023 - 2027
                  </div>
                  <div className={`text-lg font-bold ${theme === 'dark' ? 'text-primary' : ''}`}>
                    GPA: 3.5 / 4.0
                  </div>
                </div>
              </section>

              {/* Skills */}
              <section>
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-foreground/30">
                  <Code size={16} className={theme === 'dark' ? 'text-accent' : ''} />
                  <h2 className="text-sm font-bold uppercase tracking-wider">
                    {t(language, 'Technical Skills', 'Kỹ Năng Kỹ Thuật')}
                  </h2>
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'Languages', labelVn: 'Ngôn Ngữ', items: skills.languages },
                    { label: 'Frontend', labelVn: 'Frontend', items: skills.frontend },
                    { label: 'Backend', labelVn: 'Backend', items: skills.backend },
                    { label: 'Database', labelVn: 'Cơ Sở Dữ Liệu', items: skills.database },
                    { label: 'AI/ML', labelVn: 'AI/ML', items: skills.aiml },
                    { label: 'Tools', labelVn: 'Công Cụ', items: skills.tools },
                  ].map((category) => (
                    <div key={category.label}>
                      <div className="text-[10px] font-bold text-muted-foreground mb-1">
                        {t(language, category.label, category.labelVn)}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {category.items.map((item) => (
                          <span
                            key={item}
                            className={`text-[9px] px-1.5 py-0.5 border border-foreground/40 ${
                              theme === 'dark' ? 'hover:border-accent hover:text-accent' : ''
                            }`}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Soft Skills */}
              <section>
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-foreground/30">
                  <Brain size={16} className={theme === 'dark' ? 'text-accent' : ''} />
                  <h2 className="text-sm font-bold uppercase tracking-wider">
                    {t(language, 'Soft Skills', 'Kỹ Năng Mềm')}
                  </h2>
                </div>
                <ul className="text-xs space-y-1">
                  <li>• {t(language, 'Team Collaboration', 'Làm Việc Nhóm')}</li>
                  <li>• {t(language, 'Time Management', 'Quản Lý Thời Gian')}</li>
                  <li>• {t(language, 'Self-Motivated Learning', 'Tự Học')}</li>
                  <li>• {t(language, 'Critical Thinking', 'Tư Duy Phản Biện')}</li>
                  <li>• {t(language, 'Problem Solving', 'Giải Quyết Vấn Đề')}</li>
                </ul>
              </section>

              {/* Contact Section */}
              <section className={`p-4 border-2 border-dashed border-foreground/30 ${theme === 'dark' ? 'bg-primary/5' : 'bg-muted/50'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs font-bold">{t(language, 'Open for Internship', 'Sẵn Sàng Thực Tập')}</span>
                </div>
                <p className="text-[10px] text-muted-foreground">
                  {t(language, 
                    'Looking for internship opportunities in software development and AI/ML.',
                    'Đang tìm kiếm cơ hội thực tập trong lĩnh vực phát triển phần mềm và AI/ML.'
                  )}
                </p>
              </section>
            </div>

            {/* Right Column */}
            <div className="p-6 space-y-6">
              {/* Summary */}
              <section>
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-foreground/30">
                  <FileText size={16} className={theme === 'dark' ? 'text-accent' : ''} />
                  <h2 className="text-sm font-bold uppercase tracking-wider">
                    {t(language, 'Professional Summary', 'Tóm Tắt')}
                  </h2>
                </div>
                <p className="text-sm leading-relaxed">
                  {t(language,
                    "Computer Science student at HCMUT with strong foundation in mathematics and programming. Experienced in full-stack development, AI/ML, and system design. Passionate about building real-world applications and continuously learning new technologies.",
                    "Sinh viên Khoa học Máy tính tại Bách Khoa với nền tảng vững chắc về toán học và lập trình. Có kinh nghiệm phát triển full-stack, AI/ML và thiết kế hệ thống. Đam mê xây dựng ứng dụng thực tế và không ngừng học hỏi công nghệ mới."
                  )}
                </p>
              </section>

              {/* Featured Projects */}
              <section>
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-foreground/30">
                  <div className="flex items-center gap-2">
                    <Briefcase size={16} className={theme === 'dark' ? 'text-accent' : ''} />
                    <h2 className="text-sm font-bold uppercase tracking-wider">
                      {t(language, 'Featured Projects', 'Dự Án Nổi Bật')}
                    </h2>
                  </div>
                  <Link 
                    to="/projects"
                    className={`text-[10px] flex items-center gap-1 hover:underline ${theme === 'dark' ? 'text-accent' : ''}`}
                  >
                    {t(language, 'View All', 'Xem Tất Cả')} <ArrowRight size={10} />
                  </Link>
                </div>
                <div className="space-y-3">
                  {featuredProjects.map((project, i) => (
                    <motion.div
                      key={project.id}
                      className={`p-3 border border-foreground/30 ${theme === 'dark' ? 'hover:border-accent' : 'hover:bg-muted'} transition-all`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Link 
                        to={project.link || `/project/${project.id}`}
                        className="flex justify-between items-start"
                      >
                        <div>
                          <h3 className={`font-bold text-sm ${theme === 'dark' ? 'hover:text-accent' : ''}`}>
                            {t(language, project.name, project.nameVn)}
                          </h3>
                          <div className="text-[10px] text-muted-foreground">{project.tech}</div>
                        </div>
                        <ArrowRight size={14} className="mt-1" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Knowledge Base / Blog */}
              <section>
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-foreground/30">
                  <div className="flex items-center gap-2">
                    <BookOpen size={16} className={theme === 'dark' ? 'text-accent' : ''} />
                    <h2 className="text-sm font-bold uppercase tracking-wider">
                      {t(language, 'Knowledge Base', 'Kho Kiến Thức')}
                    </h2>
                  </div>
                  <Link 
                    to="/blog"
                    className={`text-[10px] flex items-center gap-1 hover:underline ${theme === 'dark' ? 'text-accent' : ''}`}
                  >
                    {t(language, 'View All', 'Xem Tất Cả')} <ArrowRight size={10} />
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Data Structures', labelVn: 'Cấu Trúc Dữ Liệu' },
                    { label: 'Algorithms', labelVn: 'Thuật Toán' },
                    { label: 'System Design', labelVn: 'Thiết Kế Hệ Thống' },
                    { label: 'Machine Learning', labelVn: 'Machine Learning' },
                    { label: 'Web Development', labelVn: 'Phát Triển Web' },
                    { label: 'Database Design', labelVn: 'Thiết Kế CSDL' },
                  ].map((topic) => (
                    <Link
                      key={topic.label}
                      to="/blog"
                      className={`text-xs p-2 border border-foreground/20 text-center transition-all ${
                        theme === 'dark' ? 'hover:border-accent hover:text-accent' : 'hover:bg-muted'
                      }`}
                    >
                      {t(language, topic.label, topic.labelVn)}
                    </Link>
                  ))}
                </div>
              </section>

              {/* Coursework */}
              <section>
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-foreground/30">
                  <GraduationCap size={16} className={theme === 'dark' ? 'text-accent' : ''} />
                  <h2 className="text-sm font-bold uppercase tracking-wider">
                    {t(language, 'Relevant Coursework', 'Môn Học Liên Quan')}
                  </h2>
                </div>
                <div className="flex flex-wrap gap-1">
                  {[
                    'Data Structures & Algorithms',
                    'Object-Oriented Programming', 
                    'Database Systems',
                    'Operating Systems',
                    'Computer Networks',
                    'Software Engineering',
                    'Artificial Intelligence',
                    'Computer Architecture',
                  ].map((course) => (
                    <span
                      key={course}
                      className="text-[9px] px-2 py-1 bg-foreground/5 border border-foreground/20"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t-2 border-foreground p-4 flex flex-wrap justify-between items-center gap-4 text-xs">
            <div className="flex items-center gap-4">
              <Link 
                to="/projects" 
                className={`flex items-center gap-1 px-3 py-1.5 border border-foreground font-bold transition-all ${
                  theme === 'dark' ? 'hover:border-accent hover:text-accent' : 'hover:bg-foreground hover:text-background'
                }`}
              >
                <Briefcase size={12} /> {t(language, 'Projects', 'Dự Án')}
              </Link>
              <Link 
                to="/blog" 
                className={`flex items-center gap-1 px-3 py-1.5 border border-foreground font-bold transition-all ${
                  theme === 'dark' ? 'hover:border-accent hover:text-accent' : 'hover:bg-foreground hover:text-background'
                }`}
              >
                <BookOpen size={12} /> {t(language, 'Blog', 'Blog')}
              </Link>
            </div>
            <div className="text-muted-foreground">
              {t(language, 'Last updated: January 2025', 'Cập nhật: Tháng 1/2025')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
