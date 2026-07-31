// ── PRODUCT DATA (100% UNIQUE & CURATED HIGH-QUALITY UNSPLASH PRODUCT IMAGE URLS) ──
const PRODUCTS = [
  // ── ELECTRONICS (1-25) ──
  { id: 1, name: "Wireless Earbuds Pro", category: "electronics", images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80", "https://images.unsplash.com/photo-1606841638029-58a917b89b88?auto=format&fit=crop&w=400&q=80", "https://images.unsplash.com/photo-1610438235354-c6fa1b92b63d?auto=format&fit=crop&w=400&q=80"], price: 1299, original: 1999, rating: 4.8, reviews: 234, badge: "SALE", badgeType: "" },
  { id: 2, name: "Smart Watch Series 5", category: "electronics", images: ["https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=400&q=80"], price: 2499, original: 3499, rating: 4.7, reviews: 187, badge: "SALE", badgeType: "" },
  { id: 3, name: "4K Webcam HD", category: "electronics", images: ["https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=400&q=80"], price: 1899, original: null, rating: 4.5, reviews: 92, badge: "NEW", badgeType: "new" },
  { id: 4, name: "Mechanical Keyboard", category: "electronics", images: ["https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=400&q=80"], price: 2199, original: 2799, rating: 4.6, reviews: 156, badge: "SALE", badgeType: "" },
  { id: 5, name: "USB-C Hub 7-in-1", category: "electronics", image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=400&q=80", price: 699, original: 999, rating: 4.6, reviews: 267, badge: "SALE", badgeType: "" },
  { id: 6, name: "Bluetooth Speaker Sound", category: "electronics", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=400&q=80", price: 1599, original: 2499, rating: 4.5, reviews: 142, badge: "SALE", badgeType: "" },
  { id: 7, name: "Gaming Mouse RGB", category: "electronics", image: "https://images.unsplash.com/photo-1527866990264-b5b71ffecb2a?auto=format&fit=crop&w=400&q=80", price: 999, original: 1499, rating: 4.4, reviews: 110, badge: "SALE", badgeType: "" },
  { id: 8, name: "Noise Cancelling Headset", category: "electronics", image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&q=80", price: 3499, original: 4999, rating: 4.8, reviews: 312, badge: "SALE", badgeType: "" },
  { id: 9, name: "Power Bank 20000mAh", category: "electronics", image: "https://images.unsplash.com/photo-1609591035787-8dfab76686b2?auto=format&fit=crop&w=400&q=80", price: 1199, original: null, rating: 4.6, reviews: 88, badge: "NEW", badgeType: "new" },
  { id: 10, name: "Smart LED Light Bulb", category: "electronics", image: "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?auto=format&fit=crop&w=400&q=80", price: 499, original: 899, rating: 4.3, reviews: 198, badge: "SALE", badgeType: "" },
  { id: 11, name: "VR Headset Play", category: "electronics", image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=400&q=80", price: 2999, original: 3999, rating: 4.7, reviews: 76, badge: "SALE", badgeType: "" },
  { id: 12, name: "Wireless Charger Stand", category: "electronics", image: "https://images.unsplash.com/photo-1622445262465-24819aa510e5?auto=format&fit=crop&w=400&q=80", price: 799, original: 1199, rating: 4.5, reviews: 124, badge: "SALE", badgeType: "" },
  { id: 13, name: "Tablet Stand Adjustable", category: "electronics", image: "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&w=400&q=80", price: 599, original: null, rating: 4.4, reviews: 54, badge: "NEW", badgeType: "new" },
  { id: 14, name: "LED Ring Light Desk", category: "electronics", image: "https://images.unsplash.com/photo-1593062096030-cf2274ab5c86?auto=format&fit=crop&w=400&q=80", price: 899, original: 1499, rating: 4.5, reviews: 165, badge: "SALE", badgeType: "" },
  { id: 15, name: "External Portable SSD", category: "electronics", image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=400&q=80", price: 4499, original: 5999, rating: 4.9, reviews: 210, badge: "SALE", badgeType: "" },
  { id: 16, name: "DSLR Camera Lens", category: "electronics", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80", price: 5499, original: 7999, rating: 4.8, reviews: 63, badge: "SALE", badgeType: "" },
  { id: 17, name: "Smart Wi-Fi Plug", category: "electronics", image: "https://images.unsplash.com/photo-1558089687-f282ffcdb285?auto=format&fit=crop&w=400&q=80", price: 649, original: null, rating: 4.4, reviews: 145, badge: "NEW", badgeType: "new" },
  { id: 18, name: "Mini Bluetooth Tracker", category: "electronics", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80", price: 399, original: 599, rating: 4.2, reviews: 290, badge: "SALE", badgeType: "" },
  { id: 19, name: "Drawing Tablet Pen", category: "electronics", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80", price: 1999, original: null, rating: 4.6, reviews: 78, badge: "NEW", badgeType: "new" },
  { id: 20, name: "HDMI Splitter 4K", category: "electronics", image: "https://images.unsplash.com/photo-1562408590-e32931084e23?auto=format&fit=crop&w=400&q=80", price: 449, original: 699, rating: 4.3, reviews: 215, badge: "SALE", badgeType: "" },
  { id: 21, name: "Wireless Silent Mouse", category: "electronics", image: "https://images.unsplash.com/photo-1551645121-d1034a2a73d4?auto=format&fit=crop&w=400&q=80", price: 799, original: null, rating: 4.5, reviews: 104, badge: "NEW", badgeType: "new" },
  { id: 22, name: "Smart Thermostat Pro", category: "electronics", image: "https://images.unsplash.com/photo-1586210579191-33b2c6ad5fc2?auto=format&fit=crop&w=400&q=80", price: 3999, original: 5999, rating: 4.7, reviews: 46, badge: "SALE", badgeType: "" },
  { id: 23, name: "Laptop Cooler Pad", category: "electronics", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=400&q=80", price: 899, original: 1299, rating: 4.4, reviews: 112, badge: "SALE", badgeType: "" },
  { id: 24, name: "USB Desktop Microphone", category: "electronics", image: "https://images.unsplash.com/photo-1597872200309-2b6f777e4a81?auto=format&fit=crop&w=400&q=80", price: 1499, original: null, rating: 4.5, reviews: 87, badge: "NEW", badgeType: "new" },
  { id: 25, name: "Mini Projector Full HD", category: "electronics", image: "https://images.unsplash.com/photo-1580234810907-b40315b76418?auto=format&fit=crop&w=400&q=80", price: 4999, original: 6999, rating: 4.6, reviews: 59, badge: "SALE", badgeType: "" },

  // ── FASHION (26-50) ──
  { id: 26, name: "Running Sneakers Red", category: "fashion", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80", price: 899, original: 1299, rating: 4.4, reviews: 320, badge: "SALE", badgeType: "" },
  { id: 27, name: "Denim Jacket Vintage", category: "fashion", image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=400&q=80", price: 1499, original: null, rating: 4.3, reviews: 89, badge: "NEW", badgeType: "new" },
  { id: 28, name: "Hooded Sweatshirt Cozy", category: "fashion", image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=400&q=80", price: 999, original: 1599, rating: 4.5, reviews: 242, badge: "SALE", badgeType: "" },
  { id: 29, name: "Classic Cotton T-Shirt", category: "fashion", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80", price: 399, original: null, rating: 4.2, reviews: 310, badge: "NEW", badgeType: "new" },
  { id: 30, name: "Leather Boot Classic", category: "fashion", image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=400&q=80", price: 2499, original: 3499, rating: 4.7, reviews: 154, badge: "SALE", badgeType: "" },
  { id: 31, name: "Floral Summer Dress", category: "fashion", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=400&q=80", price: 1299, original: 1999, rating: 4.6, reviews: 178, badge: "SALE", badgeType: "" },
  { id: 32, name: "Wool Knitted Scarf", category: "fashion", image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=400&q=80", price: 499, original: null, rating: 4.4, reviews: 93, badge: "NEW", badgeType: "new" },
  { id: 33, name: "Athletic Running Socks", category: "fashion", image: "https://images.unsplash.com/photo-1582966772680-860e372bb558?auto=format&fit=crop&w=400&q=80", price: 299, original: 499, rating: 4.3, reviews: 187, badge: "SALE", badgeType: "" },
  { id: 34, name: "Classic Bomber Jacket", category: "fashion", image: "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?auto=format&fit=crop&w=400&q=80", price: 1999, original: 2999, rating: 4.6, reviews: 204, badge: "SALE", badgeType: "" },
  { id: 35, name: "Men's Athletic Shorts", category: "fashion", image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=400&q=80", price: 499, original: null, rating: 4.3, reviews: 88, badge: "NEW", badgeType: "new" },
  { id: 36, name: "Warm Puffer Vest", category: "fashion", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80", price: 1399, original: 1999, rating: 4.5, reviews: 119, badge: "SALE", badgeType: "" },
  { id: 37, name: "Wool Knitted Beanie", category: "fashion", image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=400&q=80", price: 349, original: 499, rating: 4.4, reviews: 165, badge: "SALE", badgeType: "" },
  { id: 38, name: "Slim Fit Polo Shirt", category: "fashion", image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=400&q=80", price: 599, original: null, rating: 4.2, reviews: 122, badge: "NEW", badgeType: "new" },
  { id: 39, name: "Elegant Trench Coat", category: "fashion", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=400&q=80", price: 2999, original: 4499, rating: 4.8, reviews: 54, badge: "SALE", badgeType: "" },
  { id: 40, name: "Casual Linen Shirt", category: "fashion", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=400&q=80", price: 799, original: 1199, rating: 4.5, reviews: 102, badge: "SALE", badgeType: "" },
  { id: 41, name: "Stretch Cargo Pants", category: "fashion", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=400&q=80", price: 1199, original: null, rating: 4.4, reviews: 89, badge: "NEW", badgeType: "new" },
  { id: 42, name: "Hooded Raincoat Jacket", category: "fashion", image: "https://images.unsplash.com/photo-1508186227443-4ccb5064e622?auto=format&fit=crop&w=400&q=80", price: 1699, original: 2499, rating: 4.6, reviews: 76, badge: "SALE", badgeType: "" },
  { id: 43, name: "Checked Flannel Shirt", category: "fashion", image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=400&q=80", price: 699, original: 999, rating: 4.4, reviews: 132, badge: "SALE", badgeType: "" },
  { id: 44, name: "Suede Leather Loafers", category: "fashion", image: "https://images.unsplash.com/photo-1533867617858-e40193202093?auto=format&fit=crop&w=400&q=80", price: 1899, original: null, rating: 4.5, reviews: 67, badge: "NEW", badgeType: "new" },
  { id: 45, name: "Cozy Fleece Pullover", category: "fashion", image: "https://images.unsplash.com/photo-1606813907291-d86feb9b94be?auto=format&fit=crop&w=400&q=80", price: 1199, original: 1699, rating: 4.5, reviews: 118, badge: "SALE", badgeType: "" },
  { id: 46, name: "Thermolite Winter Gloves", category: "fashion", image: "https://images.unsplash.com/photo-1588850561407-ed78cb9ba639?auto=format&fit=crop&w=400&q=80", price: 399, original: 599, rating: 4.3, reviews: 95, badge: "SALE", badgeType: "" },
  { id: 47, name: "Classic Leather Belt", category: "fashion", image: "https://images.unsplash.com/photo-1617137984095-74b4e5e361b7?auto=format&fit=crop&w=400&q=80", price: 599, original: null, rating: 4.5, reviews: 145, badge: "NEW", badgeType: "new" },
  { id: 48, name: "Casual Denim Shorts", category: "fashion", image: "https://images.unsplash.com/photo-1542278912-db37f61ebe2d?auto=format&fit=crop&w=400&q=80", price: 699, original: 999, rating: 4.3, reviews: 81, badge: "SALE", badgeType: "" },
  { id: 49, name: "Activewear Gym Leggings", category: "fashion", image: "https://images.unsplash.com/photo-1506152983144-1f748d7d8c63?auto=format&fit=crop&w=400&q=80", price: 799, original: null, rating: 4.4, reviews: 164, badge: "NEW", badgeType: "new" },
  { id: 50, name: "Winter Woolen Sweater", category: "fashion", image: "https://images.unsplash.com/photo-1620799140407-88d4e0e5a8bc?auto=format&fit=crop&w=400&q=80", price: 1299, original: 1899, rating: 4.6, reviews: 92, badge: "SALE", badgeType: "" },

  // ── ACCESSORIES (51-75) ──
  { id: 51, name: "Sunglasses UV400 Dark", category: "accessories", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=80", price: 599, original: 899, rating: 4.2, reviews: 211, badge: "SALE", badgeType: "" },
  { id: 52, name: "Leather Wallet Trifold", category: "accessories", image: "https://images.unsplash.com/photo-1627124789736-223c15394407?auto=format&fit=crop&w=400&q=80", price: 499, original: null, rating: 4.5, reviews: 144, badge: "NEW", badgeType: "new" },
  { id: 53, name: "Canvas Backpack Grey", category: "accessories", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80", price: 849, original: null, rating: 4.3, reviews: 95, badge: "NEW", badgeType: "new" },
  { id: 54, name: "Minimalist Leather Watch", category: "accessories", image: "https://images.unsplash.com/photo-1524805444758-0891d3056a22?auto=format&fit=crop&w=400&q=80", price: 1899, original: 2999, rating: 4.7, reviews: 165, badge: "SALE", badgeType: "" },
  { id: 55, name: "Minimalist Silver Ring", category: "accessories", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=80", price: 299, original: null, rating: 4.4, reviews: 54, badge: "NEW", badgeType: "new" },
  { id: 56, name: "Leather Wristband Hook", category: "accessories", image: "https://images.unsplash.com/photo-1598311522206-b3f413a1b893?auto=format&fit=crop&w=400&q=80", price: 349, original: 499, rating: 4.3, reviews: 78, badge: "SALE", badgeType: "" },
  { id: 57, name: "Key Organizer Compact", category: "accessories", image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=400&q=80", price: 249, original: 399, rating: 4.2, reviews: 98, badge: "SALE", badgeType: "" },
  { id: 58, name: "Canvas Tote Bag Casual", category: "accessories", image: "https://images.unsplash.com/photo-1581605405803-0c4b7e94e773?auto=format&fit=crop&w=400&q=80", price: 399, original: null, rating: 4.3, reviews: 121, badge: "NEW", badgeType: "new" },
  { id: 59, name: "Leather Card Holder Slim", category: "accessories", image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=400&q=80", price: 299, original: 499, rating: 4.4, reviews: 188, badge: "SALE", badgeType: "" },
  { id: 60, name: "Travel Duffle Weekender", category: "accessories", image: "https://images.unsplash.com/photo-1530177119-411a7b4f57bc?auto=format&fit=crop&w=400&q=80", price: 1699, original: 2499, rating: 4.6, reviews: 76, badge: "SALE", badgeType: "" },
  { id: 61, name: "Passport Cover Sleeve", category: "accessories", image: "https://images.unsplash.com/photo-1517086822184-e91b5d63ad20?auto=format&fit=crop&w=400&q=80", price: 349, original: null, rating: 4.5, reviews: 62, badge: "NEW", badgeType: "new" },
  { id: 62, name: "Windproof Compact Umbrella", category: "accessories", image: "https://images.unsplash.com/photo-1484168887486-4432938a3d1b?auto=format&fit=crop&w=400&q=80", price: 549, original: 799, rating: 4.3, reviews: 115, badge: "SALE", badgeType: "" },
  { id: 63, name: "Sunglasses UV Gold Rim", category: "accessories", image: "https://images.unsplash.com/photo-1511499767150-5b8a096ac268?auto=format&fit=crop&w=400&q=80", price: 799, original: null, rating: 4.5, reviews: 84, badge: "NEW", badgeType: "new" },
  { id: 64, name: "Crossbody Canvas Sling", category: "accessories", image: "https://images.unsplash.com/photo-1566150905-11585a5e2274?auto=format&fit=crop&w=400&q=80", price: 649, original: 999, rating: 4.4, reviews: 110, badge: "SALE", badgeType: "" },
  { id: 65, name: "Enamel Lapel Pins Pack", category: "accessories", image: "https://images.unsplash.com/photo-1597244244000-1cbb46de6a91?auto=format&fit=crop&w=400&q=80", price: 299, original: 499, rating: 4.6, reviews: 145, badge: "SALE", badgeType: "" },
  { id: 66, name: "Sterling Silver Earring Set", category: "accessories", image: "https://images.unsplash.com/photo-1535632066927-14285495503e?auto=format&fit=crop&w=400&q=80", price: 799, original: null, rating: 4.7, reviews: 92, badge: "NEW", badgeType: "new" },
  { id: 67, name: "Silver Curb Link Chain", category: "accessories", image: "https://images.unsplash.com/photo-1599643478518-a784d2d4c88a?auto=format&fit=crop&w=400&q=80", price: 999, original: 1499, rating: 4.5, reviews: 104, badge: "SALE", badgeType: "" },
  { id: 68, name: "Minimalist Brass Cufflinks", category: "accessories", image: "https://images.unsplash.com/photo-1608748986522-83bf71f76e3d?auto=format&fit=crop&w=400&q=80", price: 449, original: null, rating: 4.4, reviews: 63, badge: "NEW", badgeType: "new" },
  { id: 69, name: "Silk Dress Tie Classic", category: "accessories", image: "https://images.unsplash.com/photo-1618886487332-9cb99580a15a?auto=format&fit=crop&w=400&q=80", price: 549, original: 899, rating: 4.4, reviews: 78, badge: "SALE", badgeType: "" },
  { id: 70, name: "Silk Pocket Square", category: "accessories", image: "https://images.unsplash.com/photo-1607346256372-a05eec06d30e?auto=format&fit=crop&w=400&q=80", price: 249, original: 399, rating: 4.3, reviews: 81, badge: "SALE", badgeType: "" },
  { id: 71, name: "Key Carabiner Clip Lock", category: "accessories", image: "https://images.unsplash.com/photo-1617637455325-0d3215be3082?auto=format&fit=crop&w=400&q=80", price: 199, original: null, rating: 4.5, reviews: 142, badge: "NEW", badgeType: "new" },
  { id: 72, name: "Laptop Sleeve Bag 13\"", category: "accessories", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&q=80", price: 599, original: 899, rating: 4.5, reviews: 104, badge: "SALE", badgeType: "" },
  { id: 73, name: "Hair Claw Clips Pack", category: "accessories", image: "https://images.unsplash.com/photo-1590480397835-27a1d04491a2?auto=format&fit=crop&w=400&q=80", price: 299, original: null, rating: 4.4, reviews: 164, badge: "NEW", badgeType: "new" },
  { id: 74, name: "Crossbody Phone Lanyard", category: "accessories", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80", price: 349, original: 499, rating: 4.3, reviews: 95, badge: "SALE", badgeType: "" },
  { id: 75, name: "Tech Accessories Organizer", category: "accessories", image: "https://images.unsplash.com/photo-1555529669-e69e7aa0db9a?auto=format&fit=crop&w=400&q=80", price: 699, original: 999, rating: 4.5, reviews: 110, badge: "SALE", badgeType: "" },

  // ── HOME (76-100) ──
  { id: 76, name: "Desk Lamp LED Table", category: "home", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=400&q=80", price: 799, original: null, rating: 4.4, reviews: 78, badge: "NEW", badgeType: "new" },
  { id: 77, name: "Laptop Stand Aluminium", category: "home", image: "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=400&q=80", price: 999, original: 1499, rating: 4.7, reviews: 132, badge: "SALE", badgeType: "" },
  { id: 78, name: "Ceramic Coffee Mug Clay", category: "home", image: "https://images.unsplash.com/photo-1514432324607-b382172d7fd0?auto=format&fit=crop&w=400&q=80", price: 299, original: 499, rating: 4.5, reviews: 144, badge: "SALE", badgeType: "" },
  { id: 79, name: "Scented Soy Candle Box", category: "home", image: "https://images.unsplash.com/photo-1603006905001-2e457fa9bcbc?auto=format&fit=crop&w=400&q=80", price: 349, original: null, rating: 4.3, reviews: 112, badge: "NEW", badgeType: "new" },
  { id: 80, name: "Throw Pillow Cotton Pack", category: "home", image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?auto=format&fit=crop&w=400&q=80", price: 549, original: 799, rating: 4.4, reviews: 98, badge: "SALE", badgeType: "" },
  { id: 81, name: "Wooden Desk Organizer", category: "home", image: "https://images.unsplash.com/photo-1513151233558-c8b59474e3d5?auto=format&fit=crop&w=400&q=80", price: 799, original: null, rating: 4.5, reviews: 81, badge: "NEW", badgeType: "new" },
  { id: 82, name: "Metal Desk Pen Holder", category: "home", image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=400&q=80", price: 249, original: 399, rating: 4.2, reviews: 54, badge: "SALE", badgeType: "" },
  { id: 83, name: "Succulent Plant Pot Clay", category: "home", image: "https://images.unsplash.com/photo-1509440159596-4112314f7678?auto=format&fit=crop&w=400&q=80", price: 299, original: null, rating: 4.4, reviews: 115, badge: "NEW", badgeType: "new" },
  { id: 84, name: "Glass Water Bottle Sleeve", category: "home", image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=400&q=80", price: 499, original: 699, rating: 4.5, reviews: 124, badge: "SALE", badgeType: "" },
  { id: 85, name: "Minimalist Wall Clock", category: "home", image: "https://images.unsplash.com/photo-1563861826102-14150978e82d?auto=format&fit=crop&w=400&q=80", price: 699, original: 999, rating: 4.3, reviews: 84, badge: "SALE", badgeType: "" },
  { id: 86, name: "Cork Coasters Set of 6", category: "home", image: "https://images.unsplash.com/photo-1610701502263-d14cf9b3c6c0?auto=format&fit=crop&w=400&q=80", price: 199, original: null, rating: 4.4, reviews: 145, badge: "NEW", badgeType: "new" },
  { id: 87, name: "A5 Bullet Grid Notebook", category: "home", image: "https://images.unsplash.com/photo-1531346878353-d90979877713?auto=format&fit=crop&w=400&q=80", price: 299, original: 449, rating: 4.5, reviews: 104, badge: "SALE", badgeType: "" },
  { id: 88, name: "LED Sunset Lamp Night", category: "home", image: "https://images.unsplash.com/photo-1558882224-e2221b030e60?auto=format&fit=crop&w=400&q=80", price: 449, original: null, rating: 4.4, reviews: 63, badge: "NEW", badgeType: "new" },
  { id: 89, name: "Digital Kitchen Scale", category: "home", image: "https://images.unsplash.com/photo-1602906501166-70f3f2f9c9b1?auto=format&fit=crop&w=400&q=80", price: 549, original: 799, rating: 4.5, reviews: 78, badge: "SALE", badgeType: "" },
  { id: 90, name: "Wooden Clothes Hangers", category: "home", image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=400&q=80", price: 399, original: null, rating: 4.3, reviews: 110, badge: "NEW", badgeType: "new" },
  { id: 91, name: "Felt Storage Organizer", category: "home", image: "https://images.unsplash.com/photo-1616627561953-dd46cb927bb3?auto=format&fit=crop&w=400&q=80", price: 499, original: 699, rating: 4.4, reviews: 92, badge: "SALE", badgeType: "" },
  { id: 92, name: "Essential Oil Diffuser", category: "home", image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=400&q=80", price: 899, original: null, rating: 4.5, reviews: 164, badge: "NEW", badgeType: "new" },
  { id: 93, name: "Soft Cotton Bath Towels", category: "home", image: "https://images.unsplash.com/photo-1563453305-1847c10b751a?auto=format&fit=crop&w=400&q=80", price: 799, original: 1199, rating: 4.6, reviews: 95, badge: "SALE", badgeType: "" },
  { id: 94, name: "Picture Frame Wooden A4", category: "home", image: "https://images.unsplash.com/photo-1583847268964-9d55f77a012c?auto=format&fit=crop&w=400&q=80", price: 349, original: 499, rating: 4.3, reviews: 110, badge: "SALE", badgeType: "" },
  { id: 95, name: "USB Powered Desk Fan", category: "home", image: "https://images.unsplash.com/photo-1565130838687-f8330ff2d03a?auto=format&fit=crop&w=400&q=80", price: 449, original: null, rating: 4.4, reviews: 63, badge: "NEW", badgeType: "new" },
  { id: 96, name: "Herb Planter Trio Pot", category: "home", image: "https://images.unsplash.com/photo-1485955900088-9079d2b293ca?auto=format&fit=crop&w=400&q=80", price: 599, original: 899, rating: 4.5, reviews: 81, badge: "SALE", badgeType: "" },
  { id: 97, name: "Collapsible Shoe Rack", category: "home", image: "https://images.unsplash.com/photo-1601004890609-7ff8cd0f38b4?auto=format&fit=crop&w=400&q=80", price: 799, original: null, rating: 4.4, reviews: 95, badge: "NEW", badgeType: "new" },
  { id: 98, name: "Insulated Thermal Flask", category: "home", image: "https://images.unsplash.com/photo-1544207613-2d9c4c54f575?auto=format&fit=crop&w=400&q=80", price: 549, original: 799, rating: 4.5, reviews: 104, badge: "SALE", badgeType: "" },
  { id: 99, name: "Acrylic Makeup Organizer", category: "home", image: "https://images.unsplash.com/photo-1617757962453-3bc34b3f2f51?auto=format&fit=crop&w=400&q=80", price: 699, original: null, rating: 4.4, reviews: 145, badge: "NEW", badgeType: "new" },
  { id: 100, name: "Silicone Kitchen Utensils", category: "home", image: "https://images.unsplash.com/photo-1591814402636-a1d2938a1d2d?auto=format&fit=crop&w=400&q=80", price: 899, original: 1299, rating: 4.6, reviews: 118, badge: "SALE", badgeType: "" }
  ,
  // ── NEW PRODUCT EXAMPLE ──
  {
    id: 101,
    name: "Smart Coffee Mug Warmer",
    category: "home",
    image: "https://images.unsplash.com/photo-1618073194081-e377a7a76a21?auto=format&fit=crop&w=400&q=80",
    price: 1999,
    original: 2499,
    rating: 4.7,
    reviews: 45,
    badge: "SALE",
    badgeType: ""
  }
  ,

  // ── BOOKS (102-106) ──
  { id: 102, name: "The Midnight Library", category: "books", image: "https://images.unsplash.com/photo-1618665813224-dd34b2c39a92?auto=format&fit=crop&w=400&q=80", price: 499, original: 699, rating: 4.8, reviews: 512, badge: "BESTSELLER", badgeType: "new" },
  { id: 103, name: "Atomic Habits", category: "books", image: "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&w=400&q=80", price: 549, original: 799, rating: 4.9, reviews: 1024, badge: "SALE", badgeType: "" },
  { id: 104, name: "The Psychology of Money", category: "books", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80", price: 449, original: null, rating: 4.7, reviews: 789, badge: "NEW", badgeType: "new" },
  { id: 105, name: "A Man Called Ove", category: "books", image: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?auto=format&fit=crop&w=400&q=80", price: 399, original: 599, rating: 4.6, reviews: 450, badge: "SALE", badgeType: "" },
  { id: 106, name: "Sapiens: A Brief History", category: "books", image: "https://images.unsplash.com/photo-1589829085411-b6a2f1ba35d1?auto=format&fit=crop&w=400&q=80", price: 699, original: null, rating: 4.8, reviews: 850, badge: "NEW", badgeType: "new" }
];

const COUPONS = {
  'SAVE10': { type: 'percent', value: 10 },
  'FLAT50': { type: 'fixed', value: 50 },
  'MEGA15': { type: 'percent', value: 15 }
};

let cart = {}; // { productId: quantity }
let likedProducts = JSON.parse(localStorage.getItem('shopLikes')) || {};
let currentFilter = 'all';
let searchQuery = '';
let currentSort = 'default';
let recentlyViewed = JSON.parse(localStorage.getItem('shopRecentlyViewed')) || [];
let appliedCoupon = null;
let compareList = [];
let currentPage = 1;
const PRODUCTS_PER_PAGE = 12;


// ── VIEW TOGGLING ──
function showView(viewName) {
  const productsView = document.getElementById('products-view');
  const cartView = document.getElementById('cart-view');
  const ordersView = document.getElementById('orders-view');
  const supportView = document.getElementById('support-view');
  const dashboardView = document.getElementById('dashboard-view');
  const heroSection = document.querySelector('.hero-carousel');

  // Hide all views first
  if (productsView) productsView.style.display = 'none';
  if (cartView) cartView.style.display = 'none';
  if (ordersView) ordersView.style.display = 'none';
  if (supportView) supportView.style.display = 'none';
  if (dashboardView) dashboardView.style.display = 'none';
  if (heroSection) heroSection.style.display = 'none';

  // De-activate links in navbar
  document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));

  if (viewName === 'products') {
    productsView.style.display = 'block';
    if (heroSection) heroSection.style.display = 'block';

    const homeLink = document.querySelector('.nav-links a:first-child');
    if (homeLink) homeLink.classList.add('active');
  } else if (viewName === 'cart') {
    cartView.style.display = 'block';
  } else if (viewName === 'orders') {
    if (ordersView) ordersView.style.display = 'block';
  } else if (viewName === 'support') {
    if (supportView) supportView.style.display = 'block';

    // Find Support Link
    const supportLink = Array.from(document.querySelectorAll('.nav-links a')).find(l => l.textContent.toLowerCase() === 'support');
    if (supportLink) supportLink.classList.add('active');

    // Pre-fill Support form name and email if logged in
    if (currentUser) {
      document.getElementById('support-name').value = currentUser.name || '';
      document.getElementById('support-email').value = currentUser.email || '';
    }
  } else if (viewName === 'dashboard') {
    if (!currentUser) {
      showToast('<i class="fa-solid fa-lock"></i> Please sign in to access your Customer Dashboard.', 'error');
      openAuthModal();
      return;
    }
    if (dashboardView) dashboardView.style.display = 'block';
    renderDashboardContent();
  }
}
window.showView = showView;

// ── RENDER PRODUCTS ──
function renderProducts() {
  const grid = document.getElementById('product-grid');
  let filtered = PRODUCTS.filter(p => {
    let matchCat;
    if (currentFilter === 'all') {
      matchCat = true;
    } else if (currentFilter === 'favorites') {
      matchCat = !!likedProducts[p.id];
    } else {
      matchCat = p.category === currentFilter;
    }
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  // Apply sorting
  if (currentSort === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentSort === 'rating-desc') {
    filtered.sort((a, b) => b.rating - a.rating);
  }
  // 'default' sort is by ID, which is the initial order.
  // If we want to return to default, we can sort by ID.
  else if (currentSort === 'default') {
    filtered.sort((a, b) => a.id - b.id);
  }

  if (filtered.length === 0) {
    let emptyMsg = ` No products found for "<strong>${searchQuery}</strong>"`;
    if (currentFilter === 'favorites' && !searchQuery) {
      emptyMsg = ` You haven't added any favorites yet!`;
    }
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text-muted);font-size:15px;">${emptyMsg}</div>`;
    return;
  }

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const paginatedProducts = filtered.slice(startIndex, endIndex);

  if (paginatedProducts.length === 0 && currentPage > 1) {
    currentPage = 1;
    renderProducts();
    return;
  }

  grid.innerHTML = paginatedProducts.map(p => {
    const inCart = cart[p.id] > 0;
    const isLiked = !!likedProducts[p.id];

    return `
      <div class="product-card" onclick="openProductDetail(${p.id})">
        <div class="product-img-wrap">
          <img src="${p.image || p.images[0]}" alt="${p.name}" loading="lazy">
          ${p.badge ? `<div class="product-badge ${p.badgeType}">${p.badge}</div>` : ''}
          <button class="like-btn-card ${isLiked ? 'liked' : ''}" onclick="event.stopPropagation(); toggleLike(${p.id}, this)">
            <i class="${isLiked ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
          </button>
          <button class="compare-btn-card ${compareList.includes(p.id) ? 'selected' : ''}" onclick="event.stopPropagation(); toggleCompare(${p.id}, this)">
            <i class="fa-solid fa-scale-balanced"></i>
          </button>
        </div>
        <div class="product-body">
          <div class="product-category">${p.category}</div>
          <div class="product-name">${p.name}</div>
          <div class="price-row">
            <div>
              <div class="product-price">₹${p.price.toLocaleString()}</div>
              ${p.original ? `<div class="product-original">₹${p.original.toLocaleString()}</div>` : ''}
            </div>
            <button class="add-btn ${inCart ? 'in-cart' : ''}" onclick="event.stopPropagation(); addToCart(${p.id})" id="btn-${p.id}">
              ${inCart ? `<i class="fa-solid fa-check"></i> (${cart[p.id]})` : `<i class="fa-solid fa-plus"></i> Add`}
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  renderPagination(totalPages);
}

// ── PAGINATION ──
function renderPagination(totalPages) {
  const paginationContainer = document.getElementById('pagination-container');
  if (totalPages <= 1) {
    paginationContainer.innerHTML = '';
    return;
  }

  let paginationHTML = '';

  // Previous button
  paginationHTML += `
    <button class="pagination-btn" onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
      &laquo; Prev
    </button>
  `;

  // Page number buttons
  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `
      <button class="pagination-btn ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">
        ${i}
      </button>
    `;
  }

  // Next button
  paginationHTML += `
    <button class="pagination-btn" onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
      Next &raquo;
    </button>
  `;

  paginationContainer.innerHTML = paginationHTML;
}

// ── RENDER RECENTLY VIEWED ──
function renderRecentlyViewed() {
  const container = document.getElementById('recently-viewed-grid');
  const section = document.getElementById('recently-viewed-section');

  if (!container || !section) return;

  if (recentlyViewed.length === 0) {
    section.style.display = 'none';
    return;
  }

  section.style.display = 'block';

  container.innerHTML = recentlyViewed.map(id => {
    const p = PRODUCTS.find(prod => prod.id === id);
    if (!p) return '';

    const inCart = cart[p.id] > 0;
    const isLiked = !!likedProducts[p.id];

    return `
      <div class="product-card" onclick="openProductDetail(${p.id})">
        <div class="product-img-wrap">
          <img src="${p.image || p.images[0]}" alt="${p.name}" loading="lazy">
          ${p.badge ? `<div class="product-badge ${p.badgeType}">${p.badge}</div>` : ''}
          <button class="like-btn-card ${isLiked ? 'liked' : ''}" onclick="event.stopPropagation(); toggleLike(${p.id}, this)">
            <i class="${isLiked ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
          </button>
        </div>
        <div class="product-body">
          <div class="product-name" style="font-size:13px;">${p.name}</div>
          <div class="price-row" style="margin-top:8px;">
            <div class="product-price">₹${p.price.toLocaleString()}</div>
            <button class="add-btn ${inCart ? 'in-cart' : ''}" onclick="event.stopPropagation(); addToCart(${p.id})" id="btn-recent-${p.id}">
              ${inCart ? `<i class="fa-solid fa-check"></i>` : `<i class="fa-solid fa-plus"></i>`}
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ── CART OPERATIONS ──
function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  renderCart();
  renderProducts();
  const p = PRODUCTS.find(p => p.id === id);
  showToast(`<i class="fa-solid fa-circle-check"></i> "${p.name}" added to cart!`, 'success');
}

// Global hook for reference in inline onclick elements
window.addToCart = addToCart;

function removeFromCart(id) {
  if (cart[id] > 1) {
    cart[id]--;
  } else {
    delete cart[id];
  }
  renderCart();
  renderProducts();
}
window.removeFromCart = removeFromCart;

// Clear Cart logic
function clearCart() {
  if (Object.keys(cart).length === 0) return;
  if (confirm("Are you sure you want to clear your cart? This will remove all items.")) {
    cart = {};
    appliedCoupon = null;
    renderCart();
    renderProducts();
    showToast('<i class="fa-solid fa-trash-can"></i> Cart cleared!', 'error');
  }
}
window.clearCart = clearCart;

// ── RENDER CART ──
function renderCart() {
  const items = Object.entries(cart).filter(([, q]) => q > 0);
  const totalQty = items.reduce((s, [, q]) => s + q, 0);
  const subtotal = items.reduce((s, [id, q]) => {
    const p = PRODUCTS.find(p => p.id == id);
    return s + p.price * q;
  }, 0);
  const delivery = items.length > 0 ? 40 : 0;

  let discount = 0;
  if (appliedCoupon && COUPONS[appliedCoupon]) {
    const coupon = COUPONS[appliedCoupon];
    if (coupon.type === 'percent') {
      discount = Math.round(subtotal * (coupon.value / 100));
    } else if (coupon.type === 'fixed') {
      discount = coupon.value;
    }
  }
  const total = subtotal + delivery - discount;


  // Update badge
  document.getElementById('cart-badge').textContent = totalQty;
  document.getElementById('cart-header-count').textContent = `${totalQty} item${totalQty !== 1 ? 's' : ''}`;

  const cartBody = document.getElementById('cart-body');
  const cartSummary = document.getElementById('cart-summary-card');

  if (items.length === 0) {
    cartBody.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon"><i class="fa-solid fa-basket-shopping" style="color: var(--text-muted);"></i></div>
        <p>Your cart is empty.<br>Add some products!</p>
        <br>
        <button class="modal-btn" onclick="showView('products')">Continue Shopping</button>
      </div>`;
    if (cartSummary) cartSummary.style.display = 'none';
    return;
  }

  cartBody.innerHTML = items.map(([id, qty]) => {
    const p = PRODUCTS.find(p => p.id == id);
    return `
      <div class="cart-item">
        <div class="cart-item-img"> 
          <img src="${p.image || p.images[0]}" alt="${p.name}">
        </div>
        <div class="cart-item-info">
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-price">₹${p.price.toLocaleString()} × ${qty} = <strong>₹${(p.price * qty).toLocaleString()}</strong></div>
        </div>
        <div class="qty-controls">
          <button class="qty-btn" onclick="removeFromCart(${id})">−</button>
          <span class="qty-num">${qty}</span>
          <button class="qty-btn" onclick="addToCart(${id})">+</button>
        </div>
      </div>
    `;
  }).join('');

  if (cartSummary) {
    cartSummary.style.display = 'block';
    document.getElementById('subtotal').textContent = '₹' + subtotal.toLocaleString();
    document.getElementById('delivery').textContent = '₹' + delivery;
    document.getElementById('discount').textContent = '-₹' + discount.toLocaleString();
    document.getElementById('total-price').textContent = '₹' + total.toLocaleString();
  }

  // Update coupon display
  const couponDisplay = document.getElementById('applied-coupon-display');
  const couponInput = document.getElementById('coupon-input');
  if (appliedCoupon) {
    couponDisplay.style.display = 'flex';
    couponDisplay.innerHTML = `
      <span><i class="fa-solid fa-ticket"></i> Coupon "<strong>${appliedCoupon}</strong>" applied!</span>
      <span style="cursor:pointer; font-weight:700;" onclick="removeCoupon()">✖</span>
    `;
    couponInput.value = appliedCoupon;
    couponInput.disabled = true;
  } else {
    couponDisplay.style.display = 'none';
    couponInput.value = '';
    couponInput.disabled = false;
  }
}

// ── CHECKOUT ──
async function checkout() {
  const items = Object.entries(cart).filter(([, q]) => q > 0);
  if (items.length === 0) return;

  const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
  const orderDate = new Date().toLocaleString();
  const orderItems = items.map(([id, q]) => {
    const p = PRODUCTS.find(p => p.id == id);
    return {
      id: p.id,
      name: p.name,
      price: p.price,
      image: p.image || p.images[0],
      qty: q
    };
  });

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const delivery = 40;
  let discount = 0;
  if (appliedCoupon && COUPONS[appliedCoupon]) {
    const coupon = COUPONS[appliedCoupon];
    if (coupon.type === 'percent') {
      discount = Math.round(subtotal * (coupon.value / 100));
    } else if (coupon.type === 'fixed') {
      discount = coupon.value;
    }
  }
  const total = subtotal + delivery - discount;

  const newOrder = {
    id: orderId,
    date: orderDate,
    email: currentUser ? currentUser.email : 'guest@example.com',
    shippingName: currentUser ? currentUser.name : 'Guest Customer',
    shippingPhone: currentUser ? (currentUser.phone || 'N/A') : 'N/A',
    shippingAddress: currentUser ? (currentUser.address || 'N/A') : 'N/A',
    items: orderItems,
    subtotal: subtotal,
    delivery: delivery,
    discount: discount,
    total: total,
    coupon: appliedCoupon,
    status: 'confirmed'
  };

  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to place order.');

    document.getElementById('order-id').textContent = '#' + orderId;
    document.getElementById('modal').classList.add('show');
  } catch (error) {
    showToast(`<i class="fa-solid fa-triangle-exclamation"></i> ${error.message}`, 'error');
  }
}
window.checkout = checkout;

// Modal Close logic
function closeModal() {
  document.getElementById('modal').classList.remove('show');
  cart = {};
  appliedCoupon = null;
  renderCart();
  renderProducts();
  showToast('<i class="fa-solid fa-circle-check"></i> Thank you! Shop again soon.', 'success');
  showView('products'); // return to shop view
}
window.closeModal = closeModal;

// ── FILTER & SEARCH ──
function filterProducts(cat, btn) {
  currentFilter = cat;
  currentPage = 1; // Reset to first page on filter change
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderProducts();
}
window.filterProducts = filterProducts;

// Handle nav link filters
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const cat = link.textContent.toLowerCase();
    if (cat === 'support') {
      showView('support');
      return;
    }
    showView('products'); // switch back to catalog view first
    document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    // Match categories
    if (cat === 'home') {
      filterProducts('all', document.querySelector('.filters .filter-btn:first-child'));
    } else {
      const filterBtn = Array.from(document.querySelectorAll('.filters .filter-btn')).find(b => b.textContent.toLowerCase().includes(cat));
      if (filterBtn) {
        filterProducts(cat, filterBtn);
      } else {
        filterProducts('all', document.querySelector('.filters .filter-btn:first-child'));
      }
    }
  });
});

function searchProducts() {
  searchQuery = document.getElementById('search-input').value;
  currentPage = 1; // Reset to first page on search
  renderProducts();
}
window.searchProducts = searchProducts;

function sortProducts() {
  currentSort = document.getElementById('sort-select').value;
  renderProducts();
}
window.sortProducts = sortProducts;

function changePage(page) {
  currentPage = page;
  renderProducts();
  document.getElementById('products-view').scrollIntoView({ behavior: 'smooth' });
}
window.changePage = changePage;

// ── COUPON LOGIC ──
function applyCoupon(event) {
  event.preventDefault();
  const input = document.getElementById('coupon-input');
  const code = input.value.trim().toUpperCase();

  if (COUPONS[code]) {
    appliedCoupon = code;
    showToast(`<i class="fa-solid fa-circle-check"></i> Coupon "${code}" applied successfully!`, 'success');
    renderCart();
  } else {
    showToast('<i class="fa-solid fa-triangle-exclamation"></i> Invalid coupon code.', 'error');
    input.value = '';
  }
}
window.applyCoupon = applyCoupon;

function removeCoupon() {
  appliedCoupon = null;
  showToast('<i class="fa-solid fa-trash-can"></i> Coupon removed.', 'error');
  renderCart();
}
window.removeCoupon = removeCoupon;

// ── TOAST ──
let toastTimer;
function showToast(msg, type = '') {
  const t = document.getElementById('toast');
  t.innerHTML = msg;
  t.className = 'toast show ' + type;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}
window.showToast = showToast;

const API_URL = 'http://localhost:3000';
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Convert uploader files to Base64
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

function updateAuthUI() {
  const authNav = document.getElementById('auth-nav-container');
  if (currentUser) {
    const avatarImg = currentUser.avatar && currentUser.avatar.startsWith('data:image')
      ? `<img src="${currentUser.avatar}" class="nav-avatar" alt="Avatar">`
      : `<i class="fa-solid fa-circle-user"></i>`;

    authNav.innerHTML = `
      <div class="user-menu">
        <button class="user-menu-btn" onclick="toggleUserMenu(event)">
          ${avatarImg}
        </button>
        <div class="user-dropdown">
          <div class="user-dropdown-header">
            <div class="user-dropdown-name">Hi, ${currentUser.name}</div>
            <div class="user-dropdown-email">${currentUser.email}</div>
          </div>
          <div class="user-dropdown-item" onclick="showView('dashboard')"><i class="fa-solid fa-crown" style="color:#f59e0b;"></i> Customer Dashboard</div>
          <div class="user-dropdown-item" onclick="openProfileModal()"><i class="fa-solid fa-user-gear"></i> My Profile</div>
          <div class="user-dropdown-item" onclick="showOrdersView()"><i class="fa-solid fa-box-open"></i> My Orders</div>
          <div class="user-dropdown-item" onclick="showToast('<i class=\'fa-solid fa-gift\'></i> Coupons loaded!', 'success')"><i class="fa-solid fa-ticket"></i> Offers</div>
          <button class="user-dropdown-item signout-btn" onclick="handleSignOut()">
            <i class="fa-solid fa-arrow-right-from-bracket"></i> Sign Out
          </button>
        </div>
      </div>
    `;
  } else {
    authNav.innerHTML = `
      <button class="login-btn" onclick="openAuthModal()">
        <i class="fa-solid fa-arrow-right-to-bracket"></i> Login
      </button>
    `;
  }
}
window.updateAuthUI = updateAuthUI;

function toggleUserMenu(event) {
  event.stopPropagation(); // Prevent the window click listener from firing
  const dropdown = document.querySelector('.user-dropdown');
  if (dropdown) {
    dropdown.classList.toggle('open');
  }
}
window.toggleUserMenu = toggleUserMenu;


function openAuthModal() {
  document.getElementById('auth-modal').classList.add('show');
  switchAuthTab('login');
}
window.openAuthModal = openAuthModal;

function closeAuthModal() {
  document.getElementById('auth-modal').classList.remove('show');
  document.getElementById('login-form').reset();
  document.getElementById('signup-form').reset();
}
window.closeAuthModal = closeAuthModal;

function switchAuthTab(tab) {
  const tabLogin = document.getElementById('tab-login');
  const tabSignup = document.getElementById('tab-signup');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');

  if (tab === 'login') {
    tabLogin.classList.add('active');
    tabSignup.classList.remove('active');
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
  } else {
    tabLogin.classList.remove('active');
    tabSignup.classList.add('active');
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
  }
}
window.switchAuthTab = switchAuthTab;

function togglePasswordVisibility(fieldId, iconElement) {
  const input = document.getElementById(fieldId);
  if (input.type === 'password') {
    input.type = 'text';
    iconElement.classList.replace('fa-eye-slash', 'fa-eye');
  } else {
    input.type = 'password';
    iconElement.classList.replace('fa-eye', 'fa-eye-slash');
  }
}
window.togglePasswordVisibility = togglePasswordVisibility;

async function handleSendOtp() {
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim().toLowerCase();
  const sendOtpBtn = document.getElementById('send-otp-btn');

  if (!name || !email) {
    showToast('<i class="fa-solid fa-triangle-exclamation"></i> Please enter your name and email.', 'error');
    return;
  }

  sendOtpBtn.disabled = true;
  sendOtpBtn.innerHTML = 'Sending...';

  try {
    const response = await fetch(`${API_URL}/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to send OTP');

    showToast(`<i class="fa-solid fa-circle-check"></i> ${data.message}`, 'success');
    document.getElementById('otp-password-group').style.display = 'block';
    document.getElementById('send-otp-btn').style.display = 'none';
    document.getElementById('signup-submit-btn').style.display = 'flex';
  } catch (error) {
    showToast(`<i class="fa-solid fa-triangle-exclamation"></i> ${error.message}`, 'error');
  } finally {
    sendOtpBtn.disabled = false;
    sendOtpBtn.innerHTML = 'Send OTP <i class="fa-solid fa-paper-plane"></i>';
  }
}
window.handleSendOtp = handleSendOtp;

async function handleSignup(event) {
  event.preventDefault();
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim().toLowerCase();
  const otp = document.getElementById('signup-otp').value.trim();
  const password = document.getElementById('signup-password').value;

  if (password.length < 6) {
    showToast('<i class="fa-solid fa-triangle-exclamation"></i> Password must be at least 6 characters.', 'error');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/verify-and-register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, otp, password })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    showToast(`<i class="fa-solid fa-circle-check"></i> ${data.message}`, 'success');
    switchAuthTab('login');
    document.getElementById('signup-form').reset();
    document.getElementById('otp-password-group').style.display = 'none';
    document.getElementById('send-otp-btn').style.display = 'flex';
    document.getElementById('signup-submit-btn').style.display = 'none';
  } catch (error) {
    showToast(`<i class="fa-solid fa-triangle-exclamation"></i> ${error.message}`, 'error');
  }
}
window.handleSignup = handleSignup;

async function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value.trim().toLowerCase();
  const password = document.getElementById('login-password').value;

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const user = await response.json();
    if (!response.ok) throw new Error(user.message || 'Invalid email or password.');

    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    closeAuthModal();
    updateAuthUI();
    showToast(`<i class="fa-solid fa-circle-check"></i> Welcome back, ${user.name}!`, 'success');
  } catch (error) {
    showToast(`<i class="fa-solid fa-triangle-exclamation"></i> ${error.message}`, 'error');
  }
}
window.handleLogin = handleLogin;

function handleSignOut() {
  if (confirm("Are you sure you want to sign out?")) {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthUI();
    showToast('<i class="fa-solid fa-arrow-right-from-bracket"></i> Signed out successfully.', 'error');
  }
}
window.handleSignOut = handleSignOut;

window.addEventListener('message', async (event) => {
  if (event.data && event.data.type === 'GOOGLE_AUTH_SUCCESS') {
    const googleUser = event.data.user;
    try {
      const response = await fetch(`${API_URL}/social-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(googleUser)
      });
      const data = await response.json();
      if (response.ok) {
        currentUser = data;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        closeAuthModal();
        updateAuthUI();
        showToast(`<i class="fa-solid fa-circle-check"></i> Welcome back, ${currentUser.name}!`, 'success');
      } else {
        throw new Error(data.message || 'Social login failed');
      }
    } catch (err) {
      currentUser = {
        id: Date.now(),
        name: googleUser.name || 'Google User',
        email: googleUser.email || 'google@user.com',
        avatar: googleUser.avatar || '',
        phone: '',
        address: ''
      };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      closeAuthModal();
      updateAuthUI();
      showToast(`<i class="fa-solid fa-circle-check"></i> Welcome back, ${currentUser.name}!`, 'success');
    }
  } else if (event.data && event.data.type === 'GOOGLE_AUTH_ERROR') {
    showToast(`<i class="fa-solid fa-triangle-exclamation"></i> ${event.data.message}`, 'error');
  }
});

function handleSocialLogin(provider) {
  if (provider === 'Google') {
    const authUrl = `${API_URL}/auth/google`;
    const popup = window.open(authUrl, 'GoogleAuth', 'width=550,height=650');
    if (!popup) {
      showToast('<i class="fa-solid fa-triangle-exclamation"></i> Popup blocked. Please allow popups for Google sign-in.', 'error');
    }
  }
}
window.handleSocialLogin = handleSocialLogin;

// Forgot Password Modal Controls & Logic
function openForgotPasswordModal() {
  closeAuthModal(); // Close login modal first
  document.getElementById('forgot-password-modal').classList.add('show');
  document.getElementById('forgot-password-step1').style.display = 'block';
  document.getElementById('forgot-password-step2').style.display = 'none';
  document.getElementById('forgot-password-step1').reset();
  document.getElementById('forgot-password-step2').reset();
}
window.openForgotPasswordModal = openForgotPasswordModal;

function closeForgotPasswordModal() {
  document.getElementById('forgot-password-modal').classList.remove('show');
}
window.closeForgotPasswordModal = closeForgotPasswordModal;

async function handleForgotPasswordSendOtp(event) {
  event.preventDefault();
  const email = document.getElementById('forgot-email').value.trim().toLowerCase();
  const sendBtn = document.getElementById('forgot-send-otp-btn');

  if (!email) {
    showToast('<i class="fa-solid fa-triangle-exclamation"></i> Please enter your email.', 'error');
    return;
  }

  sendBtn.disabled = true;
  sendBtn.innerHTML = 'Sending...';

  try {
    const response = await fetch(`${API_URL}/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    showToast(`<i class="fa-solid fa-circle-check"></i> ${data.message}`, 'success');
    document.getElementById('forgot-password-step1').style.display = 'none';
    document.getElementById('forgot-password-step2').style.display = 'block';
  } catch (error) {
    showToast(`<i class="fa-solid fa-triangle-exclamation"></i> ${error.message}`, 'error');
  } finally {
    sendBtn.disabled = false;
    sendBtn.innerHTML = 'Send Reset OTP <i class="fa-solid fa-paper-plane"></i>';
  }
}
window.handleForgotPasswordSendOtp = handleForgotPasswordSendOtp;

async function handleResetPassword(event) {
  event.preventDefault();
  const email = document.getElementById('forgot-email').value.trim().toLowerCase();
  const otp = document.getElementById('reset-otp').value.trim();
  const newPassword = document.getElementById('reset-password').value;
  const confirmPassword = document.getElementById('reset-password-confirm').value;

  if (newPassword !== confirmPassword) {
    showToast('<i class="fa-solid fa-triangle-exclamation"></i> Passwords do not match.', 'error');
    return;
  }
  if (newPassword.length < 6) {
    showToast('<i class="fa-solid fa-triangle-exclamation"></i> Password must be at least 6 characters.', 'error');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp, password: newPassword })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    // Update password in frontend localStorage
    const users = JSON.parse(localStorage.getItem('shopUsers')) || [];
    const userIndex = users.findIndex(u => u.email === email);
    if (userIndex !== -1) {
      users[userIndex].password = newPassword;
      localStorage.setItem('shopUsers', JSON.stringify(users));
    }

    showToast(`<i class="fa-solid fa-circle-check"></i> ${data.message}`, 'success');
    closeForgotPasswordModal();
    openAuthModal(); // Re-open login modal

  } catch (error) {
    showToast(`<i class="fa-solid fa-triangle-exclamation"></i> ${error.message}`, 'error');
  }
}
window.handleResetPassword = handleResetPassword;

// Profile modal controls
function openProfileModal() {
  if (!currentUser) return;
  document.getElementById('profile-name').value = currentUser.name || '';
  document.getElementById('profile-email').value = currentUser.email || '';
  document.getElementById('profile-modal').classList.add('show');
}
window.openProfileModal = openProfileModal;

function closeProfileModal() {
  document.getElementById('profile-modal').classList.remove('show');
}
window.closeProfileModal = closeProfileModal;

async function handleProfileUpdate(event) {
  event.preventDefault();
  if (!currentUser) return;

  const newName = document.getElementById('profile-name').value.trim();
  const newEmail = document.getElementById('profile-email').value.trim().toLowerCase();

  if (!newName || !newEmail) {
    showToast('<i class="fa-solid fa-triangle-exclamation"></i> Name and email cannot be empty.', 'error');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/user/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentEmail: currentUser.email, newName, newEmail })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Unable to update profile.');

    currentUser.name = data.name;
    currentUser.email = data.email;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    closeProfileModal();
    updateAuthUI();
    showToast('<i class="fa-solid fa-circle-check"></i> Profile updated successfully!', 'success');
  } catch (error) {
    showToast(`<i class="fa-solid fa-triangle-exclamation"></i> ${error.message}`, 'error');
  }
}
window.handleProfileUpdate = handleProfileUpdate;

// Order History & Invoice functions
async function renderOrders() {
  const ordersBody = document.getElementById('orders-list-body');
  const ordersCount = document.getElementById('orders-header-count');

  if (!currentUser) {
    ordersBody.innerHTML = `
      <div style="text-align:center; padding:40px; color:var(--text-muted);">
        <i class="fa-solid fa-lock" style="font-size:32px; margin-bottom:12px; display:block;"></i>
        Please sign in to view your order history.
      </div>
    `;
    ordersCount.textContent = '0 orders';
    return;
  }

  try {
    const response = await fetch(`${API_URL}/orders?email=${encodeURIComponent(currentUser.email)}`);
    if (!response.ok) {
      throw new Error('Unable to load orders.');
    }
    const userOrders = await response.json();

    ordersCount.textContent = `${userOrders.length} order${userOrders.length !== 1 ? 's' : ''}`;

    if (userOrders.length === 0) {
      ordersBody.innerHTML = `
        <div style="text-align:center; padding:40px; color:var(--text-muted); background:var(--surface); border:1px solid var(--border); border-radius:var(--radius);">
          <i class="fa-solid fa-basket-shopping" style="font-size:32px; margin-bottom:12px; display:block; color:var(--text-muted);"></i>
          You haven't placed any orders yet.
        </div>
      `;
      return;
    }

    ordersBody.innerHTML = userOrders.map(order => {
      const itemsHTML = order.items.map(item => `
        <div class="order-item-row">
          <img src="${item.image}" alt="${item.name}" class="order-item-img">
          <div class="order-item-details">
            <div class="order-item-name">${item.name}</div>
            <div class="order-item-price">₹${item.price.toLocaleString()} × ${item.qty}</div>
          </div>
        </div>
      `).join('');

      return `
        <div class="order-card">
          <div class="order-header-row">
            <div>
              <span class="order-id-label">#${order.id}</span>
              <div class="order-date-label">${order.date}</div>
            </div>
            <div style="display: flex; gap: 8px; align-items: center;">
              <span class="order-status-badge ${order.status.replace(' ', '-')}">${order.status}</span>
              <button class="add-btn" style="padding: 4px 10px; font-size:12px;" onclick="viewInvoice('${order.id}')">
                <i class="fa-solid fa-file-invoice"></i> Invoice
              </button>
              ${order.status === 'confirmed' || order.status === 'delivered' ? `
                <button class="add-btn" style="padding: 4px 10px; font-size:12px; border: 1px solid var(--danger); background: var(--danger-bg); color: var(--danger);" onclick="initiateReturn('${order.id}')">
                  <i class="fa-solid fa-rotate-left"></i> Return
                </button>
              ` : ''}
            </div>
          </div>
          
          <div class="order-items-grid">
            ${itemsHTML}
          </div>
          
          <div class="order-footer-row">
            <div class="order-date-label">Shipped to: <strong>${order.shippingAddress}</strong></div>
            <div class="order-total-price">Total paid: <span>₹${order.total.toLocaleString()}</span></div>
          </div>
        </div>
      `;
    }).join('');
  } catch (error) {
    ordersBody.innerHTML = `<div style="text-align:center; padding:40px; color:var(--text-muted);">${error.message}</div>`;
    ordersCount.textContent = '0 orders';
  }
}
window.renderOrders = renderOrders;

function showOrdersView() {
  showView('orders');
  renderOrders();
}
window.showOrdersView = showOrdersView;

async function viewInvoice(orderId) {
  const invoiceArea = document.getElementById('invoice-print-area');

  try {
    const response = await fetch(`${API_URL}/orders?email=${encodeURIComponent(currentUser ? currentUser.email : 'guest@example.com')}`);
    if (!response.ok) throw new Error('Unable to retrieve order details.');
    const allOrders = await response.json();
    const order = allOrders.find(o => o.id === orderId);
    if (!order) return;

  const itemsHTML = order.items.map((item, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td><strong>${item.name}</strong></td>
      <td>₹${item.price.toLocaleString()}</td>
      <td>${item.qty}</td>
      <td style="text-align: right;">₹${(item.price * item.qty).toLocaleString()}</td>
    </tr>
  `).join('');

  invoiceArea.innerHTML = `
    <div style="border-bottom: 2px solid var(--border); padding-bottom: 20px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: start;">
      <div>
        <div class="invoice-title">Shop<span>Ease</span> Invoice</div>
        <div style="color: var(--text-secondary); margin-top: 4px; font-size: 13px;">E-Commerce Shopping Invoice</div>
      </div>
      <div style="text-align: right; font-size: 13px; color: var(--text-secondary);">
        <div><strong>Order ID:</strong> #${order.id}</div>
        <div><strong>Date:</strong> ${order.date}</div>
        <div><strong>Status:</strong> <span style="color:var(--success); font-weight:700; text-transform:uppercase;">${order.status}</span></div>
      </div>
    </div>
    
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; font-size: 13px;">
      <div>
        <div style="font-weight: 700; border-bottom: 1px solid var(--border); padding-bottom: 6px; margin-bottom: 8px; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px; color: var(--text-secondary);">Seller Details</div>
        <strong>ShopEase E-Commerce Store</strong><br>
        Corporate HQ, Tech Hub Complex<br>
        Bengaluru, Karnataka, India<br>
        Support: info@shopease.com
      </div>
      <div>
        <div style="font-weight: 700; border-bottom: 1px solid var(--border); padding-bottom: 6px; margin-bottom: 8px; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px; color: var(--text-secondary);">Billing & Shipping Details</div>
        <strong>${order.shippingName}</strong><br>
        Phone: ${order.shippingPhone}<br>
        Address: ${order.shippingAddress}<br>
        Email: ${order.email}
      </div>
    </div>
    
    <table class="invoice-table">
      <thead>
        <tr>
          <th style="width: 40px;">#</th>
          <th>Item Description</th>
          <th>Unit Price</th>
          <th>Qty</th>
          <th style="text-align: right;">Amount</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHTML}
      </tbody>
    </table>
    
    <div style="display: flex; justify-content: flex-end; margin-top: 20px;">
      <div style="width: 250px; font-size: 13.5px; display: flex; flex-direction: column; gap: 6px;">
        <div style="display: flex; justify-content: space-between; color: var(--text-secondary);">
          <span>Subtotal</span>
          <span>₹${order.subtotal.toLocaleString()}</span>
        </div>
        <div style="display: flex; justify-content: space-between; color: var(--text-secondary);">
          <span>Delivery Charges</span>
          <span>₹${order.delivery}</span>
        </div>
        <div style="display: flex; justify-content: space-between; color: var(--success);">
          <span>Discount (5%)</span>
          <span>-₹${order.discount.toLocaleString()}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-weight: 700; border-top: 1.5px solid var(--border); padding-top: 8px; margin-top: 4px; font-size: 15px;">
          <span>Total Amount</span>
          <span style="color: var(--accent);">₹${order.total.toLocaleString()}</span>
        </div>
      </div>
    </div>
    
    <div style="border-top: 1px solid var(--border); padding-top: 16px; margin-top: 30px; text-align: center; font-size: 11.5px; color: var(--text-secondary);">
      Thank you for your purchase! This is a computer-generated invoice and requires no signature.
    </div>
  `;

  document.getElementById('invoice-modal').classList.add('show');
  } catch (error) {
    showToast(`<i class="fa-solid fa-triangle-exclamation"></i> ${error.message}`, 'error');
  }
}
window.viewInvoice = viewInvoice;

function closeInvoiceModal() {
  document.getElementById('invoice-modal').classList.remove('show');
}
window.closeInvoiceModal = closeInvoiceModal;

function printInvoice() {
  window.print();
}
window.printInvoice = printInvoice;

// Return Order functions
function initiateReturn(orderId) {
  document.getElementById('return-order-id').value = orderId;
  document.getElementById('return-reason').selectedIndex = 0;
  document.getElementById('return-comments').value = '';
  document.getElementById('return-modal').classList.add('show');
}
window.initiateReturn = initiateReturn;

function closeReturnModal() {
  document.getElementById('return-modal').classList.remove('show');
}
window.closeReturnModal = closeReturnModal;

async function submitReturnRequest(event) {
  event.preventDefault();
  const orderId = document.getElementById('return-order-id').value;
  const reason = document.getElementById('return-reason').value;
  const comments = document.getElementById('return-comments').value.trim();

  if (!currentUser) {
    showToast('<i class="fa-solid fa-triangle-exclamation"></i> Please sign in first.', 'error');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/orders/${orderId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'return requested', email: currentUser.email })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Unable to submit return request.');

    showToast(`<i class="fa-solid fa-circle-check"></i> Return request submitted for order #${orderId}`, 'success');
    closeReturnModal();
    renderOrders();
  } catch (error) {
    showToast(`<i class="fa-solid fa-triangle-exclamation"></i> ${error.message}`, 'error');
  }
}
window.submitReturnRequest = submitReturnRequest;

// Customer Support and FAQ Accordion
function toggleFaq(header) {
  const faqItem = header.parentElement;
  const answer = faqItem.querySelector('.faq-answer');

  const isOpen = answer.style.display === 'block';

  // Close all FAQs first
  document.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');
  document.querySelectorAll('.faq-question').forEach(q => q.classList.remove('active'));

  if (!isOpen) {
    answer.style.display = 'block';
    header.classList.add('active');
  } else {
    answer.style.display = 'none';
    header.classList.remove('active');
  }
}
window.toggleFaq = toggleFaq;

function submitSupportTicket(event) {
  event.preventDefault();
  const name = document.getElementById('support-name').value;
  const email = document.getElementById('support-email').value;
  const msg = document.getElementById('support-msg').value;

  showToast('<i class="fa-solid fa-circle-check"></i> Support ticket submitted! We will email you.', 'success');
  document.getElementById('support-ticket-form').reset();
}
window.submitSupportTicket = submitSupportTicket;

// Virtual chatbot agent send message
function sendChat(event) {
  event.preventDefault();
  const input = document.getElementById('chat-input');
  const msg = input.value.trim();
  if (!msg) return;

  const chatMessages = document.getElementById('chat-messages');

  // Append user bubble
  const userBubble = document.createElement('div');
  userBubble.className = 'chat-bubble user';
  userBubble.textContent = msg;
  chatMessages.appendChild(userBubble);

  input.value = '';
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Simulate bot query processing
  setTimeout(() => {
    const botBubble = document.createElement('div');
    botBubble.className = 'chat-bubble bot';

    const lowerMsg = msg.toLowerCase();
    let reply = "I'm sorry, I didn't quite catch that. Could you please specify if you're asking about returns, refunds, package tracking, or support contacts?";

    if (lowerMsg.includes('track') || lowerMsg.includes('package') || lowerMsg.includes('where is my')) {
      reply = "You can track your package by heading to the 'My Orders' tab in the navigation menu. Each order displays its shipping address and current delivery status.";
    } else if (lowerMsg.includes('refund') || lowerMsg.includes('return') || lowerMsg.includes('cancel')) {
      reply = "We offer a 30-day return policy. To request a return or cancellation, please submit a Support Ticket in the adjacent form, or write to returns@shopease.com with your order number.";
    } else if (lowerMsg.includes('discount') || lowerMsg.includes('coupon') || lowerMsg.includes('offer') || lowerMsg.includes('sale')) {
      reply = "We currently have a 5% auto-discount applied to all orders above ₹2,000! Keep an eye on our homepage banner for future flash sales and promo codes.";
    } else if (lowerMsg.includes('phone') || lowerMsg.includes('contact') || lowerMsg.includes('call') || lowerMsg.includes('number')) {
      reply = "Our customer support team is available Mon-Fri, 9am - 6pm. You can reach us at toll-free: 1800-419-8765, or submit a message in the form on the left.";
    } else if (lowerMsg.includes('account') || lowerMsg.includes('profile') || lowerMsg.includes('edit')) {
      reply = "You can update your shipping address, phone number, and avatar by going to your username menu in the top-right and selecting 'My Profile'.";
    } else if (lowerMsg.includes('hi') || lowerMsg.includes('hello') || lowerMsg.includes('hey')) {
      reply = "Hello there! How can I assist you with your shopping experience today?";
    }

    botBubble.innerHTML = reply;
    chatMessages.appendChild(botBubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 600);
}
window.sendChat = sendChat;

// Close modals on clicking overlay
window.addEventListener('click', (e) => {
  const authModal = document.getElementById('auth-modal');
  if (e.target === authModal) {
    closeAuthModal();
  }
  const orderModal = document.getElementById('modal');
  if (e.target === orderModal) {
    closeModal();
  }
  const detailModal = document.getElementById('product-detail-modal');
  if (e.target === detailModal) {
    closeProductDetailModal();
  }
  const profileModal = document.getElementById('profile-modal');
  if (e.target === profileModal) {
    closeProfileModal();
  }
  const invoiceModal = document.getElementById('invoice-modal');
  if (e.target === invoiceModal) {
    closeInvoiceModal();
  }
  const returnModal = document.getElementById('return-modal');
  if (e.target === returnModal) {
    closeReturnModal();
  }
  const forgotPasswordModal = document.getElementById('forgot-password-modal');
  if (e.target === forgotPasswordModal) {
    closeForgotPasswordModal();
  }
  const compareModal = document.getElementById('compare-modal');
  if (e.target === compareModal) {
    closeCompareModal();
  }

  // Close user dropdown if open
  const dropdown = document.querySelector('.user-dropdown');
  if (dropdown && dropdown.classList.contains('open')) {
    dropdown.classList.remove('open');
  }
});

// Listen for message from the OAuth popup window
window.addEventListener('message', async (event) => {
  if (!event.origin.startsWith('http://localhost:3000')) return;
  const user = event.data;
  if (!user || !user.email) return;

  try {
    const response = await fetch(`${API_URL}/social-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: user.name, email: user.email, avatar: user.avatar })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Social login failed.');

    currentUser = data;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    closeAuthModal();
    updateAuthUI();
    showToast(`<i class="fa-solid fa-circle-check"></i> Welcome, ${currentUser.name}!`, 'success');
  } catch (error) {
    showToast(`<i class="fa-solid fa-triangle-exclamation"></i> ${error.message}`, 'error');
  }
});

// ── FAVORITES & PRODUCT DETAILS ──
function toggleLike(id, element) {
  if (likedProducts[id]) {
    delete likedProducts[id];
    showToast('<i class="fa-solid fa-heart-crack"></i> Removed from favorites', 'error');
  } else {
    likedProducts[id] = true;
    showToast('<i class="fa-solid fa-heart"></i> Added to favorites!', 'success');
  }
  localStorage.setItem('shopLikes', JSON.stringify(likedProducts));

  // Update card styles
  renderProducts();

  // If details modal is open for this item, update its like button too
  updateDetailLikeButton(id);
}
window.toggleLike = toggleLike;

function toggleCompare(id) {
  const index = compareList.indexOf(id);
  if (index > -1) {
    compareList.splice(index, 1);
  } else {
    if (compareList.length >= 4) {
      showToast('<i class="fa-solid fa-triangle-exclamation"></i> You can compare a maximum of 4 items.', 'error');
      return;
    }
    compareList.push(id);
  }
  renderProducts();
  renderCompareBar();
}
window.toggleCompare = toggleCompare;

function renderCompareBar() {
  const bar = document.getElementById('compare-bar');
  if (compareList.length > 0) {
    bar.classList.add('show');
    const itemsContainer = document.getElementById('compare-bar-items');
    itemsContainer.innerHTML = compareList.map(id => {
      const p = PRODUCTS.find(prod => prod.id === id);
      return `<img src="${p.image || p.images[0]}" alt="${p.name}" class="compare-item-img">`;
    }).join('');
    document.getElementById('compare-bar-text').textContent = `Comparing ${compareList.length} of 4 items`;
  } else {
    bar.classList.remove('show');
  }
}

function clearCompareList() {
  compareList = [];
  renderProducts();
  renderCompareBar();
}
window.clearCompareList = clearCompareList;

function openCompareModal() {
  if (compareList.length < 2) {
    showToast('<i class="fa-solid fa-triangle-exclamation"></i> Please select at least 2 items to compare.', 'error');
    return;
  }

  const modalContent = document.getElementById('compare-modal-content');
  const productsToCompare = compareList.map(id => PRODUCTS.find(p => p.id === id));

  let tableHTML = `<h2 style="font-family:'Syne', sans-serif; text-align:center; margin-bottom:24px;"><i class="fa-solid fa-scale-balanced"></i> Product Comparison</h2>`;
  tableHTML += `<table class="compare-table">`;

  // Headers (Product Images)
  tableHTML += `<thead><tr><th>Feature</th>`;
  productsToCompare.forEach(p => {
    tableHTML += `<th><img src="${p.image || p.images[0]}" style="width:100px; height:100px; object-fit:cover; border-radius:var(--radius-sm);"></th>`;
  });
  tableHTML += `</tr></thead>`;

  // Body
  tableHTML += `<tbody>`;

  // Function to create a row
  const createRow = (label, key) => {
    let row = `<tr style="background: var(--bg);"><td><strong>${label}</strong></td>`;
    productsToCompare.forEach(p => {
      let value = p[key];
      if (key === 'price') value = `₹${p.price.toLocaleString()}`;
      if (key === 'rating') {
        const fullStars = Math.floor(p.rating);
        const halfStar = p.rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;
        const starsHTML = `<i class="fa-solid fa-star"></i>`.repeat(fullStars) + (halfStar ? `<i class="fa-solid fa-star-half-stroke"></i>` : '') + `<i class="fa-regular fa-star"></i>`.repeat(emptyStars);
        value = `<span style="color:#f59e0b;">${starsHTML}</span> (${p.rating})`;
      }
      row += `<td>${value}</td>`;
    });
    row += `</tr>`;
    return row;
  };

  const createButtonRow = () => {
    let row = `<tr><td></td>`;
    productsToCompare.forEach(p => {
      const inCart = cart[p.id] > 0;
      row += `<td><button class="add-btn ${inCart ? 'in-cart' : ''}" onclick="addToCart(${p.id})">${inCart ? 'In Cart' : 'Add to Cart'}</button></td>`;
    });
    row += `</tr>`;
    return row;
  };

  tableHTML += createRow('Name', 'name');
  tableHTML += createRow('Category', 'category');
  tableHTML += createRow('Price', 'price');
  tableHTML += createRow('Rating', 'rating');
  tableHTML += createRow('Reviews', 'reviews');
  tableHTML += createButtonRow();

  tableHTML += `</tbody></table>`;

  modalContent.innerHTML = tableHTML;
  document.getElementById('compare-modal').classList.add('show');
}
window.openCompareModal = openCompareModal;

function closeCompareModal() {
  document.getElementById('compare-modal').classList.remove('show');
}
window.closeCompareModal = closeCompareModal;

function updateDetailLikeButton(id) {
  const btn = document.getElementById('detail-like-btn');
  if (!btn) return;
  const isLiked = !!likedProducts[id];
  btn.className = 'detail-like-btn' + (isLiked ? ' liked' : '');
  btn.innerHTML = `<i class="${isLiked ? 'fa-solid' : 'fa-regular'} fa-heart"></i>`;
  btn.onclick = () => toggleLike(id, btn);
}

function openProductDetail(id) {
  const p = PRODUCTS.find(p => p.id === id);
  if (!p) return;

  document.getElementById('detail-category').textContent = p.category;
  document.getElementById('detail-name').textContent = p.name;
  document.getElementById('detail-price').textContent = `₹${p.price.toLocaleString()}`;
  document.getElementById('detail-original').textContent = p.original ? `₹${p.original.toLocaleString()}` : '';

  // Star rating
  const fullStars = Math.floor(p.rating);
  const halfStar = p.rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;
  const starsHTML =
    `<i class="fa-solid fa-star"></i>`.repeat(fullStars) +
    (halfStar ? `<i class="fa-solid fa-star-half-stroke"></i>` : '') +
    `<i class="fa-regular fa-star"></i>`.repeat(emptyStars);
  document.getElementById('detail-rating').innerHTML = `<span>${starsHTML}</span> ${p.rating} (${p.reviews} reviews)`;

  // Use the product's own image gallery
  const gallery = p.images || [p.image];

  // Main Image
  const mainImg = document.getElementById('detail-main-img');
  mainImg.src = gallery[0];

  // Thumbnails
  const thumbsContainer = document.getElementById('detail-thumbnails');
  thumbsContainer.innerHTML = gallery.map((imgUrl, i) => {
    return `
      <div class="thumbnail-img ${i === 0 ? 'active' : ''}" onclick="changeDetailMainImage('${imgUrl}', this)">
        <img src="${imgUrl}" alt="Thumbnail ${i + 1}">
      </div>
    `;
  }).join('');

  // Add to cart click
  const addBtn = document.getElementById('detail-add-btn');
  addBtn.innerHTML = `<i class="fa-solid fa-cart-plus"></i> Add to Cart`;
  addBtn.onclick = () => {
    addToCart(p.id);
  };

  // Like button
  updateDetailLikeButton(p.id);

  // Open modal
  document.getElementById('product-detail-modal').classList.add('show');

  // Add to recently viewed
  // Remove if it already exists to move it to the front
  const existingIndex = recentlyViewed.indexOf(id);
  if (existingIndex > -1) {
    recentlyViewed.splice(existingIndex, 1);
  }
  // Add to the front
  recentlyViewed.unshift(id);
  // Limit to 5 items
  if (recentlyViewed.length > 5) recentlyViewed.pop();
  localStorage.setItem('shopRecentlyViewed', JSON.stringify(recentlyViewed));
  renderRecentlyViewed();
}
window.openProductDetail = openProductDetail;

function changeDetailMainImage(imgUrl, thumbElement) {
  document.getElementById('detail-main-img').src = imgUrl;
  document.querySelectorAll('.thumbnail-img').forEach(t => t.classList.remove('active'));
  thumbElement.classList.add('active');
}
window.changeDetailMainImage = changeDetailMainImage;

function closeProductDetailModal() {
  document.getElementById('product-detail-modal').classList.remove('show');
}
window.closeProductDetailModal = closeProductDetailModal;

// ── THEME SWITCHER ──
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('shopTheme', theme);
  const checkbox = document.getElementById('theme-checkbox');
  if (checkbox) checkbox.checked = (theme === 'dark');
}

function toggleTheme() {
  const currentTheme = localStorage.getItem('shopTheme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
}

// ── HERO CAROUSEL ──
function initHeroCarousel() {
  const slides = document.querySelectorAll('.hero-slide');
  const dotsContainer = document.querySelector('.hero-dots');
  if (!slides.length || !dotsContainer) return;

  let currentSlide = 0;

  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('hero-dot');
    if (i === 0) dot.classList.add('active');
    dotsContainer.appendChild(dot);
  });
  const dots = document.querySelectorAll('.hero-dot');

  function showSlide(index) {
    slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    currentSlide = index;
  }

  setInterval(() => {
    const nextSlide = (currentSlide + 1) % slides.length;
    showSlide(nextSlide);
  }, 5000); // Change slide every 5 seconds
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('shopTheme') || 'light';
  setTheme(savedTheme);

  const themeCheckbox = document.getElementById('theme-checkbox');
  if (themeCheckbox) themeCheckbox.addEventListener('change', toggleTheme);

  initHeroCarousel();
});

// ── CLIENT / CUSTOMER DASHBOARD FUNCTIONS ──
function switchDashboardTab(tabName) {
  const tabs = ['overview', 'orders', 'wishlist', 'settings'];
  tabs.forEach(t => {
    const btn = document.getElementById(`tab-dash-${t}`);
    const pane = document.getElementById(`dash-pane-${t}`);
    if (btn) btn.classList.toggle('active', t === tabName);
    if (pane) pane.style.display = (t === tabName) ? 'block' : 'none';
  });
}
window.switchDashboardTab = switchDashboardTab;

async function renderDashboardContent() {
  if (!currentUser) return;

  // Header info
  document.getElementById('dash-user-name').textContent = `Welcome, ${currentUser.name}!`;
  document.getElementById('dash-user-email').textContent = currentUser.email;

  const avatarContainer = document.getElementById('dash-avatar-img');
  if (avatarContainer) {
    if (currentUser.avatar && currentUser.avatar.startsWith('data:image')) {
      avatarContainer.innerHTML = `<img src="${currentUser.avatar}" alt="Avatar" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">`;
    } else {
      avatarContainer.innerHTML = `<i class="fa-solid fa-user"></i>`;
    }
  }

  // Pre-fill profile settings inputs
  document.getElementById('dash-input-name').value = currentUser.name || '';
  document.getElementById('dash-input-email').value = currentUser.email || '';
  document.getElementById('dash-input-phone').value = currentUser.phone || '';
  document.getElementById('dash-input-address').value = currentUser.address || '';

  document.getElementById('dash-overview-name').textContent = currentUser.name || 'Customer Name';
  document.getElementById('dash-overview-phone').innerHTML = `<i class="fa-solid fa-phone"></i> Phone: ${currentUser.phone || 'Not set'}`;
  document.getElementById('dash-overview-address').innerHTML = `<i class="fa-solid fa-location-dot"></i> Address: ${currentUser.address || 'No saved address'}`;

  // Fetch orders for customer
  let orders = [];
  try {
    const res = await fetch(`${API_URL}/orders?email=${encodeURIComponent(currentUser.email)}`);
    if (res.ok) orders = await res.json();
  } catch (err) {
    const localOrders = JSON.parse(localStorage.getItem('shopease_orders') || '[]');
    orders = localOrders.filter(o => o.email === currentUser.email);
  }

  // Compute metrics
  const totalSpent = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const activeOrders = orders.filter(o => ['placed', 'processing', 'shipped'].includes((o.status || '').toLowerCase()));
  const wishlistCount = Object.keys(likedProducts).length;

  document.getElementById('dash-stat-orders').textContent = orders.length;
  document.getElementById('dash-stat-spent').textContent = `₹${totalSpent.toLocaleString()}`;
  document.getElementById('dash-stat-wishlist').textContent = wishlistCount;
  document.getElementById('dash-stat-in-transit').textContent = activeOrders.length;

  // Render recent order overview
  const latestOrderContainer = document.getElementById('dash-latest-order-container');
  if (orders.length > 0) {
    const latest = orders[0];
    latestOrderContainer.innerHTML = renderOrderProgressCardHTML(latest);
  } else {
    latestOrderContainer.innerHTML = `<div style="color:var(--text-muted); font-size:13px; text-align:center; padding:20px;">No recent orders. Placed orders will track here.</div>`;
  }

  // Render orders tab list
  renderDashboardOrders(orders);

  // Render wishlist tab grid
  renderDashboardWishlist();
}
window.renderDashboardContent = renderDashboardContent;

function getPipelineStepNumber(status) {
  const s = (status || '').toLowerCase();
  if (s === 'delivered') return 4;
  if (s === 'shipped') return 3;
  if (s === 'processing') return 2;
  return 1; // Placed
}

function renderOrderProgressCardHTML(order) {
  const step = getPipelineStepNumber(order.status);
  return `
    <div class="dash-order-progress-card">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <strong>#${order.id}</strong>
        <span class="admin-status-pill status-${order.status === 'Delivered' ? 'success' : 'primary'}">${order.status || 'Placed'}</span>
      </div>
      
      <!-- Visual Pipeline Progress Bar -->
      <div class="dash-pipeline-bar">
        <div class="pipeline-step ${step >= 1 ? 'completed' : ''}">
          <div class="step-dot"><i class="fa-solid fa-check"></i></div>
          <span>Placed</span>
        </div>
        <div class="pipeline-step ${step >= 2 ? 'completed' : ''}">
          <div class="step-dot"><i class="fa-solid fa-box"></i></div>
          <span>Processing</span>
        </div>
        <div class="pipeline-step ${step >= 3 ? 'completed' : ''}">
          <div class="step-dot"><i class="fa-solid fa-truck"></i></div>
          <span>Shipped</span>
        </div>
        <div class="pipeline-step ${step >= 4 ? 'completed' : ''}">
          <div class="step-dot"><i class="fa-solid fa-house-chimney"></i></div>
          <span>Delivered</span>
        </div>
      </div>
      
      <div style="margin-top:14px; font-size:13px; display:flex; justify-content:space-between; color:var(--text-secondary);">
        <span>Total: <strong>₹${order.total.toLocaleString()}</strong></span>
        <span>Items: ${(order.items || []).length} item(s)</span>
      </div>
    </div>
  `;
}

function renderDashboardOrders(orders) {
  const listContainer = document.getElementById('dash-orders-list');
  if (!listContainer) return;

  if (orders.length === 0) {
    listContainer.innerHTML = `
      <div class="dash-card" style="text-align:center; padding:40px; color:var(--text-muted);">
        <i class="fa-solid fa-box-open" style="font-size:36px; margin-bottom:12px; display:block;"></i>
        You haven't placed any orders yet. Browse our store products and place your first order!
      </div>
    `;
    return;
  }

  listContainer.innerHTML = orders.map(o => `
    <div class="dash-card" style="margin-bottom:16px;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; border-bottom:1px solid var(--border); padding-bottom:12px; margin-bottom:12px;">
        <div>
          <span style="font-size:16px; font-weight:700; font-family:'Syne', sans-serif;">Order #${o.id}</span>
          <div style="font-size:12px; color:var(--text-muted);">${o.created_at ? new Date(o.created_at).toLocaleDateString() : 'Recent'}</div>
        </div>
        <div style="display:flex; gap:8px; align-items:center;">
          <span class="admin-status-pill status-${o.status === 'Delivered' ? 'success' : 'primary'}">${o.status || 'Placed'}</span>
          <button class="add-btn" onclick="viewInvoice('${o.id}')"><i class="fa-solid fa-file-invoice"></i> Invoice</button>
          ${['placed', 'processing', 'delivered'].includes((o.status || '').toLowerCase()) ? `
            <button class="add-btn" style="border:1px solid var(--danger); background:var(--danger-bg); color:var(--danger);" onclick="initiateReturn('${o.id}')">
              <i class="fa-solid fa-rotate-left"></i> Return
            </button>
          ` : ''}
        </div>
      </div>

      ${renderOrderProgressCardHTML(o)}

      <div style="margin-top:16px;">
        ${(o.items || []).map(item => `
          <div style="display:flex; align-items:center; gap:12px; padding:6px 0;">
            <img src="${item.image}" alt="${item.name}" style="width:40px; height:40px; border-radius:6px; object-fit:cover;">
            <div style="flex:1;">
              <div style="font-weight:600; font-size:13px;">${item.name}</div>
              <div style="font-size:12px; color:var(--text-secondary);">₹${item.price.toLocaleString()} × ${item.qty}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function renderDashboardWishlist() {
  const grid = document.getElementById('dash-wishlist-grid');
  if (!grid) return;

  const wishlistProducts = PRODUCTS.filter(p => !!likedProducts[p.id]);

  if (wishlistProducts.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:40px; color:var(--text-muted);">Your wishlist is empty. Click the heart icon on any product to save it here!</div>`;
    return;
  }

  grid.innerHTML = wishlistProducts.map(p => `
    <div class="product-card" onclick="openProductDetail(${p.id})">
      <div class="product-img-wrap">
        <img src="${p.image || p.images[0]}" alt="${p.name}">
        <button class="like-btn-card liked" onclick="event.stopPropagation(); toggleLike(${p.id}, this)">
          <i class="fa-solid fa-heart"></i>
        </button>
      </div>
      <div class="product-body">
        <div class="product-category">${p.category}</div>
        <div class="product-name">${p.name}</div>
        <div class="price-row">
          <div class="product-price">₹${p.price.toLocaleString()}</div>
          <button class="add-btn" onclick="event.stopPropagation(); addToCart(${p.id})">
            <i class="fa-solid fa-plus"></i> Add
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

async function handleDashboardSettingsSubmit(event) {
  event.preventDefault();
  if (!currentUser) return;

  const name = document.getElementById('dash-input-name').value.trim();
  const email = document.getElementById('dash-input-email').value.trim().toLowerCase();
  const phone = document.getElementById('dash-input-phone').value.trim();
  const address = document.getElementById('dash-input-address').value.trim();

  try {
    const res = await fetch(`${API_URL}/user/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentEmail: currentUser.email, name, email, phone, address })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Profile update failed.');

    currentUser = data;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateAuthUI();
    await renderDashboardContent();
    showToast('<i class="fa-solid fa-circle-check"></i> Profile & Delivery details updated!', 'success');
  } catch (err) {
    currentUser.name = name;
    currentUser.email = email;
    currentUser.phone = phone;
    currentUser.address = address;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateAuthUI();
    renderDashboardContent();
    showToast('<i class="fa-solid fa-circle-check"></i> Profile updated locally!', 'success');
  }
}
window.handleDashboardSettingsSubmit = handleDashboardSettingsSubmit;

function handleLogout() {
  currentUser = null;
  localStorage.removeItem('currentUser');
  updateAuthUI();
  showView('products');
  showToast('<i class="fa-solid fa-right-from-bracket"></i> You have signed out.', 'error');
}
window.handleLogout = handleLogout;

// Fetch products from backend DB if server is online
async function fetchBackendProducts() {
  try {
    const res = await fetch(`${API_URL}/api/products`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.length > 0) {
        data.forEach(bp => {
          const idx = PRODUCTS.findIndex(p => p.id === bp.id);
          if (idx !== -1) {
            PRODUCTS[idx] = { ...PRODUCTS[idx], ...bp };
          } else {
            PRODUCTS.push({
              id: bp.id,
              name: bp.name,
              category: bp.category,
              price: bp.price,
              original: bp.originalPrice,
              rating: bp.rating || 4.5,
              badge: bp.badge,
              badgeType: bp.badge ? 'new' : '',
              image: bp.image,
              images: [bp.image]
            });
          }
        });
        renderProducts();
      }
    }
  } catch (e) {
    // Offline mode silently falls back to hardcoded catalog
  }
}
fetchBackendProducts();

updateAuthUI();
renderProducts();
renderCart();
renderRecentlyViewed();
showView('products'); // initialize default view

