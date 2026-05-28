import { test, expect } from '@playwright/test';

test.use({ storageState: 'auth.json' });

//Check for correct page title
test('Has title', async ({ page }) => {
  await page.goto('http://saturnmerkur.ddns.net/zverina/internacionala');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Glavana staran/);
});

test('Download file after login', async ({ page }) => {
  const fileName = 'beginners_python_cheat_sheet_pcc_all.pdf';

  await page.goto('http://saturnmerkur.ddns.net/zverina/internacionala');

  const downloadLink = page.locator(`a[href*="datoteka=${fileName}"]`).first();

  await expect(downloadLink).toBeVisible();

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    downloadLink.click(),
  ]);

  const savedPath = await download.saveAs(`downloads/${download.suggestedFilename()}`);
  const downloadedFile = download.suggestedFilename();

  console.log(`Downloaded: ${downloadedFile}`);

  expect(downloadedFile).toContain(fileName);
});

// Download file by category
test('Download file by category', async ({ page }) => {
  await page.goto('http://saturnmerkur.ddns.net/zverina/internacionala');

  await page.locator('span', { hasText: 'Categories' }).click();
  await page.getByLabel('png').click();
  await page.locator('#filterCategories').click();

  await expect(page).toHaveTitle(/Glavana staran/);

  const downloadLink = page.locator('a', { hasText: 'download' }).first();

  await expect(downloadLink).toBeVisible();

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    downloadLink.click(),
  ]);

  const filePath = await download.path(); // temp file location
  const fileName = download.suggestedFilename();

  console.log('Downloaded:', fileName);

  // save it somewhere permanent
  await download.saveAs(`downloads/${fileName}`);

  expect(fileName).toBeTruthy();
});

test('Download file from search', async ({ page }) => {
  const searchFileName = 'Warhammer';
  await page.goto('http://saturnmerkur.ddns.net/zverina/internacionala');

  await page.fill('#keyword', searchFileName);
  await page.locator('#gumb').click();

  const link = page.locator('a#prenesi').first();

  await expect(link).toBeVisible();

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    link.click(),
  ]);

  const fileName = download.suggestedFilename();

  console.log(`Downloaded: ${fileName}`);

  await download.saveAs(`downloads/${fileName}`);

  expect(fileName).toContain(searchFileName);

});



