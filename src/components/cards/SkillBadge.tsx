import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

interface SkillBadgeProps {
  skill: string;
  index?: number;
  delay?: number;
}

export function SkillBadge({ skill, index = 0, delay = 0 }: SkillBadgeProps) {
  const { theme } = useTheme();

  return (
    <motion.span
      className={`text-[9px] px-2 py-1 border border-foreground/40 transition-all cursor-default ${
        theme === 'dark' 
          ? 'hover:border-accent hover:text-accent hover:shadow-[0_0_8px_hsl(var(--neon-cyan)/0.3)]' 
          : 'hover:bg-foreground hover:text-background'
      }`}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: delay + index * 0.02 }}
      whileHover={{ scale: 1.05 }}
    >
      {skill}
    </motion.span>
  );
}
