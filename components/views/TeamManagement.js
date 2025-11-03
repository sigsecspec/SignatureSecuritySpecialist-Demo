
import { getPendingChangeRequests, getUsers, getUserById } from '../../database.js';
import { canApproveChanges, canAlwaysApproveRoles } from '../../constants.js';
import { Icons } from '../Icons.js';

export const TeamManagement = ({ user }) => {
    if (!canApproveChanges.includes(user.role)) {
        return `<div class="animate-in p-8 text-center" style="opacity:0;"><p class="text-[var(--color-text-muted)]">You do not have permission to view this page.</p></div>`;
    }

    const seeAll = canAlwaysApproveRoles.includes(user.role);
    const requests = getPendingChangeRequests(seeAll ? undefined : user.teamId);
    const allUsers = getUsers();

    const getUserName = (id) => {
        const u = allUsers.find(usr => usr.id === id);
        return u ? `${u.firstName} ${u.lastName}` : `Unknown (${id})`;
    };

    const renderChanges = (entityId, changes) => {
        const originalUser = getUserById(entityId);
        if (!originalUser) return '<li>Target user not found.</li>';
        
        return Object.entries(changes).map(([key, value]) => {
            const originalValue = originalUser[key];
            return `<li><span class="font-semibold capitalize">${key.replace(/([A-Z])/g, ' $1')}:</span> <span class="font-mono text-red-400/80">${originalValue === null ? 'null' : originalValue}</span> &rarr; <span class="font-mono text-green-400/80">${value === null ? 'null' : value}</span></li>`;
        }).join('');
    };

    return `
        <div class="animate-in" style="opacity: 0;">
            <h1 class="text-3xl font-bold text-[var(--color-text-base)] mb-6">Team Management</h1>
            <div>
                <h2 class="text-xl font-bold text-[var(--color-text-base)] mb-4">Pending Change Requests</h2>
                <div class="space-y-4">
                    ${requests.length > 0 ? requests.map(req => `
                        <div class="bg-[var(--color-bg-surface)] p-4 border border-[var(--color-border)] rounded-lg shadow-sm">
                            <div class="flex flex-col md:flex-row justify-between md:items-start gap-4">
                                <div class="flex-grow">
                                    <p class="font-bold text-[var(--color-text-base)]">Request from: ${getUserName(req.proposerId)}</p>
                                    <p class="text-sm text-[var(--color-text-muted)]">Target: <span class="font-semibold">${getUserName(req.entityId)}</span></p>
                                    <div class="mt-2 p-3 bg-[var(--color-bg-base)] border border-[var(--color-border)] rounded-md">
                                        <p class="text-xs font-semibold uppercase text-[var(--color-text-muted)] mb-1">Proposed Changes:</p>
                                        <ul class="text-xs list-disc list-outside ml-4 text-[var(--color-text-muted)] space-y-1">${renderChanges(req.entityId, req.proposedChanges)}</ul>
                                    </div>
                                </div>
                                <div class="space-x-2 flex-shrink-0 self-end md:self-center">
                                    <button data-action="approve-change-request" data-id="${req.id}" class="px-3 py-1 bg-[var(--color-accent)] text-[var(--color-accent-text)] rounded-md text-sm font-semibold hover:bg-[var(--color-accent-hover)]">Approve</button>
                                    <button data-action="reject-change-request" data-id="${req.id}" class="px-3 py-1 bg-red-600 text-white rounded-md text-sm font-semibold hover:bg-red-700">Reject</button>
                                </div>
                            </div>
                        </div>
                    `).join('') : `
                        <div class="text-center py-10 bg-[var(--color-bg-surface-raised)] rounded-lg border border-dashed border-[var(--color-border)]">
                            ${Icons.CheckCircle({ className: "w-12 h-12 mx-auto text-[var(--color-text-inactive)]" })}
                            <h3 class="mt-2 text-lg font-medium text-[var(--color-text-base)]">All Clear</h3>
                            <p class="text-sm text-[var(--color-text-muted)]">No pending change requests for your team.</p>
                        </div>
                    `}
                </div>
            </div>
        </div>
    `;
};
