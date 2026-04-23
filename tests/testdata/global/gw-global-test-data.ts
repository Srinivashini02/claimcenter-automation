import { logger } from '@playwright-utils';
import fs from 'fs';
import path from 'path';

export const testReport: Map<string, any> = new Map([
  ['accountNumber', ''],
  ['submissionNumber', ''],
  ['policyNumber', ''],
  ['testStatus', ''],
  ['error', ''],
]);

/**
 * Read JSON file and get data as array of JSON objects
 * @param filePath
 */
export function getJsonData(filePath: string) {
  try {
    const content = fs.readFileSync(path.join(process.cwd(), filePath), 'utf-8');
    const json = JSON.parse(content.toString());
    return json;
  } catch (error) {
    logger.error(`Failed to read file at path ${filePath} /n ${String(error)}`);
    return null;
  }
}
