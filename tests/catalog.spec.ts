import { test, expect } from '@playwright/test'

const SEARCH_TERM = 'Hammer'
const FILTER_CATEGORY = 'Wrench'
const OUT_OF_CATEGORY = "Pliers"

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
    });

    test('filtered results belong to the selected category', async ({ page }) => {
        const results = page.getByRole('link').filter({ has: page.getByRole('heading') });
        const filterCheckbox = page.getByRole('checkbox', { name: FILTER_CATEGORY });

        await filterCheckbox.check();
        await expect(filterCheckbox).toBeChecked();

        await expect(results.filter({ hasText: OUT_OF_CATEGORY })).toHaveCount(0);
        expect(await results.filter({ hasText: FILTER_CATEGORY }).count()).toBeGreaterThan(0);
    });
})