
import { User, UserRole } from '../types';

export const canApprovePromotions = (user: User | null): boolean => {
    if (!user) return false;
    return [
        UserRole.Owner,
        UserRole.CoOwner,
        UserRole.OperationsDirector,
    ].includes(user.role);
};

export const canApproveTraining = (user: User | null): boolean => {
    if (!user) return false;
    // Based on hierarchy: CPL (TrainingOfficer) and up
    return [
        UserRole.Owner,
        UserRole.CoOwner,
        UserRole.Secretary,
        UserRole.Dispatch,
        UserRole.OperationsDirector,
        UserRole.OperationsManager,
        UserRole.Supervisor,
        UserRole.TrainingOfficer,
    ].includes(user.role);
};

export const canCreateUsers = (user: User | null): boolean => {
    if (!user) return false;
    return [
        UserRole.Owner,
        UserRole.CoOwner,
        UserRole.OperationsDirector,
        UserRole.OperationsManager,
    ].includes(user.role);
};

export const canViewManagementDashboards = (user: User | null): boolean => {
    if (!user) return false;
    // Analytics, Payroll, Uniforms, Shop/Vehicles
    return [
        UserRole.Owner,
        UserRole.CoOwner,
        UserRole.OperationsDirector,
        UserRole.OperationsManager,
        UserRole.Dispatch,
        UserRole.Secretary,
    ].includes(user.role);
};

export const canViewFieldStaffFeatures = (user: User | null): boolean => {
    if (!user) return false;
    const fieldRoles: UserRole[] = [
        UserRole.Guard,
        UserRole.LeadGuard,
        UserRole.TrainingOfficer,
        UserRole.Supervisor,
    ];
    return fieldRoles.some(role => user.role === role);
};
