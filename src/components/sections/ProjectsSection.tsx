import { motion } from 'framer-motion';
import { useTheme, t } from '@/context/ThemeContext';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

interface Project {
  title: string;
  titleVn: string;
  description: string;
  descriptionVn: string;
  year: string;
  tech: string[];
  role: string;
  roleVn: string;
  status: 'ACTIVE' | 'ARCHIVED' | 'CLASSIFIED';
  featured?: boolean;
  image?: string;
  links?: { github?: string; live?: string };
}

const projects: Project[] = [
  {
    title: 'Neural Commerce Engine',
    titleVn: 'Động Cơ Thương Mại Neural',
    description: 'AI-powered e-commerce platform processing 1M+ transactions daily. Built with microservices architecture and real-time inventory management.',
    descriptionVn: 'Nền tảng thương mại điện tử AI xử lý 1M+ giao dịch mỗi ngày. Xây dựng với kiến trúc microservices và quản lý kho hàng thời gian thực.',
    year: '2024',
    tech: ['Next.js', 'Rust', 'PostgreSQL', 'Redis', 'Kafka'],
    role: 'Lead Architect',
    roleVn: 'Kiến Trúc Sư Trưởng',
    status: 'ACTIVE',
    featured: true,
    links: { github: '#', live: '#' },
  },
  {
    title: 'Distributed Log System',
    titleVn: 'Hệ Thống Log Phân Tán',
    description: 'High-throughput logging infrastructure handling 500K events/sec with real-time search and analytics capabilities.',
    descriptionVn: 'Hạ tầng logging thông lượng cao xử lý 500K sự kiện/giây với khả năng tìm kiếm và phân tích thời gian thực.',
    year: '2023',
    tech: ['Go', 'Kafka', 'Kubernetes', 'Elasticsearch'],
    role: 'System Designer',
    roleVn: 'Thiết Kế Hệ Thống',
    status: 'ACTIVE',
    featured: true,
    links: { github: '#' },
  },
  {
    title: 'Real-time Analytics Dashboard',
    titleVn: 'Dashboard Phân Tích Thời Gian Thực',
    description: 'Interactive analytics platform with live data visualization, custom metrics tracking, and automated reporting.',
    descriptionVn: 'Nền tảng phân tích tương tác với trực quan hóa dữ liệu trực tiếp, theo dõi metrics tùy chỉnh và báo cáo tự động.',
    year: '2023',
    tech: ['React', 'Python', 'Clickhouse', 'WebSocket'],
    role: 'Full-Stack Developer',
    roleVn: 'Lập Trình Viên Full-Stack',
    status: 'ACTIVE',
    links: { live: '#' },
  },
  {
    title: 'Crypto Trading Bot',
    titleVn: 'Bot Giao Dịch Crypto',
    description: 'Automated trading system with ML-based prediction models achieving 40% annual returns with risk management.',
    descriptionVn: 'Hệ thống giao dịch tự động với mô hình dự đoán ML đạt lợi nhuận 40%/năm với quản lý rủi ro.',
    year: '2023',
    tech: ['Python', 'TensorFlow', 'Redis', 'WebSocket'],
    role: 'ML Engineer',
    roleVn: 'Kỹ Sư ML',
    status: 'ARCHIVED',
  },
  {
    title: 'IoT Fleet Management',
    titleVn: 'Quản Lý Đội Xe IoT',
    description: 'Real-time vehicle tracking and management platform for logistics company with 5000+ vehicles.',
    descriptionVn: 'Nền tảng theo dõi và quản lý xe thời gian thực cho công ty logistics với 5000+ phương tiện.',
    year: '2022',
    tech: ['Node.js', 'MQTT', 'MongoDB', 'React Native'],
    role: 'Backend Lead',
    roleVn: 'Trưởng Nhóm Backend',
    status: 'ARCHIVED',
  },
  {
    title: 'Project CHIMERA',
    titleVn: 'Dự Án CHIMERA',
    description: 'Confidential project for government client. Advanced security systems and encrypted communication protocols.',
    descriptionVn: 'Dự án bảo mật cho khách hàng chính phủ. Hệ thống bảo mật nâng cao và giao thức liên lạc mã hóa.',
    year: '2024',
    tech: ['[REDACTED]'],
    role: 'Security Consultant',
    roleVn: 'Tư Vấn Bảo Mật',
    status: 'CLASSIFIED',
  },
  {
    title: 'Social Media Aggregator',
    titleVn: 'Tổng Hợp Mạng Xã Hội',
    description: 'Unified social media management tool with AI-powered content scheduling and analytics.',
    descriptionVn: 'Công cụ quản lý mạng xã hội hợp nhất với lịch đăng bài AI và phân tích.',
    year: '2022',
    tech: ['Vue.js', 'FastAPI', 'PostgreSQL', 'Redis'],
    role: 'Full-Stack Developer',
    roleVn: 'Lập Trình Viên Full-Stack',
    status: 'ARCHIVED',
  },
  {
    title: 'Fintech Payment Gateway',
    titleVn: 'Cổng Thanh Toán Fintech',
    description: 'PCI-compliant payment processing system handling millions in daily transactions across Southeast Asia.',
    descriptionVn: 'Hệ thống xử lý thanh toán tuân thủ PCI xử lý hàng triệu giao dịch mỗi ngày trên khắp Đông Nam Á.',
    year: '2021',
    tech: ['Java', 'Spring Boot', 'Oracle', 'Kubernetes'],
    role: 'Backend Developer',
    roleVn: 'Lập Trình Viên Backend',
    status: 'ARCHIVED',
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { theme, language } = useTheme();

  const statusColors = {
    ACTIVE: theme === 'dark' ? 'text-accent' : 'text-foreground',
    ARCHIVED: 'text-muted-foreground',
    CLASSIFIED: theme === 'dark' ? 'text-primary' : 'text-foreground',
  };

  const statusLabels = {
    ACTIVE: t(language, 'ACTIVE', 'HOẠT ĐỘNG'),
    ARCHIVED: t(language, 'ARCHIVED', 'LƯU TRỮ'),
    CLASSIFIED: t(language, 'CLASSIFIED', 'MẬT'),
  };

  return (
    <motion.article
      className={`grid-cell h-full flex flex-col ${project.featured ? 'md:col-span-2' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="label-text">
          PRJ-{String(index + 1).padStart(3, '0')} // {project.year}
        </div>
        <span className={`text-[9px] ${statusColors[project.status]}`}>
          [{statusLabels[project.status]}]
        </span>
      </div>

      {/* Title & Role */}
      <h3 className={`font-sans font-bold text-lg mb-1 ${theme === 'dark' ? 'text-flicker' : ''}`}>
        {t(language, project.title, project.titleVn)}
      </h3>
      <div className={`text-[10px] mb-3 ${theme === 'dark' ? 'text-primary' : 'text-muted-foreground'}`}>
        {t(language, project.role, project.roleVn)}
      </div>

      {/* Description */}
      <p className="text-[11px] leading-relaxed mb-4 flex-1">
        {t(language, project.description, project.descriptionVn)}
      </p>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-1 mb-4">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className={`text-[9px] px-1.5 py-0.5 border border-foreground/30 ${
              theme === 'dark' ? 'border-primary/30' : ''
            }`}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      {project.links && (
        <div className="flex gap-3 mt-auto pt-3 border-t border-foreground/20">
          {project.links.github && (
            <a
              href={project.links.github}
              className="flex items-center gap-1 text-[10px] hover:text-accent transition-colors"
            >
              <Github size={12} /> CODE
            </a>
          )}
          {project.links.live && (
            <a
              href={project.links.live}
              className="flex items-center gap-1 text-[10px] hover:text-accent transition-colors"
            >
              <ExternalLink size={12} /> LIVE
            </a>
          )}
        </div>
      )}
    </motion.article>
  );
}

export function ProjectsSection() {
  const { theme, language } = useTheme();

  return (
    <section id="projects" className="py-20 px-4 border-t-2 border-foreground">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="label-text mb-2">02 // {t(language, 'PROJECTS', 'DỰ ÁN')}</div>
          <h2 className={`text-4xl sm:text-5xl font-sans font-black mb-4 ${theme === 'dark' ? 'neon-text' : ''}`}>
            {t(language, 'SELECTED WORKS', 'CÁC CÔNG TRÌNH')}
          </h2>
          <p className="text-sm max-w-2xl">
            {t(language,
              'A curated selection of projects spanning enterprise solutions, open-source contributions, and experimental explorations.',
              'Tuyển chọn các dự án từ giải pháp doanh nghiệp, đóng góp mã nguồn mở, đến các thử nghiệm khám phá.'
            )}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <a
            href="#"
            className={`inline-flex items-center gap-2 px-6 py-3 border-2 border-foreground text-sm font-bold hover:bg-foreground hover:text-background transition-colors ${
              theme === 'dark' ? 'hover:shadow-[0_0_20px_hsl(180_100%_50%/0.5)]' : ''
            }`}
          >
            {t(language, 'VIEW ALL PROJECTS', 'XEM TẤT CẢ DỰ ÁN')}
            <ArrowUpRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
