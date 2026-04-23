export function stringify(data: any, pretty: boolean = true) {
  return pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data);
}
/**
 * Get Random alphabets
 * @param length
 * @returns
 */
export function createRandomString(length: number) {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function createRandomNum(length: number) {
  const chars = '1234567890';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function createRandomNumWithinRange(min: number, max: number): string {
  //return Math.random() * (max - min) + min;
  const result: number = Math.ceil(Math.random() * (max - min)) + min - 1;
  return result.toString();
}
