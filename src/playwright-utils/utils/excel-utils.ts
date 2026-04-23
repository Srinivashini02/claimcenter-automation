/* eslint-disable @typescript-eslint/no-unsafe-call */
import { logger } from '@logger';
import Excel from 'exceljs';
import * as fs from 'fs';
import { isString, toString, trim } from 'lodash';
import path from 'path';

class ExcelReader {
  private workbook: Excel.Workbook;
  private worksheet: Excel.Worksheet;

  private constructor(workbook: Excel.Workbook, worksheet: Excel.Worksheet) {
    this.workbook = workbook;
    this.worksheet = worksheet;
  }

  public updateSheet(sheetName: string) {
    const worksheet = this.workbook.getWorksheet(sheetName);
    if (!worksheet) {
      throw new Error(`Worksheet ${sheetName} could not be found.`);
    }
    this.worksheet = worksheet;
  }

  public static async create(filePath: string, sheetName?: string): Promise<ExcelReader> {
    const workbook = new Excel.Workbook();
    // const ext = filePath.split('.', 2)[1];
    const ext = path.extname(filePath);
    let worksheet: Excel.Worksheet;

    if (ext === '.xlsx') {
      await workbook.xlsx.readFile(filePath);
      const sheet = sheetName === undefined || sheetName === '' ? 1 : sheetName;
      worksheet = workbook.getWorksheet(sheet)!;
    } else if (ext === '.csv') {
      worksheet = workbook.addWorksheet('CSV');
      await workbook.csv.readFile(filePath);
    } else {
      throw new Error('Unsupported file format. Only .xlsx and .csv are supported.');
    }

    if (!worksheet) {
      throw new Error('Worksheet could not be found.');
    }
    return new ExcelReader(workbook, worksheet);
  }

  public readCellValue(rowNumber: number, columnName: string): string {
    // Normalize the column name by trimming spaces
    columnName = columnName.trim();
    let columnNumber: number | undefined;

    // Find the column number based on the header name
    this.worksheet.getRow(1).eachCell({ includeEmpty: true }, (cell, colNumber) => {
      if (cell.value && typeof cell.value === 'string' && cell.value.trim() === columnName) {
        columnNumber = colNumber;
      }
    });

    if (columnNumber === undefined) {
      return `Column '${columnName}' not found.`;
    }

    // Access the specific cell value
    const cell = this.worksheet.getRow(rowNumber).getCell(columnNumber);
    if (!cell || cell.value == null) {
      console.log(`no value found at Row ${rowNumber}, Column ${columnName}`);
      return ``;
    }
    return this.stringifyCellValue(cell.value);
  }

  // eslint-disable-next-line complexity
  private stringifyCellValue(value: any): string {
    if (value == null || value == undefined) {
      return '';
    }
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      return value.toString();
    } else if (value instanceof Date) {
      return value.toISOString();
    } else if (value.richText && Array.isArray(value.richText)) {
      // Handling rich text
      return value.richText.map((part: { text: any }) => part.text).join('');
    } else if (value.formula || value.result) {
      // Handling formulas
      return value.result ? value.result.toString() : 'Formula without result';
    } else if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value); // Last resort: convert object to JSON string
    }
    return 'Unknown type';
  }

  public getAllRows(includeEmpty: boolean = true): any[] {
    const rows: any[] = [];
    const headers: string[] = [];

    // Get headers from the first row
    this.worksheet.getRow(1).eachCell((cell, colNumber) => {
      if (typeof cell.value === 'string') {
        headers[colNumber] = cell.value;
      }
    });

    // Get data rows
    this.worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // Skip header row
      const rowData: any = {};
      row.eachCell({ includeEmpty: includeEmpty }, (cell, colNumber) => {
        const header = headers[colNumber];
        if (header) {
          if (toString(cell.value)) rowData[header] = isString(cell.value) ? trim(cell.value.toString()) : cell.value;
          else rowData[header] = null;
        }
      });
      rows.push(rowData);
    });

    return rows;
  }

  // public async writeEndReportDataToExcel(jsonFilePath: string, filePath: string): Promise<void> {
  //   try {
  //     // Read the JSON file
  //     const reportData = await readCQFJsonFile(jsonFilePath);
  //     const ext = filePath.split('.').pop()?.toLowerCase();

  //     if (ext === 'xlsx') {
  //       // Handle Excel file (.xlsx)
  //       // await this.writeToExcel(reportData, filePath);
  //     } else if (ext === 'csv') {
  //       // Handle CSV file
  //       await this.writeToCQFCsv(reportData, filePath);
  //     } else {
  //       throw new Error('Unsupported file format. Only .xlsx and .csv are supported.');
  //     }
  //   } catch (error) {
  //     console.error('Error writing report data to file:', error);
  //   }
  // }

  // private async writeToCQFCsv(reportData: CQFReportData[], csvFilePath: string): Promise<void> {
  //   if (!reportData || reportData.length === 0) {
  //     logger.warn('No report data available to write to CSV.');
  //     return;
  //   }

  //   // Prepare CSV headers
  //   const headers = [
  //     constants.cqfOutputHeaders.scenarioId,
  //     constants.cqfOutputHeaders.submissionNumberPE,
  //     constants.cqfOutputHeaders.digitalCQFOnUI,
  //     constants.cqfOutputHeaders.submissionNumberPC,
  //     constants.cqfOutputHeaders.pcCQFOnUI,
  //     constants.cqfOutputHeaders.cqfComparisionResult,
  //     constants.cqfOutputHeaders.cqfComparisionDifferences,
  //     constants.cqfOutputHeaders.errorPE,
  //     constants.cqfOutputHeaders.errorPE,
  //   ];
  //   let csvData = `${headers.join(',')}\n`;

  //   // Write each row of data to CSV
  //   for (const entry of reportData) {
  //     const { PCCQFOnUI, DigitalCQFOnUI, CQFComparisionDifferences } = entry;

  //     // Determine the number of rows needed based on the longest array
  //     let numberOfRows = Math.max(PCCQFOnUI!.length, DigitalCQFOnUI!.length);
  //     if (numberOfRows === 0 && !(entry.ScenarioId == '')) {
  //       numberOfRows = 1;
  //     }

  //     for (let i = 0; i < numberOfRows; i++) {
  //       const rowValues = [
  //         // Fill ScenarioId
  //         i === 0 ? entry.ScenarioId : '',

  //         // Fill SubmissionNumberPE in 1st row
  //         i === 0 ? entry.SubmissionNumberPE : '',

  //         // Fill DigitalCQFOnUI value
  //         i < DigitalCQFOnUI!.length ? DigitalCQFOnUI![i] : '',

  //         // Fill SubmissionNumberPC in 1st row
  //         i === 0 ? entry.SubmissionNumberPC : '',

  //         // Fill PCCQFOnUI value
  //         i < PCCQFOnUI!.length ? PCCQFOnUI![i] : '',

  //         // Fill CQF comparision differences comparision result
  //         i === 0 ? entry.CQFComparisionResult : '',

  //         // Fill CQF comparision differences values
  //         i < CQFComparisionDifferences!.length ? CQFComparisionDifferences![i] : '',

  //         // Fill ErrorPE in 1st row
  //         i === 0 ? entry.ErrorPE?.replace(/[\r\n]+/g, ' ').trim() : '',

  //         // Fill ErrorPC in 1st row
  //         i === 0 ? entry.ErrorPC?.replace(/[\r\n]+/g, ' ').trim() : '',
  //       ].map(value => `"${value || ''}"`);

  //       csvData += `${rowValues.join(',')}\n`;
  //     }
  //   }

  //   // Write to the CSV file
  //   await fs.promises.writeFile(csvFilePath, csvData);
  //   logger.info('Report data written to CSV successfully.');
  // }

  public async clearCSV(csvFilePath: string): Promise<void> {
    // Check if the file exists, delete it, then create a new empty file
    if (fs.existsSync(csvFilePath)) {
      await fs.promises.unlink(csvFilePath);
      logger.info(`Deleted old CSV file: ${csvFilePath}`);
    }
    await fs.promises.writeFile(csvFilePath, '');
    logger.info('Created a new empty CSV file.');
  }
}

export default ExcelReader;
// export { ExcelReader };
