import type { Education, Coursework, Experience } from "@/types";

// ============================================
// Education & Academic Information
// ============================================

export const education: Education[] = [
  {
    degree: "Bachelor of Computer Science",
    degreeVn: "Cử Nhân Khoa Học Máy Tính",
    school: "HCMUT - Bach Khoa",
    schoolVn: "ĐH Bách Khoa TP.HCM",
    period: "2023 - 2027",
    gpa: "3.5/4.0",
    highlights: [
      "Focus on Software Engineering, AI/ML, and System Design",
      "Dean's List",
      "Active in CS Club",
    ],
    highlightsVn: [
      "Chuyên sâu Kỹ thuật Phần mềm, AI/ML, và Thiết kế Hệ thống",
      "Danh sách xuất sắc",
      "Hoạt động CLB CNTT",
    ],
  },
];

export const coursework: Coursework[] = [
  { name: "Học máy", nameVn: "Học máy", grade: "A+ (9.6)", highlight: true },
  {
    name: "Mạng máy tính",
    nameVn: "Mạng máy tính",
    grade: "B (7.9)",
    highlight: true,
  },
  {
    name: "Đồ án Tổng hợp - Hướng Trí tuệ Nhân tạo",
    nameVn: "Đồ án Tổng hợp - Hướng Trí tuệ Nhân tạo",
    grade: "B+ (8.0)",
    highlight: true,
  },
  {
    name: "Nguyên lý Ngôn ngữ Lập trình",
    nameVn: "Nguyên lý Ngôn ngữ Lập trình",
    grade: "A (8.6)",
    highlight: true,
  },
  {
    name: "Công nghệ Phần mềm",
    nameVn: "Công nghệ Phần mềm",
    grade: "A+ (9.5)",
    highlight: true,
  },
  {
    name: "Xác suất và Thống kê",
    nameVn: "Xác suất và Thống kê",
    grade: "A (9.4)",
    highlight: true,
  },
  {
    name: "Kỹ năng Chuyên nghiệp cho Kỹ sư",
    nameVn: "Kỹ năng Chuyên nghiệp cho Kỹ sư",
    grade: "A+ (9.5)",
    highlight: true,
  },
  {
    name: "Mô hình hóa Toán học",
    nameVn: "Mô hình hóa Toán học",
    grade: "B (7.2)",
    highlight: false,
  },
  {
    name: "Kiến trúc Máy tính",
    nameVn: "Kiến trúc Máy tính",
    grade: "B+ (8.1)",
    highlight: true,
  },
  {
    name: "Cấu trúc Dữ liệu và Giải Thuật",
    nameVn: "Cấu trúc Dữ liệu và Giải Thuật",
    grade: "A (8.6)",
    highlight: true,
  },
  {
    name: "Kỹ thuật Lập trình",
    nameVn: "Kỹ thuật Lập trình",
    grade: "B+ (8.2)",
    highlight: true,
  },
  {
    name: "Giải tích 2",
    nameVn: "Giải tích 2",
    grade: "A (9.2)",
    highlight: true,
  },
  {
    name: "Hệ thống số",
    nameVn: "Hệ thống số",
    grade: "B (7.9)",
    highlight: false,
  },
  {
    name: "Nhập môn Điện toán",
    nameVn: "Nhập môn Điện toán",
    grade: "B+ (8.4)",
    highlight: false,
  },
];

export const experiences: Experience[] = [
  {
    title: "Computer Science Student",
    titleVn: "Sinh Viên KHMT",
    company: "HCMUT - Bach Khoa",
    period: "2023 - Present",
    description:
      "Studying Computer Science with focus on Software Engineering, AI/ML, and System Design.",
    descriptionVn:
      "Học Khoa học Máy tính với trọng tâm Kỹ thuật Phần mềm, AI/ML, và Thiết kế Hệ thống.",
    type: "education",
    achievements: ["GPA: 3.5/4.0"],
    achievementsVn: ["GPA: 3.5/4.0"],
  },
];
