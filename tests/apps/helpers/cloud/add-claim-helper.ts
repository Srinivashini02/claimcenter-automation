import * as cc from '@apps/claim-center/cloud/index';
import test, { expect } from '@playwright/test';
import { steps } from '@playwright-utils/steps';
import { getPage, waitForPageLoadState } from '@playwright-utils';
import { Page } from '@playwright/test';


export async function addclaimInfo(happenedval: string, lossVal: string, fulladdress: string) {
    await test.step(`Add Claim Information`, async () => {
        const page = getPage();
        const happenedBox = page.getByLabel('What Happened?');
        await happenedBox.waitFor({ state: 'visible' });
        await happenedBox.fill(happenedval);
        await cc.topmenu.addClaim(lossVal, fulladdress);
    });
}
