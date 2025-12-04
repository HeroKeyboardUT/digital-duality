import { motion } from 'framer-motion';
import { useTheme, t } from '@/context/ThemeContext';

export function BioModule() {
  const { theme, language } = useTheme();

  return (
    <motion.div 
      className="grid-cell h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="label-text mb-2">{t(language, 'SUBJECT PROFILE', 'HỒ SƠ CHỦ THỂ')} // REF:001</div>
      
      <h1 
        className={`font-sans font-black text-2xl sm:text-3xl mb-3 ${theme === 'dark' ? 'glitch neon-text' : ''}`}
        data-text="DAO MINH QUAN"
      >
        DAO MINH QUAN
      </h1>

      <div className="space-y-2 text-[11px] leading-relaxed">
        <p>
          <span className="label-text">{t(language, 'DESIGNATION', 'CHỨC DANH')}:</span>{' '}
          {t(language, 'Full-Stack Architect / System Designer', 'Kiến trúc sư Full-Stack / Thiết kế Hệ thống')}
        </p>
        <p>
          <span className="label-text">{t(language, 'LOCATION', 'VỊ TRÍ')}:</span>{' '}
          Hanoi, Vietnam [GMT+7]
        </p>
        <p>
          <span className="label-text">{t(language, 'CLEARANCE', 'QUYỀN TRUY CẬP')}:</span>{' '}
          Level 5 — {t(language, 'Full System Access', 'Truy cập Toàn Hệ thống')}
        </p>
        
        <div className="border-t border-foreground/30 pt-2 mt-3">
          <p className="text-[10px]">
            {t(language, 
              '> Building digital infrastructure since 2018. Specializing in distributed systems, real-time applications, and brutalist interfaces. Currently architecting next-gen platforms for emerging markets.',
              '> Xây dựng hạ tầng số từ 2018. Chuyên về hệ thống phân tán, ứng dụng thời gian thực và giao diện brutalist. Đang kiến trúc nền tảng thế hệ mới cho thị trường mới nổi.'
            )}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {['GitHub', 'LinkedIn', 'Twitter', 'Email'].map((link) => (
            <motion.a
              key={link}
              href="#"
              className="text-[9px] border border-foreground px-2 py-0.5 hover:bg-foreground hover:text-background transition-colors"
              whileHover={theme === 'dark' ? { 
                boxShadow: '0 0 10px hsl(180 100% 50% / 0.5)' 
              } : {}}
            >
              [{link.toUpperCase()}]
            </motion.a>
          ))}
        </div>
      </div>

      {theme === 'dark' && (
        <div className="mt-4 text-[8px] text-muted-foreground cursor-blink">
          AWAITING_INPUT
        </div>
      )}
    </motion.div>
  );
}
