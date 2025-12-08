import { useParams, Link } from 'react-router-dom';
import { ThemeProvider, useTheme, t } from '@/context/ThemeContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Eye, Calendar, Tag } from 'lucide-react';

const blogPostsData = [
  {
    id: 'distributed-systems',
    title: 'Building Scalable Distributed Systems: Lessons from Production',
    titleVn: 'Xây Dựng Hệ Thống Phân Tán Quy Mô: Bài Học Từ Production',
    excerpt: 'Deep dive into architectural decisions and trade-offs.',
    excerptVn: 'Phân tích sâu về các quyết định kiến trúc và đánh đổi.',
    date: '2024-01-15',
    readTime: '12 min',
    views: '15.2K',
    tags: ['Architecture', 'Distributed Systems', 'Performance'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
    content: `
## Introduction

Building distributed systems that handle millions of requests per day is both an art and a science. In this post, I'll share lessons learned from building and maintaining production systems.

## The CAP Theorem in Practice

When designing distributed systems, you must understand the CAP theorem:
- **Consistency**: Every read receives the most recent write
- **Availability**: Every request receives a response
- **Partition Tolerance**: System continues despite network failures

In practice, partition tolerance is non-negotiable, so you're choosing between CP and AP systems.

## Key Architectural Decisions

### 1. Service Decomposition

Breaking down monoliths requires careful consideration:
- Identify bounded contexts
- Define clear API contracts
- Plan for eventual consistency

### 2. Data Management

Each service should own its data. This means:
- No shared databases
- Event-driven synchronization
- CQRS for complex read patterns

### 3. Fault Tolerance

Design for failure:
- Circuit breakers
- Retry with exponential backoff
- Bulkhead pattern

## Monitoring and Observability

You can't manage what you can't measure:
- Distributed tracing (Jaeger, Zipkin)
- Metrics aggregation (Prometheus, Grafana)
- Centralized logging (ELK stack)

## Conclusion

Building distributed systems is challenging but rewarding. Start simple, measure everything, and iterate based on real data.
    `,
    contentVn: `
## Giới Thiệu

Xây dựng hệ thống phân tán xử lý hàng triệu request mỗi ngày vừa là nghệ thuật vừa là khoa học. Trong bài viết này, tôi sẽ chia sẻ các bài học từ việc xây dựng và duy trì hệ thống production.

## Định Lý CAP Trong Thực Tế

Khi thiết kế hệ thống phân tán, bạn phải hiểu định lý CAP:
- **Consistency**: Mỗi đọc nhận được ghi gần nhất
- **Availability**: Mỗi request nhận được phản hồi
- **Partition Tolerance**: Hệ thống tiếp tục hoạt động dù mạng lỗi

Trong thực tế, partition tolerance là bắt buộc, nên bạn đang chọn giữa hệ thống CP và AP.

## Các Quyết Định Kiến Trúc Chính

### 1. Phân Tách Service

Phá vỡ monolith cần xem xét cẩn thận:
- Xác định bounded contexts
- Định nghĩa API contracts rõ ràng
- Lên kế hoạch cho eventual consistency

### 2. Quản Lý Dữ Liệu

Mỗi service nên sở hữu dữ liệu của mình:
- Không chia sẻ database
- Đồng bộ hóa event-driven
- CQRS cho các pattern đọc phức tạp

## Kết Luận

Xây dựng hệ thống phân tán là thách thức nhưng đáng giá. Bắt đầu đơn giản, đo lường mọi thứ, và lặp lại dựa trên dữ liệu thực.
    `,
  },
  {
    id: 'clean-code',
    title: 'The Art of Writing Clean, Maintainable Code',
    titleVn: 'Nghệ Thuật Viết Code Sạch, Dễ Bảo Trì',
    excerpt: 'Practical principles for better code.',
    excerptVn: 'Nguyên tắc thực tiễn để viết code tốt hơn.',
    date: '2024-01-08',
    readTime: '8 min',
    views: '8.5K',
    tags: ['Clean Code', 'Best Practices'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
    content: `
## Why Clean Code Matters

Code is read far more often than it's written. Clean code reduces cognitive load and makes maintenance easier.

## Principles

### 1. Meaningful Names
Variables, functions, and classes should reveal intent.

### 2. Small Functions
Functions should do one thing and do it well.

### 3. DRY - Don't Repeat Yourself
Extract common patterns into reusable abstractions.

### 4. Comments
Good code is self-documenting. Use comments to explain "why", not "what".

## Conclusion

Clean code is an investment that pays dividends over time.
    `,
    contentVn: `
## Tại Sao Code Sạch Quan Trọng

Code được đọc thường xuyên hơn được viết. Code sạch giảm tải nhận thức và làm cho việc bảo trì dễ dàng hơn.

## Nguyên Tắc

### 1. Tên Có Ý Nghĩa
Biến, hàm và lớp nên tiết lộ ý định.

### 2. Hàm Nhỏ
Hàm nên làm một việc và làm tốt.

### 3. DRY - Không Lặp Lại
Trích xuất các pattern chung thành abstraction có thể tái sử dụng.

## Kết Luận

Code sạch là khoản đầu tư mang lại lợi nhuận theo thời gian.
    `,
  },
];

function BlogDetailContent() {
  const { id } = useParams();
  const { theme, language } = useTheme();
  const post = blogPostsData.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link to="/" className="text-primary hover:underline">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Back Link */}
          <Link
            to="/#blog"
            className={`inline-flex items-center gap-2 mb-8 text-base hover:underline ${
              theme === 'dark' ? 'text-primary' : ''
            }`}
          >
            <ArrowLeft size={18} />
            {t(language, 'Back to Blog', 'Quay Lại Blog')}
          </Link>

          {/* Hero Image */}
          <motion.div
            className="relative mb-8 overflow-hidden rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-t from-background via-transparent' : 'bg-gradient-to-t from-white/80 via-transparent'}`} />
          </motion.div>

          {/* Title */}
          <motion.h1
            className={`text-3xl md:text-5xl font-black mb-4 ${theme === 'dark' ? 'neon-text' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {t(language, post.title, post.titleVn)}
          </motion.h1>

          {/* Meta */}
          <motion.div
            className="flex flex-wrap gap-4 mb-8 text-base text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="flex items-center gap-2">
              <Calendar size={18} />
              {post.date}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={18} />
              {post.readTime}
            </span>
            <span className="flex items-center gap-2">
              <Eye size={18} />
              {post.views} views
            </span>
          </motion.div>

          {/* Tags */}
          <motion.div
            className="flex flex-wrap gap-2 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {post.tags.map(tag => (
              <span
                key={tag}
                className={`px-3 py-1 text-sm border ${
                  theme === 'dark' ? 'border-primary/30 bg-primary/10' : 'border-border bg-muted'
                }`}
              >
                #{tag}
              </span>
            ))}
          </motion.div>

          {/* Content */}
          <motion.article
            className="prose prose-lg max-w-none dark:prose-invert"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className={`text-base leading-relaxed space-y-4 ${theme === 'dark' ? 'text-foreground/90' : ''}`}>
              {(t(language, post.content, post.contentVn)).split('\n').map((line, i) => {
                if (line.startsWith('## ')) {
                  return <h2 key={i} className={`text-2xl font-bold mt-8 mb-4 ${theme === 'dark' ? 'text-primary' : ''}`}>{line.replace('## ', '')}</h2>;
                }
                if (line.startsWith('### ')) {
                  return <h3 key={i} className={`text-xl font-bold mt-6 mb-3 ${theme === 'dark' ? 'text-accent' : ''}`}>{line.replace('### ', '')}</h3>;
                }
                if (line.startsWith('- ')) {
                  return <li key={i} className="ml-4">{line.replace('- ', '')}</li>;
                }
                if (line.trim()) {
                  return <p key={i}>{line}</p>;
                }
                return null;
              })}
            </div>
          </motion.article>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function BlogDetail() {
  return (
    <ThemeProvider>
      <BlogDetailContent />
    </ThemeProvider>
  );
}
