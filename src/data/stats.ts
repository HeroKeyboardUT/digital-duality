import type { Stat } from "@/types";

// ============================================
// Statistics & Metrics
// ============================================

// Hero section stats (current student stats)
export const heroStats: Stat[] = [
  { label: "Projects", labelVn: "Dự Án", value: "7+" },
  { label: "GPA", labelVn: "GPA", value: "3.5" },
  { label: "School Year", labelVn: "Năm Học", value: "Y3" },
  { label: "Major", labelVn: "Chuyên Ngành", value: "CS" },
];

// CV page stats
export const cvStats: Stat[] = [
  {
    label: "Projects Completed",
    labelVn: "Dự Án Hoàn Thành",
    value: "7+",
    icon: "FolderOpen",
  },
  {
    label: "Technologies Used",
    labelVn: "Công Nghệ Sử Dụng",
    value: "15+",
    icon: "Code",
  },
  {
    label: "GitHub Commits",
    labelVn: "GitHub Commits",
    value: "100+",
    icon: "GitCommit",
  },
  { label: "GPA", labelVn: "GPA", value: "3.5/4.0", icon: "Award" },
];
