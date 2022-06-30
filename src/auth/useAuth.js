import { useContext } from 'react';
import jwtDecode from 'jwt-decode';
import AuthContext from './context';
import authStorage from './storage';

export default function useAuth() {
  const { user, setUser } = useContext(AuthContext);

  const login = (authToken) => {
    const user = jwtDecode(authToken);
    setUser(user);
    authStorage.storeToken(authToken);
  };

  const logout = () => {
    setUser(null);
    authStorage.removeToken();
  };

  return { user, login, logout };
}
