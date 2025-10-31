
import { User, UserRole } from '../types';

const roleHierarchy: { [key in UserRole]: number } = {
    [UserRole.Owner]: 10,
    [UserRole.CoOwner]: 9,
    [UserRole.Secretary]: 8, // DPT CHF
    [UserRole.Dispatch]: 7, // CMD
    [UserRole.OperationsDirector]: 6, // CAP
    [UserRole.OperationsManager]: 5, // LT
    [UserRole.Supervisor]: 4, // SGT
    [UserRole.TrainingOfficer]: 3, // CPL
    [UserRole.LeadGuard]: 2, // PVT
    [UserRole.Guard]: 1, // OFC
    [UserRole.Client]: 0,
};

const hasPermission = (user: User | null, requiredRole: UserRole): boolean => {
    if (!user) return false;
    const userLevel = roleHierarchy[user.role];
    const requiredLevel = roleHierarchy[requiredRole];
    return userLevel >= requiredLevel;
}

export const canApprovePromotions = (user: User | null): boolean => {
    return hasPermission(user, UserRole.OperationsDirector);
};

export const canApproveTraining = (user: User | null): boolean => {
    return hasPermission(user, UserRole.TrainingOfficer);
};

export const canCreateUsers = (user: User | null): boolean => {
    return hasPermission(user, UserRole.OperationsManager);
};

export const canViewManagementDashboards = (user: User | null): boolean => {
    return hasPermission(user, UserRole.Secretary);
};

export const canViewFieldStaffFeatures = (user: User | null): boolean => {
    if (!user) return false;
    const fieldRoles: UserRole[] = [
        UserRole.Guard,
        UserRole.LeadGuard,
        UserRole.TrainingOfficer,
        UserRole.Supervisor,
    ];
    // This function checks if a user IS a field staff, not if they can VIEW them.
    // The name is a bit misleading, but the logic is for the sidebar links for field staff.
    return fieldRoles.includes(user.role);
};
