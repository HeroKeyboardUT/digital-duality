import { useTheme } from "@/context/ThemeContext";
import { memo } from "react";

// Memoized to prevent unnecessary re-renders
export const CRTOverlay = memo(function CRTOverlay() {
  const { theme } = useTheme();

  if (theme !== "dark") return null;

  return (
    <>
      {/* Scanlines - GPU accelerated */}
      <div
        className="crt-overlay"
        style={{
          willChange: "auto",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      />

      {/* Vignette effect - static, no animation needed */}
      <div
        className="fixed inset-0 pointer-events-none z-[9998]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.35) 100%)",
          transform: "translateZ(0)",
        }}
      />

      {/* Subtle screen flicker - optimized with longer duration */}
      <div
        className="fixed inset-0 pointer-events-none z-[9997] opacity-[0.02]"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(0,243,255,0.08) 50%, transparent 100%)",
          animation: "scan 6s linear infinite",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      />
    </>
  );
});
