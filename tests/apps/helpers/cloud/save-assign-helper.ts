import * as cc from '@apps/claim-center/on-prem/index';
import test from '@playwright/test';

export async function saveAssign() {
  await test.step(`Save and Assign Claim`, async () => {
    await cc.saveAndAssignClaim.saveAssign();
  });
}
