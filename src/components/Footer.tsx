import { useTheme, t } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';

export function Footer() {
  const { theme, language } = useTheme();

  return (
    <footer className="border-t-2 border-foreground bg-background py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="font-sans font-black text-2xl mb-4">
              <span className={theme === 'dark' ? 'neon-text' : ''}>DMQ</span>
              <span className="text-muted-foreground">.dev</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              {t(language, 'Building digital infrastructure and crafting experiences.', 'Xây dựng hạ tầng số và tạo trải nghiệm.')}
            </p>
            <div className="flex gap-3">
              {[Github, Linkedin, Twitter, Mail].map((Icon, i) => (
                <motion.a key={i} href="#" className="p-2 border border-foreground/30 hover:border-foreground" whileHover={{ scale: 1.1 }}>
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>
          <div>
            <div className="label-text mb-4">{t(language, 'LINKS', 'LIÊN KẾT')}</div>
            <nav className="space-y-2 text-sm">
              <a href="#about" className="block hover:text-accent">{t(language, 'About', 'Giới Thiệu')}</a>
              <a href="#projects" className="block hover:text-accent">{t(language, 'Projects', 'Dự Án')}</a>
              <a href="#blog" className="block hover:text-accent">Blog</a>
              <a href="#contact" className="block hover:text-accent">{t(language, 'Contact', 'Liên Hệ')}</a>
            </nav>
          </div>
          <div>
            <div className="label-text mb-4">{t(language, 'CONTACT', 'LIÊN LẠC')}</div>
            <div className="space-y-2 text-sm">
              <p>hello@daominhquan.dev</p>
              <p>Hanoi, Vietnam</p>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-foreground/20 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-muted-foreground">
          <span>© {new Date().getFullYear()} DAO MINH QUAN</span>
          <span className="flex items-center gap-1">{t(language, 'Built with', 'Xây dựng với')} <Heart size={10} className={theme === 'dark' ? 'text-accent' : ''} /> {t(language, 'in Hanoi', 'tại Hà Nội')}</span>
          <span className="font-mono">v2.0.0 // {theme === 'light' ? 'ANALOGUE' : 'CYBER'}_MODE</span>
        </div>
      </div>
    </footer>
  );
}