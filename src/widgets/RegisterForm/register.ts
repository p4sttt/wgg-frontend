import axios from '~/axios';
import { UserRegisterData } from '~/types';

const register = async (registerData: UserRegisterData) => {
  const res = await axios.post('/auth/register', registerData);
  return res;
};

export default register;
