import { MainLayout } from "@/layouts/MainLayout";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, t } from "@/context/ThemeContext";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Wrench,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  Zap,
  Activity,
  Database,
  Play,
} from "lucide-react";
import { useState } from "react";
import { utilities } from "@/data/utilities";
import type { UtilityItem } from "@/data/utilities";

/* ── Tag label chip ── */
const TAG_ICONS: Record<string, React.ElementType> = {
  DATA: Database,
  STREAM: Play,
  TOOL: Wrench,
  AI: Zap,
  LIVE: Activity,
};

/* ── Animated background scan lines ── */
function ScanLines({ isDark }: { isDark: boolean }) {
  if (!isDark) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Vertical grid */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={`v${i}`}
          className="absolute top-0 bottom-0 w-px bg-foreground/[0.04]"
          style={{ left: `${(i + 1) * 9.09}%` }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.5 + i * 0.04, duration: 1, ease: "easeOut" }}
        />
      ))}
      {/* Horizontal grid */}
      {Array.from({ length: 7 }).map((_, i) => (
        <motion.div
          key={`h${i}`}
          className="absolute left-0 right-0 h-px bg-foreground/[0.04]"
          style={{ top: `${(i + 1) * 12.5}%` }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6 + i * 0.06, duration: 1, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

/* ── Single utility card ── */
function UtilCard({
  util,
  isDark,
  language,
  index,
}: {
  util: UtilityItem;
  isDark: boolean;
  language: string;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = util.icon;
  const TagIcon = TAG_ICONS[util.tag] || Zap;

  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.13, duration: 0.5, ease: "easeOut" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`relative flex flex-col h-full border-2 transition-all duration-300 ${
        isDark
          ? hovered
            ? "border-primary bg-card shadow-[0_0_40px_hsl(var(--primary)/0.15)]"
            : "border-primary/20 bg-card"
          : hovered
          ? "border-foreground bg-foreground text-background"
          : "border-foreground bg-background"
      }`}
    >
      {/* Scan line overlay on hover — dark only */}
      {isDark && hovered && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
          <div className="scan-line" />
        </div>
      )}

      {/* Top bar with tag */}
      <div
        className={`flex items-center justify-between px-5 py-3 border-b-2 ${
          isDark
            ? "border-primary/15 bg-primary/5"
            : hovered
            ? "border-background/20 bg-background/10"
            : "border-foreground/15 bg-muted/40"
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5" style={{ background: isDark ? "hsl(var(--primary))" : hovered ? "white" : "black" }} />
          <TagIcon
            size={11}
            className={isDark ? "text-accent" : hovered ? "text-background/70" : "text-muted-foreground"}
          />
          <span
            className={`text-[10px] font-black tracking-[0.2em] font-mono ${
              isDark ? "text-accent" : hovered ? "text-background/70" : "text-muted-foreground"
            }`}
          >
            {util.tag}
          </span>
        </div>
        {util.isExternal && (
          <div
            className={`flex items-center gap-1 text-[9px] font-mono border px-1.5 py-0.5 ${
              isDark
                ? "border-primary/20 text-muted-foreground"
                : hovered
                ? "border-background/30 text-background/60"
                : "border-foreground/20 text-muted-foreground"
            }`}
          >
            <ExternalLink size={8} />
            EXTERNAL
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Icon + title row */}
        <div className="flex items-start gap-4 mb-4">
          <div
            className={`w-12 h-12 border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${
              isDark
                ? "border-primary/40 bg-primary/8"
                : hovered
                ? "border-background/50 bg-background/10"
                : "border-foreground bg-muted"
            }`}
          >
            <Icon
              size={22}
              className={
                isDark
                  ? "text-accent"
                  : hovered
                  ? "text-background"
                  : ""
              }
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className={`text-lg font-black font-sans leading-tight mb-1 ${
                isDark ? "text-foreground" : hovered ? "text-background" : "text-foreground"
              }`}
            >
              {t(language, util.title, util.titleVn)}
            </h3>
            <p
              className={`text-xs leading-relaxed ${
                isDark
                  ? "text-muted-foreground"
                  : hovered
                  ? "text-background/70"
                  : "text-muted-foreground"
              }`}
            >
              {t(language, util.description, util.descriptionVn)}
            </p>
          </div>
        </div>

        {/* Long description */}
        <p
          className={`text-[11px] leading-relaxed mb-5 ${
            isDark
              ? "text-muted-foreground/70"
              : hovered
              ? "text-background/65"
              : "text-muted-foreground/80"
          }`}
        >
          {t(language, util.longDescription, util.longDescriptionVn)}
        </p>

        {/* Features */}
        <div className="space-y-1.5 mb-5 flex-1">
          {(t(language, util.features, util.featuresVn) as string[]).map((f, fi) => (
            <div key={fi} className="flex items-start gap-2">
              <CheckCircle2
                size={11}
                className={`mt-0.5 shrink-0 ${
                  isDark ? "text-accent" : hovered ? "text-background/70" : "text-foreground"
                }`}
              />
              <span
                className={`text-[11px] leading-tight ${
                  isDark
                    ? "text-muted-foreground"
                    : hovered
                    ? "text-background/70"
                    : "text-muted-foreground"
                }`}
              >
                {f}
              </span>
            </div>
          ))}
        </div>

        {/* Stats */}
        {util.stats && (
          <div className="flex gap-2 flex-wrap mb-5">
            {util.stats.map((s) => (
              <div
                key={s.label}
                className={`flex flex-col items-center px-3 py-1.5 border transition-all duration-300 ${
                  isDark
                    ? "border-primary/20 bg-primary/5"
                    : hovered
                    ? "border-background/25 bg-background/10"
                    : "border-foreground/15 bg-muted/30"
                }`}
              >
                <span
                  className={`text-base font-black font-mono ${
                    isDark ? "text-primary" : hovered ? "text-background" : "text-foreground"
                  }`}
                >
                  {s.value}
                </span>
                <span
                  className={`text-[9px] uppercase tracking-widest ${
                    isDark
                      ? "text-muted-foreground"
                      : hovered
                      ? "text-background/60"
                      : "text-muted-foreground"
                  }`}
                >
                  {t(language, s.label, s.labelVn)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA row */}
      <div
        className={`px-6 py-4 border-t-2 flex items-center justify-between transition-all duration-300 ${
          isDark
            ? "border-primary/12"
            : hovered
            ? "border-background/15"
            : "border-foreground/10"
        }`}
      >
        <span
          className={`text-xs font-black uppercase tracking-widest ${
            isDark ? "text-accent" : hovered ? "text-background" : "text-foreground"
          }`}
        >
          {util.isExternal
            ? t(language, "Open App", "Mở Ứng Dụng")
            : t(language, "Explore", "Khám Phá")}
        </span>
        <motion.div animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.2 }}>
          {util.isExternal ? (
            <ExternalLink
              size={15}
              className={isDark ? "text-accent" : hovered ? "text-background" : "text-foreground"}
            />
          ) : (
            <ArrowRight
              size={15}
              className={isDark ? "text-accent" : hovered ? "text-background" : "text-foreground"}
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  );

  if (util.externalUrl) {
    return (
      <a
        href={util.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full no-underline"
      >
        {inner}
      </a>
    );
  }
  return (
    <Link to={util.href!} className="block h-full no-underline">
      {inner}
    </Link>
  );
}

/* ── Utility content (inside ThemeProvider via MainLayout) ── */
function UtilityContent() {
  const { theme, language } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen py-10 px-4 relative overflow-hidden ${isDark ? "hex-pattern" : ""}`}
    >
      <ScanLines isDark={isDark} />

      {/* Ambient glows — dark only, using design system colors */}
      {isDark && (
        <>
          <div className="absolute -top-32 right-0 w-[480px] h-[480px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 -left-16 w-[380px] h-[380px] bg-accent/4 rounded-full blur-[100px] pointer-events-none" />
        </>
      )}

      <div className="container mx-auto max-w-6xl relative z-10">

        {/* ── HEADER ── */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/"
            className={`inline-flex items-center gap-2 text-xs font-mono mb-8 group ${
              isDark ? "text-accent/60 hover:text-accent" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
            {t(language, "Back to Home", "Quay Lại Trang Chủ")}
          </Link>

          {/* Icon + label */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`p-2 border-2 ${
                isDark ? "border-primary/40 bg-primary/8" : "border-foreground bg-muted"
              }`}
            >
              <Wrench size={20} className={isDark ? "text-accent" : ""} />
            </div>
            <span className="text-[10px] font-mono text-muted-foreground tracking-[0.2em]">
              // UTILITY_HUB
            </span>
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.4 }}
              className={`text-[9px] font-mono px-2 py-0.5 border flex items-center gap-1 ${
                isDark
                  ? "border-primary/30 text-primary"
                  : "border-foreground/30 text-foreground"
              }`}
            >
              <Activity size={8} />
              LIVE
            </motion.span>
          </div>

          <h1
            className={`text-5xl md:text-7xl font-sans font-black leading-none mb-4 ${
              isDark ? "neon-text" : ""
            }`}
          >
            {t(language, "UTILITIES", "TIỆN ÍCH")}
          </h1>

          <div className="flex items-center gap-3 max-w-2xl mb-6">
            <div
              className="w-6 h-0.5 shrink-0"
              style={{
                background: isDark ? "hsl(var(--accent))" : "hsl(var(--foreground))",
              }}
            />
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t(
                language,
                "A curated collection of dashboards, tools, and live apps — built for real use.",
                "Bộ sưu tập dashboard, công cụ và ứng dụng thực tế được xây dựng để dùng ngay.",
              )}
            </p>
          </div>

          {/* Quick stats */}
          <motion.div
            className="flex items-center gap-6 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            {[
              { v: utilities.length, l: t(language, "Utilities", "Tiện Ích") },
              { v: utilities.filter((u) => u.isExternal).length, l: t(language, "External Apps", "App Ngoài") },
              { v: utilities.filter((u) => !u.isExternal).length, l: t(language, "Built-in", "Nội Bộ") },
            ].map((s) => (
              <div key={s.l as string} className="flex items-center gap-2">
                <span
                  className={`text-xl font-black font-mono ${isDark ? "text-primary" : "text-foreground"}`}
                >
                  {s.v}
                </span>
                <span className="text-xs text-muted-foreground">{s.l as string}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── DIVIDER ── */}
        <motion.div
          className="flex items-center gap-3 mb-7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.28 }}
        >
          <div
            className="h-px flex-1"
            style={{
              background: isDark
                ? "hsl(var(--primary)/0.15)"
                : "hsl(var(--foreground)/0.12)",
            }}
          />
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground px-2">
            {t(language, `${utilities.length} available`, `${utilities.length} tiện ích`)}
          </span>
          <div
            className="h-px flex-1"
            style={{
              background: isDark
                ? "hsl(var(--primary)/0.15)"
                : "hsl(var(--foreground)/0.12)",
            }}
          />
        </motion.div>

        {/* ── CARDS ── */}
        <AnimatePresence>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {utilities.map((util, i) => (
              <UtilCard
                key={util.id}
                util={util}
                isDark={isDark}
                language={language}
                index={i}
              />
            ))}
          </div>
        </AnimatePresence>

        {/* Footer */}
        <motion.p
          className="text-center text-[11px] text-muted-foreground mt-12 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 0.9 }}
        >
          {t(language, "More utilities coming soon —", "Sẽ có thêm tiện ích —")}{" "}
          {t(language, "stay tuned.", "hãy theo dõi.")}
        </motion.p>
      </div>
    </div>
  );
}

/* ── Default export ── */
const Utility = () => (
  <MainLayout>
    <UtilityContent />
  </MainLayout>
);

export default Utility;
