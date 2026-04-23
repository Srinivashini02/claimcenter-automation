import * as pc from '@apps/policy-center/cloud/index';
import test from '@playwright/test';
import { AccountData } from '@tests/testdata/types/pc-types';

export async function createAccount(data: AccountData) {
  await test.step(`Create account`, async () => {
    await pc.topmenu.initiateNewAccount();
    await pc.enterAccountInformation.enterAccountInformationDetails(data);
    await pc.createAccount.enterCreateAccountDetails(data);
    await pc.createAccount.clickUpdate();
  });
}