import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, UserStatus, UserRole } from '../types';
import { users as initialUsers } from '../data/users';

interface AuthContextType {
  user: User | null;
  users: User[];
  login: (userToLogin: User) => boolean;
  logout: () => void;
  register: (newUser: Omit<User, 'password' | 'status' | 'trainings' | 'assignedMissions' | 'pendingTrainings' | 'uniformStatus' | 'rank' | 'subscription' | 'promotionStatus'>) => void;
  createUser: (newUser: Omit<User, 'password' | 'status' | 'trainings' | 'assignedMissions' | 'pendingTrainings' | 'uniformStatus' | 'subscription' | 'promotionStatus'>) => void;
  approveUser: (email: string) => void;
  addTrainingToUser: (trainingId: string) => void;
  assignMissionToUser: (missionId: number) => void;
  reviewTraining: (userEmail: string, trainingId: string, decision: 'approve' | 'deny') => void;
  updateUniformStatus: (userEmail: string, status: User['uniformStatus']) => void;
  applyForPromotion: (email: string) => void;
  reviewPromotion: (email: string, decision: 'approve' | 'deny') => void;
  updateUserSettings: (updatedUser: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(initialUsers);

  const login = (userToLogin: User): boolean => {
    const foundUser = users.find(u => u.email.toLowerCase() === userToLogin.email.toLowerCase());
    if (foundUser) {
       if (foundUser.status !== 'Active') {
        // useNotification is not available here, so we use alert
        alert('This account is pending approval or has been denied. Please contact administration.');
        return false;
      }
      const { password, ...userToStore } = foundUser;
      setUser(userToStore);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const register = (newUser: Omit<User, 'password' | 'status' | 'trainings' | 'assignedMissions' | 'pendingTrainings' | 'uniformStatus' | 'rank' | 'subscription' | 'promotionStatus'>) => {
    const userWithDefaults: User = { 
        ...newUser, 
        password: 'password123',
        status: 'Pending',
        trainings: [],
        pendingTrainings: [],
        uniformStatus: 'Received', // Will be set to 'Needed' upon approval
        assignedMissions: [],
        subscription: 'Basic',
        promotionStatus: 'None',
    };
    if (newUser.role === UserRole.Guard) {
      userWithDefaults.rank = 'OFC (Officer)';
    } else if (newUser.role === UserRole.Supervisor) {
      userWithDefaults.rank = 'SGT (Sergeant)';
    }
    setUsers(prevUsers => [...prevUsers, userWithDefaults]);
  };

  const createUser = (newUser: Omit<User, 'password' | 'status' | 'trainings' | 'assignedMissions' | 'pendingTrainings' | 'uniformStatus' | 'subscription' | 'promotionStatus'>) => {
     const userWithDefaults: User = { 
        ...newUser, 
        password: 'password123',
        status: 'Active',
        trainings: [],
        pendingTrainings: [],
        uniformStatus: 'Needed',
        assignedMissions: [],
        subscription: 'Basic',
        promotionStatus: 'None',
    };
     if (newUser.role === UserRole.Guard) userWithDefaults.rank = 'OFC (Officer)';
     else if (newUser.role === UserRole.Supervisor) userWithDefaults.rank = 'SGT (Sergeant)';
     else if (newUser.role === UserRole.OperationsManager) userWithDefaults.rank = 'LT (Lieutenant)';
     else if (newUser.role === UserRole.OperationsDirector) userWithDefaults.rank = 'CAP (Captain)';
     
     setUsers(prevUsers => [...prevUsers, userWithDefaults]);
  };
  
  const approveUser = (email: string) => {
      setUsers(prevUsers => 
          prevUsers.map(u => 
              u.email === email ? { ...u, status: 'Active', uniformStatus: 'Needed' } : u
          )
      );
  };

  const addTrainingToUser = (trainingId: string) => {
    if (!user) return;
    if (user.trainings.includes(trainingId) || user.pendingTrainings.includes(trainingId)) return;
    
    const updatedUser = { ...user, pendingTrainings: [...user.pendingTrainings, trainingId] };
    setUser(updatedUser);
    setUsers(prevUsers => 
      prevUsers.map(u => 
        u.email === user.email ? updatedUser : u
      )
    );
  };

  const reviewTraining = (userEmail: string, trainingId: string, decision: 'approve' | 'deny') => {
      setUsers(prevUsers => prevUsers.map(u => {
          if (u.email === userEmail) {
              const pending = u.pendingTrainings.filter(id => id !== trainingId);
              if (decision === 'approve') {
                  const completed = [...u.trainings, trainingId];
                  return { ...u, pendingTrainings: pending, trainings: completed };
              }
              return { ...u, pendingTrainings: pending };
          }
          return u;
      }));
  };

  const updateUniformStatus = (userEmail: string, status: User['uniformStatus']) => {
    setUsers(prevUsers => prevUsers.map(u => u.email === userEmail ? { ...u, uniformStatus: status } : u));
    if (user && user.email === userEmail) {
        setUser({ ...user, uniformStatus: status });
    }
  };

  const assignMissionToUser = (missionId: number) => {
    if (!user) return;
    if (user.assignedMissions.includes(missionId)) return;

    const updatedUser = { ...user, assignedMissions: [...user.assignedMissions, missionId] };
    setUser(updatedUser);
    setUsers(prevUsers =>
      prevUsers.map(u =>
        u.email === user.email ? updatedUser : u
      )
    );
  };
  
  const applyForPromotion = (email: string) => {
    setUsers(prevUsers => prevUsers.map(u => u.email === email ? { ...u, promotionStatus: 'Applied' } : u));
    if (user && user.email === email) {
        setUser({ ...user, promotionStatus: 'Applied' });
    }
  };

  const reviewPromotion = (email: string, decision: 'approve' | 'deny') => {
    setUsers(prevUsers => prevUsers.map(u => {
      if (u.email === email) {
        if (decision === 'approve') {
          // This is a simplified promotion logic. A real app would have a more complex rank progression.
          const newRank = u.rank === 'OFC (Officer)' ? 'CPL (Corporal)' : u.rank;
          return { ...u, promotionStatus: 'Approved', rank: newRank };
        } else {
          return { ...u, promotionStatus: 'Denied' };
        }
      }
      return u;
    }));
  };

  const updateUserSettings = (updatedData: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    setUsers(prevUsers => prevUsers.map(u => u.email === user.email ? updatedUser : u));
  };

  return (
    <AuthContext.Provider value={{ user, users, login, logout, register, approveUser, addTrainingToUser, assignMissionToUser, reviewTraining, updateUniformStatus, createUser, applyForPromotion, reviewPromotion, updateUserSettings }}>
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