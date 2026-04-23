import { steps } from '@playwright-utils/steps';
import test from '@playwright/test';
import { Contact } from '@testdata/types/common-types';
import { pageComponents } from 'test-setup/locator-templates';
import { enterAddressDetails } from './address';

//Company
export const companyName = pageComponents.onprem.input('Name', 'company name');
export const officePhone = pageComponents.onprem.input('Office Phone', 'office phone');
export const fax = pageComponents.onprem.input('Fax', 'fax');
export const organizationType = pageComponents.onprem.dropdown('Organization Type', 'organization type');
export const fein = pageComponents.onprem.input('FEIN', 'fein');

//Person
export const firstName = pageComponents.onprem.input('First name', 'first name');
export const lastName = pageComponents.onprem.input('Last name', 'last name');
export const homePhone = pageComponents.onprem.input('Home Phone', 'home phone');
export const workPhone = pageComponents.onprem.input('Work Phone', 'work phone');
export const mobilePhone = pageComponents.onprem.input('Mobile Phone', 'mobile phone');
export const faxPhone = pageComponents.onprem.input('Fax Phone', 'fax phone');
export const primaryPhone = pageComponents.onprem.dropdown('Primary Phone', 'primary phone');
export const ssn = pageComponents.onprem.input('SSN', 'ssn');

//common for company and person
export const primaryEmail = pageComponents.onprem.input('Primary Email', 'primary email');
export const secondaryEmail = pageComponents.onprem.input('Secondary Email', 'secondary email');

export async function enterPersonContactDetails(contactData: Contact) {
  await test.step(`Enter person details`, async () => {
    await steps.typeText(firstName, contactData.firstName);
    await steps.typeText(lastName, contactData.lastName);
    await steps.typeAndPressTab(homePhone, contactData.homePhone);
    await steps.typeAndPressTab(workPhone, contactData.workPhone);
    await steps.typeAndPressTab(mobilePhone, contactData.mobilePhone);
    await steps.click(secondaryEmail);
    await steps.typeText(faxPhone, contactData.faxPhone);
    await steps.selectOptionByText(primaryPhone, contactData.primaryPhone);
    await steps.typeText(ssn, contactData.ssn);
    await steps.typeText(primaryEmail, contactData.primaryEmail);
    await steps.typeText(secondaryEmail, contactData.secondaryEmail);
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
