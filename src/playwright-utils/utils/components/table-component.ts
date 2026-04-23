import { Locator } from '@playwright/test';
import { Component } from 'src/playwright-utils/utils/components/Component';
import { trim } from 'lodash';

export class TableComponent {
  component: Component;
  alias: string;
  constructor(component: Component, alias: string) {
    this.component = component;
    this.alias = alias;
  }

  async getHeadersList() {
    let headersArray: string[] = [];
    headersArray = await this.component
      .getLocator()
      .locator(`div[class*='gw-header--inner gw-header--icon']`)
      .allTextContents();

    return headersArray;
  }

  async getRows() {
    let rows: Locator[] = [];
    rows = await this.component.getLocator().locator('tbody').locator(`tr[class*='gw-standard-row']`).all();
    return rows;
  }

  async getTableContent() {
    const rows: Locator[] = await this.getRows();
    const headersArray: string[] = await this.getHeadersList();
    const rowsContent: { [key: string]: string }[] = [];
    for (const row of rows) {
      const rowContent: { [key: string]: any } = {};
      const cellDetails: string[] = await row.locator('td').allInnerTexts();
      for (let i = 0; i < headersArray.length; i++) {
        rowContent[trim(headersArray[i])] = cellDetails[i];
      }
      rowsContent.push(rowContent);
    }
    return rowsContent;
  }

  async getRowByIndex(index: number) {
    const rows = await this.getRows();
    return rows.at(index);
  }

  async getRowByFilter(filter: (item: object) => boolean) {
    const tableContent = await this.getTableContent();
    const index = tableContent.findIndex(filter);
    if (index !== -1) {
      throw new Error(`unable to find the row with defined filter`);
    }
    return this.getRowByIndex(index);
  }

  async getRowByColumnValue(columnName: string, value: string) {
    const tableContent = await this.getTableContent();
    const index = tableContent.findIndex(map => map[columnName].includes(value));
    if (index === -1) {
      throw new Error(`unable to find the row with content column name : ${columnName} and value : ${value}`);
    }
    return this.getRowByIndex(index);
  }

  getColumnByIndex(row: Locator, colIndex: number) {
    return row.locator('td').nth(colIndex);
  }

  async getColumnByName(row: Locator, colName: string) {
    const index = (await this.getHeadersList()).findIndex(item => item == colName);
    return this.getColumnByIndex(row, index);
  }
}

export default TableComponent;
