const { test, expect } = require('@playwright/test');
const fs = require('fs');

const DEMOQA_USERNAME = process.env.DEMOQA_USERNAME;
const DEMOQA_PASSWORD = process.env.DEMOQA_PASSWORD;

test.describe('Playwright Automation Assignment', () => {

  test('UI Assignment - DemoQA Book Store', async ({ page }) => {
    await page.goto('https://demoqa.com/');

    await page.locator('h5:has-text("Book Store Application")').click({ force: true });

    await page.locator('#login').click();

    await page.fill('#userName', DEMOQA_USERNAME);
    await page.fill('#password', DEMOQA_PASSWORD);
    await page.click('#login');

    const userNameLabel = page.locator('#userName-value');
    await expect(userNameLabel).toBeVisible();
    await expect(userNameLabel).toHaveText(DEMOQA_USERNAME);

    const logoutBtn = page.locator('#submit').filter({ hasText: /Log ?out/i }).first();
    await expect(logoutBtn).toBeVisible();

    await page.locator('#gotoStore').click();

    const searchInput = page.locator('#searchBox');
    const bookTitle = 'Learning JavaScript Design Patterns';
    await searchInput.fill(bookTitle);

    const bookLink = page.locator(`a:has-text("${bookTitle}")`);
    await expect(bookLink).toBeVisible();

    const bookRow = page.locator('tr').filter({ hasText: bookTitle }).first();

    const title = await bookRow.locator('td').nth(1).innerText();
    const author = await bookRow.locator('td').nth(2).innerText();
    const publisher = await bookRow.locator('td').nth(3).innerText();

    const output = `Title: ${title}\nAuthor: ${author}\nPublisher: ${publisher}\n`;

    const safeFilename = title.replace(/[<>:"/\\|?*]+/g, '_');
    fs.writeFileSync(`${safeFilename}.txt`, output);
    console.log(`Book details written to ${safeFilename}.txt:`);
    console.log(output);

    await page.locator('#submit').filter({ hasText: /Log ?out/i }).first().click();
    await expect(page.locator('#login')).toBeVisible();
  });
});
