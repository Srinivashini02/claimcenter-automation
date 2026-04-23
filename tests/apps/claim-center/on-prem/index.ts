import * as appHelpers from 'tests/apps/helpers/app-helper';
import { doLogout, loginToApplication } from 'tests/apps/shared/on-prem/login';
import { APP } from 'tests/config/env-config';
export * as loginPage from 'tests/apps/shared/on-prem/login';

export async function loginToCCApp(role: string) {
  await appHelpers.navigateToApp(APP.claimCenter);
  await loginToApplication(APP.policyCenter, role);
}

export async function logoutOfCCApp() {
  await doLogout(APP.claimCenter);
}
