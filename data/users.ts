import { User, UserRole } from '../types';

export const users: User[] = [
  // Provided Staff Accounts
  {
    name: 'Markeith White',
    email: 'M.White@SignatureSecuritySpecialist.com',
    password: 'password123',
    role: UserRole.Owner,
    title: 'Owner'
  },
  {
    name: 'James Lyons',
    email: 'J.Lyons@SignatureSecuritySpecialist.com',
    password: 'password123',
    role: UserRole.OperationsDirector,
    title: 'Operations Director'
  },
  {
    name: 'Tommy Moreno',
    email: 'T.Moreno@SignatureSecuritySpecialist.com',
    password: 'password123',
    role: UserRole.OperationsDirector,
    title: 'Operations Director'
  },
  {
    name: 'Brandon Baker',
    email: 'B.Baker@SignatureSecuritySpecialist.com',
    password: 'password123',
    role: UserRole.OperationsDirector,
    title: 'Operations Director'
  },
  {
    name: 'Ronald Granum',
    email: 'R.Granum@SignatureSecuritySpecialist.com',
    password: 'password123',
    role: UserRole.OperationsManager,
    title: 'Operations Manager'
  },

  // Generic Demo Accounts for other roles
  {
    name: 'Demo Guard',
    email: 'guard@sigsecspec.com',
    password: 'password123',
    role: UserRole.Guard,
    title: 'Security Officer'
  },
  {
    name: 'Demo Client',
    email: 'client@sigsecspec.com',
    password: 'password123',
    role: UserRole.Client,
    title: 'Client Contact'
  },
  {
    name: 'Demo Supervisor',
    email: 'supervisor@sigsecspec.com',
    password: 'password123',
    role: UserRole.Supervisor,
    title: 'Field Supervisor'
  },
];
