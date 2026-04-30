import { xcenters } from '@apps/xcenter-pages';
import { test } from '@pagesetup';
import { assertSteps, steps } from '@playwright-utils/steps';
import { roles } from 'tests/config/users';
import { clickNext } from '@tests/apps/shared/on-prem/navigation';
import { getClaimsData } from '@tests/testdata/claimCenter/ccData';
import { Claim } from '@tests/testdata/types/cc-types';

test.describe.configure({ mode: 'parallel' });

const cc = xcenters.ccCloud;

test.describe('Claims Center Suite', () => {
  test('Claims Center Login', { tag: '@smoke' }, async ({ page }) => {
    const claimsData = { claim: await getClaimsData('TC3') };
    console.log('Claims Data from excel sheet', claimsData);
    console.log('Full Claims Data:', JSON.stringify(claimsData, null, 2));

    //Login to application
    await cc.loginToCCApp(roles.superuser);

    // Do a claim search
    await cc.searchHelper.searchClaim(claimsData.claim.policyData.policyNumber || 'POL123');

    //Click on new claim
    await cc.newClaimHelper.newClaim();

    //Search or Create Policy
    await cc.createpolicyHelper.createPolicy(claimsData);
    await cc.basicInfoHelper.basicInfo(claimsData);
    // Add Claim Information
    await steps.wait(1000);
    await cc.addClaimHelper.addclaimInfo(claimsData);
    await cc.serviceHelper.service();
    //Save and Assign Claim
    await cc.saveAssignHelper.saveAssign(page, 'Jacob Murphy');
    //New Claim Saved
    await cc.savedHelper.newClaimsaved();
  });
});
