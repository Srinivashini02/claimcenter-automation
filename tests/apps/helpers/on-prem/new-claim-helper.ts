import * as ccPrem from '@apps/claim-center/on-prem/index';
import test from '@playwright/test';
//import { AccountData } from '@tests/testdata/types/pc-types';

export async function newClaim() {
  await test.step(`Create new claim`, async () => {
    await ccPrem.topmenu.newClaim();
  });
}
