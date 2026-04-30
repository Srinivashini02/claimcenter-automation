import { logger } from '@logger';
import { test } from '@pagesetup';
import * as p from 'src/playwright-utils/utils';
import { Component, waitForAllRequests } from '@playwright-utils';
import {
  ClearOptions,
  ClickOptions,
  FillOptions,
  GotoOptions,
  HoverOptions,
  PressSequentiallyOptions,
  RetryOptions,
  SelectOptions,
  StabilityOption,
  StepOptions,
  TimeoutOption,
  VisibilityOption,
} from '@parameter-types';

export type FocusOptions = TimeoutOption & VisibilityOption & StabilityOption;

/**
 * clicks on a specific element and adds a step in playwright report
 * @param component - component containing locator details
 * @param options - optional, the click options
 * @param description - optional, step description
 */
export async function clickAndWait(component: Component, options?: ClickOptions, description?: string) {
  await click(component, options, description);
  await waitForAllRequests();
}

/**
 * waits for a given time in milliseconds
 * @param timeout - timeout in milliseconds
 * @param description - optional, step description
 */
export async function wait(timeout: number, description?: string) {
  const stepDesc = description ? description : `waiting for ${timeout / 1000} seconds`;
  await test.step(stepDesc, async () => {
    await p.wait(timeout);
  });
}

/**
 * clears a given locator, locator should be an input field
 * @param component - component object containing locator details
 * @param options - optional, clear options
 * @param description - optional, step description
 */
export async function clear(component: Component, options?: ClearOptions, description?: string) {
  const stepDesc = description ? description : `clearing field ${component.alias}`;
  await test.step(stepDesc, async () => {
    await p.clear(component.getLocator(), options);
  });
}

/**
 * focus on a given locator
 * @param component - component containing locator details
 * @param options - focus options , optional
 * @param description - custom description, optional
 */
export async function focus(component: Component, options?: FocusOptions, description?: string) {
  const stepDesc = description ? description : `focusing on element ${component.alias}`;
  await test.step(stepDesc, async () => {
    await p.focus(component.getLocator(), options);
  });
}

/**
 * navigate to a given url
 * @param url - url in string to navigate
 * @param options - goto options
 * @param description - custom description
 */
export async function goto(url: string, options?: GotoOptions, description?: string) {
  const stepDesc = description ? description : `navigating to url ${url}`;
  await test.step(stepDesc, async () => {
    await p.gotoURL(url, options);
  });
  logger.info(`navigating to URL : '${url}'`);
}

export async function hover(component: Component, options?: HoverOptions, description?: string) {
  const stepDesc = description ? description : `hovering mouse on element ${component.alias}`;
  await test.step(stepDesc, async () => {
    await p.hover(component.getLocator(), options);
  });
}

export async function acceptAlert(component: Component, options?: TimeoutOption, description?: string) {
  const stepDesc = description ? description : `accepting alert ${component.alias}`;
  await test.step(stepDesc, async () => {
    await p.acceptAlert(component.getLocator(), options);
  });
}

export async function dismissAlert(component: Component, options?: TimeoutOption, description?: string) {
  const stepDesc = description ? description : `dismissing alert ${component.alias}`;
  await test.step(stepDesc, async () => {
    await p.dismissAlert(component.getLocator(), options);
  });
}

export async function clickUsingEvent(component: Component, description?: string) {
  const stepDesc = description ? description : `click on the element ${component.alias} using dispatch event`;
  await test.step(stepDesc, async () => {
    await p.getLocator(component.getLocator()).dispatchEvent('click');
  });
}

export async function click(component: Component, options?: ClickOptions, description?: string) {
  const stepDesc = description ? description : `click on element '${component.alias}'`;
  await test.step(stepDesc, async () => {
    await p.click(component.getLocator(), options);
  });
  logger.info(`clicked on element '${component.alias}'`);
  // logger.info(`clicked on element '${component.alias}'`);
}

export async function press(
  component: Component,
  key: string,
  options?: PressSequentiallyOptions,
  description?: string,
) {
  const stepDesc = description ? description : `pressing key ${key} in the element ${component.alias}`;
  await test.step(stepDesc, async () => {
    await p.pressLocatorKeyboard(component.getLocator(), key, options);
  });
}

export async function selectOptionByText(
  component: Component,
  value: string | undefined,
  options?: SelectOptions,
  description?: string,
) {
  if (!value) {
    logger.warn(`skipping select action for the element ${component.alias} as the value is undefined`);
    return;
  }
  const stepDesc = description
    ? description
    : `selecting option ${value} in the element ${component.alias} by using value attribute`;
  await test.step(stepDesc, async () => {
    await p.selectByText(component.getLocator(), value, options);
  });
}

export async function selectOptionByPartialText(
  component: Component,
  value: string | undefined,
  options?: SelectOptions,
  description?: string,
) {
  if (!value) return;

  const stepDesc = description || `Selecting option containing "${value}" in ${component.alias}`;

  await test.step(stepDesc, async () => {
    const dropdown = component.getLocator();

    // Find the option using Playwright's built-in partial text matcher
    const targetOption = dropdown.locator('option').filter({ hasText: value }).first();

    // Get the exact text as it appears in the DOM
    const exactLabel = await targetOption.innerText();

    // Select using the exact label derived from the partial match
    await dropdown.selectOption({ label: exactLabel.trim() }, options);

    logger.info(`Successfully selected partial match: "${exactLabel.trim()}"`);
  });
}

export async function selectOptionByValue(
  component: Component,
  value: string | undefined,
  options?: SelectOptions,
  description?: string,
) {
  if (!value) {
    logger.warn(`skipping select action for the element ${component.alias} as the value is undefined`);
    return;
  }
  const stepDesc = description
    ? description
    : `selecting option ${value} in the element ${component.alias} by using value attribute`;
  await test.step(stepDesc, async () => {
    await p.selectByValue(component.getLocator(), value, options);
  });
}

export async function selectOptionsByValue(
  component: Component,
  values: string[] | undefined,
  options?: SelectOptions,
  description?: string,
) {
  if (values == undefined || values?.length > 0) {
    logger.warn(`skipping select action for the element ${component.alias} as the value is undefined`);
    return;
  }
  const stepDesc = description
    ? description
    : `selecting options ${JSON.stringify(values)} in the element ${component.alias} by using value attribute`;
  await test.step(stepDesc, async () => {
    await p.selectByValues(component.getLocator(), values, options);
  });
}

export async function typeAndPressTab(
  component: Component,
  value: string | undefined,
  options?: FillOptions,
  description?: string,
) {
  if (!value) {
    logger.warn(`skipping type action for the element ${component.alias} as the value is undefined`);
    return;
  }
  const stepDesc = description
    ? description
    : `entering text '${value}' in the element '${component.alias}' and clicking tab`;
  await test.step(stepDesc, async () => {
    await p.fillAndTab(component.getLocator(), value, options);
    await component.getLocator().dispatchEvent('input', { bubbles: true });
  });
  logger.info(`entered text '${value}' in the element '${component.alias}'`);
}

export async function typeAndPressEnter(
  component: Component,
  value: string | undefined,
  options?: FillOptions,
  description?: string,
) {
  if (!value) {
    logger.warn('skipping type action for the element ${component.alias} as the value is undefined');
    return;
  }
  const stepDesc = description
    ? description
    : `entering text '${value}' in the element '${component.alias}' and clicking enter`;
  await test.step(stepDesc, async () => {
    await p.fillAndEnter(component.getLocator(), value, options);
  });
  logger.info(`entered text '${value}' in the element '${component.alias}'`);
}

export async function typeText(
  component: Component,
  value: string | undefined,
  options?: FillOptions,
  description?: string,
) {
  if (!value) {
    logger.warn(`skipping type action for the element ${component.alias} as the value is undefined`);
    return;
  }
  const stepDesc = description ? description : `enter text '${value}' in the element '${component.alias}'`;
  await test.step(stepDesc, async () => {
    await p.fill(component.getLocator(), value, options);
    //await component.getLocator().fill(value, options);
  });
  logger.info(`entered text '${value}' in the element '${component.alias}'`);
}

export async function pressSequentially(
  component: Component,
  value: string | undefined,
  options?: PressSequentiallyOptions,
  description?: string,
) {
  if (!value) {
    logger.warn(`skipping type action for the element ${component.alias} as the value is undefined`);
    return;
  }
  const stepDesc = description ? description : `enter text '${value}' in the element '${component.alias}'`;
  await test.step(stepDesc, async () => {
    await component.getLocator().pressSequentially(value, options);
  });
  logger.info(`entered text '${value}' in the element '${component.alias}'`);
}

export async function clearAndTypeText(
  component: Component,
  value: string | undefined,
  options?: FillOptions,
  description?: string,
) {
  if (!value) {
    logger.warn(`skipping type action for the element ${component.alias} as the value is undefined`);
    return;
  }
  const stepDesc = description ? description : `enter text '${value}' in the element '${component.alias}'`;
  await test.step(stepDesc, async () => {
    await p.clear(component.getLocator());
    await p.fill(component.getLocator(), value, options);
  });
  logger.info(`entered text '${value}' in the element '${component.alias}'`);
}

export async function selectCheckbox(component: Component, options?: ClickOptions, description?: string) {
  const stepDesc = description ? description : `select checkbox element '${component.alias}'`;
  await test.step(stepDesc, async () => {
    if (!(await component.isSelected())) await p.click(component.getLocator(), options);
    else logger.warn(`checkbox '${component.alias}' is already selected`);
  });
  logger.info(`selected checkbox element '${component.alias}'`);
}

export async function clearFieldByEvent(component: Component, description?: string) {
  const stepDesc = description ? description : `clearing field ${component.alias}`;
  await test.step(stepDesc, async () => {
    // Cast 'elm' to HTMLInputElement inside the evaluate block
    await component.getLocator().evaluate((elm: HTMLElement) => {
      const input = elm as HTMLInputElement;
      input.value = '';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });
  });
}

export async function scrollToView(component: Component, options?: TimeoutOption, description?: string) {
  const stepDesc = description ? description : `scrolling element '${component.alias}' into view`;
  await test.step(stepDesc, async () => {
    await p.scrollLocatorIntoView(component.getLocator(), options);
    await wait(500);
  });
  logger.info(`scrolled element '${component.alias}' into view`);
}

export async function selectOption(
  component: Component,
  value: string | undefined,
  options?: SelectOptions,
  description?: string,
) {
  if (!value) {
    logger.warn(`skipping select action for the element ${component.alias} as the value is undefined`);
    return;
  }
  const stepDesc = description ? description : `selecting option ${value} in the element ${component.alias}`;
  await test.step(stepDesc, async () => {
    try {
      await p.selectByText(component.getLocator(), value, options);
    } catch (error) {
      await p.selectByValue(component.getLocator(), value, options);
    }
  });
}
export async function waitForPageToLoad(component: Component, description?: string) {
  const stepDesc = description ? description : `waiting for page '${component.alias}' to load`;
  await test.step(stepDesc, async () => {
    await p.waitForElementToBeVisible(component.getLocator());
    try {
      if (component.alias) {
        await p.getPage().waitForFunction(pagetitle => document.title.includes(pagetitle), component.alias);
        logger.warn(` '${component.alias}' page is loaded successfully `);
      }
    } catch (error) {
      logger.warn(`page title did not contain '${component.alias}' after waiting for page to load`);
    }
  });
}
