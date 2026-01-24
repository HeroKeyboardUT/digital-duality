import type { Project, FeaturedProject } from "@/types";

export const projects: Project[] = [
  {
    id: "rl-playground",
    title: "RL Grid World Playground",
    titleVn: "Sân Chơi RL Grid World",
    topic: "Reinforcement Learning, Q-Learning, SARSA, Interactive Demo",
    topicVn: "Học Tăng Cường, Q-Learning, SARSA, Demo Tương Tác",
    description:
      "Interactive RL playground with multiple algorithms (Q-Learning, SARSA, Expected SARSA, Monte Carlo), customizable environment, and real-time visualizations.",
    descriptionVn:
      "Sân chơi RL tương tác với nhiều thuật toán, môi trường tùy chỉnh, và trực quan hóa thời gian thực.",
    tech: ["React", "TypeScript", "Reinforcement Learning"],
    category: "AI/ML",
    featured: true,
    hasDemo: true,
    icon: "RL",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
    links: { live: "/rl-playground" },
  },
  {
    id: "emotion-detection",
    title: "Emotion Detection AI",
    titleVn: "AI Nhận Diện Cảm Xúc",
    topic: "AI, Deep Learning, CNN, Computer Vision",
    topicVn: "AI, Deep Learning, CNN, Thị Giác Máy Tính",
    description:
      "Human emotion detection using deep learning and Convolutional Neural Networks. Demonstrates AI concepts and practical implementation.",
    descriptionVn:
      "Nhận diện cảm xúc con người bằng deep learning và CNN. Thể hiện kiến thức AI và triển khai thực tế.",
    tech: ["Python", "TensorFlow", "CNN", "OpenCV"],
    category: "AI/ML",
    featured: true,
    icon: "AI",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    links: {
      github: "https://github.com/TechWizGroup/Emotion_detection/tree/Hieu",
      pdf: "https://herokeyboardut.github.io/CSPortfolio/image/Emotional_detection.pdf",
    },
  },
  {
    id: "cinema-management",
    title: "Cinema Management System",
    titleVn: "Hệ Thống Quản Lý Rạp Chiếu Phim",
    topic: "Fullstack, Booking System, Real-time Dashboard",
    topicVn: "Fullstack, Hệ Thống Đặt Vé, Dashboard Thời Gian Thực",
    description:
      "Fullstack web app for cinema operations: booking, administration, and real-time dashboards. One of my most complex projects.",
    descriptionVn:
      "Ứng dụng web fullstack quản lý rạp phim: đặt vé, quản trị, dashboard thời gian thực. Một trong những dự án phức tạp nhất.",
    tech: ["ReactJS", "NodeJS", "ExpressJS", "TailwindCSS", "MySQL"],
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=300&fit=crop",
    category: "Fullstack",
    featured: true,
    icon: "CM",
    links: {
      github: "https://github.com/HeroKeyboardUT/cine-verse-ticket-hub",
    },
  },
  {
    id: "chat-app",
    title: "Chat App - Social App",
    titleVn: "Ứng Dụng Chat - Mạng Xã Hội",
    topic: "Fullstack, Real-time Chat, Video Call",
    topicVn: "Fullstack, Chat Thời Gian Thực, Video Call",
    description:
      "Fullstack social web app with real-time messaging, video calls, friend management, and customizable theme colors.",
    descriptionVn:
      "Ứng dụng mạng xã hội fullstack với chat thời gian thực, video call, quản lý bạn bè, và tùy chỉnh giao diện.",
    tech: ["ReactJS", "ExpressJS", "MongoDB", "Socket.io", "WebRTC"],
    category: "Fullstack",
    featured: true,
    icon: "CH",
    image: "/public/images/projects/stock.png",
    links: { github: "https://github.com/HeroKeyboardUT/chatapp" },
  },
  {
    id: "internship-crawler",
    title: "HCMUT CSE Internship Crawler",
    titleVn: "Crawler Thực Tập CSE HCMUT",
    topic: "Data Crawling, Web Scraping, Useful Tool",
    topicVn: "Thu Thập Dữ Liệu, Web Scraping, Công Cụ Hữu Ích",
    description:
      "Data crawling tool with ReactJS frontend and NodeJS backend. Features data processing and nice display after crawling.",
    descriptionVn:
      "Công cụ thu thập dữ liệu với frontend ReactJS và backend NodeJS. Có xử lý và hiển thị dữ liệu sau khi crawl.",
    tech: ["ReactJS", "NodeJS", "TailwindCSS", "Cheerio"],
    category: "Tools",
    featured: true,
    icon: "CR",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
    links: {
      github: "https://github.com/HeroKeyboardUT/HCMUT-CSE-Internship-Crawler",
    },
  },
  {
    id: "tsp-solver",
    title: "Traveling Salesman Solver",
    titleVn: "Giải Bài Toán Người Bán Hàng",
    topic: "Discrete Structure, Graph, Branch and Bound",
    topicVn: "Cấu Trúc Rời Rạc, Đồ Thị, Nhánh Cận",
    description:
      "Finding the shortest path to visit all cities using Branch and Bound algorithm. Guaranteed optimal solution but high time complexity for large input (>20 cities).",
    descriptionVn:
      "Tìm đường đi ngắn nhất qua tất cả thành phố bằng thuật toán Nhánh Cận. Đảm bảo tối ưu nhưng độ phức tạp cao với đầu vào lớn (>20 thành phố).",
    tech: ["C++", "JavaScript", "HTML", "CSS"],
    category: "Algorithms",
    featured: true,
    icon: "TS",
    links: {
      live: "https://herokeyboardut.github.io/CSPortfolio/TSP/index.html",
    },
  },
  {
    id: "cutting-stock",
    title: "Cutting Stock Problem",
    titleVn: "Bài Toán Cắt Vật Liệu",
    topic: "Math Modelling, Integer Linear Programming, Optimization",
    topicVn: "Mô Hình Toán, Quy Hoạch Tuyến Tính, Tối Ưu",
    description:
      "Cutting stock into pieces to minimize waste using First Fit Decreasing algorithm. Suitable for large input with low time complexity.",
    descriptionVn:
      "Cắt vật liệu thành các mảnh để giảm thiểu lãng phí bằng thuật toán First Fit Decreasing.",
    tech: ["JavaScript", "Python", "HTML", "CSS"],
    category: "Algorithms",
    icon: "CS",
    image: "/public/images/projects/stock.png",
    links: {
      live: "https://herokeyboardut.github.io/CSPortfolio/CuttingStock/index.html",
    },
  },
  {
    id: "quiz-app",
    title: "Quiz App",
    titleVn: "Ứng Dụng Quiz",
    topic: "Side Project, Practice, Quiz, Test",
    topicVn: "Dự Án Phụ, Luyện Tập, Trắc Nghiệm",
    description:
      "Simple quiz app for practicing and testing knowledge with custom questions. Easy to use interface.",
    descriptionVn:
      "Ứng dụng quiz đơn giản để luyện tập và kiểm tra kiến thức với câu hỏi tùy chỉnh.",
    tech: ["JavaScript", "HTML", "CSS"],
    category: "Tools",
    icon: "QA",
    links: {
      live: "https://herokeyboardut.github.io/CSPortfolio/QuizApp/index.html",
    },
  },
];

export const projectCategories = [
  "All",
  ...Array.from(new Set(projects.map((project) => project.category))),
];

export const featuredProjects: FeaturedProject[] = [
  {
    id: "cinema-management",
    name: "Cinema Management System",
    nameVn: "Hệ Thống Quản Lý Rạp Phim",
    tech: ["React", "Node.js", "Express", "MySQL"],
    description:
      "Fullstack web app for cinema operations: booking, administration, and real-time dashboards.",
    descriptionVn:
      "Ứng dụng web fullstack quản lý rạp phim: đặt vé, quản trị, dashboard thời gian thực.",
    icon: "CM",
    color: "primary",
    github: "https://github.com/HeroKeyboardUT/cine-verse-ticket-hub",
  },
  {
    id: "chat-app",
    name: "Real-time Chat App",
    nameVn: "Ứng Dụng Chat Thời Gian Thực",
    tech: ["React", "MongoDB", "WebSocket", "Node.js"],
    description:
      "Fullstack social web app with real-time messaging, video calls, and friend management.",
    descriptionVn:
      "Ứng dụng mạng xã hội fullstack với chat thời gian thực, video call, và quản lý bạn bè.",
    icon: "CH",
    color: "accent",
    github: "https://github.com/HeroKeyboardUT/chatapp",
  },
  {
    id: "emotion-detection",
    name: "Emotion Detection AI",
    nameVn: "AI Nhận Diện Cảm Xúc",
    tech: ["Python", "TensorFlow", "CNN", "OpenCV"],
    description:
      "Human emotion detection using deep learning and Convolutional Neural Networks.",
    descriptionVn: "Nhận diện cảm xúc con người bằng deep learning và CNN.",
    icon: "AI",
    color: "primary",
    github: "https://github.com/TechWizGroup/Emotion_detection/tree/Hieu",
  },
  {
    id: "rl-playground",
    name: "RL Grid World",
    nameVn: "Sân Chơi RL Grid World",
    tech: ["React", "TypeScript", "Framer Motion"],
    description:
      "Interactive RL playground with multiple algorithms and real-time visualizations.",
    descriptionVn:
      "Sân chơi RL tương tác với nhiều thuật toán và trực quan hóa thời gian thực.",
    icon: "RL",
    color: "accent",
    link: "/rl-playground",
  },
];
