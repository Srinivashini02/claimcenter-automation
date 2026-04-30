// import { xcenters } from '@apps/xcenter-pages';
// import { test } from '@pagesetup';
// import { assertSteps } from '@playwright-utils/steps';
// import { roles } from 'tests/config/users';

// test.describe.configure({ mode: 'parallel' });

// const ccPrem = xcenters.ccOnPrem;

// test.describe('ClaimsCenter onPrem Suite', () => {
//   test('ClaimsCenter onPrem Login', { tag: '@smoke' }, async () => {
//     //Login to application
//     await ccPrem.loginToCCApp(roles.superuser);

//     // Do a claim search
//     await ccPrem.searchHelper.searchClaim('POL123');

//     //Click on new claim
//     await ccPrem.newClaimHelper.newClaim();

//     //Search or Create Policy
//     await ccPrem.createpolicyHelper.createPolicy(
//       'POL123',
//       'Personal Auto',
//       '04/22/2026',
//       '04/23/2025',
//       '04/23/2026',
//       'John',
//       'Doe',
//       '9231 Giles Pond Dr',
//       'Mechanicsville',
//       'Virginia',
//       '23116',
//       'Home',
//     );

//     // Basic Info
//     await ccPrem.basicInfoHelper.basicInfo('John Doe');

//     // Add Claim Information
//     await ccPrem.addClaimHelper.addclaimInfo(
//       'Car is Missing',
//       'Theft of entire vehicle',
//       '9231 Giles Pond Dr, Mechanicsville, VA 23116',
//     );

//     // Services
//     await ccPrem.serviceHelper.service();

//     //Save and Assign Claim
//     await ccPrem.saveAssignHelper.saveAssign();

//     //New Claim Saved
//     await ccPrem.savedHelper.newClaimsaved();
//   });
// });
