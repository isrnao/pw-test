import { test, expect } from '@playwright/test';

test('Yahoo検索の基本機能テスト', async ({ page }) => {
  // Yahoo!にアクセス
  await page.goto('https://www.yahoo.co.jp/', {
    waitUntil: 'networkidle'
  });

  // 検索ボックスが表示されることを確認
  const searchBox = page.getByRole('searchbox', {
    name: '検索したいキーワードを入力してください'
  });
  await expect(searchBox).toBeVisible();

  // 検索を実行
  await searchBox.fill('playwright');
  await searchBox.press('Enter');

  // 検索結果ページが表示されることを確認
  await expect(page).toHaveURL(/search\.yahoo\.co\.jp\/search/);

  // 検索結果が表示されることを確認
  await expect(page.locator('h3:has-text("playwright")')).toBeVisible({
    timeout: 10000
  });
});
