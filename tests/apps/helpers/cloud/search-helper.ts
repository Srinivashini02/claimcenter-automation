import * as cc from '@apps/claim-center/cloud/index';
import test from '@playwright/test';
//import { AccountData } from '@tests/testdata/types/pc-types';

export async function searchClaim(policyNumber: string) {
    await test.step(`Search claim`, async () => {
        await cc.topmenu.searchClaim(policyNumber);
    });
}
