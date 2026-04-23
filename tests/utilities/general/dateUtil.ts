import { logger } from '@playwright-utils';

export const dateFormat = 'MM/dd/yyyy';
export const dateFormatDigital = { year: 'numeric', month: '1-digit', day: '1-digit' };

/**
 * Get the date in 'MM/dd/yyyy'
 * Send sample date if you require it 'MM/dd/yyyy' format
 * Leave it blank if you require current data
 * @param sampleDate
 * @returns
 */
export function getDate(sampleDate?: string): string {
  let date;
  if (sampleDate === undefined) {
    date = new Date();
  } else {
    date = new Date(sampleDate);
  }
  // return date.toLocaleDateString();
  return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

/**
 * Add days to a date
 * Send sample date if you require to add days to a date
 * Leave it blank if you require to add days to current date
 * @param noOfDays
 * @param sampleDate
 * @returns
 */
export function addDaysToDate(noOfDays: number, sampleDate?: string) {
  const date = new Date(getDate(sampleDate));
  date.setDate(date.getDate() + noOfDays);
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

/**
 * Subtract days to a date
 * Send sample date if you require to subtract years to a date
 * Leave it blank if you require to subtract years to current date
 * @param noOfDays
 * @param sampleDate
 * @returns
 */
export function subtractDaysToDate(noOfDays: number, sampleDate?: string) {
  const date = new Date(getDate(sampleDate));
  date.setDate(date.getDate() - noOfDays);
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

/**
 * Add days to a date
 * Send sample date if you require to add days to a date
 * Leave it blank if you require to add days to current date
 * @param noOfDays
 * @param sampleDate
 * @returns
 */
export function addMonthsToDate(noOfDays: number, sampleDate?: string) {
  const date = new Date(getDate(sampleDate));
  date.setMonth(date.getMonth() + noOfDays);
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

/**
 * Subtract days to a date
 * Send sample date if you require to subtract years to a date
 * Leave it blank if you require to subtract years to current date
 * @param noOfDays
 * @param sampleDate
 * @returns
 */
export function subtractMonthToDate(noOfDays: number, sampleDate?: string) {
  const date = new Date(getDate(sampleDate));
  date.setMonth(date.getMonth() - noOfDays);
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

/**
 * Add years to a date
 * Send sample date if you require to add years to a date
 * Leave it blank if you require to add years to current date
 * @param noOfYears
 * @param sampleDate
 * @returns
 */
export function addYearsToDate(noOfYears: number, sampleDate?: string) {
  const date = new Date(getDate(sampleDate));
  date.setFullYear(date.getFullYear() + noOfYears);
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

/**
 * Subtract years to a date
 * Send sample date if you require to subtract years to a date
 * Leave it blank if you require to subtract years to current date
 * @param noOfYears
 * @param sampleDate
 * @returns
 */
export function subtractYearsToDate(noOfYears: number, sampleDate?: string) {
  const date = new Date(getDate(sampleDate));
  date.setFullYear(date.getFullYear() - noOfYears);
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

/**
 * Calculate age from date of birth
 * @param dateofBirth
 * @returns
 */
export function getAge(dateofBirth: string): string {
  const currentDate = new Date();
  const dob = new Date(dateofBirth);

  if (isNaN(dob.getTime())) {
    logger.error('Invalid date Of birth sent');
    return 'Invalid date Of birth';
  }

  const age = currentDate.getFullYear() - dob.getFullYear();
  if (
    currentDate.getMonth() < dob.getMonth() ||
    (currentDate.getMonth() === dob.getMonth() && currentDate.getDate() < dob.getDate())
  ) {
    return (age - 1).toString();
  }
  return age.toString();
}

/**
 * Add a month from the given date for due dates
 * @param existingDueDate
 * @returns
 */
export function calculateDueDateForInvoice(existingDueDate: string) {
  //Get the due date in date format
  const date = new Date(getDate(existingDueDate));

  //Get the day part from due date
  const day = date.getDate();

  //Add one month
  date.setMonth(date.getMonth() + 1);

  //If the new month has less days than 30 or 31 days the setting the date to last day of the previous month
  if (date.getDate() < day) {
    date.setDate(0);
  }
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

/**
 * Get number of days difference for any 2 dates sent
 * @param date1
 * @param date2
 * @returns
 */
export function getDifferenceBetweenDays(date1: string, date2: string): number {
  const endDate = parseToUTC(getDate(date2));
  const startDate = parseToUTC(getDate(date1));
  const timeDifference = Math.abs(endDate.getTime() - startDate.getTime());
  return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
}

/**
 * Get DOB based on age
 * @param age
 * @returns
 */
export function getDateByAge(age: number): string {
  const currentYear = new Date().getFullYear();
  const dobYear = currentYear - age;
  const dob = new Date(dobYear, new Date().getMonth(), new Date().getDate());
  return dob.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

export function getDateInFormat(format: string, requiredDate?: string) {
  const tmpDate = requiredDate != undefined ? getDate() : requiredDate;
  const date = new Date(tmpDate!);
  switch (format) {
    case 'm/dd/yyyy':
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });
    default:
      return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
  }
}

export function getCurrentTime(requiredTieFormat: string) {
  const dt = new Date();
  const hr = dt.getHours();
  const min = dt.getMinutes();
  const sec = dt.getSeconds();

  const hrs = hr % 12 || 12;
  let hours, minutes, seconds, amOrPM, time;
  switch (requiredTieFormat) {
    case 'h:ss':
      hours = hrs.toString();
      minutes = min < 10 ? '0' + min.toString() : min.toString();
      time = hours + ':' + minutes;
      console.log(`Time for ${requiredTieFormat} is: ${time}`);
      break;
    case 'hh:ss':
      hours = hrs < 10 ? '0' + hrs.toString() : hrs.toString();
      minutes = min < 10 ? '0' + min.toString() : min.toString();
      time = hours + ':' + minutes;
      console.log(`Time for ${requiredTieFormat} is: ${time}`);
      break;
    default:
      hours = hrs < 10 ? '0' + hrs.toString() : hrs.toString();
      minutes = min < 10 ? '0' + min.toString() : min.toString();
      seconds = sec < 10 ? '0' + sec.toString() : sec.toString();
      amOrPM = hr >= 12 ? 'PM' : 'AM';
      time = hours + ':' + minutes + ':' + seconds + ' ' + amOrPM;
      console.log(`Time for ${requiredTieFormat} is: ${time}`);
      break;
  }
  return time;
}

/**
 * Convert date to UTC
 * @param date
 * @returns
 */
export function parseToUTC(date: string): Date {
  const [month, day, year] = date.split('/').map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

export function calculateDate(date: string, fromDate?: string) {
  let reqDate = '';
  fromDate = fromDate === undefined || fromDate === '' ? getDate() : date;
  console.log(fromDate);
  const operator = date.split(` `)[0];
  const tmp = date.split(` `)[1];
  const num = parseInt(tmp.replace(tmp.at(tmp.length - 1)!, ''));
  const operand = tmp.at(tmp.length - 1)!;

  switch (operand) {
    case 'D':
      if (operator === '+') {
        reqDate = addDaysToDate(num, fromDate);
      } else {
        reqDate = subtractDaysToDate(num, fromDate);
      }
      break;
    case 'M':
      if (operator === '+') {
        reqDate = addMonthsToDate(num, fromDate);
      } else {
        reqDate = subtractMonthToDate(num, fromDate);
      }
      break;
    case 'Y':
      if (operator === '+') {
        reqDate = addYearsToDate(num, fromDate);
      } else {
        reqDate = subtractYearsToDate(num, fromDate);
      }
      break;
  }
  logger.info(`Date calculated: ${reqDate} - from date ${fromDate} ${date}`);
  return reqDate;
}

/**
 * Subtract years to a date
 * Send sample date if you require to subtract years to a date
 * Leave it blank if you require to subtract years to current date
 * @param noOfYears
 * @param sampleDate
 * @returns year
 */
export function getCalculatedYear(noOfYears: number, sampleDate?: string) {
  const date = subtractYearsToDate(noOfYears, sampleDate);
  return date.split('/')[2];
}

export function getDateUSFormat(date: string) {
  const isodate = new Date(date);
  const localedateformat = isodate.toLocaleDateString('en-US');
  const split = localedateformat.split('/');
  let outputDate: string, outputMonth: string;
  let finalDate: string;

  if (split[0].length == 1) {
    outputDate = '0' + split[0];
  } else {
    outputDate = split[0];
  }
  if (split[1].length == 1) {
    outputMonth = '0' + split[1];
  } else {
    outputMonth = split[1];
  }
  // eslint-disable-next-line prefer-const
  finalDate = outputDate + '/' + outputMonth + '/' + split[2];
  return finalDate;
}
