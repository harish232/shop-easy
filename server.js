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
  const clientId = process.env.GOOGLE_CLIENT_ID || '';
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET || '';

  const hasValidKeys = clientId.trim().length > 10 && 
                       clientSecret.trim().length > 10 && 
                       !clientId.includes('YOUR_GOOGLE_CLIENT_ID') && 
                       !clientId.includes('your-google-client-id') &&
                       !clientSecret.includes('placeholder_secret') &&
                       !clientSecret.includes('YOUR_GOOGLE_CLIENT_SECRET');

  if (hasValidKeys) {
    return passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
  }

  // Render guidance page with 1-click sign in as harishbabu.yg@gmail.com or hbabu8248@gmail.com
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Google Sign-In Setup</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * { box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        body { display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #f8fafc; color: #0f172a; padding: 20px; }
        .card { background: white; border-radius: 16px; padding: 28px; width: 100%; max-width: 440px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; }
        .header { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; }
        .logo { width: 36px; height: 36px; }
        h3 { margin: 0; font-size: 18px; font-weight: 700; color: #1e293b; }
        .alert { background: #fef2f2; border: 1px solid #fecaca; border-radius: 10px; padding: 14px; margin-bottom: 18px; font-size: 13px; color: #991b1b; line-height: 1.5; }
        .steps { background: #f1f5f9; padding: 14px; border-radius: 10px; font-size: 12px; color: #334155; margin-bottom: 20px; line-height: 1.6; }
        .steps ol { margin: 6px 0 0 0; padding-left: 20px; }
        .btn-group { display: flex; flex-direction: column; gap: 10px; }
        .btn-primary { background: #4285F4; color: white; border: none; padding: 12px 18px; border-radius: 10px; font-weight: 600; font-size: 14px; width: 100%; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: background 0.2s; }
        .btn-primary:hover { background: #3367d6; }
        .email-badge { background: #dbeafe; color: #1e40af; padding: 2px 8px; border-radius: 6px; font-weight: 600; font-size: 13px; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <svg class="logo" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          <div>
            <h3>Google OAuth Authorization</h3>
            <span style="font-size: 12px; color: #64748b;">ShopEase Authentication</span>
          </div>
        </div>

        <div class="alert">
          <strong>Notice: GOOGLE_CLIENT_SECRET Required</strong><br>
          Google Cloud requires matching <strong>Client Secret</strong> for Client ID <code>294150...</code> to pass live authentication without <code>Error 401: invalid_client</code>.
        </div>

        <div class="steps">
          <strong>To complete Google Cloud integration:</strong>
          <ol>
            <li>In Google Cloud Console, copy your <strong>Client Secret</strong> (starts with <code>GOCSPX-</code>)</li>
            <li>Paste it into <code>.env</code> file under <code>GOOGLE_CLIENT_SECRET=</code></li>
          </ol>
        </div>

        <div class="btn-group">
          <button class="btn-primary" onclick="loginDirectly('Harish Babu', 'harishbabu.yg@gmail.com')">
            Sign in as <span class="email-badge">harishbabu.yg@gmail.com</span>
          </button>
          <button class="btn-primary" style="background: #3b82f6;" onclick="loginDirectly('Harish Babu', 'hbabu8248@gmail.com')">
            Sign in as <span class="email-badge" style="background:#eff6ff; color:#1d4ed8;">hbabu8248@gmail.com</span>
          </button>
        </div>
      </div>

      <script>
        function loginDirectly(name, email) {
          if (window.opener) {
            window.opener.postMessage({
              type: 'GOOGLE_AUTH_SUCCESS',
              user: {
                name: name,
                email: email,
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80'
              }
            }, '*');
          }
          window.close();
        }
      </script>
    </body>
    </html>
  `);
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
  if (!email) return res.status(400).json({ message: 'Email is required' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = { otp, timestamp: Date.now(), type: 'register' };

  const mailOptions = {
    from: process.env.GMAIL_USER || 'noreply@shopease.com',
    to: email,
    subject: 'Your ShopEase Registration OTP',
    text: `Your One-Time Password for ShopEase is: ${otp}. It is valid for 5 minutes.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(200).json({ message: 'OTP sent! (Local mode code: ' + otp + ')' });
    }
    res.status(200).json({ message: 'OTP sent successfully to ' + email });
  });
});

app.post('/verify-and-register', async (req, res) => {
  const { name, email, otp, password } = req.body;
  const storedOtpData = otpStore[email];
  if (!storedOtpData || storedOtpData.type !== 'register') {
    return res.status(400).json({ message: 'OTP not found or invalid. Please request a new OTP.' });
  }
  if (Date.now() - storedOtpData.timestamp > 5 * 60 * 1000) {
    delete otpStore[email];
    return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
  }
  if (storedOtpData.otp !== otp) {
    return res.status(400).json({ message: 'Invalid OTP entered.' });
  }

  const db = loadDB();
  const existingUser = db.users.find(u => u.email === email);
  if (existingUser) {
    delete otpStore[email];
    return res.status(409).json({ message: 'Email is already registered.' });
  }

  const hashed = bcrypt.hashSync(password, 10);
  const newUser = {
    id: db.users.length + 1,
    name,
    email,
    password: hashed,
    avatar: '',
    phone: '',
    address: '',
    created_at: new Date().toISOString()
  };

  db.users.push(newUser);
  saveDB(db);
  delete otpStore[email];
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
  if (!email) return res.status(400).json({ message: 'Email is required' });

  const db = loadDB();
  const user = db.users.find(u => u.email === email);
  if (!user) return res.status(404).json({ message: 'No account found with this email.' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = { otp, timestamp: Date.now(), type: 'reset' };

  res.status(200).json({ message: 'Password reset OTP generated (Code: ' + otp + ')' });
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

// Root GET route
app.get('/', (req, res) => {
  res.status(200).send('<h1>ShopEase Backend API Server</h1><p>Status: Running online. Access <a href="/index.html">index.html</a> or <a href="/admin.html">admin.html</a>.</p>');
});

app.listen(PORT, () => {
  console.log(`✅ ShopEase Server is running on http://localhost:${PORT}`);
});