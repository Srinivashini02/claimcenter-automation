import { logger } from '@logger';
import { steps } from '@playwright-utils/steps';
import test from '@playwright/test';
import { getStateInfo } from '@testdata/commons/address-utils';
import { Address } from '@testdata/types/common-types';
import { pageComponents } from 'test-setup/locator-templates';

const address1 = pageComponents.onprem.input('Address 1', 'address 1');
const address2 = pageComponents.onprem.input('Address 2', 'address 2');
const address3 = pageComponents.onprem.input('Address 3', 'address 3');

const countryField = pageComponents.onprem.dropdown(`Country`, 'country');
const cityField = pageComponents.onprem.input(`City`, 'city');
const countyField = pageComponents.onprem.input(`County`, 'county');
const StateField = pageComponents.onprem.dropdown(`State`, 'state');
const zipCodeField = pageComponents.onprem.textInput(`ZIP Code`, 'ZIP code');
const addressType = pageComponents.onprem.dropdown(`Address Type`, 'address type');

export async function enterAddressDetails(addressData: Address | undefined) {
  if (!addressData) {
    logger.warn('Skipping entering address details as address data is empty');
    return;
  }
  await test.step(`Enter address details`, async () => {
    const stateValue: string = getStateInfo(addressData.state!, true)!;
    await steps.typeText(address1, addressData.address1);
    await steps.typeText(address2, addressData.address2);
    await steps.typeText(address3, addressData.address3);
    await steps.typeText(cityField, addressData.city);
    await steps.typeText(countyField, addressData.county);
    await zipCodeField.waitForStable();
    await steps.pressSequentially(zipCodeField, addressData.zipCode, { delay: 400 });
    await steps.typeText(zipCodeField, addressData.zipCode);
    await StateField.waitForStable();
    await steps.selectOptionByText(StateField, stateValue);
    await steps.selectOptionByText(countryField, addressData.country);
    await addressType.waitForStable();
    await steps.selectOptionByText(addressType, addressData.addressType);
  });
}
