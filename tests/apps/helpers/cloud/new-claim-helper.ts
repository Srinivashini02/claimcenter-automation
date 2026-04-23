import * as cc from '@apps/claim-center/cloud/index';
import test from '@playwright/test';
//import { AccountData } from '@tests/testdata/types/pc-types';

export async function newClaim() {
  await test.step(`Create new claim`, async () => {
    await cc.topmenu.newClaim();
  });
}
