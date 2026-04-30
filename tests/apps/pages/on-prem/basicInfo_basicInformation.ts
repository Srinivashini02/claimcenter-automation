import { steps } from '@playwright-utils/steps';
import { pageComponents } from 'test-setup/locator-templates';

const nextButton = pageComponents.cloud.button('Next', 'Next Button');
const reportedByNameOn = pageComponents.onprem.dropdown('Name', 'Name');
const basicInformationPage = pageComponents.cloud.pageTitle('Basic information', 'Basic information');

export async function basicInfo(fullName: string) {
  await steps.waitForPageToLoad(basicInformationPage);
  await steps.selectOptionByText(reportedByNameOn, fullName);
  await steps.click(nextButton);
}
