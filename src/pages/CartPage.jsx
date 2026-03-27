import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '../store';

export default function CartPage() {
  const { t, i18n } = useTranslation();
  const isMarathi = i18n.language === 'mr';
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const shipping = total >= 2000 ? 0 : 150;

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="max-w-5xl mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl text-maroon-700 mb-8"
        >
          {t('your_cart')} ({totalItems})
        </motion.h1>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <ShoppingBag size={60} className="text-gold-300 mx-auto mb-4" />
            <p className="text-xl text-gray-400 mb-6">{t('cart_empty')}</p>
            <Link to="/products" className="btn-primary">{t('products')}</Link>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Items */}
            <div className="md:col-span-2 space-y-4">
              <AnimatePresence>
                {items.map(item => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    className="bg-white border border-gold-200 flex gap-4 p-4"
                  >
                    <Link to={`/product/${item.id}`}>
                      <img src={item.image} alt={item.name} className="w-24 h-24 object-cover border border-gold-100" />
                    </Link>
                    <div className="flex-1">
                      <Link to={`/product/${item.id}`}>
                        <h3 className="font-display text-maroon-800 text-lg hover:text-maroon-600">
                          {isMarathi ? item.nameMarathi : item.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-gold-600 mb-2">{item.purity}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex border border-gold-200">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-maroon-700 hover:bg-gold-50"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-10 h-8 flex items-center justify-center text-sm font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-maroon-700 hover:bg-gold-50"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="font-display text-xl font-bold text-maroon-700">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-300 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>

              <button onClick={clearCart} className="text-sm text-red-400 hover:text-red-600 transition-colors">
                {isMarathi ? 'कार्ट साफ करा' : 'Clear cart'}
              </button>
            </div>

            {/* Summary */}
            <div className="md:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-gold-200 p-6 sticky top-24"
              >
                <h2 className="font-display text-xl text-maroon-700 mb-4 pb-3 border-b border-gold-100">
                  {t('order_summary')}
                </h2>
                <div className="space-y-3 text-sm mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>{t('subtotal')} ({totalItems} {isMarathi ? 'वस्तू' : 'items'})</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>{isMarathi ? 'शिपिंग' : 'Shipping'}</span>
                    <span className={shipping === 0 ? 'text-green-600 font-semibold' : ''}>
                      {shipping === 0 ? (isMarathi ? 'मोफत' : 'FREE') : `₹${shipping}`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-gold-600">
                      {isMarathi
                        ? `मोफत शिपिंगसाठी ₹${(2000 - total).toLocaleString()} अधिक खरेदी करा`
                        : `Add ₹${(2000 - total).toLocaleString()} more for free shipping`}
                    </p>
                  )}
                  <div className="flex justify-between font-bold text-maroon-800 text-lg pt-3 border-t border-gold-100">
                    <span>{isMarathi ? 'एकूण' : 'Total'}</span>
                    <span>₹{(total + shipping).toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <Link to="/checkout">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full btn-primary flex items-center justify-center gap-2"
                  >
                    {t('checkout')} <ArrowRight size={16} />
                  </motion.button>
                </Link>

                <Link to="/products" className="block text-center mt-3 text-sm text-maroon-500 hover:text-maroon-700">
                  {isMarathi ? '← खरेदी सुरू ठेवा' : '← Continue Shopping'}
                </Link>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
