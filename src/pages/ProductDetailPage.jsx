import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ShoppingBag, ArrowLeft, Star, Shield, Truck, Award, ChevronRight } from 'lucide-react';
import { products } from '../data/products';
import { useCartStore } from '../store';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const isMarathi = i18n.language === 'mr';
  const navigate = useNavigate();
  const addItem = useCartStore(s => s.addItem);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  const product = products.find(p => p.id === Number(id));
  if (!product) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-2xl font-display text-maroon-600 mb-4">Product not found</p>
        <Link to="/products" className="btn-primary">Back to Products</Link>
      </div>
    </div>
  );

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addItem(product, qty);
    toast.success(
      isMarathi ? `${product.nameMarathi} कार्टमध्ये जोडले!` : `${product.name} added to cart!`,
      { style: { background: '#FFF8E7', border: '1px solid #D4921C', color: '#3d1a0a' }, icon: '✦' }
    );
  };

  const handleBuyNow = () => {
    addItem(product, qty);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-cream mandala-bg">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Link to="/" className="hover:text-maroon-600">{t('home')}</Link>
          <ChevronRight size={14} />
          <Link to="/products" className="hover:text-maroon-600">{t('products')}</Link>
          <ChevronRight size={14} />
          <span className="text-maroon-600">{isMarathi ? product.nameMarathi : product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-maroon-600 mb-6 hover:text-maroon-800 transition-colors text-sm"
        >
          <ArrowLeft size={16} /> {isMarathi ? 'मागे' : 'Back'}
        </button>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Images */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="aspect-square bg-gold-50 border border-gold-200 overflow-hidden mb-4">
              <motion.img
                key={activeImg}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={product.images[activeImg]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-20 h-20 border-2 overflow-hidden ${activeImg === i ? 'border-gold-500' : 'border-gold-200'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex flex-wrap gap-2 mb-3">
              {product.tags.map(tag => (
                <span key={tag} className="tag-badge bg-gold-100 text-gold-700 border border-gold-300 capitalize">
                  {t(tag) || tag}
                </span>
              ))}
            </div>

            <h1 className="font-display text-3xl text-maroon-800 mb-1">
              {isMarathi ? product.nameMarathi : product.name}
            </h1>
            <p className="text-gold-600 text-sm mb-4">{product.purity}</p>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < Math.floor(product.rating) ? 'text-gold-500 fill-gold-500' : 'text-gray-200'} />
                ))}
              </div>
              <span className="text-sm text-gray-500">{product.rating} ({product.reviews} {isMarathi ? 'समीक्षा' : 'reviews'})</span>
            </div>

            {/* Price */}
            <div className="bg-gold-50 border border-gold-200 px-6 py-4 mb-6">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-4xl font-bold text-maroon-700">₹{product.price.toLocaleString('en-IN')}</span>
                <span className="text-gray-400 line-through text-lg">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                <span className="bg-green-100 text-green-700 text-sm font-bold px-2 py-1">-{discount}% {t('off')}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{isMarathi ? 'समावेश GST' : 'Inclusive of GST'}</p>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6 font-body">
              {isMarathi ? product.descriptionMarathi : product.description}
            </p>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
              {[
                { label: isMarathi ? 'वजन' : 'Weight', val: product.weight },
                { label: isMarathi ? 'शुद्धता' : 'Purity', val: product.purity },
                { label: isMarathi ? 'धातू' : 'Metal', val: 'Silver' },
                { label: isMarathi ? 'उपलब्धता' : 'Availability', val: product.inStock ? (isMarathi ? 'उपलब्ध' : 'In Stock') : (isMarathi ? 'अनुपलब्ध' : 'Out of Stock') },
              ].map((spec, i) => (
                <div key={i} className="bg-white border border-gold-100 px-4 py-3">
                  <div className="text-xs text-gray-400 mb-0.5">{spec.label}</div>
                  <div className="font-medium text-maroon-700">{spec.val}</div>
                </div>
              ))}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium text-maroon-700">{t('quantity')}:</span>
              <div className="flex border border-gold-300">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center text-maroon-700 hover:bg-gold-50">-</button>
                <span className="w-12 h-10 flex items-center justify-center font-semibold text-maroon-800">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="w-10 h-10 flex items-center justify-center text-maroon-700 hover:bg-gold-50">+</button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 flex items-center justify-center gap-2 py-4 font-semibold tracking-wider uppercase text-sm ${
                  product.inStock ? 'btn-primary' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <ShoppingBag size={18} />
                {t('add_to_cart')}
              </motion.button>
              {product.inStock && (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleBuyNow}
                  className="flex-1 btn-gold py-4 text-center"
                >
                  {t('buy_now')}
                </motion.button>
              )}
            </div>

            {/* Trust badges */}
            <div className="flex gap-4 text-xs text-gray-500">
              {[
                { icon: Shield, label: isMarathi ? 'BIS प्रमाणित' : 'BIS Certified' },
                { icon: Truck, label: isMarathi ? 'मोफत शिपिंग' : 'Free Shipping' },
                { icon: Award, label: isMarathi ? 'हस्तनिर्मित' : 'Handcrafted' },
              ].map(({ icon: Icon, label }, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <Icon size={14} className="text-gold-500" />
                  {label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-2xl text-maroon-700 mb-2 text-center">
              {isMarathi ? 'संबंधित उत्पादने' : 'Related Products'}
            </h2>
            <div className="h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mb-8" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
