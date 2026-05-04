import * as cc from '@apps/claim-center/on-prem/index';
import test from '@playwright/test';
import { Claim } from '@tests/testdata/types/cc-types';

export async function createPolicy(claimsData: { claim: Claim }) {
  await test.step(`Search or Create Policy`, async () => {
    await cc.createPolicy.createpolicy(
      claimsData.claim.policyData.policyNumber ?? '',
      claimsData.claim.policyData.policyType ?? '',
      claimsData.claim.policyData.date ?? '',
      claimsData.claim.policyData.effDate ?? '',
      claimsData.claim.policyData.expDate ?? '',
      claimsData.claim.policyData.firstName ?? '',
      claimsData.claim.policyData.lastName ?? '',
      claimsData.claim.policyData.address1 ?? '',
      claimsData.claim.policyData.city ?? '',
      claimsData.claim.policyData.state ?? '',
      claimsData.claim.policyData.zipcode ?? '',
      claimsData.claim.policyData.addressType ?? '',
    );
  });
}
