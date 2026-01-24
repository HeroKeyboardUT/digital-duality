import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import { useTheme, t } from "@/context/ThemeContext";
import { profileInfo, contactInfo, socialLinks } from "@/data";
import hcmutLogo from "@/assets/hcmut-logo.png";

const iconMap: Record<string, any> = { Mail, Phone, MapPin, Github, Linkedin };

export function CVHeader() {
  const { theme, language } = useTheme();

  const contactBadges = [
    {
      icon: Mail,
      text: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
    },
    { icon: Phone, text: contactInfo.phone, href: `tel:${contactInfo.phone}` },
    {
      icon: MapPin,
      text: language === "en" ? contactInfo.location : contactInfo.locationVn,
      href: "#",
    },
  ];

  const cvSocialLinks = socialLinks
    .filter((link) => link.icon === "Github" || link.icon === "Linkedin")
    .map((link) => ({ ...link, IconComponent: iconMap[link.icon] }));

  return (
    <motion.header
      className="relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated background gradient */}
      <div
        className={`absolute inset-0 ${
          theme === "dark"
            ? "bg-gradient-to-br from-background via-card to-secondary"
            : "bg-gradient-to-br from-background via-secondary/30 to-muted"
        }`}
      />

      {/* Floating particles for dark mode */}
      {theme === "dark" && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full"
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
      )}

      <div className="relative z-10 p-6 md:p-10">
        <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
          {/* Avatar section with 3D effect */}
          <motion.div
            className="relative group"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div
              className={`w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden border-4 
              ${theme === "dark" ? "border-primary glow-border" : "border-foreground shadow-xl"}`}
            >
              <img
                src={hcmutLogo}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Status indicator */}
            <motion.div
              className={`absolute -bottom-2 -right-2 px-3 py-1 text-xs font-bold uppercase
                ${
                  theme === "dark"
                    ? "bg-accent text-accent-foreground neon-text"
                    : "bg-foreground text-background"
                }`}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {t(language, "Open to Work", "Sẵn Sàng Làm Việc")}
            </motion.div>
          </motion.div>

          {/* Main info */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1
                className={`text-4xl md:text-6xl font-black uppercase tracking-tight mb-2
                ${theme === "dark" ? "text-gradient" : "text-gradient-light"}`}
              >
                {profileInfo.name.toUpperCase()}
              </h1>
              <div
                className={`text-lg md:text-xl uppercase tracking-[0.3em] mb-4
                ${theme === "dark" ? "text-accent" : "text-muted-foreground"}`}
              >
                {language === "en" ? profileInfo.title : profileInfo.titleVn}
              </div>
            </motion.div>

            {/* Contact badges */}
            <motion.div
              className="flex flex-wrap gap-3 justify-center lg:justify-start mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {contactBadges.map((badge, idx) => (
                <motion.a
                  key={idx}
                  href={badge.href}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs border-2
                    ${
                      theme === "dark"
                        ? "border-primary/50 hover:border-primary hover:bg-primary/10"
                        : "border-foreground/30 hover:border-foreground hover:bg-foreground hover:text-background"
                    }
                    transition-all duration-300`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <badge.icon size={12} />
                  <span>{badge.text}</span>
                </motion.a>
              ))}
            </motion.div>

            {/* Social links */}
            <motion.div
              className="flex gap-3 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {cvSocialLinks.map((link, idx) => (
                <motion.a
                  key={idx}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 border-2 
                    ${
                      theme === "dark"
                        ? "border-primary/50 hover:border-accent hover:bg-accent/10"
                        : "border-foreground/30 hover:border-foreground hover:bg-foreground hover:text-background"
                    }
                    transition-all duration-300`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <link.IconComponent size={18} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Status card */}
          <motion.div
            className={`p-4 border-2 min-w-[200px]
              ${theme === "dark" ? "border-primary/50 bg-card/50 backdrop-blur" : "border-foreground bg-background"}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
              {t(language, "Current Status", "Trạng Thái")}
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${theme === "dark" ? "bg-accent animate-pulse" : "bg-foreground"}`}
                />
                <span className="text-sm">
                  {t(language, "Available for Internship", "Sẵn sàng thực tập")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${theme === "dark" ? "bg-primary" : "bg-muted-foreground"}`}
                />
                <span className="text-sm">
                  {t(language, "Year 3 Student", "Sinh viên năm 3")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${theme === "dark" ? "bg-primary" : "bg-muted-foreground"}`}
                />
                <span className="text-sm">GPA: {profileInfo.gpa}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative bottom border */}
      <div
        className={`h-1 ${theme === "dark" ? "holographic-border" : "bg-foreground"}`}
      />
    </motion.header>
  );
}
