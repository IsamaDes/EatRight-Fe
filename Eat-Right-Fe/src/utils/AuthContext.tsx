import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  // Sync token to localStorage
  const updateToken = (newToken: string | null) => {
    if (newToken) localStorage.setItem("token", newToken);
    else localStorage.removeItem("token");
    setToken(newToken);
  };

  return (
    <AuthContext.Provider value={{ token, setToken: updateToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
