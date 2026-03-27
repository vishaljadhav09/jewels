import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ShoppingBag, Star, Heart } from 'lucide-react';
import { useCartStore } from '../store';
import toast from 'react-hot-toast';

export default function ProductCard({ product, index = 0 }) {
  const { t, i18n } = useTranslation();
  const addItem = useCartStore(s => s.addItem);
  const isMarathi = i18n.language === 'mr';

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!product.inStock) return;
    addItem(product);
    toast.success(
      isMarathi ? `${product.nameMarathi} कार्टमध्ये जोडले!` : `${product.name} added to cart!`,
      {
        style: { background: '#FFF8E7', border: '1px solid #D4921C', color: '#3d1a0a' },
        icon: '✦',
      }
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link to={`/product/${product.id}`} className="block group">
        <div className="card-jewelry h-full flex flex-col">
          {/* Image */}
          <div className="relative overflow-hidden bg-gold-50" style={{ paddingBottom: '100%' }}>
            <motion.img
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.6 }}
              src={product.image}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.tags.includes('bestseller') && (
                <span className="tag-badge bg-maroon-500 text-gold-200">
                  {t('bestseller')}
                </span>
              )}
              {product.tags.includes('bridal') && (
                <span className="tag-badge bg-gold-500 text-maroon-900">
                  {t('bridal')}
                </span>
              )}
              {!product.inStock && (
                <span className="tag-badge bg-gray-500 text-white">
                  {t('out_of_stock')}
                </span>
              )}
            </div>

            {discount > 0 && (
              <div className="absolute top-3 right-3 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-sm">
                -{discount}% {t('off')}
              </div>
            )}

            {/* Wishlist */}
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => e.preventDefault()}
              className="absolute bottom-3 right-3 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center text-maroon-400 hover:text-maroon-600 hover:bg-white shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              <Heart size={16} />
            </motion.button>
          </div>

          {/* Info */}
          <div className="p-4 flex flex-col flex-1">
            <div className="flex-1">
              <p className="text-xs text-gold-600 uppercase tracking-widest font-medium mb-1">
                {product.purity}
              </p>
              <h3 className="font-display text-maroon-800 text-lg leading-snug mb-1">
                {isMarathi ? product.nameMarathi : product.name}
              </h3>
              
              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={i < Math.floor(product.rating) ? 'text-gold-500 fill-gold-500' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">({product.reviews})</span>
              </div>
            </div>

            {/* Price & CTA */}
            <div className="flex items-center justify-between mt-2">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-xl font-bold text-maroon-700">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-xs text-gray-500">{product.weight}</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  product.inStock
                    ? 'bg-maroon-500 text-gold-200 hover:bg-maroon-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <ShoppingBag size={14} />
                {t('add_to_cart')}
              </motion.button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
