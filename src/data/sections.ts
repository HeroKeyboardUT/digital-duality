import type { Section, NavLink } from '@/types';

// ============================================
// Navigation & Sections Configuration
// ============================================

// Main navigation links
export const navLinks: NavLink[] = [
  { href: '/', label: 'Home', labelVn: 'Trang Chủ' },
  { href: '/cv', label: 'CV', labelVn: 'CV' },
  { href: '/projects', label: 'Projects', labelVn: 'Dự Án' },
  { href: '/blog', label: 'Blog', labelVn: 'Blog' },
];

// Homepage sections for SectionIndicator
export const homeSections: Section[] = [
  { 
    id: 'hero', 
    label: 'HOME', 
    labelVn: 'TRANG CHỦ',
    icon: 'Terminal',
    description: 'Welcome & Introduction',
    descriptionVn: 'Chào mừng & Giới thiệu'
  },
  { 
    id: 'about', 
    label: 'ABOUT', 
    labelVn: 'GIỚI THIỆU',
    icon: 'User',
    description: 'Biography, Education & Skills',
    descriptionVn: 'Tiểu sử, Học vấn & Kỹ năng'
  },
  { 
    id: 'projects', 
    label: 'PROJECTS', 
    labelVn: 'DỰ ÁN',
    icon: 'FolderOpen',
    description: 'Featured Work & Open Source',
    descriptionVn: 'Dự án tiêu biểu & Mã nguồn mở'
  },
  { 
    id: 'ai-lab', 
    label: 'AI LAB', 
    labelVn: 'PHÒNG THÍ NGHIỆM AI',
    icon: 'Brain',
    description: 'ML Experiments & Tools',
    descriptionVn: 'Thí nghiệm ML & Công cụ'
  },
  { 
    id: 'blog', 
    label: 'BLOG', 
    labelVn: 'BÀI VIẾT',
    icon: 'FileText',
    description: 'Technical Articles & Thoughts',
    descriptionVn: 'Bài viết kỹ thuật & Suy nghĩ'
  },
  { 
    id: 'contact', 
    label: 'CONTACT', 
    labelVn: 'LIÊN HỆ',
    icon: 'Mail',
    description: 'Get in Touch',
    descriptionVn: 'Liên hệ'
  },
];

// CV page sections for CVMinimap
export const cvSections: Section[] = [
  { id: 'cv-header', icon: 'User', label: 'Profile', labelVn: 'Hồ Sơ' },
  { id: 'cv-education', icon: 'GraduationCap', label: 'Education', labelVn: 'Học Vấn' },
  { id: 'cv-skills', icon: 'Code', label: 'Skills', labelVn: 'Kỹ Năng' },
  { id: 'cv-projects', icon: 'FolderOpen', label: 'Projects', labelVn: 'Dự Án' },
  { id: 'cv-experience', icon: 'Briefcase', label: 'Experience', labelVn: 'Kinh Nghiệm' },
  { id: 'cv-knowledge', icon: 'Brain', label: 'Knowledge', labelVn: 'Kiến Thức' },
  { id: 'cv-coursework', icon: 'Book', label: 'Courses', labelVn: 'Môn Học' },
];
