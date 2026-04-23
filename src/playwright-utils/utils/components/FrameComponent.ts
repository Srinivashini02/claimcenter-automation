import { FrameLocator } from '@playwright/test';
import * as p from 'src/playwright-utils';

export class FrameComponent {
  selector: string | (() => FrameLocator);
  alias: string;

  constructor(selector: string | (() => FrameLocator), alias?: string) {
    this.selector = selector;
    this.alias = alias ? alias : JSON.stringify(this.getLocator());
  }

  getLocator() {
    const element: string | FrameLocator = typeof this.selector == 'function' ? this.selector() : this.selector;
    return p.getFrameLocator(element);
  }

  getSelector(): string {
    return this.selector as string;
  }
}

export const frameComponent = (selector: string | (() => FrameLocator), alias?: string): FrameComponent => {
  return new FrameComponent(selector, alias);
};
