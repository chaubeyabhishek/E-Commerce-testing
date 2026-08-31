const { test, expect } = require('@playwright/test');

test.use({ viewport: { width: 1500, height: 1000 } });

test('Update User Profile Information', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/account/profile');

  console.log(await page.viewportSize().width);
  console.log(await page.viewportSize().height);

  await page.locator('input[name="fullName"]').fill('Johnathan Doe');
  await page.locator('input[name="phoneNumber"]').fill('+1-555-0199');

  await page.getByRole('button', { name: 'Save Changes' }).click();

  const successAlert = page.locator('.alert-success');
  await expect(successAlert).toBeVisible();
  await expect(successAlert).toContainText('Profile updated successfully');
});

test('Change Password with Valid Old and New Password', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/account/security');

  await page.locator('input[name="currentPassword"]').fill('OldPassword123!');
  await page.locator('input[name="newPassword"]').fill('NewSecurePassword456!');
  await page.locator('input[name="confirmNewPassword"]').fill('NewSecurePassword456!');

  await page.getByRole('button', { name: 'Update Password' }).click();

  await expect(page.locator('.toast-notification')).toContainText('Password changed successfully');
});

test('Add New Shipping Address', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/account/addresses');

  await page.getByRole('button', { name: 'Add New Address' }).click();

  await page.locator('input[name="streetAddress"]').fill('742 Evergreen Terrace');
  await page.locator('input[name="city"]').fill('Springfield');
  await page.locator('input[name="state"]').fill('OR');
  await page.locator('input[name="postalCode"]').fill('97477');
  await page.locator('input[name="isDefaultAddress"]').check();

  await page.getByRole('button', { name: 'Save Address' }).click();

  const addressCards = page.locator('.address-card');
  await expect(addressCards).toHaveCount(1);
  await expect(addressCards.first()).toContainText('742 Evergreen Terrace');
});

test('View Order History and Download Invoice', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/account/orders');

  const orderRows = page.locator('.order-history-row');
  await expect(orderRows.first()).toBeVisible();

  await page.locator('button.download-invoice-btn').first().click();

  const downloadPromise = page.waitForEvent('download');
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toContain('invoice');
});
