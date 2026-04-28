import { isEmpty } from 'lodash';
import { Address, Contact } from '../types/common-types';
import { createRandomString } from '@tests/utilities/general/commons';
import { AccountData, PCSubmissionData } from '../types/pc-types';
import { ClaimCenterData } from '../types/cc-types';
import { getDataByID } from '@tests/utilities/general/data-utils';
import { dataFilePaths } from '@tests/constants/cloud/cloud-constants';
import { firstName } from '@tests/apps/shared/cloud/contact';

export async function getClaimsData(testCaseID: string): Promise<ClaimCenterData> {
  const excelData = await getDataByID(dataFilePaths.claimCenterData, 'claimsData', testCaseID);
  if (isEmpty(excelData)) throw new Error(`unable to fetch claims data using id ${testCaseID}`);
  const data: { [x: string]: any } = excelData[0];

  //TODO: to be used once we have relevant data in excel sheet, currently returning empty object to avoid test failures
  //   const insured: Contact = getContactDetails(data);
  //   const lossLocation: Address = getAddress(data);

  const insured: Contact = {};
  const lossLocation: Address = {};
  const claim = {
    claimNumber: data['claimNumber'],
    policyNumber: data['policyNumber'],
    policyType: data['policyType'],
    claimType: data['claimType'],
    lossInfo: {
      lossDate: data['date'],
      effDate: data['effDate'],
      expDate: data['expDate'],
      whatHappened: data['whatHappened'],
      lossCause: data['lossCause'],
    },
    description: data['description'],
    firstName: data['firstName'],
    lastName: data['lastName'],
    address1: data['address1'],
    city: data['city'],
    state: data['state'],
    zipcode: data['zipcode'],
    addressType: data['addressType'],
  };

  const claimCenterData: ClaimCenterData = {
    claim,
    insured,
    lossLocation,
  };

  return claimCenterData;
}
//TODO: Not yet used, need to reuse for claims data
export function getAddress(data: { [x: string]: any }) {
  const address: Address = {
    address1: data['address1'],
    address2: data['address2'],
    address3: data['address3'],
    city: data['city'],
    state: data['state'],
    zipCode: data['zipCode'],
    addressType: data['addressType'],
    addressDescription: data['addressDescription'],
    country: data['country'],
    county: data['county'],
  };
  return address;
}
//TODO: Not yet used, need to reuse for claims data
export function getContactDetails(data: { [x: string]: any }) {
  const adress: Address = getAddress(data);
  const contactData: Contact = {
    contactType: data['contactType'],
    address: adress,
    firstName: data['firstName'],
    lastName: data['lastName'] || createRandomString(5),
    primaryPhone: data['primaryPhone'],
    mobilePhone: data['mobilePhone'],
    primaryEmail: data['primaryEmail'],
    relationShip: data['relationShip'],
    companyName: data['companyName'],
    middleName: data['middleName'],
    suffix: data['suffix'],
    dateOfBirth: data['dateOfBirth'],
    maritalStatus: data['maritalStatus'],
    homePhone: data['homePhone'],
    workPhone: data['workPhone'],
    faxPhone: data['faxPhone'],
    officePhone: data['officePhone'],
    fax: data['fax'],
    secondaryEmail: data['secondaryEmail'],
    ssn: data['ssn'],
    fein: data['fein'],
    organizationType: data['organizationType'],
  };
  return contactData;
}
