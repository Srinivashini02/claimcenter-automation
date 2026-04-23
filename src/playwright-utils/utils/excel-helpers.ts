import Excel from 'exceljs';
import path from 'path';

export default class ExcelUtils {
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

  public static async create(filePath: string, sheetName?: string): Promise<ExcelUtils> {
    const workbook = new Excel.Workbook();
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
    return new ExcelUtils(workbook, worksheet);
  }

  public getTable(name: string) {
    const table = this.worksheet.getTable(name);
    const tableMeta = JSON.parse(JSON.stringify(table));
    const tableRef: string = tableMeta['table']['tableRef'];
    return this.readExcelRangeAsMap(tableRef);
  }

  private columnLetterToNumber(letter: string) {
    let column = 0;
    const length = letter.length;
    for (let i = 0; i < length; i++) {
      column += (letter.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
    }
    return column;
  }

  private parseRange(range: string) {
    const match = range.match(/([A-Z]+)(\d+):([A-Z]+)(\d+)/);
    if (match) {
      const startCol = this.columnLetterToNumber(match[1]);
      const startRow = parseInt(match[2], 10);
      const endCol = this.columnLetterToNumber(match[3]);
      const endRow = parseInt(match[4], 10);
      return { startCol, startRow, endCol, endRow };
    }
    throw new Error('Invalid range format');
  }

  private readExcelRange(range: string) {
    const { startCol, startRow, endCol, endRow } = this.parseRange(range);
    const data = [];
    for (let rowNumber = startRow; rowNumber <= endRow; rowNumber++) {
      const row = this.worksheet.getRow(rowNumber);
      const rowData = [];
      for (let colNumber = startCol; colNumber <= endCol; colNumber++) {
        const cell = row.getCell(colNumber);
        rowData.push(cell.value);
      }
      data.push(rowData);
    }
    return data;
  }

  private readExcelRangeAsMap(range: string) {
    const { startCol, startRow, endCol, endRow } = this.parseRange(range);
    const data = [];
    // fetch header
    const headerRow = this.worksheet.getRow(startRow);
    const headerRowData: string[] = [];
    for (let colNumber = startCol; colNumber <= endCol; colNumber++) {
      const cell = headerRow.getCell(colNumber);
      headerRowData.push(cell.value as string);
    }
    for (let rowNumber = startRow + 1; rowNumber <= endRow; rowNumber++) {
      const row = this.worksheet.getRow(rowNumber);
      const rowData: any = {};
      for (let colNumber = startCol; colNumber <= endCol; colNumber++) {
        const cell = row.getCell(colNumber);
        const columnName: string = headerRowData.at(colNumber - 1) as string;
        rowData[columnName] = cell.value;
      }
      data.push(rowData);
    }
    return data;
  }
}
