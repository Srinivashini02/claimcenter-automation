import { Contact } from './common-types';

export type PCSubmissionData = {
  accountData?: AccountData;
};

export type AccountData = {
  contactData?: Contact;
  organizationData?: OrganizationData;
};

export type OrganizationData = {
  organizationName?: string;
  producerCode?: string;
};

export type ProductType = 'Homeowners' | 'Auto' | 'Property';
