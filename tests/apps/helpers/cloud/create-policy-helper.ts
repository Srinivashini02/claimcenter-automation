import * as cc from '@apps/claim-center/cloud/index';
import test from '@playwright/test';
import { Claim } from '@tests/testdata/types/cc-types';

export async function createPolicy(claimsData: { claim: Claim }) {
  await test.step(`Search or Create Policy`, async () => {
    await cc.topmenu.createpolicy(
      claimsData.claim.policyNumber ?? '',
      claimsData.claim.policyType ?? '',
      claimsData.claim.lossInfo?.lossDate ?? '',
      claimsData.claim.lossInfo?.effDate ?? '',
      claimsData.claim.lossInfo?.expDate ?? '',
      claimsData.claim.firstName ?? '',
      claimsData.claim.lastName ?? '',
      claimsData.claim.address1 ?? '',
      claimsData.claim.city ?? '',
      claimsData.claim.state ?? '',
      claimsData.claim.zipcode ?? '',
      claimsData.claim.addressType ?? '',
    );
  });
}
