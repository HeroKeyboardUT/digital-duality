import { motion } from "framer-motion";
import { useTheme, t } from "@/context/ThemeContext";
import { Code, Zap } from "lucide-react";
import { cvSkills } from "@/data";

export function TechSkillsCard() {
  const { theme, language } = useTheme();

  return (
    <motion.section
      id="cv-skills"
      className={`p-5 border-2
        ${theme === "dark" ? "border-primary/50 bg-card/50 backdrop-blur glow-border" : "border-foreground bg-background"}`}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Code size={18} className={theme === "dark" ? "text-accent" : ""} />
        <h2 className="text-sm font-bold uppercase tracking-wider">
          {t(language, "Technical Skills", "Kỹ Năng Kỹ Thuật")}
        </h2>
      </div>

      {/* Skills categories */}
      <div className="space-y-4">
        {cvSkills.map((category, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className={`w-2 h-2 ${
                  category.color === "primary"
                    ? theme === "dark"
                      ? "bg-primary"
                      : "bg-foreground"
                    : theme === "dark"
                      ? "bg-accent"
                      : "bg-muted-foreground"
                }`}
              />
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {language === "en" ? category.label : category.labelVn}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {category.items.map((skill, skillIdx) => (
                <motion.span
                  key={skillIdx}
                  className={`px-2 py-0.5 text-[10px] border cursor-default
                    ${
                      category.color === "primary"
                        ? theme === "dark"
                          ? "border-primary/50 text-primary hover:bg-primary/20"
                          : "border-foreground/50 hover:bg-foreground hover:text-background"
                        : theme === "dark"
                          ? "border-accent/50 text-accent hover:bg-accent/20"
                          : "border-foreground/30 hover:bg-muted"
                    } transition-colors`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 + skillIdx * 0.02 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Proficiency bars */}
      <div className="mt-6 pt-4 border-t border-foreground/10">
        <div className="flex items-center gap-2 mb-3">
          <Zap size={14} className={theme === "dark" ? "text-accent" : ""} />
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {t(language, "Proficiency", "Thành Thạo")}
          </span>
        </div>
      </div>
    </motion.section>
  );
}
