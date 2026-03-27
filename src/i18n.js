import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Nav
      home: 'Home',
      products: 'Products',
      about: 'About Us',
      contact: 'Contact',
      cart: 'Cart',
      admin: 'Admin',
      language: 'मराठी',
      
      // Hero
      hero_tag: 'Handcrafted Silver Jewellery',
      hero_title: 'Mahalaxmi Jwellers',
      hero_subtitle: 'Est. 1985 · Satara, Maharashtra',
      hero_desc: 'Exquisite silver jewellery crafted with generations of artisan tradition. Every piece tells a story of Maharashtra\'s rich cultural heritage.',
      shop_now: 'Shop Collection',
      our_story: 'Our Story',
      
      // Features
      pure_silver: 'Pure Silver',
      pure_silver_desc: '92.5% Sterling Silver certified',
      handcrafted: 'Handcrafted',
      handcrafted_desc: 'Made by skilled artisans',
      free_delivery: 'Free Delivery',
      free_delivery_desc: 'On orders above ₹2000',
      easy_returns: 'Easy Returns',
      easy_returns_desc: '15-day return policy',
      
      // Products
      featured_collection: 'Featured Collection',
      featured_subtitle: 'Discover our most beloved pieces',
      view_all: 'View All Products',
      add_to_cart: 'Add to Cart',
      out_of_stock: 'Out of Stock',
      in_stock: 'In Stock',
      buy_now: 'Buy Now',
      
      // Cart
      your_cart: 'Your Cart',
      cart_empty: 'Your cart is empty',
      subtotal: 'Subtotal',
      checkout: 'Checkout',
      remove: 'Remove',
      quantity: 'Quantity',
      
      // Checkout
      checkout_title: 'Checkout',
      full_name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      address: 'Street Address',
      city: 'City',
      state: 'State',
      pincode: 'Pincode',
      place_order: 'Place Order',
      payment_razorpay: 'Pay with Razorpay',
      order_summary: 'Order Summary',
      
      // About
      about_title: 'Our Heritage',
      about_subtitle: 'Four Decades of Silver Craft',
      about_desc1: 'Founded in 1985 by Late Shri Vishwanath Kulkarni, Mahalaxmi Jwellers has been a trusted name in silver jewellery for over four decades. Located in the heart of Satara, Maharashtra, we specialize in traditional Maharashtrian designs.',
      about_desc2: 'We manufacture all our silver jewellery in-house, ensuring the finest quality and purity in every piece. Our craftsmen have honed their skills over generations, preserving the ancient techniques while embracing modern designs.',
      years_exp: 'Years of Experience',
      happy_customers: 'Happy Customers',
      designs: 'Unique Designs',
      artisans: 'Master Artisans',
      
      // Contact
      contact_title: 'Visit Us',
      contact_subtitle: 'We\'d love to hear from you',
      our_address: 'Our Address',
      call_us: 'Call Us',
      email_us: 'Email Us',
      hours: 'Working Hours',
      hours_val: 'Mon - Sat: 10am - 8pm',
      send_message: 'Send Message',
      your_name: 'Your Name',
      your_email: 'Your Email',
      your_message: 'Your Message',
      send: 'Send Message',
      
      // Admin
      dashboard: 'Dashboard',
      products_mgmt: 'Products',
      orders: 'Orders',
      inventory: 'Inventory',
      analytics: 'Analytics',
      total_orders: 'Total Orders',
      total_revenue: 'Total Revenue',
      total_products: 'Total Products',
      pending_orders: 'Pending Orders',
      
      // Common
      loading: 'Loading...',
      search: 'Search jewellery...',
      filter_by: 'Filter by',
      sort_by: 'Sort by',
      price_low: 'Price: Low to High',
      price_high: 'Price: High to Low',
      newest: 'Newest First',
      popular: 'Most Popular',
      off: 'OFF',
      bestseller: 'Bestseller',
      new: 'New',
      bridal: 'Bridal',
      traditional: 'Traditional',
    }
  },
  mr: {
    translation: {
      // Nav
      home: 'मुख्यपृष्ठ',
      products: 'उत्पादने',
      about: 'आमच्याबद्दल',
      contact: 'संपर्क',
      cart: 'कार्ट',
      admin: 'प्रशासन',
      language: 'English',
      
      // Hero
      hero_tag: 'हस्तनिर्मित चांदीचे दागिने',
      hero_title: 'महालक्ष्मी ज्वेलर्स',
      hero_subtitle: 'स्थापना १९८५ · सातारा, महाराष्ट्र',
      hero_desc: 'पिढ्यांच्या कारागीर परंपरेने तयार केलेले उत्कृष्ट चांदीचे दागिने. प्रत्येक तुकडा महाराष्ट्राच्या समृद्ध सांस्कृतिक वारशाची कथा सांगतो.',
      shop_now: 'संग्रह पहा',
      our_story: 'आमची कथा',
      
      // Features
      pure_silver: 'शुद्ध चांदी',
      pure_silver_desc: '९२.५% स्टर्लिंग सिल्व्हर प्रमाणित',
      handcrafted: 'हस्तनिर्मित',
      handcrafted_desc: 'कुशल कारागिरांनी बनवलेले',
      free_delivery: 'मोफत डिलिव्हरी',
      free_delivery_desc: '₹२००० पेक्षा जास्त ऑर्डरवर',
      easy_returns: 'सहज परतावा',
      easy_returns_desc: '१५ दिवसांची परत धोरण',
      
      // Products
      featured_collection: 'विशेष संग्रह',
      featured_subtitle: 'आमचे सर्वात लोकप्रिय दागिने शोधा',
      view_all: 'सर्व उत्पादने पहा',
      add_to_cart: 'कार्टमध्ये जोडा',
      out_of_stock: 'स्टॉक संपला',
      in_stock: 'उपलब्ध',
      buy_now: 'आता खरेदी करा',
      
      // Cart
      your_cart: 'तुमची कार्ट',
      cart_empty: 'तुमची कार्ट रिकामी आहे',
      subtotal: 'एकूण',
      checkout: 'चेकआउट',
      remove: 'काढा',
      quantity: 'प्रमाण',
      
      // Checkout
      checkout_title: 'चेकआउट',
      full_name: 'पूर्ण नाव',
      email: 'ईमेल पत्ता',
      phone: 'फोन नंबर',
      address: 'पत्ता',
      city: 'शहर',
      state: 'राज्य',
      pincode: 'पिनकोड',
      place_order: 'ऑर्डर द्या',
      payment_razorpay: 'Razorpay ने पैसे द्या',
      order_summary: 'ऑर्डर सारांश',
      
      // About
      about_title: 'आमचा वारसा',
      about_subtitle: 'चांदी कारागिरीचे चार दशके',
      about_desc1: 'स्वर्गीय श्री विश्वनाथ कुलकर्णी यांनी १९८५ मध्ये स्थापन केलेले महालक्ष्मी ज्वेलर्स चार दशकांहून अधिक काळ चांदीच्या दागिन्यांमध्ये विश्वासू नाव आहे. सातारा, महाराष्ट्राच्या हृदयात स्थित, आम्ही पारंपारिक महाराष्ट्रीय डिझाइनमध्ये विशेषज्ञ आहोत.',
      about_desc2: 'आम्ही आमचे सर्व चांदीचे दागिने स्वतः तयार करतो, प्रत्येक तुकड्यात उत्कृष्ट गुणवत्ता आणि शुद्धता सुनिश्चित करतो. आमचे कारागीर पिढ्यांपासून त्यांचे कौशल्य तयार केले आहे, आधुनिक डिझाइन स्वीकारताना प्राचीन तंत्रांचे जतन करत आहेत.',
      years_exp: 'वर्षांचा अनुभव',
      happy_customers: 'आनंदी ग्राहक',
      designs: 'अनोखी डिझाइन',
      artisans: 'मास्टर कारागीर',
      
      // Contact
      contact_title: 'आम्हाला भेट द्या',
      contact_subtitle: 'आम्हाला तुमच्याशी बोलायला आवडेल',
      our_address: 'आमचा पत्ता',
      call_us: 'कॉल करा',
      email_us: 'ईमेल करा',
      hours: 'कामाचे तास',
      hours_val: 'सोम - शनि: सकाळी १० - रात्री ८',
      send_message: 'संदेश पाठवा',
      your_name: 'तुमचे नाव',
      your_email: 'तुमचा ईमेल',
      your_message: 'तुमचा संदेश',
      send: 'संदेश पाठवा',
      
      // Admin
      dashboard: 'डॅशबोर्ड',
      products_mgmt: 'उत्पादने',
      orders: 'ऑर्डर',
      inventory: 'यादी',
      analytics: 'विश्लेषण',
      total_orders: 'एकूण ऑर्डर',
      total_revenue: 'एकूण महसूल',
      total_products: 'एकूण उत्पादने',
      pending_orders: 'प्रलंबित ऑर्डर',
      
      // Common
      loading: 'लोड होत आहे...',
      search: 'दागिने शोधा...',
      filter_by: 'फिल्टर करा',
      sort_by: 'क्रमवारी लावा',
      price_low: 'किंमत: कमी ते जास्त',
      price_high: 'किंमत: जास्त ते कमी',
      newest: 'नवीन प्रथम',
      popular: 'सर्वाधिक लोकप्रिय',
      off: 'सूट',
      bestseller: 'बेस्टसेलर',
      new: 'नवीन',
      bridal: 'विवाह',
      traditional: 'पारंपारिक',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
