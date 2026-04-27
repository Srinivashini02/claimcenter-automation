import { xcenters } from '@apps/xcenter-pages';
import { test } from '@pagesetup';
import { assertSteps } from '@playwright-utils/steps';
import { roles } from 'tests/config/users';

test.describe.configure({ mode: 'parallel' });

const ccPrem = xcenters.ccOnPrem;

test.describe('ClaimsCenter onPrem Suite', () => {
    test('ClaimsCenter onPrem Login', { tag: '@smoke' }, async () => {
        //Login to application
        await ccPrem.loginToCCApp(roles.superuser);

        // Do a claim search
        await ccPrem.searchHelper.searchClaim('POL123');

        //Click on new claim 
        await ccPrem.newClaimHelper.newClaim();

    });
});
