import { getUsers, getPendingChangeRequests, getUserById } from '../../database.js';
import { canApproveChanges, canAlwaysApproveRoles, executiveRoles, operationsRoles, managementAndOpsRoles, canProposeChanges, canManageAllUsers } from '../../constants.js';
import { Icons } from '../Icons.js';
import { UserRole } from '../../types.js';

export const TeamManagement = ({ user }) => {
    const canSeeAll = canAlwaysApproveRoles.includes(user.role);
    const canCreate = executiveRoles.includes(user.role) || operationsRoles.includes(user.role);

    const teamId = canSeeAll ? null : user.teamId;
    
    // Show all internal roles, not just field roles like in GuardManagement
    const allUsers = getUsers();
    const teamMembers = allUsers
        .filter(u => u.role !== UserRole.Client && (teamId ? u.teamId === teamId : true))
        .sort((a,b) => (a.status === 'Active' ? -1 : 1) - (b.status === 'Active' ? -1 : 1) || a.lastName.localeCompare(b.lastName));

    const getStatusPill = (status) => {
        switch(status) {
            case 'Active': return 'status-green';
            case 'Suspended': return 'status-yellow';
            case 'Terminated': return 'status-red';
            default: return 'status-gray';
        }
    }

    let addMemberButton = '';
    if (canCreate) {
        addMemberButton = `
            <button data-action="open-add-user-modal" data-role="Guard" class="flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)] text-[var(--color-accent-text)] font-semibold rounded-md hover:bg-[var(--color-accent-hover)] transition-colors">
                 ${Icons.PlusCircle({className: "w-5 h-5"})} Add Team Member
            </button>`;
    }

    const canEditUser = (targetUser) => canManageAllUsers.includes(user.role) || canProposeChanges.includes(user.role) || (managementAndOpsRoles.includes(user.role) && targetUser.teamId === user.teamId);
    const canPromote = canManageAllUsers.includes(user.role);
    const canDelete = executiveRoles.includes(user.role);

    const requests = getPendingChangeRequests(canSeeAll ? undefined : user.teamId);

    return `
        <div class="animate-in" style="opacity: 0;">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <h1 class="text-3xl font-bold text-[var(--color-text-base)]">Team Management</h1>
                ${addMemberButton}
            </div>

            ${requests.length > 0 ? `
            <div class="mb-8">
                <h2 class="text-xl font-bold text-[var(--color-text-base)] mb-4">Pending Change Requests</h2>
                <div class="space-y-4">
                    ${requests.map(req => {
                        const proposer = getUserById(req.proposerId);
                        const target = getUserById(req.entityId);
                        const originalUser = getUserById(req.entityId);

                        const renderChanges = (changes) => {
                            if (!originalUser) return '<li>Target user not found.</li>';
                            return Object.entries(changes).map(([key, value]) => {
                                const originalValue = originalUser[key];
                                return `<li><span class="font-semibold capitalize">${key.replace(/([A-Z])/g, ' $1')}:</span> <span class="font-mono text-red-400/80">${originalValue === null ? 'null' : originalValue}</span> &rarr; <span class="font-mono text-green-400/80">${value === null ? 'null' : value}</span></li>`;
                            }).join('');
                        };

                        return `
                        <div class="bg-[var(--color-bg-surface)] p-4 border border-[var(--color-border)] rounded-lg shadow-sm">
                            <div class="flex flex-col md:flex-row justify-between md:items-start gap-4">
                                <div class="flex-grow">
                                    <p class="font-bold text-[var(--color-text-base)]">Request from: ${proposer ? `${proposer.firstName} ${proposer.lastName}` : 'Unknown'}</p>
                                    <p class="text-sm text-[var(--color-text-muted)]">Target: <span class="font-semibold">${target ? `${target.firstName} ${target.lastName}` : 'Unknown'}</span></p>
                                    <div class="mt-2 p-3 bg-[var(--color-bg-base)] border border-[var(--color-border)] rounded-md">
                                        <p class="text-xs font-semibold uppercase text-[var(--color-text-muted)] mb-1">Proposed Changes:</p>
                                        <ul class="text-xs list-disc list-outside ml-4 text-[var(--color-text-muted)] space-y-1">${renderChanges(req.proposedChanges)}</ul>
                                    </div>
                                </div>
                                <div class="space-x-2 flex-shrink-0 self-end md:self-center">
                                    <button data-action="approve-change-request" data-id="${req.id}" class="px-3 py-1 bg-[var(--color-accent)] text-[var(--color-accent-text)] rounded-md text-sm font-semibold hover:bg-[var(--color-accent-hover)]">Approve</button>
                                    <button data-action="reject-change-request" data-id="${req.id}" class="px-3 py-1 bg-red-600 text-white rounded-md text-sm font-semibold hover:bg-red-700">Reject</button>
                                </div>
                            </div>
                        </div>
                    `}).join('')}
                </div>
            </div>
            ` : ''}
            
            <h2 class="text-xl font-bold text-[var(--color-text-base)] mb-4">${canSeeAll ? 'All Personnel' : 'My Team'}</h2>
            <div class="bg-[var(--color-bg-surface)] shadow-md rounded-lg overflow-hidden border border-[var(--color-border)]">
                <div class="hidden md:block">
                    <table class="min-w-full leading-normal">
                        <thead class="bg-[var(--color-bg-surface-raised)]"><tr class="text-left text-[var(--color-text-muted)] uppercase text-sm"><th class="px-5 py-3 font-semibold">Name</th><th class="px-5 py-3 font-semibold">Role</th><th class="px-5 py-3 font-semibold">Status</th><th class="px-5 py-3 font-semibold">Team</th><th class="px-5 py-3 font-semibold text-right">Actions</th></tr></thead>
                        <tbody class="divide-y divide-[var(--color-border)]">
                            ${teamMembers.map(member => `
                                <tr class="hover:bg-[var(--color-bg-surface-raised)] ${member.status !== 'Active' ? 'opacity-60' : ''}">
                                    <td class="px-5 py-4 text-sm">
                                        <p class="text-[var(--color-text-base)] whitespace-no-wrap font-semibold">${member.firstName} ${member.lastName}</p>
                                        <p class="text-[var(--color-text-muted)] whitespace-no-wrap text-xs">${member.email}</p>
                                    </td>
                                    <td class="px-5 py-4 text-sm text-[var(--color-text-muted)]">${member.role}</td>
                                    <td class="px-5 py-4 text-sm"><span class="status-pill ${getStatusPill(member.status)}">${member.status}</span></td>
                                    <td class="px-5 py-4 text-sm text-[var(--color-text-muted)]">${member.teamId || 'N/A'}</td>
                                    <td class="px-5 py-4 text-sm text-right">
                                        <div class="flex items-center justify-end gap-2">
                                            <button data-action="open-user-details" data-id="${member.id}" class="font-semibold text-[var(--color-accent)] hover:underline">Details</button>
                                            <div class="relative actions-dropdown">
                                                <button data-action="toggle-guard-actions" class="p-1 rounded-md hover:bg-[var(--color-border)]">
                                                    <svg class="w-5 h-5 text-[var(--color-text-muted)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /></svg>
                                                </button>
                                                <div class="actions-dropdown-content hidden absolute right-0 mt-2 w-48 bg-[var(--color-bg-surface-raised)] border border-[var(--color-border)] rounded-md shadow-lg z-10">
                                                    ${canEditUser(member) ? `<a href="#" data-action="open-user-details" data-id="${member.id}" class="block px-4 py-2 text-sm text-[var(--color-text-base)] hover:bg-[var(--color-border)]">Edit</a>` : ''}
                                                    ${canPromote ? `<a href="#" data-action="open-promote-demote-modal" data-id="${member.id}" class="block px-4 py-2 text-sm text-[var(--color-text-base)] hover:bg-[var(--color-border)]">Promote/Demote</a>` : ''}
                                                    <a href="#" data-action="open-performance-chart-modal" data-id="${member.id}" class="block px-4 py-2 text-sm text-[var(--color-text-base)] hover:bg-[var(--color-border)]">View Performance</a>
                                                    ${canDelete && member.id !== user.id ? `<a href="#" data-action="delete-user-permanently" data-id="${member.id}" class="block px-4 py-2 text-sm text-red-500 hover:bg-[var(--color-border)]">Delete</a>` : ''}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>`).join('')}
                        </tbody>
                    </table>
                </div>

                <div class="md:hidden space-y-4 p-4">
                    ${teamMembers.map(member => `
                        <div class="bg-[var(--color-bg-surface-raised)] p-4 rounded-lg shadow border border-[var(--color-border)] ${member.status !== 'Active' ? 'opacity-60' : ''}">
                            <div class="flex justify-between items-start">
                                <div>
                                    <p class="font-bold text-[var(--color-text-base)]">${member.firstName} ${member.lastName}</p>
                                    <p class="text-xs text-[var(--color-text-muted)]">${member.role}</p>
                                </div>
                                <span class="status-pill ${getStatusPill(member.status)}">${member.status}</span>
                            </div>
                            <div class="flex justify-between items-center mt-3 pt-3 border-t border-[var(--color-border)]">
                                <div class="text-sm">
                                    <span class="text-[var(--color-text-muted)]">Team: ${member.teamId || 'N/A'}</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <button data-action="open-user-details" data-id="${member.id}" class="px-3 py-1 bg-[var(--color-accent)] text-[var(--color-accent-text)] text-xs font-bold rounded-md">Details</button>
                                     <div class="relative actions-dropdown">
                                        <button data-action="toggle-guard-actions" class="p-1 rounded-md hover:bg-[var(--color-border)]">
                                            <svg class="w-5 h-5 text-[var(--color-text-muted)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /></svg>
                                        </button>
                                        <div class="actions-dropdown-content hidden absolute right-0 mt-2 w-48 bg-[var(--color-bg-surface-raised)] border border-[var(--color-border)] rounded-md shadow-lg z-10">
                                            ${canEditUser(member) ? `<a href="#" data-action="open-user-details" data-id="${member.id}" class="block px-4 py-2 text-sm text-[var(--color-text-base)] hover:bg-[var(--color-border)]">Edit</a>` : ''}
                                            ${canPromote ? `<a href="#" data-action="open-promote-demote-modal" data-id="${member.id}" class="block px-4 py-2 text-sm text-[var(--color-text-base)] hover:bg-[var(--color-border)]">Promote/Demote</a>` : ''}
                                            <a href="#" data-action="open-performance-chart-modal" data-id="${member.id}" class="block px-4 py-2 text-sm text-[var(--color-text-base)] hover:bg-[var(--color-border)]">View Performance</a>
                                            ${canDelete && member.id !== user.id ? `<a href="#" data-action="delete-user-permanently" data-id="${member.id}" class="block px-4 py-2 text-sm text-red-500 hover:bg-[var(--color-border)]">Delete</a>` : ''}
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