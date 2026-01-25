import { useParams, Link } from "react-router-dom";
import { ThemeProvider, useTheme, t } from "@/context/ThemeContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  FileText,
  Calendar,
  Tag,
} from "lucide-react";
import { projects } from "@/data/projects";

function ProjectDetailContent() {
  const { id } = useParams();
  const { theme, language } = useTheme();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link to="/" className="text-primary hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Back Link */}
          <Link
            to="/#projects"
            className={`inline-flex items-center gap-2 mb-8 text-base hover:underline ${
              theme === "dark" ? "text-primary" : ""
            }`}
          >
            <ArrowLeft size={18} />
            {t(language, "Back to Projects", "Quay Lại Dự Án")}
          </Link>

          {/* Hero Image */}
          <motion.div
            className="relative mb-8 overflow-hidden rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-64 md:h-96 object-cover"
            />
            <div
              className={`absolute inset-0 ${theme === "dark" ? "bg-gradient-to-t from-background via-transparent" : "bg-gradient-to-t from-white/80 via-transparent"}`}
            />
          </motion.div>

          {/* Title */}
          <motion.h1
            className={`text-4xl md:text-5xl font-black mb-4 ${theme === "dark" ? "neon-text" : ""}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {t(language, project.title, project.titleVn)}
          </motion.h1>

          {/* Meta */}
          <motion.div
            className="flex flex-wrap gap-4 mb-8 text-base text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {project.date && (
              <span className="flex items-center gap-2">
                <Calendar size={18} />
                {project.date}
              </span>
            )}
            <span className="flex items-center gap-2">
              <Tag size={18} />
              {t(language, project.topic, project.topicVn)}
            </span>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            className="flex flex-wrap gap-2 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {project.tech.map((tech) => (
              <span
                key={tech}
                className={`px-3 py-1 text-sm border ${
                  theme === "dark"
                    ? "border-primary/30 bg-primary/10"
                    : "border-border bg-muted"
                }`}
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* Links */}
          {project.links && (
            <motion.div
              className="flex gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2 border-2 text-base font-bold transition-colors ${
                    theme === "dark"
                      ? "border-primary hover:bg-primary/20"
                      : "border-foreground hover:bg-foreground hover:text-background"
                  }`}
                >
                  <Github size={18} /> GitHub
                </a>
              )}
              {project.links.live && (
                <Link
                  to={project.links.live}
                  className={`inline-flex items-center gap-2 px-4 py-2 border-2 text-base font-bold transition-colors ${
                    theme === "dark"
                      ? "border-accent hover:bg-accent/20"
                      : "border-foreground hover:bg-foreground hover:text-background"
                  }`}
                >
                  <ExternalLink size={18} /> Live Demo
                </Link>
              )}
              {project.links.pdf && (
                <a
                  href={project.links.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2 border-2 text-base font-bold transition-colors ${
                    theme === "dark"
                      ? "border-accent hover:bg-accent/20"
                      : "border-foreground hover:bg-foreground hover:text-background"
                  }`}
                >
                  <FileText size={18} /> Report
                </a>
              )}
            </motion.div>
          )}

          {/* Content */}
          <motion.article
            className="prose prose-lg max-w-none dark:prose-invert"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div
              className={`text-base leading-relaxed space-y-4 ${theme === "dark" ? "text-foreground/90" : ""}`}
            >
              {project.content ? (
                t(
                  language,
                  project.content,
                  project.contentVn || project.content,
                )
                  .split("\n")
                  .map((line, i) => {
                    if (line.startsWith("## ")) {
                      return (
                        <h2
                          key={i}
                          className={`text-2xl font-bold mt-8 mb-4 ${theme === "dark" ? "text-primary" : ""}`}
                        >
                          {line.replace("## ", "")}
                        </h2>
                      );
                    }
                    if (line.startsWith("- ")) {
                      return (
                        <li key={i} className="ml-4">
                          {line.replace("- ", "")}
                        </li>
                      );
                    }
                    if (line.trim()) {
                      return <p key={i}>{line}</p>;
                    }
                    return null;
                  })
              ) : (
                <p>{t(language, project.description, project.descriptionVn)}</p>
              )}
            </div>
          </motion.article>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function ProjectDetail() {
  return (
    <ThemeProvider>
      <ProjectDetailContent />
    </ThemeProvider>
  );
}
