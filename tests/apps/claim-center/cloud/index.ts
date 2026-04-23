import * as appHelpers from 'tests/apps/helpers/app-helper';
import { doLogout, loginToApplication } from 'tests/apps/shared/cloud/login';
import { APP } from 'tests/config/env-config';
export * as loginPage from 'tests/apps/shared/cloud/login';
export * as searchHelper from 'tests/apps/helpers/on-prem/search-helper';
export * as newClaimHelper from 'tests/apps/helpers/cloud/new-claim-helper';
export * as createpolicyHelper from 'tests/apps/helpers/cloud/create-policy-helper';
export * as topmenu from 'tests/apps/shared/on-prem/top-menu';

export async function loginToCCApp(role: string) {
  await appHelpers.navigateToAppCC(APP.claimCenter);
  await loginToApplication(APP.claimCenter, role);
}

export async function logoutOfCCApp() {
  await doLogout(APP.claimCenter);
}