import { motion } from 'framer-motion';
import { useTheme, t } from '@/context/ThemeContext';
import { Mail, Send } from 'lucide-react';

export function ContactModule() {
  const { theme, language } = useTheme();

  return (
    <motion.div 
      className="grid-cell h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Mail size={12} />
        <span className="label-text">{t(language, 'ESTABLISH CONNECTION', 'THIẾT LẬP KẾT NỐI')}</span>
      </div>

      <div className="text-[10px] mb-3">
        <p>{t(language, '> Ready to collaborate on your next project?', '> Sẵn sàng hợp tác trong dự án tiếp theo của bạn?')}</p>
        <p>{t(language, '> Open for consulting and contract work.', '> Mở cửa cho tư vấn và hợp đồng.')}</p>
      </div>

      <div className="flex gap-2">
        <input
          type="email"
          placeholder={t(language, 'your@email.com', 'email@cuaban.com')}
          className="flex-1 bg-transparent border border-foreground px-2 py-1 text-[10px] focus:outline-none focus:ring-1 focus:ring-foreground placeholder:text-muted-foreground"
        />
        <motion.button
          className={`grid-cell !p-1 px-3 flex items-center gap-1 text-[10px] !border ${
            theme === 'dark' ? 'hover:shadow-[0_0_15px_hsl(180_100%_50%_/_0.5)]' : ''
          }`}
          whileTap={{ scale: 0.95 }}
        >
          <Send size={10} />
          {t(language, 'TRANSMIT', 'GỬI')}
        </motion.button>
      </div>

      <div className="mt-3 text-[9px] text-muted-foreground">
        <span className="label-text">{t(language, 'RESPONSE TIME', 'THỜI GIAN PHẢN HỒI')}:</span> &lt;24h
      </div>
    </motion.div>
  );
}
