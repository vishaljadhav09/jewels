import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Globe } from 'lucide-react';
import { useCartStore } from '../store';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const items = useCartStore(s => s.items);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'mr' : 'en');
  };

  const navLinks = [
    { to: '/', label: t('home') },
    { to: '/products', label: t('products') },
    { to: '/about', label: t('about') },
    { to: '/contact', label: t('contact') },
  ];

  return (
    <>
      {/* Top strip */}
      <div className="bg-maroon-500 text-gold-200 text-center text-xs py-1.5 tracking-widest font-body">
        ✦ {i18n.language === 'en' ? 'Free delivery on orders above ₹2000 | WhatsApp: +91 98765 43210' : 'फ्री डिलिव्हरी ₹२००० पेक्षा जास्त ऑर्डरवर | WhatsApp: +91 98765 43210'} ✦
      </div>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-gold-200/20 border-b border-gold-200'
            : 'bg-cream border-b border-gold-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
                className="w-10 h-10 rounded-full bg-maroon-500 flex items-center justify-center text-gold-300 text-lg"
              >
                ✦
              </motion.div>
              <div>
                <div className="font-display text-lg md:text-xl font-bold text-maroon-600 leading-tight">
                  Mahalaxmi Jwellers
                </div>
                <div className="text-[10px] text-gold-600 tracking-widest font-body uppercase">
                  {i18n.language === 'en' ? 'Silver · Satara · Est. 1985' : 'चांदी · सातारा · स्था. १९८५'}
                </div>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm font-medium tracking-wide transition-colors duration-200 relative group ${
                    location.pathname === link.to
                      ? 'text-maroon-600'
                      : 'text-maroon-800 hover:text-maroon-500'
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-gold-500 transition-all duration-300 ${
                    location.pathname === link.to ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Language Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleLang}
                className="hidden sm:flex items-center gap-1.5 text-xs text-maroon-700 border border-gold-300 px-3 py-1.5 rounded-sm hover:bg-gold-50 transition-colors font-marathi"
              >
                <Globe size={13} />
                {t('language')}
              </motion.button>

              {/* Cart */}
              <Link to="/cart" className="relative">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 flex items-center justify-center text-maroon-700 hover:text-maroon-500 transition-colors"
                >
                  <ShoppingBag size={22} />
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-maroon-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </motion.div>
              </Link>

              {/* Mobile menu */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden w-10 h-10 flex items-center justify-center text-maroon-700"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gold-200 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-3">
                {navLinks.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="block py-2.5 text-maroon-800 font-medium border-b border-gold-100 last:border-0"
                  >
                    {link.label}
                  </Link>
                ))}
                <button
                  onClick={toggleLang}
                  className="flex items-center gap-2 text-sm text-maroon-600 font-marathi pt-1"
                >
                  <Globe size={14} />
                  {t('language')}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
