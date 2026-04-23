// for setting up environment details
export type Env = {
  name: string;
  application: Application[];
  properties: object;
};

// for setting up application information
export type Application = {
  name: string;
  url: string;
  user: User[];
  properties: {
    apiBaseUrl?: string;
  };
};

// for setting up user profile
export type User = {
  role: string;
  username: string | undefined;
  password: string | undefined;
};

export type Environments = Env[];
