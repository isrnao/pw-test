import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // 共通設定
  testDir: './tests',
  timeout: 30 * 1000, // 各テストの最大時間
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI
    ? [['list'], ['html', { outputFolder: 'playwright-report' }]]
    : [['html', { open: 'never' }]],

  use: {
    headless: true, // CIではtrue、開発中に変えるならenvで切り替えも可
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    actionTimeout: 0, // 個別アクションに制限をかけない
    navigationTimeout: 30 * 1000,
    baseURL: 'http://localhost:3000', // 任意で設定（開発用など）
  },

  // 任意：複数環境で動かすならここでデバイスを定義（例：ChromeとMobile Safari）
  projects: [
    {
      name: 'Desktop Chrome',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },
  ],
});
