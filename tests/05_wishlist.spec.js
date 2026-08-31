const { test, expect } = require('@playwright/test');

test.use({ viewport: { width: 1500, height: 1000 } });

test('Add Product to Wishlist', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/products');

  console.log(await page.viewportSize().width);
  console.log(await page.viewportSize().height);

  await page.locator('.product-item .wishlist-icon').first().click();

  const wishlistBadge = page.locator('.wishlist-badge');
  await expect(wishlistBadge).toHaveText('1');
});

test('Remove Product from Wishlist', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/wishlist');

  await page.getByRole('button', { name: 'Remove from Wishlist' }).first().click();

  await expect(page.getByText('Your wishlist is empty')).toBeVisible();
});

test('Move Product from Wishlist to Cart', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/wishlist');

  await page.getByRole('button', { name: 'Move to Cart' }).first().click();

  const cartBadge = page.locator('.cart-badge');
  await expect(cartBadge).toHaveText('1');
  await expect(page.getByText('Item added to cart')).toBeVisible();
});
