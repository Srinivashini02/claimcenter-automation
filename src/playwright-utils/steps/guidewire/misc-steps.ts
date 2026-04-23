import { logger } from '@logger';
import { test } from '@pagesetup';
import { Component, component } from '@playwright-utils';
import * as p from 'src/playwright-utils';
import { pageComponents } from 'test-setup/locator-templates';
import { RetryOptions, performStep } from '@playwright-utils/utils/step-executor';

export async function selectDropdownValue(
  locator: Component,
  option: string | undefined,
  options?: p.StepOptions,
): Promise<void> {
  let description: string = `selecting option '${option}' in the element '${locator.alias}'`;
  let retryOptions: RetryOptions = { retries: 1, delay: 500 };
  let validate: boolean = false;
  if (options) {
    if (options.description) description = options.description;
    if (options.retryOptions) retryOptions = options.retryOptions;
    if (options.validate) validate = options.validate;
  }
  if (!option) {
    logger.warn(`skipping select action for the element ${locator.alias} as the value is undefined`);
    return;
  }
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
  if (validate) {
    await performStep({ description, action, retryOptions });
  } else {
    await performStep({ description, action, assertFn, retryOptions });
  }
  logger.info(`selected value '${option}' in the dropdown '${locator.alias}'`);
}

// TODO: need to implement validate function
export async function selectYesOrNoButton(questionLabel: string, option?: string, options?: p.StepOptions) {
  let description: string = `selecting option '${option}' in the element '${questionLabel}'`;
  let retryOptions: RetryOptions = { retries: 1, delay: 500 };
  let validate: boolean = false;
  if (options) {
    if (options.description) description = options.description;
    if (options.retryOptions) retryOptions = options.retryOptions;
    if (options.validate) validate = options.validate;
  }
  if (!option) {
    logger.warn(`skipping select action for the element '${questionLabel}' as the value is undefined`);
    return;
  }
  const action = async () => {
    const selector = `//*[text()="${questionLabel}"]/ancestor::*[contains(@class,'Container')]//div[contains(@class,'jut__ToggleField')]/button[text()='${option}']`;
    const locator = p.LocatorUtils.getLocator(selector);
    await locator.click();
  };
  await performStep({ description, action, retryOptions: retryOptions });
  logger.info(`selected radio option '${option}' for the question '${questionLabel}'`);
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

export async function assertDropDownSelectedValue(
  component: Component,
  expectedValue: string,
  options?: p.ExpectOptions,
  description?: string,
) {
  const stepDesc = description
    ? description
    : `asserting dropdown '${component.alias}' to have value '${expectedValue}'`;
  await test.step(stepDesc, async () => {
    const locator = component.getLocator().locator('//../../div[1]');
    await p.expectElementToHaveText(locator, expectedValue, options);
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
