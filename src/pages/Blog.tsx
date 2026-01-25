import { MainLayout } from "@/layouts/MainLayout";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, t } from "@/context/ThemeContext";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, TrendingUp, Eye, Sparkles } from "lucide-react";
import { useState, useMemo } from "react";
import { blogPosts, blogCategories } from "@/data/blog-posts";
import { BlogCard } from "@/components/cards/BlogCard";
import {
  SearchFilter,
  CategoryFilter,
} from "@/components/filters/SearchFilter";
import { useFilter } from "@/hooks/useFilter";

function BlogContent() {
  const { theme, language } = useTheme();
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);

  const {
    filteredItems: filteredPosts,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
  } = useFilter({
    items: blogPosts,
    searchFields: ["title", "titleVn"],
    categoryField: "category",
    arraySearchFields: ["tags"],
  });

  const featuredPosts = useMemo(() => blogPosts.filter((p) => p.featured), []);
  const totalViews = useMemo(
    () => blogPosts.reduce((acc, p) => acc + (p.views || 0), 0),
    [],
  );

  return (
    <div
      className={`min-h-screen py-8 px-4 relative overflow-hidden ${theme === "dark" ? "hex-pattern" : ""}`}
    >
      {theme === "dark" && (
        <>
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </>
      )}

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            to="/"
            className={`inline-flex items-center gap-2 text-sm mb-6 group ${theme === "dark" ? "text-accent hover:text-primary" : "hover:text-muted-foreground"}`}
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            {t(language, "Back to Home", "Quay Lại Trang Chủ")}
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`p-2 border-2 border-foreground ${theme === "dark" ? "bg-accent/10" : "bg-muted"}`}
                >
                  <BookOpen
                    size={24}
                    className={theme === "dark" ? "text-accent" : ""}
                  />
                </div>
                <span className="text-xs font-mono text-muted-foreground">
                  // KNOWLEDGE_BASE (Still Updating...)
                </span>
              </div>
              <h1
                className={`text-4xl md:text-6xl font-sans font-black ${theme === "dark" ? "neon-text" : ""}`}
              >
                {t(language, "KNOWLEDGE BASE", "KHO KIẾN THỨC")}
              </h1>
            </div>

            <div className="flex gap-4">
              {[
                {
                  value: blogPosts.length,
                  label: t(language, "Articles", "Bài Viết"),
                  icon: BookOpen,
                },
                {
                  value: featuredPosts.length,
                  label: t(language, "Featured", "Nổi Bật"),
                  icon: Sparkles,
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className={`text-center p-3 border border-foreground/20 ${theme === "dark" ? "bg-background/50" : ""}`}
                >
                  <stat.icon
                    size={14}
                    className={`mx-auto mb-1 ${theme === "dark" ? "text-accent" : ""}`}
                  />
                  <div
                    className={`text-xl font-black ${theme === "dark" ? "text-accent" : ""}`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[9px] text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          className={`p-4 border-2 border-foreground mb-6 ${theme === "dark" ? "glow-border bg-background/80 backdrop-blur-sm" : "bg-background"}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <SearchFilter
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              placeholder="Search articles..."
              placeholderVn="Tìm kiếm bài viết..."
            />
            <CategoryFilter
              categories={blogCategories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>
        </motion.div>

        {/* Featured Section */}
        {activeCategory === "All" && searchQuery === "" && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp
                size={16}
                className={theme === "dark" ? "text-accent" : ""}
              />
              <h2 className="text-sm font-bold uppercase tracking-wider">
                {t(language, "Featured Articles", "Bài Viết Nổi Bật")}
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {featuredPosts.map((post, i) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  index={i}
                  isHovered={false}
                  onHover={() => {}}
                  variant="featured"
                />
              ))}
            </div>
          </motion.div>
        )}

        <div className="mb-4 text-xs text-muted-foreground">
          {t(
            language,
            `Showing ${filteredPosts.length} articles`,
            `Hiển thị ${filteredPosts.length} bài viết`,
          )}
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, i) => (
              <BlogCard
                key={post.id}
                post={post}
                index={i}
                isHovered={hoveredPost === post.id}
                onHover={setHoveredPost}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

const Blog = () => (
  <MainLayout>
    <BlogContent />
  </MainLayout>
);

export default Blog;
