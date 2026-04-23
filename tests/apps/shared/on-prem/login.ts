import { navigateToApp } from '@apps/helpers/app-helper';
import { test } from '@pagesetup';
import { logger, waitForPageLoadState } from '@playwright-utils';
import { steps } from '@steps';
import * as p from 'src/playwright-utils/utils';
import { components, pageComponents } from 'test-setup/locator-templates';
import { User } from 'tests/config/types';
import { getClaimCenterUser } from 'tests/config/users';

const userName = pageComponents.onprem.input('Username', 'username field');
const login = pageComponents.onprem.button('Log In', 'log in button');
const password = `[name='Login-LoginScreen-LoginDV-password']`;
const settingsIcon = components.getByCSS(`[id='gw-TabBarWidget--settings']`, 'setting icon');
const settingIconMenuOptions = {
  international: 'International',
  about: 'About',
  preferences: 'Preferences',
  settings: 'Settings...',
  reloadPCFs: 'Reload PCFs',
  logOut: 'Log Out',
};

/**
 * for logging into the application
 * @param role user role
 */
export async function doLogin(role: string) {
  await test.step(`login with ${role} role`, async () => {
    const user: User = getClaimCenterUser(role);
    await userName.waitForEnabled();
    await steps.typeText(userName, user.username, { timeout: 10000 });
    await enterPassword(user.password!);
    await steps.click(login);
    await waitForPageLoadState();
  });
}

export async function enterPassword(appPassword: string) {
  await test.step(`enterd password`, async () => {
    await p.ActionUtils.fill(password, appPassword);
    logger.info(`entered text '*****' in the element password`);
  });
}

export async function loginToApplication(application: string, role: string) {
  await test.step(`Login to ${application} with ${role} credentials`, async () => {
    await navigateToApp(application);
    await doLogin(role);
  });
}
export async function doLogout(application: string) {
  await test.step(`Login to ${application}`, async () => {
    await steps.click(settingsIcon);
    await steps.click(pageComponents.shared.menuItem(settingIconMenuOptions.logOut, 'logout option'));
  });
}
