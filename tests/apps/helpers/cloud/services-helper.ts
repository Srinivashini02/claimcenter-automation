import * as cc from '@apps/claim-center/on-prem/index';
import test from '@playwright/test';

export async function service() {
  await test.step(`Services`, async () => {
    await cc.services.service();
  });
}
