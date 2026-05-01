/**
 * playwright.config.ts: This module is responsible for configuring the Playwright test runner.
 * It includes settings for test execution, browser configuration, and environment variables.
 * See https://playwright.dev/docs/test-configuration for more details.
 */

import { ACTION_TIMEOUT, EXPECT_TIMEOUT, NAVIGATION_TIMEOUT, TEST_TIMEOUT } from '@playwright-utils';
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import 'tsconfig-paths/register';
import os from 'os';
import { json } from 'stream/consumers';
dotenv.config({ path: '.env' });
type LiteralUnion<T extends U, U = string> = T | (U & { zz_IGNORE_ME?: never });
// import path from 'path';

const BASE_URL = process.env.URL || 'https://www.saucedemo.com/';
const startLocalHost = process.env.URL && process.env.URL.includes('localhost');
// const customLoggerPath = require.resolve('@playwright-utils/custom-logger');
export const LOCAL_HOST_URL = 'https://localhost:9002'; // Update the URL to match your local dev server URL
export default defineConfig({
  /**
   * The directory where tests are located.
   * See https://playwright.dev/docs/api/class-testconfig#testconfig-testdir
   */
  testDir: './tests',
  /**
   * Determines whether to run tests within each spec file in parallel, in addition to running the spec files themselves in parallel.
   * See https://playwright.dev/docs/api/class-testconfig#testconfig-fullyparallel
   */
  fullyParallel: false,
  /**
   * Whether to fail the build on CI if you accidentally left test.only in the source code.
   * See https://playwright.dev/docs/api/class-testconfig#testconfig-forbidonly
   */
  forbidOnly: !!process.env.CI,
  /**
   * The number of times to retry failed tests. Retries value is only set to happen on CI.
   * See https://playwright.dev/docs/api/class-testconfig#testconfig-retries
   */
  retries: process.env.CI ? 2 : 2,
  /**
   * The number of worker threads to use for running tests. This is set to a different value on CI.
   * See https://playwright.dev/docs/api/class-testconfig#testconfig-workers
   */
  workers: process.env.CI ? 3 : 1,
  /*  Note: Add allure-playwright report */
  /**
   * The reporter to use. This can be set to use a different value on CI.
   * See https://playwright.dev/docs/test-reporters
   */
  reporter: [
    ['line'],
    ['allure-playwright'],
    ['html', { open: 'never' }], // HTML report generation
    ['dot'], // Dot format for minimal console output
    ['json', { outputFile: 'playwright-report/report.json' }], // Store JSON report
  ],
  /**
   * Shared settings for all the projects below.
   * See https://playwright.dev/docs/api/class-testoptions
   */
  globalSetup: require.resolve('./test-setup/global-setup'),
  globalTeardown: require.resolve('./test-setup/global-teardown'),
  timeout: 20 * TEST_TIMEOUT,
  expect: {
    timeout: 20 * EXPECT_TIMEOUT,
  },
  use: {
    /* Sets extra headers for CloudFlare. */
    extraHTTPHeaders: {
      'CF-Access-Client-Id': process.env.CF_CLIENT_ID || '',
      'CF-Access-Client-Secret': process.env.CF_CLIENT_SECRET || '',
    },
    ignoreHTTPSErrors: true,
    acceptDownloads: true,
    testIdAttribute: 'data-testid',
    /**
     * The base URL to be used in navigation actions such as `await page.goto('/')`.
     * This allows for shorter and more readable navigation commands in the tests.
     */
    baseURL: BASE_URL,
    /* Records traces after each test failure for debugging purposes. */
    trace: 'on',
    // video: 'on',
    video: {
      mode: 'on',
      size: { width: 1920, height: 1105 },
    },
    /* Captures screenshots after each test failure to provide visual context. */
    screenshot: { mode: 'on', fullPage: true },
    /* Sets a timeout for actions like click, fill, select to prevent long-running operations. */
    actionTimeout: 5 * ACTION_TIMEOUT,
    /* Sets a timeout for page loading navigations like goto URL, go back, reload, waitForNavigation to prevent long page loads. */
    navigationTimeout: NAVIGATION_TIMEOUT,
  },

  /**
   * Configure projects for major browsers.
   * See https://playwright.dev/docs/test-configuration#projects
   */
  projects: [
    // {
    //   name: 'setup',
    //   testMatch: '**/*.setup.ts',
    //   use: {
    //     ...devices['Desktop Chrome'],
    //     viewport: { width: 1600, height: 1000 },
    //     launchOptions: {
    //       args: ['--disable-web-security'],
    //       slowMo: 0,
    //     },
    //   },
    // },

    /** Due to different view ports in Head and Headless, created 2 projects one for head mode and the same browser for headless. */
    {
      name: 'chromium',
      // dependencies: ['setup'],
      use: {
        viewport: null,
        // storageState: STORAGE_STATE_LOGIN,
        launchOptions: {
          args: ['--disable-web-security', '--start-maximized'],
          /* --auto-open-devtools-for-tabs option is used to open a test with Network tab for debugging. It can help in analyzing network requests and responses.*/
          // args: ["--disable-web-security","--auto-open-devtools-for-tabs"],
          // channel: 'chrome',
          slowMo: 100,
          headless: false,
        },
      },
    },

    {
      name: 'chromiumheadless',
      // dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
        // storageState: STORAGE_STATE_LOGIN,
        launchOptions: {
          args: ['--disable-web-security'],
          // channel: 'chrome',
          slowMo: 100,
          headless: true,
        },
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1530, height: 768 },
        launchOptions: {
          args: ['--disable-web-security', '--start-maximized'],
          firefoxUserPrefs: {
            'browser.cache.disk.enable': false,
            'browser.cache.memory.enable': false,
            'browser.privatebrowsing.autostart': true,
          },
        },
      },
    },
    {
      name: 'edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },

    {},
  ],

  /**
   * If the tests are being run on localhost, this configuration starts a web server.
   * See https://playwright.dev/docs/test-webserver#configuring-a-web-server
   */
  ...(startLocalHost && {
    webServer: {
      cwd: `${os.homedir()}/repos/ui`, // You can also use the realtive path to the UI repo
      command: 'npm start ui-server', // Start the UI server
      url: LOCAL_HOST_URL,
      ignoreHTTPSErrors: true,
      timeout: 60 * 1000,
      reuseExistingServer: true,
      stdout: 'pipe',
      stderr: 'pipe',
    },
  }),
});
