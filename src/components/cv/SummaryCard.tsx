import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme, t } from '@/context/ThemeContext';
import { User, Terminal } from 'lucide-react';
import { TypingEffect } from './TypingEffect';

const summaryEn = "Passionate Computer Science student at HCMUT with strong foundation in software development, AI/ML, and problem-solving. Experienced in building full-stack web applications using React, Node.js, and modern technologies. Eager to apply academic knowledge in real-world projects and contribute to innovative teams.";

const summaryVn = "Sinh viên Khoa học Máy tính đam mê tại HCMUT với nền tảng vững chắc về phát triển phần mềm, AI/ML, và giải quyết vấn đề. Có kinh nghiệm xây dựng ứng dụng web full-stack sử dụng React, Node.js, và các công nghệ hiện đại. Mong muốn áp dụng kiến thức học thuật vào dự án thực tế và đóng góp cho các team sáng tạo.";

export function SummaryCard() {
  const { theme, language } = useTheme();
  const [showTyping, setShowTyping] = useState(true);

  return (
    <motion.section
      className={`p-5 border-2 relative overflow-hidden
        ${theme === 'dark' ? 'border-primary/50 bg-card/50 backdrop-blur glow-border' : 'border-foreground bg-background'}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Terminal-style header */}
      <div className="flex items-center gap-2 mb-4">
        {theme === 'dark' ? (
          <Terminal size={18} className="text-accent" />
        ) : (
          <User size={18} />
        )}
        <h2 className="text-sm font-bold uppercase tracking-wider">
          {t(language, 'Professional Summary', 'Tóm Tắt Chuyên Nghiệp')}
        </h2>
        {theme === 'dark' && (
          <div className="ml-auto flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-destructive" />
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <div className="w-2 h-2 rounded-full bg-accent" />
          </div>
        )}
      </div>

      {/* Terminal-style content */}
      <div className={`${theme === 'dark' ? 'font-mono text-sm' : 'text-sm'}`}>
        {theme === 'dark' && (
          <span className="text-accent">$ cat about.txt<br /></span>
        )}
        {showTyping ? (
          <TypingEffect
            text={language === 'en' ? summaryEn : summaryVn}
            speed={15}
            delay={500}
            className={theme === 'dark' ? 'text-primary/90' : 'text-muted-foreground'}
            onComplete={() => setShowTyping(false)}
          />
        ) : (
          <span className={theme === 'dark' ? 'text-primary/90' : 'text-muted-foreground'}>
            {language === 'en' ? summaryEn : summaryVn}
          </span>
        )}
      </div>

      {/* Skip button */}
      {showTyping && (
        <motion.button
          className={`mt-3 px-2 py-1 text-[10px] border
            ${theme === 'dark' 
              ? 'border-primary/30 text-primary/60 hover:border-primary/60' 
              : 'border-foreground/30 text-muted-foreground hover:border-foreground'}`}
          onClick={() => setShowTyping(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {t(language, 'Skip →', 'Bỏ qua →')}
        </motion.button>
      )}

      {/* Decorative scan line for dark mode */}
      {theme === 'dark' && (
        <div className="scan-line" />
      )}
    </motion.section>
  );
}
