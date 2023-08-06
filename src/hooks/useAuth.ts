import { useToken, useUser } from '~/stores';
import { LoginData } from '~/types';

interface LoginParams {
  data: LoginData;
  callback?: () => void;
}

interface LogoutParams {
  callback?: () => void;
}

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

  const login = ({ data, callback = () => {} }: LoginParams) => {
    const { email } = data;

    setToken('sometoken');
    setUser({
      username: email,
      email: email,
    });

    callback();
  };

  const logout = ({ callback = () => {} }: LogoutParams) => {
    removeToken();
    removeUser();

    callback();
  };

  const isAuth = !!token;

  return {
    token,
    user,
    login,
    logout,
    isAuth,
  };
};
