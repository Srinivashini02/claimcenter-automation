import * as cc from '@apps/claim-center/cloud/index';
import test from '@playwright/test';
import { steps } from '@playwright-utils/steps';
import { getPage } from '@playwright-utils';
import { Claim } from '@tests/testdata/types/cc-types';
import { pageComponents } from 'test-setup/locator-templates';

const whatHappened = pageComponents.onprem.textarea('What Happened?', 'what happened');

export async function addclaimInfo(claimsData: { claim: Claim }) {
  await test.step(`Add Claim Information`, async () => {
    await steps.typeText(whatHappened, claimsData.claim.lossInfo?.whatHappened ?? '');

    await cc.topmenu.addClaim(
      claimsData.claim.lossInfo?.lossCause ?? '',
      `${claimsData.claim.address1 ?? ' '}, ${claimsData.claim.city ?? ' '}, ${claimsData.claim.state ?? ' '} ${claimsData.claim.zipcode ?? ' '}`,
    );
  });
}
