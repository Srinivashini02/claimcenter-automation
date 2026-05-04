import * as cc from '@apps/claim-center/on-prem/index';
import test from '@playwright/test';
import { Claim } from '@tests/testdata/types/cc-types';

export async function addclaimInfo(claimsData: { claim: Claim }) {
  await test.step(`Add Claim Information`, async () => {
    await cc.addClaimInformation.addclaimInfo(claimsData);
  });
}
