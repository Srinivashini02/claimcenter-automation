import { steps } from '@playwright-utils/steps';
import test from '@playwright/test';
import { pageComponents } from 'test-setup/locator-templates';

const desktop = pageComponents.cloud.topMenuDropdown('Desktop', 'desktop');
const account = pageComponents.cloud.topMenuDropdown('Account', 'account');
const policy = pageComponents.cloud.topMenuDropdown('Policy', 'policy');
const contact = pageComponents.cloud.topMenuDropdown('Contact', 'contact');
const search = pageComponents.cloud.topMenuDropdown('Search', 'search');
const administration = pageComponents.cloud.topMenuDropdown('Administration', 'administration');

const newAccount = pageComponents.shared.menuItem('New Account', 'new account');
const accountNumberSearchBox = pageComponents.shared.menuItem('Acct #', 'account number');
const accountSearchIcon = pageComponents.shared.searchIcon('Acct #', 'account search icon');

const newSubmission = pageComponents.shared.menuItem('New Submission', 'new submission');
const submissionNumberSearchBox = pageComponents.shared.menuItem('Sub #', 'submission number');
const submissionNumberSearchIcon = pageComponents.shared.searchIcon('Sub #', 'submission search icon');
const policyNumberSearchBox = pageComponents.shared.menuItem('Policy #', 'Policy number');
const policyNumberSearchIcon = pageComponents.shared.searchIcon('Policy #', 'Policy search icon');

export async function initiateNewAccount() {
  await test.step(`Start new account`, async () => {
    await steps.click(account);
    await steps.click(newAccount);
  });
}

export async function initiateNewSubmission() {
  await test.step(`Start new Submission`, async () => {
    await steps.click(policy);
    await steps.click(newSubmission);
  });
}

export async function searchAccount(accountNumber: string) {
  await test.step(`Search Submission`, async () => {
    await steps.click(account);
    await steps.typeText(accountNumberSearchBox, accountNumber);
    await steps.click(accountSearchIcon);
  });
}

export async function searchSubmission(submissionNumber: string) {
  await test.step(`Search Submission`, async () => {
    await steps.click(policy);
    await steps.typeText(submissionNumberSearchBox, submissionNumber);
    await steps.click(submissionNumberSearchIcon);
  });
}
export async function searchPolicy(policyNumber: string) {
  await test.step(`Search Submission`, async () => {
    await steps.click(policy);
    await steps.typeText(policyNumberSearchBox, policyNumber);
    await steps.click(policyNumberSearchIcon);
  });
}
