import { test } from '@pagesetup';
import { getLocator, logger, wait } from '@playwright-utils';
import { Locator, expect } from '@playwright/test';

export class TableComponent {
  rowSelector: string =
    'tr.gw-row[class*=gw-standard-row], tr.gw-row[class*=gw-row-tree-row], tr.gw-row[class*=gw-listDetailBodyRow], div[class^= rt-tbody]';
  headerRowSelector: string = 'tr.gw-row[class*=gw-header-row], div[class^= rt-thead]';
  tableLocator: string | Locator;

  constructor(locator: string | Locator) {
    this.tableLocator = locator;
  }

  setRowLocator(rowSelector: string) {
    this.rowSelector = rowSelector;
  }

  setHeaderRowLocator(selector: string) {
    this.headerRowSelector = selector;
  }

  async getRows(): Promise<Locator[]> {
    let rowLocator: Locator;
    await test.step('Get all rows', async () => {
      await getLocator(this.tableLocator).waitFor({ state: 'attached', timeout: 10000 });
      rowLocator = getLocator(this.tableLocator).locator(this.rowSelector);
    });
    return rowLocator!.all();
  }

  async sizeOfRows(): Promise<number> {
    let rows;
    await test.step(`Get number of rows`, async () => {
      rows = await this.getRows();
    });

    return rows!.length;
  }

  async getRow(index: number): Promise<Locator> {
    let rows: Locator[];
    await test.step('get Row', async () => {
      rows = await this.getRows();
      const size: number = rows.length;
      if (index >= size) {
        throw new Error('out of bound error, total number of rows : ' + size + ' and requested index : ' + index);
      }
    });
    return rows![index];
  }

  getHeaderRow(): Locator {
    return getLocator(this.tableLocator).locator(this.headerRowSelector);
  }

  async getHeaderList(): Promise<Array<string>> {
    const headerRow = this.getHeaderRow();
    await headerRow.waitFor({ state: 'attached', timeout: 10000 });
    const columns: Locator[] = await headerRow.locator('td,th,div[class $= header-content]').all();
    const texts: string[] = [];
    for (let index = 0; index < columns.length; index++) {
      const col = columns.at(index);
      let value = await col?.innerText();
      value = value == '' || value == undefined ? 'column#' + (index + 1) : value;
      texts.push(value);
    }
    return texts;
  }

  async getRowDetails(index: number): Promise<Array<string>> {
    const dataRow = await this.getRow(index);
    await dataRow.waitFor({ state: 'attached' });
    const columns: Locator[] = await dataRow.locator('td, div[class^=rt-td]').all();
    const texts: string[] = [];
    for (let index = 0; index < columns.length; index++) {
      const col = columns.at(index);
      let value = await col?.innerText();
      value = value == '' || value == undefined ? '' : value;
      texts.push(value);
    }
    return texts;
  }

  async getRowDetailsInMap(index: number) {
    const result = new Map();
    await test.step('Get Row data in Map', async () => {
      const headerTexts = await this.getHeaderList();
      const rowTexts = await this.getRowDetails(index);
      if (headerTexts.length !== rowTexts.length) {
        throw new Error('row #' + index + ' and header size is different');
      }
      for (let i = 0; i < headerTexts.length; i++) {
        result.set(headerTexts[i], rowTexts[i]);
      }
    });
    return result;
  }

  async getRowDetailsInMap_withColumnsNotMatching(index: number) {
    const headerTexts = await this.getHeaderList();
    const rowTexts = await this.getRowDetails(index);
    // if (headerTexts.length !== rowTexts.length) {
    //   throw new Error('row #' + index + ' and header size is different');
    // }
    const result = new Map();
    for (let i = 0; i < headerTexts.length; i++) {
      result.set(headerTexts[i], rowTexts[i]);
    }
    return result;
  }

  async getRowsData(): Promise<Array<Map<string, string>>> {
    const rowsData: Array<Map<string, string>> = [];
    await test.step(`Get row data`, async () => {
      const size = await this.sizeOfRows();
      for (let rowIndex = 0; rowIndex < size; rowIndex++) {
        const content: Map<string, string> = await this.getRowDetailsInMap(rowIndex);
        rowsData.push(content);
      }
    });
    return rowsData;
  }

  async getRowsData_withColumnsNotMatching(): Promise<Array<Map<string, string>>> {
    const size = await this.sizeOfRows();
    const rowsData: Array<Map<string, string>> = [];
    for (let rowIndex = 0; rowIndex < size; rowIndex++) {
      const content: Map<string, string> = await this.getRowDetailsInMap_withColumnsNotMatching(rowIndex);
      rowsData.push(content);
    }
    return rowsData;
  }

  async getRowsByFilter(key: string, value: string) {
    const rows = await this.getRowsData();
    const result = [];
    const resultRows: Locator[] = [];
    let count = 0;
    for (const row of rows) {
      if (row.has(key)) {
        if (row.get(key) === value) {
          result.push(count);
        }
      } else {
        throw new Error(`given key/ column not present in the table : ${JSON.stringify(this.tableLocator)}`);
      }
      count++;
    }
    if (result.length == 0) {
      logger.warn('no rows found with the filter data : ' + key + ',' + value);
      return resultRows;
    } else {
      for (const item of result) {
        const row = await this.getRow(item);
        resultRows.push(row);
      }
      return resultRows;
    }
  }

  async getRowIndexByFilter(key: string, value: string) {
    await wait(1000);
    const result: number[] = [];
    let count = 0;
    await test.step(`Get row number by filtering ${key} with ${value}`, async () => {
      const rows = await this.getRowsData();
      for (const row of rows) {
        if (row.has(key)) {
          if (row.get(key) === value) {
            result.push(count);
          }
        } else {
          throw new Error(`given key/ column not present in the table : ${JSON.stringify(this.tableLocator)}`);
        }
        count++;
      }
    });

    if (result.length == 0) {
      throw new Error('no rows found with the filter data : ' + key + ',' + value);
    } else {
      return result[0];
    }
  }

  async getRowIndexByFilter_withColumnsNotMatching(key: string, value: string) {
    const rows = await this.getRowsData_withColumnsNotMatching();
    const result = [];
    let count = 0;
    for (const row of rows) {
      if (row.has(key)) {
        if (row.get(key) === value) {
          result.push(count);
        }
      } else {
        throw new Error(`given key/ column not present in the table : ${JSON.stringify(this.tableLocator)}`);
      }
      count++;
    }
    if (result.length == 0) {
      throw new Error('no rows found with the filter data : ' + key + ',' + value);
    } else {
      return result[0];
    }
  }

  async checkRowData(index: number, rowData: Map<string, string>): Promise<void> {
    const actualData = await this.getRowDetailsInMap(index);
    const keys = Array.from(rowData.keys());
    const keysNotFound = [];
    for (let i = 0; i < keys.length; i++) {
      const keyValue = keys[i];
      if (rowData.get(keyValue) == '#notpresent') {
        expect.soft(actualData.has(keyValue), `column ${keyValue} should not be present in the table`).toBeFalsy();
        continue;
      }
      if (!actualData.has(keyValue)) {
        keysNotFound.push(keyValue);
        continue;
      }
      const actual = actualData.get(keyValue);
      const expected = rowData.get(keyValue);
      if (expected == '#blank') {
        expect.soft(actual, `column '${keyValue}' should be empty or blank`).toBe('');
      } else if (expected == '#notblank') {
        expect.soft(actual, `column '${keyValue}' should not be empty or blank`).not.toBe('');
      } else {
        expect.soft(actual, `column '${keyValue}' should have '${expected}'`).toBe(rowData.get(keys[i]));
      }
    }
    expect
      .soft(keysNotFound, `some of the columns expected are not present in the table : ${JSON.stringify(keysNotFound)}`)
      .toStrictEqual([]);
  }

  async getcolumnNumber(columnName: string): Promise<string> {
    const headerRow = this.getHeaderRow();
    await headerRow.waitFor({ state: 'attached', timeout: 10000 });
    const columns: Locator[] = await headerRow.locator('td,th').all();
    for (let index = 0; index < columns.length; index++) {
      const col = columns.at(index);
      const value = await col?.innerText();
      if (value === columnName) {
        return index.toString();
      }
    }
    return `No cloumn found with the ${columnName}`;
  }

  async getcolumnData(columnNumber: string): Promise<string[]> {
    const rows: Locator[] = await this.getRows();
    const columnData: string[] = [];

    let row: Locator;
    if (rows.length == 1) {
      row = rows.at(0)!;
      const columns: Locator[] = await row.locator('td,th,div[class^=rt-td]').all();
      const col = columns.at(Number(columnNumber));
      let value = await col?.innerText();
      value = value == '' || value == undefined ? '' : value;
      columnData.push(value);
    } else {
      for (let index = 1; index < rows.length; index++) {
        row = rows.at(index)!;
        const columns: Locator[] = await row.locator('td,th,div[class^=rt-td]').all();
        const col = columns.at(Number(columnNumber));
        let value = await col?.innerText();
        value = value == '' || value == undefined ? '' : value;
        columnData.push(value);
      }
    }
    return columnData;
  }

  async getcolumnDataByColumnvalue(
    referenceColumnName: string,
    referenceColumnValue: string,
    requiredColumnName: string,
  ): Promise<string[]> {
    await wait(2000);
    const rows: Locator[] = await this.getRows();
    const columnData: string[] = [];
    const referenceColumnNumber = await this.getcolumnNumber(referenceColumnName);
    const requiredColumnNumber = await this.getcolumnNumber(requiredColumnName);
    for (let index = 0; index < rows.length; index++) {
      const row: Locator = rows.at(index)!;
      const columns: Locator[] = await row.locator('td,th,div[class^=rt-td]').all();
      const referenceColumn = columns.at(Number(referenceColumnNumber));
      const value = await referenceColumn?.innerText();
      if (value === referenceColumnValue) {
        const columns: Locator[] = await row.locator('td,th,div[class^=rt-td]').all();
        const col = columns.at(Number(requiredColumnNumber));
        let value = await col?.innerText();
        value = value == '' || value == undefined ? '' : value;
        columnData.push(value);
      }
    }
    return columnData;
  }

  async getcolumnLocators(
    referenceColumnNumber: string,
    referenceColumnValue: string,
    requiredColumnNumber: string,
  ): Promise<Locator> {
    const rows: Locator[] = await this.getRows();
    // let col: Locator = LocatorUtils.getLocator('');
    if (rows.length == 0) {
      throw Error('Empty table');
    }
    let requiredColumn;
    for (let index = 0; index < rows.length; index++) {
      const row: Locator = rows.at(index)!;
      const columns: Locator[] = await row.locator('td,th,div[class^=rt-td]').all();
      const referenceColumn = columns.at(Number(referenceColumnNumber));
      const value = await referenceColumn?.innerText();
      if (value === referenceColumnValue) {
        const columns: Locator[] = await row.locator('td,th,div[class^=rt-td] span,i').all();
        requiredColumn = columns.at(Number(requiredColumnNumber))!;
        break;
      }
    }
    if (!requiredColumn) {
      throw Error('');
    }
    return requiredColumn;
  }

  async getRequiredColumnLocatorFromRefernceValue(
    referenceColumnNumber: string,
    referenceColumnValue: string,
    requiredColumnNumber: string,
  ): Promise<Locator> {
    const rows: Locator[] = await this.getRows();
    // let col: Locator = LocatorUtils.getLocator('');
    if (rows.length == 0) {
      throw Error('Empty table');
    }
    let requiredColumn;
    for (let index = 0; index < rows.length; index++) {
      const row: Locator = rows.at(index)!;
      const columns: Locator[] = await row.locator('td,th,div[class^=rt-td]').all();
      const referenceColumn = columns.at(Number(referenceColumnNumber));
      const value = await referenceColumn?.innerText();
      if (value === referenceColumnValue) {
        const columns: Locator[] = await row.locator('td,th,div[class^=rt-td] span,i').all();
        requiredColumn = columns.at(Number(requiredColumnNumber))!;
        break;
      }
    }
    if (!requiredColumn) {
      throw Error('');
    }
    return requiredColumn;
  }
}
