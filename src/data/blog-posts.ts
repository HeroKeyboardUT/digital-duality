import type { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    id: "data-structures-basics",
    title: "Data Structures Fundamentals",
    titleVn: "Cơ Bản Về Cấu Trúc Dữ Liệu",
    excerpt:
      "Essential data structures every developer should know: Arrays, Linked Lists, Stacks, Queues, Trees, and Graphs.",
    excerptVn:
      "Các cấu trúc dữ liệu cơ bản mà mọi lập trình viên cần biết: Mảng, Danh sách liên kết, Ngăn xếp, Hàng đợi, Cây và Đồ thị.",
    date: "2024-01-15",
    readTime: "15 min",
    category: "Data Structures",
    tags: ["DSA", "Fundamentals", "Interview Prep"],
    featured: true,
    icon: "DS",
    content:
      "Overview of arrays, linked lists, stacks, queues, trees, and graphs. Each structure has its own use case and performance characteristics.",
    contentVn:
      "Tổng quan về mảng, danh sách liên kết, ngăn xếp, hàng đợi, cây và đồ thị. Mỗi cấu trúc có ưu nhược điểm và ứng dụng riêng.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
  },
  {
    id: "sorting-algorithms",
    title: "Sorting Algorithms Comparison",
    titleVn: "So Sánh Các Thuật Toán Sắp Xếp",
    excerpt:
      "Deep dive into sorting algorithms: Bubble, Selection, Insertion, Merge, Quick, and Heap sort with complexity analysis.",
    excerptVn:
      "Phân tích sâu các thuật toán sắp xếp: Bubble, Selection, Insertion, Merge, Quick, và Heap sort với phân tích độ phức tạp.",
    date: "2024-01-10",
    readTime: "12 min",
    category: "Algorithms",
    tags: ["Sorting", "Time Complexity", "Interview Prep"],
    icon: "AL",
    content:
      "Compare popular sorting algorithms and their time complexity. Learn when to use each algorithm for best performance.",
    contentVn:
      "So sánh các thuật toán sắp xếp phổ biến và độ phức tạp thời gian. Biết khi nào nên dùng thuật toán nào cho hiệu quả.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
  },
  {
    id: "react-best-practices",
    title: "React Best Practices 2024",
    titleVn: "Best Practices React 2024",
    excerpt:
      "Modern React patterns: hooks, custom hooks, state management, performance optimization, and component design.",
    excerptVn:
      "Patterns React hiện đại: hooks, custom hooks, quản lý state, tối ưu hiệu năng, và thiết kế component.",
    date: "2024-01-05",
    readTime: "10 min",
    category: "Web Development",
    tags: ["React", "Frontend", "JavaScript"],
    featured: true,
    icon: "RC",
    content:
      "Best practices for React in 2024: use hooks, optimize performance, and write clean components.",
    contentVn:
      "Các best practice cho React năm 2024: dùng hooks, tối ưu hiệu năng, viết component sạch.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
  },
  {
    id: "sql-optimization",
    title: "SQL Query Optimization",
    titleVn: "Tối Ưu Truy Vấn SQL",
    excerpt:
      "Learn how to write efficient SQL queries, use indexes properly, and understand query execution plans.",
    excerptVn:
      "Học cách viết truy vấn SQL hiệu quả, sử dụng index đúng cách, và hiểu execution plans.",
    date: "2024-01-01",
    readTime: "8 min",
    category: "Database",
    tags: ["SQL", "Performance", "Database"],
    icon: "DB",
    content:
      "Tips for optimizing SQL queries: use indexes, avoid SELECT *, and analyze execution plans.",
    contentVn:
      "Mẹo tối ưu truy vấn SQL: dùng index, tránh SELECT *, phân tích execution plan.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
  },
  {
    id: "cnn-introduction",
    title: "Introduction to CNN",
    titleVn: "Giới Thiệu CNN",
    excerpt:
      "Understanding Convolutional Neural Networks: architecture, convolution operations, pooling, and applications.",
    excerptVn:
      "Hiểu về Mạng Neural Tích Chập: kiến trúc, phép tích chập, pooling, và các ứng dụng.",
    date: "2023-12-20",
    readTime: "20 min",
    category: "Machine Learning",
    tags: ["CNN", "Deep Learning", "AI"],
    featured: true,
    icon: "ML",
    content:
      "CNNs are powerful for image processing. Learn about convolution, pooling, and real-world applications.",
    contentVn:
      "CNN rất mạnh cho xử lý ảnh. Tìm hiểu về phép tích chập, pooling và ứng dụng thực tế.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
  },
  {
    id: "rest-api-design",
    title: "RESTful API Design Guide",
    titleVn: "Hướng Dẫn Thiết Kế RESTful API",
    excerpt:
      "Best practices for designing RESTful APIs: naming conventions, HTTP methods, status codes, and versioning.",
    excerptVn:
      "Best practices thiết kế RESTful API: quy ước đặt tên, HTTP methods, status codes, và versioning.",
    date: "2023-12-15",
    readTime: "10 min",
    category: "Web Development",
    tags: ["API", "Backend", "REST"],
    icon: "AP",
    content:
      "RESTful API design: use clear naming, proper HTTP methods, and version your API for maintainability.",
    contentVn:
      "Thiết kế RESTful API: đặt tên rõ ràng, dùng đúng HTTP method, version hóa API để dễ bảo trì.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
  },
  {
    id: "git-workflow",
    title: "Git Workflow for Teams",
    titleVn: "Git Workflow Cho Nhóm",
    excerpt:
      "Effective Git workflows: branching strategies, commit conventions, pull requests, and code review best practices.",
    excerptVn:
      "Git workflow hiệu quả: chiến lược branching, quy ước commit, pull requests, và best practices code review.",
    date: "2023-12-10",
    readTime: "8 min",
    category: "Tools",
    tags: ["Git", "Collaboration", "DevOps"],
    icon: "GT",
    content:
      "Team Git workflow: use feature branches, clear commit messages, and review code before merging.",
    contentVn:
      "Workflow Git cho nhóm: dùng branch cho từng tính năng, commit rõ ràng, review code trước khi merge.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
  },
  {
    id: "oop-principles",
    title: "OOP Principles Explained",
    titleVn: "Giải Thích Các Nguyên Lý OOP",
    excerpt:
      "Understanding SOLID principles, encapsulation, inheritance, polymorphism, and abstraction with practical examples.",
    excerptVn:
      "Hiểu các nguyên lý SOLID, đóng gói, kế thừa, đa hình, và trừu tượng với ví dụ thực tế.",
    date: "2023-12-05",
    readTime: "15 min",
    category: "Programming",
    tags: ["OOP", "SOLID", "Design Patterns"],
    icon: "OO",
    content:
      "OOP: master SOLID, encapsulation, inheritance, and polymorphism for better code organization.",
    contentVn:
      "OOP: nắm vững SOLID, đóng gói, kế thừa, đa hình để tổ chức code tốt hơn.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
  },
];

export const blogCategories = [
  "All",
  ...Array.from(new Set(blogPosts.map((post) => post.category))),
];
