import { createContext, useContext, useEffect, useState } from "react";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("userRole");

    if (storedToken) {
      setToken(storedToken);
      setUserRole(storedRole);
      setIsLoggedIn(true);
    } else {
      setToken(null);
      setUserRole(null);
      setIsLoggedIn(false);
    }

    setLoading(false);
  }, []);

  // ✅ LOGIN FUNCTION
  const login = (newToken, role = null) => {
    localStorage.setItem("token", newToken);
    if (role) {
      localStorage.setItem("userRole", role);
      setUserRole(role);
    }
    setToken(newToken);
    setIsLoggedIn(true);
  };

  // ✅ LOGOUT FUNCTION
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    setToken(null);
    setUserRole(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        token,
        userRole,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// custom hook (clean usage)
export const useAuth = () => useContext(AuthContext);