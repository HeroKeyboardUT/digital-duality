import { motion } from 'framer-motion';
import { useTheme, t } from '@/context/ThemeContext';
import { ArrowUpRight, Clock, Eye } from 'lucide-react';

interface BlogPost {
  title: string;
  titleVn: string;
  excerpt: string;
  excerptVn: string;
  date: string;
  readTime: string;
  views: string;
  tags: string[];
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    title: 'Building Scalable Distributed Systems: Lessons from Production',
    titleVn: 'Xây Dựng Hệ Thống Phân Tán Quy Mô: Bài Học Từ Production',
    excerpt: 'Deep dive into the architectural decisions, trade-offs, and hard-learned lessons from building systems that handle millions of requests per day.',
    excerptVn: 'Phân tích sâu về các quyết định kiến trúc, đánh đổi, và bài học khó khăn từ việc xây dựng hệ thống xử lý hàng triệu request mỗi ngày.',
    date: '2024-01-15',
    readTime: '12 min',
    views: '15.2K',
    tags: ['Architecture', 'Distributed Systems', 'Performance'],
    featured: true,
  },
  {
    title: 'The Art of Writing Clean, Maintainable Code',
    titleVn: 'Nghệ Thuật Viết Code Sạch, Dễ Bảo Trì',
    excerpt: 'Practical principles and patterns for writing code that your future self (and teammates) will thank you for.',
    excerptVn: 'Nguyên tắc thực tiễn và patterns để viết code mà bản thân tương lai (và đồng đội) sẽ biết ơn bạn.',
    date: '2024-01-08',
    readTime: '8 min',
    views: '8.5K',
    tags: ['Clean Code', 'Best Practices'],
  },
  {
    title: 'Real-time Data Processing with Kafka and Rust',
    titleVn: 'Xử Lý Dữ Liệu Thời Gian Thực với Kafka và Rust',
    excerpt: 'How we achieved sub-millisecond latency processing 500K events per second using Kafka and Rust.',
    excerptVn: 'Cách chúng tôi đạt độ trễ dưới mili-giây xử lý 500K sự kiện mỗi giây với Kafka và Rust.',
    date: '2023-12-20',
    readTime: '15 min',
    views: '12.1K',
    tags: ['Kafka', 'Rust', 'Performance'],
  },
  {
    title: 'Brutalist Web Design: Form Follows Function',
    titleVn: 'Thiết Kế Web Brutalist: Hình Thức Theo Chức Năng',
    excerpt: 'Exploring the philosophy behind brutalist web design and how to create striking, functional interfaces.',
    excerptVn: 'Khám phá triết lý đằng sau thiết kế web brutalist và cách tạo giao diện ấn tượng, chức năng.',
    date: '2023-12-10',
    readTime: '6 min',
    views: '5.3K',
    tags: ['Design', 'UI/UX', 'Philosophy'],
  },
  {
    title: 'Kubernetes in Production: A Practical Guide',
    titleVn: 'Kubernetes trong Production: Hướng Dẫn Thực Tiễn',
    excerpt: 'Everything I wish I knew before deploying Kubernetes in production. Common pitfalls and how to avoid them.',
    excerptVn: 'Mọi thứ tôi ước mình biết trước khi triển khai Kubernetes trong production. Những lỗi phổ biến và cách tránh.',
    date: '2023-11-28',
    readTime: '20 min',
    views: '18.7K',
    tags: ['Kubernetes', 'DevOps', 'Infrastructure'],
  },
  {
    title: 'TypeScript Advanced Patterns for Enterprise Apps',
    titleVn: 'Patterns TypeScript Nâng Cao cho Ứng Dụng Doanh Nghiệp',
    excerpt: 'Advanced TypeScript patterns including discriminated unions, branded types, and type-safe APIs.',
    excerptVn: 'Các patterns TypeScript nâng cao bao gồm discriminated unions, branded types, và APIs type-safe.',
    date: '2023-11-15',
    readTime: '10 min',
    views: '9.8K',
    tags: ['TypeScript', 'Patterns', 'Enterprise'],
  },
];

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const { theme, language } = useTheme();

  return (
    <motion.article
      className={`grid-cell h-full flex flex-col ${post.featured ? 'md:col-span-2 md:row-span-2' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="label-text">{post.date}</div>
        <div className="flex items-center gap-3 text-[9px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock size={10} /> {post.readTime}
          </span>
          <span className="flex items-center gap-1">
            <Eye size={10} /> {post.views}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 className={`font-sans font-bold ${post.featured ? 'text-xl md:text-2xl' : 'text-sm'} mb-2 ${
        theme === 'dark' ? 'text-flicker hover:text-accent' : ''
      } transition-colors`}>
        <a href="#" className="hover:underline">
          {t(language, post.title, post.titleVn)}
        </a>
      </h3>

      {/* Excerpt */}
      <p className={`text-[11px] leading-relaxed mb-4 flex-1 ${post.featured ? 'text-sm' : ''}`}>
        {t(language, post.excerpt, post.excerptVn)}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-3">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className={`text-[8px] px-1.5 py-0.5 border border-foreground/30 ${
              theme === 'dark' ? 'border-primary/30 hover:border-accent hover:text-accent' : ''
            }`}
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Read More */}
      <a
        href="#"
        className={`flex items-center gap-1 text-[10px] font-bold mt-auto pt-3 border-t border-foreground/20 hover:gap-2 transition-all ${
          theme === 'dark' ? 'hover:text-accent' : ''
        }`}
      >
        {t(language, 'READ MORE', 'ĐỌC THÊM')} <ArrowUpRight size={12} />
      </a>
    </motion.article>
  );
}

export function BlogSection() {
  const { theme, language } = useTheme();

  return (
    <section id="blog" className="py-20 px-4 border-t-2 border-foreground">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="label-text mb-2">03 // {t(language, 'THOUGHTS', 'SUY NGHĨ')}</div>
          <h2 className={`text-4xl sm:text-5xl font-sans font-black mb-4 ${theme === 'dark' ? 'neon-text' : ''}`}>
            {t(language, 'BLOG & WRITINGS', 'BLOG & BÀI VIẾT')}
          </h2>
          <p className="text-sm max-w-2xl">
            {t(language,
              'Technical deep-dives, architectural insights, and reflections on building software at scale.',
              'Phân tích kỹ thuật sâu, insights kiến trúc, và suy ngẫm về việc xây dựng phần mềm quy mô lớn.'
            )}
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogPosts.map((post, i) => (
            <BlogCard key={post.title} post={post} index={i} />
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
            {t(language, 'VIEW ALL POSTS', 'XEM TẤT CẢ BÀI VIẾT')}
            <ArrowUpRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
