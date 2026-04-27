import * as ccPrem from '@apps/claim-center/on-prem/index';
import test, { expect } from '@playwright/test';
import { getPage } from '@playwright-utils';

export async function newClaimsaved() {
    await test.step(`New Claim Saved`, async () => {
        const page = getPage();
        await page.getByRole('link', { name: /View .* claim/ }).click();
    });
}
