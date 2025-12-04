import { motion } from 'framer-motion';
import { useTheme, t } from '@/context/ThemeContext';

const stats = [
  { label: 'YEARS EXP', labelVn: 'NĂM KINH NGHIỆM', value: '6+' },
  { label: 'PROJECTS', labelVn: 'DỰ ÁN', value: '50+' },
  { label: 'CLIENTS', labelVn: 'KHÁCH HÀNG', value: '30+' },
  { label: 'UPTIME', labelVn: 'THỜI GIAN HOẠT ĐỘNG', value: '99.9%' },
];

export function StatsModule() {
  const { theme, language } = useTheme();

  return (
    <motion.div 
      className="grid-cell"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
    >
      <div className="label-text mb-2">{t(language, 'METRICS DASHBOARD', 'BẢNG ĐIỀU KHIỂN SỐ LIỆU')}</div>
      
      <div className="grid grid-cols-4 gap-2">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="text-center p-2 border border-foreground/30"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.05 }}
            whileHover={theme === 'dark' ? {
              borderColor: 'hsl(180 100% 50%)',
              boxShadow: '0 0 15px hsl(180 100% 50% / 0.3)',
            } : {}}
          >
            <div className={`font-sans font-black text-xl ${
              theme === 'dark' ? 'text-primary neon-text' : ''
            }`}>
              {stat.value}
            </div>
            <div className="label-text">{t(language, stat.label, stat.labelVn)}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
