import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/ui',
  fullyParallel: true,
  workers: 2,
  reporter: 'list',
  use: {
    baseURL: process.env.UI_BASE_URL || 'http://localhost:5174',
    viewport: { width: 1440, height: 1000 },
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,
    },
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
});
