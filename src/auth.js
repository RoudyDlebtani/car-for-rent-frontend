import { createContext, useContext, useState } from "react";

/* Shared auth state for the app. Token + user persist in localStorage so a
   refresh keeps the session; updating via login()/logout() keeps the navbar,
   account page and details page in sync (plain localStorage isn't reactive). */
const AuthContext = createContext(null);

const TOKEN_KEY = "authToken";
const USER_KEY = "authUser";

function readUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(readUser);

  const login = (nextToken, nextUser) => {
    localStorage.setItem(TOKEN_KEY, nextToken);
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
    setToken(nextToken);
    setUser(nextUser);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}

/* Authorization header for protected API calls. */
export function authHeaders(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}
