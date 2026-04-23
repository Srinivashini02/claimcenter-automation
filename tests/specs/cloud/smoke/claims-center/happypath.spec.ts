import { xcenters } from '@apps/xcenter-pages';
import { test } from '@pagesetup';
import { assertSteps } from '@playwright-utils/steps';
import { roles } from 'tests/config/users';

test.describe.configure({ mode: 'parallel' });

const cc = xcenters.ccCloud;

test.describe('Claims Center Suite', () => {
    test('Claims Center Login', { tag: '@smoke' }, async () => {
        //Login to application
        await cc.loginToCCApp(roles.superuser);

        // Do a claim search
        await cc.searchHelper.searchClaim('POL123');

        //Click on new claim 
        await cc.newClaimHelper.newClaim();

        //Search or Create Policy 
        await cc.createpolicyHelper.createPolicy('POL123', 'Personal Auto', '04/22/2026', '04/23/2025', '04/23/2026', 'John', 'Doe', '9231 Giles Pond Dr', 'Mechanicsville', 'VA', '23116', 'Home');
        // Basic Info 
        await cc.basicInfoHelper.basicInfo('John Doe');
        // Add Claim Information
        await cc.addClaimHelper.addclaimInfo('Car is Missing', 'Theft of entire vehicle', '9231 Giles Pond Dr, Mechanicsville, VA 23116');
        // Services 
        await cc.serviceHelper.service();
        //Save and Assign Claim
        await cc.saveAssignHelper.saveAssign();
        //New Claim Saved 
        await cc.savedHelper.newClaimsaved();
        //Click on Actions
        await cc.actionHelper.clickActionsMenu();
    });
});

