import { useParams, Link } from 'react-router-dom';
import { ThemeProvider, useTheme, t } from '@/context/ThemeContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, FileText, Calendar, Tag } from 'lucide-react';

const projectsData = [
  {
    id: 'tsp-solver',
    title: 'Traveling Salesman Solver',
    titleVn: 'Giải Bài Toán Người Bán Hàng',
    topic: 'Discrete Structure, Graph, Branch and Bound',
    topicVn: 'Cấu Trúc Rời Rạc, Đồ Thị, Nhánh Cận',
    description: 'Finding the shortest path to visit all cities using Branch and Bound algorithm.',
    descriptionVn: 'Tìm đường đi ngắn nhất qua tất cả thành phố bằng thuật toán Nhánh Cận.',
    content: `
## Overview

The Traveling Salesman Problem (TSP) is one of the most studied combinatorial optimization problems. Given a list of cities and the distances between each pair of cities, what is the shortest possible route that visits each city exactly once and returns to the origin city?

## Algorithm Used

This project implements the **Branch and Bound** algorithm, which guarantees finding the optimal solution by:

1. **Branching**: Systematically exploring all possible routes
2. **Bounding**: Pruning branches that cannot lead to better solutions
3. **Best-first search**: Prioritizing promising branches

## Key Features

- Interactive visualization of the algorithm
- Step-by-step execution mode
- Performance metrics display
- Support for up to 20 cities (optimal solution guaranteed)

## Technical Implementation

The algorithm uses a priority queue to manage nodes and calculates lower bounds using reduced cost matrices. The time complexity is O(n!) in the worst case, but pruning significantly reduces average-case complexity.
    `,
    contentVn: `
## Tổng Quan

Bài toán Người Bán Hàng (TSP) là một trong những bài toán tối ưu tổ hợp được nghiên cứu nhiều nhất. Cho danh sách các thành phố và khoảng cách giữa mỗi cặp thành phố, tìm đường đi ngắn nhất có thể ghé thăm mỗi thành phố đúng một lần và quay về thành phố gốc.

## Thuật Toán Sử Dụng

Dự án này triển khai thuật toán **Nhánh Cận**, đảm bảo tìm được lời giải tối ưu bằng cách:

1. **Phân nhánh**: Khám phá có hệ thống tất cả các tuyến đường có thể
2. **Giới hạn**: Cắt tỉa các nhánh không thể dẫn đến lời giải tốt hơn
3. **Tìm kiếm ưu tiên tốt nhất**: Ưu tiên các nhánh triển vọng

## Tính Năng Chính

- Trực quan hóa tương tác của thuật toán
- Chế độ thực thi từng bước
- Hiển thị các chỉ số hiệu suất
- Hỗ trợ tối đa 20 thành phố (đảm bảo lời giải tối ưu)
    `,
    tech: ['C++', 'JavaScript', 'HTML', 'CSS'],
    date: '2023-09',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
  },
  {
    id: 'quiz-app',
    title: 'Quiz App',
    titleVn: 'Ứng Dụng Quiz',
    topic: 'Side Project, Practice, Quiz, Test',
    topicVn: 'Dự Án Phụ, Luyện Tập, Trắc Nghiệm',
    description: 'Simple quiz app for practicing and testing knowledge.',
    descriptionVn: 'Ứng dụng quiz đơn giản để luyện tập và kiểm tra kiến thức.',
    content: `
## Overview

A lightweight quiz application designed for self-study and knowledge testing. Users can add custom questions and track their progress over time.

## Features

- Create custom quizzes
- Multiple choice questions
- Score tracking
- Progress statistics
- Local storage persistence
    `,
    contentVn: `
## Tổng Quan

Ứng dụng quiz nhẹ được thiết kế để tự học và kiểm tra kiến thức. Người dùng có thể thêm câu hỏi tùy chỉnh và theo dõi tiến trình theo thời gian.

## Tính Năng

- Tạo quiz tùy chỉnh
- Câu hỏi trắc nghiệm
- Theo dõi điểm số
- Thống kê tiến trình
- Lưu trữ cục bộ
    `,
    tech: ['JavaScript', 'HTML', 'CSS'],
    date: '2023-10',
    image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800&h=400&fit=crop',
  },
  {
    id: 'cutting-stock',
    title: 'Cutting Stock Problem',
    titleVn: 'Bài Toán Cắt Vật Liệu',
    topic: 'Math Modelling, Integer Linear Programming, Optimization',
    topicVn: 'Mô Hình Toán, Quy Hoạch Tuyến Tính, Tối Ưu',
    description: 'Cutting stock optimization using First Fit Decreasing algorithm.',
    descriptionVn: 'Tối ưu cắt vật liệu bằng thuật toán First Fit Decreasing.',
    content: `
## Overview

The Cutting Stock Problem involves cutting standard-size pieces of stock material into pieces of specified sizes while minimizing waste.

## Algorithm

Uses the **First Fit Decreasing (FFD)** heuristic:
1. Sort items by decreasing size
2. For each item, place it in the first bin that fits
3. If no bin fits, open a new bin

This provides near-optimal solutions with O(n log n) complexity.
    `,
    contentVn: `
## Tổng Quan

Bài toán Cắt Vật Liệu liên quan đến việc cắt các mảnh vật liệu kích thước tiêu chuẩn thành các mảnh có kích thước xác định trong khi giảm thiểu lãng phí.

## Thuật Toán

Sử dụng heuristic **First Fit Decreasing (FFD)**:
1. Sắp xếp các mục theo kích thước giảm dần
2. Với mỗi mục, đặt nó vào bin đầu tiên phù hợp
3. Nếu không có bin nào phù hợp, mở bin mới

Điều này cung cấp các lời giải gần tối ưu với độ phức tạp O(n log n).
    `,
    tech: ['JavaScript', 'Python', 'HTML', 'CSS'],
    date: '2023-11',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
  },
  {
    id: 'internship-crawler',
    title: 'HCMUT CSE Internship Crawler',
    titleVn: 'Crawler Thực Tập CSE HCMUT',
    topic: 'Data Crawling, Web Scraping, Useful Tool',
    topicVn: 'Thu Thập Dữ Liệu, Web Scraping, Công Cụ Hữu Ích',
    description: 'Data crawling tool with ReactJS frontend and NodeJS backend.',
    descriptionVn: 'Công cụ thu thập dữ liệu với frontend ReactJS và backend NodeJS.',
    content: `
## Overview

A specialized web crawler designed to collect internship opportunities from various sources relevant to HCMUT CSE students.

## Architecture

- **Frontend**: ReactJS with TailwindCSS
- **Backend**: NodeJS with Express
- **Data Processing**: Custom parsing and filtering

## Features

- Automated data collection
- Clean data presentation
- Export functionality
- Search and filter
    `,
    contentVn: `
## Tổng Quan

Một web crawler chuyên dụng được thiết kế để thu thập cơ hội thực tập từ nhiều nguồn liên quan đến sinh viên CSE HCMUT.

## Kiến Trúc

- **Frontend**: ReactJS với TailwindCSS
- **Backend**: NodeJS với Express
- **Xử Lý Dữ Liệu**: Parsing và filtering tùy chỉnh

## Tính Năng

- Thu thập dữ liệu tự động
- Hiển thị dữ liệu sạch
- Chức năng xuất dữ liệu
- Tìm kiếm và lọc
    `,
    tech: ['ReactJS', 'NodeJS', 'TailwindCSS'],
    date: '2024-01',
    links: { github: 'https://github.com/HeroKeyboardUT/HCMUT-CSE-Internship-Crawler' },
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
  },
  {
    id: 'cinema-management',
    title: 'Cinema Management System',
    titleVn: 'Hệ Thống Quản Lý Rạp Chiếu Phim',
    topic: 'Fullstack, Booking System, Real-time Dashboard',
    topicVn: 'Fullstack, Hệ Thống Đặt Vé, Dashboard Thời Gian Thực',
    description: 'Fullstack web app for cinema operations.',
    descriptionVn: 'Ứng dụng web fullstack quản lý rạp phim.',
    content: `
## Overview

A comprehensive cinema management system handling everything from movie scheduling to ticket booking and real-time analytics.

## Features

- **Movie Management**: Add, edit, and schedule movies
- **Seat Selection**: Interactive seat map with real-time availability
- **Booking System**: Complete ticket booking flow
- **Admin Dashboard**: Real-time sales and occupancy analytics
- **User Accounts**: Registration, login, and booking history

## Technical Stack

Built with modern technologies for scalability and maintainability.
    `,
    contentVn: `
## Tổng Quan

Hệ thống quản lý rạp phim toàn diện xử lý mọi thứ từ lập lịch phim đến đặt vé và phân tích thời gian thực.

## Tính Năng

- **Quản Lý Phim**: Thêm, sửa và lập lịch phim
- **Chọn Ghế**: Bản đồ ghế tương tác với tình trạng thời gian thực
- **Hệ Thống Đặt Vé**: Quy trình đặt vé hoàn chỉnh
- **Dashboard Admin**: Phân tích doanh số và công suất thời gian thực
- **Tài Khoản Người Dùng**: Đăng ký, đăng nhập và lịch sử đặt vé
    `,
    tech: ['ReactJS', 'NodeJS', 'ExpressJS', 'TailwindCSS'],
    date: '2024-02',
    links: { github: 'https://github.com/HeroKeyboardUT/cine-verse-ticket-hub' },
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=400&fit=crop',
  },
  {
    id: 'chat-app',
    title: 'Chat App - Social App',
    titleVn: 'Ứng Dụng Chat - Mạng Xã Hội',
    topic: 'Fullstack, Real-time Chat, Video Call',
    topicVn: 'Fullstack, Chat Thời Gian Thực, Video Call',
    description: 'Fullstack social web app with real-time messaging.',
    descriptionVn: 'Ứng dụng mạng xã hội fullstack với chat thời gian thực.',
    content: `
## Overview

A feature-rich social application focused on real-time communication and language learning.

## Key Features

- **Real-time Messaging**: Instant message delivery with Socket.io
- **Video Calls**: Peer-to-peer video communication
- **Friend Management**: Add, remove, and organize friends
- **Customizable UI**: Theme colors and personalization options
- **Language Learning**: Built-in tools for language exchange

## Architecture

Microservices-ready architecture with separate services for messaging, auth, and media.
    `,
    contentVn: `
## Tổng Quan

Ứng dụng mạng xã hội giàu tính năng tập trung vào giao tiếp thời gian thực và học ngôn ngữ.

## Tính Năng Chính

- **Nhắn Tin Thời Gian Thực**: Gửi tin nhắn tức thì với Socket.io
- **Video Call**: Giao tiếp video peer-to-peer
- **Quản Lý Bạn Bè**: Thêm, xóa và tổ chức bạn bè
- **UI Tùy Chỉnh**: Màu sắc theme và tùy chọn cá nhân hóa
- **Học Ngôn Ngữ**: Công cụ tích hợp cho trao đổi ngôn ngữ
    `,
    tech: ['ReactJS', 'ExpressJS', 'MongoDB', 'TailwindCSS'],
    date: '2024-03',
    links: { github: 'https://github.com/HeroKeyboardUT/chatapp' },
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&h=400&fit=crop',
  },
  {
    id: 'emotion-detection',
    title: 'Emotion Detection AI',
    titleVn: 'AI Nhận Diện Cảm Xúc',
    topic: 'AI, Deep Learning, CNN, Computer Vision',
    topicVn: 'AI, Deep Learning, CNN, Thị Giác Máy Tính',
    description: 'Human emotion detection using deep learning and CNN.',
    descriptionVn: 'Nhận diện cảm xúc con người bằng deep learning và CNN.',
    content: `
## Overview

An AI system that detects human emotions from facial expressions using Convolutional Neural Networks.

## Model Architecture

- **Input Layer**: 48x48 grayscale images
- **Convolutional Layers**: Feature extraction with ReLU activation
- **Pooling Layers**: Dimensionality reduction
- **Dense Layers**: Classification into 7 emotions
- **Output**: Softmax for emotion probabilities

## Emotions Detected

- Happy, Sad, Angry, Surprised, Fear, Disgust, Neutral

## Training

Trained on the FER2013 dataset with data augmentation for better generalization.
    `,
    contentVn: `
## Tổng Quan

Hệ thống AI phát hiện cảm xúc con người từ biểu cảm khuôn mặt sử dụng Mạng Neuron Tích Chập.

## Kiến Trúc Mô Hình

- **Lớp Đầu Vào**: Ảnh grayscale 48x48
- **Lớp Tích Chập**: Trích xuất đặc trưng với kích hoạt ReLU
- **Lớp Pooling**: Giảm chiều
- **Lớp Dense**: Phân loại thành 7 cảm xúc
- **Đầu Ra**: Softmax cho xác suất cảm xúc

## Cảm Xúc Phát Hiện

- Vui, Buồn, Giận, Ngạc Nhiên, Sợ, Ghê Tởm, Trung Tính
    `,
    tech: ['Python', 'TensorFlow', 'CNN'],
    date: '2024-04',
    links: { 
      github: 'https://github.com/TechWizGroup/Emotion_detection/tree/Hieu',
      pdf: './image/Emotional_detection.pdf'
    },
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
  },
  {
    id: 'rl-playground',
    title: 'RL Grid World Playground',
    titleVn: 'Sân Chơi RL Grid World',
    topic: 'Reinforcement Learning, Q-Learning, SARSA, Interactive Demo',
    topicVn: 'Học Tăng Cường, Q-Learning, SARSA, Demo Tương Tác',
    description: 'Interactive reinforcement learning playground with multiple algorithms and visualizations.',
    descriptionVn: 'Sân chơi học tăng cường tương tác với nhiều thuật toán và trực quan hóa.',
    content: `
## Overview

An interactive reinforcement learning playground where you can experiment with different RL algorithms on a customizable grid world environment.

## Algorithms Available

- **Q-Learning**: Off-policy TD learning that learns optimal Q-values
- **SARSA**: On-policy TD learning that learns from actual experience  
- **Expected SARSA**: Uses expected value for lower variance
- **Monte Carlo**: Learns from complete episodes

## Features

- **Interactive Grid**: Click to add goals (💎), traps (☠️), walls (🧱)
- **Real-time Learning**: Watch the agent learn in real-time
- **Q-Table Visualization**: See Q-values for each state-action pair
- **Policy Display**: Visualize the learned policy with arrows
- **Learning Curves**: Track reward progress over episodes
- **Adjustable Parameters**: Learning rate, discount factor, epsilon, etc.

## How It Works

The agent starts at position (0,0) and tries to reach the goal while avoiding traps. It learns through trial and error, updating its Q-table based on received rewards.
    `,
    contentVn: `
## Tổng Quan

Sân chơi học tăng cường tương tác nơi bạn có thể thí nghiệm với các thuật toán RL khác nhau trên môi trường grid world có thể tùy chỉnh.

## Các Thuật Toán

- **Q-Learning**: Học TD ngoài chính sách, học giá trị Q tối ưu
- **SARSA**: Học TD trong chính sách, học từ trải nghiệm thực tế
- **Expected SARSA**: Sử dụng giá trị kỳ vọng để giảm phương sai
- **Monte Carlo**: Học từ các episode hoàn chỉnh

## Tính Năng

- **Grid Tương Tác**: Click để thêm mục tiêu (💎), bẫy (☠️), tường (🧱)
- **Học Thời Gian Thực**: Xem agent học trong thời gian thực
- **Trực Quan Q-Table**: Xem giá trị Q cho mỗi cặp trạng thái-hành động
- **Hiển Thị Chính Sách**: Trực quan hóa chính sách đã học bằng mũi tên
- **Đường Cong Học**: Theo dõi tiến trình phần thưởng qua các episode
- **Tham Số Điều Chỉnh**: Learning rate, discount factor, epsilon, v.v.

## Cách Hoạt Động

Agent bắt đầu tại vị trí (0,0) và cố gắng đến mục tiêu trong khi tránh bẫy. Nó học qua thử và sai, cập nhật Q-table dựa trên phần thưởng nhận được.
    `,
    tech: ['React', 'TypeScript', 'Reinforcement Learning', 'Recharts'],
    date: '2024-12',
    links: { live: '/rl-playground' },
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    isInteractive: true,
  },
];

function ProjectDetailContent() {
  const { id } = useParams();
  const { theme, language } = useTheme();
  const project = projectsData.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
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
            to="/#projects"
            className={`inline-flex items-center gap-2 mb-8 text-base hover:underline ${
              theme === 'dark' ? 'text-primary' : ''
            }`}
          >
            <ArrowLeft size={18} />
            {t(language, 'Back to Projects', 'Quay Lại Dự Án')}
          </Link>

          {/* Hero Image */}
          <motion.div
            className="relative mb-8 overflow-hidden rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-t from-background via-transparent' : 'bg-gradient-to-t from-white/80 via-transparent'}`} />
          </motion.div>

          {/* Title */}
          <motion.h1
            className={`text-4xl md:text-5xl font-black mb-4 ${theme === 'dark' ? 'neon-text' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {t(language, project.title, project.titleVn)}
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
              {project.date}
            </span>
            <span className="flex items-center gap-2">
              <Tag size={18} />
              {t(language, project.topic, project.topicVn)}
            </span>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            className="flex flex-wrap gap-2 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {project.tech.map(tech => (
              <span
                key={tech}
                className={`px-3 py-1 text-sm border ${
                  theme === 'dark' ? 'border-primary/30 bg-primary/10' : 'border-border bg-muted'
                }`}
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* Links */}
          {project.links && (
            <motion.div
              className="flex gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2 border-2 text-base font-bold transition-colors ${
                    theme === 'dark' ? 'border-primary hover:bg-primary/20' : 'border-foreground hover:bg-foreground hover:text-background'
                  }`}
                >
                  <Github size={18} /> GitHub
                </a>
              )}
              {project.links.pdf && (
                <a
                  href={project.links.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2 border-2 text-base font-bold transition-colors ${
                    theme === 'dark' ? 'border-accent hover:bg-accent/20' : 'border-foreground hover:bg-foreground hover:text-background'
                  }`}
                >
                  <FileText size={18} /> Report
                </a>
              )}
            </motion.div>
          )}

          {/* Content */}
          <motion.article
            className="prose prose-lg max-w-none dark:prose-invert"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className={`text-base leading-relaxed space-y-4 ${theme === 'dark' ? 'text-foreground/90' : ''}`}>
              {(t(language, project.content, project.contentVn)).split('\n').map((line, i) => {
                if (line.startsWith('## ')) {
                  return <h2 key={i} className={`text-2xl font-bold mt-8 mb-4 ${theme === 'dark' ? 'text-primary' : ''}`}>{line.replace('## ', '')}</h2>;
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

export default function ProjectDetail() {
  return (
    <ThemeProvider>
      <ProjectDetailContent />
    </ThemeProvider>
  );
}
