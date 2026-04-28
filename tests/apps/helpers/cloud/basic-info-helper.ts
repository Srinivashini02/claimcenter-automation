import * as cc from '@apps/claim-center/cloud/index';
import test from '@playwright/test';

export async function basicInfo(claimsData: any) {
  await test.step(`Basic Information`, async () => {
    await cc.topmenu.basicInfo(claimsData.claim.firstName + ' ' + claimsData.claim.lastName);
  });
}
