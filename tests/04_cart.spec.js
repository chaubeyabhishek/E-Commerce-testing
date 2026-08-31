const { test, expect } = require('@playwright/test');

test.use({ viewport: { width: 1500, height: 1000 } });

test('Add Single Product to Cart', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/products');

  console.log(await page.viewportSize().width);
  console.log(await page.viewportSize().height);

  await page.locator('.product-item').first().getByRole('button', { name: 'Add to Cart' }).click();

  const cartBadge = page.locator('.cart-badge');
  await expect(cartBadge).toHaveText('1');
});

test('Add Multiple Products to Cart', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/products');

  await page.locator('.product-item').nth(0).getByRole('button', { name: 'Add to Cart' }).click();
  await page.locator('.product-item').nth(1).getByRole('button', { name: 'Add to Cart' }).click();

  const cartBadge = page.locator('.cart-badge');
  await expect(cartBadge).toHaveText('2');
});

test('Remove Product from Cart', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/cart');

  await page.getByRole('button', { name: 'Remove' }).first().click();

  await expect(page.getByText('Your cart is empty')).toBeVisible();
});

test('Update Product Quantity in Cart', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/cart');

  const quantityInput = page.locator('input.cart-quantity').first();
  await quantityInput.fill('3');
  await page.getByRole('button', { name: 'Update Cart' }).click();

  const subtotal = page.locator('.cart-subtotal').first();
  await expect(subtotal).toBeVisible();
});

test('Continue Shopping from Cart Page', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/cart');

  await page.getByRole('button', { name: 'Continue Shopping' }).click();

  await expect(page).toHaveURL(/products/);
});

test('Apply Discount Coupon Code in Cart', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/cart');

  await page.locator('input[name="coupon_code"]').fill('DISCOUNT10');
  await page.getByRole('button', { name: 'Apply Coupon' }).click();

  await expect(page.locator('.discount-applied-msg')).toBeVisible();
  await expect(page.locator('.discount-applied-msg')).toContainText('10% Discount Applied');
});
