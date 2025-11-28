const { test, expect } = require('@playwright/test');

test('register -> login -> logout flow (UI)', async ({ page }) => {
    // go to demo site
    await page.goto('/');

    // click signup
    await page.locator('text=Sign up').click();

    const rand = Math.floor(Math.random() * 100000);
    const username = `qa_user${rand}`;
    const email = `qa_user${rand}@example.com`;
    const password = 'Passw0rd!';

    await page.fill('input[placeholder="Username"]', username);
    await page.fill('input[placeholder="Email"]', email);
    await page.fill('input[placeholder="Password"]', password);
    await page.click('button[type="submit"]');

    // after signup should redirect to homepage and show username in nav
    await expect(page.locator('nav')).toContainText(username);

    // logout
    await page.locator('text=Log out').click();
    await expect(page.locator('text=Sign in')).toBeVisible();
});
