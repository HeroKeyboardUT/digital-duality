import { motion } from 'framer-motion';
import { useTheme, t } from '@/context/ThemeContext';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const skillData = [
  { skill: 'Frontend', skillVn: 'Frontend', level: 85, fullMark: 100 },
  { skill: 'Backend', skillVn: 'Backend', level: 75, fullMark: 100 },
  { skill: 'Database', skillVn: 'Database', level: 70, fullMark: 100 },
  { skill: 'AI/ML', skillVn: 'AI/ML', level: 60, fullMark: 100 },
  { skill: 'DevOps', skillVn: 'DevOps', level: 50, fullMark: 100 },
  { skill: 'Problem Solving', skillVn: 'Giải Quyết VĐ', level: 80, fullMark: 100 },
];

export function SkillsRadar() {
  const { theme, language } = useTheme();
  
  const chartData = skillData.map(item => ({
    ...item,
    displaySkill: language === 'en' ? item.skill : item.skillVn,
  }));

  return (
    <motion.div
      className={`p-5 border-2 h-full
        ${theme === 'dark' ? 'border-primary/50 bg-card/50 backdrop-blur glow-border' : 'border-foreground bg-background'}`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-3 h-3 ${theme === 'dark' ? 'bg-accent' : 'bg-foreground'}`} />
        <h2 className="text-sm font-bold uppercase tracking-wider">
          {t(language, 'Skill Proficiency', 'Mức Độ Kỹ Năng')}
        </h2>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={chartData} cx="50%" cy="50%" outerRadius="70%">
            <PolarGrid 
              stroke={theme === 'dark' ? 'hsl(180, 100%, 50%, 0.2)' : 'hsl(0, 0%, 0%, 0.1)'} 
            />
            <PolarAngleAxis 
              dataKey="displaySkill" 
              tick={{ 
                fill: theme === 'dark' ? 'hsl(180, 100%, 50%)' : 'hsl(0, 0%, 0%)', 
                fontSize: 10,
                fontFamily: 'JetBrains Mono'
              }} 
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]} 
              tick={{ 
                fill: theme === 'dark' ? 'hsl(180, 100%, 50%, 0.5)' : 'hsl(0, 0%, 0%, 0.5)', 
                fontSize: 8 
              }}
              axisLine={false}
            />
            <Radar
              name="Skills"
              dataKey="level"
              stroke={theme === 'dark' ? 'hsl(120, 100%, 50%)' : 'hsl(0, 0%, 0%)'}
              fill={theme === 'dark' ? 'hsl(180, 100%, 50%)' : 'hsl(0, 0%, 0%)'}
              fillOpacity={theme === 'dark' ? 0.3 : 0.1}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 mt-4">
        {skillData.slice(0, 4).map((skill, idx) => (
          <motion.div
            key={idx}
            className="flex items-center gap-2 text-xs"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <div 
              className={`w-2 h-2 ${theme === 'dark' ? 'bg-primary' : 'bg-foreground'}`}
              style={{ opacity: skill.level / 100 }}
            />
            <span className="text-muted-foreground">
              {language === 'en' ? skill.skill : skill.skillVn}: {skill.level}%
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
