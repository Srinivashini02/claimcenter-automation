function equalsAny(s1: string, ...s2: string[]) {
  return s2.includes(s1);
}

function equalsAnyIgnoringCase(s1: string, ...s2: string[]) {
  const array = s2.flatMap(s => s.toLocaleLowerCase());
  return array.includes(s1.toLocaleLowerCase());
}

function containsAny(s1: string, ...s2: string[]) {
  const value = s2.filter(s => s.includes(s1));
  return value !== undefined;
}

function parseStringToBoolean(value?: string) {
  if (!value) return false;
  if (equalsAnyIgnoringCase(value, 'Yes', 'yes', 'true')) return true;
  else if (equalsAnyIgnoringCase(value, 'No', 'no', 'false')) return false;
  else throw new Error('to parse string, the value should be [ yes, no, true, false] but found ' + value);
}

function toBoolean(value?: string) {
  if (!value) return false;
  if (equalsAnyIgnoringCase(value, 'yes', 'true')) return true;
  else if (equalsAnyIgnoringCase(value, 'no', 'false')) return false;
  else throw new Error('to parse string, the value should be [ yes, no, true, false] but found ' + value);
}

function stringifyJSON(o: object, prettify: boolean = true): string {
  const value = prettify ? JSON.stringify(o, null, 2) : JSON.stringify(o);
  return value;
}

const stringUtils = { equalsAny, equalsAnyIgnoringCase, containsAny, parseStringToBoolean, toBoolean, stringifyJSON };

export function deleteProperty(
  data: Record<string | number, any> | { [key: string | number]: any },
  removeKey: string | number,
) {
  const filtered: Record<string | number, any> = {};
  const keys = Object.keys(data);
  for (const key of keys) {
    if (key !== removeKey) {
      filtered[key] = data[key];
    }
  }
  const filteredJsonString = JSON.stringify(filtered);
  const jsonObject: Record<string | number, any> | { [key: string | number]: any } = JSON.parse(filteredJsonString);
  return jsonObject;
}

export default stringUtils;
