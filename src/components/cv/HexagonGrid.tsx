import { motion } from "framer-motion";
import { useTheme, t } from "@/context/ThemeContext";
import { Link } from "react-router-dom";
import {
  BarChart3,
  Boxes,
  Settings,
  Database,
  Brain,
  Monitor,
} from "lucide-react";

const knowledgeAreas = [
  {
    id: "dsa",
    name: "Data Structures",
    nameVn: "Cấu Trúc Dữ Liệu",
    level: "advanced",
  },
  { id: "oop", name: "OOP", nameVn: "OOP", level: "advanced" },
  {
    id: "os",
    name: "Operating Systems",
    nameVn: "Hệ Điều Hành",
    level: "intermediate",
  },
  {
    id: "db",
    name: "Database Design",
    nameVn: "Thiết Kế CSDL",
    level: "intermediate",
  },
  {
    id: "nn",
    name: "Neural Networks",
    nameVn: "Mạng Neural",
    level: "learning",
  },
  {
    id: "ca",
    name: "Computer Arch",
    nameVn: "Kiến Trúc MT",
    level: "intermediate",
  },
];

const areaIcons = [BarChart3, Boxes, Settings, Database, Brain, Monitor];

const levelColors = {
  advanced: {
    dark: "border-accent bg-accent/20",
    light: "border-foreground bg-foreground/10",
  },
  intermediate: {
    dark: "border-primary bg-primary/10",
    light: "border-foreground/70 bg-muted",
  },
  learning: {
    dark: "border-primary/50 bg-secondary",
    light: "border-foreground/40 bg-secondary",
  },
};

export function HexagonGrid() {
  const { theme, language } = useTheme();

  return (
    <motion.div
      className={`p-5 border-2 
        ${theme === "dark" ? "border-primary/50 bg-card/50 backdrop-blur glow-border" : "border-foreground bg-background"}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div
          className={`w-3 h-3 ${theme === "dark" ? "bg-accent" : "bg-foreground"}`}
        />
        <h2 className="text-sm font-bold uppercase tracking-wider">
          {t(language, "Knowledge Areas", "Lĩnh Vực Kiến Thức")}
        </h2>
      </div>

      {/* Hexagon-style grid */}
      <div className="grid grid-cols-3 gap-3">
        {knowledgeAreas.map((area, idx) => (
          <motion.div
            key={area.id}
            className={`relative p-4 border-2 text-center cursor-pointer group
              ${
                theme === "dark"
                  ? levelColors[area.level as keyof typeof levelColors].dark
                  : levelColors[area.level as keyof typeof levelColors].light
              }
              transition-all duration-300`}
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{
              scale: 1.05,
              rotate: 2,
              zIndex: 10,
            }}
            style={{
              clipPath:
                "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
            }}
          >
            {/* Glow effect on hover for dark mode */}
            {theme === "dark" && (
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle, hsl(180 100% 50% / 0.2) 0%, transparent 70%)",
                  clipPath:
                    "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                }}
                transition={{ duration: 0.3 }}
              />
            )}

            <motion.div
              className="text-2xl mb-1 flex justify-center"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
            >
              {(() => {
                const Icon = areaIcons[idx];
                return <Icon size={24} />;
              })()}
            </motion.div>
            <span className="text-[10px] font-bold uppercase tracking-tight block">
              {language === "en" ? area.name : area.nameVn}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Level legend */}
      <div className="flex justify-center gap-4 mt-4 text-xs">
        {["advanced", "intermediate", "learning"].map((level) => (
          <div key={level} className="flex items-center gap-1">
            <div
              className={`w-2 h-2 border
              ${
                theme === "dark"
                  ? levelColors[level as keyof typeof levelColors].dark
                  : levelColors[level as keyof typeof levelColors].light
              }`}
            />
            <span className="text-muted-foreground capitalize">{level}</span>
          </div>
        ))}
      </div>

      {/* Link to blog */}
      <Link to="/blog">
        <motion.div
          className={`mt-4 p-2 text-center text-xs border-2 border-dashed
            ${
              theme === "dark"
                ? "border-primary/30 hover:border-primary/60 hover:bg-primary/5"
                : "border-foreground/30 hover:border-foreground hover:bg-muted"
            }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {t(language, "→ Explore Knowledge Base", "→ Khám Phá Kiến Thức")}
        </motion.div>
      </Link>
    </motion.div>
  );
}
