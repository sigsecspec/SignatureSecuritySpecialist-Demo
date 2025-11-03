

import { getSites, getMissions, getUserById, getClients } from '../../database.js';
import { Icons } from '../Icons.js';
import { executiveRoles, operationsRoles } from '../../constants.js';

export const SiteRoster = ({ user }) => {
     const sites = getSites();
     const missions = getMissions();
     const clients = getClients();
     
     const canCreateDirectly = executiveRoles.includes(user.role);
     const canPropose = operationsRoles.includes(user.role);

     const getSiteRoster = (siteId) => {
         return missions
            .filter(m => m.siteId === siteId && (m.status === 'Active' || m.status === 'Claimed' || m.status === 'Open'))
            .flatMap(m => m.claimedBy.map(guardId => ({
                guard: getUserById(guardId),
                missionTitle: m.title,
                missionId: m.id,
                startTime: m.startTime,
                endTime: m.endTime,
            })))
            .filter(item => item.guard)
            .sort((a,b) => a.startTime.getTime() - b.startTime.getTime());
     }

     return `
    <div class="animate-in" style="opacity: 0;">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h1 class="text-3xl font-bold text-[var(--color-text-base)]">Site Management</h1>
            <div class="flex items-center gap-2">
                ${canPropose ? `
                <button data-action="open-ops-site-modal" class="flex items-center gap-2 px-4 py-2 bg-[var(--color-bg-surface-raised)] text-[var(--color-text-base)] font-semibold rounded-md hover:bg-[var(--color-border)] transition-colors">
                    ${Icons.PlusCircle({className: "w-5 h-5"})} Propose Site
                </button>
                ` : ''}
                ${canCreateDirectly ? `
                <button data-action="open-admin-site-modal" class="flex items-center gap-2 px-4 py-2 bg-[var(--color-secondary)] text-[var(--color-secondary-text)] font-semibold rounded-md hover:bg-[var(--color-secondary-hover)] transition-colors">
                    ${Icons.PlusCircle({className: "w-5 h-5"})} Create Site
                </button>
                ` : ''}
            </div>
        </div>
        <div class="space-y-8">
            ${sites.map(site => {
                const roster = getSiteRoster(site.id);
                const client = clients.find(c => c.id === site.clientId);
                return `
                <div class="bg-[var(--color-bg-surface)] p-4 sm:p-6 border border-[var(--color-border)] rounded-lg shadow-sm">
                    <div>
                        <p class="font-bold text-xl text-[var(--color-text-base)]">${site.name}</p>
                        <p class="text-sm text-[var(--color-text-muted)]">${client?.companyName || 'N/A'}</p>
                        <p class="text-xs text-[var(--color-text-inactive)]">${site.address}</p>
                    </div>
                    <div class="mt-4">
                        <h4 class="font-semibold text-sm uppercase tracking-wider text-[var(--color-text-muted)] mb-2">Active & Upcoming Roster</h4>
                        ${roster.length > 0 ? `
                        <div class="overflow-x-auto">
                            <table class="min-w-full text-sm">
                                <thead class="border-b border-[var(--color-border)]">
                                    <tr>
                                        <th class="text-left font-medium p-2">Guard</th>
                                        <th class="text-left font-medium p-2">Mission</th>
                                        <th class="text-left font-medium p-2">Shift Time</th>
                                        <th class="text-right font-medium p-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                ${roster.map(r => `
                                    <tr class="border-b border-[var(--color-border)]/50">
                                        <td class="p-2 whitespace-nowrap">${r.guard.firstName} ${r.guard.lastName}</td>
                                        <td class="p-2 text-[var(--color-text-muted)] whitespace-nowrap">${r.missionTitle}</td>
                                        <td class="p-2 text-[var(--color-text-muted)] whitespace-nowrap">${new Date(r.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - ${new Date(r.endTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
                                        <td class="p-2 text-right space-x-2">
                                            <button data-action="open-user-details" data-id="${r.guard.id}" class="font-semibold text-[var(--color-text-muted)] text-xs hover:underline">Guard</button>
                                            <button data-action="open-mission-details" data-id="${r.missionId}" class="font-semibold text-[var(--color-accent)] text-xs hover:underline">Mission</button>
                                        </td>
                                    </tr>
                                `).join('')}
                                </tbody>
                            </table>
                        </div>
                        ` : `
                        <div class="p-4 text-center text-sm text-[var(--color-text-muted)] bg-[var(--color-bg-base)] rounded-md border border-dashed border-[var(--color-border)]">
                            No guards currently assigned to active or upcoming missions at this site.
                        </div>
                        `}
                    </div>
                </div>`
            }).join('')}
             ${sites.length === 0 ? `<p class="text-[var(--color-text-muted)]">No sites have been added yet.</p>`: ''}
        </div>
    </div>
    `;
};