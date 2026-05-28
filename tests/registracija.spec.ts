import { test, expect } from '@playwright/test';

test('Register a user', async ({ page }) => {
  await page.goto('http://saturnmerkur.ddns.net/zverina/registracija');

  await page.fill('#exampleInputEmail', 'playwright@gmail.com');
  await page.fill('#exampleInputUser', 'playwright1');
  await page.fill('#passwd', 'playwright28#');
  await page.fill('#passwd2', 'playwright28#');

  await page.getByText('Register').click();

  await expect(page).toHaveTitle('Login');
});