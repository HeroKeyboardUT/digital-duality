import { motion } from "framer-motion";
import { useTheme, t } from "@/context/ThemeContext";
import { Link } from "react-router-dom";
import {
  Github,
  ExternalLink,
  FileText,
  Play,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index: number;
  isHovered: boolean;
  onHover: (id: string | null) => void;
}

export function ProjectCard({
  project,
  index,
  isHovered,
  onHover,
}: ProjectCardProps) {
  const { theme, language } = useTheme();

  return (
    <motion.article
      layout
      className={`group border-2 border-foreground p-6 relative overflow-hidden ${
        theme === "dark"
          ? "glow-border bg-background/80 backdrop-blur-sm"
          : "bg-background"
      } ${project.featured ? "lg:col-span-2" : ""}`}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.95 }}
      transition={{ delay: index * 0.05 }}
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Background decoration */}
      <motion.div
        className={`absolute -right-4 -top-4 text-6xl font-black opacity-10 pointer-events-none transition-all duration-500 ${
          isHovered ? "opacity-20 scale-110" : ""
        } ${theme === "dark" ? "text-accent" : ""}`}
      >
        {project.icon}
      </motion.div>

      {/* Hover glow effect */}
      {theme === "dark" && isHovered && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}

      {/* Main Content with Image on Right */}
      <div
        className={`flex gap-4 ${project.image ? "flex-col sm:flex-row" : ""}`}
      >
        {/* Left: Project Info */}
        <div className={`flex-1 ${project.image ? "sm:w-2/3" : ""}`}>
          {/* Header */}
          <div className="flex justify-between items-start mb-4 relative">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`text-[10px] px-2 py-1 border-2 font-bold ${
                  theme === "dark"
                    ? "border-primary text-primary"
                    : "border-foreground/50"
                }`}
              >
                {project.category}
              </span>
              {project.featured && (
                <span
                  className={`text-[10px] flex items-center gap-1 ${theme === "dark" ? "text-accent" : ""}`}
                >
                  <Sparkles size={10} /> FEATURED
                </span>
              )}
              {project.hasDemo && (
                <span
                  className={`text-[10px] flex items-center gap-1 px-2 py-0.5 ${
                    theme === "dark"
                      ? "bg-accent/20 text-accent"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  <Play size={10} /> LIVE DEMO
                </span>
              )}
            </div>
          </div>

          {/* Title */}
          <h2
            className={`font-sans font-bold text-xl mb-2 group-hover:translate-x-1 transition-transform ${
              theme === "dark" ? "text-flicker" : ""
            }`}
          >
            <Link
              to={project.links?.live || `/project/${project.id}`}
              className="hover:underline flex items-center gap-2"
            >
              {t(language, project.title, project.titleVn)}
              <ChevronRight
                size={16}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </Link>
          </h2>

          {/* Topic */}
          <div
            className={`text-sm mb-4 ${theme === "dark" ? "text-primary" : "text-muted-foreground"}`}
          >
            {t(language, project.topic, project.topicVn)}
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed mb-5 text-muted-foreground">
            {t(language, project.description, project.descriptionVn)}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tech.map((tech) => (
              <motion.span
                key={tech}
                className={`text-[9px] px-2 py-1 border border-foreground/40 transition-all ${
                  theme === "dark"
                    ? "hover:border-accent hover:text-accent"
                    : "hover:bg-foreground hover:text-background"
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 flex-wrap">
            {project.links?.github && (
              <motion.a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold border-2 border-foreground transition-all ${
                  theme === "dark"
                    ? "hover:border-accent hover:text-accent hover:shadow-[0_0_10px_hsl(var(--neon-cyan)/0.3)]"
                    : "hover:bg-foreground hover:text-background"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Github size={12} /> GitHub
              </motion.a>
            )}
            {project.links?.live && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to={project.links.live}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold border-2 transition-all ${
                    theme === "dark"
                      ? "border-accent text-accent bg-accent/10 hover:shadow-[0_0_15px_hsl(var(--neon-cyan)/0.4)]"
                      : "bg-foreground text-background border-foreground"
                  }`}
                >
                  <ExternalLink size={12} />{" "}
                  {t(language, "Live Demo", "Xem Demo")}
                </Link>
              </motion.div>
            )}
            {project.links?.pdf && (
              <motion.a
                href={project.links.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold border-2 border-foreground transition-all ${
                  theme === "dark"
                    ? "hover:border-primary hover:text-primary"
                    : "hover:bg-muted"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FileText size={12} /> PDF
              </motion.a>
            )}
          </div>
        </div>

        {/* Right: Project Image */}
        {project.image && (
          <div className="sm:w-1/3 flex-shrink-0">
            <motion.div
              className={`relative overflow-hidden border-2 h-full min-h-[120px] ${
                theme === "dark" ? "border-primary/30" : "border-foreground/20"
              }`}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={project.image}
                alt={t(language, project.title, project.titleVn)}
                className={`w-full h-full object-cover transition-all duration-500 ${
                  isHovered ? "scale-110" : ""
                }`}
              />
              <div
                className={`absolute inset-0 bg-gradient-to-l from-transparent to-background/20 ${
                  theme === "dark" ? "from-transparent to-background/40" : ""
                }`}
              />
            </motion.div>
          </div>
        )}
      </div>
    </motion.article>
  );
}
