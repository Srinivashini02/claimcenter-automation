import { getUserPassword } from './env-variables';
import { User } from './types';
import 'dotenv/config';
// constants for user roles
export const roles = {
  superuser: 'Super User',
  uwManager: 'UW Manager',
};

/**
 * filter and get user by role for a given list of users
 * @param users list of users
 * @param role searchable role key string
 * @param appName application name for exception message
 * @returns user details in User type
 */
export function getUser(users: User[], role: string, appName: string) {
  const result = users.filter(user => user.role == role)[0];
  if (!result) {
    throw new Error(`unable to find the user with role : ${role} in the ${appName} user list`);
  }
  return result;
}

/**
 * filter and get user details by role for a given PolicyCenter Users
 * @param role search key
 * @returns user details
 */
export const getPolicyCenterUser = (role: string): User => {
  return getUser(policyCenterUsers, role, 'PolicyCenter');
};

/**
 * filter and get user details by role for a given BillingCenter Users
 * @param role search key
 * @returns user details
 */
export const getBillingCenterUser = (role: string): User => {
  return getUser(billingCenterUsers, role, 'BillingCenter');
};

/**
 * filter and get user details by role for a given DigitalBHHC Users
 * @param role search key
 * @returns user details
 */
export const getClaimCenterUser = (role: string): User => {
  return getUser(claimCenterUsers, role, 'ClaimCenter');
};

/**
 * filter and get user details by role for a given DigitalNICO Users
 * @param role search key
 * @returns user details
 */
export const getContactManagerUser = (role: string): User => {
  return getUser(contactManagerUsers, role, 'ContactManager');
};

export const name = process.env.TEST_ENV ? process.env.TEST_ENV : 'dev';

export const newPassWord = getPassword();

/**
 * filter and get password details
 * @returns password
 */
export function getPassword(): string {
  if (name === 'onprem') {
    return process.env.SUPER_USER_PASSWORD_KEY || '';
  } else {
    return process.env.SUPER_USER_QAE_KEY || '';
  }
}

export const policyCenterUsers: User[] = [
  {
    role: roles.superuser,
    username: 'su',
    password: getUserPassword(roles.superuser),
  },
  {
    role: roles.uwManager,
    username: 'su',
    password: getUserPassword(roles.uwManager),
  },
];

export const billingCenterUsers: User[] = [
  {
    role: roles.superuser,
    username: 'su',
    password: getUserPassword(roles.superuser),
  },
  {
    role: roles.uwManager,
    username: 'su',
    password: getUserPassword(roles.uwManager),
  },
];

export const claimCenterUsers: User[] = [
  {
    role: roles.superuser,
    username: 'su',
    password: getUserPassword(roles.superuser),
  },
  {
    role: roles.uwManager,
    username: 'su',
    password: getUserPassword(roles.uwManager),
  },
];

export const contactManagerUsers: User[] = [
  {
    role: roles.superuser,
    username: 'su',
    password: getUserPassword(roles.superuser),
  },
  {
    role: roles.uwManager,
    username: 'su',
    password: getUserPassword(roles.uwManager),
  },
];
