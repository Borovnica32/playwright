import { test, expect } from '@playwright/test';

test('GET sets from API', async ({ request }) => {
  const dataFrom = 'Samsonite';

  const start = Date.now();

  const response = await request.get(
    'https://37tc173it4.execute-api.eu-north-1.amazonaws.com/data?name=' + dataFrom
  );

  const duration = Date.now() - start;

  const body = await response.json();

  if (body.error) {
    console.log('API ERROR:', body.error);
    console.log('Available tables:', body.available_tables);

    throw new Error('API returned error: ' + body.error);
  }

  // Assertions
  await test.step('Validate table name', async() => {
    var tableName: string = body.table;
    
    try{
      expect.soft(tableName).toBe(dataFrom);
      console.log(`[OK] Table name is valid (${tableName})`);
    } catch(e) {
      console.log(`[FAILED] Table name is valid (${tableName})`);
      throw e;
    }
  });

  await test.step('Validate if DATA is a array', async() => {
    try{
      expect.soft(Array.isArray(body.data)).toBeTruthy();
      console.log('[OK] Field DATA is a array');
    } catch(e) {
      console.log('[FAILED] Field DATA is a array');
      throw e;
    }
  });

  await test.step('Validate that DATA is not empty', async() => {
    var dataLength: number = body.data.length;
    
    try{
      expect.soft(dataLength).toBeGreaterThan(0);
      console.log(`[OK] Array DATA has more than 0 entries (${dataLength})`);
    } catch(e) {
      console.log(`[FAILED] Array DATA has more than 0 entries (${dataLength})`);
      throw e;
    }
  });

  await test.step('Validate Status code', async() => {
    var statCode: number = 0;
    try{
      statCode = response.status();
      expect.soft(statCode).toBe(200);
      console.log(`[OK] Returned status code is OK (${statCode})`);
    } catch(e) {
      console.log(`[FAILED] Returned status code is OK (${statCode})`);
      throw e;
    }
  });

  await test.step('Validate response time', async() => {
    try{
      expect.soft(duration).toBeLessThan(3000);
      console.log(`[OK] Respinse time is less than 3 seconds (${duration*0.001}s)`);
    } catch(e) {
      console.log(`[FAILED] Respinse time is less than 3 seconds (${duration*0.001}s)`);
      throw e;
    }
  });
});