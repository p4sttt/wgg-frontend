import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { User } from '~/types';

interface TokenState {
  token: null | string;
  setToken: (token: string) => void;
  removeToken: () => void;
}

export const useToken = create(
  persist(
    devtools<TokenState>((set) => ({
      token: null,
      setToken: (token: string) => set(() => ({ token: token })),
      removeToken: () => set(() => ({ token: null })),
    })),
    { name: 'wgg-token-store' },
  ),
);

interface UserState {
  user: null | User;
  setUser: (user: User) => void;
  removeUser: () => void;
}

export const useUser = create(
  persist(
    devtools<UserState>((set) => ({
      user: null,
      setUser: (user: User) => set(() => ({ user: user })),
      removeUser: () => set(() => ({ user: null })),
    })),
    { name: 'wgg-user-store' },
  ),
);
