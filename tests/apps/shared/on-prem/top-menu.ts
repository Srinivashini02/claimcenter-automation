import { steps } from '@playwright-utils/steps';
import test from '@playwright/test';
import { Page } from "@playwright/test";
import { policyCenterUsers } from '@tests/config/users';
import { pageComponents } from 'test-setup/locator-templates';


const search = pageComponents.cloud.topSearch('Search', 'search');
const policy = pageComponents.cloud.textPolicy('Policy #', 'policyNumber');
const searchsubmit = pageComponents.cloud.button('Search', 'searchSubmit');
const claimclick = pageComponents.cloud.topMenuDropdown('Claim', 'claim');
const newClaimOption = pageComponents.shared.menuItem('New Claim', 'newClaimOption');
const unVerifiedPolicy = pageComponents.cloud.radioOption('Create Unverified Policy', 'create unverified policy');
const findPolicyNumber = pageComponents.cloud.textPolicyNumber('Policy Number', 'policy number');
const type = pageComponents.cloud.dropdownval('Type', 'type');
const lossDateInput = pageComponents.cloud.input('Loss Date', 'Loss Date Input');
const effectiveDateInput = pageComponents.cloud.input('Effective Date', 'Effective Date Input');
const expirationDateInput = pageComponents.cloud.input('Expiration Date', 'Expiration Date Input');
const insuredNameOptions = pageComponents.cloud.optionsMenu('Name', 'Insured Name Options');
const newPerson = pageComponents.shared.submenuItem('New Person', 'New Person Menu Item');
const firstName = pageComponents.cloud.input('First name', 'first name Input');
const lastName = pageComponents.cloud.input('Last name', 'last name Input');
const address1 = pageComponents.cloud.input('Address 1', 'address 1');
const cityField = pageComponents.cloud.input(`City`, 'city');
const StateField = pageComponents.cloud.statedropdown(`State`, 'state');
const zipCodeField = pageComponents.cloud.textInput(`ZIP Code`, 'ZIP code');
const addressType = pageComponents.cloud.dropdown(`Address Type`, 'address type');


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
    await steps.click(claimclick);
    await steps.click(newClaimOption);
  });
}

export async function createpolicy(policyNum: string, policyType: string, date: string, effDate: string, expDate: string, firstNameVal: string, lastNameVal: string, address1Val: string, cityVal: string, zipCodeVal: string, stateValue: string, addressTypeVal: string) {
  await test.step(`Create Policy`, async () => {
    await steps.click(unVerifiedPolicy);
    await steps.typeText(findPolicyNumber, policyNum);
    await steps.click(type);
    await steps.selectOptionByText(type, policyType);
    await steps.typeText(lossDateInput, date);
    await steps.typeText(effectiveDateInput, effDate);
    await steps.typeText(expirationDateInput, expDate);
    await steps.click(insuredNameOptions);
    await steps.wait(300);
    await steps.click(newPerson);
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
  });
}
