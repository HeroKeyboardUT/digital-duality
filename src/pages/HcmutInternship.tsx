import { MainLayout } from "@/layouts/MainLayout";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, t } from "@/context/ThemeContext";
import { Link } from "react-router-dom";
import {
  ArrowLeft, Search, MapPin, FileText, ExternalLink,
  AlertTriangle, ChevronDown, ChevronUp, GraduationCap,
  BarChart3, TrendingUp, Users, Building2, Activity,
} from "lucide-react";
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import companyData from "@/data/hcmutCompany.json";

type FilterStatus = "all" | "available" | "full";
type SortKey = "index" | "name" | "slots" | "accepted" | "fillRate" | "competition";
type SortOrder = "asc" | "desc";

interface Company {
  index: number; id: string; shortname: string; fullname: string;
  address: string; description?: string; work?: string;
  studentRegister: number; studentAccepted: number; maxAcceptedStudent: number;
  internshipFiles: { name: string; url: string }[];
  [key: string]: unknown;
}

function stripHtml(html: string) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

/* ─── Live Clock ─── */
function LiveClock({ isDark }: { isDark: boolean }) {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(id); }, []);
  return (
    <div className="flex flex-col items-end leading-tight">
      <span className={`text-sm font-black font-mono tabular-nums ${isDark ? "text-accent" : ""}`}>
        {now.toLocaleTimeString("en-GB")}
      </span>
      <span className="text-[10px] font-mono text-muted-foreground">{now.toLocaleDateString("en-GB")}</span>
    </div>
  );
}

/* ─── Panel block ─── */
function Panel({
  title, icon: Icon, color, tag, children, className = "", overflow = "hidden", isDark = false,
}: {
  title: string; icon?: React.ElementType; color?: string; tag?: string;
  children: React.ReactNode; className?: string; overflow?: string; isDark?: boolean;
}) {
  return (
    <div className={`flex flex-col border-2 ${isDark ? "border-primary/30 bg-card" : "border-foreground bg-background"} ${className}`}
      style={{ overflow }}>
      {/* Header */}
      <div className={`flex items-center gap-2 px-3 py-2 shrink-0 border-b-2 ${isDark ? "border-primary/20 bg-primary/5" : "border-foreground/20 bg-muted/30"}`}
        style={isDark && color ? { borderBottomColor: color + "80" } : {}}>
        <div className="w-2 h-2 shrink-0" style={{ background: color || (isDark ? "hsl(var(--primary))" : "#000") }} />
        {Icon && <Icon size={12} className="shrink-0" style={{ color: color || (isDark ? "hsl(var(--accent))" : "") }} />}
        <span className="text-xs font-bold uppercase tracking-widest flex-1" style={{ color: color || "" }}>{title}</span>
        {tag && (
          <span className={`text-[9px] font-mono px-1.5 py-0.5 border ${isDark ? "border-primary/20 text-muted-foreground" : "border-foreground/20 text-muted-foreground"}`}>
            {tag}
          </span>
        )}
      </div>
      <div className="flex-1 overflow-hidden p-3">{children}</div>
    </div>
  );
}

/* ─── Big Stat Tile ─── */
function StatTile({ label, value, color, sub, isDark = false }: { label: string; value: string | number; color?: string; sub?: string; isDark?: boolean }) {
  return (
    <div className={`p-3 border ${isDark ? "border-primary/15 bg-background/50" : "border-foreground/10 bg-muted/20"}`}>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{label}</div>
      <div className="text-3xl font-black font-sans leading-none" style={{ color }}>{value}</div>
      {sub && <div className="text-[10px] text-muted-foreground mt-0.5 font-mono">{sub}</div>}
    </div>
  );
}

/* ─── Fill bar ─── */
function FillBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="w-full h-1.5 bg-muted/40 overflow-hidden">
      <motion.div className="h-full" style={{ background: color }}
        initial={{ width: 0 }} animate={{ width: `${Math.min(pct, 100)}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }} />
    </div>
  );
}

/* ─── Arc Gauge ─── */
function ArcGauge({ pct, color, label, size = 90 }: { pct: number; color: string; label: string; size?: number }) {
  const r = (size - 14) / 2;
  const circ = 2 * Math.PI * r;
  const arc = circ * 0.75;
  const offset = arc - (Math.min(pct, 100) / 100) * arc;
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: "rotate(135deg)" }}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor"
            strokeOpacity={0.08} strokeWidth={10} strokeDasharray={`${arc} ${circ}`} strokeLinecap="round" />
          <motion.circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color}
            strokeWidth={10} strokeLinecap="round" strokeDasharray={`${arc} ${circ}`}
            initial={{ strokeDashoffset: arc }} animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-base font-black font-sans" style={{ color }}>{pct.toFixed(0)}%</span>
        </div>
      </div>
      <span className="text-[9px] uppercase tracking-widest text-muted-foreground text-center leading-tight">{label}</span>
    </div>
  );
}

/* ─── Top bar chart row ─── */
function TopBarRow({ label, accepted, max, totalMax, isDark }: { label: string; accepted: number; max: number; totalMax: number; isDark: boolean }) {
  const pct = max > 0 ? (accepted / max) * 100 : 0;
  const color = pct >= 100 ? "#ef4444" : pct >= 70 ? "#f59e0b" : "#22c55e";
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-mono text-muted-foreground w-24 truncate shrink-0">{label}</span>
      <div className={`flex-1 relative h-5 ${isDark ? "bg-white/4" : "bg-black/4"}`}>
        <div className="absolute inset-0 right-auto" style={{ width: `${(max / totalMax) * 100}%`, background: color + "15" }} />
        <motion.div className="absolute inset-0 right-auto" style={{ background: color + "aa" }}
          initial={{ width: 0 }} animate={{ width: `${(accepted / totalMax) * 100}%` }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }} />
        <span className="absolute inset-0 flex items-center px-1.5 text-[9px] font-bold font-mono z-10"
          style={{ color: isDark ? "#e8eaf0" : "#111" }}>
          {accepted}/{max}
        </span>
      </div>
      <span className="text-[9px] font-mono font-bold w-8 text-right" style={{ color }}>{pct.toFixed(0)}%</span>
    </div>
  );
}

/* ─── Dist chart ─── */
function DistChart({ companies, isDark }: { companies: Company[]; isDark: boolean }) {
  const bins = useMemo(() => {
    const ranges = [
      { label: "1", min: 1, max: 1, count: 0 },
      { label: "2-3", min: 2, max: 3, count: 0 },
      { label: "4-5", min: 4, max: 5, count: 0 },
      { label: "6-10", min: 6, max: 10, count: 0 },
      { label: "11+", min: 11, max: Infinity, count: 0 },
    ];
    companies.forEach((c) => {
      const r = ranges.find((r) => c.maxAcceptedStudent >= r.min && c.maxAcceptedStudent <= r.max);
      if (r) r.count++;
    });
    return ranges;
  }, [companies]);
  const maxC = Math.max(...bins.map((b) => b.count), 1);
  return (
    <div className="flex items-end gap-1.5 h-16">
      {bins.map((b, i) => (
        <div key={b.label} className="flex-1 flex flex-col items-center gap-0.5" style={{ height: "100%" }}>
          <span className="text-[9px] font-bold text-muted-foreground">{b.count}</span>
          <motion.div className={`w-full ${isDark ? "bg-gradient-to-t from-primary/60 to-accent/50" : "bg-gradient-to-t from-foreground/50 to-foreground/30"}`}
            initial={{ height: 0 }} animate={{ height: `${(b.count / maxC) * 88}%` }}
            transition={{ duration: 0.8, delay: 0.3 + i * 0.08, ease: "easeOut" }}
            style={{ minHeight: b.count > 0 ? 3 : 0 }} />
          <span className="text-[8px] font-mono text-muted-foreground">{b.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Sparkline (fill rate hist) ─── */
function Sparkline({ data, isDark }: { data: number[]; isDark: boolean }) {
  const max = Math.max(...data, 1);
  return (
    <div className="flex items-end gap-1 h-12">
      {data.map((v, i) => (
        <motion.div key={i} className={`flex-1 ${isDark ? "bg-accent/60" : "bg-foreground/40"}`}
          initial={{ height: 0 }} animate={{ height: `${(v / max) * 100}%` }}
          transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }} />
      ))}
    </div>
  );
}

/* ══ CONTENT (must render inside MainLayout → inside ThemeProvider) ══ */
function HcmutInternshipContent() {
  const { theme, language } = useTheme();
  const isDark = theme === "dark";
  const companies = companyData as Company[];

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
  const [sortKey, setSortKey] = useState<SortKey>("index");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [selectedId, setSelectedId] = useState<string>(companies[0]?.id || "");
  const [showSort, setShowSort] = useState(false);

  const stats = useMemo(() => {
    const totalSlots = companies.reduce((s, c) => s + c.maxAcceptedStudent, 0);
    const filledSlots = companies.reduce((s, c) => s + c.studentAccepted, 0);
    const totalReg = companies.reduce((s, c) => s + c.studentRegister, 0);
    const full = companies.filter((c) => c.studentAccepted >= c.maxAcceptedStudent).length;
    const open = companies.filter((c) => c.studentAccepted < c.maxAcceptedStudent).length;
    return {
      totalSlots, filledSlots, totalReg, full, open,
      available: totalSlots - filledSlots,
      fillRate: Math.round((filledSlots / totalSlots) * 100),
      total: companies.length,
    };
  }, [companies]);

  const filtered = useMemo(() => {
    const r = companies.filter((c) => {
      const q = search.toLowerCase();
      const m = !q || c.shortname.toLowerCase().includes(q) || c.fullname.toLowerCase().includes(q) || c.address.toLowerCase().includes(q);
      const isFull = c.studentAccepted >= c.maxAcceptedStudent;
      const s = statusFilter === "all" || (statusFilter === "full" && isFull) || (statusFilter === "available" && !isFull);
      return m && s;
    });
    r.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "index") cmp = a.index - b.index;
      else if (sortKey === "name") cmp = a.shortname.localeCompare(b.shortname);
      else if (sortKey === "slots") cmp = a.maxAcceptedStudent - b.maxAcceptedStudent;
      else if (sortKey === "accepted") cmp = a.studentAccepted - b.studentAccepted;
      else if (sortKey === "fillRate") cmp = (a.studentAccepted / a.maxAcceptedStudent) - (b.studentAccepted / b.maxAcceptedStudent);
      else if (sortKey === "competition") cmp = a.studentRegister - b.studentRegister;
      return sortOrder === "asc" ? cmp : -cmp;
    });
    return r;
  }, [companies, search, statusFilter, sortKey, sortOrder]);

  const selected = useMemo(() => companies.find((c) => c.id === selectedId) || null, [companies, selectedId]);

  const handleSort = useCallback((key: SortKey) => {
    if (sortKey === key) setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortOrder(key === "index" ? "asc" : "desc"); }
  }, [sortKey]);

  const sel = useMemo(() => {
    if (!selected) return null;
    const isFull = selected.studentAccepted >= selected.maxAcceptedStudent;
    const pct = (selected.studentAccepted / selected.maxAcceptedStudent) * 100;
    const remaining = selected.maxAcceptedStudent - selected.studentAccepted;
    const ratio = remaining > 0 ? (selected.studentRegister / remaining).toFixed(1) : "∞";
    const color = isFull ? "#ef4444" : pct >= 70 ? "#f59e0b" : "#22c55e";
    return { isFull, pct, remaining, ratio, color };
  }, [selected]);

  const topCompanies = useMemo(() => [...companies].sort((a, b) => b.maxAcceptedStudent - a.maxAcceptedStudent).slice(0, 10), [companies]);
  const maxSlots = topCompanies[0]?.maxAcceptedStudent || 1;

  const fillRateBins = useMemo(() => {
    const bins = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
    return bins.map((b) => companies.filter((c) => {
      const pct = (c.studentAccepted / c.maxAcceptedStudent) * 100;
      return pct >= b && pct < b + 10;
    }).length);
  }, [companies]);

  return (
    <>
      <div className={`flex flex-col ${isDark ? "hex-pattern" : ""}`}
        style={{ minHeight: "100vh", background: isDark ? "hsl(220 20% 4%)" : "hsl(0 0% 98%)" }}>

        {/* ══ TOP STATUS BAR ══ */}
        <div className={`shrink-0 border-b-2 flex items-center px-4 gap-4 ${isDark ? "border-primary/30 bg-background/90 backdrop-blur-md" : "border-foreground/30 bg-background"}`}
          style={{ height: 48 }}>
          {/* Back + title */}
          <Link to="/utility" className={`flex items-center gap-1.5 text-xs font-mono font-bold group shrink-0 ${isDark ? "text-accent/70 hover:text-accent" : "text-muted-foreground hover:text-foreground"}`}>
            <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
            {t(language, "BACK", "QUAY LẠI")}
          </Link>
          <div className={`w-px h-5 ${isDark ? "bg-primary/20" : "bg-foreground/20"}`} />
          <div className="flex items-center gap-2 shrink-0">
            <GraduationCap size={14} className={isDark ? "text-accent" : ""} />
            <span className={`text-xs font-black font-sans uppercase tracking-wider ${isDark ? "neon-text" : ""}`}>
              {t(language, "HCMUT INTERNSHIP — HK243", "THEO DÕI THỰC TẬP HCMUT — HK243")}
            </span>
          </div>

          {/* Ticker (center) */}
          <div className="flex-1 flex items-center justify-center gap-5 overflow-hidden">
            {[
              { l: t(language, "COMPANIES", "TỔNG DN"), v: stats.total, cls: "" },
              { l: t(language, "TOTAL SLOTS", "TỔNG SLOT"), v: stats.totalSlots, cls: isDark ? "text-accent" : "" },
              { l: t(language, "FILLED", "ĐÃ NHẬN"), v: stats.filledSlots, cls: isDark ? "text-emerald-400" : "text-emerald-600" },
              { l: t(language, "AVAILABLE", "CÒN TRỐNG"), v: stats.available, cls: isDark ? "text-yellow-300" : "text-yellow-600" },
              { l: t(language, "DN FULL", "DN ĐẦY"), v: stats.full, cls: isDark ? "text-red-400" : "text-red-500" },
              { l: t(language, "PENDING", "CHỜ DUYỆT"), v: stats.totalReg, cls: isDark ? "text-primary" : "" },
              { l: t(language, "FILL RATE", "TỶ LỆ ĐẦY"), v: `${stats.fillRate}%`, cls: stats.fillRate > 80 ? (isDark ? "text-red-400" : "text-red-500") : stats.fillRate > 60 ? (isDark ? "text-yellow-300" : "text-yellow-600") : (isDark ? "text-emerald-400" : "text-emerald-600") },
            ].map((s) => (
              <div key={s.l} className="flex flex-col items-center shrink-0">
                <span className="text-[9px] uppercase tracking-widest text-muted-foreground">{s.l}</span>
                <span className={`text-base font-black font-sans leading-tight ${s.cls}`}>{s.v}</span>
              </div>
            ))}
          </div>

          <LiveClock isDark={isDark} />
        </div>

        {/* ══ 3-PANE GRID ══ */}
        <div className="flex-1 grid overflow-hidden"
          style={{ gridTemplateColumns: "310px 1fr 290px", height: "calc(100vh - 48px)" }}>

          {/* ─── LEFT: Company List ─── */}
          <div className={`flex flex-col overflow-hidden border-r-2 ${isDark ? "border-primary/20" : "border-foreground/20"}`}>
            {/* Search + filters */}
            <div className={`shrink-0 p-2.5 border-b-2 space-y-2 ${isDark ? "border-primary/15 bg-background/60" : "border-foreground/15 bg-muted/20"}`}>
              {/* Panel header */}
              <div className={`flex items-center gap-2 px-2 py-1.5 border-b-2 -mx-2.5 -mt-2.5 mb-2 ${isDark ? "border-accent/40 bg-accent/5" : "border-foreground bg-muted/50"}`}>
                <Building2 size={11} className={isDark ? "text-accent" : ""} />
                <span className={`text-xs font-bold uppercase tracking-widest flex-1 ${isDark ? "text-accent" : ""}`}>
                  {t(language, "COMPANY LIST", "DANH SÁCH DN")}
                </span>
                <span className="text-[10px] font-mono text-muted-foreground">{filtered.length}/{companies.length}</span>
              </div>

              {/* Search */}
              <div className={`flex items-center gap-2 px-2 py-1.5 border-2 ${isDark ? "border-primary/20 bg-background/50" : "border-foreground/20"}`}>
                <Search size={11} className="text-muted-foreground" />
                <input value={search} onChange={(e) => setSearch(e.target.value)}
                  placeholder={t(language, "Search...", "Tìm kiếm...")}
                  className="flex-1 bg-transparent outline-none text-xs font-mono placeholder:text-muted-foreground/40" />
              </div>

              {/* Status filter */}
              <div className="flex gap-1.5">
                {(["all", "available", "full"] as FilterStatus[]).map((f) => {
                  const active = statusFilter === f;
                  const fc = f === "full" ? "#ef4444" : f === "available" ? "#22c55e" : undefined;
                  return (
                    <button key={f} onClick={() => setStatusFilter(f)}
                      className={`flex-1 py-1 text-[10px] font-bold uppercase tracking-widest border-2 transition-all ${
                        active
                          ? isDark ? "border-accent bg-accent/10 text-accent" : "border-foreground bg-foreground text-background"
                          : isDark ? "border-primary/15 text-muted-foreground hover:border-primary/40" : "border-foreground/15 text-muted-foreground hover:border-foreground/50"
                      }`}
                      style={active && fc ? { borderColor: fc, color: fc, background: fc + "15" } : {}}>
                      {f === "all" ? t(language, "ALL", "TẤT CẢ") : f === "available" ? t(language, "OPEN", "MỞ") : t(language, "FULL", "ĐẦY")}
                    </button>
                  );
                })}
              </div>

              {/* Sort toggle */}
              <button onClick={() => setShowSort((v) => !v)}
                className={`w-full flex items-center justify-between px-2 py-1 border text-[10px] font-mono ${isDark ? "border-primary/15 text-muted-foreground hover:border-primary/30" : "border-foreground/15 text-muted-foreground hover:border-foreground/40"}`}>
                <span>SORT: {sortKey.toUpperCase()} {sortOrder === "asc" ? "↑" : "↓"}</span>
                {showSort ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
              </button>
              <AnimatePresence>
                {showSort && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden">
                    <div className="flex flex-wrap gap-1 pt-1">
                      {([
                        { k: "index", l: "#" }, { k: "name", l: t(language, "Name", "Tên") },
                        { k: "fillRate", l: "Fill%" }, { k: "slots", l: "Slots" },
                        { k: "accepted", l: t(language, "Accepted", "Đã nhận") },
                        { k: "competition", l: t(language, "Pending", "Chờ") },
                      ] as { k: SortKey; l: string }[]).map((s) => {
                        const active = sortKey === s.k;
                        return (
                          <button key={s.k} onClick={() => handleSort(s.k)}
                            className={`px-2 py-0.5 text-[9px] font-bold uppercase border transition-all ${active ? (isDark ? "border-accent/60 text-accent bg-accent/10" : "border-foreground bg-foreground text-background") : (isDark ? "border-primary/10 text-muted-foreground hover:border-primary/30" : "border-foreground/10 text-muted-foreground hover:border-foreground/30")}`}>
                            {s.l}{active ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Column headers */}
            <div className={`shrink-0 flex gap-2 px-3 py-1.5 border-b-2 ${isDark ? "border-primary/15 bg-primary/5" : "border-foreground/15 bg-muted/30"}`}>
              {[
                { h: "#", w: "w-7" },
                { h: t(language, "COMPANY", "CÔNG TY"), w: "flex-1" },
                { h: "ACC/MAX", w: "w-16 text-right" },
              ].map((col) => (
                <span key={col.h} className={`text-[9px] font-bold uppercase tracking-widest text-muted-foreground ${col.w}`}>{col.h}</span>
              ))}
            </div>

            {/* Rows */}
            <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
              {filtered.map((c, idx) => {
                const isFull = c.studentAccepted >= c.maxAcceptedStudent;
                const pct = (c.studentAccepted / c.maxAcceptedStudent) * 100;
                const statusColor = isFull ? "#ef4444" : pct >= 70 ? "#f59e0b" : "#22c55e";
                const isSelected = selectedId === c.id;
                return (
                  <button key={c.id} onClick={() => setSelectedId(c.id)}
                    className={`w-full px-3 py-2.5 flex items-center gap-2 border-b cursor-pointer transition-all ${
                      isSelected
                        ? isDark ? "bg-primary/10 border-primary/20 border-l-4" : "bg-foreground/5 border-foreground/20 border-l-4"
                        : idx % 2 === 0
                          ? isDark ? "bg-card/40 border-primary/8 border-l-4 border-l-transparent" : "bg-background border-foreground/8 border-l-4 border-l-transparent"
                          : isDark ? "bg-background/30 border-primary/8 border-l-4 border-l-transparent" : "bg-muted/20 border-foreground/8 border-l-4 border-l-transparent"
                    }`}
                    style={{ borderLeftColor: isSelected ? statusColor : "transparent" }}>
                    <span className="text-[10px] font-mono text-muted-foreground w-7 shrink-0 text-left">{c.index}</span>
                    <div className="flex-1 min-w-0 text-left">
                      <div className={`text-sm font-bold truncate leading-tight ${isSelected ? (isDark ? "text-accent" : "text-foreground") : ""}`}
                        style={{ color: isSelected ? statusColor : "" }}>
                        {c.shortname}
                      </div>
                      <div className="mt-0.5">
                        <FillBar pct={pct} color={statusColor} />
                      </div>
                    </div>
                    <div className="shrink-0 text-right w-16">
                      <div className="text-sm font-bold font-mono leading-tight" style={{ color: statusColor }}>
                        {c.studentAccepted}/{c.maxAcceptedStudent}
                      </div>
                      <div className="text-[9px] font-mono" style={{ color: statusColor }}>{pct.toFixed(0)}%</div>
                    </div>
                  </button>
                );
              })}
              {filtered.length === 0 && (
                <div className="flex flex-col items-center justify-center gap-2 p-8 text-muted-foreground opacity-40">
                  <Search size={24} />
                  <p className="text-xs">{t(language, "No results", "Không có kết quả")}</p>
                </div>
              )}
            </div>
          </div>

          {/* ─── CENTER: Company Detail ─── */}
          <div className={`flex flex-col overflow-hidden border-r-2 ${isDark ? "border-primary/20" : "border-foreground/20"}`}>
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ scrollbarWidth: "thin" }}>
              <AnimatePresence mode="wait">
                {selected && sel ? (
                  <motion.div key={selected.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">

                    {/* Company header card */}
                    <div className={`border-2 p-5 relative overflow-hidden`}
                      style={{ borderColor: sel.color + "80", background: sel.color + "06" }}>
                      <div className="relative z-10">
                        {/* Badges row */}
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`text-xs font-mono px-2 py-1 border ${isDark ? "border-primary/30 text-muted-foreground" : "border-foreground/30 text-muted-foreground"}`}>
                            #{String(selected.index).padStart(3, "0")}
                          </span>
                          <span className="text-xs font-black px-3 py-1 border-2 uppercase tracking-wider"
                            style={{ borderColor: sel.color, color: sel.color, background: sel.color + "15" }}>
                            {sel.isFull ? t(language, "● FULL — NO SLOTS", "● ĐÃ ĐẦY — HẾT SLOT") : t(language, "● OPEN — ACCEPTING", "● ĐANG MỞ — NHẬN SV")}
                          </span>
                          {selected.internshipFiles?.length > 0 && (
                            <span className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                              <FileText size={11} className="text-muted-foreground" />{selected.internshipFiles.length} {t(language, "files", "tài liệu")}
                            </span>
                          )}
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="flex-1 min-w-0">
                            {/* BIG company name */}
                            <h2 className="text-2xl font-black font-sans leading-tight mb-1">{selected.shortname}</h2>
                            <p className="text-sm text-muted-foreground mb-2 leading-snug">{selected.fullname}</p>
                            <div className="flex items-start gap-1.5">
                              <MapPin size={12} className="text-muted-foreground mt-0.5 shrink-0" />
                              <span className="text-xs text-muted-foreground leading-relaxed">{selected.address}</span>
                            </div>
                          </div>

                          {/* Arc gauge */}
                          <div className="shrink-0">
                            <ArcGauge pct={sel.pct} color={sel.color} label={t(language, "FILL RATE", "TỶ LỆ ĐẦY")} size={100} />
                          </div>
                        </div>

                        {/* Progress bar */}
                        <div className="mt-4">
                          <div className="flex justify-between items-baseline mb-1.5">
                            <span className="text-base font-bold font-mono">
                              {selected.studentAccepted}
                              <span className="text-sm text-muted-foreground"> / {selected.maxAcceptedStudent} {t(language, "accepted", "đã nhận")}</span>
                            </span>
                            <span className="text-lg font-black font-sans" style={{ color: sel.color }}>{sel.pct.toFixed(1)}%</span>
                          </div>
                          <div className="h-3 bg-muted/40 overflow-hidden">
                            <motion.div className="h-full" style={{ background: sel.color }}
                              initial={{ width: 0 }} animate={{ width: `${Math.min(sel.pct, 100)}%` }}
                              transition={{ duration: 1, ease: "easeOut" }} />
                          </div>
                        </div>

                        {/* 4 big stat tiles */}
                        <div className="grid grid-cols-4 gap-3 mt-4">
                          <StatTile isDark={isDark} label={t(language, "REMAINING", "CÒN LẠI")} value={sel.remaining} color={sel.isFull ? "#ef4444" : "#22c55e"} />
                          <StatTile isDark={isDark} label={t(language, "PENDING REG.", "CHỜ DUYỆT")} value={selected.studentRegister} color="#f59e0b" />
                          <StatTile isDark={isDark}
                            label={t(language, "COMPETITION", "TỶ LỆ CẠNH TRANH")}
                            value={sel.ratio + ":1"}
                            color={Number(sel.ratio) > 2 ? "#ef4444" : Number(sel.ratio) > 1 ? "#f59e0b" : "#22c55e"}
                            sub={t(language, "pending / open slot", "SV / slot trống")} />
                          <StatTile isDark={isDark} label={t(language, "MAX SLOTS", "TỐI ĐA")} value={selected.maxAcceptedStudent}
                            color={isDark ? "hsl(var(--accent))" : ""} />
                        </div>
                      </div>
                    </div>

                    {/* Company profile + files */}
                    <div className="grid grid-cols-2 gap-4">
                      <Panel isDark={isDark} title={t(language, "COMPANY PROFILE", "HỒ SƠ CÔNG TY")} icon={Building2}
                        color={isDark ? "hsl(var(--accent))" : undefined}>
                        {selected.work ? (
                          <p className="text-xs leading-relaxed text-muted-foreground line-clamp-6">
                            {stripHtml(selected.work)}
                          </p>
                        ) : (
                          <p className="text-xs text-muted-foreground italic">{t(language, "No description.", "Chưa có mô tả.")}</p>
                        )}
                        {selected.description && (
                          <div className={`mt-3 p-3 border ${isDark ? "border-yellow-500/25 bg-yellow-500/5" : "border-yellow-400/40 bg-yellow-50"}`}>
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <AlertTriangle size={11} className={isDark ? "text-yellow-400" : "text-yellow-600"} />
                              <span className={`text-[9px] font-bold uppercase tracking-wider ${isDark ? "text-yellow-400" : "text-yellow-700"}`}>
                                {t(language, "NOTICE", "THÔNG BÁO")}
                              </span>
                            </div>
                            <p className={`text-[10px] leading-relaxed ${isDark ? "text-yellow-300/70" : "text-yellow-700"}`}>
                              {stripHtml(selected.description).slice(0, 220)}
                            </p>
                          </div>
                        )}
                      </Panel>

                      <Panel isDark={isDark}
                        title={t(language, `FILES (${selected.internshipFiles?.length || 0})`, `TÀI LIỆU (${selected.internshipFiles?.length || 0})`)}
                        icon={FileText} color="#22c55e">
                        <div className="space-y-1.5 overflow-y-auto max-h-52" style={{ scrollbarWidth: "thin" }}>
                          {selected.internshipFiles?.length > 0 ? selected.internshipFiles.map((f, fi) => {
                            const ext = f.name.split(".").pop()?.toLowerCase() || "";
                            const ec = ext === "pdf" ? "#ef4444" : ext === "docx" || ext === "doc" ? "#4488ff" : "#22c55e";
                            return (
                              <a key={fi} href={`https://internship.cse.hcmut.edu.vn${f.url}`} target="_blank" rel="noopener noreferrer"
                                className={`flex items-center gap-2 p-2 border group transition-all ${isDark ? "border-primary/15 hover:border-primary/40 hover:bg-primary/5" : "border-foreground/10 hover:border-foreground/30 hover:bg-muted/50"}`}
                                style={{ textDecoration: "none" }}>
                                <span className="w-7 h-5 flex items-center justify-center text-[8px] font-black border shrink-0"
                                  style={{ color: ec, borderColor: ec + "50", background: ec + "12" }}>{ext.toUpperCase()}</span>
                                <span className="truncate flex-1 text-[10px] font-mono text-muted-foreground">{f.name}</span>
                                <ExternalLink size={10} className="opacity-0 group-hover:opacity-50 transition-opacity shrink-0 text-muted-foreground" />
                              </a>
                            );
                          }) : <p className="text-xs text-muted-foreground italic">{t(language, "No files uploaded.", "Chưa có tài liệu.")}</p>}
                        </div>
                      </Panel>
                    </div>

                    {/* Analytics strip */}
                    <div className="grid grid-cols-2 gap-4">
                      <Panel isDark={isDark} title={t(language, "FILL RATE DISTRIBUTION", "PHÂN BỔ TỶ LỆ ĐẦY")} icon={Activity} tag="0–100%">
                        <Sparkline data={fillRateBins} isDark={isDark} />
                        <div className="flex justify-between mt-1">
                          {["0%", "25%", "50%", "75%", "100%"].map((l) => (
                            <span key={l} className="text-[8px] font-mono text-muted-foreground">{l}</span>
                          ))}
                        </div>
                      </Panel>

                      <Panel isDark={isDark} title={t(language, "GLOBAL PROGRESS", "TIẾN ĐỘ TỔNG")} icon={TrendingUp}>
                        <div className="space-y-3">
                          {[
                            { l: t(language, "Slots filled", "Slot đã nhận"), v: stats.filledSlots, max: stats.totalSlots, c: "#22c55e" },
                            { l: t(language, "Companies full", "DN đã đầy"), v: stats.full, max: stats.total, c: "#ef4444" },
                            { l: t(language, "Pending registrations", "Chờ duyệt"), v: stats.totalReg, max: Math.max(stats.totalSlots, 1), c: "#f59e0b" },
                          ].map((row) => (
                            <div key={row.l}>
                              <div className="flex justify-between items-baseline mb-1">
                                <span className="text-xs text-muted-foreground">{row.l}</span>
                                <span className="text-sm font-bold font-mono" style={{ color: row.c }}>
                                  {row.v} <span className="text-xs text-muted-foreground font-normal">/ {row.max}</span>
                                </span>
                              </div>
                              <div className="h-2 bg-muted/40 overflow-hidden">
                                <motion.div className="h-full" style={{ background: row.c }}
                                  initial={{ width: 0 }} animate={{ width: `${Math.min((row.v / row.max) * 100, 100)}%` }}
                                  transition={{ duration: 1.1, ease: "easeOut" }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </Panel>
                    </div>

                  </motion.div>
                ) : (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center gap-3 py-20 text-muted-foreground opacity-30">
                    <Building2 size={36} />
                    <p className="text-sm font-mono">{t(language, "SELECT A COMPANY FROM THE LEFT", "CHỌN CÔNG TY TỪ CỘT BÊN TRÁI")}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ─── RIGHT: Analytics ─── */}
          <div className="flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-3 space-y-3" style={{ scrollbarWidth: "thin" }}>

              {/* System Status panel */}
              <Panel isDark={isDark} title={t(language, "SYSTEM STATUS", "TRẠNG THÁI TỔNG")} icon={Activity}
                color={isDark ? "hsl(var(--accent))" : undefined} tag="LIVE">
                <div className="flex justify-around mb-3">
                  <ArcGauge pct={stats.fillRate} size={82}
                    label={t(language, "FILL RATE", "TỶ LỆ ĐẦY")}
                    color={stats.fillRate >= 90 ? "#ef4444" : stats.fillRate >= 70 ? "#f59e0b" : "#22c55e"} />
                  <ArcGauge pct={Math.round((stats.full / stats.total) * 100)} size={82}
                    label={t(language, "DN FULL", "DN ĐÃ ĐẦY")} color="#ef4444" />
                  <ArcGauge pct={Math.round((stats.open / stats.total) * 100)} size={82}
                    label={t(language, "DN OPEN", "DN ĐANG MỞ")} color="#22c55e" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <StatTile isDark={isDark} label={t(language, "TOTAL DN", "TỔNG DN")} value={stats.total} />
                  <StatTile isDark={isDark} label={t(language, "TOTAL SLOTS", "TỔNG SLOT")} value={stats.totalSlots} color={isDark ? "hsl(var(--accent))" : ""} />
                  <StatTile isDark={isDark} label={t(language, "SLOTS FILLED", "ĐÃ NHẬN")} value={stats.filledSlots} color="#22c55e" />
                  <StatTile isDark={isDark} label={t(language, "AVAILABLE", "CÒN TRỐNG")} value={stats.available} color="#f59e0b" />
                </div>
              </Panel>

              {/* Top 10 */}
              <Panel isDark={isDark} title={t(language, "TOP 10 — BY SLOTS", "TOP 10 — THEO SLOT")} icon={BarChart3}>
                <div className="space-y-1">
                  {topCompanies.map((c) => (
                    <TopBarRow key={c.id} label={c.shortname} accepted={c.studentAccepted}
                      max={c.maxAcceptedStudent} totalMax={maxSlots} isDark={isDark} />
                  ))}
                </div>
              </Panel>

              {/* Slot distribution */}
              <Panel isDark={isDark} title={t(language, "SLOT DISTRIBUTION", "PHÂN BỔ SLOT")} icon={BarChart3}>
                <DistChart companies={companies} isDark={isDark} />
                <p className="text-[8px] text-center text-muted-foreground mt-1">
                  {t(language, "max slots per company range", "khoảng slot tối đa / DN")}
                </p>
              </Panel>

              {/* Key Metrics table */}
              <Panel isDark={isDark} title={t(language, "KEY METRICS", "CHỈ SỐ CHÍNH")} icon={Users}>
                <div className="space-y-0.5">
                  {[
                    { l: t(language, "Avg slots / company", "TB slot / DN"), v: (stats.totalSlots / stats.total).toFixed(1) },
                    { l: t(language, "Largest slot (single)", "Slot nhiều nhất (1 DN)"), v: Math.max(...companies.map((c) => c.maxAcceptedStudent)) },
                    { l: t(language, "Most pending (single)", "Chờ nhiều nhất (1 DN)"), v: Math.max(...companies.map((c) => c.studentRegister)) },
                    { l: t(language, "DN with files", "DN có tài liệu"), v: companies.filter((c) => c.internshipFiles?.length > 0).length },
                    { l: t(language, "DN with pending", "DN có SV chờ"), v: companies.filter((c) => c.studentRegister > 0).length },
                    { l: t(language, "DN partially filled", "DN đang nhận (chưa đầy)"), v: companies.filter((c) => c.studentAccepted > 0 && c.studentAccepted < c.maxAcceptedStudent).length },
                    { l: t(language, "Overall fill rate", "Tỷ lệ chung"), v: `${stats.fillRate}%` },
                  ].map((row, i) => (
                    <div key={row.l} className={`flex justify-between items-center py-1.5 px-1 border-b ${isDark ? "border-primary/8" : "border-foreground/8"} ${i % 2 === 0 ? "" : (isDark ? "bg-primary/3" : "bg-muted/10")}`}>
                      <span className="text-xs text-muted-foreground">{row.l}</span>
                      <span className={`text-sm font-black font-mono ${isDark ? "text-accent" : ""}`}>{row.v}</span>
                    </div>
                  ))}
                </div>
              </Panel>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}

/* ══ DEFAULT EXPORT — wraps content inside MainLayout (which provides ThemeProvider) ══ */
export default function HcmutInternship() {
  return (
    <MainLayout>
      <HcmutInternshipContent />
    </MainLayout>
  );
}
