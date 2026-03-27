import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

function MandalaSVG({ size = 200, className = '' }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className={className}>
      {[...Array(8)].map((_, i) => (
        <g key={i} transform={`rotate(${i * 45} 100 100)`}>
          <ellipse cx="100" cy="30" rx="8" ry="20" fill="#D4921C" opacity="0.15" />
        </g>
      ))}
      <circle cx="100" cy="100" r="80" fill="none" stroke="#D4921C" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="95" fill="none" stroke="#D4921C" strokeWidth="0.5" strokeDasharray="4 4" />
      <text x="100" y="104" textAnchor="middle" fontSize="12" fill="#D4921C" opacity="0.5">✦</text>
    </svg>
  );
}

export default function AboutPage() {
  const { t, i18n } = useTranslation();
  const isMarathi = i18n.language === 'mr';

  const values = [
    {
      icon: '🏆',
      title: isMarathi ? 'BIS प्रमाणित' : 'BIS Certified',
      desc: isMarathi ? 'सर्व दागिने भारत सरकारच्या BIS मानकांनुसार प्रमाणित' : 'All jewellery certified as per BIS standards by Government of India',
    },
    {
      icon: '🤲',
      title: isMarathi ? 'हस्तनिर्मित' : 'Handcrafted',
      desc: isMarathi ? 'प्रत्येक तुकडा कुशल कारागिरांनी हाताने बनवलेला' : 'Every piece lovingly handcrafted by our master artisans',
    },
    {
      icon: '⛏️',
      title: isMarathi ? 'थेट खरेदी' : 'Direct Sourcing',
      desc: isMarathi ? 'शुद्ध चांदी थेट स्त्रोतांकडून खरेदी केली जाते' : 'Pure silver sourced directly, cutting middlemen for best prices',
    },
    {
      icon: '✏️',
      title: isMarathi ? 'सानुकूल ऑर्डर' : 'Custom Orders',
      desc: isMarathi ? 'तुमच्या डिझाइननुसार विशेष दागिने बनवतो' : 'We craft bespoke jewellery as per your design',
    },
  ];

  const team = [
    { name: isMarathi ? 'सौ. सुलोचना कुलकर्णी' : 'Sou. Sulochana Kulkarni', role: isMarathi ? 'संस्थापक' : 'Founder', exp: isMarathi ? '40 वर्षांचा अनुभव' : '40 years experience' },
    { name: isMarathi ? 'श्री. राजेश कुलकर्णी' : 'Shri. Rajesh Kulkarni', role: isMarathi ? 'मुख्य कारागीर' : 'Head Artisan', exp: isMarathi ? '25 वर्षांचा अनुभव' : '25 years experience' },
    { name: isMarathi ? 'सौ. प्रिया कुलकर्णी' : 'Sou. Priya Kulkarni', role: isMarathi ? 'डिझाइन प्रमुख' : 'Design Head', exp: isMarathi ? '15 वर्षांचा अनुभव' : '15 years experience' },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <section className="relative bg-festive-gradient py-24 text-center overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10"
        >
          <MandalaSVG size={400} />
        </motion.div>
        <div className="relative z-10">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gold-500 tracking-[0.3em] text-xs uppercase mb-4">
            ✦ {isMarathi ? 'आमची कथा' : 'Our Story'} ✦
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-5xl text-gold-200 mb-4">
            {t('about_title')}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className="text-gold-400 text-lg">
            {t('about_subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
                alt="Our Story"
                className="w-full aspect-square object-cover border-4 border-gold-200"
              />
              <div className="absolute -bottom-6 -right-6 bg-maroon-500 text-gold-200 p-6 text-center w-32">
                <div className="font-display text-3xl font-bold">40+</div>
                <div className="text-xs">{isMarathi ? 'वर्षे' : 'Years'}</div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl text-maroon-700 mb-6">{isMarathi ? 'आमचा वारसा' : 'Our Heritage'}</h2>
            <p className="text-gray-600 leading-relaxed mb-5 font-body">{t('about_desc1')}</p>
            <p className="text-gray-600 leading-relaxed mb-8 font-body">{t('about_desc2')}</p>

            {/* Timeline */}
            <div className="space-y-4">
              {[
                { year: '1985', event: isMarathi ? 'महालक्ष्मी ज्वेलर्सची स्थापना सातार्यात' : 'Mahalaxmi Jwellers founded in Satara' },
                { year: '2000', event: isMarathi ? 'विस्तारित कार्यशाळा आणि नवीन डिझाइन' : 'Expanded workshop and new design studio' },
                { year: '2010', event: isMarathi ? 'महाराष्ट्रातील सर्वोत्तम रजत पुरस्कार' : 'Best Silver Jeweller Award, Maharashtra' },
                { year: '2024', event: isMarathi ? 'ऑनलाइन विक्री सुरू' : 'Launched online store' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 items-start"
                >
                  <div className="bg-maroon-500 text-gold-200 text-xs font-bold px-2 py-1 whitespace-nowrap">{item.year}</div>
                  <div className="text-gray-600 text-sm pt-0.5">{item.event}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-festive-gradient">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-3xl text-gold-200 text-center mb-12">
            {isMarathi ? 'आमची मूल्ये' : 'Our Values'}
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-maroon-700/40 border border-gold-700/40 p-6 text-center"
              >
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-display text-gold-300 text-lg mb-2">{v.title}</h3>
                <p className="text-gold-500 text-sm">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 mandala-bg">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="section-title mb-3">{isMarathi ? 'आमची टीम' : 'Our Team'}</h2>
          <div className="h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mb-12" />
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white border border-gold-200 p-6"
              >
                <div className="w-20 h-20 rounded-full bg-maroon-100 flex items-center justify-center text-3xl mx-auto mb-4">
                  👤
                </div>
                <h3 className="font-display text-maroon-800 text-lg font-marathi mb-1">{member.name}</h3>
                <p className="text-gold-600 text-sm font-semibold mb-1">{member.role}</p>
                <p className="text-gray-400 text-xs">{member.exp}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
