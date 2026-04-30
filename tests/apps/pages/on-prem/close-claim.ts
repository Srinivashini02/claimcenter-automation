import { Page, expect } from '@playwright/test';
import { pageComponents } from 'test-setup/locator-templates';

export async function enterCloseClaimNotes(page: Page, note: string) {
  const claimNotes = pageComponents.onprem.closeClaimNotes(page);

  await expect(claimNotes).toBeVisible();
  await expect(claimNotes).toBeEnabled();
  await claimNotes.fill(note);
}

export async function closeClaimOutcome(page: Page, value: string) {
  const outcomeclose = pageComponents.onprem.outcomecloseclaim(page);

  await expect(outcomeclose).toBeVisible();
  await expect(outcomeclose).toBeEnabled();
  await outcomeclose.selectOption(value);
}

export async function closecla(page: Page) {
  const closeclaimbtn = pageComponents.onprem.closeExpoBtn(page, 'Close Claim');
  await expect(closeclaimbtn).toBeVisible();
  await expect(closeclaimbtn).toBeEnabled();
  await closeclaimbtn.click();
}
