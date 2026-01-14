import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { useTheme, t } from '@/context/ThemeContext';

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  placeholder?: string;
  placeholderVn?: string;
}

export function SearchFilter({ 
  searchQuery, 
  onSearchChange, 
  placeholder = 'Search...',
  placeholderVn = 'Tìm kiếm...'
}: SearchFilterProps) {
  const { theme, language } = useTheme();

  return (
    <div className="relative flex-1">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <input
        type="text"
        placeholder={t(language, placeholder, placeholderVn)}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className={`w-full pl-10 pr-4 py-2.5 text-sm border-2 border-foreground/30 bg-transparent focus:outline-none transition-all ${
          theme === 'dark' ? 'focus:border-accent focus:shadow-[0_0_15px_hsl(var(--neon-cyan)/0.3)]' : 'focus:border-foreground'
        }`}
      />
    </div>
  );
}

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  showMoreAfter?: number;
}

export function CategoryFilter({ 
  categories, 
  activeCategory, 
  onCategoryChange,
  showMoreAfter = 5
}: CategoryFilterProps) {
  const { theme, language } = useTheme();
  const visibleCategories = categories.slice(0, showMoreAfter);
  const hiddenCategories = categories.slice(showMoreAfter);

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Filter size={14} className="text-muted-foreground" />
      <div className="flex gap-1 flex-wrap">
        {visibleCategories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-3 py-1.5 text-[10px] font-bold border-2 transition-all ${
              activeCategory === cat
                ? theme === 'dark' 
                  ? 'border-accent text-accent bg-accent/10 shadow-[0_0_10px_hsl(var(--neon-cyan)/0.3)]' 
                  : 'border-foreground bg-foreground text-background'
                : 'border-foreground/30 hover:border-foreground'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {cat}
          </motion.button>
        ))}
        {hiddenCategories.length > 0 && (
          <details className="relative group">
            <summary className={`px-3 py-1.5 text-[10px] font-bold border-2 border-foreground/30 cursor-pointer list-none hover:border-foreground`}>
              {t(language, 'More...', 'Thêm...')}
            </summary>
            <div className={`absolute top-full left-0 mt-1 p-2 border-2 border-foreground bg-background z-10 flex flex-col gap-1 min-w-[120px]`}>
              {hiddenCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => onCategoryChange(cat)}
                  className={`px-2 py-1 text-[10px] text-left hover:bg-foreground/10 ${
                    activeCategory === cat ? (theme === 'dark' ? 'text-accent' : 'font-bold') : ''
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </details>
        )}
      </div>
    </div>
  );
}
