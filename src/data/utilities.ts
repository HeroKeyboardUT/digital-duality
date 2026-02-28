import { GraduationCap, Film } from "lucide-react";
import type { ElementType } from "react";

export type UtilityTag = "DATA" | "STREAM" | "TOOL" | "AI" | "LIVE";

export interface UtilityItem {
  id: string;
  title: string;
  titleVn: string;
  description: string;
  descriptionVn: string;
  longDescription: string;
  longDescriptionVn: string;
  icon: ElementType;
  /** Internal route — use <Link> */
  href?: string;
  /** External URL — opens in new tab */
  externalUrl?: string;
  tag: UtilityTag;
  /** Feature bullet points */
  features: string[];
  featuresVn: string[];
  /** Highlight stats shown on the card */
  stats?: { label: string; labelVn: string; value: string }[];
  /** Whether this is a live/external app */
  isExternal?: boolean;
}

export const utilities: UtilityItem[] = [
  {
    id: "hcmut-internship",
    title: "CSE – HCMUT Internship Tracker",
    titleVn: "Theo Dõi Thực Tập CSE – HCMUT",
    description:
      "Real-time dashboard tracking internship slot availability and student placement for HCMUT CSE & CE programs (HK243).",
    descriptionVn:
      "Dashboard thời gian thực theo dõi slot thực tập và phân bổ sinh viên CSE & CE HCMUT (HK243).",
    longDescription:
      "A Bloomberg-style multi-pane command center for monitoring HCMUT CSE internship data. Features arc gauges, top-company bar charts, slot distribution, fill-rate analytics, and per-company detail drill-down.",
    longDescriptionVn:
      "Dashboard kiểu Bloomberg đa khung theo dõi dữ liệu thực tập HCMUT CSE. Bao gồm arc gauge, biểu đồ top công ty, phân bổ slot, phân tích fill rate và chi tiết từng công ty.",
    icon: GraduationCap,
    href: "/utility/hcmut-internship",
    tag: "DATA",
    stats: [
      { label: "Companies", labelVn: "Công Ty", value: "70+" },
      { label: "Data Points", labelVn: "Dữ Liệu", value: "Live" },
      { label: "Pane Views", labelVn: "Khung Xem", value: "3" },
    ],
    features: [
      "Bloomberg-style 3-pane layout",
      "Arc gauges & fill rate analytics",
      "Per-company detail drill-down",
      "Real-time live clock & ticker",
    ],
    featuresVn: [
      "Layout 3 khung kiểu Bloomberg",
      "Arc gauge & phân tích fill rate",
      "Chi tiết từng công ty",
      "Đồng hồ thời gian thực & ticker",
    ],
  },
  {
    id: "ophim-stream",
    title: "OPhim — Movie Streaming",
    titleVn: "OPhim — Xem Phim Trực Tuyến",
    description:
      "Full-featured movie streaming portal with search, categories, HD quality playback, and a vast library of Vietnamese & international films.",
    descriptionVn:
      "Cổng xem phim đầy đủ tính năng với tìm kiếm, phân loại, phát HD và kho phim Việt & quốc tế phong phú.",
    longDescription:
      "A self-built movie streaming platform deployed on Vercel. Offers smooth HD playback, intuitive search, genre browsing, and a curated catalogue of Vietnamese and international titles — no account required.",
    longDescriptionVn:
      "Nền tảng xem phim tự xây dựng, deploy trên Vercel. Phát HD mượt, tìm kiếm trực quan, duyệt theo thể loại, kho phim Việt & quốc tế — không cần đăng nhập.",
    icon: Film,
    externalUrl: "https://ophim-stream.vercel.app/",
    tag: "STREAM",
    isExternal: true,
    stats: [
      { label: "Quality", labelVn: "Chất Lượng", value: "HD" },
      { label: "Library", labelVn: "Kho Phim", value: "1000+" },
      { label: "Hosted", labelVn: "Nền Tảng", value: "Vercel" },
    ],
    features: [
      "HD streaming, no login needed",
      "Vietnamese & international titles",
      "Genre & category browsing",
      "Fast Vercel edge delivery",
    ],
    featuresVn: [
      "Phát HD, không cần đăng nhập",
      "Phim Việt & quốc tế",
      "Duyệt theo thể loại",
      "Vercel edge delivery nhanh",
    ],
  },
];
