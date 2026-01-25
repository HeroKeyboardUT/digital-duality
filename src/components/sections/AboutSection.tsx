import { motion } from "framer-motion";
import { useTheme, t } from "@/context/ThemeContext";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const techData = [
  {
    category: "LANGUAGES",
    items: ["C++", "C", "Python", "Java", "JavaScript", "TypeScript"],
  },
  { category: "FRONTEND", items: ["ReactJS", "TailwindCSS", "HTML", "CSS"] },
  { category: "BACKEND", items: ["NodeJS", "ExpressJS", "FastAPI"] },
  { category: "DATABASE", items: ["MySQL", "MongoDB", "PostgreSQL"] },
  { category: "TOOLS", items: ["Git", "Postman", "Figma", "Canva", "LaTeX"] },
  { category: "AI/ML", items: ["TensorFlow", "CNN", "Deep Learning"] },
];

const skills = [
  {
    category: "Programming Languages",
    categoryVn: "Ngôn Ngữ Lập Trình",
    desc: "C++, C, Python, Java, HTML, CSS, JavaScript, TypeScript. Foundation in algorithm implementation and problem-solving.",
    descVn:
      "C++, C, Python, Java, HTML, CSS, JavaScript, TypeScript. Nền tảng vững về thuật toán và giải quyết vấn đề.",
  },
  {
    category: "Frameworks & Tools",
    categoryVn: "Frameworks & Công Cụ",
    desc: "ReactJS, ExpressJS, NodeJS, TailwindCSS. Familiar with Postman and various UI libraries.",
    descVn:
      "ReactJS, ExpressJS, NodeJS, TailwindCSS. Quen thuộc với Postman và nhiều thư viện UI.",
  },
  {
    category: "Technical Knowledge",
    categoryVn: "Kiến Thức Kỹ Thuật",
    desc: "OOP, Data Structures & Algorithms, Operating Systems, Database Design, Computer Architecture, Neural Networks, CNN.",
    descVn:
      "OOP, Cấu trúc dữ liệu & Thuật toán, Hệ điều hành, Thiết kế CSDL, Kiến trúc máy tính, Mạng Neural, CNN.",
  },
  {
    category: "Soft Skills",
    categoryVn: "Kỹ Năng Mềm",
    desc: "Teamwork, Time Management, Self-Motivated Learner, Critical Thinking.",
    descVn: "Làm việc nhóm, Quản lý thời gian, Tự học, Tư duy phản biện.",
  },
];

export function AboutSection() {
  const { theme, language } = useTheme();

  return (
    <section
      id="about"
      className={`py-20 px-4 border-t-2 border-foreground ${theme === "dark" ? "hex-pattern" : ""}`}
    >
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="label-text mb-2">
            01 // {t(language, "ABOUT", "GIỚI THIỆU")}
          </div>
          <h2
            className={`text-4xl sm:text-5xl font-sans font-black ${theme === "dark" ? "neon-text" : ""}`}
          >
            {t(language, "WHO I AM", "TÔI LÀ AI")}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 border-t-2">
          {/* Left: Bio & Education */}
          <div>
            <motion.div
              className={`border-b-2 py-4 pl-4 ${theme === "dark" ? "glow-border" : ""}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="label-text mb-3">
                {t(language, "BIOGRAPHY", "TIỂU SỬ")}
              </div>
              <p className="text-sm leading-relaxed mb-4 border-l-2 pl-4 ml-4">
                {t(
                  language,
                  "I'm Pham Quang Hieu (HieuDZ), a Computer Science student from Ho Chi Minh City University of Technology (HCMUT/Bach Khoa). I'm passionate about developing real-world applications, exploring AI, Big Data, and System Design.",
                  "Tôi là Phạm Quang Hiếu (HieuDZ), sinh viên Khoa học Máy tính tại Đại học Bách Khoa TP.HCM. Tôi đam mê phát triển ứng dụng thực tế, khám phá AI, Big Data và Thiết kế Hệ thống.",
                )}
              </p>
              <p className="text-sm leading-relaxed border-l-2 pl-4 ml-4">
                {t(
                  language,
                  "The period of studying at my University has helped me acquire a solid foundation in mathematics and fundamentals of computer science. It has also enhanced my self-teaching abilities and provided excellent preparation for learning anything my work requires.",
                  "Thời gian học tại trường giúp tôi có nền tảng vững chắc về toán học và cơ sở khoa học máy tính. Đồng thời nâng cao khả năng tự học và chuẩn bị tốt cho việc học bất cứ điều gì công việc yêu cầu.",
                )}
              </p>
            </motion.div>

            {/* Education */}
            <motion.div
              className={`p-4 border-b-2 ${theme === "dark" ? "glow-border" : ""}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="label-text mb-3">
                {t(language, "EDUCATION", "HỌC VẤN")}
              </div>
              <h3
                className={`font-sans font-bold text-sm mb-2 ${theme === "dark" ? "text-flicker" : ""}`}
              >
                VNU-HCM University of Technology
              </h3>
              <div
                className={`text-xs mb-2 ${theme === "dark" ? "text-accent" : "text-muted-foreground"}`}
              >
                2023 - 2027 | Bachelor of Computer Science
              </div>
              <div
                className={`text-lg font-bold ${theme === "dark" ? "text-primary" : ""}`}
              >
                GPA: 3.5 / 4.0
              </div>
            </motion.div>

            {/* Skills Categories */}
            <div className="space-y-4 p-4">
              <div className="label-text">
                {t(language, "SKILLS", "KỸ NĂNG")}
              </div>
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.category}
                  className={`ml-4 grid-cell pl-4 ${theme === "dark" ? "" : ""}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <h4
                    className={`font-sans font-bold text-xs mb-1 ${theme === "dark" ? "text-accent" : ""}`}
                  >
                    {t(language, skill.category, skill.categoryVn)}
                  </h4>
                  <p className="text-[10px] text-muted-foreground">
                    {t(language, skill.desc, skill.descVn)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Tech Stack */}
          <motion.div
            className={`p-4 h-fit ${theme === "dark" ? "glow-border" : ""}`}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="label-text mb-4">
              {t(language, "TECHNICAL ARSENAL", "KHO VŨ KHÍ KỸ THUẬT")}
            </div>

            <div className="space-y-4 border-l-2 pl-4 py-4 ml-4 ">
              {techData.map((group, idx) => (
                <div key={group.category}>
                  <div className="text-[10px] font-bold mb-2 flex items-center gap-2">
                    <span className={theme === "dark" ? "text-primary" : ""}>
                      {group.category}
                    </span>
                    <div className="flex-1 border-t border-foreground/20" />
                  </div>
                  <div className="flex flex-wrap gap-2 ml-4">
                    {group.items.map((item, i) => (
                      <motion.span
                        key={item}
                        className={`px-2 py-1 text-[10px] border border-foreground/50 transition-all cursor-default ${
                          theme === "dark"
                            ? "hover:border-accent hover:text-accent hover:shadow-[0_0_10px_hsl(120_100%_50%/0.3)]"
                            : "hover:bg-foreground hover:text-background"
                        }`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 + i * 0.02 }}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Skill Bars */}
            <div className="mt-6 pt-4 pl-4 border-t border-b pb-6 border-foreground/30">
              <div className="label-text mb-3">
                {t(language, "PROFICIENCY LEVELS", "MỨC ĐỘ THÀNH THẠO")}
              </div>
              <div className="space-y-3">
                {[
                  {
                    skill: "Frontend Development",
                    skillVn: "Phát Triển Frontend",
                    level: 85,
                  },
                  {
                    skill: "Backend Engineering",
                    skillVn: "Kỹ Thuật Backend",
                    level: 75,
                  },
                  {
                    skill: "Database Design",
                    skillVn: "Thiết Kế Database",
                    level: 70,
                  },
                  {
                    skill: "AI/Deep Learning",
                    skillVn: "AI/Deep Learning",
                    level: 60,
                  },
                  {
                    skill: "Problem Solving",
                    skillVn: "Giải Quyết Vấn Đề",
                    level: 80,
                  },
                ].map((item, i) => (
                  <div key={item.skill}>
                    <div className="flex justify-between text-[10px] mb-1">
                      <span>{t(language, item.skill, item.skillVn)}</span>
                      <span className={theme === "dark" ? "text-accent" : ""}>
                        {item.level}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-foreground/10 overflow-hidden">
                      <motion.div
                        className={`h-full ${theme === "dark" ? "bg-primary shadow-[0_0_10px_hsl(180_100%_50%/0.5)]" : "bg-foreground"}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <motion.div
              className="mt-8 flex flex-wrap gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Link to="/projects">
                <motion.span
                  className={`flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase border-2
                ${
                  theme === "dark"
                    ? "border-primary hover:bg-primary/20"
                    : "border-foreground hover:bg-foreground hover:text-background"
                }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t(language, "View All Projects", "Xem Tất Cả Dự Án")}
                  <ArrowRight size={16} />
                </motion.span>
              </Link>
              <Link to="/blog">
                <motion.span
                  className={`flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase border-2
                ${
                  theme === "dark"
                    ? "border-accent hover:bg-accent/20 text-accent"
                    : "border-foreground bg-foreground text-background hover:bg-foreground/80"
                }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t(language, "Knowledge Base", "Kiến Thức")}
                  <ArrowRight size={16} />
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
