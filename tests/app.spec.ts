import { test, expect } from '@playwright/test';

test.describe('UIGen App', () => {
  test('should load the homepage', async ({ page }) => {
    await page.goto('/');
    
    // Check if the app title is visible
    await expect(page.getByText('UIGen')).toBeVisible();
    
    // Check if the main chat interface is present
    await expect(page.getByText('Start a conversation to generate React components')).toBeVisible();
  });

  test('should have theme toggle functionality', async ({ page }) => {
    await page.goto('/');
    
    // Find and click the theme toggle button
    const themeToggle = page.getByRole('button', { name: /switch to (light|dark) mode/i });
    await expect(themeToggle).toBeVisible();
    
    // Click the theme toggle
    await themeToggle.click();
    
    // Verify theme changed by checking for dark mode class
    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);
  });

  test('should show chat input', async ({ page }) => {
    await page.goto('/');
    
    // Check if chat input is visible
    await expect(page.getByPlaceholder(/describe the component/i)).toBeVisible();
  });
});