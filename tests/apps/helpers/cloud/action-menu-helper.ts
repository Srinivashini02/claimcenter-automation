import { getPage } from '@playwright-utils';
import { Page } from '@playwright/test';

export async function clickActionsMenu() {
  const page = getPage();
  await page.locator('[aria-label="Actions"]').first().click();
  await page.waitForTimeout(500);
  // 2. Choose Coverage Type
  await page
    .getByText(/choose by coverage type/i)
    .first()
    .click();
  await page.waitForTimeout(500);
  const cMenu = page.locator('[role="menuitem"] .gw-label[aria-label="C"]');
  await cMenu.hover();
  const collision = page.getByRole('menuitem', { name: 'Comprehensive', exact: true });
  await collision.click();
  const claimantDropdown = page.getByRole('combobox', { name: 'Claimant' });
  await claimantDropdown.waitFor({ state: 'visible', timeout: 10000 });
  await claimantDropdown.selectOption({ index: 1 });
}
