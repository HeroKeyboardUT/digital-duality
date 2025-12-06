import { motion } from 'framer-motion';
import { useTheme, t } from '@/context/ThemeContext';
import { Mail, MapPin, Clock, Send, Github, Linkedin, Phone } from 'lucide-react';
import { useState } from 'react';

export function ContactSection() {
  const { theme, language } = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Open email client with pre-filled data
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:phamquanghieulop95@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className={`py-20 px-4 border-t-2 border-foreground ${theme === 'dark' ? 'hex-pattern' : ''}`}>
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="label-text mb-2">04 // {t(language, 'CONTACT', 'LIÊN HỆ')}</div>
          <h2 className={`text-4xl sm:text-5xl font-sans font-black mb-4 ${theme === 'dark' ? 'neon-text' : ''}`}>
            {t(language, 'GET IN TOUCH', 'LIÊN LẠC')}
          </h2>
          <p className="text-sm max-w-2xl">
            {t(language,
              "Looking for an internship opportunity to improve my skills and gain experience. Feel free to reach out!",
              "Đang tìm kiếm cơ hội thực tập để nâng cao kỹ năng và tích lũy kinh nghiệm. Hãy liên hệ với tôi!"
            )}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            className={`grid-cell ${theme === 'dark' ? 'glow-border' : ''}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="label-text mb-4">{t(language, 'SEND A MESSAGE', 'GỬI TIN NHẮN')}</div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] block mb-1">{t(language, 'NAME', 'TÊN')}</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full bg-transparent border-2 border-foreground px-3 py-2 text-sm focus:outline-none ${
                    theme === 'dark' ? 'focus:border-accent focus:shadow-[0_0_10px_hsl(120_100%_50%/0.3)]' : ''
                  }`}
                  placeholder={t(language, 'Your name', 'Tên của bạn')}
                  required
                />
              </div>
              
              <div>
                <label className="text-[10px] block mb-1">{t(language, 'EMAIL', 'EMAIL')}</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full bg-transparent border-2 border-foreground px-3 py-2 text-sm focus:outline-none ${
                    theme === 'dark' ? 'focus:border-accent focus:shadow-[0_0_10px_hsl(120_100%_50%/0.3)]' : ''
                  }`}
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div>
                <label className="text-[10px] block mb-1">{t(language, 'MESSAGE', 'TIN NHẮN')}</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full bg-transparent border-2 border-foreground px-3 py-2 text-sm focus:outline-none resize-none ${
                    theme === 'dark' ? 'focus:border-accent focus:shadow-[0_0_10px_hsl(120_100%_50%/0.3)]' : ''
                  }`}
                  rows={5}
                  placeholder={t(language, 'Your message...', 'Tin nhắn của bạn...')}
                  required
                />
              </div>

              <motion.button
                type="submit"
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-foreground font-bold text-sm hover:bg-foreground hover:text-background transition-colors ${
                  theme === 'dark' ? 'cyber-btn' : ''
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send size={16} />
                {t(language, 'SEND MESSAGE', 'GỬI TIN NHẮN')}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <div className="space-y-4">
            {/* Quick Info Cards */}
            <motion.div
              className={`grid-cell ${theme === 'dark' ? 'glow-border' : ''}`}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="label-text mb-3">{t(language, 'CONTACT INFO', 'THÔNG TIN LIÊN HỆ')}</div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail size={16} className={theme === 'dark' ? 'text-accent shrink-0' : 'shrink-0'} />
                  <div>
                    <div className="text-[10px] text-muted-foreground">{t(language, 'EMAIL', 'EMAIL')}</div>
                    <a href="mailto:phamquanghieulop95@gmail.com" className="text-sm hover:underline">
                      phamquanghieulop95@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone size={16} className={theme === 'dark' ? 'text-accent shrink-0' : 'shrink-0'} />
                  <div>
                    <div className="text-[10px] text-muted-foreground">{t(language, 'PHONE', 'ĐIỆN THOẠI')}</div>
                    <a href="tel:0397961039" className="text-sm hover:underline">0397961039</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin size={16} className={theme === 'dark' ? 'text-accent shrink-0' : 'shrink-0'} />
                  <div>
                    <div className="text-[10px] text-muted-foreground">{t(language, 'LOCATION', 'VỊ TRÍ')}</div>
                    <div className="text-sm">Bien Hoa City, Vietnam</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock size={16} className={theme === 'dark' ? 'text-accent shrink-0' : 'shrink-0'} />
                  <div>
                    <div className="text-[10px] text-muted-foreground">{t(language, 'TIMEZONE', 'MÚI GIỜ')}</div>
                    <div className="text-sm">UTC+7 (ICT)</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className={`grid-cell ${theme === 'dark' ? 'glow-border' : ''}`}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="label-text mb-3">{t(language, 'CONNECT', 'KẾT NỐI')}</div>
              
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Github, label: 'GitHub', handle: '@HeroKeyboardUT', href: 'https://github.com/HeroKeyboardUT' },
                  { icon: Linkedin, label: 'LinkedIn', handle: '/phamquanghieuutcs', href: 'https://www.linkedin.com/in/phamquanghieuutcs/' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center p-3 border border-foreground/30 hover:border-foreground transition-all ${
                      theme === 'dark' ? 'hover:border-accent hover:shadow-[0_0_10px_hsl(180_100%_50%/0.3)]' : 'hover:bg-foreground hover:text-background'
                    }`}
                  >
                    <social.icon size={20} className="mb-2" />
                    <div className="text-[10px] font-bold">{social.label}</div>
                    <div className="text-[8px] text-muted-foreground">{social.handle}</div>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div
              className={`grid-cell ${theme === 'dark' ? 'glow-border' : ''}`}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="status-online" />
                <span className="label-text">{t(language, 'CURRENT STATUS', 'TRẠNG THÁI HIỆN TẠI')}</span>
              </div>
              
              <p className={`text-sm font-bold mb-2 ${theme === 'dark' ? 'text-flicker' : ''}`}>
                {t(language, 'Looking for Internship', 'Đang Tìm Thực Tập')}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {t(language,
                  'Seeking internship opportunities to improve skills and gain experience in software development.',
                  'Tìm kiếm cơ hội thực tập để nâng cao kỹ năng và tích lũy kinh nghiệm trong phát triển phần mềm.'
                )}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}