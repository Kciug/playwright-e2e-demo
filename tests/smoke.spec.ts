import { test, expect } from '@playwright/test'

test.describe('Product catalog', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('');
    });

    test('displays products list on the home page', async ({ page }) => {
        const products = page.getByRole('link').filter({ has: page.getByRole('heading') });
        await expect(products.first()).toBeVisible();
    })
})