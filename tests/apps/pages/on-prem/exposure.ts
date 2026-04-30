import { Page, expect } from '@playwright/test';
import { pageComponents } from 'test-setup/locator-templates';

export async function clickExposureMenu(page: Page) {
  const expo = pageComponents.onprem.exposureMenuItem(page);

  await expect(expo).toBeVisible();
  await expect(expo).toBeEnabled();
  await expo.click();
}

export async function closeexp(page: Page) {
  const closebtn = pageComponents.onprem.closeExpoBtn(page, 'Close Exposure');
  await expect(closebtn).toBeVisible();
  await expect(closebtn).toBeEnabled();
  await closebtn.click();
}

export async function enterCloseExposureNotes(page: Page, note: string) {
  const notes = pageComponents.onprem.notesTextArea(page);

  await expect(notes).toBeVisible();
  await expect(notes).toBeEnabled();
  await notes.fill(note);
}

export async function selectExposureOutcome(page: Page, value: string) {
  const dropdown = pageComponents.onprem.outcomeDropdown(page);

  await expect(dropdown).toBeVisible();
  await expect(dropdown).toBeEnabled();
  await dropdown.selectOption(value);
}
