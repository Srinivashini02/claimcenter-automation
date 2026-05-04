import * as ccPrem from '@apps/claim-center/on-prem/index';
import { getPage } from '@playwright-utils';
import { steps } from '@playwright-utils/steps';
import test from '@playwright/test';
import { pageComponents } from 'test-setup/locator-templates';

export async function basicInfo(fullName: string) {
  await test.step(`Basic Information`, async () => {
    const nextButton = pageComponents.cloud.button('Next', 'Next Button');
    const page = getPage();
    const wrapper = page.locator(
      '#FNOLWizard-FullWizardStepSet-FNOLWizard_BasicInfoScreen-PanelRow-BasicInfoDetailViewPanelDV-ReportedBy_Name',
    );
    const selectDropdown = wrapper.locator('select');
    await wrapper.click();
    const option = await selectDropdown.locator('option', { hasText: fullName }).getAttribute('value');
    if (!option) throw new Error(`Option with text "${fullName}" not found`);
    await selectDropdown.selectOption(option);
    await steps.click(nextButton);
  });
}
