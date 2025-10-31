
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, UserStatus, UserRole, UserRank } from '../types';
import { users as initialUsers } from '../data/users';

interface AuthContextType {
  user: User | null;
  users: User[];
  login: (userToLogin: User) => boolean;
  logout: () => void;
  register: (newUser: Omit<User, 'password' | 'status' | 'trainings' | 'assignedMissions' | 'pendingTrainings' | 'uniformStatus' | 'rank' | 'subscription' | 'promotionStatus'>, teamCode?: string) => void;
  createUser: (newUser: Omit<User, 'password' | 'status' | 'trainings' | 'assignedMissions' | 'pendingTrainings' | 'uniformStatus' | 'subscription' | 'promotionStatus'>) => void;
  approveUser: (email: string) => void;
  addTrainingToUser: (trainingId: string) => void;
  assignMissionToUser: (missionId: number) => void;
  reviewTraining: (userEmail: string, trainingId: string, decision: 'approve' | 'deny') => void;
  updateUniformStatus: (userEmail: string, status: User['uniformStatus'], action: 'send' | 'receive') => void;
  applyForPromotion: (email: string) => void;
  reviewPromotion: (email: string, decision: 'approve' | 'deny') => void;
  updateUserSettings: (updatedUser: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getRankForRole = (role: UserRole): UserRank | undefined => {
    switch (role) {
        case UserRole.Owner: return 'CHF (Chief)';
        case UserRole.CoOwner: return 'ASST CHF (Assistant Chief)';
        case UserRole.Secretary: return 'DPT CHF (Deputy Chief)';
        case UserRole.Dispatch: return 'CMD (Commander)';
        case UserRole.OperationsDirector: return 'CAP (Captain)';
        case UserRole.OperationsManager: return 'LT (Lieutenant)';
        case UserRole.Supervisor: return 'SGT (Sergeant)';
        case UserRole.TrainingOfficer: return 'CPL (Corporal)';
        case UserRole.LeadGuard: return 'PVT (Private)';
        case UserRole.Guard: return 'OFC (Officer)';
        default: return undefined;
    }
}

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

  const register = (newUser: Omit<User, 'password' | 'status' | 'trainings' | 'assignedMissions' | 'pendingTrainings' | 'uniformStatus' | 'rank' | 'subscription' | 'promotionStatus'>, teamCode?: string) => {
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
        rank: getRankForRole(newUser.role),
    };
    
    // Team assignment logic based on owner plans
    if ([UserRole.Guard, UserRole.Supervisor, UserRole.Client].includes(newUser.role)) {
        if (teamCode?.toLowerCase() === 'alpha') {
            userWithDefaults.teamId = 1;
        } else if (teamCode?.toLowerCase() === 'bravo') {
            userWithDefaults.teamId = 2;
        } else {
            // Default assignment if no code or invalid code
            userWithDefaults.teamId = Math.random() < 0.5 ? 1 : 2;
        }
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
        rank: getRankForRole(newUser.role),
    };
     
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

  const updateUniformStatus = (userEmail: string, status: User['uniformStatus'], action: 'send' | 'receive') => {
    setUsers(prevUsers => prevUsers.map(u => u.email === userEmail ? { ...u, uniformStatus: status } : u));
    if (user && user.email === userEmail && action === 'receive') {
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
          const newRank = u.rank === 'OFC (Officer)' ? 'PVT (Private)' : u.rank;
          return { ...u, promotionStatus: 'Approved', rank: newRank, uniformStatus: 'Needed' };
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
