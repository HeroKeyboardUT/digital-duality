import { motion } from 'framer-motion';
import { useTheme, t } from '@/context/ThemeContext';
import { ArrowDown, Github, Linkedin, Mail, Twitter } from 'lucide-react';

export function HeroSection() {
  const { theme, language } = useTheme();

  return (
    <section className="min-h-[90vh] flex flex-col justify-center relative py-20 px-4">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute inset-0 ${theme === 'dark' ? 'opacity-5' : 'opacity-[0.02]'}`}>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute border-foreground/20"
              style={{
                left: `${(i % 10) * 10}%`,
                top: `${Math.floor(i / 10) * 50}%`,
                width: '1px',
                height: '100%',
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto max-w-6xl">
        {/* Top Labels */}
        <motion.div
          className="flex flex-wrap gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span className="label-text">{t(language, 'PORTFOLIO // 2024', 'HỒ SƠ // 2024')}</span>
          <span className="label-text">REF: DMQ-001</span>
          <span className="label-text">LOCATION: HANOI, VIETNAM</span>
        </motion.div>

        {/* Main Title */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1
            className={`font-sans font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.85] mb-4 ${
              theme === 'dark' ? 'neon-text glitch' : ''
            }`}
            data-text="DAO MINH QUAN"
          >
            DAO<br />MINH<br />QUAN
          </h1>
        </motion.div>

        {/* Subtitle & Description */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div>
            <h2 className="text-xl sm:text-2xl font-sans font-bold mb-4">
              {t(language, 'Full-Stack Architect', 'Kiến Trúc Sư Full-Stack')}
              <br />
              <span className={theme === 'dark' ? 'text-accent' : 'text-muted-foreground'}>
                & {t(language, 'System Designer', 'Thiết Kế Hệ Thống')}
              </span>
            </h2>
            <p className="text-sm leading-relaxed max-w-md">
              {t(language,
                'Building digital infrastructure since 2018. Specializing in distributed systems, real-time applications, and brutalist interfaces that push the boundaries of web experiences.',
                'Xây dựng hạ tầng số từ 2018. Chuyên về hệ thống phân tán, ứng dụng thời gian thực và giao diện brutalist đẩy xa giới hạn trải nghiệm web.'
              )}
            </p>
          </div>

          <div className="flex flex-col justify-end">
            <div className="label-text mb-2">{t(language, 'CURRENT STATUS', 'TRẠNG THÁI')}</div>
            <div className="flex items-center gap-2 mb-4">
              <span className="status-online" />
              <span className="text-sm font-bold">
                {t(language, 'Available for Projects', 'Sẵn sàng nhận Dự án')}
              </span>
            </div>

            <div className="flex gap-3">
              {[
                { icon: Github, label: 'GitHub', href: '#' },
                { icon: Linkedin, label: 'LinkedIn', href: '#' },
                { icon: Twitter, label: 'Twitter', href: '#' },
                { icon: Mail, label: 'Email', href: '#' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className={`p-3 border-2 border-foreground hover:bg-foreground hover:text-background transition-colors ${
                    theme === 'dark' ? 'hover:shadow-[0_0_20px_hsl(180_100%_50%/0.5)]' : ''
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t-2 border-foreground pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {[
            { value: '6+', label: t(language, 'Years Experience', 'Năm Kinh Nghiệm') },
            { value: '50+', label: t(language, 'Projects Delivered', 'Dự Án Hoàn Thành') },
            { value: '30+', label: t(language, 'Happy Clients', 'Khách Hàng') },
            { value: '99%', label: t(language, 'Success Rate', 'Tỷ Lệ Thành Công') },
          ].map((stat, i) => (
            <div key={i} className="text-center sm:text-left">
              <div className={`text-3xl sm:text-4xl font-sans font-black ${theme === 'dark' ? 'text-accent' : ''}`}>
                {stat.value}
              </div>
              <div className="label-text mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1, y: { repeat: Infinity, duration: 1.5 } }}
      >
        <ArrowDown size={24} className={theme === 'dark' ? 'text-primary' : ''} />
      </motion.div>
    </section>
  );
}
