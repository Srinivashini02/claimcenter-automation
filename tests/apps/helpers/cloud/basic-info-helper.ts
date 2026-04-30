import * as cc from '@apps/claim-center/cloud/index';
import test from '@playwright/test';
import { Claim } from '@tests/testdata/types/cc-types';

export async function basicInfo(claimsData: { claim: Claim }) {
  await test.step(`Basic Information`, async () => {
    await cc.topmenu.basicInfo(
      `${claimsData.claim.policyData.firstName ?? ' '} ${claimsData.claim.policyData.lastName ?? ''}`,
    );
  });
}
