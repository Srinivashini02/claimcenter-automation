import * as ccPrem from '@apps/claim-center/on-prem/index';
import test from '@playwright/test';

export async function saveAssign() {
    await test.step(`Save and Assign Claim`, async () => {
        await ccPrem.topmenu.saveAssign();
    });
}