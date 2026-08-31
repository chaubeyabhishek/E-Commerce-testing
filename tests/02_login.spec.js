const { test, expect } = require('@playwright/test');

test.use({ viewport: { width: 1500, height: 1000 } });

test('Sign In as Regular User', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/login');

  console.log(await page.viewportSize().width);
  console.log(await page.viewportSize().height);

  await page.locator('input[value="user"]').check();
  await page.locator('input[name="username"]').fill('standard_user');
  await page.locator('input[name="password"]').fill('secret_password');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/dashboard|products/);
  await expect(page.getByText('Welcome, standard_user')).toBeVisible();
});

test('Sign In as Admin User', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/login');

  await page.locator('input[value="admin"]').check();
  await page.locator('input[name="username"]').fill('admin_user');
  await page.locator('input[name="password"]').fill('admin_secret_pass');

  await page.getByRole('button', { name: 'Login as Admin' }).click();

  await expect(page).toHaveURL(/admin-dashboard/);
  await expect(page.getByRole('heading', { name: 'Admin Dashboard' })).toBeVisible();
});

test('Invalid Sign In Credentials', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/login');

  await page.locator('input[name="username"]').fill('invalid_user');
  await page.locator('input[name="password"]').fill('wrong_password');

  await page.getByRole('button', { name: 'Login' }).click();

  const errorMessage = page.locator('.error-message');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toContainText('Invalid credentials');
});

test('Locked Out User Sign In', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/login');

  await page.locator('input[name="username"]').fill('locked_out_user');
  await page.locator('input[name="password"]').fill('secret_password');

  await page.getByRole('button', { name: 'Login' }).click();

  const errorMessage = page.locator('.error-message');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toContainText('Sorry, this user has been locked out');
});

test('Password Visibility Toggle', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/login');

  const passwordField = page.locator('input[name="password"]');
  await passwordField.fill('secret_password');

  await expect(passwordField).toHaveAttribute('type', 'password');

  await page.locator('.password-toggle-icon').click();
  await expect(passwordField).toHaveAttribute('type', 'text');
});

test('Sign Out and Session Termination', async function ({ page }) {
  await page.goto('https://dummy-ecommerce-store.com/login');

  await page.locator('input[name="username"]').fill('standard_user');
  await page.locator('input[name="password"]').fill('secret_password');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByAltText('profile picture').click();
  await page.getByText('Logout').click();

  await expect(page).toHaveURL(/login/);
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});
