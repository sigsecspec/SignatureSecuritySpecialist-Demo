

import { getSites, getMissions, getUserById, getClients } from '../../database.js';
import { Icons } from '../Icons.js';
import { executiveRoles, operationsRoles } from '../../constants.js';

export const SiteRoster = ({ user }) => {
     const sites = getSites();
     const missions = getMissions();
     const clients = getClients();
     
     const canCreateDirectly = executiveRoles.includes(user.role);
     const canPropose = operationsRoles.includes(user.role);

     const getActiveGuardCount = (siteId) => {
         const guardIds = new Set();
         missions
            .filter(m => m.siteId === siteId && m.status === 'Active')
            .forEach(m => m.claimedBy.forEach(guardId => guardIds.add(guardId)));
        return guardIds.size;
     }

     return `
    <div class="animate-in" style="opacity: 0;">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h1 class="text-3xl font-bold text-[var(--color-text-base)]">Site Management</h1>
            <div class="flex items-center gap-2 flex-wrap">
                <button data-action="open-assign-to-site-modal" class="flex items-center gap-2 px-3 py-2 text-sm bg-[var(--color-bg-surface-raised)] text-[var(--color-text-base)] font-semibold rounded-md hover:bg-[var(--color-border)] transition-colors">
                    ${Icons.Truck({className: "w-4 h-4"})} Assign Vehicle
                </button>
                 <button data-action="open-map-modal" class="flex items-center gap-2 px-3 py-2 text-sm bg-[var(--color-bg-surface-raised)] text-[var(--color-text-base)] font-semibold rounded-md hover:bg-[var(--color-border)] transition-colors">
                    ${Icons.Map({className: "w-4 h-4"})} View Map
                </button>
                ${canPropose ? `
                <button data-action="open-ops-site-modal" class="flex items-center gap-2 px-3 py-2 text-sm bg-[var(--color-bg-surface-raised)] text-[var(--color-text-base)] font-semibold rounded-md hover:bg-[var(--color-border)] transition-colors">
                    ${Icons.PlusCircle({className: "w-4 h-4"})} Propose Site
                </button>
                ` : ''}
                ${canCreateDirectly ? `
                <button data-action="open-admin-site-modal" class="flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)] text-[var(--color-accent-text)] font-semibold rounded-md hover:bg-[var(--color-accent-hover)] transition-colors">
                    <span class="text-lg font-mono -mt-1">🞧</span> Create Site
                </button>
                ` : ''}
            </div>
        </div>
        <div class="space-y-4">
            ${sites.map(site => {
                const client = clients.find(c => c.id === site.clientId);
                const activeGuards = getActiveGuardCount(site.id);
                return `
                <div class="bg-[var(--color-bg-surface)] p-4 border border-[var(--color-border)] rounded-lg shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div class="flex-grow">
                        <p class="font-bold text-lg text-[var(--color-text-base)]">${site.name}</p>
                        <p class="text-sm text-[var(--color-text-muted)]">${client?.companyName || 'N/A'}</p>
                        <p class="text-xs text-[var(--color-text-inactive)] mt-1">${site.address}</p>
                    </div>
                    <div class="flex-shrink-0 flex sm:flex-col items-end gap-2 sm:gap-0 sm:text-right w-full sm:w-auto">
                        <p class="text-sm font-semibold text-[var(--color-accent)]">${activeGuards} guard(s) active</p>
                        <button data-action="open-site-details-modal" data-id="${site.id}" class="px-4 py-1.5 text-sm bg-[var(--color-bg-surface-raised)] rounded-md hover:bg-[var(--color-border)] font-semibold">Details</button>
                    </div>
                </div>`
            }).join('')}
             ${sites.length === 0 ? `<p class="text-[var(--color-text-muted)] p-8 text-center bg-[var(--color-bg-surface)] rounded-lg border-2 border-dashed border-[var(--color-border)]">No sites have been added yet.</p>`: ''}
        </div>
    </div>
    `;
};