import { motion } from 'framer-motion';
import { useTheme, t } from '@/context/ThemeContext';
import { Link } from 'react-router-dom';
import { Clock, Tag, ChevronRight, Eye, Sparkles } from 'lucide-react';
import type { BlogPost } from '@/types';

interface BlogCardProps {
  post: BlogPost;
  index: number;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  variant?: 'default' | 'featured';
}

export function BlogCard({ post, index, isHovered, onHover, variant = 'default' }: BlogCardProps) {
  const { theme, language } = useTheme();

  if (variant === 'featured') {
    return (
      <motion.article
        className={`group p-5 border-2 border-foreground relative overflow-hidden ${
          theme === 'dark' ? 'glow-border bg-gradient-to-br from-primary/5 to-accent/5' : 'bg-muted/30'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 + index * 0.1 }}
        whileHover={{ scale: 1.02 }}
      >
        <span className={`absolute top-3 right-3 text-2xl font-black opacity-20 ${theme === 'dark' ? 'text-accent' : ''}`}>
          {post.icon}
        </span>
        <div className={`text-[10px] px-2 py-0.5 inline-block border mb-2 ${theme === 'dark' ? 'border-accent text-accent' : 'border-foreground'}`}>
          {post.category}
        </div>
        <h3 className={`font-bold text-lg mb-2 group-hover:translate-x-1 transition-transform ${theme === 'dark' ? 'group-hover:text-accent' : ''}`}>
          <Link to={`/blog/${post.id}`}>{t(language, post.title, post.titleVn)}</Link>
        </h3>
        <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
          <span className="flex items-center gap-1"><Eye size={10} /> {post.views}</span>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      layout
      className={`group border-2 border-foreground p-5 flex flex-col relative overflow-hidden ${
        theme === 'dark' ? 'glow-border bg-background/80 backdrop-blur-sm' : 'bg-background'
      }`}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.95 }}
      transition={{ delay: index * 0.03 }}
      onMouseEnter={() => onHover(post.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Background icon */}
      <motion.span 
        className={`absolute -right-2 -top-2 text-4xl font-black opacity-10 transition-all duration-300 ${
          isHovered ? 'opacity-20 scale-110' : ''
        } ${theme === 'dark' ? 'text-accent' : ''}`}
      >
        {post.icon}
      </motion.span>

      {/* Header */}
      <div className="flex justify-between items-start mb-3 relative">
        <div className="flex items-center gap-2">
          <span className={`text-[9px] px-2 py-1 border-2 font-bold ${theme === 'dark' ? 'border-primary text-primary' : 'border-foreground/50'}`}>
            {post.category}
          </span>
          {post.featured && (
            <span className={`text-[9px] flex items-center gap-1 ${theme === 'dark' ? 'text-accent' : ''}`}>
              <Sparkles size={8} />
            </span>
          )}
        </div>
        {post.views && (
          <span className="text-[9px] text-muted-foreground flex items-center gap-1">
            <Eye size={10} /> {post.views}
          </span>
        )}
      </div>

      {/* Title */}
      <h2 className={`font-sans font-bold text-lg mb-2 group-hover:translate-x-1 transition-transform ${theme === 'dark' ? 'text-flicker' : ''}`}>
        <Link to={`/blog/${post.id}`} className="hover:underline flex items-center gap-1">
          {t(language, post.title, post.titleVn)}
          <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
      </h2>

      {/* Excerpt */}
      <p className="text-xs text-muted-foreground mb-4 flex-1 line-clamp-2">
        {t(language, post.excerpt, post.excerptVn)}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-3">
        {post.tags.slice(0, 3).map((tag) => (
          <span 
            key={tag} 
            className={`text-[8px] px-1.5 py-0.5 border transition-all ${
              theme === 'dark' ? 'border-foreground/30 hover:border-accent hover:text-accent' : 'border-foreground/20 hover:bg-muted'
            }`}
          >
            <Tag size={8} className="inline mr-0.5" />{tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-[9px] text-muted-foreground pt-3 border-t border-foreground/10">
        <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
        <span>{post.date}</span>
      </div>
    </motion.article>
  );
}
