
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
  LeadGuard = 'LeadGuard', 
  Guard = 'Guard',
  
  // External
  Client = 'Client',
}

export type UserRank = 
  'OFC (Officer)' | 
  'PVT (Private)' |
  'CPL (Corporal)' | 
  'SGT (Sergeant)' | 
  'LT (Lieutenant)' | 
  'CAP (Captain)' | 
  'CMD (Commander)' | 
  'DPT CHF (Deputy Chief)' |
  'ASST CHF (Assistant Chief)' |
  'CHF (Chief)';

export type UserStatus = 'Pending' | 'Active' | 'Denied';

export interface User {
  email: string;
  role: UserRole;
  name: string;
  title: string;
  rank?: UserRank;
  status: UserStatus;
  teamId?: number;
  trainings: string[]; // Array of completed training module IDs
  pendingTrainings: string[]; // Trainings awaiting approval
  uniformStatus: 'Needed' | 'Shipped' | 'Received';
  assignedMissions: number[]; // Array of assigned mission IDs
  password?: string;
  guardType?: 'Base' | 'Flex' | 'Seasonal';
  subscription?: 'Basic' | 'Premium' | 'Enterprise';
  promotionStatus?: 'None' | 'Applied' | 'Approved' | 'Denied';
}

export interface Team {
  id: number;
  name: string;
  director: string;
  manager: string;
}

export type UserTrainingStatus = 'Available' | 'Pending' | 'Completed' | 'Denied' | 'Training Needed';

export interface TrainingModule {
  id: string;
  title:string;
  description: string;
  missionType: string;
}

export interface Feature {
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
  assignedGuards: string[]; // Array of guard emails
  leadGuardEmail?: string; // Email of the designated lead guard
  checkedInGuards: string[]; // Guards checked in by Lead Guard or themselves
  capacity: number;
  status: MissionStatus;
  paymentStatus: 'Pending' | 'Paid' | 'Received';
}

export interface SpotCheck {
    id: number;
    missionId: number;
    missionTitle: string;
    status: 'Pending' | 'In Progress' | 'Completed';
    guards: string[];
}

export interface Contract {
    id: string;
    clientName: string;
    startDate: string;
    endDate: string;
    totalHours: number;
    usedHours: number;
    status: 'Active' | 'Expired' | 'Pending';
    budget: number;
}

export interface Badge {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
}

export interface Message {
  id: number;
  sender: string; // email
  recipient: string; // email or 'group'
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface Conversation {
    id: string; // Can be other user's email or a group ID
    name: string;
    lastMessage: string;
    timestamp: string;
    avatar: string; // letter or icon
}

export interface Vehicle {
    id: string;
    name: string;
    status: 'Available' | 'In Use' | 'Maintenance';
    assignedTo: string; // Guard name or 'N/A'
    location: string;
}

export interface Notification {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface Invoice {
    id: string;
    clientName: string;
    contractId: string;
    amount: number;
    dueDate: string;
    status: 'Paid' | 'Pending' | 'Overdue';
}
