const { test, expect } = require('@playwright/test');

test('create & delete article (UI)', async ({ page }) => {
    await page.goto('/');
    // Use sign in if user exists - we will create a new user using signup to be safe
    const rand = Math.floor(Math.random() * 100000);
    const username = `qa_user${rand}`;
    const email = `qa_user${rand}@example.com`;
    const password = 'Passw0rd!';

    // signup
    await page.click('text=Sign up');
    await page.fill('input[placeholder="Username"]', username);
    await page.fill('input[placeholder="Email"]', email);
    await page.fill('input[placeholder="Password"]', password);
    await page.click('button[type="submit"]');
    await expect(page.locator('nav')).toContainText(username);

    // new article
    await page.click('text=New Article');
    await page.fill('input[placeholder="Article Title"]', 'QA Playwright Article');
    await page.fill('input[placeholder="What\'s this article about?"]', 'testing');
    await page.fill('textarea[placeholder="Write your article (in markdown)"]', 'content body');
    await page.click('button[type="button"]:has-text("Publish Article")');

    // assert article created
    await expect(page.locator('h1')).toHaveText('QA Playwright Article');

    // delete article (click delete icon/text)
    await page.click('text=Delete Article');
    // after delete, redirect to home
    await expect(page).toHaveURL(/\/$/);
});
