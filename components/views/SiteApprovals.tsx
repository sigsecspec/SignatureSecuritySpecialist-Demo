

import { getPendingSiteApprovals, getClients } from '../../database.js';

export const SiteApprovals = ({ user }) => {
    const approvals = getPendingSiteApprovals(user.teamId);
    const clients = getClients();
    const getClient = (id) => clients.find(c => c.id === id) || { companyName: 'Unknown Client' };

    return `
        <div class="animate-in" style="opacity: 0;">
            <h1 class="text-3xl font-bold text-[var(--color-text-base)] mb-6">Site Approvals</h1>
            <div class="space-y-4">
                ${approvals.length > 0 ? approvals.map(appr => `
                    <div class="bg-[var(--color-bg-surface)] p-4 border border-[var(--color-border)] rounded-lg shadow-sm">
                        <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
                            <div>
                                <p class="font-bold text-[var(--color-text-base)]">${appr.siteName}</p>
                                <p class="text-sm text-[var(--color-text-muted)]">Client: <span class="font-semibold">${getClient(appr.clientId).companyName}</span></p>
                                <p class="text-xs text-[var(--color-text-muted)]">Address: ${appr.siteAddress}</p>
                            </div>
                            <div class="space-x-2 flex-shrink-0">
                                <button data-action="approve-site" data-id="${appr.id}" class="px-3 py-1 bg-[var(--color-accent)] text-[var(--color-accent-text)] rounded-md text-sm font-semibold hover:bg-[var(--color-accent-hover)]">Approve</button>
                                <button data-action="deny-site" data-id="${appr.id}" class="px-3 py-1 bg-red-600 text-white rounded-md text-sm font-semibold hover:bg-red-700">Deny</button>
                            </div>
                        </div>
                    </div>
                `).join('') : `<p class="text-[var(--color-text-muted)] p-4 bg-[var(--color-bg-surface-raised)] rounded-md border border-[var(--color-border)]">No new sites require approval.</p>`}
            </div>
        </div>
    `;
};