import ExcelReader from '@excel-utils';

const workbookCache: Map<string, Promise<ExcelReader>> = new Map();

/**
 * this function should be used to fetch the ExcelReader class object from the cache.
 * @param file file path of the excel file
 * @param sheetName sheet name present in the workbook
 * @returns ExcelReader
 */
export function getExcelReader(file: string, sheetName: string) {
  let reader;
  if (workbookCache.size != 0) {
    if (workbookCache.has(file)) {
      reader = workbookCache.get(file);
    } else {
      reader = ExcelReader.create(file, sheetName);
      workbookCache.set(file, reader);
    }
  } else {
    reader = ExcelReader.create(file, sheetName);
    workbookCache.set(file, reader);
  }
  return reader;
}

export async function getDataByID(file: string, sheetName: string, id: string, keyName: string = 'TCID') {
  const reader = await getExcelReader(file, sheetName);
  reader?.updateSheet(sheetName);
  return reader!.getAllRows().filter(map => map[keyName] == id);
}

export async function getDataBySheet(file: string, sheetName: string) {
  const reader = await getExcelReader(file, sheetName);
  reader?.updateSheet(sheetName);
  return reader!.getAllRows();
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function convertToCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 5 }).format(
    amount,
  );
}
