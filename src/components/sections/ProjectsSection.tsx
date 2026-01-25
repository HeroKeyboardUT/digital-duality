import { motion } from "framer-motion";
import { useTheme, t } from "@/context/ThemeContext";
import { ExternalLink, Github, ArrowUpRight, FileText } from "lucide-react";
import { projects } from "@/data/projects";
import type { Project } from "@/types";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { theme, language } = useTheme();

  return (
    <motion.article
      className={`grid-cell h-full flex flex-col ${project.featured ? "md:col-span-2" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="label-text">
          PRJ-{String(index + 1).padStart(3, "0")}
        </div>
        {project.featured && (
          <span
            className={`text-[10px] ${theme === "dark" ? "text-accent" : "text-foreground"}`}
          >
            [FEATURED]
          </span>
        )}
      </div>

      {/* Title */}
      <h3
        className={`font-sans font-bold text-xl mb-1 ${theme === "dark" ? "text-flicker" : ""}`}
      >
        <a href={`/project/${project.id}`} className="hover:underline">
          {t(language, project.title, project.titleVn)}
        </a>
      </h3>

      {/* Topic */}
      <div
        className={`text-sm mb-3 ${theme === "dark" ? "text-primary" : "text-muted-foreground"}`}
      >
        {t(language, project.topic, project.topicVn)}
      </div>

      {/* Description */}
      <p className="text-base leading-relaxed mb-4 flex-1">
        {t(language, project.description, project.descriptionVn)}
      </p>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-1 mb-4">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className={`text-[9px] px-1.5 py-0.5 border border-foreground/30 ${
              theme === "dark" ? "border-primary/30" : ""
            }`}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      {project.links && (
        <div className="flex gap-3 mt-auto pt-3 border-t border-foreground/20">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1 text-[10px] transition-colors ${
                theme === "dark"
                  ? "hover:text-accent"
                  : "hover:text-muted-foreground"
              }`}
            >
              <Github size={12} /> CODE
            </a>
          )}
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1 text-[10px] transition-colors ${
                theme === "dark"
                  ? "hover:text-accent"
                  : "hover:text-muted-foreground"
              }`}
            >
              <ExternalLink size={12} /> LIVE
            </a>
          )}
          {project.links.pdf && (
            <a
              href={project.links.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1 text-[10px] transition-colors ${
                theme === "dark"
                  ? "hover:text-accent"
                  : "hover:text-muted-foreground"
              }`}
            >
              <FileText size={12} /> REPORT
            </a>
          )}
        </div>
      )}
    </motion.article>
  );
}

export function ProjectsSection() {
  const { theme, language } = useTheme();

  return (
    <section
      id="projects"
      className={`py-20 px-4 border-t-2 border-foreground ${theme === "dark" ? "hex-pattern" : ""}`}
    >
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="label-text mb-2">
            02 // {t(language, "PROJECTS", "DỰ ÁN")}
          </div>
          <h2
            className={`text-4xl sm:text-5xl font-sans font-black mb-4 ${theme === "dark" ? "neon-text" : ""}`}
          >
            {t(language, "MY WORKS", "CÁC CÔNG TRÌNH")}
          </h2>
          <p className="text-sm max-w-2xl">
            {t(
              language,
              "These are projects from subjects I studied and personal projects. I modelized them to display on this website.",
              "Đây là các dự án từ các môn học và dự án cá nhân. Tôi đã mô hình hóa để hiển thị trên website này.",
            )}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <a
            href="https://github.com/HeroKeyboardUT"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-6 py-3 border-2 border-foreground text-sm font-bold hover:bg-foreground hover:text-background transition-colors ${
              theme === "dark" ? "cyber-btn" : ""
            }`}
          >
            {t(language, "VIEW ALL ON GITHUB", "XEM TẤT CẢ TRÊN GITHUB")}
            <ArrowUpRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
