import { steps } from '@playwright-utils/steps';
import { pageComponents } from 'test-setup/locator-templates';

const nextButton = pageComponents.cloud.button('Next', 'Next Button');

export async function service() {
  await steps.click(nextButton);
}
