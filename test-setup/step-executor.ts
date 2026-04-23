import { logger } from '@logger';
import { test } from '@pagesetup';
import { wait } from '@playwright-utils/utils';

export type RetryOptions = {
  retries: number;
  delay: number;
};

/**
 * This function returns the filename and function name if available, where the action is called
 * @returns information of initiator details including fileName and functionName
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCallerInfo(): { fileName: string; functionName: string } {
  const stack = new Error().stack;
  if (!stack) return { fileName: 'unknown', functionName: 'unknown' };
  const stackLines = stack.split('\n');
  const callerLine4 = stackLines[4];
  const callerLine5 = stackLines[5];
  console.log(callerLine4);
  console.log(callerLine5);
  const match4 = callerLine4.match(/s+at\s(.*)\s\((.*):\d+\)/) || callerLine4.match(/\s+at\s(.*):\d+:\d+/);
  if (!match4) return { fileName: 'unknown', functionName: 'unknown' };
  const functionName = match4[1] || 'anonymous';
  const fileName = match4[2] || 'unknown';
  return { fileName, functionName };
}

/**
 * performs callable inside a playwright test step
 * @param stepDescription description string
 * @param actionFn callable for performing action
 * @param assertFn callable for providing assertion
 * @param retryOptions for configuring the retry action functionality
 */
export async function performStep<T>(
  stepDescription: string,
  actionFn: () => Promise<T>,
  assertFn?: () => Promise<T>,
  retryOptions: RetryOptions = { retries: 0, delay: 1 * 1000 },
): Promise<T | void> {
  const { retries, delay } = retryOptions;
  let result: T;
  await test.step(stepDescription, async () => {
    for (let attempt = 1; attempt <= retries + 1; attempt++) {
      try {
        logger.info(`${stepDescription} (Attempt ${attempt})`);
        result = await actionFn();
        if (assertFn) {
          await assertFn();
        }
        return result;
      } catch (error) {
        const ex = error as Error;
        logger.error(`ERROR: ${stepDescription} - (attempt ${attempt}) \n message - ${ex.message}`);
        if (attempt > retries) {
          throw new Error(
            `ERROR: ${stepDescription} - (attempt ${attempt}) \n message - ${ex.message}\nstacktrace - ${ex.stack}`,
          );
        }
        await wait(delay);
      }
    }
    return result;
  });
}
