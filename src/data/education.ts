import type { Education, Coursework, Experience } from '@/types';

// ============================================
// Education & Academic Information
// ============================================

export const education: Education[] = [
  {
    degree: 'Bachelor of Computer Science',
    degreeVn: 'Cử Nhân Khoa Học Máy Tính',
    school: 'HCMUT - Bach Khoa',
    schoolVn: 'ĐH Bách Khoa TP.HCM',
    period: '2023 - 2027',
    gpa: '3.5/4.0',
    highlights: [
      'Focus on Software Engineering, AI/ML, and System Design',
      "Dean's List",
      'Active in CS Club',
    ],
    highlightsVn: [
      'Chuyên sâu Kỹ thuật Phần mềm, AI/ML, và Thiết kế Hệ thống',
      'Danh sách xuất sắc',
      'Hoạt động CLB CNTT',
    ],
  },
];

export const coursework: Coursework[] = [
  { name: 'Data Structures & Algorithms', nameVn: 'CTDL & Thuật Toán', grade: 'A', highlight: true },
  { name: 'Object-Oriented Programming', nameVn: 'Lập Trình Hướng Đối Tượng', grade: 'A', highlight: true },
  { name: 'Database Systems', nameVn: 'Hệ Cơ Sở Dữ Liệu', grade: 'A-', highlight: false },
  { name: 'Operating Systems', nameVn: 'Hệ Điều Hành', grade: 'B+', highlight: false },
  { name: 'Computer Networks', nameVn: 'Mạng Máy Tính', grade: 'A-', highlight: false },
  { name: 'Artificial Intelligence', nameVn: 'Trí Tuệ Nhân Tạo', grade: 'A', highlight: true },
];

export const experiences: Experience[] = [
  {
    title: 'Computer Science Student',
    titleVn: 'Sinh Viên KHMT',
    company: 'HCMUT - Bach Khoa',
    period: '2023 - Present',
    description: 'Studying Computer Science with focus on Software Engineering, AI/ML, and System Design.',
    descriptionVn: 'Học Khoa học Máy tính với trọng tâm Kỹ thuật Phần mềm, AI/ML, và Thiết kế Hệ thống.',
    type: 'education',
    achievements: ['GPA: 3.5/4.0', "Dean's List", 'Active in CS Club'],
    achievementsVn: ['GPA: 3.5/4.0', 'Danh sách xuất sắc', 'Hoạt động CLB CNTT'],
  },
  {
    title: 'Self-taught Developer',
    titleVn: 'Tự Học Lập Trình',
    company: 'Personal Projects',
    period: '2022 - Present',
    description: 'Building full-stack web applications, learning AI/ML, and contributing to open source.',
    descriptionVn: 'Xây dựng ứng dụng web full-stack, học AI/ML, và đóng góp mã nguồn mở.',
    type: 'experience',
    achievements: ['5+ Projects', '100+ Commits', 'React & Node.js'],
    achievementsVn: ['5+ Dự án', '100+ Commits', 'React & Node.js'],
  },
];
