import { test, expect } from '@playwright/test';

test('verify animation and style', async ({ page }) => {
  await page.goto('file://' + process.cwd() + '/index.html');
  await page.setViewportSize({ width: 1280, height: 720 });

  // Wait for animation to start
  await page.waitForTimeout(2000);

  await page.screenshot({ path: '/home/jules/verification/new_home.png', fullPage: false });

  // Check if canvas exists
  const canvas = await page.$('#neural-network');
  expect(canvas).not.toBeNull();

  // Go to an article and check styles
  await page.goto('file://' + process.cwd() + '/articulos/neuroplasticidad.html');
  await page.screenshot({ path: '/home/jules/verification/new_article.png', fullPage: true });
});
