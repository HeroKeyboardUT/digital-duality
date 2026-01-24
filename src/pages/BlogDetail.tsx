import { useParams, Link } from "react-router-dom";
import { ThemeProvider, useTheme, t } from "@/context/ThemeContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Eye, Calendar, Tag } from "lucide-react";
import { blogPosts as blogPostsData } from "@/data/blog-posts";

function BlogDetailContent() {
  const { id } = useParams();
  const { theme, language } = useTheme();
  const post = blogPostsData.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
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
            to="/#blog"
            className={`inline-flex items-center gap-2 mb-8 text-base hover:underline ${
              theme === "dark" ? "text-primary" : ""
            }`}
          >
            <ArrowLeft size={18} />
            {t(language, "Back to Blog", "Quay Lại Blog")}
          </Link>

          {/* Hero Image */}
          <motion.div
            className="relative mb-8 overflow-hidden rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover"
            />
            <div
              className={`absolute inset-0 ${theme === "dark" ? "bg-gradient-to-t from-background via-transparent" : "bg-gradient-to-t from-white/80 via-transparent"}`}
            />
          </motion.div>

          {/* Title */}
          <motion.h1
            className={`text-3xl md:text-5xl font-black mb-4 ${theme === "dark" ? "neon-text" : ""}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {t(language, post.title, post.titleVn)}
          </motion.h1>

          {/* Meta */}
          <motion.div
            className="flex flex-wrap gap-4 mb-8 text-base text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="flex items-center gap-2">
              <Calendar size={18} />
              {post.date}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={18} />
              {post.readTime}
            </span>
            <span className="flex items-center gap-2">
              <Eye size={18} />
              {post.views} views
            </span>
          </motion.div>

          {/* Tags */}
          <motion.div
            className="flex flex-wrap gap-2 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {post.tags.map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1 text-sm border ${
                  theme === "dark"
                    ? "border-primary/30 bg-primary/10"
                    : "border-border bg-muted"
                }`}
              >
                #{tag}
              </span>
            ))}
          </motion.div>

          {/* Content */}
          <motion.article
            className="prose prose-lg max-w-none dark:prose-invert"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div
              className={`text-base leading-relaxed space-y-4 ${theme === "dark" ? "text-foreground/90" : ""}`}
            >
              {t(language, post.content, post.contentVn)
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
                  if (line.startsWith("### ")) {
                    return (
                      <h3
                        key={i}
                        className={`text-xl font-bold mt-6 mb-3 ${theme === "dark" ? "text-accent" : ""}`}
                      >
                        {line.replace("### ", "")}
                      </h3>
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
                })}
            </div>
          </motion.article>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function BlogDetail() {
  return (
    <ThemeProvider>
      <BlogDetailContent />
    </ThemeProvider>
  );
}
