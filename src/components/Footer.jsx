import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube } from 'lucide-react';

export default function Footer() {
  const { t, i18n } = useTranslation();
  const isMarathi = i18n.language === 'mr';

  return (
    <footer className="bg-festive-gradient text-gold-100 mt-20">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-gold-600 via-gold-300 to-gold-600" />
      
      {/* Rangoli strip */}
      <div className="flex justify-center py-4 gap-4 text-gold-400 text-xl opacity-60">
        {['✦', '◈', '❋', '◈', '✦', '◈', '❋', '◈', '✦'].map((s, i) => (
          <span key={i}>{s}</span>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-maroon-900 text-lg">✦</div>
              <div>
                <div className="font-display text-xl font-bold text-gold-200">Mahalaxmi Jwellers</div>
                <div className="text-xs text-gold-500 tracking-widest">Est. 1985</div>
              </div>
            </div>
            <p className="text-gold-300 text-sm leading-relaxed mb-4">
              {isMarathi
                ? 'महाराष्ट्रातील विश्वासू चांदीचे दागिने उत्पादक. पिढ्यांची कारागीर परंपरा.'
                : 'Trusted silver jewellery manufacturers of Maharashtra. A tradition of artisanship across generations.'}
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: '#' },
                { icon: Facebook, href: '#' },
                { icon: Youtube, href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-full border border-gold-600 flex items-center justify-center text-gold-400 hover:bg-gold-500 hover:text-maroon-900 hover:border-gold-500 transition-all duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-gold-300 text-lg mb-4 pb-2 border-b border-gold-800">
              {isMarathi ? 'द्रुत दुवे' : 'Quick Links'}
            </h4>
            <ul className="space-y-2.5">
              {[
                { to: '/', label: t('home') },
                { to: '/products', label: t('products') },
                { to: '/about', label: t('about') },
                { to: '/contact', label: t('contact') },
                { to: '/cart', label: t('cart') },
              ].map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gold-400 hover:text-gold-200 transition-colors text-sm flex items-center gap-2"
                  >
                    <span className="text-gold-600">✦</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display text-gold-300 text-lg mb-4 pb-2 border-b border-gold-800">
              {isMarathi ? 'श्रेणी' : 'Categories'}
            </h4>
            <ul className="space-y-2.5">
              {[
                { en: 'Necklaces', mr: 'हार' },
                { en: 'Earrings', mr: 'कानातले' },
                { en: 'Bangles', mr: 'बांगड्या' },
                { en: 'Anklets', mr: 'पायल' },
                { en: 'Pendants', mr: 'लॉकेट' },
                { en: 'Bridal Sets', mr: 'विवाह संच' },
              ].map((cat, i) => (
                <li key={i}>
                  <Link
                    to="/products"
                    className="text-gold-400 hover:text-gold-200 transition-colors text-sm flex items-center gap-2"
                  >
                    <span className="text-gold-600">✦</span>
                    {isMarathi ? cat.mr : cat.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-gold-300 text-lg mb-4 pb-2 border-b border-gold-800">
              {t('contact')}
            </h4>
            <div className="space-y-3">
              <div className="flex gap-3 text-gold-400 text-sm">
                <MapPin size={16} className="text-gold-500 mt-0.5 shrink-0" />
                <span>{isMarathi ? 'मुख्य रस्ता, सातारा - ४१५ ००१, महाराष्ट्र' : 'Main Road, Satara - 415 001, Maharashtra'}</span>
              </div>
              <div className="flex gap-3 text-gold-400 text-sm">
                <Phone size={16} className="text-gold-500 shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex gap-3 text-gold-400 text-sm">
                <Mail size={16} className="text-gold-500 shrink-0" />
                <span>info@mahalaxmijwellers.com</span>
              </div>
              <div className="text-gold-400 text-sm">
                <span className="text-gold-500">🕐 </span>
                {t('hours_val')}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-gold-800 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gold-600">
          <p>© 2024 Mahalaxmi Jwellers. All rights reserved.</p>
          <p className="font-marathi">
            {isMarathi ? 'BIS प्रमाणित | ९२.५% स्टर्लिंग सिल्व्हर' : 'BIS Certified | 92.5% Sterling Silver'}
          </p>
        </div>
      </div>
    </footer>
  );
}
