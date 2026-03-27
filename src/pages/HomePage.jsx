import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Award, Truck, RotateCcw, Shield, Star, Quote } from 'lucide-react';
import { products, testimonials } from '../data/products';
import ProductCard from '../components/ProductCard';

// Decorative SVG Rangoli/Mandala
function MandalaSVG({ size = 200, className = '' }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className={className}>
      {/* Outer ring */}
      <circle cx="100" cy="100" r="95" fill="none" stroke="#D4921C" strokeWidth="0.5" strokeDasharray="4 4" />
      <circle cx="100" cy="100" r="80" fill="none" stroke="#D4921C" strokeWidth="0.5" opacity="0.6" />
      {/* Petals */}
      {[...Array(8)].map((_, i) => (
        <g key={i} transform={`rotate(${i * 45} 100 100)`}>
          <ellipse cx="100" cy="30" rx="8" ry="20" fill="#D4921C" opacity="0.15" />
          <ellipse cx="100" cy="45" rx="4" ry="12" fill="#8B0000" opacity="0.2" />
        </g>
      ))}
      {/* Inner details */}
      {[...Array(8)].map((_, i) => (
        <g key={i} transform={`rotate(${i * 45 + 22.5} 100 100)`}>
          <ellipse cx="100" cy="55" rx="5" ry="15" fill="#FF9933" opacity="0.15" />
        </g>
      ))}
      <circle cx="100" cy="100" r="20" fill="none" stroke="#D4921C" strokeWidth="1" opacity="0.4" />
      <circle cx="100" cy="100" r="10" fill="#D4921C" opacity="0.2" />
      <text x="100" y="104" textAnchor="middle" fontSize="12" fill="#D4921C" opacity="0.6">✦</text>
    </svg>
  );
}

function RangoliDivider() {
  return (
    <div className="rangoli-divider">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
      <span className="text-gold-500 text-lg">❋</span>
      <span className="text-maroon-500 text-sm">✦</span>
      <span className="text-gold-500 text-lg">❋</span>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
    </div>
  );
}

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const isMarathi = i18n.language === 'mr';
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const featured = products.filter(p => p.featured);

  const features = [
    { icon: Shield, key: 'pure_silver', desc_key: 'pure_silver_desc', color: 'text-gold-600' },
    { icon: Award, key: 'handcrafted', desc_key: 'handcrafted_desc', color: 'text-maroon-500' },
    { icon: Truck, key: 'free_delivery', desc_key: 'free_delivery_desc', color: 'text-green-600' },
    { icon: RotateCcw, key: 'easy_returns', desc_key: 'easy_returns_desc', color: 'text-blue-600' },
  ];

  const stats = [
    { num: '40+', label: isMarathi ? 'वर्षांचा अनुभव' : 'Years Experience' },
    { num: '10K+', label: isMarathi ? 'आनंदी ग्राहक' : 'Happy Customers' },
    { num: '500+', label: isMarathi ? 'अनोखी डिझाइन' : 'Unique Designs' },
    { num: '15', label: isMarathi ? 'मास्टर कारागीर' : 'Master Artisans' },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* ═══════════════════════════════ HERO ═══════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <div className="absolute inset-0 bg-festive-gradient" />
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4921C' fill-opacity='1'%3E%3Cpath d='M40 0 L41 39 L80 40 L41 41 L40 80 L39 41 L0 40 L39 39 Z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-maroon-900/50" />
        </motion.div>

        {/* Floating Mandalas */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute top-10 right-10 opacity-20 hidden md:block"
        >
          <MandalaSVG size={180} />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-20 left-10 opacity-15 hidden md:block"
        >
          <MandalaSVG size={120} />
        </motion.div>

        {/* Hero Content */}
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center w-full">
          {/* Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 text-gold-300 text-xs tracking-[0.3em] uppercase mb-6 border border-gold-600/50 px-4 py-2"
            >
              ✦ {t('hero_tag')} ✦
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="font-display text-5xl md:text-7xl font-bold text-gold-200 leading-tight mb-2"
            >
              {isMarathi ? 'महालक्ष्मी' : 'Mahalaxmi'}
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="font-display text-4xl md:text-6xl font-bold text-gold-400 leading-tight mb-6"
            >
              {isMarathi ? 'ज्वेलर्स' : 'Jwellers'}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-gold-500 tracking-widest text-sm mb-6"
            >
              {t('hero_subtitle')}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-gold-200/80 text-lg leading-relaxed mb-10 max-w-lg font-body"
            >
              {t('hero_desc')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212,146,28,0.4)' }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-gold-500 text-maroon-900 font-semibold px-8 py-4 text-sm tracking-widest uppercase hover:bg-gold-400 transition-all duration-300"
                >
                  {t('shop_now')}
                </motion.button>
              </Link>
              <Link to="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="border border-gold-400 text-gold-300 font-semibold px-8 py-4 text-sm tracking-widest uppercase hover:bg-gold-500/10 transition-all duration-300"
                >
                  {t('our_story')}
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative hidden md:block"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Decorative border */}
              <div className="absolute inset-4 border border-gold-500/30 rounded-full" />
              <div className="absolute inset-8 border border-gold-400/20 rounded-full" />
              
              {/* Main image */}
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-12 rounded-full overflow-hidden border-4 border-gold-500/40 shadow-2xl shadow-gold-500/20"
              >
                <img
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80"
                  alt="Silver Jewellery"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-maroon-900/10" />
              </motion.div>

              {/* Orbiting badge */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 bg-gold-500 text-maroon-900 text-xs font-bold px-3 py-1.5 shadow-lg">
                  92.5% SILVER
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold-400 opacity-60"
        >
          <ChevronDown size={28} />
        </motion.div>
      </section>

      {/* ═══════════════════════════════ FEATURES ═══════════════════════════ */}
      <section className="py-12 bg-gold-50 border-y border-gold-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center p-4"
            >
              <feat.icon size={28} className={`${feat.color} mb-2`} />
              <div className="font-display text-maroon-800 font-semibold">{t(feat.key)}</div>
              <div className="text-xs text-gray-500 mt-1">{t(feat.desc_key)}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════ FEATURED PRODUCTS ══════════════════ */}
      <section className="py-20 mandala-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gold-600 tracking-[0.3em] text-xs uppercase mb-3"
            >
              ✦ {isMarathi ? 'हस्तनिर्मित चांदी' : 'Handcrafted Silver'} ✦
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-title mb-3"
            >
              {t('featured_collection')}
            </motion.h2>
            <p className="text-gray-500 font-body">{t('featured_subtitle')}</p>
            <RangoliDivider />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary"
              >
                {t('view_all')}
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ STATS BANNER ════════════════════════ */}
      <section className="bg-festive-gradient py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="font-display text-4xl md:text-5xl font-bold text-gold-300 mb-2">
                  {stat.num}
                </div>
                <div className="text-gold-500 text-sm tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ MANUFACTURING HIGHLIGHT ═══════════ */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="aspect-square max-w-sm">
                <img
                  src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&q=80"
                  alt="Silver Manufacturing"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -bottom-6 -right-6 opacity-20"
              >
                <MandalaSVG size={120} />
              </motion.div>
              <div className="absolute top-4 right-4 bg-maroon-500 text-gold-200 px-4 py-2 font-display text-sm">
                {isMarathi ? 'आमचे कारखाना' : 'Our Workshop'}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-gold-600 tracking-[0.3em] text-xs uppercase mb-4">
              ✦ {isMarathi ? 'आमच्याबद्दल' : 'About Us'} ✦
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-maroon-700 mb-6 leading-tight">
              {isMarathi ? 'आम्ही स्वतः चांदीचे दागिने बनवतो' : 'We Manufacture Silver Jewellery In-House'}
            </h2>
            <RangoliDivider />
            <p className="text-gray-600 leading-relaxed mb-4 font-body">
              {isMarathi
                ? 'महालक्ष्मी ज्वेलर्समध्ये, आम्ही केवळ दागिने विकत नाही - आम्ही ते बनवतो. आमच्या सातारा कार्यशाळेत, कुशल कारागीर प्रत्येक तुकडा हस्तनिर्मित करतात.'
                : 'At Mahalaxmi Jwellers, we don\'t just sell jewellery — we make it. In our Satara workshop, skilled artisans handcraft every single piece using traditional techniques passed down through generations.'}
            </p>
            <p className="text-gray-600 leading-relaxed mb-8 font-body">
              {isMarathi
                ? 'शुद्ध चांदी थेट स्त्रोतांकडून मिळवली जाते आणि BIS मानकांनुसार प्रमाणित केली जाते.'
                : 'Pure silver is sourced directly and certified to BIS standards, ensuring you receive only the finest quality at the best prices.'}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { label: isMarathi ? 'BIS प्रमाणित' : 'BIS Certified', icon: '🏆' },
                { label: isMarathi ? 'हस्तनिर्मित' : 'Handcrafted', icon: '🤲' },
                { label: isMarathi ? 'प्रत्यक्ष स्त्रोत' : 'Direct Source', icon: '⛏️' },
                { label: isMarathi ? 'सानुकूल ऑर्डर' : 'Custom Orders', icon: '✏️' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-gold-50 px-4 py-3 border border-gold-200">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm font-medium text-maroon-700">{item.label}</span>
                </div>
              ))}
            </div>

            <Link to="/about">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary"
              >
                {t('our_story')}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════ TESTIMONIALS ══════════════════════ */}
      <section className="py-20 bg-gold-50 mandala-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-gold-600 tracking-[0.3em] text-xs uppercase mb-3">✦ {isMarathi ? 'ग्राहक अनुभव' : 'Customer Stories'} ✦</p>
            <h2 className="section-title mb-2">{isMarathi ? 'आमच्या ग्राहकांचे मत' : 'What Our Customers Say'}</h2>
            <RangoliDivider />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t_item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white border border-gold-200 p-6 relative"
              >
                <Quote className="text-gold-300 mb-4" size={28} />
                <p className="text-gray-600 leading-relaxed mb-6 font-body italic">
                  "{isMarathi ? t_item.textMarathi : t_item.text}"
                </p>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(t_item.rating)].map((_, j) => (
                    <Star key={j} size={14} className="text-gold-500 fill-gold-500" />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-maroon-100 rounded-full flex items-center justify-center text-maroon-600 font-bold">
                    {(isMarathi ? t_item.nameMarathi : t_item.name)[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-maroon-800 font-marathi">
                      {isMarathi ? t_item.nameMarathi : t_item.name}
                    </div>
                    <div className="text-xs text-gray-400">{t_item.location}</div>
                  </div>
                </div>
                {/* Gold corner accent */}
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-gold-400" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ CTA BANNER ════════════════════════ */}
      <section className="relative py-20 bg-festive-gradient overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10"
        >
          <MandalaSVG size={400} />
        </motion.div>
        <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-5xl text-gold-200 mb-4"
          >
            {isMarathi ? 'सानुकूल दागिने ऑर्डर करा' : 'Order Custom Jewellery'}
          </motion.h2>
          <p className="text-gold-400 mb-8">
            {isMarathi
              ? 'तुमच्या स्वप्नातील दागिने आम्हाला सांगा. आम्ही ते तुमच्यासाठी बनवू.'
              : 'Tell us your dream jewellery design. Our artisans will craft it exclusively for you.'}
          </p>
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(212,146,28,0.5)' }}
              whileTap={{ scale: 0.97 }}
              className="btn-gold text-base px-10 py-4"
            >
              {isMarathi ? 'आम्हाला संपर्क करा' : 'Contact Us'}
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
}
