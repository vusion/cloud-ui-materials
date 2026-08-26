import { expect, test } from '@playwright/test';

const stories = [
  { id: 'cw-qrcode-scan-view-examples--default', name: 'default' },
  { id: 'cw-qrcode-scan-view-examples--designer', name: 'designer' },
];

for (const story of stories) {
  test(`renders ${story.name} story without component errors`, async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('pageerror', (error) => consoleErrors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error' && !message.text().includes('404') && !message.text().includes('net::ERR_')) {
        consoleErrors.push(message.text());
      }
    });

    await page.goto(`/iframe.html?id=${story.id}&viewMode=story`);
    await expect(page.locator('[data-testid="cw-qrcode-scan-view"]')).toBeVisible({ timeout: 15000 });
    await expect(consoleErrors).toHaveLength(0);
  });
}

