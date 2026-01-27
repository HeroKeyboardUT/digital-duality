import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

export function CursorFollower() {
  const { theme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const rafRef = useRef<number | null>(null);
  const lastUpdateRef = useRef(0);

  // Throttled mouse position update using RAF for smooth 60fps
  const updateMousePosition = useCallback((e: MouseEvent) => {
    const now = performance.now();
    // Throttle to ~60fps (16ms) for performance
    if (now - lastUpdateRef.current < 16) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      lastUpdateRef.current = now;
    });
  }, []);

  useEffect(() => {
    if (theme !== "dark") return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.matches(
          'a, button, [role="button"], input, textarea, .cursor-pointer',
        )
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition, {
      passive: true,
    });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [theme, updateMousePosition]);

  // Only show in dark mode and on desktop
  if (theme !== "dark") return null;

  return (
    <>
      {/* Main cursor glow - GPU accelerated */}
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-screen hidden lg:block will-change-transform"
        style={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "tween",
          duration: 0.1,
          ease: "linear",
        }}
      >
        <div
          className={`w-8 h-8 rounded-full transition-colors duration-200 ${
            isHovering
              ? "bg-accent/50 shadow-[0_0_15px_hsl(var(--neon-green))]"
              : "bg-primary/30 shadow-[0_0_10px_hsl(var(--neon-cyan)/0.5)]"
          }`}
          style={{ transform: "translateZ(0)" }}
        />
      </motion.div>

      {/* Trailing effect - simplified for performance */}
      <motion.div
        className="fixed pointer-events-none z-[9998] mix-blend-screen hidden lg:block will-change-transform"
        style={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{
          type: "tween",
          duration: 0.15,
          ease: "linear",
        }}
      >
        <div
          className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_hsl(var(--neon-green))]"
          style={{ transform: "translateZ(0)" }}
        />
      </motion.div>
    </>
  );
}
