import { motion } from 'framer-motion';
import { useTheme, t } from '@/context/ThemeContext';

export function Footer() {
  const { theme, language } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t-[2px] border-foreground bg-background">
      <div className="container mx-auto px-2 py-3">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-[9px]">
          <div className="flex items-center gap-4">
            <span className="label-text">© {currentYear} DAO.ARCH</span>
            <span className="text-muted-foreground">
              {t(language, 'ALL SYSTEMS OPERATIONAL', 'TẤT CẢ HỆ THỐNG HOẠT ĐỘNG')}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="label-text">{t(language, 'BUILD', 'PHIÊN BẢN')}</span>
            <span className={theme === 'dark' ? 'text-accent' : ''}>v2.4.7</span>
            <span className="text-muted-foreground">|</span>
            <span className="label-text">{t(language, 'LAST DEPLOY', 'TRIỂN KHAI CUỐI')}</span>
            <span>2024.12.04</span>
          </div>

          <motion.div
            className="flex items-center gap-2"
            animate={theme === 'dark' ? { opacity: [0.5, 1, 0.5] } : {}}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <span className={`w-2 h-2 rounded-full ${
              theme === 'dark' ? 'bg-accent' : 'bg-foreground'
            }`} />
            <span>{t(language, 'MONITORING ACTIVE', 'GIÁM SÁT HOẠT ĐỘNG')}</span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
