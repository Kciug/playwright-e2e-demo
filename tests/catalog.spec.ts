import { test, expect } from '@playwright/test'

const SEARCH_TERM = 'Hammer'

test.describe('Catalog', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('search by name returns matching products', async ({ page }) => {
        const searchName = 'Search'
        const resultNames = page.getByRole('link').getByRole('heading');
        const notMatching = resultNames.filter({ hasNotText: SEARCH_TERM})

        await page.getByRole('textbox', { name: 'Search' }).fill(SEARCH_TERM);
        await page.getByRole('button', { name: searchName }).click();

        await expect(notMatching).toHaveCount(0)
        await expect(resultNames).not.toHaveCount(0)
    })
})