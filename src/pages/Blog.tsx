import { ThemeProvider } from '@/context/ThemeContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CRTOverlay } from '@/components/CRTOverlay';
import { GlitchTransition } from '@/components/GlitchTransition';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, t } from '@/context/ThemeContext';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Tag, Search, FolderOpen, Plus, BookOpen, TrendingUp, Sparkles, ChevronRight, Calendar, Eye } from 'lucide-react';
import { useState, useMemo } from 'react';

interface BlogPost {
  id: string;
  title: string;
  titleVn: string;
  excerpt: string;
  excerptVn: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured?: boolean;
  views?: number;
  icon: string;
}

// Easy to add more posts - just add to this array
const blogPosts: BlogPost[] = [
  {
    id: 'data-structures-basics',
    title: 'Data Structures Fundamentals',
    titleVn: 'Cơ Bản Về Cấu Trúc Dữ Liệu',
    excerpt: 'Essential data structures every developer should know: Arrays, Linked Lists, Stacks, Queues, Trees, and Graphs.',
    excerptVn: 'Các cấu trúc dữ liệu cơ bản mà mọi lập trình viên cần biết: Mảng, Danh sách liên kết, Ngăn xếp, Hàng đợi, Cây và Đồ thị.',
    date: '2024-01-15',
    readTime: '15 min',
    category: 'Data Structures',
    tags: ['DSA', 'Fundamentals', 'Interview Prep'],
    featured: true,
    views: 1234,
    icon: 'DS',
  },
  {
    id: 'sorting-algorithms',
    title: 'Sorting Algorithms Comparison',
    titleVn: 'So Sánh Các Thuật Toán Sắp Xếp',
    excerpt: 'Deep dive into sorting algorithms: Bubble, Selection, Insertion, Merge, Quick, and Heap sort with complexity analysis.',
    excerptVn: 'Phân tích sâu các thuật toán sắp xếp: Bubble, Selection, Insertion, Merge, Quick, và Heap sort với phân tích độ phức tạp.',
    date: '2024-01-10',
    readTime: '12 min',
    category: 'Algorithms',
    tags: ['Sorting', 'Time Complexity', 'Interview Prep'],
    views: 892,
    icon: 'AL',
  },
  {
    id: 'react-best-practices',
    title: 'React Best Practices 2024',
    titleVn: 'Best Practices React 2024',
    excerpt: 'Modern React patterns: hooks, custom hooks, state management, performance optimization, and component design.',
    excerptVn: 'Patterns React hiện đại: hooks, custom hooks, quản lý state, tối ưu hiệu năng, và thiết kế component.',
    date: '2024-01-05',
    readTime: '10 min',
    category: 'Web Development',
    tags: ['React', 'Frontend', 'JavaScript'],
    featured: true,
    views: 2156,
    icon: 'RC',
  },
  {
    id: 'sql-optimization',
    title: 'SQL Query Optimization',
    titleVn: 'Tối Ưu Truy Vấn SQL',
    excerpt: 'Learn how to write efficient SQL queries, use indexes properly, and understand query execution plans.',
    excerptVn: 'Học cách viết truy vấn SQL hiệu quả, sử dụng index đúng cách, và hiểu execution plans.',
    date: '2024-01-01',
    readTime: '8 min',
    category: 'Database',
    tags: ['SQL', 'Performance', 'Database'],
    views: 567,
    icon: 'DB',
  },
  {
    id: 'cnn-introduction',
    title: 'Introduction to CNN',
    titleVn: 'Giới Thiệu CNN',
    excerpt: 'Understanding Convolutional Neural Networks: architecture, convolution operations, pooling, and applications.',
    excerptVn: 'Hiểu về Mạng Neural Tích Chập: kiến trúc, phép tích chập, pooling, và các ứng dụng.',
    date: '2023-12-20',
    readTime: '20 min',
    category: 'Machine Learning',
    tags: ['CNN', 'Deep Learning', 'AI'],
    featured: true,
    views: 1890,
    icon: 'ML',
  },
  {
    id: 'rest-api-design',
    title: 'RESTful API Design Guide',
    titleVn: 'Hướng Dẫn Thiết Kế RESTful API',
    excerpt: 'Best practices for designing RESTful APIs: naming conventions, HTTP methods, status codes, and versioning.',
    excerptVn: 'Best practices thiết kế RESTful API: quy ước đặt tên, HTTP methods, status codes, và versioning.',
    date: '2023-12-15',
    readTime: '10 min',
    category: 'Web Development',
    tags: ['API', 'Backend', 'REST'],
    views: 743,
    icon: 'AP',
  },
  {
    id: 'git-workflow',
    title: 'Git Workflow for Teams',
    titleVn: 'Git Workflow Cho Nhóm',
    excerpt: 'Effective Git workflows: branching strategies, commit conventions, pull requests, and code review best practices.',
    excerptVn: 'Git workflow hiệu quả: chiến lược branching, quy ước commit, pull requests, và best practices code review.',
    date: '2023-12-10',
    readTime: '8 min',
    category: 'Tools',
    tags: ['Git', 'Collaboration', 'DevOps'],
    views: 456,
    icon: 'GT',
  },
  {
    id: 'oop-principles',
    title: 'OOP Principles Explained',
    titleVn: 'Giải Thích Các Nguyên Lý OOP',
    excerpt: 'Understanding SOLID principles, encapsulation, inheritance, polymorphism, and abstraction with practical examples.',
    excerptVn: 'Hiểu các nguyên lý SOLID, đóng gói, kế thừa, đa hình, và trừu tượng với ví dụ thực tế.',
    date: '2023-12-05',
    readTime: '15 min',
    category: 'Programming',
    tags: ['OOP', 'SOLID', 'Design Patterns'],
    views: 678,
    icon: 'OO',
  },
];

const categories = ['All', 'Data Structures', 'Algorithms', 'Web Development', 'Database', 'Machine Learning', 'Tools', 'Programming'];

function BlogContent() {
  const { theme, language } = useTheme();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
      const matchesSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const featuredPosts = useMemo(() => blogPosts.filter(p => p.featured), []);
  const totalViews = useMemo(() => blogPosts.reduce((acc, p) => acc + (p.views || 0), 0), []);

  return (
    <div className={`min-h-screen py-8 px-4 relative overflow-hidden ${theme === 'dark' ? 'hex-pattern' : ''}`}>
      {/* Background decorations */}
      {theme === 'dark' && (
        <>
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </>
      )}

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link 
            to="/" 
            className={`inline-flex items-center gap-2 text-sm mb-6 group ${theme === 'dark' ? 'text-accent hover:text-primary' : 'hover:text-muted-foreground'}`}
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            {t(language, 'Back to Home', 'Quay Lại Trang Chủ')}
          </Link>
          
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <motion.div 
                className="flex items-center gap-3 mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className={`p-2 border-2 border-foreground ${theme === 'dark' ? 'bg-accent/10' : 'bg-muted'}`}>
                  <BookOpen size={24} className={theme === 'dark' ? 'text-accent' : ''} />
                </div>
                <span className="text-xs font-mono text-muted-foreground">// KNOWLEDGE_BASE</span>
              </motion.div>
              <motion.h1 
                className={`text-4xl md:text-6xl font-sans font-black ${theme === 'dark' ? 'neon-text' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {t(language, 'KNOWLEDGE BASE', 'KHO KIẾN THỨC')}
              </motion.h1>
              <motion.p 
                className="text-sm max-w-xl mt-2 text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {t(language,
                  'Technical notes, tutorials, and learnings organized by topic for easy reference.',
                  'Ghi chú kỹ thuật, hướng dẫn và kiến thức được tổ chức theo chủ đề để dễ tra cứu.'
                )}
              </motion.p>
            </div>

            {/* Stats */}
            <motion.div 
              className="flex gap-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {[
                { value: blogPosts.length, label: t(language, 'Articles', 'Bài Viết'), icon: BookOpen },
                { value: featuredPosts.length, label: t(language, 'Featured', 'Nổi Bật'), icon: Sparkles },
                { value: `${(totalViews / 1000).toFixed(1)}k`, label: t(language, 'Views', 'Lượt Xem'), icon: Eye },
              ].map((stat, i) => (
                <div key={i} className={`text-center p-3 border border-foreground/20 ${theme === 'dark' ? 'bg-background/50' : ''}`}>
                  <stat.icon size={14} className={`mx-auto mb-1 ${theme === 'dark' ? 'text-accent' : ''}`} />
                  <div className={`text-xl font-black ${theme === 'dark' ? 'text-accent' : ''}`}>{stat.value}</div>
                  <div className="text-[9px] text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Search & Filter Bar */}
        <motion.div 
          className={`p-4 border-2 border-foreground mb-6 ${theme === 'dark' ? 'glow-border bg-background/80 backdrop-blur-sm' : 'bg-background'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder={t(language, 'Search articles...', 'Tìm kiếm bài viết...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 text-sm border-2 border-foreground/30 bg-transparent focus:outline-none transition-all ${
                  theme === 'dark' ? 'focus:border-accent focus:shadow-[0_0_15px_hsl(var(--neon-cyan)/0.3)]' : 'focus:border-foreground'
                }`}
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <FolderOpen size={14} className="text-muted-foreground" />
              <div className="flex gap-1 flex-wrap">
                {categories.slice(0, 5).map((cat) => (
                  <motion.button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 text-[10px] font-bold border-2 transition-all ${
                      activeCategory === cat
                        ? theme === 'dark' 
                          ? 'border-accent text-accent bg-accent/10' 
                          : 'border-foreground bg-foreground text-background'
                        : 'border-foreground/30 hover:border-foreground'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {cat}
                  </motion.button>
                ))}
                <details className="relative group">
                  <summary className={`px-3 py-1.5 text-[10px] font-bold border-2 border-foreground/30 cursor-pointer list-none hover:border-foreground`}>
                    {t(language, 'More...', 'Thêm...')}
                  </summary>
                  <div className={`absolute top-full left-0 mt-1 p-2 border-2 border-foreground bg-background z-10 flex flex-col gap-1 min-w-[120px]`}>
                    {categories.slice(5).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-2 py-1 text-[10px] text-left hover:bg-foreground/10 ${
                          activeCategory === cat ? (theme === 'dark' ? 'text-accent' : 'font-bold') : ''
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </details>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Featured Section */}
        {activeCategory === 'All' && searchQuery === '' && (
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={16} className={theme === 'dark' ? 'text-accent' : ''} />
              <h2 className="text-sm font-bold uppercase tracking-wider">{t(language, 'Featured Articles', 'Bài Viết Nổi Bật')}</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {featuredPosts.map((post, i) => (
                <motion.article
                  key={post.id}
                  className={`group p-5 border-2 border-foreground relative overflow-hidden ${
                    theme === 'dark' ? 'glow-border bg-gradient-to-br from-primary/5 to-accent/5' : 'bg-muted/30'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <span className={`absolute top-3 right-3 text-2xl font-black opacity-20 ${theme === 'dark' ? 'text-accent' : ''}`}>{post.icon}</span>
                  <div className={`text-[10px] px-2 py-0.5 inline-block border mb-2 ${theme === 'dark' ? 'border-accent text-accent' : 'border-foreground'}`}>
                    {post.category}
                  </div>
                  <h3 className={`font-bold text-lg mb-2 group-hover:translate-x-1 transition-transform ${theme === 'dark' ? 'group-hover:text-accent' : ''}`}>
                    <Link to={`/blog/${post.id}`}>{t(language, post.title, post.titleVn)}</Link>
                  </h3>
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
                    <span className="flex items-center gap-1"><Eye size={10} /> {post.views}</span>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        )}

        {/* Results count */}
        <motion.div 
          className="mb-4 text-xs text-muted-foreground flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span>{t(language, `Showing ${filteredPosts.length} articles`, `Hiển thị ${filteredPosts.length} bài viết`)}</span>
        </motion.div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, i) => (
              <motion.article
                key={post.id}
                layout
                className={`group border-2 border-foreground p-5 flex flex-col relative overflow-hidden ${
                  theme === 'dark' ? 'glow-border bg-background/80 backdrop-blur-sm' : 'bg-background'
                }`}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{ delay: i * 0.03 }}
                onMouseEnter={() => setHoveredPost(post.id)}
                onMouseLeave={() => setHoveredPost(null)}
              >
                {/* Background icon */}
                <motion.span 
                  className={`absolute -right-2 -top-2 text-4xl font-black opacity-10 transition-all duration-300 ${
                    hoveredPost === post.id ? 'opacity-20 scale-110' : ''
                  } ${theme === 'dark' ? 'text-accent' : ''}`}
                >
                  {post.icon}
                </motion.span>

                {/* Header */}
                <div className="flex justify-between items-start mb-3 relative">
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] px-2 py-1 border-2 font-bold ${theme === 'dark' ? 'border-primary text-primary' : 'border-foreground/50'}`}>
                      {post.category}
                    </span>
                    {post.featured && (
                      <Sparkles size={12} className={theme === 'dark' ? 'text-accent' : 'text-amber-500'} />
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Clock size={10} /> {post.readTime}
                  </div>
                </div>

                {/* Title */}
                <h2 className={`font-sans font-bold text-lg mb-2 group-hover:translate-x-1 transition-transform ${
                  theme === 'dark' ? 'group-hover:text-accent' : ''
                }`}>
                  <Link to={`/blog/${post.id}`} className="hover:underline flex items-center gap-1">
                    {t(language, post.title, post.titleVn)}
                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </h2>

                {/* Excerpt */}
                <p className="text-xs leading-relaxed mb-4 flex-1 text-muted-foreground">
                  {t(language, post.excerpt, post.excerptVn)}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      className={`text-[8px] px-2 py-1 flex items-center gap-1 border border-foreground/20 transition-all ${
                        theme === 'dark' ? 'hover:border-accent hover:text-accent' : 'hover:bg-muted'
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Tag size={8} /> {tag}
                    </motion.span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center pt-3 border-t border-foreground/20 text-[10px]">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar size={10} /> {post.date}</span>
                    {post.views && <span className="flex items-center gap-1"><Eye size={10} /> {post.views}</span>}
                  </div>
                  <Link 
                    to={`/blog/${post.id}`}
                    className={`font-bold hover:underline flex items-center gap-1 ${theme === 'dark' ? 'text-accent' : ''}`}
                  >
                    {t(language, 'Read', 'Đọc')} →
                  </Link>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-4xl mb-4">📚</div>
            <p className="text-muted-foreground mb-4">
              {t(language, 'No articles found matching your criteria.', 'Không tìm thấy bài viết phù hợp.')}
            </p>
            <button
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className={`text-sm underline ${theme === 'dark' ? 'text-accent' : ''}`}
            >
              {t(language, 'Clear filters', 'Xóa bộ lọc')}
            </button>
          </motion.div>
        )}

        {/* Coming Soon Note */}
        <motion.div 
          className={`mt-12 p-6 border-2 border-dashed border-foreground/30 text-center ${theme === 'dark' ? 'bg-primary/5' : 'bg-muted/50'}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="flex items-center justify-center gap-2 text-lg font-bold mb-2"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Plus size={20} className={theme === 'dark' ? 'text-accent' : ''} /> 
            {t(language, 'More content coming soon!', 'Thêm nội dung sắp ra mắt!')}
          </motion.div>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            {t(language,
              'This knowledge base is continuously updated with new learning materials and technical notes. Stay tuned!',
              'Kho kiến thức này được cập nhật liên tục với tài liệu học tập và ghi chú kỹ thuật mới. Hãy theo dõi!'
            )}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function Blog() {
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
}
