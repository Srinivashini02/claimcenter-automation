import { logger } from '@logger';
import * as fsp from 'fs/promises';
import path from 'path';

//Report data type
export type ReportData = {
  AccountNumber: string;
  SubmissionNumber: string;
  PolicyNumber: string;
  TestStatus: string;
  Error: string;
};

/**
 * Clear JSON data from report.json
 * @param filePath
 */
export async function clearReportJson(filePath: string): Promise<void> {
  // Create a new object with the same keys but empty values
  const clearedData: ReportData = {
    AccountNumber: '',
    SubmissionNumber: '',
    PolicyNumber: '',
    TestStatus: '',
    Error: '',
  };

  await fsp.writeFile(filePath, JSON.stringify(clearedData, null, 2));
}

/**
 * Function to read JSON data
 * @param filePath
 * @returns
 */
export async function readJsonFile(filePath: string): Promise<string[]> {
  const data = await fsp.readFile(filePath, 'utf-8');
  logger.info(`Reading JSON data for file ${path.basename(filePath)}`);
  return JSON.parse(data);
}

/**
 * Create Json File from excel data
 * @param filePath
 * @param data
 */
export async function createJSONFileForExcelData(filePath: string, data: any[]): Promise<void> {
  try {
    await fsp.writeFile(filePath, JSON.stringify(data, null, 2));
    console.log('JSON file successfully created at', filePath);
  } catch (error) {
    console.error('Error writing JSON file:', error);
  }
}

/**
 * Read a json file of a single key and multiple values, for any key sent fetch a random value for it.
 * @param filePath
 * @param key
 * @returns
 */
export async function readJSONDataAndGetValue(filePath: string, key: string): Promise<string> {
  let value: string = '';
  try {
    // read Json file and get the data
    const jsonContent = await fsp.readFile(path.join(process.cwd(), filePath), 'utf-8');
    const typeMap: Record<string, string[]> = JSON.parse(jsonContent);

    // Get the data for the key
    const typeArrayData = typeMap[key];

    // Get a random index from the array of values
    if (typeArrayData && typeArrayData.length > 0) {
      const randomIndex = Math.floor(Math.random() * typeArrayData.length);
      value = typeArrayData[randomIndex];
    } else {
      console.error(`No data found for key: ${key}`);
    }
  } catch (error) {
    console.error('Error getting value from JSON file:', error);
  }
  return value;
}
