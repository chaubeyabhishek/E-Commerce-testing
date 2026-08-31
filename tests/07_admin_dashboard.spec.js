const { test, expect } = require('@playwright/test');

test.use({ viewport: { width: 1500, height: 1000 } });

test('Admin Dashboard Access and Analytics View', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/admin/dashboard');

  console.log(await page.viewportSize().width);
  console.log(await page.viewportSize().height);

  await expect(page.getByRole('heading', { name: 'Admin Dashboard' })).toBeVisible();
  await expect(page.locator('.stat-card-total-sales')).toBeVisible();
  await expect(page.locator('.stat-card-total-orders')).toBeVisible();
  await expect(page.locator('.stat-card-total-users')).toBeVisible();
});

test('Admin Adds New Product to Catalog', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/admin/add-product');

  await page.locator('input[name="productTitle"]').fill('New Leather Jacket');
  await page.locator('input[name="productPrice"]').fill('89.99');
  await page.locator('input[name="productStock"]').fill('50');
  await page.locator('textarea[name="productDescription"]').fill('Premium quality black leather jacket.');
  await page.locator('select[name="category"]').selectOption({ label: 'Apparel' });

  await page.getByRole('button', { name: 'Save Product' }).click();

  await expect(page.locator('.success-alert')).toBeVisible();
  await expect(page.locator('.success-alert')).toContainText('Product created successfully');
});

test('Admin Views Customer Orders List', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/admin/orders');

  const ordersTable = page.locator('table.orders-table');
  await expect(ordersTable).toBeVisible();

  const orderRows = page.locator('table.orders-table tbody tr');
  await expect(orderRows.first()).toBeVisible();

  await page.locator('button.view-order-btn').first().click();
  await expect(page).toHaveURL(/admin\/orders\/\d+/);
});

test('Admin Delete Product from Inventory', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/admin/products');

  await page.locator('.product-row').first().locator('button.delete-btn').click();
  await page.getByRole('button', { name: 'Confirm Delete' }).click();

  await expect(page.locator('.notification')).toContainText('Product deleted');
});
