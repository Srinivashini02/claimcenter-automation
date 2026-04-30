import { pageComponents } from 'test-setup/locator-templates';
import { steps } from '@playwright-utils/steps';
import { Page, expect } from '@playwright/test';

const finishBtn = pageComponents.cloud.button('Finish', 'finish button');

export async function saveAssign() {
  await steps.click(finishBtn);
}
export async function clickNewExposure(page: Page, claimantName: string) {
  const newExposureBtn = pageComponents.onprem.buttonexp(page, 'New Exposure', 'new exposure button');
  const chooseByCoverage = pageComponents.shared.menuitemexp(page, 'Choose by Coverage Type');
  const identityTheft = pageComponents.shared.menuitemexp(page, 'Identity Theft Protection');
  const claimantDropdown = pageComponents.onprem.claimantDropdown(page, 'claimant');
  const okBtn = pageComponents.onprem.okButton(page, 'OK');

  await expect(newExposureBtn).toBeVisible();
  await newExposureBtn.click();
  await expect(chooseByCoverage).toBeVisible();
  await chooseByCoverage.hover();
  await expect(identityTheft).toBeVisible();
  await identityTheft.click();
  await page.waitForTimeout(500);
  await expect(claimantDropdown).toBeVisible();
  await claimantDropdown.selectOption({ label: claimantName });
  await expect(okBtn).toBeVisible();
  await expect(okBtn).toBeEnabled();
  await okBtn.click();
}

export async function clickExposures(page: Page) {
  const exposuresMenu = pageComponents.onprem.exposuresMenu(page, 'Exposures');

  await expect(exposuresMenu).toBeVisible();
  await exposuresMenu.click();
}

export async function checkExposureCheckbox(page: Page) {
  const checkbox = pageComponents.onprem.exposureCheckbox(page, 0);

  await expect(checkbox).toBeVisible();
  await checkbox.check();
}

export async function clickCreateReserve(page: Page) {
  const createReserveBtn = pageComponents.onprem.createReserveButton(page, 'Create Reserve');

  await expect(createReserveBtn).toBeVisible();
  await expect(createReserveBtn).toBeEnabled();
  await createReserveBtn.click();
}

export async function checkReserveCheckbox(page: Page) {
  const checkbox = pageComponents.onprem.reserveCheckbox(page, 0);

  await expect(checkbox).toBeVisible();
  await checkbox.check();
}

export async function selectReserveCostType(page: Page, costType: string) {
  const costTypeDropdown = pageComponents.onprem.reserveCostTypeDropdown(page, 0);

  await expect(costTypeDropdown).toBeVisible({ timeout: 30000 });
  await costTypeDropdown.selectOption({ label: costType });
}

export async function selectReserveCostCategory(page: Page, category: string) {
  const costCategoryDropdown = pageComponents.onprem.reserveCostCategoryDropdown(page, 0);

  await expect(costCategoryDropdown).toBeVisible({ timeout: 30000 });
  await costCategoryDropdown.selectOption({ label: category });
}

export async function enterReserveAmount(page: Page, amount: string) {
  const amountField = pageComponents.onprem.reserveAmountField(page, 0);

  await expect(amountField).toBeVisible({ timeout: 30000 });
  await amountField.fill(amount);
}

export async function clickSaveReserve(page: Page) {
  const saveBtn = pageComponents.onprem.saveButton(page, 'Save');

  await expect(saveBtn).toBeVisible();
  await expect(saveBtn).toBeEnabled();
  await saveBtn.click();
}
