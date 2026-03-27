import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function ProductsPage() {
  const { t, i18n } = useTranslation();
  const isMarathi = i18n.language === 'mr';
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState([0, 15000]);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let res = [...products];
    if (activeCategory !== 'all') res = res.filter(p => p.category === activeCategory);
    if (search) {
      const q = search.toLowerCase();
      res = res.filter(p =>
        p.name.toLowerCase().includes(q) || p.nameMarathi.includes(q)
      );
    }
    res = res.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (sortBy === 'price_low') res.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price_high') res.sort((a, b) => b.price - a.price);
    else if (sortBy === 'newest') res.sort((a, b) => b.id - a.id);
    else res.sort((a, b) => b.rating - a.rating);
    return res;
  }, [activeCategory, search, sortBy, priceRange]);

  return (
    <div className="min-h-screen mandala-bg">
      {/* Header */}
      <div className="bg-festive-gradient py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4921C' fill-opacity='1'%3E%3Cpath d='M30 0L31 29L60 30L31 31L30 60L29 31L0 30L29 29Z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl md:text-5xl text-gold-200 relative z-10"
        >
          {t('products')}
        </motion.h1>
        <p className="text-gold-400 mt-2 relative z-10">
          {isMarathi ? 'आमचा संपूर्ण चांदीचे दागिने संग्रह' : 'Our Complete Silver Jewellery Collection'}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Search + Sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={t('search')}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gold-200 bg-white text-maroon-800 focus:outline-none focus:border-gold-400 text-sm"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <X size={14} />
              </button>
            )}
          </div>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="border border-gold-200 bg-white text-maroon-800 px-4 py-3 text-sm focus:outline-none focus:border-gold-400"
          >
            <option value="popular">{t('popular')}</option>
            <option value="price_low">{t('price_low')}</option>
            <option value="price_high">{t('price_high')}</option>
            <option value="newest">{t('newest')}</option>
          </select>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 border border-gold-300 px-4 py-3 text-maroon-700 text-sm hover:bg-gold-50 transition-colors"
          >
            <SlidersHorizontal size={16} />
            {t('filter_by')}
          </button>
        </div>

        {/* Filters panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white border border-gold-200 p-6 mb-8"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-maroon-700 mb-2 block">
                  {isMarathi ? 'किंमत श्रेणी' : 'Price Range'}: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                </label>
                <input
                  type="range"
                  min="0"
                  max="15000"
                  step="500"
                  value={priceRange[1]}
                  onChange={e => setPriceRange([0, Number(e.target.value)])}
                  className="w-full accent-maroon-500"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-maroon-500 text-gold-200'
                  : 'bg-white border border-gold-200 text-maroon-700 hover:border-gold-400'
              }`}
            >
              <span>{cat.icon}</span>
              <span className={isMarathi ? 'font-marathi' : ''}>
                {isMarathi ? cat.nameMarathi : cat.name}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-6">
          {isMarathi ? `${filtered.length} उत्पादने सापडली` : `${filtered.length} products found`}
        </p>

        {/* Products Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-4">✦</div>
            <p className="text-lg">{isMarathi ? 'कोणतेही उत्पादन सापडले नाही' : 'No products found'}</p>
          </div>
        )}
      </div>
    </div>
  );
}
