// Fix: Import React to use its type definitions.
import type React from 'react';

export enum UserRole {
  // Management Hierarchy
  Owner = 'Owner', // CHF (Chief)
  CoOwner = 'CoOwner', // ASST CHF (Assistant Chief)
  Secretary = 'Secretary', // DPT CHF (Deputy Chief)
  Dispatch = 'Dispatch', // CMD (Commander)
  OperationsDirector = 'OperationsDirector', // CAP (Captain)
  OperationsManager = 'OperationsManager', // LT (Lieutenant)
  
  // Field Team
  Supervisor = 'Supervisor', // SGT (Sergeant)
  TrainingOfficer = 'TrainingOfficer', // CPL (Corporal)
  LeadGuard = 'LeadGuard', // PVT (Private)
  Guard = 'Guard', // OFC (Officer)
  
  // External
  Client = 'Client',
}

export type UserStatus = 'Pending' | 'Active' | 'Denied';

export interface User {
  email: string;
  role: UserRole;
  name: string;
  title: string;
  status: UserStatus;
  teamId?: number;
  trainings: string[]; // Array of completed training module IDs
  password?: string;
  guardType?: 'Base' | 'Flex' | 'Seasonal';
}

export interface Team {
  id: number;
  name: string;
  director: string;
}

// FIX: Added 'Training Needed' to UserTrainingStatus to resolve type error in MissionBoard.tsx.
export type UserTrainingStatus = 'Available' | 'Pending' | 'Completed' | 'Denied' | 'Training Needed';

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  missionType: string;
}

export interface Feature {
  // Fix: Replaced JSX.Element with React.ReactNode to resolve the "Cannot find namespace 'JSX'" error.
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface Stat {
    value: string;
    label: string;
}

export enum MissionStatus {
    Available = 'Available',
    Filled = 'Filled',
    InProgress = 'In Progress',
    Completed = 'Completed',
}

export interface Mission {
  id: number;
  title: string;
  client: string;
  location: string;
  date: string;
  time: string;
  payRate: number;
  requiredLevel: number;
  missionType: string; // Corresponds to TrainingModule missionType
  teamId: number;
  assignedGuards: string[]; // Array of guard names
  capacity: number;
  status: MissionStatus;
}