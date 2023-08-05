import { redirect } from 'react-router-dom';

import { useToken, useUser } from '~/stores';
import { LoginData } from '~/types';

export const useAuth = () => {
  const [token, setToken, removeToken] = useToken((state) => [
    state.token,
    state.setToken,
    state.removeToken,
  ]);
  const [user, setUser, removeUser] = useUser((state) => [
    state.user,
    state.setUser,
    state.removeUser,
  ]);

  const login = (data: LoginData) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        setToken('sometoken');
        setUser({
          username: 'someusername',
          email: 'someemail',
        });
      }, 1000);
    });

  const logout = () => {
    removeToken();
    removeUser();
    return redirect('/');
  };

  return {
    token,
    user,
    login,
    logout,
  };
};
