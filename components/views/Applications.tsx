import { getApplications } from '../../database.js';

export const Applications = ({ user }) => {
    const applications = getApplications();
    return `
         <div class="animate-in" style="opacity: 0;">
            <h1 class="text-3xl font-bold text-[var(--color-text-base)] mb-6">New Applications</h1>
            <div class="space-y-4">
                ${applications.length > 0 ? applications.map(app => `<div class="bg-[var(--color-bg-surface)] p-4 border border-[var(--color-border)] rounded-lg shadow-sm"><div class="flex flex-col md:flex-row justify-between md:items-center gap-4"><div><p class="font-bold text-lg text-[var(--color-text-base)]">${app.data.firstName ? `${app.data.firstName} ${app.data.lastName}` : app.data.companyName}</p><p class="text-sm text-[var(--color-text-muted)]">${app.type}</p></div><div class="space-x-2 flex-shrink-0 self-end md:self-center"><button data-action="approve-application" data-id="${app.id}" class="px-3 py-1 bg-[var(--color-accent)] text-[var(--color-accent-text)] rounded-md text-sm font-semibold hover:bg-[var(--color-accent-hover)]">Approve</button><button data-action="deny-application" data-id="${app.id}" class="px-3 py-1 bg-red-600 text-white rounded-md text-sm font-semibold hover:bg-red-700">Deny</button></div></div></div>`).join('') : `<p class="text-[var(--color-text-muted)] p-4 bg-[var(--color-bg-surface-raised)] rounded-md border border-[var(--color-border)]">No pending applications.</p>`}
            </div>
        </div>
    `;
};