import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CheckCircle } from 'lucide-react';
import { useCartStore } from '../store';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const { t, i18n } = useTranslation();
  const isMarathi = i18n.language === 'mr';
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', state: 'Maharashtra', pincode: '' });
  const [ordered, setOrdered] = useState(false);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = total >= 2000 ? 0 : 150;
  const grandTotal = total + shipping;

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulate Razorpay
    const orderId = `ORD${Date.now().toString().slice(-6)}`;
    toast.success(
      isMarathi ? `ऑर्डर #${orderId} यशस्वीरित्या दिली!` : `Order #${orderId} placed successfully!`,
      { duration: 4000, style: { background: '#FFF8E7', border: '1px solid #D4921C', color: '#3d1a0a' }, icon: '🎉' }
    );
    clearCart();
    setOrdered(true);
  };

  if (items.length === 0 && !ordered) {
    navigate('/cart');
    return null;
  }

  if (ordered) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md px-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <CheckCircle size={80} className="text-green-500 mx-auto mb-6" />
          </motion.div>
          <h1 className="font-display text-3xl text-maroon-700 mb-4">
            {isMarathi ? 'ऑर्डर यशस्वी!' : 'Order Successful!'}
          </h1>
          <p className="text-gray-500 mb-8">
            {isMarathi
              ? 'तुमच्या ऑर्डरसाठी धन्यवाद. आम्ही लवकरच संपर्क करू.'
              : 'Thank you for your order. We will contact you shortly with delivery details.'}
          </p>
          <div className="space-y-3">
            <button onClick={() => navigate('/')} className="w-full btn-primary">{t('home')}</button>
            <button onClick={() => navigate('/products')} className="w-full btn-gold">{t('products')}</button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="font-display text-3xl text-maroon-700 mb-8">{t('checkout_title')}</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <div>
            <div className="bg-white border border-gold-200 p-6">
              <h2 className="font-display text-lg text-maroon-700 mb-4">
                {isMarathi ? 'वितरण माहिती' : 'Delivery Information'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { name: 'name', label: t('full_name'), type: 'text' },
                  { name: 'email', label: t('email'), type: 'email' },
                  { name: 'phone', label: t('phone'), type: 'tel' },
                  { name: 'address', label: t('address'), type: 'text' },
                  { name: 'city', label: t('city'), type: 'text' },
                  { name: 'pincode', label: t('pincode'), type: 'text' },
                ].map(field => (
                  <div key={field.name}>
                    <label className="block text-sm text-maroon-700 mb-1.5 font-medium">{field.label}</label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={form[field.name]}
                      onChange={handleChange}
                      required
                      className="w-full border border-gold-200 px-4 py-3 text-sm focus:outline-none focus:border-gold-400 bg-cream"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-sm text-maroon-700 mb-1.5 font-medium">{t('state')}</label>
                  <select
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    className="w-full border border-gold-200 px-4 py-3 text-sm focus:outline-none focus:border-gold-400 bg-cream"
                  >
                    {['Maharashtra', 'Karnataka', 'Gujarat', 'Goa', 'Madhya Pradesh'].map(s => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Payment note */}
                <div className="bg-gold-50 border border-gold-200 p-4 text-sm text-maroon-700">
                  <p className="font-semibold mb-1">💳 {isMarathi ? 'पेमेंट पर्याय' : 'Payment Options'}</p>
                  <p className="text-gray-500 text-xs">
                    {isMarathi
                      ? 'Razorpay द्वारे: UPI, नेट बँकिंग, क्रेडिट/डेबिट कार्ड, EMI | COD उपलब्ध'
                      : 'Via Razorpay: UPI, Net Banking, Credit/Debit Card, EMI | COD Available'}
                  </p>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary py-4 text-base"
                >
                  {t('place_order')} — ₹{grandTotal.toLocaleString('en-IN')}
                </motion.button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white border border-gold-200 p-6 sticky top-24">
              <h2 className="font-display text-lg text-maroon-700 mb-4 pb-3 border-b border-gold-100">
                {t('order_summary')}
              </h2>
              <div className="space-y-3 mb-4">
                {items.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <img src={item.image} alt={item.name} className="w-14 h-14 object-cover border border-gold-100" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-maroon-800">
                        {isMarathi ? item.nameMarathi : item.name}
                      </div>
                      <div className="text-xs text-gray-400">Qty: {item.quantity}</div>
                    </div>
                    <div className="font-semibold text-sm text-maroon-700">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gold-100 pt-3 space-y-2 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>{t('subtotal')}</span><span>₹{total.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>{isMarathi ? 'शिपिंग' : 'Shipping'}</span>
                  <span className={shipping === 0 ? 'text-green-600' : ''}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between font-bold text-maroon-800 text-lg pt-2 border-t border-gold-100">
                  <span>{isMarathi ? 'एकूण' : 'Total'}</span>
                  <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
