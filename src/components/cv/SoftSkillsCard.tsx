import { motion } from 'framer-motion';
import { useTheme, t } from '@/context/ThemeContext';
import { Heart, Users, Clock, BookOpen, Lightbulb, Target, MessageCircle } from 'lucide-react';
import { softSkills } from '@/data/skills';

const iconMap: Record<string, any> = {
  TC: Users,
  TM: Clock,
  SL: BookOpen,
  CT: Lightbulb,
  PS: Target,
  CO: MessageCircle,
};

export function SoftSkillsCard() {
  const { theme, language } = useTheme();

  return (
    <motion.section
      className={`p-5 border-2
        ${theme === 'dark' ? 'border-primary/50 bg-card/50 backdrop-blur glow-border' : 'border-foreground bg-background'}`}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Heart size={18} className={theme === 'dark' ? 'text-accent' : ''} />
        <h2 className="text-sm font-bold uppercase tracking-wider">
          {t(language, 'Soft Skills', 'Kỹ Năng Mềm')}
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {softSkills.map((skill, idx) => {
          const Icon = iconMap[skill.icon] || Heart;
          
          return (
            <motion.div
              key={idx}
              className={`flex items-center gap-2 p-2 border group cursor-default
                ${theme === 'dark' 
                  ? 'border-primary/30 hover:border-primary/60 hover:bg-primary/10' 
                  : 'border-foreground/30 hover:border-foreground hover:bg-muted'}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + idx * 0.05 }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className={`p-1 ${theme === 'dark' ? 'text-accent' : 'text-foreground'}`}
                whileHover={{ rotate: 10 }}
              >
                <Icon size={14} />
              </motion.div>
              <span className="text-[10px] font-medium">
                {language === 'en' ? skill.name : skill.nameVn}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
