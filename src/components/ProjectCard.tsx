import { motion } from 'framer-motion';
import { useTheme, t } from '@/context/ThemeContext';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  titleVn: string;
  year: string;
  tech: string[];
  role: string;
  roleVn: string;
  status: 'ACTIVE' | 'ARCHIVED' | 'CLASSIFIED';
  index: number;
}

export function ProjectCard({ title, titleVn, year, tech, role, roleVn, status, index }: ProjectCardProps) {
  const { theme, language } = useTheme();

  const statusColors = {
    ACTIVE: theme === 'dark' ? 'text-accent' : 'text-foreground',
    ARCHIVED: 'text-muted-foreground',
    CLASSIFIED: theme === 'dark' ? 'text-primary' : 'text-foreground',
  };

  return (
    <motion.div 
      className="grid-cell relative group h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.1 }}
    >
      {/* Project ID */}
      <div className="absolute top-1 right-1 text-[8px] text-muted-foreground">
        PRJ-{String(index + 1).padStart(3, '0')}
      </div>

      <div className="label-text mb-1">{year} // {t(language, role, roleVn)}</div>
      
      <h3 className={`font-sans font-bold text-sm mb-2 ${
        theme === 'dark' ? 'group-hover:text-primary text-flicker' : ''
      }`}>
        {t(language, title, titleVn)}
      </h3>

      <div className="flex flex-wrap gap-1 mb-2">
        {tech.map((t) => (
          <span key={t} className="text-[8px] border border-foreground/30 px-1">
            {t}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center text-[9px]">
        <span className={statusColors[status]}>
          [{t(language, status, status === 'ACTIVE' ? 'HOẠT ĐỘNG' : status === 'ARCHIVED' ? 'LƯU TRỮ' : 'MẬT')}]
        </span>
        <motion.a
          href="#"
          className="flex items-center gap-1 hover:text-accent"
          whileHover={{ x: 2 }}
        >
          {t(language, 'VIEW', 'XEM')} <ExternalLink size={10} />
        </motion.a>
      </div>

      {theme === 'dark' && (
        <motion.div
          className="absolute inset-0 border-2 border-primary opacity-0 group-hover:opacity-100 pointer-events-none"
          initial={false}
          animate={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          style={{ boxShadow: '0 0 20px hsl(180 100% 50% / 0.3)' }}
        />
      )}
    </motion.div>
  );
}

const projects = [
  {
    title: 'Neural Commerce Engine',
    titleVn: 'Động Cơ Thương Mại Neural',
    year: '2024',
    tech: ['Next.js', 'Rust', 'PostgreSQL'],
    role: 'Lead Architect',
    roleVn: 'Kiến trúc sư Trưởng',
    status: 'ACTIVE' as const,
  },
  {
    title: 'Distributed Log System',
    titleVn: 'Hệ Thống Log Phân Tán',
    year: '2023',
    tech: ['Go', 'Kafka', 'K8s'],
    role: 'System Designer',
    roleVn: 'Thiết kế Hệ thống',
    status: 'ACTIVE' as const,
  },
  {
    title: 'Real-time Analytics',
    titleVn: 'Phân Tích Thời Gian Thực',
    year: '2023',
    tech: ['Python', 'Clickhouse', 'Redis'],
    role: 'Data Engineer',
    roleVn: 'Kỹ sư Dữ liệu',
    status: 'ARCHIVED' as const,
  },
  {
    title: 'Project CHIMERA',
    titleVn: 'Dự Án CHIMERA',
    year: '2024',
    tech: ['[REDACTED]'],
    role: 'Consultant',
    roleVn: 'Tư vấn',
    status: 'CLASSIFIED' as const,
  },
];

export function ProjectsGrid() {
  const { language } = useTheme();

  return (
    <>
      <div className="col-span-4 grid-cell !py-2">
        <div className="label-text">{t(language, 'PROJECT REGISTRY', 'SỔ ĐĂNG KÝ DỰ ÁN')} // {projects.length} {t(language, 'ENTRIES', 'MỤC')}</div>
      </div>
      {projects.map((project, i) => (
        <div key={project.title} className="col-span-2 md:col-span-1">
          <ProjectCard {...project} index={i} />
        </div>
      ))}
    </>
  );
}
