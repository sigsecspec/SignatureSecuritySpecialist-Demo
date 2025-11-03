import { getUsers } from '../../database.js';
import { canManageAllUsers, fieldRoles, executiveRoles, operationsRoles, managementRoles, canProposeChanges } from '../../constants.js';
import { UserRole } from '../../types.js';
import { Icons } from '../Icons.js';

export const GuardManagement = ({ user }) => {
    const canManage = canManageAllUsers.includes(user.role);
    const canSeeAll = canManageAllUsers.includes(user.role);
    const canCreate = executiveRoles.includes(user.role) || operationsRoles.includes(user.role);
    
    const teamId = canSeeAll ? null : user.teamId;
    const guards = getUsers(fieldRoles)
        .filter(g => teamId ? g.teamId === teamId : true)
        .sort((a,b) => (a.status === 'Active' ? -1 : 1) - (b.status === 'Active' ? -1 : 1) || a.lastName.localeCompare(b.lastName));

    const getStatusPill = (status) => {
        switch(status) {
            case 'Active': return 'status-green';
            case 'Suspended': return 'status-yellow';
            case 'Terminated': return 'status-red';
            default: return 'status-gray';
        }
    }

    let addGuardButton = '';
    if (canCreate) {
        addGuardButton = `
            <button data-action="open-create-guard-modal" class="flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)] text-[var(--color-accent-text)] font-semibold rounded-md hover:bg-[var(--color-accent-hover)] transition-colors">
                 <span class="text-xl font-mono -mt-1">🞧</span> Create Guard
            </button>`;
    }
    
    const canEditUser = (targetUser) => canManageAllUsers.includes(user.role) || canProposeChanges.includes(user.role);
    const canSuspend = [...managementRoles, ...operationsRoles, ...executiveRoles].includes(user.role);
    const canPromote = [...managementRoles, ...operationsRoles, ...executiveRoles, UserRole.Supervisor].includes(user.role);
    const canDelete = executiveRoles.includes(user.role);

    return `
        <div class="animate-in" style="opacity: 0;">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <h1 class="text-3xl font-bold text-[var(--color-text-base)]">Guard Management</h1>
                ${addGuardButton}
            </div>
            
            <div class="bg-[var(--color-bg-surface)] shadow-md rounded-lg overflow-hidden border border-[var(--color-border)]">
                <div class="hidden md:block">
                    <table class="min-w-full leading-normal">
                        <thead class="bg-[var(--color-bg-surface-raised)]"><tr class="text-left text-[var(--color-text-muted)] uppercase text-sm"><th class="px-5 py-3 font-semibold">Name</th><th class="px-5 py-3 font-semibold">Rank</th><th class="px-5 py-3 font-semibold">Status</th><th class="px-5 py-3 font-semibold">Rating</th><th class="px-5 py-3 font-semibold">Weekly Hours</th><th class="px-5 py-3 font-semibold text-right">Actions</th></tr></thead>
                        <tbody class="divide-y divide-[var(--color-border)]">
                            ${guards.map(guard => `
                                <tr class="hover:bg-[var(--color-bg-surface-raised)] ${guard.status !== 'Active' ? 'opacity-60' : ''}">
                                    <td class="px-5 py-4 text-sm">
                                        <p class="text-[var(--color-text-base)] whitespace-no-wrap font-semibold">${guard.firstName} ${guard.lastName}</p>
                                        <p class="text-[var(--color-text-muted)] whitespace-no-wrap text-xs">${guard.email}</p>
                                    </td>
                                    <td class="px-5 py-4 text-sm text-[var(--color-text-muted)]">${guard.rank} (Lvl ${guard.level})</td>
                                    <td class="px-5 py-4 text-sm"><span class="status-pill ${getStatusPill(guard.status)}">${guard.status}</span></td>
                                    <td class="px-5 py-4 text-sm text-[var(--color-accent)] font-semibold">${guard.performanceRating.toFixed(2)}</td>
                                    <td class="px-5 py-4 text-sm text-[var(--color-text-muted)]">${guard.weeklyHours.toFixed(1)}</td>
                                    <td class="px-5 py-4 text-sm text-right">
                                        <div class="flex items-center justify-end gap-2">
                                            <button data-action="open-user-details" data-id="${guard.id}" class="font-semibold text-[var(--color-accent)] hover:underline">Details</button>
                                            <div class="relative actions-dropdown">
                                                <button data-action="toggle-guard-actions" class="p-1 rounded-md hover:bg-[var(--color-border)]">
                                                    <svg class="w-5 h-5 text-[var(--color-text-muted)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /></svg>
                                                </button>
                                                <div class="actions-dropdown-content hidden absolute right-0 mt-2 w-48 bg-[var(--color-bg-surface-raised)] border border-[var(--color-border)] rounded-md shadow-lg z-10">
                                                    ${canEditUser(guard) ? `<a href="#" data-action="open-user-details" data-id="${guard.id}" class="block px-4 py-2 text-sm text-[var(--color-text-base)] hover:bg-[var(--color-border)]">Edit</a>` : ''}
                                                    ${canSuspend && guard.status === 'Active' ? `<a href="#" data-action="suspend-user" data-id="${guard.id}" class="block px-4 py-2 text-sm text-yellow-400 hover:bg-[var(--color-border)]">Suspend</a>` : ''}
                                                    ${canSuspend && guard.status === 'Suspended' ? `<a href="#" data-action="reinstate-user" data-id="${guard.id}" class="block px-4 py-2 text-sm text-green-400 hover:bg-[var(--color-border)]">Reinstate</a>` : ''}
                                                    ${canPromote ? `<a href="#" data-action="open-promote-demote-modal" data-id="${guard.id}" class="block px-4 py-2 text-sm text-[var(--color-text-base)] hover:bg-[var(--color-border)]">Promote/Demote</a>` : ''}
                                                    <a href="#" data-action="open-history-modal" data-id="${guard.id}" class="block px-4 py-2 text-sm text-[var(--color-text-base)] hover:bg-[var(--color-border)]">View History</a>
                                                    ${canDelete ? `<a href="#" data-action="delete-user-permanently" data-id="${guard.id}" class="block px-4 py-2 text-sm text-red-500 hover:bg-[var(--color-border)]">Delete</a>` : ''}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>`).join('')}
                        </tbody>
                    </table>
                </div>

                <div class="md:hidden space-y-4 p-4">
                    ${guards.map(guard => `
                        <div class="bg-[var(--color-bg-surface-raised)] p-4 rounded-lg shadow border border-[var(--color-border)] ${guard.status !== 'Active' ? 'opacity-60' : ''}">
                            <div class="flex justify-between items-start">
                                <div>
                                    <p class="font-bold text-[var(--color-text-base)]">${guard.firstName} ${guard.lastName}</p>
                                    <p class="text-xs text-[var(--color-text-muted)]">${guard.rank}</p>
                                </div>
                                <span class="status-pill ${getStatusPill(guard.status)}">${guard.status}</span>
                            </div>
                            <div class="flex justify-between items-center mt-3 pt-3 border-t border-[var(--color-border)]">
                                <div class="text-sm">
                                    <span class="font-semibold text-[var(--color-accent)]">${guard.performanceRating.toFixed(2)}</span>
                                    <span class="text-[var(--color-text-muted)]"> | Lvl ${guard.level}</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <button data-action="open-user-details" data-id="${guard.id}" class="px-3 py-1 bg-[var(--color-accent)] text-[var(--color-accent-text)] text-xs font-bold rounded-md">Details</button>
                                     <div class="relative actions-dropdown">
                                        <button data-action="toggle-guard-actions" class="p-1 rounded-md hover:bg-[var(--color-border)]">
                                            <svg class="w-5 h-5 text-[var(--color-text-muted)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /></svg>
                                        </button>
                                        <div class="actions-dropdown-content hidden absolute right-0 mt-2 w-48 bg-[var(--color-bg-surface-raised)] border border-[var(--color-border)] rounded-md shadow-lg z-10">
                                            ${canSuspend && guard.status === 'Active' ? `<a href="#" data-action="suspend-user" data-id="${guard.id}" class="block px-4 py-2 text-sm text-yellow-400 hover:bg-[var(--color-border)]">Suspend</a>` : ''}
                                            ${canSuspend && guard.status === 'Suspended' ? `<a href="#" data-action="reinstate-user" data-id="${guard.id}" class="block px-4 py-2 text-sm text-green-400 hover:bg-[var(--color-border)]">Reinstate</a>` : ''}
                                            ${canPromote ? `<a href="#" data-action="open-promote-demote-modal" data-id="${guard.id}" class="block px-4 py-2 text-sm hover:bg-[var(--color-border)]">Promote/Demote</a>` : ''}
                                            <a href="#" data-action="open-history-modal" data-id="${guard.id}" class="block px-4 py-2 text-sm hover:bg-[var(--color-border)]">View History</a>
                                            ${canDelete ? `<a href="#" data-action="delete-user-permanently" data-id="${guard.id}" class="block px-4 py-2 text-sm text-red-500 hover:bg-[var(--color-border)]">Delete</a>` : ''}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
};