import { Address, Contact } from './common-types';

export type ClaimCenterData = {
  claim: Claim;
  insured?: Contact;
  lossLocation?: Address;
};

export type Claim = {
  claimNumber?: string;
  policyNumber?: string;
  policyType?: string;
  claimType?: string;
  lossInfo?: LossInfo;
  description?: string;
  date?: string;
  effDate?: string;
  expDate?: string;
  firstName?: string;
  lastName?: string;
  address1?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  addressType?: string;
};

export type LossInfo = {
  lossDate?: string;
  effectiveDate?: string;
  expirationDate?: string;
  whatHappened?: string;
  lossCause?: string;
};
