import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const { t, i18n } = useTranslation();
  const isMarathi = i18n.language === 'mr';
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1200));
    setSending(false);
    toast.success(
      isMarathi ? 'संदेश यशस्वीरित्या पाठवला!' : 'Message sent successfully! We\'ll respond within 24 hours.',
      { style: { background: '#FFF8E7', border: '1px solid #D4921C', color: '#3d1a0a' }, icon: '✦', duration: 4000 }
    );
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: t('our_address'),
      lines: [isMarathi ? 'मुख्य रस्ता, सातारा' : 'Main Road, Satara', isMarathi ? 'महाराष्ट्र - ४१५ ००१' : 'Maharashtra - 415 001'],
    },
    {
      icon: Phone,
      title: t('call_us'),
      lines: ['+91 98765 43210', '+91 02162 123456'],
    },
    {
      icon: Mail,
      title: t('email_us'),
      lines: ['info@mahalaxmijwellers.com', 'orders@mahalaxmijwellers.com'],
    },
    {
      icon: Clock,
      title: t('hours'),
      lines: [isMarathi ? 'सोमवार - शनिवार: सकाळी १० - रात्री ८' : 'Monday - Saturday: 10am - 8pm', isMarathi ? 'रविवार: सकाळी ११ - दुपारी ५' : 'Sunday: 11am - 5pm'],
    },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <section className="bg-festive-gradient py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4921C'%3E%3Cpath d='M30 0L31 29L60 30L31 31L30 60L29 31L0 30L29 29Z'/%3E%3C/g%3E%3C/svg%3E")` }}
        />
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-5xl text-gold-200 relative z-10">
          {t('contact_title')}
        </motion.h1>
        <p className="text-gold-400 mt-3 relative z-10">{t('contact_subtitle')}</p>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="font-display text-2xl text-maroon-700 mb-8">
              {isMarathi ? 'आमच्याशी संपर्क साधा' : 'Get In Touch'}
            </h2>

            <div className="space-y-6 mb-10">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 bg-white border border-gold-200 p-5"
                >
                  <div className="w-12 h-12 bg-maroon-50 flex items-center justify-center shrink-0">
                    <info.icon size={20} className="text-maroon-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-maroon-700 mb-1">{info.title}</h3>
                    {info.lines.map((line, j) => (
                      <p key={j} className="text-gray-500 text-sm">{line}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <motion.a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-3 bg-green-600 text-white px-6 py-4 font-semibold tracking-wider w-full text-center hover:bg-green-700 transition-colors"
            >
              <span className="text-xl">💬</span>
              {isMarathi ? 'WhatsApp वर संदेश पाठवा' : 'Chat on WhatsApp'}
            </motion.a>

            {/* Map placeholder */}
            <div className="mt-6 bg-gold-100 border border-gold-200 h-48 flex items-center justify-center text-gold-500">
              <div className="text-center">
                <MapPin size={32} className="mx-auto mb-2" />
                <p className="text-sm">{isMarathi ? 'मुख्य रस्ता, सातारा, महाराष्ट्र' : 'Main Road, Satara, Maharashtra'}</p>
                <a
                  href="https://maps.google.com/?q=Satara,Maharashtra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-maroon-500 hover:text-maroon-700 mt-1 inline-block"
                >
                  {isMarathi ? 'Google Maps वर उघडा →' : 'Open in Google Maps →'}
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white border border-gold-200 p-8">
              <h2 className="font-display text-2xl text-maroon-700 mb-6">{t('send_message')}</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { name: 'name', label: t('your_name'), type: 'text', placeholder: isMarathi ? 'तुमचे नाव' : 'Your full name' },
                  { name: 'email', label: t('your_email'), type: 'email', placeholder: isMarathi ? 'तुमचा ईमेल' : 'your@email.com' },
                  { name: 'phone', label: isMarathi ? 'फोन नंबर' : 'Phone Number', type: 'tel', placeholder: '+91 98765 43210' },
                ].map(field => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-maroon-700 mb-1.5">{field.label}</label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={form[field.name]}
                      onChange={e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))}
                      placeholder={field.placeholder}
                      required
                      className="w-full border border-gold-200 px-4 py-3 text-sm focus:outline-none focus:border-gold-400 bg-cream placeholder-gray-300"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-medium text-maroon-700 mb-1.5">{t('your_message')}</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    rows={5}
                    required
                    placeholder={isMarathi ? 'तुमचा संदेश येथे लिहा...' : 'Write your message here...'}
                    className="w-full border border-gold-200 px-4 py-3 text-sm focus:outline-none focus:border-gold-400 bg-cream placeholder-gray-300 resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary py-4 flex items-center justify-center gap-2"
                >
                  {sending ? (
                    <span className="animate-pulse">{isMarathi ? 'पाठवत आहे...' : 'Sending...'}</span>
                  ) : (
                    <>
                      <Send size={16} /> {t('send')}
                    </>
                  )}
                </motion.button>
              </form>
            </div>

            {/* Custom order note */}
            <div className="mt-6 bg-gold-50 border border-gold-300 p-5">
              <h3 className="font-display text-maroon-700 text-lg mb-2">
                {isMarathi ? '✦ सानुकूल ऑर्डर' : '✦ Custom Orders'}
              </h3>
              <p className="text-gray-600 text-sm">
                {isMarathi
                  ? 'लग्नासाठी, सणांसाठी किंवा भेटवस्तूसाठी विशेष दागिने हवे असल्यास आम्हाला संपर्क करा. आम्ही तुमच्या बजेट आणि डिझाइनमध्ये बनवतो.'
                  : 'For wedding sets, festival specials, or personalized gifts — contact us for custom orders. We work within your budget and design preferences.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
