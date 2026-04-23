import * as pc from '@apps/policy-center/on-prem/index';
import { steps } from '@playwright-utils/steps';
import { component } from '@playwright-utils/utils/components/Component';
import { test } from '@playwright/test';
import { OrganizationData } from '@tests/testdata/types/pc-types';
import { TableComponent } from '@tests/utilities/gw/table-utils';
import { components, pageComponents } from 'test-setup/locator-templates';

export const organizationSearchIcon = pageComponents.shared.searchIcon('Organization', 'organization search icon');
export const organizationName = pageComponents.onprem.input('Organization Name', 'organization Name');
export const producerCode = pageComponents.onprem.dropdown('Producer Code', 'producer code');

export const organizationResultsTable = `[id*='OrganizationSearchResultsLV'] table`;
export const organizationResult = (orgName: string) =>
  components.getByXpath(`//*[text()='${orgName}']`, 'organization results table');

export async function enterOrganizationDetails(organizationData: OrganizationData) {
  await test.step(`Enter organization details`, async () => {
    await steps.click(organizationSearchIcon);
    await steps.typeText(organizationName, organizationData.organizationName);
    await pc.navigate.clickSearch();
    await organizationResult(organizationData.organizationName!).waitForVisible();
    const org1stResult = await get1stResultSelectLocator(organizationData);
    await steps.click(component(() => org1stResult!, 'Select 1st result'));
    await steps.selectOptionByText(producerCode, organizationData.producerCode);
  });
}

export async function get1stResultSelectLocator(organizationData: OrganizationData) {
  let org1stResultLocator;
  await test.step(`Enter organization details`, async () => {
    const organizationResultstable = new TableComponent(organizationResultsTable);
    org1stResultLocator = await organizationResultstable.getcolumnLocators(
      '1',
      organizationData.organizationName!,
      '0',
    );
  });
  return org1stResultLocator;
}
