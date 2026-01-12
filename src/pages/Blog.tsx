import { ThemeProvider } from '@/context/ThemeContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CRTOverlay } from '@/components/CRTOverlay';
import { motion } from 'framer-motion';
import { useTheme, t } from '@/context/ThemeContext';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Tag, Search, FolderOpen, Plus } from 'lucide-react';
import { useState } from 'react';

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
  },
];

const categories = ['All', 'Data Structures', 'Algorithms', 'Web Development', 'Database', 'Machine Learning', 'Tools', 'Programming'];

function BlogContent() {
  const { theme, language } = useTheme();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={`min-h-screen py-8 px-4 ${theme === 'dark' ? 'hex-pattern' : ''}`}>
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className={`inline-flex items-center gap-2 text-sm mb-4 hover:underline ${theme === 'dark' ? 'text-accent' : ''}`}
          >
            <ArrowLeft size={16} /> {t(language, 'Back to CV', 'Quay Lại CV')}
          </Link>
          
          <motion.h1 
            className={`text-4xl md:text-5xl font-sans font-black mb-4 ${theme === 'dark' ? 'neon-text' : ''}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t(language, 'KNOWLEDGE BASE', 'KHO KIẾN THỨC')}
          </motion.h1>
          <p className="text-sm max-w-2xl text-muted-foreground">
            {t(language,
              'My personal collection of technical notes, tutorials, and learnings. Organized by topic for easy reference.',
              'Bộ sưu tập ghi chú kỹ thuật, hướng dẫn và kiến thức của tôi. Được tổ chức theo chủ đề để dễ dàng tra cứu.'
            )}
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search */}
          <div className={`relative flex-1 max-w-md`}>
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder={t(language, 'Search posts...', 'Tìm kiếm bài viết...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-3 py-2 text-sm border-2 border-foreground/30 bg-transparent focus:outline-none ${
                theme === 'dark' ? 'focus:border-accent' : 'focus:border-foreground'
              }`}
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <FolderOpen size={14} className="text-muted-foreground" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2 py-1 text-[10px] border transition-all ${
                  activeCategory === cat
                    ? theme === 'dark' 
                      ? 'border-accent text-accent bg-accent/10' 
                      : 'border-foreground bg-foreground text-background'
                    : 'border-foreground/30 hover:border-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-4 mb-6 text-xs text-muted-foreground">
          <span>{filteredPosts.length} {t(language, 'posts', 'bài viết')}</span>
          <span>•</span>
          <span>{categories.length - 1} {t(language, 'categories', 'danh mục')}</span>
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPosts.map((post, i) => (
            <motion.article
              key={post.id}
              className={`border-2 border-foreground p-4 flex flex-col ${theme === 'dark' ? 'glow-border' : ''} ${
                post.featured ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-2">
                <span className={`text-[9px] px-1.5 py-0.5 border ${theme === 'dark' ? 'border-primary text-primary' : 'border-foreground/50'}`}>
                  {post.category}
                </span>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Clock size={10} /> {post.readTime}
                </div>
              </div>

              {/* Title */}
              <h2 className={`font-sans font-bold text-lg mb-2 ${theme === 'dark' ? 'hover:text-accent' : ''} transition-colors`}>
                <Link to={`/blog/${post.id}`} className="hover:underline">
                  {t(language, post.title, post.titleVn)}
                </Link>
              </h2>

              {/* Excerpt */}
              <p className="text-xs leading-relaxed mb-3 flex-1 text-muted-foreground">
                {t(language, post.excerpt, post.excerptVn)}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-[8px] px-1.5 py-0.5 flex items-center gap-0.5 border border-foreground/20 ${
                      theme === 'dark' ? 'hover:border-accent hover:text-accent' : ''
                    }`}
                  >
                    <Tag size={8} /> {tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center pt-2 border-t border-foreground/20 text-[10px]">
                <span className="text-muted-foreground">{post.date}</span>
                <Link 
                  to={`/blog/${post.id}`}
                  className={`font-bold hover:underline ${theme === 'dark' ? 'text-accent' : ''}`}
                >
                  {t(language, 'Read More', 'Đọc Thêm')} →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              {t(language, 'No posts found matching your criteria.', 'Không tìm thấy bài viết phù hợp.')}
            </p>
            <button
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className={`text-sm underline ${theme === 'dark' ? 'text-accent' : ''}`}
            >
              {t(language, 'Clear filters', 'Xóa bộ lọc')}
            </button>
          </div>
        )}

        {/* Add Content Note */}
        <motion.div 
          className={`mt-8 p-4 border-2 border-dashed border-foreground/30 text-center ${theme === 'dark' ? 'bg-primary/5' : 'bg-muted/50'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-center gap-2 text-sm font-bold mb-2">
            <Plus size={16} /> {t(language, 'More content coming soon!', 'Thêm nội dung sắp ra mắt!')}
          </div>
          <p className="text-xs text-muted-foreground">
            {t(language,
              'This knowledge base is continuously updated with new learning materials and technical notes.',
              'Kho kiến thức này được cập nhật liên tục với tài liệu học tập và ghi chú kỹ thuật mới.'
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
