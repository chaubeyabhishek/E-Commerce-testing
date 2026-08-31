# Playwright E-Commerce Automation Framework (JavaScript)

Clean, flat procedural Playwright automation framework without classes or Page Objects. Configured for Chromium and Firefox with dummy URLs and realistic e-commerce flows.

---

## Ordered Project Structure (11 Test Suites)

```text
QA-Project/
│
├── tests/
│   ├── 01_registration.spec.js          # Register as User & Register as Admin + Validations
│   ├── 02_login.spec.js                 # Sign In as User & Admin, Password toggle & Sign Out
│   ├── 03_product.spec.js               # Catalog display, search, sort & single product page
│   ├── 04_cart.spec.js                  # Add to cart, quantity update, coupon & remove
│   ├── 05_wishlist.spec.js              # Add to wishlist, remove & move to cart
│   ├── 06_checkout.spec.js              # Checkout form validation, payment & complete order
│   ├── 07_admin_dashboard.spec.js       # Admin metrics, add product, view orders & delete
│   ├── 08_user_profile.spec.js          # Update profile, change password, shipping addresses, invoices
│   ├── 09_product_reviews.spec.js       # Star ratings, review submission, upvote helpful reviews
│   ├── 10_filter_and_pagination.spec.js # Category filter, price slider, in-stock toggle, pagination
│   └── 11_order_tracking.spec.js        # Order status timeline, cancellation & return request
│
├── playwright.config.js                 # Configured for Chromium and Firefox
├── package.json                         # Numbered npm scripts
├── .gitignore
└── README.md
```

---

## How to Run Tests

### 1. Run all tests in order
```bash
npm test
```

### 2. Run specific test suites
```bash
npm run test:register
npm run test:login
npm run test:product
npm run test:cart
npm run test:wishlist
npm run test:checkout
npm run test:admin
npm run test:profile
npm run test:reviews
npm run test:filter
npm run test:tracking
```

### 3. Run on a specific browser
```bash
# Chromium
npx playwright test --project=chromium

# Firefox
npx playwright test --project=firefox
```

### 4. Run in Headed mode
```bash
npm run test:headed
```

### 5. View HTML Test Report
```bash
npm run report
```
