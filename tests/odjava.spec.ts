import { test, expect } from '@playwright/test';

test.use({ storageState: 'auth.json' });

test('Odjava', async ({ page }) => {
    await page.goto('http://saturnmerkur.ddns.net/zverina/internacionala');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Glavana staran/);

    await page.locator('a[href="/zverina/profil"]').click();

    await page.getByText('Log out').click();

    await expect(page).toHaveTitle(/Glavana staran/);
});