import { motion } from 'framer-motion';
import { useTheme, t } from '@/context/ThemeContext';
import { ArrowDown, Github, Linkedin, Mail, Phone } from 'lucide-react';
import hcmutLogo from '@/assets/hcmut-logo.jpg';

export function HeroSection() {
  const { theme, language } = useTheme();

  return (
    <section className="min-h-[90vh] flex flex-col justify-center relative py-20 px-4">
      {/* Background Effects for Cyber Mode */}
      {theme === 'dark' && (
        <>
          <div className="absolute inset-0 hex-pattern pointer-events-none" />
          <div className="scan-line" />
        </>
      )}

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

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Top Labels */}
        <motion.div
          className="flex flex-wrap items-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <img src={hcmutLogo} alt="HCMUT Logo" className="w-12 h-12 object-contain" />
          <span className="label-text">{t(language, 'PORTFOLIO // 2024', 'HỒ SƠ // 2024')}</span>
          <span className="label-text">HCMUT // CS</span>
          <span className="label-text">LOCATION: BIEN HOA, VIETNAM</span>
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
            data-text="HIEUDZ"
          >
            HIEU<span className={theme === 'dark' ? 'text-accent' : ''}>DZ</span>
          </h1>
          <div className={`text-lg sm:text-xl font-mono ${theme === 'dark' ? 'text-primary cursor-blink' : ''}`}>
            {t(language, 'Pham Quang Hieu', 'Phạm Quang Hiếu')}
          </div>
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
              {t(language, 'Computer Science Student', 'Sinh Viên Khoa Học Máy Tính')}
              <br />
              <span className={theme === 'dark' ? 'text-accent' : 'text-muted-foreground'}>
                @ {t(language, 'HCMUT (Bach Khoa)', 'ĐH Bách Khoa TP.HCM')}
              </span>
            </h2>
            <p className="text-sm leading-relaxed max-w-md">
              {t(language,
                "I'm a developer currently studying at Ho Chi Minh City University of Technology. I'm interested in Computer Science and I'm looking for an internship to improve my skills and gain more experience.",
                "Tôi là lập trình viên đang học tại Đại học Bách Khoa TP.HCM. Tôi quan tâm đến Khoa học Máy tính và đang tìm kiếm cơ hội thực tập để nâng cao kỹ năng và tích lũy kinh nghiệm."
              )}
            </p>
          </div>

          <div className="flex flex-col justify-end">
            <div className={`${theme === 'dark' ? 'grid-cell glow-border' : 'grid-cell'} mb-4`}>
              <div className="label-text mb-2">{t(language, 'QUICK INFO', 'THÔNG TIN')}</div>
              <ul className="text-xs space-y-1">
                <li><span className="text-muted-foreground">School Year:</span> 2023-2027</li>
                <li><span className="text-muted-foreground">Major:</span> Computer Science</li>
                <li><span className="text-muted-foreground">Address:</span> Bien Hoa City</li>
                <li><span className="text-muted-foreground">GPA:</span> 3.5 / 4.0</li>
              </ul>
            </div>

            <div className="flex gap-3">
              {[
                { icon: Github, label: 'GitHub', href: 'https://github.com/HeroKeyboardUT' },
                { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/phamquanghieuutcs/' },
                { icon: Phone, label: 'Phone', href: 'tel:0397961039' },
                { icon: Mail, label: 'Email', href: 'mailto:phamquanghieulop95@gmail.com' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`p-3 border-2 border-foreground hover:bg-foreground hover:text-background transition-colors ${
                    theme === 'dark' ? 'cyber-btn' : ''
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
          className={`grid grid-cols-2 sm:grid-cols-4 gap-4 border-t-2 border-foreground pt-8 ${theme === 'dark' ? 'pulse-border' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {[
            { value: '7+', label: t(language, 'Projects', 'Dự Án') },
            { value: '3.5', label: 'GPA' },
            { value: 'Y2', label: t(language, 'School Year', 'Năm Học') },
            { value: 'CS', label: t(language, 'Major', 'Chuyên Ngành') },
          ].map((stat, i) => (
            <div key={i} className="text-center sm:text-left">
              <div className={`text-3xl sm:text-4xl font-sans font-black ${theme === 'dark' ? 'text-accent text-flicker' : ''}`}>
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