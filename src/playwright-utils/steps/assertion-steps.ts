import { expect, test } from '@pagesetup';
import * as p from 'src/playwright-utils';
import { ExpectOptions, ExpectTextOptions } from 'src/playwright-utils';
import { Component } from '../utils/components/Component';

export async function expectPageToHaveTitle(expectedTitle: string, options?: ExpectOptions, description?: string) {
  const stepDesc = description ? description : `asserting current page to have title '${expectedTitle}'`;
  await test.step(stepDesc, async () => {
    await p.expectPageToHaveTitle(expectedTitle, options);
  });
}

export async function expectPageToHaveURL(expectedURL: string, options?: ExpectOptions, description?: string) {
  const stepDesc = description ? description : `asserting current page to have URL '${expectedURL}'`;
  await test.step(stepDesc, async () => {
    await p.expectPageToHaveURL(expectedURL, options);
  });
}

export async function expectPageURLContains(expectedURL: string, options?: ExpectOptions, description?: string) {
  const stepDesc = description ? description : `asserting current page to contain '${expectedURL}' in URL`;
  await test.step(stepDesc, async () => {
    await p.expectPageToContainURL(expectedURL, options);
  });
}

export async function expectElementToHaveText(
  component: Component,
  expectedText: string | RegExp,
  options?: ExpectOptions & ExpectTextOptions,
  description?: string,
) {
  if (!expectedText) {
    throw new Error('expected text is undefined');
  }
  const stepDesc = description ? description : `asserting element '${component.alias}'to have text '${expectedText}'`;
  await test.step(stepDesc, async () => {
    await p.expectElementToHaveText(component.getLocator(), expectedText, options);
  });
}

export async function expectAlertToHaveText(component: Component, expectedText: string, description?: string) {
  const stepDesc = description ? description : `asserting element '${component.alias}'to alert text '${expectedText}'`;
  await test.step(stepDesc, async () => {
    const message = await p.acceptAlert(component.getLocator());
    expect(message).toBe(expectedText);
  });
}

export async function expectElementNotToHaveText(
  component: Component,
  expectedText: string,
  options?: ExpectOptions & ExpectTextOptions,
  description?: string,
) {
  const stepDesc = description
    ? description
    : `asserting element '${component.alias}' not to have text '${expectedText}'`;
  await test.step(stepDesc, async () => {
    await p.expectElementNotToHaveText(component.getLocator(), expectedText, options);
  });
}

export async function expectElementToContainText(
  component: Component,
  expectedText: string,
  options?: ExpectOptions,
  description?: string,
) {
  const stepDesc = description
    ? description
    : `asserting element '${component.alias}' to contain text '${expectedText}'`;
  await test.step(stepDesc, async () => {
    await p.expectElementToContainText(component.getLocator(), expectedText, options);
  });
}

export async function expectElementNotToContainText(
  component: Component,
  expectedText: string,
  options?: ExpectOptions,
  description?: string,
) {
  const stepDesc = description
    ? description
    : `asserting element '${component.alias}' not to contain text '${expectedText}'`;
  await test.step(stepDesc, async () => {
    await p.expectElementNotToContainText(component.getLocator(), expectedText, options);
  });
}

export async function expectElementToHaveValue(
  component: Component,
  expectedValue: string | undefined,
  options?: ExpectOptions,
  description?: string,
) {
  if (!expectedValue) {
    throw new Error('expected text is undefined');
  }
  const stepDesc = description
    ? description
    : `asserting element '${component.alias}' to have value '${expectedValue}'`;
  await test.step(stepDesc, async () => {
    await p.expectElementToHaveValue(component.getLocator(), expectedValue, options);
  });
  p.logger.info(`element ${component.alias} has value ${expectedValue}`);
}

export async function expectElementToHaveValues(
  component: Component,
  expectedValues: string[],
  options?: ExpectOptions,
  description?: string,
) {
  const stepDesc = description
    ? description
    : `asserting element '${component.alias}' to have values '${JSON.stringify(expectedValues)}'`;
  await test.step(stepDesc, async () => {
    await p.expectElementToHaveValues(component.getLocator(), expectedValues, options);
  });
}

export async function expectElementToBeVisible(component: Component, options?: ExpectOptions, description?: string) {
  const stepDesc = description ? description : `asserting element '${component.alias}' to be visible'`;
  await test.step(stepDesc, async () => {
    await p.expectElementToBeVisible(component.getLocator(), options);
  });
}

export async function expectElementToBeHidden(component: Component, options?: ExpectOptions, description?: string) {
  const stepDesc = description ? description : `asserting element '${component.alias}' to be hidden'`;
  await test.step(stepDesc, async () => {
    await p.expectElementToBeHidden(component.getLocator(), options);
  });
}

export async function expectElementToBeAttached(component: Component, options?: ExpectOptions, description?: string) {
  const stepDesc = description ? description : `asserting element '${component.alias}' to be attached'`;
  await test.step(stepDesc, async () => {
    await p.expectElementToBeAttached(component.getLocator(), options);
  });
}

export async function expectElementToBeInViewport(component: Component, options?: ExpectOptions, description?: string) {
  const stepDesc = description ? description : `asserting element '${component.alias}' to be in viewport'`;
  await test.step(stepDesc, async () => {
    await p.expectElementToBeInViewport(component.getLocator(), options);
  });
}

export async function expectElementNotToBeInViewport(
  component: Component,
  options?: ExpectOptions,
  description?: string,
) {
  const stepDesc = description ? description : `asserting element '${component.alias}' not to be in viewport'`;
  await test.step(stepDesc, async () => {
    await p.expectElementNotToBeInViewport(component.getLocator(), options);
  });
}

export async function expectElementToBeChecked(component: Component, options?: ExpectOptions, description?: string) {
  const stepDesc = description ? description : `asserting element '${component.alias}' to be checked'`;
  await test.step(stepDesc, async () => {
    await p.expectElementToBeChecked(component.getLocator(), options);
  });
}

export async function expectElementNotToBeChecked(component: Component, options?: ExpectOptions, description?: string) {
  const stepDesc = description ? description : `asserting element '${component.alias}' not to be checked'`;
  await test.step(stepDesc, async () => {
    await p.expectElementNotToBeChecked(component.getLocator(), options);
  });
}

export async function expectElementToBeDisabled(component: Component, options?: ExpectOptions, description?: string) {
  const stepDesc = description ? description : `asserting element '${component.alias}' to be disabled'`;
  await test.step(stepDesc, async () => {
    await p.expectElementToBeDisabled(component.getLocator(), options);
  });
}

export async function expectElementToBeEnabled(component: Component, options?: ExpectOptions, description?: string) {
  const stepDesc = description ? description : `asserting element '${component.alias}' to be enabled'`;
  await test.step(stepDesc, async () => {
    await p.expectElementToBeEnabled(component.getLocator(), options);
  });
}

export async function expectElementToBeEditable(component: Component, options?: ExpectOptions, description?: string) {
  const stepDesc = description ? description : `asserting element '${component.alias}' to be editable'`;
  await test.step(stepDesc, async () => {
    await p.expectElementToBeEditable(component.getLocator(), options);
  });
}

export async function expectToBeEditable(component: Component, options?: ExpectOptions, description?: string) {
  const stepDesc = description ? description : `asserting element '${component.alias}' to be editable'`;
  await test.step(stepDesc, async () => {
    await p.expectElementToBeEditable(component.getLocator(), options);
  });
}

export async function expectToBeEqual(actual: string | number, expected: string | number, description?: string) {
  const stepDesc = description ? description : `asserting expected '${expected}' to be equal to '${actual}'`;
  await test.step(stepDesc, () => {
    p.logger.info(`asserting expected '${expected}' to be equal to '${actual}'`);
    expect.soft(actual, { message: `asserting expected '${expected}' to be equal to '${actual}'` }).toBe(expected);
  });
}

export async function expectNotToBeEqual(actual: string | number, expected: string | number, description?: string) {
  const stepDesc = description ? description : `asserting expected '${expected}' to be equal to '${actual}'`;
  await test.step(stepDesc, () => {
    p.logger.info(`asserting expected '${expected}' to be not equal to '${actual}'`);
    expect
      .soft(actual, { message: `asserting expected '${expected}' to be not equal to '${actual}'` })
      .not.toBe(expected);
  });
}
