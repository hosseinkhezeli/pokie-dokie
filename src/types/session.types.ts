export type TCreateSessionBody = {
  name: string;
};

export type TJoinSessionBody = {
  sessionId: string;
};

export type TSessionOwner = {
  id: number;
  email: string;
  fullName: string;
};

export type TSession = {
  id: number;
  name: string;
  active: true;
  createdAt: string | Date;
  updatedAt: string | Date;
  owner: TSessionOwner;
};
