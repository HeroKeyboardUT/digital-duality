import type { NavLink, SocialLink, ContactInfo, Experience } from '@/types';

export const navLinks: NavLink[] = [
  { href: '/', label: 'Home', labelVn: 'Trang Chủ' },
  { href: '/cv', label: 'CV', labelVn: 'CV' },
  { href: '/projects', label: 'Projects', labelVn: 'Dự Án' },
  { href: '/blog', label: 'Blog', labelVn: 'Blog' },
];

export const socialLinks: SocialLink[] = [
  { icon: 'Github', href: 'https://github.com/HeroKeyboardUT', label: 'GitHub' },
  { icon: 'Linkedin', href: 'https://www.linkedin.com/in/phamquanghieuutcs/', label: 'LinkedIn' },
  { icon: 'Phone', href: 'tel:0397961039', label: 'Phone' },
  { icon: 'Mail', href: 'mailto:phamquanghieulop95@gmail.com', label: 'Email' },
];

export const contactInfo: ContactInfo = {
  email: 'phamquanghieulop95@gmail.com',
  phone: '0397961039',
  location: 'Bien Hoa City, Vietnam',
  university: 'HCMUT - Bach Khoa',
};

export const experiences: Experience[] = [
  {
    title: 'Computer Science Student',
    titleVn: 'Sinh Viên KHMT',
    company: 'HCMUT - Bach Khoa',
    period: '2023 - Present',
    description: 'Studying Computer Science with focus on Software Engineering, AI/ML, and System Design.',
    descriptionVn: 'Học Khoa học Máy tính với trọng tâm Kỹ thuật Phần mềm, AI/ML, và Thiết kế Hệ thống.',
  },
];
