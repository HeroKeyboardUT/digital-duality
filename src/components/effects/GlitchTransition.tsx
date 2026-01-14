import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export function GlitchTransition() {
  const { isTransitioning, theme } = useTheme();

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          className="fixed inset-0 z-[10000] pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Glitch slices */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full"
              style={{
                height: `${100 / 20}%`,
                top: `${(i * 100) / 20}%`,
                backgroundColor: theme === 'light' ? '#000' : '#00f3ff',
              }}
              initial={{ x: 0, opacity: 0 }}
              animate={{
                x: [0, (i % 2 === 0 ? 1 : -1) * (Math.random() * 100), 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 0.5,
                delay: i * 0.02,
                ease: 'easeInOut',
              }}
            />
          ))}
          
          {/* Flash overlay */}
          <motion.div
            className="absolute inset-0"
            style={{ backgroundColor: theme === 'light' ? '#fff' : '#000' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.3, delay: 0.2 }}
          />

          {/* Scan line */}
          <motion.div
            className="absolute left-0 right-0 h-1"
            style={{ backgroundColor: theme === 'light' ? '#000' : '#00ff41' }}
            initial={{ top: '-10%' }}
            animate={{ top: '110%' }}
            transition={{ duration: 0.4, ease: 'linear' }}
          />

          {/* Noise overlay */}
          <motion.div
            className="absolute inset-0 mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
