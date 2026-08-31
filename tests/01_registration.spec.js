const { test, expect } = require('@playwright/test');

test.use({ viewport: { width: 1500, height: 1000 } });

test('Register as Regular User', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/register');

  console.log(await page.viewportSize().width);
  console.log(await page.viewportSize().height);

  await page.locator('input[value="user"]').check();
  await expect(page.locator('input[value="user"]')).toBeChecked();

  await page.locator('input[name="fullName"]').fill('John Doe');
  await page.locator('input[name="email"]').fill('john.doe@example.com');
  await page.locator('input[name="password"]').fill('UserPassword123!');
  await page.locator('input[name="confirmPassword"]').fill('UserPassword123!');

  await page.getByRole('button', { name: 'Register' }).click();

  await expect(page).toHaveURL(/registration-success/);
  await expect(page.getByText('Account created successfully')).toBeVisible();
});

test('Register as Admin with Admin Code', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/register');

  await page.locator('input[value="admin"]').check();
  await expect(page.locator('input[value="admin"]')).toBeChecked();

  await expect(page.locator('input[name="adminSecretKey"]')).toBeVisible();

  await page.locator('input[name="fullName"]').fill('Admin Manager');
  await page.locator('input[name="email"]').fill('admin.manager@example.com');
  await page.locator('input[name="adminSecretKey"]').fill('ADMIN_SECRET_2026');
  await page.locator('input[name="password"]').fill('AdminSecurePassword123!');
  await page.locator('input[name="confirmPassword"]').fill('AdminSecurePassword123!');

  await page.getByRole('button', { name: 'Register as Admin' }).click();

  await expect(page).toHaveURL(/admin-dashboard|registration-success/);
  await expect(page.getByText('Admin registered successfully')).toBeVisible();
});

test('Register with Existing Email Validation', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/register');

  await page.locator('input[value="user"]').check();
  await page.locator('input[name="fullName"]').fill('Jane Doe');
  await page.locator('input[name="email"]').fill('existing.user@example.com');
  await page.locator('input[name="password"]').fill('Password123!');
  await page.locator('input[name="confirmPassword"]').fill('Password123!');

  await page.getByRole('button', { name: 'Register' }).click();

  const errorMessage = page.locator('.error-message');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toContainText('Email is already registered');
});

test('Register Password Mismatch Validation', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/register');

  await page.locator('input[name="fullName"]').fill('John Doe');
  await page.locator('input[name="email"]').fill('john.new@example.com');
  await page.locator('input[name="password"]').fill('Password123!');
  await page.locator('input[name="confirmPassword"]').fill('DifferentPassword123!');

  await page.getByRole('button', { name: 'Register' }).click();

  const errorMessage = page.locator('.error-message');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toContainText('Passwords do not match');
});

test('Register with Empty Fields Validation', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/register');

  await page.getByRole('button', { name: 'Register' }).click();

  const errorMessage = page.locator('.error-message');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toContainText('All fields are required');
});
