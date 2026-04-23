import * as cc from '@apps/claim-center/cloud/index';
import test from '@playwright/test';

import { dataFilePaths } from '@tests/constants/cloud/cloud-constants';
//import { AccountData } from '@tests/testdata/types/pc-types';

export async function createPolicy(policynumber: string, policyType: string, date: string, effDate: string, expDate: string, firstName: string, lastName: string, address1: string, city: string, state: string, zipcode: string, addressType: string) {
    await test.step(`Search or Create Policy`, async () => {
        await cc.topmenu.createpolicy(policynumber, policyType, date, effDate, expDate, firstName, lastName, address1, city, state, zipcode, addressType);
    });
}