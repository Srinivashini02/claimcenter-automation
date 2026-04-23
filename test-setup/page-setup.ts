/**
 * Page-setup.ts: This module is responsible for setting up the initial state of a page before each test. It includes a
 * hook that runs before each test, setting the page context. By centralizing these setup operations, it ensures a
 * consistent starting point for each test, improving test reliability. It also exports a base test object with a
 * beforeEach hook already set up. This can be used to define tests with the page context set up.
 */

import { Page, Request, test as baseTest, expect } from '@playwright/test';
import { setPage } from '@page-utils';
import { testContext } from './test-context';

/**
 * A hook that runs before each test, setting the page context. The base test object with a beforeEach hook is already
 * set up. This can be used to define tests with the page context set up.
 *
 * @param {Page} page - The page context provided by Playwright.
 */

export const ongoingRequests: Set<Request> = new Set<Request>();
const PERSISTENT_REQUESTS_PATTERN = [
  /ServiceWorker\.json\?.*/,
  /family=Material\+Icons/,
  /GenericModalV2/,
  /cdn.mouseflow.com/,
  /code.jquery.com/,
  /fonts.googleapis.com\/css/,
  /www.googletagmanager\.com/,
  /www.google-analytics\.com/,
  /animate.css/,
  /use\.fontawesome\.com/,
  /cdnjs\.cloudflare\.com/,
  /\.ttf/,
  /\.logger/,
  /\.svg/,
  /\.woff/,
  /\.gif/,
  /blob:https/,
];

const isPersistentRequest = (request: Request): boolean => {
  const url = request.url();
  return PERSISTENT_REQUESTS_PATTERN.some(pattern => pattern.test(url));
};

export const test = baseTest.extend<{ testHook: void }>({
  testHook: [
    async ({ page }, use, testInfo) => {
      addRequestListeners(page);
      testContext.clear();
      // console.log('BEFORE EACH HOOK FROM FIXTURE');
      setPage(page);
      await use();
      // console.log('AFTER EACH HOOK FROM FIXTURE');
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
    if (!isPersistentRequest(request)) {
      ongoingRequests.add(request);
    }
  });
  page.on('requestfinished', request => {
    if (!isPersistentRequest(request)) {
      ongoingRequests.delete(request);
    }
  });
  page.on('requestfailed', request => {
    if (!isPersistentRequest(request)) {
      ongoingRequests.delete(request);
    }
  });
}

export { expect };
