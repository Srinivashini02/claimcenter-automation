// Types for each sheet
export type PolicyData = {
  TCID: string;
  policyType: string;
  lob: string;
  policyNumber: string;
  date: string;
  effDate: string;
  expDate: string;
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  state: string;
  zipcode: string;
  addressType: string;
};

export type LossData = {
  whatHappened: string;
  lossCause: string;
  vehicleCondition: string;
  vehicleType: string;
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleStyle: string;
  vehicleColor: string;
  vehicleLicensePlate: string;
  vehicleLicenseState: string;
  vehicleVIN: string;
  vehicleStolen: string;
  vehicleParked: string;
  vehicleDamage: string;
  faultRating: string;
};

export type ExposureData = {
  TCID: string;
  coverageType: string;
  coverageSubType: string;
  coverage: string;
  claimant: string;
  type: string;
  vehicle: string;
};

export type ReservesData = {
  TCID: string;
  exposure: string;
  costType: string;
  coverage: string;
  costCategory: string;
  availableReserve: string;
};

export type CheckData = {
  TCID: string;
  Amount: string;
  Payee: string;
};

// Main Claim type
export type Claim = {
  policyData: PolicyData;
  lossData: LossData;
  exposureData: ExposureData[];
  reservesData: ReservesData[];
  checkData: CheckData[];
};
