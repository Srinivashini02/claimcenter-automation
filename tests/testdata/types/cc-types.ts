import { Address, Contact } from './common-types';

export interface ClaimCenterData {
  claim: Claim;
  insured: Contact;
  lossLocation: Address;
}

export interface Claim {
  claimNumber?: string;
  policyNumber: string;
  policyType: string;
  claimType: string;
  lossInfo: LossInfo;
  description: string;
}

export interface LossInfo {
  lossDate: string;
  effectiveDate: string;
  expirationDate: string;
}