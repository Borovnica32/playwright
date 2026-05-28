import { test, expect } from '@playwright/test';

test.use({ storageState: 'auth.json' });

test('Post new thread', async ({ page }) => {
  await page.goto('http://saturnmerkur.ddns.net/zverina/forum');

  await page.getByText('Post new thread').click();

  await expect(page).toHaveTitle('New thread');

  await page.fill('#naslov', 'playwright automatic thread 2');
  await page.fill('#opis', 'A thread created from automatic testing in playwright');

  await page.getByText('Post new thread').click();
});

test('Update thread', async ({ page }) => {
  await page.goto('http://saturnmerkur.ddns.net/zverina/forum');

  await page.getByText('playwright automatic thread').click();

  //Update naslov
  await page.fill('#naslov', 'playwright automatic thread updated');
  
  //Update opis
  await page.fill('#vsebina', 'A thread created from automatic testing in playwright now also updated');

  await page.getByText('Update thread').click();
});

test('Add comment to thread', async ({ page }) => {
  await page.goto('http://saturnmerkur.ddns.net/zverina/forum');

  const title = 'playwright automatic thread'
  var comment = 'Coment from playwright 3';

  await page.getByText(title).click();

  await page.getByText('Add Comment').click();

  await page.locator('textarea[name=comment]').fill(comment);

  await page.locator('button[name=gumb]').click();

  await expect(page).toHaveTitle('Forum');
});