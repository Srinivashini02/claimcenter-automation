import { test } from '@pagesetup';
import { steps } from '@playwright-utils/steps';
import { BIG_TIMEOUT } from '@timeouts';
import { getApplication } from 'tests/config/env-config';
import { Application } from 'tests/config/types';

export async function navigateToApp(appName: string) {
  await test.step(`Launch ${appName} application`, async () => {
    const app: Application = getApplication(appName);
    await steps.goto(app.url), { Timeouts: BIG_TIMEOUT };
  });
}

export async function navigateToAppCC(appName: string) {
  await test.step(`Launch ${appName} application`, async () => {
    const app: Application = getApplication(appName);
    await steps.goto(app.url), { Timeouts: BIG_TIMEOUT };
  });
}