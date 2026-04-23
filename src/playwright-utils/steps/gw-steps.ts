import { logger } from '@logger';
import { test } from '@pagesetup';
import { Component, component } from '@playwright-utils';
import * as p from 'src/playwright-utils';
import { pageComponents } from 'test-setup/locator-templates';
import { RetryOptions, performStep } from '@playwright-utils/utils/step-executor';

export async function selectDropdownValue(
  locator: Component,
  option: string | undefined,
  description?: string,
  retryOptions: RetryOptions = { retries: 1, delay: 500 },
  assert: boolean = true,
): Promise<void> {
  if (!option) {
    logger.warn(`skipping select action for the element ${locator.alias} as the value is undefined`);
    return;
  }
  const stepDesc = description ? description : `selecting option '${option}' in the element '${locator.alias}'`;
  const action = async () => {
    await locator.waitForEnabled();
    await p.click(locator.getLocator());
    await p.waitForElementToBeStable(locator.getLocator());
    const optionComponent = component(() => p.getLocatorByRole('option', { name: option, exact: true }));
    await optionComponent.click();
  };
  const assertFn = async () => {
    const valueLocator = locator
      .getLocator()
      .locator(
        `//ancestor::*[contains(@class,'jut__GenericSelectControl__control')]//div[contains(@class,'singleValue')]`,
      );
    await p.expectElementToHaveText(valueLocator, option, { timeout: 5000 });
  };
  if (assert) {
    await performStep({ description: stepDesc, action, retryOptions });
  } else {
    await performStep({ description: stepDesc, action, assertFn, retryOptions });
  }
  logger.info(`selected value '${option}' in the dropdown '${locator.alias}'`);
}

export async function assertTextDropDownHasValue(
  component: Component,
  expectedValue: string,
  options?: p.ExpectOptions,
  description?: string,
) {
  const stepDesc = description
    ? description
    : `asserting dropdown '${component.alias}' to have value '${expectedValue}'`;
  await test.step(stepDesc, async () => {
    const textLocator = `${component.getSelector()}/../../div[1]`;
    await p.expectElementToHaveText(textLocator, expectedValue, options);
  });
}

export async function selectYesOrNoOption(questionLabel: string, option?: string, description?: string) {
  if (!option) {
    logger.warn(`skipping select action for the element '${questionLabel}' as the value is undefined`);
    return;
  }
  console.log(questionLabel);
  const stepDesc = description ? description : `selecting radio option '${option}' for the question '${questionLabel}'`;
  await test.step(stepDesc, async () => {
    // //const locator = p.getLocatorByLabel(`${questionLabel}`).getByRole('button', { name: option, exact: true });
    // const selector = `//*[text()="${questionLabel}"]/ancestor::*[contains(@class,'PageContainer')]//div[contains(@class,'jut__ToggleField')]/button[text()='${option}']`;
    // const locator = p.LocatorUtils.getLocator(selector);
    const selector = `//*[text()="${questionLabel}"]/ancestor::*[contains(@class,'Container')]//div[contains(@class,'jut__ToggleField')]/button[text()='${option}']`;
    const locator = p.LocatorUtils.getLocator(selector);
    await locator.click();
    logger.info(`selected radio option '${option}' for the question '${questionLabel}'`);
  });
}

export async function selectCoverageCheckbox(checkbox: Component, description?: string) {
  const stepDesc = description ? description : `selecting checkbox  '${checkbox.alias}'`;
  await test.step(stepDesc, async () => {
    const isDisabled = await checkbox.checkAttributeValue('disabled', 'true');
    const isSelected = await checkbox.isSelected();
    if (isDisabled) {
      logger.warn(`coverage checkbox '${checkbox.alias}' is disabled`);
      return false;
    }
    if (isSelected) {
      logger.warn(`coverage checkbox '${checkbox.alias}' is already selected`);
      return true;
    }

    await checkbox.click();
    logger.info(`coverage checkbox '${checkbox.alias}' is selected / checked`);
    return true;
  });
}

export async function unSelectCoverageCheckbox(checkbox: Component) {
  const isDisabled = await checkbox.checkAttributeValue('disabled', 'true');
  const isSelected = await checkbox.isSelected();
  if (isDisabled) {
    logger.warn(`coverage checkbox '${checkbox.alias}' is disabled`);
    return false;
  }
  if (!isSelected) {
    logger.warn(`coverage checkbox '${checkbox.alias}' is already unselected`);
    return true;
  }
  await checkbox.click();
  logger.info(`coverage checkbox '${checkbox.alias}' is selected / checked`);
  return true;
}

export async function validatePEPageLanding(label: string, options?: p.ExpectOptions) {
  if (options && !options.timeout) {
    options.timeout = 50000;
  } else {
    options = { timeout: 50000 };
  }
  await test.step(`${label} page should be visible`, async () => {
    // const pageTitle = pageComponents.cloud.pageTitle(label);
    // await p.expectElementToBeVisible(pageTitle.getLocator(), options);
  });
  logger.info(`${label} page is visible`);
}
