import { getPage } from '@playwright-utils';
import { steps } from '@playwright-utils/steps';
import test, { Page, expect } from '@playwright/test';
import { pageComponents } from 'test-setup/locator-templates';
import { Claim } from '@tests/testdata/types/cc-types';

const search = pageComponents.onprem.searchItem('Searc', 'search');
const policy = pageComponents.onprem.textPolicy('Policy #', 'policyNumber');
const searchsubmit = pageComponents.onprem.searchButton('Search', 'searchSubmit');
const claimTab = pageComponents.onprem.claimTab('Claim');
const newClaimOption = pageComponents.onprem.claimTabExpandButton('Claim');
const newClaimMenu = pageComponents.onprem.newClaimMenuItem('New Claim');
const unVerifiedPolicy = pageComponents.onprem.radioOption('Create Unverified Policy', 'create unverified policy');
const findPolicyNumber = pageComponents.onprem.textPolicyNumber('Policy Number', 'policy number');
const type = pageComponents.onprem.dropdownval('Type', 'type');
const lossDateInput = pageComponents.onprem.input('Loss Date', 'Loss Date Input');
const effectiveDateInput = pageComponents.onprem.input('Effective Date', 'Effective Date Input');
const expirationDateInput = pageComponents.onprem.input('Expiration Date', 'Expiration Date Input');
const insuredNameOptions = pageComponents.onprem.optionsMenu('Name', 'Insured Name Options');
const newPerson = pageComponents.onprem.submenuItem('New Person', 'New Person Menu Item');
const firstName = pageComponents.onprem.input('First name', 'first name Input');
const lastName = pageComponents.onprem.input('Last name', 'last name Input');
const address1 = pageComponents.onprem.input('Address 1', 'address 1');
const cityField = pageComponents.onprem.input(`City`, 'city');
const StateField = pageComponents.onprem.statedropdown('State', 'state');
const zipCodeField = pageComponents.onprem.textInput('ZIP Code', 'ZIP code');
const addressType = pageComponents.onprem.dropdown('Address Type', 'address type');
const update = pageComponents.onprem.button('Update', 'update');
const nextButton = pageComponents.onprem.button('Next', 'Next Button');
const reportedByNameOn = pageComponents.onprem.dropdown('Name', 'Name');
const lossCauseVal = pageComponents.onprem.dropdown('Loss Cause', 'loss cause input');
const whatHappened = pageComponents.onprem.textarea('What Happened?', 'what happened');

const locate = pageComponents.onprem.dropdown('Location', 'location Input');
const finishBtn = pageComponents.onprem.button('Finish', 'finish button');
const basicInformationPage = pageComponents.onprem.pageTitle('Basic information', 'Basic information');
const addClaimInformationPage = pageComponents.onprem.pageTitle('Add claim information', 'Add claim information');

export async function searchClaim(policyNumber: string) {
  await test.step(`Search Claim`, async () => {
    await steps.click(search);
    await steps.click(policy);
    await steps.typeText(policy, policyNumber);
    await steps.click(searchsubmit);
  });
}

export async function newClaim() {
  await test.step(`Create new claim`, async () => {
    await steps.click(claimTab);
    await steps.click(newClaimOption);
    await steps.click(newClaimMenu);
  });
}

export async function createpolicy(
  policyNum: string,
  policyType: string,
  date: string,
  effDate: string,
  expDate: string,
  firstNameVal: string,
  lastNameVal: string,
  address1Val: string,
  cityVal: string,
  stateValue: string,
  zipCodeVal: string,
  addressTypeVal: string,
) {
  await test.step(`Create Policy`, async () => {
    await steps.click(unVerifiedPolicy);
    await steps.typeText(findPolicyNumber, policyNum);
    await steps.click(type);
    await steps.click(type);
    await steps.selectOptionByText(type, policyType);
    await steps.typeText(lossDateInput, date);
    //await steps.wait(1500);
    await steps.typeText(effectiveDateInput, effDate);
    await steps.typeText(expirationDateInput, expDate);
    await insuredName();
    // await steps.click(insuredNameOptions);
    // await steps.wait(300);
    // await steps.click(newPerson);
    await steps.typeText(firstName, firstNameVal);
    await steps.typeText(lastName, lastNameVal);
    await steps.scrollToView(address1);
    await steps.typeText(address1, address1Val);
    await steps.typeText(cityField, cityVal);
    await StateField.waitForStable();
    await steps.selectOptionByText(StateField, stateValue);
    await zipCodeField.waitForStable();
    await steps.pressSequentially(zipCodeField, zipCodeVal, { delay: 400 });
    await steps.typeText(zipCodeField, zipCodeVal);
    await addressType.waitForStable();
    await steps.selectOptionByText(addressType, addressTypeVal);
    await steps.click(update);
    await steps.typeText(lossDateInput, date);
    await steps.click(nextButton);
  });
}

export async function basicInfo(fullName: string) {
  await steps.waitForPageToLoad(basicInformationPage);
  await steps.selectOptionByText(reportedByNameOn, fullName);
  await steps.click(nextButton);
}

export async function addClaim(lossVal: string, fulladdress: string) {
  await steps.selectOptionByText(lossCauseVal, lossVal);
  await steps.selectOptionByText(locate, fulladdress);
  await steps.click(nextButton);
}

export async function addclaimInfo(claimsData: { claim: Claim }) {
  const page = getPage();
  await steps.waitForPageToLoad(addClaimInformationPage);
  await steps.typeText(whatHappened, claimsData.claim.lossData?.whatHappened ?? '');
  await steps.selectOptionByText(lossCauseVal, claimsData.claim.lossData?.lossCause ?? '');
  await steps.selectOptionByPartialText(
    locate,
    `${claimsData.claim.policyData.address1 ?? ' '}, ${claimsData.claim.policyData.city ?? ' '}`,

    // locate,
    // `${claimsData.claim.policyData.address1 ?? ' '}, ${claimsData.claim.policyData.city ?? ' '}, ${claimsData.claim.policyData.state ?? ' '} ${claimsData.claim.policyData.zipcode ?? ' '}`,
  );
  await steps.click(nextButton);
}

export async function service() {
  await steps.click(nextButton);
}

export async function saveAssign() {
  await steps.click(finishBtn);
}

export async function insuredName() {
  const page = getPage();
  await page
    .locator(
      '#FNOLWizard-FNOLWizard_FindPolicyScreen-FNOLWizardFindPolicyPanelSet-NewClaimPolicyGeneralPanelSet-NewClaimPolicyGeneralDV-Insured_Name-Insured_NameMenuIcon div[role="button"]',
    )
    .click();
  if (
    !(await page
      .locator(
        '#FNOLWizard-FNOLWizard_FindPolicyScreen-FNOLWizardFindPolicyPanelSet-NewClaimPolicyGeneralPanelSet-NewClaimPolicyGeneralDV-Insured_Name-ClaimNewContactPickerMenuItemSet-NewContactPickerMenuItemSet_NewPerson div[role="menuitem"]',
      )
      .isVisible())
  ) {
    await page
      .locator(
        '#FNOLWizard-FNOLWizard_FindPolicyScreen-FNOLWizardFindPolicyPanelSet-NewClaimPolicyGeneralPanelSet-NewClaimPolicyGeneralDV-Insured_Name-Insured_NameMenuIcon div[role="button"]',
      )
      .click();
  }
  await page
    .locator(
      '#FNOLWizard-FNOLWizard_FindPolicyScreen-FNOLWizardFindPolicyPanelSet-NewClaimPolicyGeneralPanelSet-NewClaimPolicyGeneralDV-Insured_Name-ClaimNewContactPickerMenuItemSet-NewContactPickerMenuItemSet_NewPerson div[role="menuitem"]',
    )
    .click();
  //await steps.click(insuredNameOptions);
  //const newPerson = page.getByRole('menuitem', { name: 'New Person' });
  //await expect(newPerson).toBeVisible();
  //await newPerson.click();
}

export async function openActionsMenu(page: Page) {
  const actions = pageComponents.onprem.actionsButton(page);

  await expect(actions).toBeVisible();
  await expect(actions).toBeEnabled();

  await actions.click();
}

export async function clickCloseClaim(page: Page) {
  const closeClaim = pageComponents.onprem.closeClaimMenuItem(page);

  await expect(closeClaim).toBeVisible();
  await expect(closeClaim).toBeEnabled();

  await closeClaim.click();
}
