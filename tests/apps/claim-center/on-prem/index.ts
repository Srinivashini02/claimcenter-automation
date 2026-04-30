import * as appHelpers from 'tests/apps/helpers/app-helper';
import { doLogout, loginToApplication } from 'tests/apps/shared/cloud/login';
import { APP } from 'tests/config/env-config';
export * as loginPage from 'tests/apps/shared/cloud/login';
export * as searchHelper from 'tests/apps/helpers/on-prem/search-helper';
export * as createpolicyHelper from 'tests/apps/helpers/on-prem/create-policy-helper';
export * as newClaimHelper from 'tests/apps/helpers/on-prem/new-claim-helper';
export * as basicInfoHelper from 'tests/apps/helpers/on-prem/basic-info-helper';
export * as addClaimHelper from 'tests/apps/helpers/on-prem/add-claim-helper';
export * as serviceHelper from 'tests/apps/helpers/on-prem/services-helper';
export * as saveAssignHelper from 'tests/apps/helpers/on-prem/save-assign-helper';
export * as savedHelper from 'tests/apps/helpers/on-prem/saved-claim-helper';
//export * as actionHelper from 'tests/apps/helpers/cloud/action-menu-helper';
export * as topmenu from 'tests/apps/shared/on-prem/top-menu';
export * as basicInformation from 'tests/apps/pages/on-prem/basicInfo_basicInformation';
export * as addClaimInformation from 'tests/apps/pages/on-prem/lossDetails_addClaimInformation';
export * as searchOrCreatePolicy from 'tests/apps/pages/on-prem/findPolicy_SearchOrCreatePolicy';
export * as saveAndAssignClaim from 'tests/apps/pages/on-prem/saveAndAssignClaim';
export * as services from 'tests/apps/pages/on-prem/services';

export async function loginToCCApp(role: string) {
  await appHelpers.navigateToAppCC(APP.claimCenter);
  await loginToApplication(APP.claimCenter, role);
}

export async function logoutOfCCApp() {
  await doLogout(APP.claimCenter);
}
