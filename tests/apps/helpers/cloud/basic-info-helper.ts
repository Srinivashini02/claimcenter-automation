import * as cc from '@apps/claim-center/cloud/index';
import test from '@playwright/test';

export async function basicInfo(fullName: string) {
    await test.step(`Basic Information`, async () => {
        await cc.topmenu.basicInfo(fullName);
    });
}