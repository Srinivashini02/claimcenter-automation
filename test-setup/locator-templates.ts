import { getLocator, getLocatorByLabel, getLocatorByRole, getLocatorByTestId, getLocatorByText } from '@locator-utils';
import { GetByRoleOptions, GetByRoleTypes } from '@parameter-types';
import { component } from '@playwright-utils';
import { Locator, Page } from '@playwright/test';

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
    textarea: (label: string | RegExp, alias?: string) => {
      return component(() => getLocatorByLabel(label).locator('textarea'), alias);
    },

    link: (label: string | RegExp, alias?: string) => {
      return component(() => getLocatorByRole('link', { name: `${label}` }), alias);
    },
    button: (label: string | RegExp, alias?: string) => {
      return component(() => getLocatorByRole('button', { name: `${label}` }), alias);
    },
    buttonexp: (page: Page, name: string, description?: string): Locator => {
      return page.getByRole('button', { name: new RegExp(`^${name}$`, 'i') });
    },
    searchButton: (label: string | RegExp = /Search/i, alias?: string) => {
      return component(() => getLocatorByRole('link', { name: label, exact: true }), alias);
    },
    okButton: (page: Page, name?: string): Locator => {
      return page.getByRole('button', { name: new RegExp(name ?? 'ok', 'i') });
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
    exposuresMenu: (page: Page, name?: string): Locator => {
      return page.getByRole('menuitem', { name: new RegExp(name ?? 'exposures', 'i') });
    },
    exposureCheckbox: (page: Page, index: number = 0): Locator => {
      return page.getByRole('checkbox').nth(index);
    },
    createReserveButton: (page: Page, name?: string): Locator => {
      return page.getByRole('button', { name: new RegExp(name ?? 'create reserve', 'i') });
    },
    reserveCheckbox: (page: Page, index: number = 0): Locator => {
      return page.getByRole('checkbox').nth(index);
    },
    reserveCostTypeDropdown: (page: Page, index: number = 0): Locator => {
      return page.locator('select[name$="CostType"]').nth(index);
    },
    reserveCostCategoryDropdown: (page: Page, index: number = 0): Locator => {
      return page.locator('select[name$="CostCategory"]').nth(index);
    },
    reserveAmountField: (page: Page, index: number = 0): Locator => {
      return page.locator('input[name$="NewAmount"]').nth(index);
    },
    saveButton: (page: Page, name?: string): Locator => {
      return page.getByRole('button', { name, exact: true });
    },
    workplanMenuItem: (page: Page): Locator => {
      return page.getByText('Workplan', { exact: true });
    },
    selectAllActivitiesCheckbox: (page: Page): Locator => {
      return page.getByRole('checkbox', { name: /select rows/i });
    },
    completeButton: (page: Page, name?: string): Locator => {
      return page.getByRole('button', { name, exact: true });
    },
    exposureMenuItem: (page: Page): Locator => {
      return page.locator('#Claim-MenuLinks-Claim_ClaimExposures').getByRole('menuitem');
    },
    closeExpoBtn: (page: Page, name?: string): Locator => {
      return page.getByRole('button', { name, exact: true });
    },
    notesTextArea: (page: Page): Locator => {
      return page.locator('textarea[name="CloseExposurePopup-CloseExposureScreen-CloseExposureInfoDV-Note"]');
    },
    closeClaimNotes: (page: Page): Locator => {
      return page.locator('textarea[name="CloseClaimPopup-CloseClaimScreen-CloseClaimInfoDV-Note"]');
    },
    outcomeDropdown: (page: Page): Locator => {
      return page.locator('[id*="CloseExposurePopup"]').getByRole('combobox');
    },
    outcomecloseclaim: (page: Page): Locator => {
      return page.locator('[id*="CloseClaimPopup"]').getByRole('combobox');
    },
    actionsButton: (page: Page): Locator => {
      return page.getByRole('button', { name: /actions/i });
    },
    closeClaimMenuItem: (page: Page): Locator => {
      return page.getByRole('menuitem', { name: /close claim/i });
    },
    textPolicy: (label: string | RegExp, alias?: string) => {
      return component(
        () =>
          getLocatorByText(label).locator('xpath=ancestor::div[contains(@class,"gw-InputWidget")]').locator('input'),
        alias,
      );
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
    reportedByName: (alias?: string) => {
      const selector = 'select[name*="ReportedBy_Name"]';
      return component(() => getLocator(selector).first(), alias);
    },
    reportedByNameOn: (alias?: string) => {
      const xpath =
        '//*[@id="FNOLWizard-FullWizardStepSet-FNOLWizard_BasicInfoScreen-PanelRow-BasicInfoDetailViewPanelDV-ReportedBy_Name"]/div[1]/div/select';
      return component(() => getLocator(`xpath=${xpath}`), alias);
    },
    dropdown: (label: string | RegExp, alias?: string, table: boolean = false) => {
      if (table) {
        return component(() => getLocator(`//tr[contains(., '${label}')]//select`), alias);
      }
      return component(() => getLocatorByLabel(`${label}`, { exact: true }).locator(`select`), alias);
    },
    claimantDropdown: (page: Page, name?: string): Locator => {
      return page
        .getByRole('combobox', { name: new RegExp(name ?? 'claimant', 'i') })
        .or(page.locator('select[name$="Claimant_Picker"]'));
    },
    dropdownval: (label: string | RegExp, alias?: string) => {
      return component(
        () => getLocatorByText(label).locator('xpath=ancestor::*[contains(@class,"gw-InputWidget")]//select').first(),
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
    radioOption: (label: string | RegExp, alias?: string) => {
      return component(() => getLocatorByRole('radio', { name: label }), alias);
    },
    textPolicyNumber: (label: string | RegExp, alias?: string) => {
      return component(
        () =>
          getLocatorByText(label).locator('xpath=ancestor::div[contains(@class,"gw-InputWidget")]').locator('input'),
        alias,
      );
    },
    statedropdown: (label: string | RegExp, alias?: string) => {
      return component(
        () =>
          getLocatorByText(label)
            .locator('xpath=ancestor::*[contains(@class,"gw-InputWidget")]')
            .locator(`//select[contains(@name,'GlobalAddressInputSet-State')]`),
        alias,
      );
    },
    optionsMenu: (label: string | RegExp, alias?: string) => {
      return component(() => {
        return getLocatorByText(label)
          .locator('xpath=ancestor::div[contains(@class,"gw-InputWidget")]')
          .first()
          .locator('div[role="button"][aria-label="options"]');
      }, alias);
    },
    submenuItem: (label: string | RegExp, alias?: string) => {
      return component(() => {
        return getLocatorByRole('menuitem', { name: label });
      }, alias);
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
        const fallback = getLocator('div[role="button"]').filter({ has: getLocator(`[aria-label="${label}"]`) });
        return primary.or(fallback).first();
      }, alias);
    },
    buttonOptions: (label: string | RegExp, alias?: string) => {
      return component(
        () =>
          getLocatorByText(label)
            .locator('xpath=ancestor::div[contains(@class,"gw-InputWidget")]')
            .locator('div[role="button"][aria-label="options"]'),
        alias,
      );
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
      return component(
        () =>
          getLocatorByText(label)
            .locator('xpath=ancestor::*[contains(@class,"gw-InputWidget")]')
            .locator(`//select[contains(@name,'GlobalAddressInputSet-State')]`),
        alias,
      );
    },
    dropdownval: (label: string | RegExp, alias?: string) => {
      return component(
        () => getLocatorByText(label).locator('xpath=ancestor::*[contains(@class,"gw-InputWidget")]//select'),
        alias,
      );
    },
    radioOption: (label: string | RegExp, alias?: string) => {
      return component(() => getLocatorByRole('radio', { name: label }), alias);
    },
    hoverMenu: (label: string | RegExp, alias?: string) => {
      return component(() => getLocatorByRole('menuitem', { name: label }).locator('..'), alias);
    },
    clickbutton: () => {
      return component(() =>
        getLocator(
          '#FNOLWizard-FNOLWizard_FindPolicyScreen-FNOLWizardFindPolicyPanelSet-NewClaimPolicyGeneralPanelSet-NewClaimPolicyGeneralDV-Insured_Name-Insured_NameMenuIcon div[role="button"]',
        ),
      );
    },
    topSearch: (label: string | RegExp, alias?: string) => {
      return component(() => getLocator(`//*[@aria-label='${label}']`), alias);
    },
    searchItem: (label: string | RegExp, alias?: string) => {
      return component(() => getLocatorByRole('menuitem').filter({ hasText: label }), alias);
    },
    textPolicy: (label: string | RegExp, alias?: string) => {
      return component(
        () =>
          getLocatorByText(label).locator('xpath=ancestor::div[contains(@class,"gw-InputWidget")]').locator('input'),
        alias,
      );
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
      return component(
        () =>
          getLocatorByText(label).locator('xpath=ancestor::div[contains(@class,"gw-InputWidget")]').locator('input'),
        alias,
      );
    },
    optionsMenu: (label: string | RegExp, alias?: string) => {
      return component(() => {
        return getLocatorByText(label)
          .locator('xpath=ancestor::div[contains(@class,"gw-InputWidget")]')
          .first()
          .locator('div[role="button"][aria-label="options"]');
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
    menuitemexp: (page: Page, name: string, description?: string): Locator => {
      return page.getByRole('menuitem', { name: new RegExp(`^${name}$`, 'i') });
    },
    searchIcon: (label: string, alias?: string) => {
      return component(() => getLocatorByLabel(`${label}`).getByRole(`button`), alias);
    },
    submenuItem: (label: string | RegExp, alias?: string) => {
      return component(() => {
        return getLocatorByRole('menuitem', { name: label });
      }, alias);
    },
  },
};

// export const locators = {
//   getByTestId: (testId: string | RegExp, attributeName?: string) => {
//     return () => getLocatorByTestId(testId, attributeName);
//   },
//   getByLabel: (label: string | RegExp, options?: GetByRoleOptions) => {
//     return () => getLocatorByLabel(label, options);
//   },
// };
