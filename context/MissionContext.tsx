
import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { Mission } from '../types';
import { missions as initialMissions } from '../data/missions';
import { useAuth } from './AuthContext';
import { MissionStatus } from '../types';

interface MissionContextType {
  missions: Mission[];
  claimMission: (missionId: number) => boolean;
  getMissionById: (missionId: number) => Mission | undefined;
  addMission: (newMissionData: Omit<Mission, 'id' | 'assignedGuards' | 'status' | 'paymentStatus' | 'checkedInGuards'>) => void;
  updateMissionPaymentStatus: (missionId: number, status: 'Paid' | 'Received') => void;
  updateMission: (updatedMission: Mission) => void;
  completeMission: (missionId: number) => void;
}

const MissionContext = createContext<MissionContextType | undefined>(undefined);

export const MissionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [missions, setMissions] = useState<Mission[]>(initialMissions);
  const { user, assignMissionToUser } = useAuth();

  const addMission = (newMissionData: Omit<Mission, 'id' | 'assignedGuards' | 'status' | 'paymentStatus' | 'checkedInGuards'>) => {
    const newMission: Mission = {
        id: Math.max(0, ...missions.map(m => m.id)) + 1,
        ...newMissionData,
        assignedGuards: [],
        checkedInGuards: [],
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
        prevMissions.map(m => {
            if (m.id === missionId) {
                const newAssignedGuards = [...m.assignedGuards, user.email];
                return { 
                    ...m, 
                    assignedGuards: newAssignedGuards,
                    status: newAssignedGuards.length === m.capacity ? MissionStatus.Filled : m.status
                };
            }
            return m;
        })
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

  const updateMission = (updatedMission: Mission) => {
    setMissions(prevMissions => prevMissions.map(m => m.id === updatedMission.id ? updatedMission : m));
  };

  const completeMission = (missionId: number) => {
    setMissions(prevMissions => prevMissions.map(m => m.id === missionId ? {...m, status: MissionStatus.Completed} : m));
  };

  return (
    <MissionContext.Provider value={{ missions, claimMission, getMissionById, addMission, updateMissionPaymentStatus, updateMission, completeMission }}>
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
