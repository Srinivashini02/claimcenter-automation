/**
 * Page-setup.ts: This module is responsible for setting up the initial state of a page before each test. It includes a
 * hook that runs before each test, setting the page context. By centralizing these setup operations, it ensures a
 * consistent starting point for each test, improving test reliability. It also exports a base test object with a
 * beforeEach hook already set up. This can be used to define tests with the page context set up.
 */

import { Page, test as baseTest, expect } from '@playwright/test';
import { setPage } from '@page-utils';
import { testContext } from './test-context';

/**
 * A hook that runs before each test, setting the page context. The base test object with a beforeEach hook is already
 * set up. This can be used to define tests with the page context set up.
 *
 * @param {Page} page - The page context provided by Playwright.
 */

export const ongoingRequests = new Set();
const SERVICE_WORKER_URL_PATTERNS = [/OidcKeepAliveServiceWorker.json/];

export const test = baseTest.extend<{ testHook: void }>({
  testHook: [
    async ({ page }, use, testInfo) => {
      addRequestListeners(page);
      testContext.clear();
      setPage(page);
      await use();
      await testInfo.attach('test captures', {
        body: testContext.getAsJsonString(),
        contentType: 'text/plain',
      });
    },
    { auto: true },
  ],
});

function addRequestListeners(page: Page) {
  page.on('request', request => {
    if (!SERVICE_WORKER_URL_PATTERNS.some(pattern => pattern.test(request.url()))) {
      ongoingRequests.add(request);
    }
  });
  page.on('requestfinished', request => {
    ongoingRequests.delete(request);
  });
  page.on('requestfailed', request => {
    ongoingRequests.delete(request);
  });
}

export { expect };
