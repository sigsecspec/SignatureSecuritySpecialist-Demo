import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { Mission } from '../types';
import { missions as initialMissions } from '../data/missions';
import { useAuth } from './AuthContext';
import { MissionStatus } from '../types';

interface MissionContextType {
  missions: Mission[];
  claimMission: (missionId: number) => boolean;
  getMissionById: (missionId: number) => Mission | undefined;
  addMission: (newMissionData: Omit<Mission, 'id' | 'assignedGuards' | 'status' | 'paymentStatus'>) => void;
  updateMissionPaymentStatus: (missionId: number, status: 'Paid' | 'Received') => void;
}

const MissionContext = createContext<MissionContextType | undefined>(undefined);

export const MissionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [missions, setMissions] = useState<Mission[]>(initialMissions);
  const { user, assignMissionToUser } = useAuth();

  const addMission = (newMissionData: Omit<Mission, 'id' | 'assignedGuards' | 'status' | 'paymentStatus'>) => {
    const newMission: Mission = {
        id: Math.max(0, ...missions.map(m => m.id)) + 1,
        ...newMissionData,
        assignedGuards: [],
        status: MissionStatus.Available,
        paymentStatus: 'Pending',
    };
    setMissions(prev => [...prev, newMission]);
  };

  const claimMission = (missionId: number): boolean => {
    if (!user) {
        alert("You must be logged in to claim a mission.");
        return false;
    }
    
    const mission = missions.find(m => m.id === missionId);
    if (!mission) {
        alert("Mission not found.");
        return false;
    }

    if (mission.assignedGuards.length >= mission.capacity) {
        alert("This mission is already full.");
        return false;
    }

    if (mission.assignedGuards.includes(user.email) || user.assignedMissions.includes(missionId)) {
        alert("You have already claimed this mission.");
        return false;
    }

    setMissions(prevMissions =>
        prevMissions.map(m =>
            m.id === missionId
                ? { ...m, assignedGuards: [...m.assignedGuards, user.email] }
                : m
        )
    );
    assignMissionToUser(missionId);
    return true;
  };

  const updateMissionPaymentStatus = (missionId: number, status: 'Paid' | 'Received') => {
      setMissions(prevMissions => prevMissions.map(m => 
        m.id === missionId ? {...m, paymentStatus: status} : m
      ));
  };

  const getMissionById = (missionId: number) => {
    return missions.find(m => m.id === missionId);
  }

  return (
    <MissionContext.Provider value={{ missions, claimMission, getMissionById, addMission, updateMissionPaymentStatus }}>
      {children}
    </MissionContext.Provider>
  );
};

export const useMissions = () => {
  const context = useContext(MissionContext);
  if (context === undefined) {
    throw new Error('useMissions must be used within a MissionProvider');
  }
  return context;
};