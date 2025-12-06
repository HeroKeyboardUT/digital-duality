import { motion } from 'framer-motion';
import { useTheme, t } from '@/context/ThemeContext';
import { Mail, MapPin, Clock, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { useState } from 'react';

export function ContactSection() {
  const { theme, language } = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  return (
    <section id="contact" className="py-20 px-4 border-t-2 border-foreground">
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
              "Have a project in mind or want to collaborate? I'm always open to discussing new opportunities and ideas.",
              "Có dự án trong đầu hoặc muốn hợp tác? Tôi luôn sẵn sàng thảo luận cơ hội và ý tưởng mới."
            )}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            className="grid-cell"
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
                  theme === 'dark' ? 'hover:shadow-[0_0_20px_hsl(180_100%_50%/0.5)]' : ''
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
              className="grid-cell"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="label-text mb-3">{t(language, 'CONTACT INFO', 'THÔNG TIN LIÊN HỆ')}</div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail size={16} className={theme === 'dark' ? 'text-accent' : ''} />
                  <div>
                    <div className="text-[10px] text-muted-foreground">{t(language, 'EMAIL', 'EMAIL')}</div>
                    <a href="mailto:hello@daominhquan.dev" className="text-sm hover:underline">
                      hello@daominhquan.dev
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin size={16} className={theme === 'dark' ? 'text-accent' : ''} />
                  <div>
                    <div className="text-[10px] text-muted-foreground">{t(language, 'LOCATION', 'VỊ TRÍ')}</div>
                    <div className="text-sm">Hanoi, Vietnam</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock size={16} className={theme === 'dark' ? 'text-accent' : ''} />
                  <div>
                    <div className="text-[10px] text-muted-foreground">{t(language, 'TIMEZONE', 'MÚI GIỜ')}</div>
                    <div className="text-sm">UTC+7 (ICT) • 09:00 - 18:00</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="grid-cell"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="label-text mb-3">{t(language, 'CONNECT', 'KẾT NỐI')}</div>
              
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Github, label: 'GitHub', handle: '@daominhquan', href: '#' },
                  { icon: Linkedin, label: 'LinkedIn', handle: '/in/daominhquan', href: '#' },
                  { icon: Twitter, label: 'Twitter', handle: '@dmqdev', href: '#' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className={`flex flex-col items-center p-3 border border-foreground/30 hover:border-foreground transition-colors ${
                      theme === 'dark' ? 'hover:border-accent hover:shadow-[0_0_10px_hsl(180_100%_50%/0.3)]' : ''
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
              className="grid-cell"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="status-online" />
                <span className="label-text">{t(language, 'CURRENT AVAILABILITY', 'SẴN SÀNG HIỆN TẠI')}</span>
              </div>
              
              <p className="text-sm font-bold mb-2">
                {t(language, 'Open for Projects', 'Đang Nhận Dự Án')}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {t(language,
                  'Q1 2025 slots available. Interested in full-time opportunities, consulting, or freelance projects.',
                  'Còn slot Q1 2025. Quan tâm đến cơ hội toàn thời gian, tư vấn, hoặc dự án freelance.'
                )}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
