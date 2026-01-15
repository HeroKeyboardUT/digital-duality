import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export function CursorFollower() {
  const { theme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (theme !== 'dark') return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, [role="button"], input, textarea, .cursor-pointer')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [theme]);

  // Only show in dark mode and on desktop
  if (theme !== 'dark') return null;

  return (
    <>
      {/* Main cursor glow */}
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-screen hidden lg:block"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        <div
          className={`w-8 h-8 rounded-full transition-colors duration-200 ${
            isHovering
              ? 'bg-accent/50 shadow-[0_0_20px_hsl(var(--neon-green))]'
              : 'bg-primary/30 shadow-[0_0_15px_hsl(var(--neon-cyan)/0.5)]'
          }`}
        />
      </motion.div>

      {/* Trailing effect */}
      <motion.div
        className="fixed pointer-events-none z-[9998] mix-blend-screen hidden lg:block"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      >
        <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_hsl(var(--neon-green))]" />
      </motion.div>
    </>
  );
}
