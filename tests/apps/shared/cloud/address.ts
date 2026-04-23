import { logger } from '@logger';
import { steps } from '@playwright-utils/steps';
import test from '@playwright/test';
import { getStateInfo } from '@testdata/commons/address-utils';
import { Address } from '@testdata/types/common-types';
import { pageComponents } from 'test-setup/locator-templates';

const address1 = pageComponents.cloud.input('Address 1', 'address 1');
const address2 = pageComponents.cloud.input('Address 2', 'address 2');
const address3 = pageComponents.cloud.input('Address 3', 'address 3');

const countryField = pageComponents.cloud.dropdown(`Country`, 'country');
const cityField = pageComponents.cloud.textInput(`City`, 'city');
const countyField = pageComponents.cloud.input(`County`, 'county');
const StateField = pageComponents.cloud.dropdown(`State`, 'state');
const zipCodeField = pageComponents.cloud.textInput(`ZIP Code`, 'ZIP code');
const addressType = pageComponents.cloud.dropdown(`Address Type`, 'address type');

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
    await steps.typeText(zipCodeField, addressData.zipCode);
    await steps.selectOptionByText(StateField, stateValue);
    await steps.selectOptionByText(countryField, addressData.country);
    await steps.selectOptionByText(addressType, addressData.addressType);
  });
}
