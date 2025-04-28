import { test, expect } from '@playwright/test';

test('Yahoo検索の基本機能テスト', async ({ page }) => {
  // Yahoo!にアクセス
  await page.goto('https://www.yahoo.co.jp/', {
    waitUntil: 'networkidle'
  });

  // 検索ボックスにキーワードを入力
  const searchBox = page.getByRole('searchbox', {
    name: '検索したいキーワードを入力してください'
  });
  await expect(searchBox).toBeVisible();
  await searchBox.fill('playwright');
  await searchBox.press('Enter');

  // 検索結果ページが表示されることを確認
  await expect(page).toHaveURL(/search\.yahoo\.co\.jp\/search/);

  // 最初のPlaywright関連の検索結果が表示されることを確認
  const firstResult = page
    .getByRole('link', { name: /Playwright.*/ })
    .first();

  await expect(firstResult).toBeVisible({
    timeout: 10000
  });
});
