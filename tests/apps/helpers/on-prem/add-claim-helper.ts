import * as ccPrem from '@apps/claim-center/on-prem/index';
import test, { expect } from '@playwright/test';
import { steps } from '@playwright-utils/steps';
import { getPage, waitForPageLoadState } from '@playwright-utils';
import { Page } from '@playwright/test';


export async function addclaimInfo(happenedval: string, lossVal: string, fulladdress: string) {
    await test.step(`Add Claim Information`, async () => {
        const page = getPage();
        const happenedBox = page.locator('div.gw-InputWidget', { hasText: 'What Happened?' }).locator('textarea');
        await happenedBox.waitFor({ state: 'visible' });
        await happenedBox.fill(happenedval);
        await ccPrem.topmenu.addClaim(lossVal, fulladdress);
    });
}
