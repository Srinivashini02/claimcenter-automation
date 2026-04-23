import { logger } from '@logger';
import { ClickOptions, FillOptions, TimeoutOption } from '@parameter-types';
import { Locator } from '@playwright/test';
import { isEqual } from 'lodash';
import * as p from 'src/playwright-utils';

export class Component {
  selector: string | (() => Locator);
  alias: string | undefined;

  constructor(selector: string | (() => Locator), alias?: string) {
    this.selector = selector;
    this.alias = alias;
  }

  async isVisible(options?: TimeoutOption): Promise<boolean> {
    return await p.isElementVisible(this.getLocator(), options);
  }

  async isEnabled(options?: TimeoutOption) {
    return await p.isElementAttached(this.getLocator(), options);
  }

  async isAttached(options?: TimeoutOption) {
    return await p.isElementAttached(this.getLocator(), options);
  }

  async isSelected(options?: TimeoutOption) {
    return await p.isElementChecked(this.getLocator(), options);
  }

  async isHidden(options?: TimeoutOption) {
    return await p.isElementHidden(this.getLocator(), options);
  }

  async typeText(value: string, options?: FillOptions) {
    return await p.fill(this.getLocator(), value, options);
  }

  async getText(): Promise<string> {
    return await p.getText(this.getLocator());
  }
  async getAllTexts(): Promise<string[]> {
    return await p.getAllTexts(this.getLocator());
  }
  async getAttribute(attributeName: string) {
    await p.waitForElementToBeVisible(this.getLocator());
    const attributeValue = this.getLocator().getAttribute(attributeName);
    return attributeValue === null ? undefined : attributeValue;
  }

  async checkAttributeValue(attributeName: string, expected: string, options?: TimeoutOption): Promise<boolean> {
    await p.waitForElementToBeVisible(this.getLocator());
    const actual = this.getLocator().getAttribute(attributeName, options);
    return isEqual(actual, expected);
  }

  getLocator() {
    const element: string | Locator = typeof this.selector == 'function' ? this.selector() : this.selector;
    return p.getLocator(element);
  }

  getSelector(): string {
    return this.selector as string;
  }

  async waitForTextNotBlank(options?: TimeoutOption) {
    const timeout = options?.timeout ? options.timeout : 30000;
    let hasText: boolean = false;
    const size = timeout / 500;
    for (let i = 0; i < size; i++) {
      const text = await p.getText(this.getLocator());
      if (!text) {
        await p.wait(500);
      } else {
        hasText = true;
        break;
      }
    }
    if (!hasText) {
      logger.warn(`element ${this.alias} still doesnot have text, waited for ${timeout} ms`);
    }
  }

  async waitForEnabled(options?: TimeoutOption) {
    const timeout = options?.timeout ? options.timeout : 30000;
    const size = timeout / 500;
    let enabled = false;
    for (let i = 0; i < size; i++) {
      enabled = await this.isEnabled();
      if (!enabled) {
        await p.wait(500);
      } else {
        enabled = true;
        break;
      }
    }
    if (!enabled) {
      logger.warn(`element ${this.alias} still not enabled, waited for ${timeout} ms`);
    }
  }

  async waitForVisible(options?: TimeoutOption) {
    const timeout = options?.timeout ? options.timeout : 30000;
    const size = timeout / 500;
    let visible = false;
    for (let i = 0; i < size; i++) {
      visible = await this.isVisible();
      if (!visible) {
        await p.wait(500);
      } else {
        visible = true;
        break;
      }
    }
    if (!visible) {
      logger.warn(`element ${this.alias} still not visible, waited for ${timeout} ms`);
    }
  }

  async waitForStable(options?: TimeoutOption) {
    const timeout = options?.timeout ? options.timeout : 5000;
    await p.waitForElementToBeStable(this.getLocator(), { timeout: timeout });
  }

  async click(options?: ClickOptions) {
    await p.click(this.getLocator(), options);
  }

  async fill(value: string, options?: FillOptions) {
    await p.fill(this.getLocator(), value, options);
  }
}

export const component = (selector: string | (() => Locator), alias?: string): Component => {
  return new Component(selector, alias);
};
