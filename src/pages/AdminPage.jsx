import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard, Package, ShoppingCart, BarChart3,
  LogOut, TrendingUp, Eye, Edit, Trash2, Plus, Check, X
} from 'lucide-react';
import { useAdminStore } from '../store';
import { products as initialProducts } from '../data/products';
import toast from 'react-hot-toast';

const STATUS_COLORS = {
  delivered: 'bg-green-100 text-green-700',
  processing: 'bg-blue-100 text-blue-700',
  pending: 'bg-yellow-100 text-yellow-700',
  shipped: 'bg-purple-100 text-purple-700',
  cancelled: 'bg-red-100 text-red-700',
};

// ── LOGIN ─────────────────────────────────────────────
function AdminLogin() {
  const { login } = useAdminStore();
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!login(pw)) {
      setError('Invalid password. Hint: admin123');
    }
  };

  return (
    <div className="min-h-screen bg-festive-gradient flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white border border-gold-200 p-10 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-maroon-500 rounded-full flex items-center justify-center text-gold-200 text-2xl mx-auto mb-4">✦</div>
          <h1 className="font-display text-2xl text-maroon-700">Admin Login</h1>
          <p className="text-gray-400 text-sm mt-1">Mahalaxmi Jwellers Dashboard</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Admin Password"
            value={pw}
            onChange={e => { setPw(e.target.value); setError(''); }}
            className="w-full border border-gold-200 px-4 py-3 focus:outline-none focus:border-gold-400 bg-cream"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full btn-primary py-4">Login →</button>
        </form>
      </motion.div>
    </div>
  );
}

// ── DASHBOARD TAB ──────────────────────────────────────
function DashboardTab({ orders }) {
  const { i18n } = useTranslation();
  const isMarathi = i18n.language === 'mr';
  const revenue = orders.reduce((s, o) => s + o.amount, 0);
  const pending = orders.filter(o => o.status === 'pending').length;

  const stats = [
    { label: isMarathi ? 'एकूण ऑर्डर' : 'Total Orders', value: orders.length, icon: ShoppingCart, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: isMarathi ? 'एकूण महसूल' : 'Total Revenue', value: `₹${revenue.toLocaleString('en-IN')}`, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
    { label: isMarathi ? 'एकूण उत्पादने' : 'Total Products', value: initialProducts.length, icon: Package, color: 'text-gold-600', bg: 'bg-gold-50' },
    { label: isMarathi ? 'प्रलंबित ऑर्डर' : 'Pending Orders', value: pending, icon: Eye, color: 'text-maroon-600', bg: 'bg-maroon-50' },
  ];

  return (
    <div>
      <h2 className="font-display text-2xl text-maroon-700 mb-6">{isMarathi ? 'डॅशबोर्ड' : 'Dashboard'}</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white border border-gold-100 p-5 rounded-sm"
          >
            <div className={`w-10 h-10 ${s.bg} rounded-full flex items-center justify-center mb-3`}>
              <s.icon size={18} className={s.color} />
            </div>
            <div className="font-display text-2xl font-bold text-maroon-800">{s.value}</div>
            <div className="text-xs text-gray-400 mt-1">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <h3 className="font-display text-lg text-maroon-700 mb-4">{isMarathi ? 'अलीकडील ऑर्डर' : 'Recent Orders'}</h3>
      <div className="bg-white border border-gold-100 overflow-x-auto rounded-sm">
        <table className="w-full text-sm">
          <thead className="bg-gold-50 border-b border-gold-200">
            <tr>
              {['Order ID', 'Customer', 'Amount', 'Items', 'Date', 'Status'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-maroon-700 font-semibold text-xs uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gold-50">
            {orders.slice(0, 5).map(order => (
              <tr key={order.id} className="hover:bg-gold-50/50">
                <td className="px-4 py-3 font-mono text-maroon-600 font-medium">{order.id}</td>
                <td className="px-4 py-3 text-gray-700">{order.customer}</td>
                <td className="px-4 py-3 font-semibold text-maroon-700">₹{order.amount.toLocaleString('en-IN')}</td>
                <td className="px-4 py-3 text-gray-500">{order.items}</td>
                <td className="px-4 py-3 text-gray-500">{order.date}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${STATUS_COLORS[order.status]}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── PRODUCTS TAB ───────────────────────────────────────
function ProductsTab() {
  const { i18n } = useTranslation();
  const isMarathi = i18n.language === 'mr';
  const [prods, setProds] = useState(initialProducts);
  const [showAdd, setShowAdd] = useState(false);
  const [newProd, setNewProd] = useState({ name: '', price: '', category: 'necklaces', inStock: true });

  const handleDelete = (id) => {
    setProds(p => p.filter(x => x.id !== id));
    toast.success('Product deleted');
  };

  const handleToggleStock = (id) => {
    setProds(p => p.map(x => x.id === id ? { ...x, inStock: !x.inStock } : x));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const prod = {
      id: Date.now(),
      name: newProd.name,
      nameMarathi: newProd.name,
      category: newProd.category,
      metal: 'silver',
      price: Number(newProd.price),
      originalPrice: Number(newProd.price),
      weight: '20g',
      purity: '92.5% Sterling Silver',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80',
      images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80'],
      description: '',
      descriptionMarathi: '',
      tags: [],
      inStock: newProd.inStock,
      featured: false,
      rating: 4.5,
      reviews: 0,
    };
    setProds(p => [prod, ...p]);
    setShowAdd(false);
    setNewProd({ name: '', price: '', category: 'necklaces', inStock: true });
    toast.success('Product added!');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl text-maroon-700">{isMarathi ? 'उत्पादन व्यवस्थापन' : 'Product Management'}</h2>
        <button onClick={() => setShowAdd(!showAdd)} className="btn-primary flex items-center gap-2 !py-2">
          <Plus size={16} /> {isMarathi ? 'नवीन जोडा' : 'Add New'}
        </button>
      </div>

      {showAdd && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-gold-50 border border-gold-200 p-6 mb-6"
        >
          <h3 className="font-semibold text-maroon-700 mb-4">{isMarathi ? 'नवीन उत्पादन' : 'Add New Product'}</h3>
          <form onSubmit={handleAdd} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Product Name"
              value={newProd.name}
              onChange={e => setNewProd(p => ({ ...p, name: e.target.value }))}
              required
              className="border border-gold-200 px-3 py-2 text-sm bg-white focus:outline-none focus:border-gold-400 col-span-2"
            />
            <input
              type="number"
              placeholder="Price (₹)"
              value={newProd.price}
              onChange={e => setNewProd(p => ({ ...p, price: e.target.value }))}
              required
              className="border border-gold-200 px-3 py-2 text-sm bg-white focus:outline-none focus:border-gold-400"
            />
            <select
              value={newProd.category}
              onChange={e => setNewProd(p => ({ ...p, category: e.target.value }))}
              className="border border-gold-200 px-3 py-2 text-sm bg-white focus:outline-none focus:border-gold-400"
            >
              {['necklaces','earrings','bangles','pendants','anklets','bracelets','nath'].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <div className="flex gap-2 col-span-2 md:col-span-4">
              <button type="submit" className="btn-primary !py-2 flex items-center gap-1">
                <Check size={14} /> Save
              </button>
              <button type="button" onClick={() => setShowAdd(false)} className="border border-gray-200 px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 flex items-center gap-1">
                <X size={14} /> Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="bg-white border border-gold-100 overflow-x-auto rounded-sm">
        <table className="w-full text-sm">
          <thead className="bg-gold-50 border-b border-gold-200">
            <tr>
              {['Image', 'Name', 'Category', 'Price', 'Stock', 'Actions'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-maroon-700 font-semibold text-xs uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gold-50">
            {prods.map(prod => (
              <tr key={prod.id} className="hover:bg-gold-50/30">
                <td className="px-4 py-3">
                  <img src={prod.image} alt="" className="w-12 h-12 object-cover border border-gold-100" />
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-maroon-800">{prod.name}</div>
                  <div className="text-xs text-gray-400">{prod.purity}</div>
                </td>
                <td className="px-4 py-3 text-gray-500 capitalize">{prod.category}</td>
                <td className="px-4 py-3 font-semibold text-maroon-700">₹{prod.price.toLocaleString('en-IN')}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleToggleStock(prod.id)}
                    className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors ${
                      prod.inStock ? 'bg-green-100 text-green-700 hover:bg-red-100 hover:text-red-700' : 'bg-red-100 text-red-700 hover:bg-green-100 hover:text-green-700'
                    }`}
                  >
                    {prod.inStock ? 'In Stock' : 'Out of Stock'}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="w-8 h-8 bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 rounded-sm">
                      <Edit size={14} />
                    </button>
                    <button onClick={() => handleDelete(prod.id)} className="w-8 h-8 bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 rounded-sm">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── ORDERS TAB ─────────────────────────────────────────
function OrdersTab({ orders, updateOrderStatus }) {
  const { i18n } = useTranslation();
  const isMarathi = i18n.language === 'mr';

  return (
    <div>
      <h2 className="font-display text-2xl text-maroon-700 mb-6">{isMarathi ? 'ऑर्डर व्यवस्थापन' : 'Order Management'}</h2>
      <div className="bg-white border border-gold-100 overflow-x-auto rounded-sm">
        <table className="w-full text-sm">
          <thead className="bg-gold-50 border-b border-gold-200">
            <tr>
              {['Order ID', 'Customer', 'Amount', 'Items', 'Date', 'Status', 'Update'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-maroon-700 font-semibold text-xs uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gold-50">
            {orders.map(order => (
              <tr key={order.id} className="hover:bg-gold-50/30">
                <td className="px-4 py-3 font-mono text-maroon-600 font-medium">{order.id}</td>
                <td className="px-4 py-3 text-gray-700 font-medium">{order.customer}</td>
                <td className="px-4 py-3 font-semibold text-maroon-700">₹{order.amount.toLocaleString('en-IN')}</td>
                <td className="px-4 py-3 text-gray-500">{order.items}</td>
                <td className="px-4 py-3 text-gray-500">{order.date}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${STATUS_COLORS[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={order.status}
                    onChange={e => updateOrderStatus(order.id, e.target.value)}
                    className="border border-gold-200 text-xs px-2 py-1.5 focus:outline-none focus:border-gold-400 bg-cream"
                  >
                    {['pending','processing','shipped','delivered','cancelled'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── ANALYTICS TAB ──────────────────────────────────────
function AnalyticsTab({ orders }) {
  const { i18n } = useTranslation();
  const isMarathi = i18n.language === 'mr';
  const revenue = orders.reduce((s, o) => s + o.amount, 0);

  const categoryData = [
    { cat: 'Necklaces', count: 34, revenue: 95000 },
    { cat: 'Earrings', count: 67, revenue: 45000 },
    { cat: 'Bangles', count: 23, revenue: 38000 },
    { cat: 'Pendants', count: 45, revenue: 55000 },
    { cat: 'Anklets', count: 12, revenue: 22000 },
  ];
  const maxRev = Math.max(...categoryData.map(d => d.revenue));

  return (
    <div>
      <h2 className="font-display text-2xl text-maroon-700 mb-6">{isMarathi ? 'विश्लेषण' : 'Analytics'}</h2>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Revenue by Category */}
        <div className="bg-white border border-gold-100 p-6">
          <h3 className="font-semibold text-maroon-700 mb-4">{isMarathi ? 'श्रेणीनुसार महसूल' : 'Revenue by Category'}</h3>
          <div className="space-y-3">
            {categoryData.map((d, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{d.cat}</span>
                  <span className="font-semibold text-maroon-700">₹{d.revenue.toLocaleString('en-IN')}</span>
                </div>
                <div className="h-2 bg-gold-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(d.revenue / maxRev) * 100}%` }}
                    transition={{ delay: i * 0.1, duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-maroon-500 to-gold-500 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Status */}
        <div className="bg-white border border-gold-100 p-6">
          <h3 className="font-semibold text-maroon-700 mb-4">{isMarathi ? 'ऑर्डर स्थिती' : 'Order Status'}</h3>
          <div className="space-y-3">
            {['delivered','processing','pending','shipped'].map((status, i) => {
              const count = orders.filter(o => o.status === status).length;
              return (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${STATUS_COLORS[status].split(' ')[0]}`} />
                    <span className="text-sm text-gray-600 capitalize">{status}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${STATUS_COLORS[status].split(' ')[0]}`}
                        style={{ width: `${(count / orders.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-maroon-700 w-4">{count}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-gold-100 grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="font-display text-2xl font-bold text-maroon-700">₹{revenue.toLocaleString('en-IN')}</div>
              <div className="text-xs text-gray-400">{isMarathi ? 'एकूण महसूल' : 'Total Revenue'}</div>
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-green-600">
                ₹{Math.round(revenue / orders.length).toLocaleString('en-IN')}
              </div>
              <div className="text-xs text-gray-400">{isMarathi ? 'सरासरी ऑर्डर' : 'Avg Order Value'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── MAIN ADMIN ─────────────────────────────────────────
export default function AdminPage() {
  const { t, i18n } = useTranslation();
  const isMarathi = i18n.language === 'mr';
  const { isLoggedIn, logout, orders, updateOrderStatus } = useAdminStore();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!isLoggedIn) return <AdminLogin />;

  const tabs = [
    { id: 'dashboard', icon: LayoutDashboard, label: t('dashboard') },
    { id: 'products', icon: Package, label: t('products_mgmt') },
    { id: 'orders', icon: ShoppingCart, label: t('orders') },
    { id: 'analytics', icon: BarChart3, label: t('analytics') },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-56 admin-sidebar text-white flex flex-col shrink-0 sticky top-0 h-screen">
        <div className="p-5 border-b border-maroon-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center text-maroon-900 text-sm">✦</div>
            <div>
              <div className="text-xs font-bold text-gold-300 leading-tight">Mahalaxmi</div>
              <div className="text-xs text-gold-600">Admin Panel</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 rounded-sm ${
                activeTab === tab.id
                  ? 'bg-gold-500/20 text-gold-300 border-l-2 border-gold-400'
                  : 'text-maroon-300 hover:bg-maroon-700/50 hover:text-gold-400'
              }`}
            >
              <tab.icon size={17} />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-maroon-700">
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-4 py-3 text-sm text-maroon-300 hover:text-red-300 transition-colors"
          >
            <LogOut size={16} />
            {isMarathi ? 'बाहेर पडा' : 'Logout'}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 overflow-y-auto">
        {activeTab === 'dashboard' && <DashboardTab orders={orders} />}
        {activeTab === 'products' && <ProductsTab />}
        {activeTab === 'orders' && <OrdersTab orders={orders} updateOrderStatus={updateOrderStatus} />}
        {activeTab === 'analytics' && <AnalyticsTab orders={orders} />}
      </main>
    </div>
  );
}
