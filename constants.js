
import { UserRole } from './types.js';

export const executiveRoles = [UserRole.Owner, UserRole.CoOwner];
export const managementRoles = [UserRole.Secretary, UserRole.Dispatch];
export const operationsRoles = [UserRole.OperationsDirector, UserRole.OperationsManager];
export const fieldLeadershipRoles = [UserRole.Supervisor, UserRole.TrainingOfficer, UserRole.SiteLead];
export const guardRole = [UserRole.Guard];
export const fieldRoles = [...fieldLeadershipRoles, ...guardRole];
export const allInternalRoles = [...executiveRoles, ...managementRoles, ...operationsRoles, ...fieldRoles];
export const clientRole = [UserRole.Client];

export const adminRoles = [...executiveRoles, ...operationsRoles];

// Granular Permissions
export const canAlwaysApproveRoles = [UserRole.Owner, UserRole.CoOwner];
export const managementAndOpsRoles = [...managementRoles, ...operationsRoles];
export const canApproveMissions = [...operationsRoles, ...executiveRoles];
export const canCreateMissionsForApproval = [UserRole.Supervisor];
export const canCreateMissionsDirectly = [...operationsRoles, ...executiveRoles, ...managementRoles];
export const canManageAllUsers = [...operationsRoles, ...executiveRoles];
export const canManageTeamUsers = [UserRole.Supervisor, UserRole.TrainingOfficer];

export const canProposeChanges = [UserRole.Supervisor];
export const canApproveChanges = [...managementRoles, ...operationsRoles, ...executiveRoles];
