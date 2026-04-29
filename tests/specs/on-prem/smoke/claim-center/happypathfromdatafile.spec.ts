import { xcenters } from '@apps/xcenter-pages';
import { test } from '@pagesetup';
import { assertSteps, steps } from '@playwright-utils/steps';
import { roles } from 'tests/config/users';
import { clickNext } from '@tests/apps/shared/on-prem/navigation';
import { getClaimsData } from '@tests/testdata/claimCenter/ccData';
import { ClaimCenterData } from '@tests/testdata/types/cc-types';

test.describe.configure({ mode: 'parallel' });

const cc = xcenters.ccCloud;

test.describe('Claims Center Suite', () => {
  test('Claims Center Login', { tag: '@smoke' }, async () => {
    const claimsData: ClaimCenterData = await getClaimsData('TC2');
    console.log('Claims Data from excel sheet', claimsData);

    //Login to application
    await cc.loginToCCApp(roles.superuser);

    // Do a claim search
    await cc.searchHelper.searchClaim(claimsData.claim.policyNumber || 'POL123');

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
    await cc.saveAssignHelper.saveAssign();
    //New Claim Saved
    await cc.savedHelper.newClaimsaved();
    //Click on Actions
    await cc.actionHelper.clickActionsMenu();
  });
});
