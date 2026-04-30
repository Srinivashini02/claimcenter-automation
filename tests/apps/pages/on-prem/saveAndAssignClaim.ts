import { pageComponents } from 'test-setup/locator-templates';
import { steps } from '@playwright-utils/steps';

const finishBtn = pageComponents.cloud.button('Finish', 'finish button');

export async function saveAssign() {
  await steps.click(finishBtn);
}
