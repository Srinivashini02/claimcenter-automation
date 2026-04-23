export type Contact = {
  contactType?: 'New Person' | 'Person' | 'New Company' | 'From Address Book';
  relationShip?: string;
  companyName?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  suffix?: string;
  dateOfBirth?: string;
  maritalStatus?: string;
  primaryPhone?: string;
  homePhone?: string;
  workPhone?: string;
  mobilePhone?: string;
  faxPhone?: string;
  officePhone?: string;
  fax?: string;
  primaryEmail?: string;
  secondaryEmail?: string;
  address?: Address;
  ssn?: string;
  fein?: string;
  organizationType?: string;
};

export type Address = {
  country?: string;
  county?: string;
  zipCode?: string;
  city?: string;
  state?: string;
  address1?: string;
  address2?: string;
  address3?: string;
  addressType?: string;
  addressDescription?: string;
};
