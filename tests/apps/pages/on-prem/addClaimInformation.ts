import { getPage } from '@playwright-utils';
import { steps } from '@playwright-utils/steps';
import { pageComponents } from 'test-setup/locator-templates';
import { Claim } from '@tests/testdata/types/cc-types';

const nextButton = pageComponents.onprem.button('Next', 'Next Button');
const lossCauseVal = pageComponents.onprem.dropdown('Loss Cause', 'loss cause input');
const whatHappened = pageComponents.onprem.textarea('What Happened?', 'what happened');
const locate = pageComponents.onprem.dropdown('Location', 'location Input');
const addClaimInformationPage = pageComponents.onprem.pageTitle('Add claim information', 'Add claim information');

export async function addclaimInfo(claimsData: { claim: Claim }) {
  const page = getPage();
  await steps.waitForPageToLoad(addClaimInformationPage);
  await steps.typeText(whatHappened, claimsData.claim.lossData?.whatHappened ?? '');
  await steps.selectOptionByText(lossCauseVal, claimsData.claim.lossData?.lossCause ?? '');
  await steps.selectOptionByPartialText(
    locate,
    `${claimsData.claim.policyData.address1 ?? ' '}, ${claimsData.claim.policyData.city ?? ' '}`,
    // locate,
    // `${claimsData.claim.policyData.address1 ?? ' '}, ${claimsData.claim.policyData.city ?? ' '}, ${claimsData.claim.policyData.state ?? ' '} ${claimsData.claim.policyData.zipcode ?? ' '}`,
  );
  await steps.click(nextButton);
}
