import { motion } from 'framer-motion';
import { useTheme, t } from '@/context/ThemeContext';

const techData = [
  { category: 'LANGUAGES', items: ['TypeScript', 'Python', 'Rust', 'Go', 'SQL'] },
  { category: 'FRONTEND', items: ['React', 'Next.js', 'Vue', 'Tailwind', 'Three.js'] },
  { category: 'BACKEND', items: ['Node.js', 'FastAPI', 'GraphQL', 'gRPC', 'Kafka'] },
  { category: 'INFRA', items: ['AWS', 'K8s', 'Docker', 'Terraform', 'Redis'] },
  { category: 'DATA', items: ['PostgreSQL', 'MongoDB', 'Elasticsearch', 'Clickhouse'] },
];

export function TechStack() {
  const { theme, language } = useTheme();

  return (
    <motion.div 
      className="grid-cell h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="label-text mb-2">{t(language, 'TECHNICAL ARSENAL', 'KHO VŨ KHÍ KỸ THUẬT')} // INVENTORY</div>
      
      <div className="space-y-1.5">
        {techData.map((group, idx) => (
          <div key={group.category} className="flex gap-2 text-[10px]">
            <span className="label-text w-16 shrink-0">{group.category}:</span>
            <div className="flex flex-wrap gap-1">
              {group.items.map((item, i) => (
                <motion.span
                  key={item}
                  className={`px-1.5 py-0.5 border border-foreground/50 ${
                    theme === 'dark' ? 'hover:border-accent hover:text-accent' : ''
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + idx * 0.05 + i * 0.02 }}
                  whileHover={theme === 'dark' ? {
                    boxShadow: '0 0 8px hsl(120 100% 50% / 0.5)',
                  } : {}}
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Skill bars visualization */}
      <div className="mt-3 pt-2 border-t border-foreground/30">
        <div className="grid grid-cols-5 gap-1 text-[8px]">
          {['SYS', 'NET', 'SEC', 'UI', 'DB'].map((skill, i) => (
            <div key={skill} className="text-center">
              <div className="h-8 bg-foreground/10 relative overflow-hidden">
                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-foreground"
                  initial={{ height: 0 }}
                  animate={{ height: `${60 + Math.random() * 40}%` }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                  style={theme === 'dark' ? { 
                    backgroundColor: i % 2 === 0 ? 'hsl(180 100% 50%)' : 'hsl(120 100% 50%)',
                    boxShadow: '0 0 10px currentColor'
                  } : {}}
                />
              </div>
              <span className="label-text">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
