import { UserLoginData, UserRegisterData } from '~/types';
import { useApi } from '~/utils/hooks';
import { useToken, useUser } from '~/utils/stores';

interface SuccesRespose {
  token: string;
  user: {
    email: string;
    username: string;
  };
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
  const { api } = useApi();

  const login = async (loginData: UserLoginData, callback: () => void = () => {}) => {
    return api
      .post<SuccesRespose>('/auth/login', loginData)
      .then((res) => {
        setToken(res.data.token);
        setUser(res.data.user);
        callback();
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  };

  const logout = (callback?: () => void) => {
    removeToken();
    removeUser();
    if (callback) {
      callback();
    }
  };

  const signup = async (registerData: UserRegisterData, callback: () => void = () => {}) => {
    return api
      .post<SuccesRespose>('/auth/register', registerData)
      .then((res) => {
        setToken(res.data.token);
        setUser(res.data.user);
        callback();
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  };

  const isAuthorized = !!token;

  return {
    isAuthorized,
    token,
    user,
    login,
    logout,
    signup,
  };
};
