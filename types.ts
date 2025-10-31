// Fix: Import React to use its type definitions.
import type React from 'react';

export enum UserRole {
  Guard = 'Guard',
  Client = 'Client',
  Supervisor = 'Supervisor',
  Owner = 'Owner',
  OperationsDirector = 'OperationsDirector',
  OperationsManager = 'OperationsManager',
}

export interface User {
  email: string;
  role: UserRole;
  name: string;
  title: string; // e.g., "Owner", "Operations Director"
  password?: string; // Only used in mock data, not exposed to client
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

export interface Mission {
  id: number;
  title: string;
  client: string;
  location: string;
  date: string;
  time: string;
  payRate: number;
  requiredLevel: number;
}