import type { ProfileInfo, ContactInfo, QuickInfo, SocialLink, FloatingAction } from '@/types';

// ============================================
// Profile & Personal Information
// ============================================

export const profileInfo: ProfileInfo = {
  name: 'Pham Quang Hieu',
  nameVn: 'Phạm Quang Hiếu',
  title: 'Computer Science Student',
  titleVn: 'Sinh Viên Khoa Học Máy Tính',
  university: 'HCMUT (Bach Khoa)',
  universityVn: 'ĐH Bách Khoa TP.HCM',
  bio: "I'm a developer currently studying at Ho Chi Minh City University of Technology. I'm interested in Computer Science and I'm looking for an internship to improve my skills and gain more experience.",
  bioVn: 'Tôi là lập trình viên đang học tại Đại học Bách Khoa TP.HCM. Tôi quan tâm đến Khoa học Máy tính và đang tìm kiếm cơ hội thực tập để nâng cao kỹ năng và tích lũy kinh nghiệm.',
  summaryEn: 'Passionate Computer Science student at HCMUT with strong foundation in software development, AI/ML, and problem-solving. Experienced in building full-stack web applications using React, Node.js, and modern technologies. Eager to apply academic knowledge in real-world projects and contribute to innovative teams.',
  summaryVn: 'Sinh viên Khoa học Máy tính đam mê tại HCMUT với nền tảng vững chắc về phát triển phần mềm, AI/ML, và giải quyết vấn đề. Có kinh nghiệm xây dựng ứng dụng web full-stack sử dụng React, Node.js, và các công nghệ hiện đại. Mong muốn áp dụng kiến thức học thuật vào dự án thực tế và đóng góp cho các team sáng tạo.',
  schoolYear: '2023-2027',
  major: 'Computer Science',
  majorVn: 'Khoa Học Máy Tính',
  gpa: '3.5 / 4.0',
};

export const contactInfo: ContactInfo = {
  email: 'phamquanghieulop95@gmail.com',
  phone: '0397961039',
  location: 'Bien Hoa City, Vietnam',
  locationVn: 'TP. Biên Hòa, Việt Nam',
  university: 'HCMUT - Bach Khoa',
};

export const quickInfoItems: QuickInfo[] = [
  { label: 'School Year', value: '2023-2027' },
  { label: 'Major', value: 'Computer Science' },
  { label: 'Address', value: 'Bien Hoa City' },
  { label: 'GPA', value: '3.5 / 4.0' },
];

export const socialLinks: SocialLink[] = [
  { icon: 'Github', href: 'https://github.com/HeroKeyboardUT', label: 'GitHub' },
  { icon: 'Linkedin', href: 'https://www.linkedin.com/in/phamquanghieuutcs/', label: 'LinkedIn' },
  { icon: 'Phone', href: 'tel:0397961039', label: 'Phone' },
  { icon: 'Mail', href: 'mailto:phamquanghieulop95@gmail.com', label: 'Email' },
];

// Floating action buttons for CV page
export const floatingActions: FloatingAction[] = [
  { icon: 'Download', label: 'Download CV', labelVn: 'Tải CV', action: 'download' },
  { icon: 'Mail', label: 'Contact', labelVn: 'Liên Hệ', action: 'contact' },
  { icon: 'Share2', label: 'Share', labelVn: 'Chia Sẻ', action: 'share' },
  { icon: 'Printer', label: 'Print', labelVn: 'In', action: 'print' },
];
