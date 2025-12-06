import { motion } from 'framer-motion';
import { useTheme, t } from '@/context/ThemeContext';

const techData = [
  { category: 'LANGUAGES', items: ['TypeScript', 'Python', 'Rust', 'Go', 'SQL', 'C++'] },
  { category: 'FRONTEND', items: ['React', 'Next.js', 'Vue', 'Tailwind', 'Three.js', 'GSAP'] },
  { category: 'BACKEND', items: ['Node.js', 'FastAPI', 'GraphQL', 'gRPC', 'Kafka', 'RabbitMQ'] },
  { category: 'INFRA', items: ['AWS', 'GCP', 'K8s', 'Docker', 'Terraform', 'Ansible'] },
  { category: 'DATA', items: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Clickhouse'] },
];

const experiences = [
  {
    period: '2022 — Present',
    role: 'Senior Full-Stack Architect',
    roleVn: 'Kiến Trúc Sư Full-Stack Cao Cấp',
    company: 'TechVentures Corp',
    desc: 'Leading development of enterprise-scale distributed systems. Managing team of 8 engineers.',
    descVn: 'Dẫn dắt phát triển hệ thống phân tán quy mô doanh nghiệp. Quản lý đội ngũ 8 kỹ sư.',
  },
  {
    period: '2020 — 2022',
    role: 'Full-Stack Developer',
    roleVn: 'Lập Trình Viên Full-Stack',
    company: 'Digital Dynamics',
    desc: 'Built real-time trading platforms and analytics dashboards for fintech clients.',
    descVn: 'Xây dựng nền tảng giao dịch thời gian thực và dashboard phân tích cho khách hàng fintech.',
  },
  {
    period: '2018 — 2020',
    role: 'Frontend Developer',
    roleVn: 'Lập Trình Viên Frontend',
    company: 'StartupHub Vietnam',
    desc: 'Developed user interfaces for multiple SaaS products serving 100K+ users.',
    descVn: 'Phát triển giao diện người dùng cho nhiều sản phẩm SaaS phục vụ 100K+ người dùng.',
  },
];

export function AboutSection() {
  const { theme, language } = useTheme();

  return (
    <section id="about" className="py-20 px-4 border-t-2 border-foreground">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="label-text mb-2">01 // {t(language, 'ABOUT', 'GIỚI THIỆU')}</div>
          <h2 className={`text-4xl sm:text-5xl font-sans font-black ${theme === 'dark' ? 'neon-text' : ''}`}>
            {t(language, 'WHO I AM', 'TÔI LÀ AI')}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Bio & Experience */}
          <div className="space-y-8">
            <motion.div
              className="grid-cell"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="label-text mb-3">{t(language, 'BIOGRAPHY', 'TIỂU SỬ')}</div>
              <p className="text-sm leading-relaxed mb-4">
                {t(language,
                  "I'm a passionate technologist based in Hanoi, Vietnam with a deep love for building systems that scale. My journey in tech started with curiosity about how things work, leading me to explore everything from low-level systems programming to cloud architecture.",
                  "Tôi là một người đam mê công nghệ tại Hà Nội, Việt Nam với niềm yêu thích sâu sắc việc xây dựng hệ thống có khả năng mở rộng. Hành trình công nghệ của tôi bắt đầu từ sự tò mò về cách mọi thứ hoạt động, dẫn tôi khám phá mọi thứ từ lập trình hệ thống cấp thấp đến kiến trúc đám mây."
                )}
              </p>
              <p className="text-sm leading-relaxed">
                {t(language,
                  "When I'm not coding, you'll find me exploring new technologies, contributing to open source, or writing about software architecture. I believe in clean code, strong documentation, and the power of simple solutions to complex problems.",
                  "Khi không code, bạn sẽ thấy tôi khám phá công nghệ mới, đóng góp mã nguồn mở, hoặc viết về kiến trúc phần mềm. Tôi tin vào code sạch, tài liệu tốt, và sức mạnh của giải pháp đơn giản cho vấn đề phức tạp."
                )}
              </p>
            </motion.div>

            {/* Experience Timeline */}
            <div>
              <div className="label-text mb-4">{t(language, 'EXPERIENCE', 'KINH NGHIỆM')}</div>
              <div className="space-y-4">
                {experiences.map((exp, i) => (
                  <motion.div
                    key={i}
                    className="grid-cell"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-sans font-bold text-sm">
                          {t(language, exp.role, exp.roleVn)}
                        </h3>
                        <div className={`text-xs ${theme === 'dark' ? 'text-accent' : 'text-muted-foreground'}`}>
                          {exp.company}
                        </div>
                      </div>
                      <span className="label-text shrink-0">{exp.period}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      {t(language, exp.desc, exp.descVn)}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Tech Stack */}
          <motion.div
            className="grid-cell h-fit"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="label-text mb-4">{t(language, 'TECHNICAL ARSENAL', 'KHO VŨ KHÍ KỸ THUẬT')}</div>
            
            <div className="space-y-4">
              {techData.map((group, idx) => (
                <div key={group.category}>
                  <div className="text-[10px] font-bold mb-2 flex items-center gap-2">
                    <span className={theme === 'dark' ? 'text-primary' : ''}>{group.category}</span>
                    <div className="flex-1 border-t border-foreground/20" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item, i) => (
                      <motion.span
                        key={item}
                        className={`px-2 py-1 text-[10px] border border-foreground/50 ${
                          theme === 'dark' ? 'hover:border-accent hover:text-accent hover:shadow-[0_0_10px_hsl(120_100%_50%/0.3)]' : 'hover:bg-foreground hover:text-background'
                        } transition-all cursor-default`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 + i * 0.02 }}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Skill Bars */}
            <div className="mt-6 pt-4 border-t border-foreground/30">
              <div className="label-text mb-3">{t(language, 'PROFICIENCY LEVELS', 'MỨC ĐỘ THÀNH THẠO')}</div>
              <div className="space-y-3">
                {[
                  { skill: 'System Architecture', skillVn: 'Kiến Trúc Hệ Thống', level: 95 },
                  { skill: 'Frontend Development', skillVn: 'Phát Triển Frontend', level: 90 },
                  { skill: 'Backend Engineering', skillVn: 'Kỹ Thuật Backend', level: 92 },
                  { skill: 'DevOps & Cloud', skillVn: 'DevOps & Cloud', level: 85 },
                  { skill: 'Database Design', skillVn: 'Thiết Kế Database', level: 88 },
                ].map((item, i) => (
                  <div key={item.skill}>
                    <div className="flex justify-between text-[10px] mb-1">
                      <span>{t(language, item.skill, item.skillVn)}</span>
                      <span className={theme === 'dark' ? 'text-accent' : ''}>{item.level}%</span>
                    </div>
                    <div className="h-1.5 bg-foreground/10 overflow-hidden">
                      <motion.div
                        className={`h-full ${theme === 'dark' ? 'bg-primary shadow-[0_0_10px_hsl(180_100%_50%/0.5)]' : 'bg-foreground'}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
