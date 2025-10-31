
import { User, UserRole } from '../types';

export const users: User[] = [
  // ===================
  // ------ Owner ------
  // ===================
  {
    name: 'Markeith White',
    email: 'M.White@SignatureSecuritySpecialist.com',
    password: 'password123',
    role: UserRole.Owner,
    title: 'Owner',
    rank: 'CHF (Chief)',
    status: 'Active',
    trainings: [],
    pendingTrainings: [],
    uniformStatus: 'Received',
    assignedMissions: [],
  },

  // ===============================
  // ------ Team 1 Operations ------
  // ===============================
  {
    name: 'James Lyons',
    email: 'J.Lyons@SignatureSecuritySpecialist.com',
    password: 'password123',
    role: UserRole.OperationsDirector,
    title: 'Operations Director',
    rank: 'CAP (Captain)',
    status: 'Active',
    teamId: 1,
    trainings: [],
    pendingTrainings: [],
    uniformStatus: 'Received',
    assignedMissions: [],
  },
  {
    name: 'Tommy Moreno',
    email: 'T.Moreno@SignatureSecuritySpecialist.com',
    password: 'password123',
    role: UserRole.OperationsManager,
    title: 'Operations Manager',
    rank: 'LT (Lieutenant)',
    status: 'Active',
    teamId: 1,
    trainings: [],
    pendingTrainings: [],
    uniformStatus: 'Received',
    assignedMissions: [],
  },

  // ===============================
  // ------ Team 2 Operations ------
  // ===============================
  {
    name: 'Brandon Baker',
    email: 'B.Baker@SignatureSecuritySpecialist.com',
    password: 'password123',
    role: UserRole.OperationsDirector,
    title: 'Operations Director',
    rank: 'CAP (Captain)',
    status: 'Active',
    teamId: 2,
    trainings: [],
    pendingTrainings: [],
    uniformStatus: 'Received',
    assignedMissions: [],
  },
  {
    name: 'Ronald Granum',
    email: 'R.Granum@SignatureSecuritySpecialist.com',
    password: 'password123',
    role: UserRole.OperationsManager,
    title: 'Operations Manager',
    rank: 'LT (Lieutenant)',
    status: 'Active',
    teamId: 2,
    trainings: [],
    pendingTrainings: [],
    uniformStatus: 'Received',
    assignedMissions: [],
  },
];