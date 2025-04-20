import { test, expect } from '@playwright/test';

test('YahooからGoogleへの遷移テスト', async ({ page }) => {
  // Yahoo!にアクセス
  await page.goto('https://www.yahoo.co.jp/');

  await page.getByRole('searchbox', { name: '検索したいキーワードを入力してください' }).fill('google');
  await page.getByRole('searchbox', { name: '検索したいキーワードを入力してください' }).press('Enter');
  await page.getByRole('link', { name: /Google.*google\./ }).first().click();
});
