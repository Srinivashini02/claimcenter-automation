/**
 * custom-logger.ts: This module provides a custom logger for Playwright tests. It implements the Reporter interface from Playwright
 * and uses the Winston logging library to provide detailed logs for test execution. The logger includes custom colors
 * for different log levels and can be configured to log to the console or a file.
 */

import { Reporter, TestCase, TestError, TestResult } from '@playwright/test/reporter';
import winston, { createLogger, format, transports } from 'winston';

const LOG_TO_FILE = process.env.LOG_TO_FILE === 'true';

// Custom format to strip ANSI color codes
const stripAnsi = format((info: winston.Logform.TransformableInfo): winston.Logform.TransformableInfo => {
  if (info.message && typeof info.message === 'string') {
    // eslint-disable-next-line no-control-regex
    info.message = info.message.replace(/\u001b\[.*?m/g, '');
  }
  return info;
})();

const timestampFormat = format.timestamp({
  format: () => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'America/Chicago',
      timeZoneName: 'short',
    }).format(new Date());
  },
});

const printfFormat = format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`);

const consoleFormat = format.combine(format.colorize({ all: true }), timestampFormat, printfFormat);

const fileFormat = format.combine(stripAnsi, timestampFormat, printfFormat);

// Define custom colors for logger
winston.addColors({
  info: 'blue',
  error: 'red',
});

const fileTransport = new transports.File({ filename: 'logs/info.log', format: fileFormat });

// Logger configuration
export const logger = createLogger({
  level: 'info',
  transports: [new transports.Console({ format: consoleFormat }), ...(LOG_TO_FILE ? [fileTransport] : [])],
});

export default class CustomLogger implements Reporter {
  onTestBegin(test: TestCase): void {
    logger.info(`Test Case Started: ${test.title}`);
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    if (result.status === 'passed') {
      logger.info(`Test Case Passed: ${test.title}`);
    } else if (result.status === 'skipped') {
      logger.info(`Test Case Skipped: ${test.title}`);
    } else if (result.status === 'failed' && result.error) {
      logger.error(`Test Case Failed: ${test.title}`);
      // logger.error(`Test Case Failed: ${test.title} Error: ${result.error.message}`);
    }
  }

  onError(error: TestError): void {
    logger.error(error.message);
  }
}
