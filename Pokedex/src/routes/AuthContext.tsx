import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface AuthState {
    token: string | null;
    user: string | null;
    loading: boolean;
}

interface AuthContextType {
  auth: AuthState;
  login: (token: string, user: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({ token: null, user: null, loading: true });

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      fetch('http://localhost:5000/protected', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
      })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Token invalid');
        })
        .then(data => {
          setAuth({ token, user: data.username, loading: false });
        })
        .catch(() => {
          setAuth({ token: null, user: null, loading: false });
        });
    } else {
      setAuth({ token: null, user: null, loading: false });
    }
  }, []);

  const login = (token: string, user: string) => {
        localStorage.setItem('access_token', token);
        setAuth({ token, user, loading: false });
  };

  const logout = () => {
        localStorage.removeItem('access_token');
        setAuth({ token: null, user: null, loading: false });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
        {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
