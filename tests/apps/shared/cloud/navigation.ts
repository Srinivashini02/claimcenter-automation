import { test } from '@pagesetup';
import { steps } from '@playwright-utils/steps';
import { pageComponents } from 'test-setup/locator-templates';

export const search = pageComponents.cloud.button('Search', 'Search');
export const cancel = pageComponents.cloud.button('Cancel', 'cancel');

export async function clickSearch() {
  await test.step(`Click search button`, async () => {
    await steps.click(search);
  });
}
