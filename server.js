require('dotenv').config();
const path = require('path');
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const bcrypt = require('bcryptjs');
const Database = require('better-sqlite3');

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'shopadmin123';

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

app.use(session({
  secret: process.env.SESSION_SECRET || 'shop-easy-secret',
  resave: false,
  saveUninitialized: true,
}));

const db = new Database(path.join(__dirname, 'shop-easy.db'));

const initSql = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  avatar TEXT,
  phone TEXT,
  address TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  shippingName TEXT,
  shippingPhone TEXT,
  shippingAddress TEXT,
  items TEXT NOT NULL,
  subtotal INTEGER,
  delivery INTEGER,
  discount INTEGER,
  total INTEGER,
  coupon TEXT,
  status TEXT,
  created_at TEXT NOT NULL
);
`;

db.exec(initSql);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASS,
  },
});

const otpStore = {};

function getUserByEmail(email) {
  return db.prepare('SELECT id, name, email, avatar, phone, address, created_at FROM users WHERE email = ?').get(email);
}

function getUserCredentials(email) {
  return db.prepare('SELECT id, name, email, password, avatar, phone, address, created_at FROM users WHERE email = ?').get(email);
}

function requireAdmin(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.replace('Bearer ', '').trim();
  if (token !== ADMIN_SECRET) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
}

app.post('/admin/login', (req, res) => {
  const { secret } = req.body;
  if (secret && secret === ADMIN_SECRET) {
    return res.json({ token: ADMIN_SECRET });
  }
  return res.status(401).json({ message: 'Invalid admin secret' });
});

app.get('/admin/stats', requireAdmin, (req, res) => {
  const users = db.prepare('SELECT COUNT(*) AS count FROM users').get().count;
  const orders = db.prepare('SELECT COUNT(*) AS count FROM orders').get().count;
  const sales = db.prepare('SELECT COALESCE(SUM(total), 0) AS total FROM orders').get().total;
  const pendingReturns = db.prepare("SELECT COUNT(*) AS count FROM orders WHERE status = 'return requested'").get().count;
  const recentOrders = db.prepare('SELECT id, email, status, total, created_at FROM orders ORDER BY created_at DESC LIMIT 15').all();
  const usersList = db.prepare('SELECT name, email, created_at FROM users ORDER BY created_at DESC LIMIT 20').all();

  res.json({ users, orders, sales, pendingReturns, recentOrders, usersList });
});

app.put('/admin/order/:id/status', requireAdmin, (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;
  const result = db.prepare('UPDATE orders SET status = ? WHERE id = ?').run(status, orderId);
  if (result.changes === 0) {
    return res.status(404).json({ message: 'Order not found' });
  }
  res.json({ message: 'Order status updated' });
});

app.post('/send-otp', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = { otp, timestamp: Date.now(), type: 'register' };

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Your ShopEase Registration OTP',
    text: `Your One-Time Password for ShopEase is: ${otp}. It is valid for 5 minutes.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: 'Failed to send OTP. Check server credentials.' });
    }
    res.status(200).json({ message: 'OTP sent successfully to ' + email });
  });
});

app.post('/verify-and-register', async (req, res) => {
  const { name, email, otp, password } = req.body;
  const storedOtpData = otpStore[email];
  if (!storedOtpData || storedOtpData.type !== 'register') {
    return res.status(400).json({ message: 'OTP not found or invalid. Please try again.' });
  }
  if (Date.now() - storedOtpData.timestamp > 5 * 60 * 1000) {
    delete otpStore[email];
    return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
  }
  if (storedOtpData.otp !== otp) {
    return res.status(400).json({ message: 'Invalid OTP entered.' });
  }

  const existingUser = getUserByEmail(email);
  if (existingUser) {
    delete otpStore[email];
    return res.status(409).json({ message: 'Email is already registered.' });
  }

  const hashed = bcrypt.hashSync(password, 10);
  const createdAt = new Date().toISOString();
  db.prepare('INSERT INTO users (name, email, password, created_at) VALUES (?, ?, ?, ?)').run(name, email, hashed, createdAt);
  delete otpStore[email];
  res.status(200).json({ message: 'Verification successful. Account created!' });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = getUserCredentials(email);
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

  const existing = db.prepare('SELECT id, name, email, avatar, phone, address, created_at FROM users WHERE email = ?').get(email);
  if (existing) {
    if (!existing.avatar && avatar) {
      db.prepare('UPDATE users SET avatar = ? WHERE email = ?').run(avatar, email);
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
  const createdAt = new Date().toISOString();
  db.prepare('INSERT INTO users (name, email, password, avatar, created_at) VALUES (?, ?, ?, ?, ?)')
    .run(name, email, hashed, avatar || '', createdAt);

  const user = getUserByEmail(email);
  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar || '',
    phone: user.phone || '',
    address: user.address || '',
  });
});

app.post('/forgot-password', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  const user = getUserByEmail(email);
  if (!user) return res.status(404).json({ message: 'No account found with this email.' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = { otp, timestamp: Date.now(), type: 'reset' };

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Your ShopEase Password Reset OTP',
    text: `Your One-Time Password to reset your password is: ${otp}. It is valid for 5 minutes.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: 'Failed to send OTP.' });
    }
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

  const hashed = bcrypt.hashSync(password, 10);
  const result = db.prepare('UPDATE users SET password = ? WHERE email = ?').run(hashed, email);
  delete otpStore[email];
  if (result.changes === 0) {
    return res.status(404).json({ message: 'User not found.' });
  }
  res.status(200).json({ message: 'Password has been reset successfully!' });
});

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

  const createdAt = new Date().toISOString();
  db.prepare(
    `INSERT INTO orders (id, email, shippingName, shippingPhone, shippingAddress, items, subtotal, delivery, discount, total, coupon, status, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    email,
    shippingName,
    shippingPhone,
    shippingAddress,
    JSON.stringify(items),
    subtotal,
    delivery,
    discount,
    total,
    coupon,
    status,
    createdAt
  );

  res.json({ message: 'Order has been stored.', orderId: id });
});

app.get('/orders', (req, res) => {
  const email = req.query.email;
  if (!email) return res.status(400).json({ message: 'Email query parameter is required.' });

  const rows = db.prepare('SELECT * FROM orders WHERE email = ? ORDER BY created_at DESC').all(email);
  const orders = rows.map(r => ({
    ...r,
    items: JSON.parse(r.items),
  }));
  res.json(orders);
});

app.put('/orders/:id/status', (req, res) => {
  const orderId = req.params.id;
  const { status, email } = req.body;
  if (!status) {
    return res.status(400).json({ message: 'New status is required.' });
  }

  const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId);
  if (!order) return res.status(404).json({ message: 'Order not found.' });

  if (req.headers.authorization && req.headers.authorization.replace('Bearer ', '').trim() === ADMIN_SECRET) {
    db.prepare('UPDATE orders SET status = ? WHERE id = ?').run(status, orderId);
    return res.json({ message: 'Order status updated by admin.' });
  }

  if (!email || email !== order.email) {
    return res.status(403).json({ message: 'You may only update orders for your own account.' });
  }

  if (status !== 'return requested') {
    return res.status(400).json({ message: 'Customers can only request returns through this endpoint.' });
  }
  db.prepare('UPDATE orders SET status = ? WHERE id = ?').run(status, orderId);
  res.json({ message: 'Return request submitted.' });
});

app.put('/user/update', (req, res) => {
  const { currentEmail, newName, newEmail } = req.body;
  if (!currentEmail || !newName || !newEmail) {
    return res.status(400).json({ message: 'Missing profile update data.' });
  }

  const existing = getUserByEmail(currentEmail);
  if (!existing) return res.status(404).json({ message: 'User not found.' });

  if (currentEmail !== newEmail && getUserByEmail(newEmail)) {
    return res.status(409).json({ message: 'Email already taken.' });
  }

  db.prepare('UPDATE users SET name = ?, email = ? WHERE email = ?').run(newName, newEmail, currentEmail);
  res.json({ name: newName, email: newEmail });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      const user = {
        name: profile.displayName,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value,
        provider: 'google',
      };
      done(null, user);
    }
  )
);

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login-failed' }),
  function (req, res) {
    const userString = JSON.stringify(req.user);
    res.send(`<script>window.opener.postMessage(${userString}, '*'); window.close();</script>`);
  }
);

app.listen(PORT, () => {
  console.log(`✅ Backend server is running on http://localhost:${PORT}`);
});