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
