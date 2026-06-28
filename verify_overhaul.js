const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const filePath = `file://${process.cwd()}/difusion-social.html`;

  await page.goto(filePath);
  await page.setViewportSize({ width: 1600, height: 900 });

  // 1. Initial State
  await page.screenshot({ path: 'verification/new_initial.png' });

  // 2. Start Simulation
  await page.click('#btn-play');
  await page.waitForTimeout(5000); // Wait for some spread
  await page.screenshot({ path: 'verification/new_active.png' });

  // 3. Hover over node
  await page.mouse.move(800, 450); // Move to middle
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'verification/new_tooltip.png' });

  // 4. Open Didactic Modal
  await page.click('#btn-didactic');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'verification/new_modal.png' });

  await browser.close();
})();
