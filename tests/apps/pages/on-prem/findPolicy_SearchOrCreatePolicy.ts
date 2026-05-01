import { getPage } from '@playwright-utils';
import { steps } from '@playwright-utils/steps';
import test, { Page, expect } from '@playwright/test';
import { pageComponents } from 'test-setup/locator-templates';

const unVerifiedPolicy = pageComponents.cloud.radioOption('Create Unverified Policy', 'create unverified policy');
const findPolicyNumber = pageComponents.cloud.textPolicyNumber('Policy Number', 'policy number');
const type = pageComponents.cloud.dropdownval('Type', 'type');
const lossDateInput = pageComponents.cloud.input('Loss Date', 'Loss Date Input');
const effectiveDateInput = pageComponents.cloud.input('Effective Date', 'Effective Date Input');
const expirationDateInput = pageComponents.cloud.input('Expiration Date', 'Expiration Date Input');
const firstName = pageComponents.cloud.input('First name', 'first name Input');
const lastName = pageComponents.cloud.input('Last name', 'last name Input');
const address1 = pageComponents.cloud.input('Address 1', 'address 1');
const cityField = pageComponents.cloud.input(`City`, 'city');
const StateField = pageComponents.cloud.statedropdown('State', 'state');
const zipCodeField = pageComponents.cloud.textInput('ZIP Code', 'ZIP code');
const addressType = pageComponents.cloud.dropdown('Address Type', 'address type');
const update = pageComponents.cloud.button('Update', 'update');
const nextButton = pageComponents.cloud.button('Next', 'Next Button');

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
