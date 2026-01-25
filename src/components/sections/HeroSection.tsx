import { motion } from "framer-motion";
import { useTheme, t } from "@/context/ThemeContext";
import {
  ArrowDown,
  Github,
  Linkedin,
  Mail,
  Phone,
  Sparkles,
  Zap,
} from "lucide-react";
import hcmutLogo from "@/assets/hcmut-logo.png";

export function HeroSection() {
  const { theme, language } = useTheme();

  return (
    <section
      id="hero"
      className="min-h-[90vh] flex flex-col justify-center relative py-20 px-4 overflow-hidden"
    >
      {/* Background Effects for Cyber Mode */}
      {theme === "dark" && (
        <>
          <div className="absolute inset-0 hex-pattern pointer-events-none" />
          <div className="scan-line" />
          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Light mode decorative elements */}
      {theme === "light" && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-64 h-64 border-2 border-foreground/5 rotate-45" />
          <div className="absolute bottom-20 left-20 w-48 h-48 border-2 border-foreground/5 -rotate-12" />
        </div>
      )}

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute inset-0 ${theme === "dark" ? "opacity-5" : "opacity-[0.02]"}`}
        >
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute border-foreground/20"
              style={{
                left: `${(i % 10) * 10}%`,
                top: `${Math.floor(i / 10) * 50}%`,
                width: "1px",
                height: "100%",
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-[1fr,auto] gap-12 items-center border-b-2">
          {/* Left Content */}
          <div>
            {/* Top Labels */}
            <motion.div
              className="flex flex-wrap items-center gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span
                className={`label-text ${theme === "dark" ? "text-flicker" : ""}`}
              >
                {t(language, "PORTFOLIO // 2024", "HỒ SƠ // 2024")}
              </span>
              <span className="label-text">HCMUT // CS</span>
              <span className="label-text">LOCATION: BIEN HOA, VIETNAM</span>
              <span className=" text-black">Website is still updating...</span>
            </motion.div>

            {/* Main Title */}
            <motion.div
              className="mb-8 border-y-2 py-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1
                className={`font-sans font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.85] mb-4 ${
                  theme === "dark" ? "neon-text glitch" : "text-gradient-light"
                }`}
                data-text="HIEUDZ"
              >
                HIEU
                <span className={theme === "dark" ? "text-accent" : ""}>
                  DZ
                </span>
              </h1>
              <div
                className={`text-lg pl-2 sm:text-xl font-mono flex items-center gap-2 ${theme === "dark" ? "text-primary cursor-blink" : ""}`}
              >
                {theme === "dark" && (
                  <Zap size={16} className="text-accent animate-pulse" />
                )}
                {t(language, "Pham Quang Hieu", "Phạm Quang Hiếu")}
                {theme === "light" && (
                  <Sparkles size={16} className="text-muted-foreground" />
                )}
              </div>
            </motion.div>

            {/* Subtitle & Description */}
            <motion.div
              className="mb-12 border-l-2 pl-8 ml-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2
                className={`text-xl sm:text-2xl font-sans font-bold mb-4 ${theme === "dark" ? "typing-effect" : ""}`}
              >
                {t(
                  language,
                  "Computer Science Student",
                  "Sinh Viên Khoa Học Máy Tính",
                )}
                <br />
                <span
                  className={
                    theme === "dark" ? "text-accent" : "text-muted-foreground"
                  }
                >
                  @ {t(language, "HCMUT (Bach Khoa)", "ĐH Bách Khoa TP.HCM")}
                </span>
              </h2>
              <p
                className={`text-sm leading-relaxed max-w-md ${theme === "dark" ? "text-muted-foreground" : ""}`}
              >
                {t(
                  language,
                  "I'm a developer currently studying at Ho Chi Minh City University of Technology. I'm interested in Computer Science and I'm looking for an internship to improve my skills and gain more experience.",
                  "Tôi là lập trình viên đang học tại Đại học Bách Khoa TP.HCM. Tôi quan tâm đến Khoa học Máy tính và đang tìm kiếm cơ hội thực tập để nâng cao kỹ năng và tích lũy kinh nghiệm.",
                )}
              </p>

              <div
                className={`${theme === "dark" ? "grid-cell glow-border" : "grid-cell hover-lift"} mt-6`}
              >
                <div className="label-text mb-2">
                  {t(language, "QUICK INFO", "THÔNG TIN")}
                </div>
                <ul className="text-xs space-y-1">
                  <li>
                    <span className="text-muted-foreground">School Year:</span>{" "}
                    2023-2027
                  </li>
                  <li>
                    <span className="text-muted-foreground">Major:</span>{" "}
                    Computer Science
                  </li>
                  <li>
                    <span className="text-muted-foreground">Address:</span> Bien
                    Hoa City
                  </li>
                  <li>
                    <span className="text-muted-foreground">GPA:</span> 3.5 /
                    4.0
                  </li>
                </ul>
              </div>

              <div className="flex gap-3 mt-6">
                {[
                  {
                    icon: Github,
                    label: "GitHub",
                    href: "https://github.com/HeroKeyboardUT",
                  },
                  {
                    icon: Linkedin,
                    label: "LinkedIn",
                    href: "https://www.linkedin.com/in/phamquanghieuutcs/",
                  },
                  { icon: Phone, label: "Phone", href: "tel:0397961039" },
                  {
                    icon: Mail,
                    label: "Email",
                    href: "mailto:phamquanghieulop95@gmail.com",
                  },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={
                      social.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      social.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className={`p-3 border-2 border-foreground transition-all ${
                      theme === "dark"
                        ? "cyber-btn hover:shadow-[0_0_30px_hsl(var(--neon-cyan))]"
                        : "hover:bg-foreground hover:text-background hover-lift"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Side - Large Logo */}
          <motion.div
            className="hidden lg:flex justify-center -mt-16 border-y-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className={`relative ${theme === "dark" ? "logo-glow" : ""}`}>
              {/* Background glow effect for dark mode */}
              {theme === "dark" && (
                <div className="absolute inset-0 blur-3xl opacity-30">
                  <div className="w-full h-full bg-gradient-to-br from-primary via-accent to-primary rounded-full" />
                </div>
              )}

              {/* Decorative border frame */}
              <div
                className={`absolute -inset-4 ${
                  theme === "dark"
                    ? "border-2 border-primary/30 animate-pulse"
                    : "border-2 border-foreground/10"
                }`}
              >
                <div
                  className={`absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 ${theme === "dark" ? "border-accent" : "border-foreground"}`}
                />
                <div
                  className={`absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 ${theme === "dark" ? "border-accent" : "border-foreground"}`}
                />
                <div
                  className={`absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 ${theme === "dark" ? "border-accent" : "border-foreground"}`}
                />
                <div
                  className={`absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 ${theme === "dark" ? "border-accent" : "border-foreground"}`}
                />
              </div>

              <motion.img
                src={hcmutLogo}
                alt="HCMUT Logo"
                className={`w-72 h-72 md:w-96 md:h-96 object-contain relative z-10 ${
                  theme === "dark"
                    ? "filter brightness-110 drop-shadow-[0_0_30px_hsl(var(--neon-cyan)/0.5)]"
                    : "opacity-90"
                }`}
                animate={
                  theme === "dark"
                    ? {
                        filter: [
                          "brightness(1.1) drop-shadow(0 0 30px hsl(180 100% 50% / 0.5))",
                          "brightness(1.2) drop-shadow(0 0 50px hsl(180 100% 50% / 0.7))",
                          "brightness(1.1) drop-shadow(0 0 30px hsl(180 100% 50% / 0.5))",
                        ],
                      }
                    : {}
                }
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* Orbiting elements for dark mode */}
              {theme === "dark" && (
                <>
                  <motion.div
                    className="absolute w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_hsl(var(--neon-cyan))]"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      transformOrigin: "192px 192px",
                      left: "50%",
                      top: "0",
                    }}
                  />
                  <motion.div
                    className="absolute w-2 h-2 bg-accent rounded-full shadow-[0_0_10px_hsl(var(--neon-green))]"
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 12,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      transformOrigin: "220px 220px",
                      left: "50%",
                      top: "50%",
                    }}
                  />
                </>
              )}

              {/* Label under logo */}
              <div
                className={`absolute -bottom-8 left-1/2 -translate-x-1/2 text-center ${
                  theme === "dark" ? "text-primary/70" : "text-muted-foreground"
                }`}
              >
                <div className="text-[8px] tracking-widest">VNU-HCM</div>
                <div className="text-[10px] font-bold">BACH KHOA</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1, y: { repeat: Infinity, duration: 1.5 } }}
      >
        <ArrowDown
          size={24}
          className={theme === "dark" ? "text-primary neon-text" : ""}
        />
      </motion.div>
    </section>
  );
}
