import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export function ThemeTip() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    // Check if user has already seen the tip
    const hasSeenTip = localStorage.getItem("theme-tip-dismissed");
    if (hasSeenTip) {
      setIsDismissed(true);
      return;
    }

    // Show tip after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Hide tip when user switches to dark mode
  useEffect(() => {
    if (theme === "dark" && isVisible) {
      handleDismiss();
    }
  }, [theme]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem("theme-tip-dismissed", "true");
  };

  if (isDismissed || theme === "dark") return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed top-16 right-4 z-50 max-w-xs"
        >
          {/* Glowing background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-xl rounded-2xl" />

          <div className="relative bg-background/95 backdrop-blur-md border-2 border-foreground/20 rounded-2xl p-4 shadow-2xl">
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute -top-2 -right-2 w-6 h-6 bg-foreground text-background rounded-full flex items-center justify-center hover:scale-110 transition-transform"
            >
              <X size={14} />
            </button>

            {/* Animated icon */}
            <div className="flex items-start gap-3">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
                className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center"
              >
                <Moon size={20} className="text-white" />
              </motion.div>

              <div className="flex-1">
                <h4 className="font-bold text-sm mb-1 flex items-center gap-1">
                  <Sparkles size={14} className="text-yellow-500" />
                  Pro Tip!
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Click on{" "}
                  <span className="font-mono font-bold text-foreground bg-foreground/10 px-1.5 py-0.5 rounded">
                    CYBER
                  </span>{" "}
                  in the header to switch to{" "}
                  <span className="font-bold bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
                    Dark Mode
                  </span>
                  !
                </p>
              </div>
            </div>

            {/* Animated arrow pointing up-left */}
            <motion.div
              animate={{ x: [-2, 2, -2], y: [-2, 2, -2] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute -top-3 left-1/2 -translate-x-1/2"
            >
              <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-foreground/20" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
