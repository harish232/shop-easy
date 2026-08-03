require('dotenv').config();
const path = require('path');
const fs = require('fs');
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'shopadmin123';

// ─── SQLITE DATABASE INITIALIZATION ───
const SQLITE_DB_FILE = path.join(__dirname, 'shop-easy.db');
const sqliteDb = new sqlite3.Database(SQLITE_DB_FILE, (err) => {
  if (err) {
    console.error('⚠️ Could not open SQLite database file:', err.message);
  } else {
    console.log('⚡ Connected to SQLite database (shop-easy.db)');
  }
});

// Initialize Tables in SQLite
sqliteDb.serialize(() => {
  sqliteDb.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT,
      avatar TEXT,
      phone TEXT,
      address TEXT,
      created_at TEXT
    )
  `);

  sqliteDb.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      category TEXT,
      price REAL,
      originalPrice REAL,
      rating REAL,
      badge TEXT,
      image TEXT,
      stock INTEGER,
      created_at TEXT
    )
  `);

  sqliteDb.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      email TEXT,
      shippingName TEXT,
      shippingPhone TEXT,
      shippingAddress TEXT,
      items TEXT,
      subtotal REAL,
      delivery REAL,
      discount REAL,
      total REAL,
      coupon TEXT,
      status TEXT,
      created_at TEXT
    )
  `);
});

function syncJSONToSQLite(dbData) {
  if (!sqliteDb) return;
  sqliteDb.serialize(() => {
    // Sync Products
    if (dbData.products && dbData.products.length > 0) {
      const stmtProd = sqliteDb.prepare(`
        INSERT OR REPLACE INTO products (id, name, category, price, originalPrice, rating, badge, image, stock, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      dbData.products.forEach(p => {
        stmtProd.run(p.id, p.name, p.category, p.price, p.originalPrice || p.price, p.rating || 4.5, p.badge || '', p.image, p.stock || 50, p.created_at || new Date().toISOString());
      });
      stmtProd.finalize();
    }
    // Sync Users
    if (dbData.users && dbData.users.length > 0) {
      const stmtUser = sqliteDb.prepare(`
        INSERT OR REPLACE INTO users (id, name, email, password, avatar, phone, address, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);
      dbData.users.forEach(u => {
        stmtUser.run(u.id, u.name, u.email, u.password || '', u.avatar || '', u.phone || '', u.address || '', u.created_at || new Date().toISOString());
      });
      stmtUser.finalize();
    }
    // Sync Orders
    if (dbData.orders && dbData.orders.length > 0) {
      const stmtOrder = sqliteDb.prepare(`
        INSERT OR REPLACE INTO orders (id, email, shippingName, shippingPhone, shippingAddress, items, subtotal, delivery, discount, total, coupon, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      dbData.orders.forEach(o => {
        const itemsJson = typeof o.items === 'string' ? o.items : JSON.stringify(o.items || []);
        stmtOrder.run(o.id, o.email || '', o.shippingName || '', o.shippingPhone || '', o.shippingAddress || '', itemsJson, o.subtotal || 0, o.delivery || 0, o.discount || 0, o.total || 0, o.coupon || '', o.status || 'Placed', o.created_at || new Date().toISOString());
      });
      stmtOrder.finalize();
    }
  });
}

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

app.use(session({
  secret: process.env.SESSION_SECRET || 'shop-easy-secret',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'YOUR_GOOGLE_CLIENT_SECRET',
    callbackURL: `http://localhost:${PORT}/auth/google/callback`
  },
  (accessToken, refreshToken, profile, done) => {
    const email = (profile.emails && profile.emails[0] && profile.emails[0].value) || `${profile.id}@google.com`;
    const name = profile.displayName || 'Google User';
    const avatar = (profile.photos && profile.photos[0] && profile.photos[0].value) || '';

    const db = loadDB();
    let user = db.users.find(u => u.email === email);
    if (!user) {
      user = {
        id: db.users.length + 1,
        name,
        email,
        password: bcrypt.hashSync(Math.random().toString(36).slice(2), 10),
        avatar,
        phone: '',
        address: '',
        created_at: new Date().toISOString()
      };
      db.users.push(user);
      saveDB(db);
    }
    return done(null, user);
  }
));

// ─── GOOGLE OAUTH ENDPOINTS ───
app.get('/auth/google', (req, res, next) => {
  return passport.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account' })(req, res, next);
});

app.get('/auth/google/callback', (req, res, next) => {
  passport.authenticate('google', (err, user) => {
    if (err || !user) {
      return res.send(`
        <script>
          if (window.opener) {
            window.opener.postMessage({ type: 'GOOGLE_AUTH_ERROR', message: 'Google Authentication failed.' }, '*');
          }
          window.close();
        </script>
      `);
    }
    const userStr = JSON.stringify(user);
    res.send(`
      <script>
        if (window.opener) {
          window.opener.postMessage({ type: 'GOOGLE_AUTH_SUCCESS', user: ${userStr} }, '*');
        }
        window.close();
      </script>
    `);
  })(req, res, next);
});

// Persistent JSON Database Manager
const DB_FILE = path.join(__dirname, 'shop-easy-db.json');

function loadDB() {
  if (!fs.existsSync(DB_FILE)) {
    const initialData = {
      users: [],
      orders: [],
      products: [
        { id: 1, name: 'Noise-Canceling Wireless Headphones', category: 'electronics', price: 2999, originalPrice: 4999, rating: 4.8, badge: 'BESTSELLER', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80', stock: 45, created_at: new Date().toISOString() },
        { id: 2, name: 'Minimalist Leather Watch', category: 'fashion', price: 1849, originalPrice: 2499, rating: 4.6, badge: 'POPULAR', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80', stock: 30, created_at: new Date().toISOString() },
        { id: 3, name: 'Smart Fitness Tracker Band', category: 'electronics', price: 1299, originalPrice: 1999, rating: 4.4, badge: 'SALE', image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&q=80', stock: 60, created_at: new Date().toISOString() },
        { id: 4, name: 'Designer UV Sunglasses', category: 'accessories', price: 899, originalPrice: 1499, rating: 4.5, badge: 'TRENDING', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80', stock: 25, created_at: new Date().toISOString() },
        { id: 5, name: 'Ergonomic Mechanical Keyboard', category: 'electronics', price: 3499, originalPrice: 4999, rating: 4.9, badge: 'HOT', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80', stock: 20, created_at: new Date().toISOString() },
        { id: 6, name: 'Premium Leather Crossbody Bag', category: 'fashion', price: 2499, originalPrice: 3299, rating: 4.7, badge: 'NEW', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80', stock: 15, created_at: new Date().toISOString() },
        { id: 7, name: 'Portable Bluetooth Speaker', category: 'electronics', price: 1599, originalPrice: 2299, rating: 4.3, badge: '', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80', stock: 50, created_at: new Date().toISOString() },
        { id: 8, name: 'Stainless Steel Water Bottle', category: 'home', price: 649, originalPrice: 999, rating: 4.6, badge: 'ECO', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80', stock: 80, created_at: new Date().toISOString() }
      ]
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
    return initialData;
  }
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return { users: [], orders: [], products: [] };
  }
}

function saveDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  try {
    syncJSONToSQLite(data);
  } catch (err) {
    console.error('SQLite Sync warning:', err.message);
  }
}

const otpStore = {};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASS,
  },
});

function requireAdmin(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.replace('Bearer ', '').trim();
  if (token !== ADMIN_SECRET) {
    return res.status(401).json({ message: 'Unauthorized access. Valid admin secret required.' });
  }
  next();
}

// ─── ADMIN ENDPOINTS ───
app.post('/admin/login', (req, res) => {
  const { secret } = req.body;
  if (secret && secret === ADMIN_SECRET) {
    return res.json({ token: ADMIN_SECRET });
  }
  return res.status(401).json({ message: 'Invalid admin secret password.' });
});

app.get('/admin/stats', requireAdmin, (req, res) => {
  const db = loadDB();
  const sales = db.orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const pendingReturns = db.orders.filter(o => (o.status || '').toLowerCase() === 'return requested').length;

  res.json({
    users: db.users.length,
    orders: db.orders.length,
    sales,
    pendingReturns,
    recentOrders: db.orders.slice().reverse().slice(0, 20),
    usersList: db.users.slice().reverse().slice(0, 30),
    productsList: db.products
  });
});

app.put('/admin/order/:id/status', requireAdmin, (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;
  const db = loadDB();
  const order = db.orders.find(o => o.id === orderId);
  if (!order) {
    return res.status(404).json({ message: 'Order not found.' });
  }
  order.status = status;
  saveDB(db);
  res.json({ message: `Order status updated to '${status}'` });
});

// Product CRUD APIs
app.get('/api/products', (req, res) => {
  const db = loadDB();
  res.json(db.products);
});

app.post('/admin/products', requireAdmin, (req, res) => {
  const { name, category, price, originalPrice, badge, image, stock } = req.body;
  if (!name || !category || !price || !image) {
    return res.status(400).json({ message: 'Product name, category, price, and image URL are required.' });
  }

  const db = loadDB();
  const newProduct = {
    id: db.products.length > 0 ? Math.max(...db.products.map(p => p.id)) + 1 : 1,
    name,
    category,
    price,
    originalPrice: originalPrice || price,
    rating: 4.5,
    badge: badge || '',
    image,
    stock: stock || 50,
    created_at: new Date().toISOString()
  };

  db.products.push(newProduct);
  saveDB(db);
  res.json({ message: 'Product added successfully.', productId: newProduct.id });
});

app.put('/admin/products/:id', requireAdmin, (req, res) => {
  const productId = parseInt(req.params.id);
  const { name, category, price, originalPrice, badge, image, stock } = req.body;

  const db = loadDB();
  const prodIndex = db.products.findIndex(p => p.id === productId);
  if (prodIndex === -1) {
    return res.status(404).json({ message: 'Product not found.' });
  }

  db.products[prodIndex] = {
    ...db.products[prodIndex],
    name,
    category,
    price,
    originalPrice: originalPrice || price,
    badge: badge || '',
    image,
    stock: stock || 50
  };

  saveDB(db);
  res.json({ message: 'Product updated successfully.' });
});

app.delete('/admin/products/:id', requireAdmin, (req, res) => {
  const productId = parseInt(req.params.id);
  const db = loadDB();
  const initialLength = db.products.length;
  db.products = db.products.filter(p => p.id !== productId);

  if (db.products.length === initialLength) {
    return res.status(404).json({ message: 'Product not found.' });
  }

  saveDB(db);
  res.json({ message: 'Product removed from store.' });
});

// ─── AUTH & USER PROFILE ENDPOINTS ───
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  const db = loadDB();
  const existingUser = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    return res.status(400).json({ message: 'User with this email already exists.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: Date.now(),
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
    created_at: new Date().toISOString()
  };

  db.users.push(newUser);
  saveDB(db);

  res.status(201).json({ message: 'Account created successfully! Please sign in.', user: { name: newUser.name, email: newUser.email } });
});

app.post('/send-otp', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email address is required.' });

  const db = loadDB();
  const existingUser = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    return res.status(400).json({ message: 'An account with this email address already exists. Please sign in.' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email.toLowerCase()] = { otp, timestamp: Date.now(), type: 'register' };

  const mailOptions = {
    from: `"ShopEase Support" <${process.env.GMAIL_USER || 'noreply@shopease.com'}>`,
    to: email,
    subject: 'Your ShopEase Registration OTP',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 500px; border: 1px solid #e5e7eb; border-radius: 10px;">
        <h2 style="color: #4f46e5; margin-bottom: 10px;">Welcome to ShopEase!</h2>
        <p>Use the One-Time Password (OTP) below to complete your account registration:</p>
        <div style="background: #eef2ff; padding: 15px; font-size: 28px; font-weight: bold; letter-spacing: 5px; color: #4f46e5; text-align: center; border-radius: 8px; margin: 20px 0;">
          ${otp}
        </div>
        <p style="font-size: 14px; color: #555;">This code is valid for 5 minutes. Please do not share it with anyone.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin-top: 20px;" />
        <p style="font-size: 12px; color: #888;">If you did not request this OTP, please ignore this email.</p>
      </div>
    `,
    text: `Your One-Time Password for ShopEase is: ${otp}. It is valid for 5 minutes.`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('❌ Nodemailer Error sending OTP email:', error.message);
      return res.status(200).json({ 
        message: `OTP generated! (Email delivery failed. Code: ${otp})` 
      });
    }
    console.log('✅ OTP Email sent successfully to:', email);
    res.status(200).json({ message: 'OTP sent successfully to ' + email });
  });
});

app.post('/verify-and-register', async (req, res) => {
  const { name, email, otp, password } = req.body;
  if (!name || !email || !otp || !password) {
    return res.status(400).json({ message: 'Name, email, OTP, and password are required.' });
  }

  const normalizedEmail = email.toLowerCase();
  const storedOtpData = otpStore[normalizedEmail];

  if (!storedOtpData || storedOtpData.type !== 'register') {
    return res.status(400).json({ message: 'OTP not found. Please click Send OTP first.' });
  }
  if (Date.now() - storedOtpData.timestamp > 5 * 60 * 1000) {
    delete otpStore[normalizedEmail];
    return res.status(400).json({ message: 'OTP has expired. Please request a new OTP.' });
  }
  if (storedOtpData.otp !== otp.trim()) {
    return res.status(400).json({ message: 'Invalid OTP entered. Please check and try again.' });
  }

  const db = loadDB();
  const existingUser = db.users.find(u => u.email.toLowerCase() === normalizedEmail);
  if (existingUser) {
    delete otpStore[normalizedEmail];
    return res.status(409).json({ message: 'An account with this email address already exists.' });
  }

  const hashed = bcrypt.hashSync(password, 10);
  const newUser = {
    id: db.users.length + 1,
    name: name.trim(),
    email: normalizedEmail,
    password: hashed,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
    phone: '',
    address: '',
    created_at: new Date().toISOString()
  };

  db.users.push(newUser);
  saveDB(db);
  delete otpStore[normalizedEmail];
  res.status(200).json({ message: 'Verification successful. Account created!' });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const db = loadDB();
  const user = db.users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }
  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }
  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar || '',
    phone: user.phone || '',
    address: user.address || '',
  });
});

app.post('/social-login', (req, res) => {
  const { name, email, avatar } = req.body;
  if (!email || !name) {
    return res.status(400).json({ message: 'Social login requires name and email.' });
  }

  const db = loadDB();
  let existing = db.users.find(u => u.email === email);
  if (existing) {
    if (!existing.avatar && avatar) {
      existing.avatar = avatar;
      saveDB(db);
    }
    return res.json({
      id: existing.id,
      name: existing.name,
      email: existing.email,
      avatar: avatar || existing.avatar || '',
      phone: existing.phone || '',
      address: existing.address || '',
    });
  }

  const hashed = bcrypt.hashSync(Math.random().toString(36).slice(2), 10);
  const newUser = {
    id: db.users.length + 1,
    name,
    email,
    password: hashed,
    avatar: avatar || '',
    phone: '',
    address: '',
    created_at: new Date().toISOString()
  };

  db.users.push(newUser);
  saveDB(db);
  res.json({
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    avatar: newUser.avatar,
    phone: newUser.phone,
    address: newUser.address
  });
});

app.post('/forgot-password', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email address is required.' });

  const normalizedEmail = email.toLowerCase();
  const db = loadDB();
  const user = db.users.find(u => u.email.toLowerCase() === normalizedEmail);
  if (!user) return res.status(404).json({ message: 'No account found with this email address.' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[normalizedEmail] = { otp, timestamp: Date.now(), type: 'reset' };

  const mailOptions = {
    from: `"ShopEase Support" <${process.env.GMAIL_USER || 'noreply@shopease.com'}>`,
    to: email,
    subject: 'ShopEase Password Reset OTP',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 500px; border: 1px solid #fee2e2; border-radius: 10px;">
        <h2 style="color: #ef4444; margin-bottom: 10px;">ShopEase Password Reset</h2>
        <p>Your OTP code to reset your password is:</p>
        <div style="background: #fef2f2; padding: 15px; font-size: 28px; font-weight: bold; letter-spacing: 5px; color: #ef4444; text-align: center; border-radius: 8px; margin: 20px 0;">
          ${otp}
        </div>
        <p style="font-size: 14px; color: #555;">This code is valid for 5 minutes. If you did not request a password reset, please ignore this email.</p>
      </div>
    `,
    text: `Your One-Time Password for resetting your ShopEase password is: ${otp}. It is valid for 5 minutes.`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('❌ Nodemailer Error sending password reset email:', error.message);
      return res.status(200).json({ 
        message: `Reset OTP generated! (Email delivery failed. Code: ${otp})` 
      });
    }
    console.log('✅ Password Reset Email sent successfully to:', email);
    res.status(200).json({ message: 'Password reset OTP sent to ' + email });
  });
});

app.post('/reset-password', (req, res) => {
  const { email, otp, password } = req.body;
  const storedOtpData = otpStore[email];
  if (!storedOtpData || storedOtpData.type !== 'reset') {
    return res.status(400).json({ message: 'Reset token not found or invalid. Please try again.' });
  }
  if (Date.now() - storedOtpData.timestamp > 5 * 60 * 1000) {
    delete otpStore[email];
    return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
  }
  if (storedOtpData.otp !== otp) {
    return res.status(400).json({ message: 'Invalid OTP entered.' });
  }

  const db = loadDB();
  const user = db.users.find(u => u.email === email);
  if (!user) return res.status(404).json({ message: 'User not found.' });

  user.password = bcrypt.hashSync(password, 10);
  saveDB(db);
  delete otpStore[email];
  res.status(200).json({ message: 'Password has been reset successfully!' });
});

app.put('/user/profile', (req, res) => {
  const { currentEmail, name, email, phone, address } = req.body;
  if (!currentEmail || !name || !email) {
    return res.status(400).json({ message: 'Missing profile update data.' });
  }

  const db = loadDB();
  const user = db.users.find(u => u.email === currentEmail);
  if (!user) return res.status(404).json({ message: 'User not found.' });

  if (currentEmail !== email && db.users.some(u => u.email === email)) {
    return res.status(409).json({ message: 'Email address is already in use by another user.' });
  }

  user.name = name;
  user.email = email;
  user.phone = phone || '';
  user.address = address || '';

  saveDB(db);
  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar || '',
    phone: user.phone || '',
    address: user.address || '',
  });
});

// ─── ORDERS ENDPOINTS ───
app.post('/orders', (req, res) => {
  const {
    id,
    email,
    shippingName,
    shippingPhone,
    shippingAddress,
    items,
    subtotal,
    delivery,
    discount,
    total,
    coupon,
    status,
  } = req.body;

  if (!id || !items || typeof total !== 'number') {
    return res.status(400).json({ message: 'Missing order details.' });
  }

  const db = loadDB();
  const newOrder = {
    id,
    email,
    shippingName,
    shippingPhone,
    shippingAddress,
    items,
    subtotal,
    delivery,
    discount,
    total,
    coupon,
    status: status || 'Placed',
    created_at: new Date().toISOString()
  };

  db.orders.push(newOrder);
  saveDB(db);
  res.json({ message: 'Order placed successfully.', orderId: id });
});

app.get('/orders', (req, res) => {
  const email = req.query.email;
  if (!email) return res.status(400).json({ message: 'Email query parameter is required.' });

  const db = loadDB();
  const userOrders = db.orders.filter(o => o.email === email).reverse();
  res.json(userOrders);
});

app.put('/orders/:id/status', (req, res) => {
  const orderId = req.params.id;
  const { status, email } = req.body;
  if (!status) {
    return res.status(400).json({ message: 'New status is required.' });
  }

  const db = loadDB();
  const order = db.orders.find(o => o.id === orderId);
  if (!order) return res.status(404).json({ message: 'Order not found.' });

  if (req.headers.authorization && req.headers.authorization.replace('Bearer ', '').trim() === ADMIN_SECRET) {
    order.status = status;
    saveDB(db);
    return res.json({ message: 'Order status updated by admin.' });
  }

  if (!email || email !== order.email) {
    return res.status(403).json({ message: 'You may only update orders for your own account.' });
  }

  if (status !== 'return requested') {
    return res.status(400).json({ message: 'Customers can only request returns through this endpoint.' });
  }
  order.status = status;
  saveDB(db);
  res.json({ message: 'Return request submitted.' });
});

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Root GET route
app.get('/', (req, res) => {
  res.status(200).send('<h1>ShopEase Backend API Server</h1><p>Status: Running online. Access <a href="/index.html">index.html</a> or <a href="/admin.html">admin.html</a>.</p>');
});

app.listen(PORT, () => {
  console.log(`✅ ShopEase Server is running on http://localhost:${PORT}`);
});