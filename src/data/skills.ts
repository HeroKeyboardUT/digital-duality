import type { TechCategory, Skill, SkillCategory, SoftSkill, ProficiencyLevel, KnowledgeArea } from '@/types';

// ============================================
// Technical Skills & Knowledge
// ============================================

export const techCategories: TechCategory[] = [
  { category: 'LANGUAGES', categoryVn: 'NGÔN NGỮ', items: ['C++', 'C', 'Python', 'Java', 'JavaScript', 'TypeScript'] },
  { category: 'FRONTEND', categoryVn: 'FRONTEND', items: ['ReactJS', 'TailwindCSS', 'HTML', 'CSS'] },
  { category: 'BACKEND', categoryVn: 'BACKEND', items: ['NodeJS', 'ExpressJS', 'FastAPI'] },
  { category: 'DATABASE', categoryVn: 'CƠ SỞ DỮ LIỆU', items: ['MySQL', 'MongoDB', 'PostgreSQL'] },
  { category: 'TOOLS', categoryVn: 'CÔNG CỤ', items: ['Git', 'Postman', 'Figma', 'Canva', 'LaTeX'] },
  { category: 'AI/ML', categoryVn: 'AI/ML', items: ['TensorFlow', 'CNN', 'Deep Learning'] },
];

export const skillDescriptions: Skill[] = [
  {
    category: 'Programming Languages',
    categoryVn: 'Ngôn Ngữ Lập Trình',
    desc: 'C++, C, Python, Java, HTML, CSS, JavaScript, TypeScript. Foundation in algorithm implementation and problem-solving.',
    descVn: 'C++, C, Python, Java, HTML, CSS, JavaScript, TypeScript. Nền tảng vững về thuật toán và giải quyết vấn đề.',
  },
  {
    category: 'Frameworks & Tools',
    categoryVn: 'Frameworks & Công Cụ',
    desc: 'ReactJS, ExpressJS, NodeJS, TailwindCSS. Familiar with Postman and various UI libraries.',
    descVn: 'ReactJS, ExpressJS, NodeJS, TailwindCSS. Quen thuộc với Postman và nhiều thư viện UI.',
  },
  {
    category: 'Technical Knowledge',
    categoryVn: 'Kiến Thức Kỹ Thuật',
    desc: 'OOP, Data Structures & Algorithms, Operating Systems, Database Design, Computer Architecture, Neural Networks, CNN.',
    descVn: 'OOP, Cấu trúc dữ liệu & Thuật toán, Hệ điều hành, Thiết kế CSDL, Kiến trúc máy tính, Mạng Neural, CNN.',
  },
  {
    category: 'Soft Skills',
    categoryVn: 'Kỹ Năng Mềm',
    desc: 'Teamwork, Time Management, Self-Motivated Learner, Critical Thinking.',
    descVn: 'Làm việc nhóm, Quản lý thời gian, Tự học, Tư duy phản biện.',
  },
];

export const cvSkills: SkillCategory[] = [
  { label: 'Languages', labelVn: 'Ngôn Ngữ', items: ['C++', 'C', 'Python', 'Java', 'JavaScript', 'TypeScript', 'SQL'], color: 'primary' },
  { label: 'Frontend', labelVn: 'Frontend', items: ['React', 'TailwindCSS', 'HTML/CSS', 'Framer Motion'], color: 'accent' },
  { label: 'Backend', labelVn: 'Backend', items: ['Node.js', 'Express.js', 'FastAPI', 'REST APIs'], color: 'primary' },
  { label: 'Database', labelVn: 'Cơ Sở Dữ Liệu', items: ['MySQL', 'MongoDB', 'PostgreSQL'], color: 'accent' },
  { label: 'AI/ML', labelVn: 'AI/ML', items: ['TensorFlow', 'CNN', 'Deep Learning', 'Reinforcement Learning'], color: 'primary' },
  { label: 'Tools', labelVn: 'Công Cụ', items: ['Git', 'Docker', 'Postman', 'Figma', 'LaTeX'], color: 'accent' },
];

export const softSkills: SoftSkill[] = [
  { name: 'Team Collaboration', nameVn: 'Làm Việc Nhóm', icon: '🤝' },
  { name: 'Time Management', nameVn: 'Quản Lý Thời Gian', icon: '⏰' },
  { name: 'Self-Learning', nameVn: 'Tự Học', icon: '📚' },
  { name: 'Critical Thinking', nameVn: 'Tư Duy Phản Biện', icon: '💡' },
  { name: 'Problem Solving', nameVn: 'Giải Quyết Vấn Đề', icon: '🧩' },
  { name: 'Communication', nameVn: 'Giao Tiếp', icon: '💬' },
];

export const proficiencyLevels: ProficiencyLevel[] = [
  { skill: 'Frontend Development', skillVn: 'Phát Triển Frontend', level: 85 },
  { skill: 'Backend Engineering', skillVn: 'Kỹ Thuật Backend', level: 75 },
  { skill: 'Database Design', skillVn: 'Thiết Kế Database', level: 70 },
  { skill: 'AI/Deep Learning', skillVn: 'AI/Deep Learning', level: 60 },
  { skill: 'Problem Solving', skillVn: 'Giải Quyết Vấn Đề', level: 80 },
];

export const knowledgeAreas: KnowledgeArea[] = [
  { id: 'dsa', name: 'Data Structures', nameVn: 'Cấu Trúc Dữ Liệu', icon: '📊', level: 'advanced' },
  { id: 'oop', name: 'OOP', nameVn: 'OOP', icon: '🧱', level: 'advanced' },
  { id: 'os', name: 'Operating Systems', nameVn: 'Hệ Điều Hành', icon: '⚙️', level: 'intermediate' },
  { id: 'db', name: 'Database Design', nameVn: 'Thiết Kế CSDL', icon: '🗃️', level: 'intermediate' },
  { id: 'nn', name: 'Neural Networks', nameVn: 'Mạng Neural', icon: '🧠', level: 'learning' },
  { id: 'ca', name: 'Computer Arch', nameVn: 'Kiến Trúc MT', icon: '🖥️', level: 'intermediate' },
];
