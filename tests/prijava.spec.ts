import { expect, test } from '@playwright/test';


// Login and save session
test('Login and save session', async ({ page }) => {
  await page.goto('http://saturnmerkur.ddns.net/zverina/prijava');

  await page.fill('#upime', 'testuser');
  await page.fill('#passwd', 'testuser');

  await page.getByText('Log in').click(/*'button[type="submit"]'*/);
  

  await page.waitForURL('**/internacionala');

  await expect(page).toHaveURL('http://saturnmerkur.ddns.net/zverina/internacionala');
  await expect(page).toHaveTitle(/Glavana staran/);

  await page.context().storageState({ path: 'auth.json' });
  
});