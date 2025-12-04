import { motion } from 'framer-motion';
import { useTheme, t } from '@/context/ThemeContext';
import { GitCommit } from 'lucide-react';

const logs = [
  { hash: 'a7f3c2d', msg: 'feat: implement neural pathways', time: '2h ago', timeVn: '2 giờ trước' },
  { hash: 'b8e4d1a', msg: 'fix: memory leak in cache layer', time: '5h ago', timeVn: '5 giờ trước' },
  { hash: 'c9f5e2b', msg: 'refactor: optimize query engine', time: '1d ago', timeVn: '1 ngày trước' },
  { hash: 'd0a6f3c', msg: 'docs: update system architecture', time: '2d ago', timeVn: '2 ngày trước' },
  { hash: 'e1b7a4d', msg: 'perf: reduce latency by 40%', time: '3d ago', timeVn: '3 ngày trước' },
  { hash: 'f2c8b5e', msg: 'feat: add real-time sync', time: '4d ago', timeVn: '4 ngày trước' },
];

export function CommitLog() {
  const { theme, language } = useTheme();

  return (
    <motion.div 
      className="grid-cell h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex items-center gap-2 mb-2">
        <GitCommit size={12} />
        <span className="label-text">{t(language, 'ACTIVITY LOG', 'NHẬT KÝ HOẠT ĐỘNG')} // COMMITS</span>
      </div>

      <div className="space-y-1 font-mono text-[10px]">
        {logs.map((log, i) => (
          <motion.div
            key={log.hash}
            className={`flex items-start gap-2 p-1 border-l-2 ${
              theme === 'dark' 
                ? 'border-l-primary hover:bg-primary/10' 
                : 'border-l-foreground hover:bg-foreground hover:text-background'
            } transition-colors`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.05 }}
          >
            <span className={`shrink-0 ${theme === 'dark' ? 'text-accent' : ''}`}>
              {log.hash}
            </span>
            <span className="flex-1 truncate">{log.msg}</span>
            <span className="text-muted-foreground shrink-0 hidden sm:inline">
              {t(language, log.time, log.timeVn)}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="mt-3 pt-2 border-t border-foreground/30 text-[9px]">
        <div className="flex justify-between">
          <span className="label-text">{t(language, 'TOTAL COMMITS', 'TỔNG COMMITS')}</span>
          <span>2,847</span>
        </div>
        <div className="flex justify-between">
          <span className="label-text">{t(language, 'THIS WEEK', 'TUẦN NÀY')}</span>
          <span className={theme === 'dark' ? 'text-accent' : ''}>+47</span>
        </div>
        <div className="flex justify-between">
          <span className="label-text">{t(language, 'STREAK', 'CHUỖI')}</span>
          <span>128 {t(language, 'days', 'ngày')}</span>
        </div>
      </div>
    </motion.div>
  );
}
