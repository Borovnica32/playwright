import { test, expect } from '@playwright/test';

test.use({ storageState: 'auth.json' });

//Check for correct page title
test('Modertor upload file', async ({ page }) => {
    await page.goto('http://saturnmerkur.ddns.net/zverina/internacionala');
    await expect(page).toHaveTitle(/Glavana staran/);

    await page.locator('a[href="/zverina/mod_main"]').click();
    await expect(page).toHaveTitle(/Moderator/);

    await page.locator('a[href="/zverina/mod_main/dodajTorrent"]').click();
    
    await page.fill('#naslov', 'playwright file upload 2');

    await page.locator('#kategorija').selectOption('605');

    await page.locator('#file').setInputFiles('upload.7z')

    await expect(page).toHaveTitle('Moderator');

    await page.getByText('Add torrent').click();

});

test('Modertor change file title', async ({ page }) => {
    await page.goto('http://saturnmerkur.ddns.net/zverina/internacionala');
    await expect(page).toHaveTitle(/Glavana staran/);

    await page.locator('a[href="/zverina/mod_main"]').click();
    await expect(page).toHaveTitle(/Moderator/);

    await page.locator('a[href="mod_main/seznamTorrentov/2"]').click();
    await page.locator('a[href="/zverina/mod_main/urediTorrent/128"]').click();
    
    await expect(page).toHaveTitle(/Moderator/);

    await page.fill('#naslov', 'GitHub Cheat Sheatt');

    await page.getByText('Uredi').click();

    await expect(page).toHaveURL('http://saturnmerkur.ddns.net/zverina/mod_main/seznamTorrentov/2');

});