import { create } from 'zustand';

interface IUser {
  fullname: string | null;
  email: string | null;
}

interface IUserProfileStore {
  user: IUser | null;
  token: string | null;
  setUser: (user: IUser | null) => void;
  setToken: (token: string | null) => void;
  clearUser: () => void;
}

export const useProfileStore = create<IUserProfileStore>((set) => ({
  user: null,
  token: null,

  setUser: (user: IUserProfileStore['user']) => set({ user }),
  setToken: (token) => set({ token }),

  clearUser: () => set({ token: null, user: null }),
}));
