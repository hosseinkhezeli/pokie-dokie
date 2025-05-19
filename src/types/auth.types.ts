export type TLoginParams = {
  username: string;
  password: string;
};

export type TSignUpParams = {
  username: string;
  password: string;
  password2: string;
  email: string;
  first_name: string;
  last_name: string;
};

export type TRefreshTokenParams = {
  refresh: string;
};

export type TRefreshTokenRes = {
  refresh: string;
  access: string;
};