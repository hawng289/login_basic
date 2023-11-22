// AuthContext.js
import { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (token) => {
    // Xử lý đăng nhập
    Cookies.set('token', token, { expires: 1 }); // 1 ngày
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Xử lý đăng xuất
    Cookies.remove('token');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
