import { motion } from "framer-motion";
import { useTheme, t } from "@/context/ThemeContext";
import { BookOpen, Star } from "lucide-react";
import { coursework } from "@/data";

export function CourseworkCard() {
  const { theme, language } = useTheme();

  return (
    <motion.section
      id="cv-coursework"
      className={`p-5 border-2
        ${theme === "dark" ? "border-primary/50 bg-card/50 backdrop-blur glow-border" : "border-foreground bg-background"}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-2 mb-4">
        <BookOpen size={18} className={theme === "dark" ? "text-accent" : ""} />
        <h2 className="text-sm font-bold uppercase tracking-wider">
          {t(language, "Relevant Coursework", "Môn Học Liên Quan")}
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {coursework.map((course, idx) => (
          <motion.div
            key={idx}
            className={`p-2 border relative group
              ${
                course.highlight
                  ? theme === "dark"
                    ? "border-accent/50 bg-accent/5"
                    : "border-foreground bg-muted"
                  : theme === "dark"
                    ? "border-primary/30"
                    : "border-foreground/30"
              }`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ scale: 1.02 }}
          >
            {course.highlight && (
              <Star
                size={10}
                className={`absolute top-1 right-1 ${theme === "dark" ? "text-accent" : "text-foreground"}`}
                fill="currentColor"
              />
            )}
            <div className="text-[10px] font-medium leading-tight mb-1">
              {language === "en" ? course.name : course.nameVn}
            </div>
            <div
              className={`text-[10px] font-bold
              ${
                course.grade.startsWith("A")
                  ? theme === "dark"
                    ? "text-accent"
                    : "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {course.grade}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
