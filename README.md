# 🛒 Playwright E-Commerce Automation Framework (JavaScript)

Clean, flat procedural Playwright automation framework without classes or Page Objects. Configured for **Chromium** and **Firefox** with dummy URLs and realistic e-commerce flows.

---

## Ordered Project Structure

```text
QA-Project/
│
├── tests/
│   ├── 01_registration.spec.js       # Register as User, Register as Admin, Validation checks
│   ├── 02_login.spec.js              # User Sign In, Admin Sign In, Password toggle & Sign Out
│   ├── 03_product.spec.js            # Catalog display, search, sort & single product page
│   ├── 04_cart.spec.js               # Add to cart, quantity update, coupon & remove
│   ├── 05_wishlist.spec.js           # Add to wishlist, remove & move to cart
│   ├── 06_checkout.spec.js           # Checkout form validation, payment & complete order
│   └── 07_admin_dashboard.spec.js    # Admin metrics, add product, view orders & delete product
│
├── playwright.config.js              # Configured for Chromium and Firefox
├── package.json                      # NPM test execution scripts
├── .gitignore
└── README.md
```

---

## How to Run Tests

### 1. Install dependencies
```bash
npm install
npx playwright install chromium firefox
```

### 2. Run all tests in order
```bash
npm test
```

### 3. Run specific test suites in ordered manner
```bash
# 01 Registration tests (User & Admin)
npm run test:register

# 02 Sign In / Login tests (User & Admin)
npm run test:login

# 03 Product catalog & search tests
npm run test:product

# 04 Cart management tests
npm run test:cart

# 05 Wishlist tests
npm run test:wishlist

# 06 Checkout & order tests
npm run test:checkout

# 07 Admin dashboard tests
npm run test:admin
```

### 4. Run tests on specific browser
```bash
# Run on Chromium
npx playwright test --project=chromium

# Run on Firefox
npx playwright test --project=firefox
```

### 5. Run with headed browser window
```bash
npm run test:headed
```

### 6. View HTML Report
```bash
npm run report
```
