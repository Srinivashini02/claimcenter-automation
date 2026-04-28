import * as cc from '@apps/claim-center/cloud/index';
import test from '@playwright/test';
import { getPage } from '@playwright-utils';
import { Claim } from '@tests/testdata/types/cc-types';

export async function addclaimInfo(claimsData: { claim: Claim }) {
  await test.step(`Add Claim Information`, async () => {
    const page = getPage();
    const happenedBox = page.getByLabel('What Happened?');
    await happenedBox.waitFor({ state: 'visible' });
    await happenedBox.fill(claimsData.claim.lossInfo?.lossDate ?? '');
    await cc.topmenu.addClaim(
      claimsData.claim.description ?? '',
      `${claimsData.claim.address1 ?? ''}, ${claimsData.claim.city ?? ''}, ${claimsData.claim.state ?? ''} ${claimsData.claim.zipcode ?? ''}`,
    );
  });
}
