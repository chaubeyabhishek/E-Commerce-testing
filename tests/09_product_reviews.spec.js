const { test, expect } = require('@playwright/test');

test.use({ viewport: { width: 1500, height: 1000 } });

test('Submit 5-Star Product Review with Comment', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/products/sauce-backpack');

  console.log(await page.viewportSize().width);
  console.log(await page.viewportSize().height);

  await page.getByRole('tab', { name: 'Reviews' }).click();

  await page.locator('.star-rating-input span').nth(4).click();
  await page.locator('input[name="reviewTitle"]').fill('Excellent Quality Backpack!');
  await page.locator('textarea[name="reviewBody"]').fill('Material is sturdy, lightweight, and holds all my laptop accessories safely.');

  await page.getByRole('button', { name: 'Submit Review' }).click();

  await expect(page.locator('.review-list')).toContainText('Excellent Quality Backpack!');
  await expect(page.locator('.review-list')).toContainText('5 / 5');
});

test('Submit Review with Missing Required Fields', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/products/sauce-backpack');

  await page.getByRole('tab', { name: 'Reviews' }).click();

  await page.getByRole('button', { name: 'Submit Review' }).click();

  const ratingError = page.locator('.error-rating');
  await expect(ratingError).toBeVisible();
  await expect(ratingError).toContainText('Please select a star rating');
});

test('Upvote Helpful Product Review', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/products/sauce-backpack');

  await page.getByRole('tab', { name: 'Reviews' }).click();

  const helpfulButton = page.locator('.review-item .btn-helpful').first();
  const initialCountText = await helpfulButton.textContent();
  const initialCount = parseInt(initialCountText.replace(/\D/g, '') || '0');

  await helpfulButton.click();

  await expect(helpfulButton).toContainText(String(initialCount + 1));
});
