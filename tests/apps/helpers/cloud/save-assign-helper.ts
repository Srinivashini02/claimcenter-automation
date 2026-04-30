import * as cc from '@apps/claim-center/on-prem/index';
import test, { Page } from '@playwright/test';

export async function saveAssign(page: Page, claimantNam: string) {
  await test.step(`Save and Assign Claim`, async () => {
    await cc.saveAndAssignClaim.clickNewExposure(page, claimantNam);
    await cc.saveAndAssignClaim.saveAssign();
  });
}
