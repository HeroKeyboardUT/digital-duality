import { ThemeProvider, useTheme, t } from "@/context/ThemeContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GlitchTransition } from "@/components/GlitchTransition";
import { CRTOverlay } from "@/components/CRTOverlay";
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock, Calendar, Tag, ArrowLeft, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

// Blog posts data - easy to add new posts here
export interface BlogPost {
  id: string;
  title: string;
  titleVn: string;
  excerpt: string;
  excerptVn: string;
  content?: string;
  contentVn?: string;
  date: string;
  readTime: string;
  category: string;
  categoryVn: string;
  tags: string[];
  featured?: boolean;
  image?: string;
}

// ===== ADD NEW BLOG POSTS HERE =====
export const blogPosts: BlogPost[] = [
  {
    id: 'reinforcement-learning-basics',
    title: 'Introduction to Reinforcement Learning',
    titleVn: 'Giới Thiệu về Học Tăng Cường',
    excerpt: 'Understanding the fundamentals of RL: agents, environments, rewards, and how machines learn from trial and error.',
    excerptVn: 'Hiểu các khái niệm cơ bản của RL: agent, môi trường, phần thưởng, và cách máy học từ thử nghiệm.',
    date: '2024-01-20',
    readTime: '10 min',
    category: 'AI/ML',
    categoryVn: 'AI/ML',
    tags: ['Reinforcement Learning', 'Q-Learning', 'AI'],
    featured: true,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600',
  },
  {
    id: 'react-best-practices',
    title: 'React Best Practices for Clean Code',
    titleVn: 'Best Practices React cho Code Sạch',
    excerpt: 'Essential patterns and practices for writing maintainable React applications: component structure, hooks, and state management.',
    excerptVn: 'Các patterns và practices cần thiết để viết ứng dụng React dễ bảo trì: cấu trúc component, hooks, và quản lý state.',
    date: '2024-01-15',
    readTime: '8 min',
    category: 'Frontend',
    categoryVn: 'Frontend',
    tags: ['React', 'JavaScript', 'Clean Code'],
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600',
  },
  {
    id: 'nodejs-api-design',
    title: 'Designing RESTful APIs with Node.js',
    titleVn: 'Thiết Kế RESTful APIs với Node.js',
    excerpt: 'A comprehensive guide to building scalable and secure REST APIs using Node.js and Express.',
    excerptVn: 'Hướng dẫn toàn diện để xây dựng REST APIs có khả năng mở rộng và bảo mật với Node.js và Express.',
    date: '2024-01-10',
    readTime: '12 min',
    category: 'Backend',
    categoryVn: 'Backend',
    tags: ['Node.js', 'Express', 'API Design'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600',
  },
  {
    id: 'cnn-image-classification',
    title: 'CNN for Image Classification',
    titleVn: 'CNN cho Phân Loại Hình Ảnh',
    excerpt: 'Deep dive into Convolutional Neural Networks: architecture, training, and practical implementation with TensorFlow.',
    excerptVn: 'Tìm hiểu sâu về Mạng Neural Tích Chập: kiến trúc, huấn luyện, và triển khai thực tế với TensorFlow.',
    date: '2024-01-05',
    readTime: '15 min',
    category: 'AI/ML',
    categoryVn: 'AI/ML',
    tags: ['CNN', 'Deep Learning', 'TensorFlow'],
    featured: true,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600',
  },
  {
    id: 'git-workflow',
    title: 'Git Workflow for Team Projects',
    titleVn: 'Git Workflow cho Dự Án Nhóm',
    excerpt: 'Effective branching strategies, commit conventions, and collaboration practices for team development.',
    excerptVn: 'Chiến lược branching hiệu quả, quy ước commit, và practices hợp tác cho phát triển nhóm.',
    date: '2023-12-28',
    readTime: '6 min',
    category: 'Tools',
    categoryVn: 'Công Cụ',
    tags: ['Git', 'Teamwork', 'DevOps'],
    image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600',
  },
  {
    id: 'database-design-patterns',
    title: 'Database Design Patterns',
    titleVn: 'Các Mẫu Thiết Kế Cơ Sở Dữ Liệu',
    excerpt: 'Common patterns for designing efficient and scalable database schemas for different use cases.',
    excerptVn: 'Các mẫu phổ biến để thiết kế schema cơ sở dữ liệu hiệu quả và có khả năng mở rộng.',
    date: '2023-12-20',
    readTime: '10 min',
    category: 'Database',
    categoryVn: 'Cơ Sở Dữ Liệu',
    tags: ['SQL', 'MongoDB', 'Design Patterns'],
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600',
  },
];

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const { theme, language } = useTheme();

  return (
    <motion.article
      className={`grid-cell overflow-hidden ${post.featured ? 'md:col-span-2' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      {/* Image */}
      {post.image && (
        <div className="relative h-40 -mx-4 -mt-4 mb-4 overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <span className={`absolute top-2 left-2 text-[10px] px-2 py-1 ${
            theme === 'dark' ? 'bg-primary/90 text-background' : 'bg-foreground text-background'
          }`}>
            {t(language, post.category, post.categoryVn)}
          </span>
        </div>
      )}

      {/* Meta */}
      <div className="flex items-center gap-3 text-[10px] text-muted-foreground mb-2">
        <span className="flex items-center gap-1">
          <Calendar size={10} /> {post.date}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={10} /> {post.readTime}
        </span>
      </div>

      {/* Title */}
      <h3 className={`font-sans font-bold text-lg mb-2 ${theme === 'dark' ? 'text-flicker' : ''}`}>
        <Link to={`/blog/${post.id}`} className="hover:underline">
          {t(language, post.title, post.titleVn)}
        </Link>
      </h3>

      {/* Excerpt */}
      <p className="text-sm leading-relaxed mb-4 text-muted-foreground">
        {t(language, post.excerpt, post.excerptVn)}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-3">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className={`flex items-center gap-1 text-[9px] px-1.5 py-0.5 border border-foreground/30 ${
              theme === 'dark' ? 'border-primary/30 hover:border-accent' : ''
            }`}
          >
            <Tag size={8} /> {tag}
          </span>
        ))}
      </div>

      {/* Read More */}
      <Link
        to={`/blog/${post.id}`}
        className={`flex items-center gap-1 text-[10px] font-bold mt-auto pt-3 border-t border-foreground/20 hover:gap-2 transition-all ${
          theme === 'dark' ? 'hover:text-accent' : ''
        }`}
      >
        {t(language, 'READ MORE', 'ĐỌC THÊM')} <ArrowUpRight size={12} />
      </Link>
    </motion.article>
  );
}

function BlogContent() {
  const { theme, language } = useTheme();

  const categories = [...new Set(blogPosts.map(p => p.category))];

  return (
    <section className={`py-12 px-4 ${theme === 'dark' ? 'hex-pattern' : ''}`}>
      <div className="container mx-auto max-w-6xl">
        {/* Back Link */}
        <Link 
          to="/"
          className={`inline-flex items-center gap-2 text-sm mb-8 hover:underline ${theme === 'dark' ? 'text-primary' : ''}`}
        >
          <ArrowLeft size={16} />
          {t(language, 'Back to CV', 'Quay lại CV')}
        </Link>

        {/* Section Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="label-text mb-2">{t(language, 'KNOWLEDGE BASE', 'KHO KIẾN THỨC')}</div>
          <h1 className={`text-4xl sm:text-5xl font-sans font-black mb-4 ${theme === 'dark' ? 'neon-text' : ''}`}>
            {t(language, 'BLOG & NOTES', 'BLOG & GHI CHÚ')}
          </h1>
          <p className="text-sm max-w-2xl mb-6">
            {t(language,
              'My learning notes and technical writings. A place to document what I learn and share with others.',
              'Ghi chú học tập và bài viết kỹ thuật. Nơi lưu trữ những gì tôi học được và chia sẻ với mọi người.'
            )}
          </p>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <span
                key={cat}
                className={`text-[10px] px-3 py-1 border border-foreground/30 cursor-pointer transition-all ${
                  theme === 'dark' ? 'hover:border-accent hover:text-accent' : 'hover:bg-foreground hover:text-background'
                }`}
              >
                {cat}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogPosts.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} />
          ))}
        </div>

        {/* Info box about adding posts */}
        <motion.div
          className={`mt-12 p-6 border-2 border-dashed border-foreground/30 ${theme === 'dark' ? 'bg-primary/5' : 'bg-foreground/5'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-start gap-4">
            <BookOpen className={`shrink-0 ${theme === 'dark' ? 'text-accent' : ''}`} size={24} />
            <div>
              <h3 className="font-bold mb-2">{t(language, 'Adding New Posts', 'Thêm Bài Viết Mới')}</h3>
              <p className="text-sm text-muted-foreground">
                {t(language,
                  'To add new blog posts, edit the blogPosts array in src/pages/Blog.tsx. Each post needs an id, title, excerpt, date, and tags.',
                  'Để thêm bài viết mới, chỉnh sửa mảng blogPosts trong src/pages/Blog.tsx. Mỗi bài cần có id, title, excerpt, date, và tags.'
                )}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const Blog = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <GlitchTransition />
        <CRTOverlay />
        <Header />

        <main className="flex-1">
          <BlogContent />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Blog;
