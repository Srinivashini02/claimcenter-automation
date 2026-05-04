import * as cc from '@apps/claim-center/on-prem/index';
import test, { Page } from '@playwright/test';
import { steps } from '@playwright-utils/steps';
import { pageComponents } from 'test-setup/locator-templates';

const finishBtn = pageComponents.cloud.button('Finish', 'finish button');

export async function saveAssign(
  page: Page,
  claimantNam: string,
  claimCost: string,
  category: string,
  reserveamt: string,
) {
  await test.step(`Save and Assign Claim`, async () => {
    await cc.saveAndAssignClaim.clickNewExposure(page, claimantNam);
    await cc.saveAndAssignClaim.saveAssign();
    await cc.savedHelper.newClaimsaved();
    await cc.saveAndAssignClaim.clickExposures(page);
    await cc.saveAndAssignClaim.checkExposureCheckbox(page);
    await cc.saveAndAssignClaim.clickCreateReserve(page);
    await cc.saveAndAssignClaim.checkReserveCheckbox(page);
    await cc.saveAndAssignClaim.selectReserveCostType(page, claimCost);
    await cc.saveAndAssignClaim.selectReserveCostCategory(page, category);
    await cc.saveAndAssignClaim.enterReserveAmount(page, reserveamt);
    await cc.saveAndAssignClaim.clickSaveReserve(page);
  });
}

export async function saveAndAssign() {
  await steps.click(finishBtn);
}
