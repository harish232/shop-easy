// server.js (New File)

require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');

const app = express();
app.use(cors()); // Allow requests from the frontend
app.use(bodyParser.json());

// Session Middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

const PORT = process.env.PORT || 3000;

// In-memory store for OTPs. In a real app, use a database like Redis.
const otpStore = {};

// Configure Nodemailer to send emails (using Gmail as an example)
// IMPORTANT: You must use a Gmail "App Password" for this to work, not your regular password.
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASS
    }
});

// 1. Endpoint to send OTP for registration
app.post('/send-otp', (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = { otp, timestamp: Date.now(), type: 'register' };

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Your ShopEase Registration OTP',
        text: `Your One-Time Password for ShopEase is: ${otp}. It is valid for 5 minutes.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
            return res.status(500).json({ message: 'Failed to send OTP. Check server credentials.' });
        }
        res.status(200).json({ message: 'OTP sent successfully to ' + email });
    });
});

// 2. Endpoint to verify OTP and register user
app.post('/verify-and-register', (req, res) => {
    const { email, otp, password } = req.body;
    const storedOtpData = otpStore[email];

    if (!storedOtpData || storedOtpData.type !== 'register') {
        return res.status(400).json({ message: 'OTP not found or invalid. Please try again.' });
    }
    if (Date.now() - storedOtpData.timestamp > 5 * 60 * 1000) { // 5-minute expiry
        delete otpStore[email];
        return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
    }
    if (storedOtpData.otp === otp) {
        delete otpStore[email];
        res.status(200).json({ message: 'Verification successful. Account created!' });
    } else {
        res.status(400).json({ message: 'Invalid OTP entered.' });
    }
});

// 3. Endpoint to send OTP for password reset
app.post('/forgot-password', (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    // In a real app, you'd first check if the email exists in your database.
    // Since we don't have a DB, we'll just send the OTP.

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = { otp, timestamp: Date.now(), type: 'reset' };

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Your ShopEase Password Reset OTP',
        text: `Your One-Time Password to reset your password is: ${otp}. It is valid for 5 minutes.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
            return res.status(500).json({ message: 'Failed to send OTP.' });
        }
        res.status(200).json({ message: 'Password reset OTP sent to ' + email });
    });
});

// 4. Endpoint to verify OTP and reset password
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
    if (storedOtpData.otp === otp) {
        // In a real app, you'd now update the user's password in the database.
        // We'll just send a success message for the frontend to handle the update.
        delete otpStore[email];
        res.status(200).json({ message: 'Password has been reset successfully!' });
    } else {
        res.status(400).json({ message: 'Invalid OTP entered.' });
    }
});

// Root GET route for health check
app.get('/', (req, res) => {
    res.status(200).send('<h1>ShopEase Backend API</h1><p>Server is running correctly. This is an API server, not a website. Please open the <strong>index.html</strong> file to use the application.</p>');
});

// Passport and Google OAuth Configuration
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        // This function is called after successful Google authentication.
        // 'profile' contains the user's Google profile information.
        const user = {
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
            provider: 'google'
        };
        return done(null, user);
    }
));

// Google Auth Routes
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login-failed' }),
    function (req, res) {
        // Successful authentication, redirect to a page that will handle the user data.
        const userString = JSON.stringify(req.user);
        res.send(`<script>
            window.opener.postMessage(${userString}, '${process.env.FRONTEND_URL}');
            window.close();
        </script>`);
    });

app.listen(PORT, () => {
    console.log(`✅ Backend server is running on http://localhost:${PORT}`);
});