import { test } from '@pagesetup';
import { steps } from '@playwright-utils/steps';
import { pageComponents } from 'test-setup/locator-templates';

export const search = pageComponents.onprem.link('earch', 'Search');
export const cancel = pageComponents.onprem.button('Cancel', 'cancel');
export const next = pageComponents.onprem.button('Next', 'next');
export const quote = pageComponents.onprem.button('uote', 'Quote');
export const bindOptions = pageComponents.onprem.button('ind Options', 'Bind Options');
export const issuePolicy = pageComponents.shared.menuItem('Issue Policy', 'Issue Policy');
export const bindOnly = pageComponents.shared.menuItem('Bind Only', 'Bind Only');

export async function clickSearch() {
  await steps.click(search);
}

export async function clickNext() {
  await steps.click(next);
}

export async function clickQuote() {
  await test.step(`Click Quote`, async () => {
    await steps.click(quote);
  });
}

export async function clickBindOptionsAndIssuePolicy() {
  await steps.click(bindOptions);
  await steps.acceptAlert(issuePolicy);
}
