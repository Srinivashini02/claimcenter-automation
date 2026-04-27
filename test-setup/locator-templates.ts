import { getLocator, getLocatorByLabel, getLocatorByRole, getLocatorByTestId, getLocatorByText } from '@locator-utils';
import { GetByRoleOptions, GetByRoleTypes } from '@parameter-types';
import { component } from '@playwright-utils';

export const components = {
  getByTestId: (testId: string | RegExp, alias?: string, attributeName?: string) => {
    return component(() => getLocatorByTestId(testId, attributeName), alias);
  },
  getByLabel: (label: string | RegExp, alias?: string, options?: GetByRoleOptions) => {
    return component(() => getLocatorByLabel(label, options), alias);
  },
  getByXpath: (xpath: string, alias?: string) => {
    return component(xpath, alias);
  },
  getByCSS: (css: string, alias?: string) => {
    return component(css, alias);
  },
  getByRole: (role: GetByRoleTypes, options?: GetByRoleOptions, alias?: string) => {
    return component(() => getLocatorByRole(role, options), alias);
  },
  getByText: (role: GetByRoleTypes, options?: GetByRoleOptions, alias?: string) => {
    return component(() => getLocatorByText(role, options), alias);
  },
};

export const pageComponents = {
  onprem: {
    input: (label: string | RegExp, alias?: string) => {
      return component(() => getLocatorByLabel(label, { exact: true }).locator('//input'), alias);
    },
    textInput: (label: string | RegExp, alias?: string) => {
      return component(() => getLocatorByLabel(label).locator(`//*[@class='gw-vw--value']//input`), alias);
    },
    link: (label: string | RegExp, alias?: string) => {
      return component(() => getLocatorByRole('link', { name: `${label}` }), alias);
    },
    button: (label: string | RegExp, alias?: string) => {
      return component(() => getLocatorByRole('button', { name: `${label}` }), alias);
    },
    searchButton: (label: string | RegExp = /Search/i, alias?: string) => {
      return component(() => getLocatorByRole('link', { name: label, exact: true }), alias);
    },
    claimTab: (alias?: string) => {
      return component(() => getLocator('#TabBar-ClaimTab > .gw-action--inner'), alias);
    },
    claimTabExpandButton: (alias?: string) => {
      return component(() => getLocator('#TabBar-ClaimTab > .gw-action--expand-button'), alias);
    },
    newClaimMenuItem: (alias?: string) => {
      return component(() => getLocator('#TabBar-ClaimTab .gw-subMenu >> text=New Claim'), alias);
    },
    // newClaimButton: (label: string | RegExp = /New Claim/i, alias?: string) => {
    //   return component(() => getLocatorByRole('menuitem', { name: label, exact: true }), alias);
    // },
    searchItem: (label: string | RegExp, alias?: string) => {
      return component(() => getLocatorByRole('menuitem').filter({ hasText: label }), alias);
    },
    textPolicy: (label: string | RegExp, alias?: string) => {
      return component(() => getLocatorByText(label).locator('xpath=ancestor::div[contains(@class,"gw-InputWidget")]').locator('input'), alias);
    },
    buttonExp: (label: string | RegExp, alias?: string) => {
      return component(
        () => getLocatorByText(label).locator('../ancestor::tr[1]/td[1]').getByRole('link', { name: 'Select' }),
        alias,
      );
    },
    actionItem: (label: string | RegExp, alias?: string) => {
      return component(() => getLocatorByRole('menuitem', { name: `${label}` }), alias);
    },
    topMenuDropdown: (label: string | RegExp, alias?: string) => {
      return component(() => getLocator(`//*[text()='${label}']/../../*[@class='gw-action--expand-button']`), alias);
    },
    reportedByNameOn: (alias?: string) => {
      const selector = 'select[name="FNOLWizard-FullWizardStepSet-FNOLWizard_BasicInfoScreen-PanelRow-BasicInfoDetailViewPanelDV-ReportedBy_Name"]';
      return component(() => getLocator(selector).first(), alias);
    },
    dropdown: (label: string | RegExp, alias?: string, table: boolean = false) => {
      if (table) {
        return component(() => getLocator(`//tr[contains(., '${label}')]//select`), alias);
      }
      return component(
        () => getLocatorByLabel(`${label}`, { exact: true }).locator(`//*[@class='gw-vw--value']//select`),
        alias,
      );
    },
    // Radio button helpers for table-based questions
    radioInTableRow: (questionText: string | RegExp, answerText: string, alias?: string) => {
      // Finds a row with the question text, then selects the radio with the answer text
      return component(
        () =>
          getLocator(
            `//*[contains(text(),'${questionText}')]/ancestor::tr[1]//label[contains(., '${answerText}')]//input[@type='radio']`,
          ),
        alias,
      );
    },
    yesOrNoRadio: (label: string | RegExp, answerValue: 'Yes' | 'No', alias?: string) => {
      return component(() => getLocatorByText(label).locator(`//..//label[contains(., '${answerValue}')]`), alias);
    },
    pageTitle: (label: string, alias?: string) => {
      return component(() => getLocatorByRole('heading', { name: label }), alias);
    },
  },

  cloud: {
    pageTitle: (label: string, alias?: string, useContains = false) => {
      if (useContains)
        return component(() => getLocatorByRole('heading').locator(`//../*[contains(text(),'${label}')]`), alias);
      return component(() => getLocatorByRole('heading', { name: label }), alias);
    },
    button: (label: string | RegExp, alias?: string) => {
      return component(() => {
        const primary = getLocatorByRole('button', { name: label, exact: true });
        const fallback = getLocator('div[role="button"]').filter({ has: getLocator(`[aria-label="${label}"]`), });
        return primary.or(fallback).first();
      }, alias);
    },
    buttonOptions: (label: string | RegExp, alias?: string) => {
      return component(() => getLocatorByText(label).locator('xpath=ancestor::div[contains(@class,"gw-InputWidget")]').locator('div[role="button"][aria-label="options"]'), alias);
    },
    // select: (label: string | RegExp, alias?: string) => {
    //   return component(() => {
    //     return getLocatorByLabel(label, { exact: true }).locator('xpath=ancestor::div[contains(@class,"gw-InputWidget")]').locator('//*[@class="gw-vw--value"]//select');
    //   }, alias);
    // },
    input: (label: string | RegExp, alias?: string, useExact = true) => {
      return component(() => getLocatorByLabel(label, { exact: useExact }), alias);
    },
    textInput: (label: string | RegExp, alias?: string) => {
      return component(() => getLocatorByLabel(label).locator('//input'), alias);
    },
    dropdown: (label: string | RegExp, alias?: string) => {
      return component(() => getLocatorByText(`${label}`).locator('..//select'), alias);
    },
    statedropdown: (label: string | RegExp, alias?: string) => {
      return component(() => getLocatorByText(label).locator('xpath=ancestor::*[contains(@class,"gw-InputWidget")]').locator(`//select[contains(@name,'GlobalAddressInputSet-State')]`), alias);
    },
    dropdownval: (label: string | RegExp, alias?: string) => {
      return component(() => getLocatorByText(label).locator('xpath=ancestor::*[contains(@class,"gw-InputWidget")]//select'), alias);
    },
    radioOption: (label: string | RegExp, alias?: string) => {
      return component(() => getLocatorByRole('radio', { name: label }), alias);
    },
    hoverMenu: (label: string | RegExp, alias?: string) => {
      return component(() => getLocatorByRole('menuitem', { name: label }).locator('..'), alias);
    },
    clickbutton: () => {
      return component(() => getLocator('#FNOLWizard-FNOLWizard_FindPolicyScreen-FNOLWizardFindPolicyPanelSet-NewClaimPolicyGeneralPanelSet-NewClaimPolicyGeneralDV-Insured_Name-Insured_NameMenuIcon div[role="button"]'))
    },
    topSearch: (label: string | RegExp, alias?: string) => {
      return component(() => getLocator(`//*[@aria-label='${label}']`), alias);
    },
    searchItem: (label: string | RegExp, alias?: string) => {
      return component(() => getLocatorByRole('menuitem').filter({ hasText: label }), alias);
    },
    textPolicy: (label: string | RegExp, alias?: string) => {
      return component(() => getLocatorByText(label).locator('xpath=ancestor::div[contains(@class,"gw-InputWidget")]').locator('input'), alias);
    },
    reportedByName: (alias?: string) => {
      const selector = 'select[name*="ReportedBy_Name"]';
      return component(() => getLocator(selector).first(), alias);
    },
    // optionsMenu: (fieldLabel: string | RegExp, alias?: string) => {
    //   return component(() => {
    //     return getLocatorByLabel(fieldLabel, { exact: true }).locator('xpath=ancestor::div[contains(@class,"gw-InputWidget")]').locator('div[role="button"][aria-label="options"]');
    //   }, alias);
    // },
    textPolicyNumber: (label: string | RegExp, alias?: string) => {
      return component(() => getLocatorByText(label).locator('xpath=ancestor::div[contains(@class,"gw-InputWidget")]').locator('input'), alias);
    },
    optionsMenu: (label: string | RegExp, alias?: string) => {
      return component(() => {
        return getLocatorByText(label).locator('xpath=ancestor::div[contains(@class,"gw-InputWidget")]').first().locator('div[role="button"][aria-label="options"]');
      }, alias);
    },
    topMenuDropdown: (label: string | RegExp, alias?: string) => {
      return component(
        () => getLocator(`//*[@aria-label='${label}']/../../*[@class='gw-action--expand-button']`),
        alias,
      );
    },
    alert: () => {
      return component(
        () => getLocatorByRole('alert').locator(`//../div[@aria-roledescription='tooltip']`),
        'alert/popup',
      );
    },
  },

  shared: {
    menuItem: (label: string, alias?: string) => {
      return component(() => getLocatorByRole('menuitem').locator(`//*[contains(text(),'${label}')]/..`), alias);
    },
    searchIcon: (label: string, alias?: string) => {
      return component(() => getLocatorByLabel(`${label}`).getByRole(`button`), alias);
    },
    submenuItem: (label: string | RegExp, alias?: string) => {
      return component(() => {
        return getLocatorByRole('menuitem', { name: label });
      }, alias);
    },
  }
};

// export const locators = {
//   getByTestId: (testId: string | RegExp, attributeName?: string) => {
//     return () => getLocatorByTestId(testId, attributeName);
//   },
//   getByLabel: (label: string | RegExp, options?: GetByRoleOptions) => {
//     return () => getLocatorByLabel(label, options);
//   },
// };
