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
  data: { token: string; email: string; fullName: string };
  message: string;
};
