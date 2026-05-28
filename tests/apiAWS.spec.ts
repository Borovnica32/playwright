import { test, expect } from '@playwright/test';

test('GET Samsonite sets API', async ({ request }) => {
  const dataFrom = 'Star Wars';

  const start = Date.now();

  const response = await request.get(
    'https://37tc173it4.execute-api.eu-north-1.amazonaws.com/data?name=' + dataFrom
  );

  const duration = Date.now() - start;

  console.log("API response time:", duration, "ms");

  expect(response.ok()).toBeTruthy();

  const body = await response.json();

  expect(body.table).toBe(dataFrom);
  expect(Array.isArray(body.data)).toBeTruthy();

  expect(duration).toBeLessThan(3000);
});