import { getCollection, getClientById } from '../../database.js';
import { Icons } from '../Icons.js';
import { executiveRoles } from '../../constants.js';

export const Appeals = ({ user }) => {
    if (!executiveRoles.includes(user.role)) {
        return `
            <div class="animate-in" style="opacity: 0;">
                <h1 class="text-3xl font-bold text-[var(--color-text-base)] mb-6">Appeals & Requests</h1>
                <p class="text-[var(--color-text-muted)]">You do not have permission to view this page.</p>
            </div>
        `;
    }

    const appeals = getCollection('appeals');

    return `
    <div class="animate-in" style="opacity: 0;">
        <h1 class="text-3xl font-bold text-[var(--color-text-base)] mb-6">Appeals & Requests</h1>
        <div class="bg-[var(--color-bg-surface)] p-6 border border-[var(--color-border)] rounded-lg shadow-sm">
             <div class="space-y-4">
                ${appeals.length > 0 ? appeals.map(appeal => {
                    const client = getClientById(appeal.clientId);
                    return `
                    <div class="bg-[var(--color-bg-surface-raised)] border border-[var(--color-border)] p-4 rounded-lg">
                        <div class="flex justify-between items-start">
                            <div>
                                <p class="font-bold text-[var(--color-text-base)]">Appeal for Mission: ${appeal.missionId}</p>
                                <p class="text-sm text-[var(--color-text-muted)]">Client: ${client?.companyName || 'N/A'}</p>
                                <p class="text-xs text-[var(--color-text-inactive)]">Submitted: ${new Date(appeal.createdAt).toLocaleString()}</p>
                            </div>
                            <span class="status-pill ${appeal.status === 'Pending' ? 'status-yellow' : 'status-gray'}">${appeal.status}</span>
                        </div>
                        <div class="mt-3 pt-3 border-t border-[var(--color-border)]">
                            <p class="text-sm text-[var(--color-text-muted)]"><strong>Reason:</strong> ${appeal.reason}</p>
                        </div>
                         <div class="mt-3 flex justify-end gap-2">
                             <button class="px-3 py-1 text-sm font-semibold rounded-md bg-[var(--color-secondary)] text-[var(--color-secondary-text)]">Review</button>
                             <button class="px-3 py-1 text-sm font-semibold rounded-md bg-[var(--color-accent)] text-[var(--color-accent-text)]">Resolve</button>
                         </div>
                    </div>
                    `
                }).join('') : `
                    <div class="text-center py-10">
                        ${Icons.Flag({ className: "w-12 h-12 mx-auto text-[var(--color-text-inactive)]" })}
                        <h3 class="mt-2 text-lg font-medium text-[var(--color-text-base)]">No Pending Appeals</h3>
                        <p class="text-sm text-[var(--color-text-muted)]">The appeals queue is currently empty.</p>
                    </div>
                `}
             </div>
        </div>
    </div>
    `;
};