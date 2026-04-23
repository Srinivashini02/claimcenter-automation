import { steps } from '@playwright-utils/steps';
import test from '@playwright/test';
import { Contact } from '@testdata/types/common-types';
import { components, pageComponents } from 'test-setup/locator-templates';
import { enterAddressDetails } from './address';
import { getPage, waitForAllRequests } from '@playwright-utils';
import { press } from '@playwright-utils/steps/action-steps';

//Company
export const companyName = pageComponents.cloud.input('Name', 'company name');
export const officePhone = pageComponents.cloud.input('Office Phone', 'office phone');
export const fax = pageComponents.cloud.input('Fax', 'fax');
export const organizationType = pageComponents.cloud.dropdown('Organization Type', 'organization type');
export const fein = pageComponents.cloud.input('FEIN', 'fein');

//Person
export const firstName = pageComponents.cloud.input('First name', 'first name textbox');
export const lastName = pageComponents.cloud.input('Last name', 'last name');
export const homePhone = pageComponents.cloud.input('Home Phone', 'home phone');
export const workPhone = pageComponents.cloud.input('Work Phone', 'work phone');
export const mobilePhone = pageComponents.cloud.input('Mobile Phone', 'mobile phone');
export const faxPhone = pageComponents.cloud.input('Fax Phone', 'fax phone');
export const primaryPhone = pageComponents.cloud.dropdown('Primary Phone', 'primary phone dropdown');
export const ssn = pageComponents.cloud.input('SSN', 'ssn');

//common for company and person
export const primaryEmail = pageComponents.cloud.input('Primary Email', 'primary email');
export const secondaryEmail = pageComponents.cloud.input('Secondary Email', 'secondary email');

const tooltip = components.getByCSS(`#gw-messagesLiveRegion`, 'toolTip');

export async function enterPersonContactDetails(contactData: Contact) {
  await test.step(`Enter person details`, async () => {
    await steps.typeText(firstName, contactData.firstName);
    await steps.typeText(lastName, contactData.lastName);
    await steps.typeAndPressTab(homePhone, contactData.homePhone);
    await steps.typeAndPressTab(workPhone, contactData.workPhone);
    await steps.typeAndPressTab(mobilePhone, contactData.mobilePhone);
    if (await pageComponents.cloud.alert().isVisible()) {
      await press(faxPhone, 'Tab');
    }
    await steps.typeText(faxPhone, contactData.faxPhone);
    // await steps.selectOptionByValue(primaryPhone, contactData.primaryPhone);
    await steps.typeText(ssn, contactData.ssn);
    await steps.typeText(primaryEmail, contactData.primaryEmail);
    await steps.typeText(secondaryEmail, contactData.secondaryEmail);
    const n = primaryPhone.getAllTexts();
    await enterAddressDetails(contactData.address);
  });
}

export async function enterCompanyContactDetails(contactData: Contact) {
  await test.step(`Enter company details`, async () => {
    await steps.typeText(companyName, contactData.companyName);
    await steps.typeText(officePhone, contactData.officePhone);
    await steps.typeText(fax, contactData.fax);
    await steps.selectOptionByValue(organizationType, contactData.organizationType);
    await steps.typeText(fein, contactData.fein);
    await steps.typeText(primaryEmail, contactData.primaryEmail);
    await steps.typeText(secondaryEmail, contactData.secondaryEmail);
    await enterAddressDetails(contactData.address);
  });
}

export async function enterContactDetails(contactData: Contact) {
  switch (contactData.contactType) {
    case 'New Person':
    case 'Person':
      await enterPersonContactDetails(contactData);
      break;
    case 'New Company':
      await enterCompanyContactDetails(contactData);
      break;
  }
}
