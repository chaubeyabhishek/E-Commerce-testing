const { test, expect } = require('@playwright/test');

test.use({ viewport: { width: 1500, height: 1000 } });

test('Verify Product Catalog Display', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/products');

  console.log(await page.viewportSize().width);
  console.log(await page.viewportSize().height);

  const productCards = page.locator('.product-item');
  await expect(productCards.first()).toBeVisible();

  await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible();
});

test('Verify Product Details and Price', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/products');

  const firstProductName = page.locator('.product-title').first();
  const firstProductPrice = page.locator('.product-price').first();

  await expect(firstProductName).toBeVisible();
  await expect(firstProductPrice).toBeVisible();
});

test('Verify Product Sorting', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/products');

  await page.locator('select.sort-dropdown').selectOption({ label: 'Price (low to high)' });

  await expect(page.locator('.product-item').first()).toBeVisible();
});

test('Verify Product Search Functionality', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/products');

  await page.locator('input[placeholder="Search products"]').fill('Backpack');
  await page.locator('input[placeholder="Search products"]').press('Enter');

  const results = page.locator('.product-item');
  await expect(results).toHaveCount(1);
  await expect(results.first()).toContainText('Backpack');
});

test('Verify Product Images Are Loaded', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/products');

  const productImage = page.locator('.product-item img').first();
  await expect(productImage).toBeVisible();
  await expect(productImage).toHaveAttribute('src', /.+/);
});

test('Navigate to Single Product Detail Page', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/products');

  await page.locator('.product-title').first().click();

  await expect(page).toHaveURL(/product-details/);
  await expect(page.getByRole('button', { name: 'Add to Cart' })).toBeVisible();
  await expect(page.locator('.product-description')).toBeVisible();
});
