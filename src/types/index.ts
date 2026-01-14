// ============================================
// Centralized Type Definitions
// ============================================

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
  links?: {
    github?: string;
    live?: string;
    pdf?: string;
  };
}

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
}

export interface NavLink {
  href: string;
  label: string;
  labelVn: string;
}

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

export interface SocialLink {
  icon: string;
  href: string;
  label?: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  university: string;
}

export interface Experience {
  title: string;
  titleVn: string;
  company: string;
  period: string;
  description: string;
  descriptionVn: string;
}

export interface FeaturedProject {
  id: string;
  name: string;
  nameVn: string;
  tech: string;
  icon: string;
  link?: string;
}

export interface SkillCategory {
  label: string;
  labelVn: string;
  items: string[];
  color?: string;
}
