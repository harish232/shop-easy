# 🛍️ ShopEase - Full-Stack E-Commerce & Admin Control Center

ShopEase is an ultra-modern, full-stack E-Commerce web application featuring a rich customer shopping interface, persistent database management, and a dedicated **Owner / Admin Dashboard** designed with high-end dark glassmorphism styling.

---

## 🌟 Project Overview

- **Customer Platform**: Browse products across categories, search in real-time, manage cart & checkout, track order status visually, save wishlist items, and interact with a virtual support chatbot.
- **Admin Control Panel**: Real-time sales analytics, inventory management (Add/Edit/Delete products), customer order processing, and return request approvals.
- **Database Engine**: Dual storage architecture with real-time JSON database persistence (`shop-easy-db.json`) and SQLite database support (`shop-easy.db`).

---

## ⚙️ Key Features

### 🛍️ Customer Portal (`index.html`)
- **Product Catalog**: Dynamic filtering by categories (Electronics, Fashion, Accessories, Books, Home) and real-time search.
- **Interactive Shopping Cart**: Live quantity adjustments, promo code discount calculations, and smooth checkout flow.
- **Visual Order Tracker**: Pipeline progress bar tracking order stages (`Placed` ➔ `Processing` ➔ `Shipped` ➔ `Delivered`).
- **Customer Dashboard**: Saved default delivery address, order history, wishlist, and account settings.
- **Help Center & AI Assistant**: FAQs and an automated virtual chatbot assistant for customer support.

### 👑 Admin Control Panel (`admin.html`)
- **Dark Glassmorphic Aesthetic**: Mesh gradient backgrounds, glowing neon status pills, and high-contrast forms.
- **Real-Time Analytics**: Live counters for total sales revenue, active orders, customer count, and pending return requests.
- **Inventory CRUD Operations**: Modal interface to add new products, edit existing prices/badges/images, or remove products.
- **Order Management & Returns**: Change order statuses in real-time and review customer return requests.

---

## 🛠️ Technology Stack & Skills

| Layer | Technology / Library | Description |
|---|---|---|
| **Frontend** | HTML5, CSS3, JavaScript (ES6+) | Single-Page Architecture, Dark Glassmorphism, Responsive Grid |
| **Backend** | Node.js, Express.js | RESTful API Web Server (`server.js`) |
| **Database** | JSON DB (`shop-easy-db.json`), SQLite (`shop-easy.db`) | Dual-layer persistent data storage |
| **Security** | Bcrypt.js | Password hashing and admin authentication security |
| **Authentication** | Passport.js, Google OAuth 2.0 | Multi-provider sign-in support |
| **Email Service** | Nodemailer | Real-time OTP generation and customer notification emails |

---

## 🔑 Default Login Credentials

### 👑 Admin Credentials
- **URL**: [http://localhost:3000/admin.html](http://localhost:3000/admin.html)
- **Admin Email**: `admin@shopease.com`
- **Secret Password**: `shopadmin123`

---

## 🚀 Setup & Execution Guide

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Local Development Server**:
   ```bash
   node server.js
   ```

3. **Access Application URLs**:
   - Customer Storefront: [http://localhost:3000/index.html](http://localhost:3000/index.html)
   - Admin Control Portal: [http://localhost:3000/admin.html](http://localhost:3000/admin.html)
