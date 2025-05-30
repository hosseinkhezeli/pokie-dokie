export type TLoginParams = {
  email: string;
  password: string;
};

export type TSignUpParams = {
  fullname: string;
  password: string;
  email: string;
};

export type TLoginRes = {
  data: { email: string; fullname: string; token: string };
  message: string;
};
