import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { User } from '../types';
import { users as initialUsers } from '../data/users';

interface AuthContextType {
  user: User | null;
  users: User[];
  login: (userToLogin: User) => void;
  logout: () => void;
  register: (newUser: Omit<User, 'password'>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(initialUsers);

  const login = (userToLogin: User) => {
    const foundUser = users.find(u => u.email.toLowerCase() === userToLogin.email.toLowerCase());
    if (foundUser) {
      const { password, ...userToStore } = foundUser;
      setUser(userToStore);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const register = (newUser: Omit<User, 'password'>) => {
    const userWithMockPassword = { ...newUser, password: 'password123' };
    setUsers(prevUsers => [...prevUsers, userWithMockPassword]);
  };

  return (
    <AuthContext.Provider value={{ user, users, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};