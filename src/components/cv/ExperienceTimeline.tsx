import { motion } from 'framer-motion';
import { useTheme, t } from '@/context/ThemeContext';
import { Calendar, MapPin, Briefcase } from 'lucide-react';
import { experiences } from '@/data';

export function ExperienceTimeline() {
  const { theme, language } = useTheme();

  return (
    <motion.div
      className={`p-5 border-2 h-full
        ${theme === 'dark' ? 'border-primary/50 bg-card/50 backdrop-blur glow-border' : 'border-foreground bg-background'}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-2 mb-6">
        <Briefcase size={16} className={theme === 'dark' ? 'text-accent' : ''} />
        <h2 className="text-sm font-bold uppercase tracking-wider">
          {t(language, 'Experience & Education', 'Kinh Nghiệm & Học Vấn')}
        </h2>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className={`absolute left-4 top-0 bottom-0 w-0.5
          ${theme === 'dark' ? 'bg-gradient-to-b from-accent via-primary to-transparent' : 'bg-foreground/30'}`} 
        />

        {experiences.map((exp, idx) => (
          <motion.div
            key={idx}
            className="relative pl-10 pb-6 last:pb-0"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
          >
            {/* Timeline node */}
            <motion.div
              className={`absolute left-2 top-1 w-5 h-5 border-2 flex items-center justify-center
                ${theme === 'dark' 
                  ? 'border-accent bg-background' 
                  : 'border-foreground bg-background'}`}
              whileHover={{ scale: 1.3 }}
              animate={idx === 0 ? { 
                boxShadow: theme === 'dark' 
                  ? ['0 0 0 0 hsl(120 100% 50% / 0.4)', '0 0 0 10px hsl(120 100% 50% / 0)', '0 0 0 0 hsl(120 100% 50% / 0.4)']
                  : ['0 0 0 0 rgba(0,0,0,0.2)', '0 0 0 10px rgba(0,0,0,0)', '0 0 0 0 rgba(0,0,0,0.2)']
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className={`w-2 h-2 ${theme === 'dark' ? 'bg-accent' : 'bg-foreground'}`} />
            </motion.div>

            {/* Content card */}
            <motion.div
              className={`p-4 border-2
                ${theme === 'dark' 
                  ? 'border-primary/30 bg-secondary/30 hover:border-primary/50' 
                  : 'border-foreground/30 hover:border-foreground'}`}
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`px-2 py-0.5 text-[10px] uppercase
                  ${exp.type === 'education'
                    ? theme === 'dark' ? 'bg-accent/20 text-accent' : 'bg-muted'
                    : theme === 'dark' ? 'bg-primary/20 text-primary' : 'bg-foreground/10'}`}>
                  {exp.type}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar size={10} />
                  {exp.period}
                </span>
              </div>

              <h3 className="font-bold text-sm mb-1">
                {language === 'en' ? exp.title : exp.titleVn}
              </h3>
              <div className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
                <MapPin size={10} />
                {exp.company}
              </div>

              <p className="text-xs text-muted-foreground mb-3">
                {language === 'en' ? exp.description : exp.descriptionVn}
              </p>

              {/* Achievements */}
              <div className="flex flex-wrap gap-2">
                {(language === 'en' ? exp.achievements : exp.achievementsVn).map((achievement, achIdx) => (
                  <motion.span
                    key={achIdx}
                    className={`px-2 py-0.5 text-[10px] border
                      ${theme === 'dark' 
                        ? 'border-primary/40 text-primary' 
                        : 'border-foreground/40'}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + achIdx * 0.1 }}
                  >
                    {achievement}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
