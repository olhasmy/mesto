const { test, expect } = require('@playwright/test');

test('Попап добавления фото открывается', async ({ page }) => {
    await page.goto('http://localhost:8080');
    await page.click('.profile__add-button');
    const popup = page.locator('.popup_type_add-card');
    await expect(popup).toBeVisible();
});
