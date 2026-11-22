import { test, expect } from '@playwright/test';

test('production dashboard defers math resources until a math view opens', async ({ page }) => {
  const requests = [];
  page.on('request', request => requests.push(request.url()));
  await page.goto(process.env.UI_PRODUCTION_BASE_URL || 'http://localhost:4173/');
  await page.waitForLoadState('networkidle');
  expect(requests.filter(url => /katex|LatexMath/i.test(url))).toEqual([]);
  await page.getByRole('button', { name: /Flashcards/ }).first().click();
  await page.getByRole('button', { name: /Start Daily Review/ }).click();
  await page.getByRole('button', { name: 'Show Answer (Space)', exact: true }).click();
  const formula = page.locator('.katex').first();
  await expect(formula).toBeVisible();
  await expect(formula).toHaveCSS('font-family', /KaTeX_Main/);
  expect(requests.some(url => /katex.*\.js/i.test(url))).toBe(true);
});
