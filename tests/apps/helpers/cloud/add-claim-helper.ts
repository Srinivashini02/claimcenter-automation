import * as cc from '@apps/claim-center/on-prem/index';
import test from '@playwright/test';
import { steps } from '@playwright-utils/steps';
import { getPage } from '@playwright-utils';
import { Claim } from '@tests/testdata/types/cc-types';
import { pageComponents } from 'test-setup/locator-templates';

export async function addclaimInfo(claimsData: { claim: Claim }) {
  await test.step(`Add Claim Information`, async () => {
    await cc.addClaimInformation.addclaimInfo(claimsData);
  });
}
