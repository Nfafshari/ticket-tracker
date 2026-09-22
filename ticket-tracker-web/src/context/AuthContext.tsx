import { createContext, useContext, useState, type ReactNode } from 'react';
import api from '../lib/api';

// Auth provider context
interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Auth context component
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode; }) {
  const [token, setToken] = useState(localStorage.getItem('token'));

  async function login(email: string, password: string) {
    const res = await api.post('/auth/login', { email, password });
    const newToken = res.data.token;

    localStorage.setItem('token', newToken);
    setToken(newToken);
  }

  async function register(email: string, password: string) {
    await api.post('auth/register', { email, password });
    await login(email, password);
  }

  function logout() {
    localStorage.removeItem('token');
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}