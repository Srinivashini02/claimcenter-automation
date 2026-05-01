import { xcenters } from '@apps/xcenter-pages';
import { test } from '@pagesetup';
import { roles } from 'tests/config/users';
import { getClaimsData } from '@tests/testdata/claimCenter/ccData';

import { clickCompleteButton, openWorkplan, selectAllActivities } from '@tests/apps/pages/on-prem/workplan';

import {
  clickExposureMenu,
  closeexp,
  enterCloseExposureNotes,
  selectExposureOutcome,
} from '@tests/apps/pages/on-prem/exposure';

import { checkExposureCheckbox } from '@tests/apps/pages/on-prem/saveAndAssignClaim';

import { clickCloseClaim, openActionsMenu } from '@tests/apps/shared/on-prem/top-menu';

import { closeClaimOutcome, closecla, enterCloseClaimNotes } from '@tests/apps/pages/on-prem/close-claim';

test.describe.configure({ mode: 'parallel' });

const cc = xcenters.ccCloud;

test.describe('Claims Center - Feature Based Suite', () => {
  test('Complete Claims Lifecycle Flow', { tag: ['@smoke', '@claims-e2e'] }, async ({ page }) => {
    const claimsData = { claim: await getClaimsData('TC3') };

    console.log('Claims Data:', JSON.stringify(claimsData, null, 2));

    // =========================
    // FEATURE 1: LOGIN & SEARCH
    // =========================
    await test.step('Login to Claims Center', async () => {
      await cc.loginToCCApp(roles.superuser);
    });

    await test.step('Search Claim / Policy', async () => {
      await cc.searchHelper.searchClaim(claimsData.claim.policyData.policyNumber || 'POL123');
    });

    // =========================
    // FEATURE 2: CLAIM CREATION
    // =========================
    await test.step('Create New Claim', async () => {
      await cc.newClaimHelper.newClaim();
    });

    await test.step('Create Policy & Basic Info', async () => {
      await cc.createpolicyHelper.createPolicy(claimsData);
      await cc.basicInfoHelper.basicInfo(claimsData);
    });

    await test.step('Add Claim Information', async () => {
      await cc.addClaimHelper.addclaimInfo(claimsData);
    });

    await test.step('Service Setup', async () => {
      await cc.serviceHelper.service();
    });

    // =========================
    // FEATURE 3: SAVE & ASSIGN
    // =========================
    await test.step('Save and Assign Claim', async () => {
      await cc.saveAssignHelper.saveAssign(page, 'test', 'Claim Cost', 'Unspecified Cost Category', '250');
    });

    // =========================
    // FEATURE 4: WORKPLAN
    // =========================
    await test.step('Workplan Execution', async () => {
      await openWorkplan(page);
      await selectAllActivities(page);
      await clickCompleteButton(page);
    });

    // =========================
    // FEATURE 5: EXPOSURE MANAGEMENT
    // =========================
    await test.step('Exposure Processing', async () => {
      await clickExposureMenu(page);
      await checkExposureCheckbox(page);
      await closeexp(page);
      await enterCloseExposureNotes(page, 'Closing exposure after review');
      await selectExposureOutcome(page, 'Completed');
      await closeexp(page);
    });

    // =========================
    // FEATURE 6: CLOSE CLAIM
    // =========================
    await test.step('Close Claim Process', async () => {
      await openActionsMenu(page);
      await clickCloseClaim(page);
      await enterCloseClaimNotes(page, 'Close');
      await closeClaimOutcome(page, 'Completed');
      await closecla(page);
    });
  });
});
