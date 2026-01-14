import { useTheme, t } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { socialLinks, contactInfo } from '@/data/navigation';
import { navLinks } from '@/data/navigation';
import hcmutLogo from '@/assets/hcmut-logo.jpg';

const iconMap: Record<string, React.ElementType> = {
  Github,
  Linkedin,
  Mail,
  Phone,
};

export function Footer() {
  const { theme, language } = useTheme();

  return (
    <footer className={`border-t-2 border-foreground bg-background py-12 px-4 ${theme === 'dark' ? 'hex-pattern' : ''}`}>
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={hcmutLogo} alt="HCMUT" className="w-10 h-10 object-contain" />
              <div className={`font-sans font-black text-2xl ${theme === 'dark' ? 'neon-text' : ''}`}>
                HIEU<span className={theme === 'dark' ? 'text-accent' : 'text-muted-foreground'}>DZ</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              {t(language, 
                'Computer Science student from HCMUT with passion for developing real-world applications, exploring AI, Big Data, and System Design.', 
                'Sinh viên Khoa học Máy tính ĐH Bách Khoa TP.HCM với đam mê phát triển ứng dụng thực tế, khám phá AI, Big Data và Thiết kế Hệ thống.'
              )}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, i) => {
                const Icon = iconMap[social.icon];
                if (!Icon) return null;
                return (
                  <motion.a 
                    key={i} 
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`p-2 border border-foreground/30 hover:border-foreground transition-all ${
                      theme === 'dark' ? 'hover:border-accent hover:shadow-[0_0_10px_hsl(180_100%_50%/0.3)]' : ''
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Icon size={16} />
                  </motion.a>
                );
              })}
            </div>
          </div>
          <div>
            <div className="label-text mb-4">{t(language, 'LINKS', 'LIÊN KẾT')}</div>
            <nav className="space-y-2 text-sm">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  to={link.href} 
                  className={`block transition-colors ${theme === 'dark' ? 'hover:text-accent' : 'hover:text-muted-foreground'}`}
                >
                  {t(language, link.label, link.labelVn)}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <div className="label-text mb-4">{t(language, 'CONTACT', 'LIÊN LẠC')}</div>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2"><Mail size={12} /> {contactInfo.email}</p>
              <p className="flex items-center gap-2"><Phone size={12} /> {contactInfo.phone}</p>
              <p className="flex items-center gap-2">
                <span className="w-3 h-3 border border-current rounded-full flex items-center justify-center text-[8px]">V</span> 
                {contactInfo.location}
              </p>
              <p className="flex items-center gap-2">
                <span className="w-3 h-3 border border-current flex items-center justify-center text-[8px]">H</span> 
                {contactInfo.university}
              </p>
            </div>
          </div>
        </div>
        <div className={`pt-8 border-t border-foreground/20 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-muted-foreground`}>
          <span>© {new Date().getFullYear()} PHAM QUANG HIEU (HIEUDZ)</span>
          <span className="flex items-center gap-1">
            {t(language, 'Built with', 'Xây dựng với')} 
            <Heart size={10} className={theme === 'dark' ? 'text-accent' : ''} /> 
            {t(language, 'in Vietnam', 'tại Việt Nam')}
          </span>
          <span className={`font-mono ${theme === 'dark' ? 'text-flicker' : ''}`}>
            v1.0.0 // {theme === 'light' ? 'ANALOGUE' : 'CYBER'}_MODE
          </span>
        </div>
      </div>
    </footer>
  );
}
