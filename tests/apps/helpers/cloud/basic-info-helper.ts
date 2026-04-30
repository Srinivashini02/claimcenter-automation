import * as cc from '@apps/claim-center/on-prem/index';
import test from '@playwright/test';
import { Claim } from '@tests/testdata/types/cc-types';

export async function basicInfo(claimsData: { claim: Claim }) {
  await test.step(`Basic Information`, async () => {
    await cc.basicInformation.basicInfo(
      `${claimsData.claim.policyData.firstName ?? ' '} ${claimsData.claim.policyData.lastName ?? ''}`,
    );
  });
}
