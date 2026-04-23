import 'dotenv/config';
import { Env, Environments } from './types';

// TEST_ENV property can be configured from .env file or from environmental variables

/**
 * APP name constants
 */
export const APP = {
  policyCenter: 'PolicyCenter',
  billingCenter: 'BillingCenter',
  claimCenter: 'ClaimCenter',
  contactManager: 'ContactManager',
};

/**
 * filter and get env details based on key
 * @param name name of the env to be retrieved
 * @returns env details
 */
export function getEnv(name?: string): Env {
  if (!name) {
    name = process.env.TEST_ENV ? process.env.TEST_ENV : 'onprem';
  }
  const result: Env = environments.filter(env => env.name == name)[0];
  if (!result) {
    throw new Error('No Environment available with name : ' + name);
  }
  return result;
}


/**
 * filter and get application details
 * @param name name of the application to be retrieved for an given env
 * @returns application information
 */
export function getApplication(name: string, envName?: string) {
  const env: Env = getEnv(envName);
  const result = env.application.filter(app => app.name == name)[0];
  if (!result) {
    throw new Error('No Application available with name : ' + name);
  }
  return result;
}

export const baseUrl = (app: string, env: string) => {
  env = env.toLowerCase();
  switch (env) {
    case 'cloud':
      return `https://${app}-dev-gwcpdev.cpstratus.zeta1-andromeda.guidewire.net/ClaimCenter.do?iss=https%3A%2F%2Fguidewire-hub.okta.com`;
    case 'onprem':
      return `http://www.stratustechsandbox.com:8080/${app}/ClaimCenter.do`;
    default:
      return `https://${app}-dev-gwcpdev.cpstratus.zeta1-andromeda.guidewire.net/ClaimCenter.do?iss=https%3A%2F%2Fguidewire-hub.okta.com`;
  }
};

const environments: Environments = [
  {
    name: 'cloud',
    application: [
      {
        name: APP.policyCenter,
        url: baseUrl('pc', 'cloud'),
        user: [],
        properties: {
          apiBaseUrl: '',
        },
      },
      {
        name: APP.billingCenter,
        url: baseUrl('bc', 'cloud'),
        user: [],
        properties: {
          apiBaseUrl: '',
        },
      },
      {
        name: APP.claimCenter,
        url: baseUrl('cc', 'cloud'),
        user: [],
        properties: {
          apiBaseUrl: '',
        },
      },
      {
        name: APP.contactManager,
        url: baseUrl('cm', 'cloud'),
        user: [],
        properties: {},
      },
    ],
    properties: {},
  },
  {
    name: 'onprem',
    application: [
      {
        name: APP.policyCenter,
        url: baseUrl('pc', 'onprem'),
        user: [],
        properties: {
          apiBaseUrl: '',
        },
      },
      {
        name: APP.billingCenter,
        url: baseUrl('bc', 'onprem'),
        user: [],
        properties: {
          apiBaseUrl: '',
        },
      },
      {
        name: APP.claimCenter,
        url: baseUrl('cc', 'onprem'),
        user: [],
        properties: {
          apiBaseUrl: '',
        },
      },
      {
        name: APP.contactManager,
        url: baseUrl('cm', 'onprem'),
        user: [],
        properties: {},
      },
    ],
    properties: {},
  },
];
