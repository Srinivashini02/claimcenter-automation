import { Page, expect } from '@playwright/test';
import { pageComponents } from 'test-setup/locator-templates';

export async function openWorkplan(page: Page) {
  const workplan = pageComponents.onprem.workplanMenuItem(page);

  await expect(workplan).toBeVisible();
  await expect(workplan).toBeEnabled();
  await workplan.click();
}

export async function selectAllActivities(page: Page) {
  const checkbox = pageComponents.onprem.selectAllActivitiesCheckbox(page);

  await expect(checkbox).toBeVisible();
  await expect(checkbox).toBeEnabled();
  if (!(await checkbox.isChecked())) {
    await checkbox.check();
  }
}

export async function clickCompleteButton(page: Page) {
  const completeBtn = pageComponents.onprem.completeButton(page, 'Complete');

  await expect(completeBtn).toBeVisible();
  await expect(completeBtn).toBeEnabled();
  await completeBtn.click();
}
