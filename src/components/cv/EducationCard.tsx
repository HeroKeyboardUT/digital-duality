import { motion } from 'framer-motion';
import { useTheme, t } from '@/context/ThemeContext';
import { GraduationCap, Calendar, Award, TrendingUp } from 'lucide-react';

export function EducationCard() {
  const { theme, language } = useTheme();

  return (
    <motion.section
      id="cv-education"
      className={`p-5 border-2 relative overflow-hidden
        ${theme === 'dark' ? 'border-primary/50 bg-card/50 backdrop-blur glow-border' : 'border-foreground bg-background'}`}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      {/* Decorative corner */}
      <div className={`absolute top-0 right-0 w-20 h-20 -mr-10 -mt-10 rounded-full
        ${theme === 'dark' ? 'bg-accent/10' : 'bg-muted'}`} 
      />

      <div className="flex items-center gap-2 mb-4 relative">
        <GraduationCap size={18} className={theme === 'dark' ? 'text-accent' : ''} />
        <h2 className="text-sm font-bold uppercase tracking-wider">
          {t(language, 'Education', 'Học Vấn')}
        </h2>
      </div>

      <div className="space-y-3 relative">
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 flex items-center justify-center border-2 flex-shrink-0
            ${theme === 'dark' ? 'border-primary/50 bg-primary/10' : 'border-foreground bg-muted'}`}>
            <span className="text-lg">🎓</span>
          </div>
          <div>
            <h3 className="font-bold text-sm">VNU-HCM University of Technology</h3>
            <div className="text-xs text-muted-foreground">
              {t(language, 'Bachelor of Computer Science', 'Cử Nhân Khoa Học Máy Tính')}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar size={12} /> 2023 - 2027
          </span>
          <span className="flex items-center gap-1">
            <Award size={12} /> {t(language, 'Year 2', 'Năm 2')}
          </span>
        </div>

        {/* GPA with animation */}
        <motion.div
          className={`flex items-center gap-3 p-3 border-2
            ${theme === 'dark' ? 'border-accent/30 bg-accent/5' : 'border-foreground/30 bg-muted'}`}
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', delay: 0.2 }}
        >
          <TrendingUp size={20} className={theme === 'dark' ? 'text-accent' : ''} />
          <div>
            <div className="text-xs text-muted-foreground uppercase">{t(language, 'Current GPA', 'GPA Hiện Tại')}</div>
            <motion.div
              className={`text-2xl font-black ${theme === 'dark' ? 'text-accent neon-text' : ''}`}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', delay: 0.3 }}
            >
              3.5/4.0
            </motion.div>
          </div>
          <div className={`ml-auto px-2 py-1 text-[10px] font-bold uppercase
            ${theme === 'dark' ? 'bg-accent/20 text-accent' : 'bg-foreground text-background'}`}>
            {t(language, 'Top 15%', 'Top 15%')}
          </div>
        </motion.div>

        {/* Achievements */}
        <div className="flex flex-wrap gap-2">
          {[
            { text: "Dean's List", textVn: 'DS Xuất Sắc' },
            { text: 'CS Club', textVn: 'CLB CNTT' },
            { text: 'Active Learner', textVn: 'Tự Học' },
          ].map((item, idx) => (
            <motion.span
              key={idx}
              className={`px-2 py-0.5 text-[10px] border
                ${theme === 'dark' ? 'border-primary/40 text-primary' : 'border-foreground/40'}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + idx * 0.1 }}
            >
              {language === 'en' ? item.text : item.textVn}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
