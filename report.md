### Project Update: Weekly Feature Rollout & Enhancements

This week was focused on transforming the application from a frontend-only simulation into a more robust, full-stack e-commerce platform with real authentication capabilities and significant UI/UX improvements.

---

#### 🚀 Major Features & Enhancements

1.  **Full-Stack Authentication System:**
    *   **Real OTP Verification:** Implemented a backend-powered OTP (One-Time Password) system using Node.js and Nodemailer. Users now receive actual emails for account registration.
    *   **"Forgot Password" Flow:** A complete password reset feature has been added. Users can request a reset link, receive an OTP via email, and set a new password.
    *   **Google Social Login:** Integrated a fully functional "Continue with Google" login using Passport.js and the Google OAuth 2.0 strategy. This provides a secure and seamless sign-in experience.

2.  **New "Books" Category:**
    *   Expanded the product catalog by adding a new "Books" category.
    *   Updated the navigation bar and filter buttons to include the new category, making it fully browsable and searchable.

3.  **Hero Banner Carousel:**
    *   The static hero banner on the homepage has been converted into a dynamic, auto-playing carousel. It now cycles through different promotional slides, making the landing page more engaging.

---

#### ✨ UI/UX Improvements

1.  **Streamlined User Profile:**
    *   The navigation bar now displays only the user's avatar icon. The full user menu with profile and order links appears upon clicking the icon.
    *   Removed distracting hover effects from the profile icon for a cleaner look.

2.  **Dark Mode Fixes:**
    *   Resolved issues where text in the footer and customer support sections was not visible in dark mode. This was fixed by refactoring inline styles into the main `styles.css` file, ensuring proper theme adoption.

3.  **Enhanced User Safety:**
    *   Added confirmation popups before a user clears their shopping cart or signs out, preventing accidental actions and improving the overall user experience.

---

#### 🛠️ Backend & Code Structure

1.  **Node.js Backend Server (`server.js`):**
    *   A new `server.js` file was created to handle all backend logic.
    *   It includes API endpoints for sending OTPs, verifying users, and handling the Google OAuth 2.0 authentication flow.

2.  **Code Organization:**
    *   Initially, all JavaScript was moved into the `index.html` file as requested.
    *   This was later reverted to keep the code modular and maintainable, with the application logic residing in `script.js` and the server logic in `server.js`. This separation of concerns is a standard best practice.