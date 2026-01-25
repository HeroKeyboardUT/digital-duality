// ============================================
// Centralized Type Definitions
// ============================================

// ============ Projects ============
export interface Project {
  id: string;
  title: string;
  titleVn: string;
  topic: string;
  topicVn: string;
  description: string;
  descriptionVn: string;
  tech: string[];
  category: string;
  featured?: boolean;
  hasDemo?: boolean;
  icon: string;
  image?: string;
  date?: string;
  content?: string;
  contentVn?: string;
  isInteractive?: boolean;
  links?: {
    github?: string;
    live?: string;
    pdf?: string;
  };
}

export interface FeaturedProject {
  id: string;
  name: string;
  nameVn: string;
  tech: string[];
  description: string;
  descriptionVn: string;
  icon: string;
  color: "primary" | "accent";
  github?: string;
  link?: string;
}

// ============ Blog ============
export interface BlogPost {
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
  views?: number;
  icon: string;
  content: string;
  contentVn: string;
  image?: string;
}

// ============ Navigation ============
export interface NavLink {
  href: string;
  label: string;
  labelVn: string;
}

export interface SocialLink {
  icon: string;
  href: string;
  label?: string;
}

// ============ Profile ============
export interface ProfileInfo {
  name: string;
  nameVn: string;
  title: string;
  titleVn: string;
  university: string;
  universityVn: string;
  bio: string;
  bioVn: string;
  summaryEn: string;
  summaryVn: string;
  schoolYear: string;
  major: string;
  majorVn: string;
  gpa: string;
  avatar?: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  locationVn?: string;
  university: string;
}

export interface QuickInfo {
  label: string;
  labelVn?: string;
  value: string;
  valueVn?: string;
}

// ============ Experience ============
export interface Experience {
  title: string;
  titleVn: string;
  company: string;
  period: string;
  description: string;
  descriptionVn: string;
  type?: "education" | "experience" | "project";
  achievements?: string[];
  achievementsVn?: string[];
}

// ============ Education ============
export interface Education {
  degree: string;
  degreeVn: string;
  school: string;
  schoolVn?: string;
  period: string;
  gpa?: string;
  highlights?: string[];
  highlightsVn?: string[];
}

export interface Coursework {
  name: string;
  nameVn: string;
  grade: string;
  highlight?: boolean;
}

// ============ Skills ============
export interface Skill {
  category: string;
  categoryVn: string;
  desc: string;
  descVn: string;
}

export interface TechCategory {
  category: string;
  categoryVn?: string;
  items: string[];
}

export interface SkillCategory {
  label: string;
  labelVn: string;
  items: string[];
  color?: string;
}

export interface SoftSkill {
  name: string;
  nameVn: string;
}

export interface ProficiencyLevel {
  skill: string;
  skillVn: string;
  level: number; // 0-100
}

// ============ Knowledge Areas ============
export interface KnowledgeArea {
  id: string;
  name: string;
  nameVn: string;
  level: "advanced" | "intermediate" | "learning";
}

// ============ Stats ============
export interface Stat {
  label: string;
  labelVn: string;
  value: string;
  icon?: string;
}

// ============ Sections ============
export interface Section {
  id: string;
  label: string;
  labelVn: string;
  icon?: string;
  description?: string;
  descriptionVn?: string;
}

// ============ Actions ============
export interface FloatingAction {
  icon: string;
  label: string;
  labelVn: string;
  action: string;
}
