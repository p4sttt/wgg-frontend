import { create } from 'zustand';

import { User } from '~/types';

interface TokenState {
  token: null | string;
  setToken: (token: string) => void;
  removeToken: () => void;
}

export const useToken = create<TokenState>((set) => ({
  token: null,
  setToken: (token: string) => set(() => ({ token: token })),
  removeToken: () => set(() => ({ token: null })),
}));

interface UserState {
  user: null | User;
  setUser: (user: User) => void;
  removeUser: () => void;
}

export const useUser = create<UserState>((set) => ({
  user: null,
  setUser: (user: User) => set(() => ({ user: user })),
  removeUser: () => set(() => ({ user: null })),
}));
