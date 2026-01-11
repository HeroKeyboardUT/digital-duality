import { motion } from 'framer-motion';
import { useTheme, t } from '@/context/ThemeContext';
import { Github, Linkedin, Mail, Phone, MapPin, Calendar, GraduationCap, Briefcase, Code, Brain, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import hcmutLogo from '@/assets/hcmut-logo.png';

const skills = {
  languages: ['C++', 'C', 'Python', 'Java', 'JavaScript', 'TypeScript', 'SQL'],
  frontend: ['React.js', 'HTML5', 'CSS3', 'TailwindCSS'],
  backend: ['Node.js', 'Express.js', 'FastAPI', 'REST APIs'],
  databases: ['MySQL', 'MongoDB', 'PostgreSQL'],
  tools: ['Git', 'GitHub', 'Postman', 'Figma', 'VS Code', 'LaTeX'],
  ai_ml: ['TensorFlow', 'CNN', 'Deep Learning', 'Reinforcement Learning'],
  concepts: ['OOP', 'Data Structures', 'Algorithms', 'Database Design', 'System Design'],
};

const experiences = [
  {
    title: 'Personal Projects',
    titleVn: 'Dự Án Cá Nhân',
    period: '2023 - Present',
    desc: '7+ projects including fullstack apps, AI models, and algorithm implementations',
    descVn: '7+ dự án bao gồm ứng dụng fullstack, mô hình AI, và triển khai thuật toán',
  },
];

export function CVSection() {
  const { theme, language } = useTheme();

  return (
    <section className={`min-h-screen py-8 px-4 ${theme === 'dark' ? 'hex-pattern' : ''}`}>
      <div className="container mx-auto max-w-5xl">
        {/* CV Container with decorative borders */}
        <div className={`relative border-2 border-foreground ${theme === 'dark' ? 'glow-border' : ''}`}>
          {/* Corner decorations */}
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-foreground" />
          <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-foreground" />
          <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-foreground" />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-foreground" />

          {/* Header Section */}
          <div className="border-b-2 border-foreground p-6 md:p-8">
            <div className="grid md:grid-cols-[1fr,auto] gap-6 items-center">
              {/* Left: Name & Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="label-text mb-2">{t(language, 'CURRICULUM VITAE', 'SƠ YẾU LÝ LỊCH')}</div>
                <h1 className={`font-sans font-black text-4xl md:text-5xl lg:text-6xl mb-2 ${theme === 'dark' ? 'neon-text' : ''}`}>
                  PHẠM QUANG HIẾU
                </h1>
                <h2 className={`text-xl md:text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-primary' : 'text-muted-foreground'}`}>
                  {t(language, 'Computer Science Student', 'Sinh Viên Khoa Học Máy Tính')}
                </h2>
                
                {/* Contact Row */}
                <div className="flex flex-wrap gap-4 text-sm">
                  <a href="mailto:phamquanghieulop95@gmail.com" className="flex items-center gap-1.5 hover:underline">
                    <Mail size={14} /> phamquanghieulop95@gmail.com
                  </a>
                  <a href="tel:0397961039" className="flex items-center gap-1.5 hover:underline">
                    <Phone size={14} /> 0397961039
                  </a>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} /> Bien Hoa, Vietnam
                  </span>
                </div>
                
                {/* Social Links */}
                <div className="flex gap-3 mt-4">
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
              </motion.div>

              {/* Right: Logo */}
              <motion.div
                className="hidden md:block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <img src={hcmutLogo} alt="HCMUT" className="w-24 h-24 object-contain opacity-80" />
              </motion.div>
            </div>
          </div>

          {/* Main Content - 2 columns */}
          <div className="grid md:grid-cols-[1fr,1.5fr] divide-y md:divide-y-0 md:divide-x divide-foreground">
            {/* Left Column */}
            <div className="p-6 space-y-6">
              {/* Education */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap size={16} className={theme === 'dark' ? 'text-accent' : ''} />
                  <span className="label-text">{t(language, 'EDUCATION', 'HỌC VẤN')}</span>
                </div>
                <div className="cv-line-left pl-4 border-l border-foreground/30">
                  <h3 className="font-bold text-sm">VNU-HCM University of Technology</h3>
                  <p className="text-xs text-muted-foreground">Bachelor of Computer Science</p>
                  <div className="flex items-center gap-2 text-xs mt-1">
                    <Calendar size={12} />
                    <span>2023 - 2027</span>
                  </div>
                  <div className={`text-lg font-bold mt-2 ${theme === 'dark' ? 'text-primary' : ''}`}>
                    GPA: 3.5/4.0
                  </div>
                </div>
              </motion.div>

              {/* Objective */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase size={16} className={theme === 'dark' ? 'text-accent' : ''} />
                  <span className="label-text">{t(language, 'OBJECTIVE', 'MỤC TIÊU')}</span>
                </div>
                <p className="text-sm leading-relaxed">
                  {t(language,
                    'Seeking a Software/AI internship to apply my programming skills, gain hands-on experience, and contribute to real-world projects.',
                    'Tìm kiếm thực tập Software/AI để áp dụng kỹ năng lập trình, tích lũy kinh nghiệm thực tế và đóng góp cho các dự án.'
                  )}
                </p>
              </motion.div>

              {/* Experience */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase size={16} className={theme === 'dark' ? 'text-accent' : ''} />
                  <span className="label-text">{t(language, 'EXPERIENCE', 'KINH NGHIỆM')}</span>
                </div>
                {experiences.map((exp, i) => (
                  <div key={i} className="cv-line-left pl-4 border-l border-foreground/30">
                    <h3 className="font-bold text-sm">{t(language, exp.title, exp.titleVn)}</h3>
                    <p className="text-xs text-muted-foreground">{exp.period}</p>
                    <p className="text-sm mt-1">{t(language, exp.desc, exp.descVn)}</p>
                  </div>
                ))}
              </motion.div>

              {/* Languages */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <div className="label-text mb-3">{t(language, 'LANGUAGES', 'NGÔN NGỮ')}</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>{t(language, 'Vietnamese', 'Tiếng Việt')}</span>
                    <span className={theme === 'dark' ? 'text-accent' : ''}>Native</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t(language, 'English', 'Tiếng Anh')}</span>
                    <span className={theme === 'dark' ? 'text-accent' : ''}>Intermediate</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="p-6 space-y-6">
              {/* Technical Skills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Code size={16} className={theme === 'dark' ? 'text-accent' : ''} />
                  <span className="label-text">{t(language, 'TECHNICAL SKILLS', 'KỸ NĂNG KỸ THUẬT')}</span>
                </div>
                
                <div className="space-y-3">
                  {[
                    { key: 'languages', label: 'Programming Languages', labelVn: 'Ngôn Ngữ Lập Trình' },
                    { key: 'frontend', label: 'Frontend', labelVn: 'Frontend' },
                    { key: 'backend', label: 'Backend', labelVn: 'Backend' },
                    { key: 'databases', label: 'Databases', labelVn: 'Cơ Sở Dữ Liệu' },
                    { key: 'tools', label: 'Tools', labelVn: 'Công Cụ' },
                    { key: 'ai_ml', label: 'AI/ML', labelVn: 'AI/ML' },
                    { key: 'concepts', label: 'Core Concepts', labelVn: 'Kiến Thức Cốt Lõi' },
                  ].map((category) => (
                    <div key={category.key}>
                      <div className="text-[10px] font-bold mb-1.5 flex items-center gap-2">
                        <span className={theme === 'dark' ? 'text-primary' : ''}>{t(language, category.label, category.labelVn)}</span>
                        <div className="flex-1 border-t border-dashed border-foreground/20" />
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {skills[category.key as keyof typeof skills].map((skill) => (
                          <span
                            key={skill}
                            className={`text-[10px] px-2 py-0.5 border border-foreground/40 ${
                              theme === 'dark' ? 'hover:border-accent hover:text-accent' : 'hover:bg-foreground hover:text-background'
                            } transition-all cursor-default`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Soft Skills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Brain size={16} className={theme === 'dark' ? 'text-accent' : ''} />
                  <span className="label-text">{t(language, 'SOFT SKILLS', 'KỸ NĂNG MỀM')}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { en: 'Teamwork', vn: 'Làm việc nhóm' },
                    { en: 'Time Management', vn: 'Quản lý thời gian' },
                    { en: 'Self-Learning', vn: 'Tự học' },
                    { en: 'Problem Solving', vn: 'Giải quyết vấn đề' },
                    { en: 'Critical Thinking', vn: 'Tư duy phản biện' },
                  ].map((skill) => (
                    <span
                      key={skill.en}
                      className={`text-xs px-2 py-1 border border-foreground/40 ${
                        theme === 'dark' ? 'bg-primary/10' : 'bg-foreground/5'
                      }`}
                    >
                      {t(language, skill.en, skill.vn)}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Quick Links Footer */}
          <div className="border-t-2 border-foreground p-4">
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/projects"
                className={`flex items-center gap-2 px-4 py-2 border-2 border-foreground text-sm font-bold transition-all ${
                  theme === 'dark' ? 'cyber-btn hover:shadow-[0_0_15px_hsl(var(--neon-cyan))]' : 'hover:bg-foreground hover:text-background'
                }`}
              >
                {t(language, 'VIEW PROJECTS', 'XEM DỰ ÁN')} <ArrowRight size={16} />
              </Link>
              <Link
                to="/blog"
                className={`flex items-center gap-2 px-4 py-2 border-2 border-foreground text-sm font-bold transition-all ${
                  theme === 'dark' ? 'cyber-btn hover:shadow-[0_0_15px_hsl(var(--neon-cyan))]' : 'hover:bg-foreground hover:text-background'
                }`}
              >
                {t(language, 'READ BLOG', 'ĐỌC BLOG')} <ArrowRight size={16} />
              </Link>
              <a
                href="mailto:phamquanghieulop95@gmail.com"
                className={`flex items-center gap-2 px-4 py-2 border-2 border-foreground text-sm font-bold transition-all ${
                  theme === 'dark' ? 'cyber-btn hover:shadow-[0_0_15px_hsl(var(--neon-cyan))]' : 'hover:bg-foreground hover:text-background'
                }`}
              >
                {t(language, 'CONTACT ME', 'LIÊN HỆ')} <Mail size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Status indicator */}
        <motion.div
          className="flex justify-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className={`flex items-center gap-2 px-4 py-2 border border-foreground/30 text-sm ${theme === 'dark' ? 'glow-border' : ''}`}>
            <span className="status-online" />
            <span className={theme === 'dark' ? 'text-flicker' : ''}>
              {t(language, 'ACTIVELY SEEKING INTERNSHIP', 'ĐANG TÌM KIẾM THỰC TẬP')}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
