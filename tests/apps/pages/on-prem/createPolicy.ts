import { getPage } from '@playwright-utils';
import { steps } from '@playwright-utils/steps';
import test from '@playwright/test';
import { pageComponents } from 'test-setup/locator-templates';

const unVerifiedPolicy = pageComponents.onprem.radioOption('Create Unverified Policy', 'create unverified policy');
const findPolicyNumber = pageComponents.onprem.textPolicyNumber('Policy Number', 'policy number');
const type = pageComponents.onprem.dropdownval('Type', 'type');
const lossDateInput = pageComponents.onprem.input('Loss Date', 'Loss Date Input');
const effectiveDateInput = pageComponents.onprem.input('Effective Date', 'Effective Date Input');
const expirationDateInput = pageComponents.onprem.input('Expiration Date', 'Expiration Date Input');
const firstName = pageComponents.onprem.input('First name', 'first name Input');
const lastName = pageComponents.onprem.input('Last name', 'last name Input');
const address1 = pageComponents.onprem.input('Address 1', 'address 1');
const cityField = pageComponents.onprem.input(`City`, 'city');
const StateField = pageComponents.onprem.statedropdown('State', 'state');
const zipCodeField = pageComponents.onprem.textInput('ZIP Code', 'ZIP code');
const addressType = pageComponents.onprem.dropdown('Address Type', 'address type');
const update = pageComponents.onprem.button('Update', 'update');
const nextButton = pageComponents.onprem.button('Next', 'Next Button');
const nameButton = pageComponents.onprem.optionsMenu('Name', 'Name');
const newPerson = pageComponents.onprem.submenuItem('New Person', 'New Person Menu Item');

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
  await steps.click(nameButton);
  if (!(await newPerson.isVisible())) {
    await steps.click(nameButton);
  }
  await steps.click(newPerson);
}
