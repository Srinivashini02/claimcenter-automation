import { CheckData, Claim, ExposureData, LossData, PolicyData, ReservesData } from '../types/cc-types';
import { getDataByID } from '@tests/utilities/general/data-utils';
import { dataFilePaths } from '@tests/constants/cloud/cloud-constants';

export async function getClaimsData(TCID: string): Promise<Claim> {
  // Read each sheet using getDataByID
  const policyRows = await getDataByID(dataFilePaths.claimCenterData, 'policyData', TCID);
  const lossRows = await getDataByID(dataFilePaths.claimCenterData, 'lossData', TCID);
  const exposureData = (await getDataByID(dataFilePaths.claimCenterData, 'exposureData', TCID)) as ExposureData[];
  const reservesData = (await getDataByID(dataFilePaths.claimCenterData, 'reservesData', TCID)) as ReservesData[];
  const checkData = (await getDataByID(dataFilePaths.claimCenterData, 'checkData', TCID)) as CheckData[];

  const policyData = policyRows[0] as PolicyData;
  const lossData = lossRows[0] as LossData;
  const exposureDataArray = exposureData.length > 0 ? exposureData : [];
  const reservesDataArray = reservesData.length > 0 ? reservesData : [];
  const checkDataArray = checkData.length > 0 ? checkData : [];
  if (!policyData) throw new Error(`No policyData found for TCID: ${TCID}`);

  const claim: Claim = {
    policyData,
    lossData,
    exposureData: exposureDataArray,
    reservesData: reservesDataArray,
    checkData: checkDataArray,
  };
  return claim;
}
