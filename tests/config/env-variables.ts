import 'dotenv/config';

export const Keys = {
  environment: process.env.ENV || 'qae',
  username: process.env.SU_USERNAME || 'su',
  password: process.env.SU_PASSWORD || 'gw',
};

export function getUserPassword(role: string) {
  const envName = process.env.TEST_ENV || 'qa2';
  const resolvedRole = role.replace(/[^a-zA-Z0-9]/g, '_');
  if (envName === 'onprem') {
    const password = `${resolvedRole.toUpperCase()}_${envName.toUpperCase()}_PASSWORD`;
    return process.env[password];
  } else {
    const password = `${resolvedRole.toUpperCase()}_DEV_${envName.toUpperCase()}_PASSWORD`;
    return process.env[password];
  }
}

export function getUsername(role: string) {
  const envName = process.env.TEST_ENV || 'qa2';
  const resolvedRole = role.replace(/[^a-zA-Z0-9]/g, '_');
  const username = `${resolvedRole.toUpperCase()}_${envName.toUpperCase()}_USERNAME`;
  return process.env[username];
}
