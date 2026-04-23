import { Address } from '@testdata/types/common-types';
import { filePaths } from '@tests/constants/cloud/cloud-constants';
import fs from 'fs';
import path from 'path';

export function readFile(path: string) {
  return fs.readFileSync(path, { encoding: 'utf-8' });
}

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function getAddressByStateName(state: string) {
  const content = readFile(path.join(process.cwd(), 'tests/testdata/commons/addresses_us.json'));
  const json = JSON.parse(content);
  const addresses: any[] = json.address;
  const results = addresses.filter(a => a.state === state);
  const address = results[getRandomInt(results.length)];
  const data: Address = {
    address1: address.address_1,
    zipCode: address.zip_code,
    city: address.city,
    state: address.state,
    addressType: 'Business',
  };
  return data;
}

/**
 * Get address based on the state name
 * @param state
 * @returns
 */
export function getAddress(state: string) {
  const stateAbbreviation = getStateInfo(state, false); // Get the abbreviation for the state
  if (!stateAbbreviation) {
    console.error(`Invalid state input: ${state}`);
    return {};
  }

  // Now use the abbreviation to get the address
  const address: Address = {};
  // const address: Address = validAddress[stateAbbreviation as keyof typeof validAddress];

  if (!address) {
    console.error(`Address not found for state abbreviation: ${stateAbbreviation}`);
    return {};
  }

  return address;
}

/**
 * Get a state name or satte abbrevation
 * @param requiredStateNameOrAbbreviation
 * @param requiredStateName
 * @returns
 */
export function getStateInfo(requiredStateNameOrAbbreviation: string, requiredStateName: boolean): string | null {
  // Read typelist JSON file and get the stateAndAbbreviation object
  const data = fs.readFileSync(filePaths.typelistJsonpath, 'utf8');

  const jsonData = JSON.parse(data) as { stateAndAbbreviation: { [key: string]: string } };
  const stateAndAbbreviation = jsonData.stateAndAbbreviation;

  // Get the abbreviation for the requiredStateNameOrAbbreviation
  const upperInput = requiredStateNameOrAbbreviation.toUpperCase();

  // If requiredStateNameOrAbbreviation is abbreviation instead of state name
  if (requiredStateName) {
    // Return the state name
    return stateAndAbbreviation[upperInput] || null;
  } else {
    // Return the abbreviation if found
    if (upperInput in stateAndAbbreviation) {
      return upperInput;
    }

    // If requiredStateNameOrAbbreviation is state name instead of abbreviation
    const foundEntry = Object.entries(stateAndAbbreviation).find(
      ([, name]) => name.toLowerCase() === requiredStateNameOrAbbreviation.toLowerCase(),
    );

    // Debugging log if state name is not found
    if (!foundEntry) {
      console.error(`State name '${requiredStateNameOrAbbreviation}' not found in the list.`);
    }

    return foundEntry ? foundEntry[0] : null;
  }
}

export function getStateCode(name: string) {
  return getStateInfo(name, false);
}
