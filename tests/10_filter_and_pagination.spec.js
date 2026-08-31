const { test, expect } = require('@playwright/test');

test.use({ viewport: { width: 1500, height: 1000 } });

test('Filter Products by Category', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/products');

  console.log(await page.viewportSize().width);
  console.log(await page.viewportSize().height);

  await page.locator('input[type="checkbox"][value="Electronics"]').check();

  const productItems = page.locator('.product-item');
  await expect(productItems.first()).toBeVisible();
  await expect(page.locator('.active-filter-tag')).toContainText('Electronics');
});

test('Filter Products by Price Range Slider', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/products');

  await page.locator('input[name="minPrice"]').fill('20');
  await page.locator('input[name="maxPrice"]').fill('50');
  await page.getByRole('button', { name: 'Apply Price' }).click();

  const priceLabels = page.locator('.product-price');
  await expect(priceLabels.first()).toBeVisible();
});

test('Filter Only In-Stock Products', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/products');

  const inStockCheckbox = page.locator('input[name="inStockOnly"]');
  await inStockCheckbox.check();
  await expect(inStockCheckbox).toBeChecked();

  const outOfStockBadges = page.locator('.badge-out-of-stock');
  await expect(outOfStockBadges).toHaveCount(0);
});

test('Pagination Across Catalog Pages', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/products?page=1');

  await expect(page.locator('.pagination .active')).toHaveText('1');

  await page.locator('.pagination .next-page-btn').click();

  await expect(page).toHaveURL(/page=2/);
  await expect(page.locator('.pagination .active')).toHaveText('2');
});
