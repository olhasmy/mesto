const { test, expect } = require('@playwright/test');

test('Главная страница доступна', async ({ page }) => {
    const res = await page.goto('http://localhost:8080');
    expect(res.status()).toBe(200);
});
