const { test, expect } = require('@playwright/test');

test.use({ viewport: { width: 1500, height: 1000 } });

test('Verify Checkout Form and Validation', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/checkout');

  console.log(await page.viewportSize().width);
  console.log(await page.viewportSize().height);

  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page.locator('.error-message')).toBeVisible();
  await expect(page.locator('.error-message')).toContainText('First Name is required');
});

test('Complete Order Placement Flow', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/checkout');

  await page.locator('input[name="firstName"]').fill('John');
  await page.locator('input[name="lastName"]').fill('Doe');
  await page.locator('input[name="postalCode"]').fill('12345');

  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page).toHaveURL(/checkout-summary/);

  await page.getByRole('button', { name: 'Finish' }).click();

  await expect(page).toHaveURL(/checkout-complete/);
  await expect(page.getByText('Thank you for your order!')).toBeVisible();
});

test('Cancel Checkout and Return to Cart', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/checkout');

  await page.getByRole('button', { name: 'Cancel' }).click();

  await expect(page).toHaveURL(/cart/);
});

test('Verify Checkout Tax and Total Calculation', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/checkout-summary');

  const itemTotal = page.locator('.summary-subtotal');
  const tax = page.locator('.summary-tax');
  const finalTotal = page.locator('.summary-total');

  await expect(itemTotal).toBeVisible();
  await expect(tax).toBeVisible();
  await expect(finalTotal).toBeVisible();
});

test('Select Payment Method during Checkout', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/checkout-payment');

  const creditCardRadio = page.locator('input[value="credit_card"]');
  await creditCardRadio.check();
  await expect(creditCardRadio).toBeChecked();

  await page.locator('input[name="card_number"]').fill('4111111111111111');
  await page.locator('input[name="expiry"]').fill('12/28');
  await page.locator('input[name="cvv"]').fill('123');

  await page.getByRole('button', { name: 'Review Order' }).click();
  await expect(page).toHaveURL(/checkout-summary/);
});
