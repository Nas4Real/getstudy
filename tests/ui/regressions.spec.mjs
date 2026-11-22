import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('task dialog contains focus, dismisses its picker first, and restores focus', async ({ page }) => {
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'New Task', exact: true });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Add New Task', exact: true });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('textbox', { name: 'Task title', exact: true })).toBeFocused();
  for (let i = 0; i < 20; i++) {
    await page.keyboard.press(i < 10 ? 'Tab' : 'Shift+Tab');
    expect(await dialog.evaluate(el => el.contains(document.activeElement))).toBe(true);
  }
  await dialog.getByRole('button', { name: 'Analyse', exact: true }).click();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test('navigation survives refresh and browser Back', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Calendar', exact: true }).first().click();
  await expect(page.getByRole('heading', { name: 'Calendar', exact: true })).toBeVisible();
  await expect(page).toHaveURL(/page=calendar/);
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Calendar', exact: true })).toBeVisible();
  await page.goBack();
  await expect(page.getByRole('heading', { name: 'Overview', exact: true })).toBeVisible();
});

test('Settings fields and automatic sync expose their names and state', async ({ page }) => {
  await page.goto('/?settings');
  await expect(page.getByRole('textbox', { name: 'Full Name', exact: true })).toHaveValue('Jane Doe');
  await expect(page.getByRole('textbox', { name: 'Email Address', exact: true })).toHaveValue('jane@example.com');
  const toggle = page.getByRole('switch', { name: 'Automatic sync', exact: true });
  await expect(toggle).toBeChecked();
  await toggle.click();
  await expect(toggle).not.toBeChecked();
  await expect(page.getByRole('status')).toContainText('disabled');
});

test('compact navigation closes safely when resized to desktop', async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1000 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open navigation menu' }).click();
  await expect(page.getByRole('dialog', { name: 'Navigation', exact: true })).toBeVisible();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.getByRole('button', { name: 'Calendar', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Calendar', exact: true })).toBeVisible();
});

test('closing a direct auth link removes its route and survives refresh', async ({ page }) => {
  await page.goto('/?page=signup');
  await page.getByRole('button', { name: 'Close authentication modal' }).click();
  await page.reload();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Overview', exact: true })).toBeVisible();
});

test('feedback is announced inside the active modal', async ({ page }) => {
  await page.goto('/?modal=ai-suggest');
  const dialog = page.getByRole('dialog', { name: 'Smart study suggestions' });
  await dialog.getByRole('button', { name: /Schedule/i }).first().click();
  await expect(dialog.getByRole('status')).toContainText('scheduled');
  await expect(dialog).toBeVisible();
});

for (const width of [320, 390, 768, 1024]) {
  test(`primary actions remain reachable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    for (const [route, name] of [['/?flashcards', /Study Due/], ['/?ai', 'View Past Conversations']]) {
      await page.goto(route);
      if (route.includes('ai')) {
        const close = page.getByRole('button', { name: 'Close conversation history' });
        if (await close.isVisible()) await close.click();
      }
      const action = typeof name === 'string'
        ? page.getByRole('button', { name, exact: true })
        : page.getByRole('button', { name }).first();
      await expect(action).toBeVisible();
      const box = await action.boundingBox();
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(width + 1);
      await action.click();
    }
    await page.goto('/?calendar=week');
    const session = page.getByRole('button', { name: 'New Session', exact: true });
    const sessionBox = await session.boundingBox();
    expect(sessionBox.x + sessionBox.width).toBeLessThanOrEqual(width + 1);
    if (width < 1024) {
      const navigation = page.getByRole('navigation', { name: 'Main navigation' });
      const navBox = await navigation.boundingBox();
      expect(navBox.y + navBox.height).toBeLessThanOrEqual(845);
    }
  });
}

for (const query of ['', '?calendar=week', '?tasks', '?subjects', '?docs', '?ai', '?flashcards', '?settings', '?notifications', '?modal=new-task', '?modal=new-session', '?auth=signup']) {
  test(`no automated accessibility violations: /${query}`, async ({ page }) => {
    await page.goto('/' + query);
    await page.waitForLoadState('networkidle');
    const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa', 'best-practice']).analyze();
    expect(violations.map(v => ({ id: v.id, targets: v.nodes.map(n => n.target) }))).toEqual([]);
  });
}
