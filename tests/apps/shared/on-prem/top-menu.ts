import { getPage } from '@playwright-utils';
import { steps } from '@playwright-utils/steps';
import test, { expect } from '@playwright/test';
import { pageComponents } from 'test-setup/locator-templates';

const search = pageComponents.onprem.searchItem('Searc', 'search');
const policy = pageComponents.onprem.textPolicy('Policy #', 'policyNumber');
const searchsubmit = pageComponents.onprem.searchButton('Search', 'searchSubmit');
const claimTab = pageComponents.onprem.claimTab('Claim');
const newClaimOption = pageComponents.onprem.claimTabExpandButton('Claim');
const newClaimMenu = pageComponents.onprem.newClaimMenuItem('New Claim');
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
const StateField = pageComponents.cloud.statedropdown('State', 'state');
const zipCodeField = pageComponents.cloud.textInput('ZIP Code', 'ZIP code');
const addressType = pageComponents.cloud.dropdown('Address Type', 'address type');
const update = pageComponents.cloud.button('Update', 'update');
const nextButton = pageComponents.cloud.button('Next', 'Next Button');
const reportedByNameOn = pageComponents.onprem.reportedByNameOn('Name Select');
const lossCauseVal = pageComponents.cloud.dropdown('Loss Cause', 'loss cause input');
const locate = pageComponents.cloud.dropdown('Location', 'location Input');
const finishBtn = pageComponents.cloud.button('Finish', 'finish button');

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
    const stateMap: Record<string, string> = {
      AL: 'Alabama',
      AK: 'Alaska',
      AZ: 'Arizona',
      AR: 'Arkansas',
      CA: 'California',
      CO: 'Colorado',
      CT: 'Connecticut',
      DE: 'Delaware',
      DC: 'District of Columbia',
      FL: 'Florida',
      GA: 'Georgia',
      HI: 'Hawaii',
      ID: 'Idaho',
      IL: 'Illinois',
      IN: 'Indiana',
      IA: 'Iowa',
      KS: 'Kansas',
      KY: 'Kentucky',
      LA: 'Louisiana',
      ME: 'Maine',
      MD: 'Maryland',
      MA: 'Massachusetts',
      MI: 'Michigan',
      MN: 'Minnesota',
      MS: 'Mississippi',
      MO: 'Missouri',
      MT: 'Montana',
      NE: 'Nebraska',
      NV: 'Nevada',
      NH: 'New Hampshire',
      NJ: 'New Jersey',
      NM: 'New Mexico',
      NY: 'New York',
      NC: 'North Carolina',
      ND: 'North Dakota',
      OH: 'Ohio',
      OK: 'Oklahoma',
      OR: 'Oregon',
      PA: 'Pennsylvania',
      PR: 'Puerto Rico',
      RI: 'Rhode Island',
      SC: 'South Carolina',
      SD: 'South Dakota',
      TN: 'Tennessee',
      TX: 'Texas',
      UT: 'Utah',
      VT: 'Vermont',
      VA: 'Virginia',
      WA: 'Washington',
      WV: 'West Virginia',
      WI: 'Wisconsin',
      WY: 'Wyoming',
    };

    const stateFieldVal = stateMap[stateValue];
    await steps.click(unVerifiedPolicy);
    await steps.typeText(findPolicyNumber, policyNum);
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
    await steps.selectOptionByText(StateField, stateFieldVal);
    await zipCodeField.waitForStable();
    await steps.pressSequentially(zipCodeField, zipCodeVal, { delay: 400 });
    await steps.typeText(zipCodeField, zipCodeVal);
    await addressType.waitForStable();
    await steps.selectOptionByText(addressType, addressTypeVal);
    await steps.click(update);
    await steps.click(nextButton);
  });
}

export async function basicInfo(fullName: string) {
  await steps.selectOptionByValue(reportedByNameOn, fullName);
  await steps.click(nextButton);
}

export async function addClaim(lossVal: string, fulladdress: string) {
  await steps.selectOptionByText(lossCauseVal, lossVal);
  await steps.selectOptionByText(locate, fulladdress);
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
