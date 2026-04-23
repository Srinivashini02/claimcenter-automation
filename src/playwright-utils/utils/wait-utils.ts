import { logger } from '@logger';
import { ongoingRequests } from '@pagesetup';

/**
 * waits till all the requests currently available in the browser are complete
 * this function only works when using test from pagesetup, for exclusions, check pagesetup
 * @param timeout in milliseconds
 */
export async function waitForAllRequests(timeout: number = 30000) {
  let itr = 0;
  while (ongoingRequests.size > 0) {
    if (itr >= timeout) {
      break;
    }
    await new Promise(resolve => setTimeout(resolve, 250));
    itr = itr + 250;
  }
  if (ongoingRequests.size > 0) {
    logger.warn('ongoing requests still exists in the application, exceeding the timeout : ' + timeout);
    logger.warn('ongoing requests size : ' + ongoingRequests.size);
    const onGoingUrls: string[] = [];
    ongoingRequests.forEach(r => onGoingUrls.push(r.url()));
    logger.warn(`on going urls : ${JSON.stringify(onGoingUrls)}`);
    ongoingRequests.clear();
  }
  logger.info(`waited ${itr / 1000} seconds for requests to finish`);
}
