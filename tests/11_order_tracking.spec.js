const { test, expect } = require('@playwright/test');

test.use({ viewport: { width: 1500, height: 1000 } });

test('Track Order by Order ID and Email', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/order-tracking');

  console.log(await page.viewportSize().width);
  console.log(await page.viewportSize().height);

  await page.locator('input[name="orderId"]').fill('ORD-987654');
  await page.locator('input[name="billingEmail"]').fill('john.doe@example.com');

  await page.getByRole('button', { name: 'Track Order' }).click();

  await expect(page.locator('.order-status-card')).toBeVisible();
  await expect(page.locator('.order-status-card')).toContainText('ORD-987654');
  await expect(page.locator('.tracking-timeline')).toBeVisible();
});

test('Verify Order Status Timeline Display', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/orders/ORD-987654');

  const timelineSteps = page.locator('.timeline-step');
  await expect(timelineSteps).toHaveCount(4);

  await expect(page.locator('.timeline-step.completed').first()).toContainText('Order Placed');
  await expect(page.locator('.timeline-step.active')).toContainText('In Transit');
});

test('Cancel Order Prior to Shipment', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/orders/ORD-987654');

  await page.getByRole('button', { name: 'Cancel Order' }).click();

  await page.locator('select[name="cancelReason"]').selectOption({ label: 'Found cheaper elsewhere' });
  await page.getByRole('button', { name: 'Confirm Cancellation' }).click();

  await expect(page.locator('.cancellation-success')).toBeVisible();
  await expect(page.locator('.order-status-badge')).toHaveText('Cancelled');
});

test('Submit Return Request for Delivered Order', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/orders/ORD-123456');

  await page.getByRole('button', { name: 'Request Return' }).click();

  await page.locator('input[name="returnItemCheckbox"]').first().check();
  await page.locator('select[name="returnReason"]').selectOption({ label: 'Item defective or damaged' });
  await page.locator('textarea[name="returnNotes"]').fill('Zipper is broken upon arrival.');

  await page.getByRole('button', { name: 'Submit Return Request' }).click();

  await expect(page.locator('.return-confirmation')).toBeVisible();
  await expect(page.locator('.return-confirmation')).toContainText('Return label generated');
});
