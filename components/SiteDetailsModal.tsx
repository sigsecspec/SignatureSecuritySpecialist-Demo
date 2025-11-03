import { getSiteById, getClientById, getMissions, getUserById, getVehicleAssignments, getVehicleById } from '../database.js';
import { Icons } from './Icons.js';
import { executiveRoles } from '../constants.js';

export const SiteDetailsModal = ({ siteId, currentUser }) => {
    const site = getSiteById(siteId);
    if (!site) return '';

    const client = getClientById(site.clientId);
    const canDelete = executiveRoles.includes(currentUser.role);

    const guardRoster = getMissions()
        .filter(m => m.siteId === siteId && (m.status === 'Active' || m.status === 'Claimed' || m.status === 'Open'))
        .flatMap(m => m.claimedBy.map(guardId => ({
            guard: getUserById(guardId),
            missionTitle: m.title,
            shift: `${new Date(m.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - ${new Date(m.endTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`
        })))
        .filter(item => item.guard);
    
    const vehicleAssignments = getVehicleAssignments(null).filter(a => a.assigneeType === 'Site' && a.assigneeId === siteId);

    return `
    <div class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in" data-action="close-modal-backdrop">
        <div class="bg-[var(--color-bg-surface)] rounded-lg shadow-xl w-full max-w-3xl border border-[var(--color-border)] flex flex-col h-full md:h-auto md:max-h-[90vh]" data-modal-content>
            <div class="p-5 border-b border-[var(--color-border)] flex-shrink-0">
                <h2 class="text-2xl font-bold text-[var(--color-text-base)]">${site.name}</h2>
                <p class="text-sm text-[var(--color-text-muted)]">${client?.companyName || 'N/A'} - ${site.address}</p>
            </div>
            <div class="p-6 overflow-y-auto space-y-6 flex-grow">
                <div>
                    <h3 class="font-bold text-lg mb-2 text-[var(--color-accent)]">Guard Roster (Active & Upcoming)</h3>
                    <div class="bg-[var(--color-bg-surface-raised)] p-2 rounded-lg border border-[var(--color-border)]">
                    ${guardRoster.length > 0 ? `
                        <ul class="divide-y divide-[var(--color-border)]">
                        ${guardRoster.map(item => `
                            <li class="p-2 flex justify-between items-center">
                                <div>
                                    <p class="font-semibold text-sm">${item.guard.firstName} ${item.guard.lastName}</p>
                                    <p class="text-xs text-[var(--color-text-muted)]">${item.missionTitle} (${item.shift})</p>
                                </div>
                                <button data-action="open-user-details" data-id="${item.guard.id}" class="text-xs font-semibold text-[var(--color-accent)] hover:underline">Profile</button>
                            </li>
                        `).join('')}
                        </ul>
                    ` : `<p class="text-center text-sm p-4 text-[var(--color-text-muted)]">No guards scheduled.</p>`}
                    </div>
                </div>
                <div>
                    <h3 class="font-bold text-lg mb-2 text-[var(--color-accent)]">Assigned Vehicles</h3>
                     <div class="bg-[var(--color-bg-surface-raised)] p-2 rounded-lg border border-[var(--color-border)]">
                    ${vehicleAssignments.length > 0 ? `
                        <ul class="divide-y divide-[var(--color-border)]">
                        ${vehicleAssignments.map(item => {
                            const vehicle = getVehicleById(item.vehicleId);
                            return `
                            <li class="p-2 flex justify-between items-center">
                                <p class="font-semibold text-sm">${vehicle.year} ${vehicle.make} ${vehicle.model}</p>
                                <button data-action="open-vehicle-details" data-id="${vehicle.id}" class="text-xs font-semibold text-[var(--color-accent)] hover:underline">Details</button>
                            </li>
                        `}).join('')}
                        </ul>
                    ` : `<p class="text-center text-sm p-4 text-[var(--color-text-muted)]">No vehicles assigned.</p>`}
                    </div>
                </div>
            </div>
            <div class="p-4 bg-[var(--color-bg-surface-raised)] border-t border-[var(--color-border)] flex justify-between items-center space-x-3 flex-shrink-0">
                <div>
                ${canDelete ? `
                    <button data-action="delete-site" data-id="${site.id}" class="px-4 py-2 bg-red-800/50 text-red-300 font-semibold rounded-md text-sm hover:bg-red-700/50">Delete Site</button>
                `: ''}
                </div>
                <div class="flex items-center gap-2">
                    <button data-action="open-assign-to-site-modal" data-id="${site.id}" class="px-4 py-2 bg-[var(--color-bg-surface)] text-[var(--color-text-base)] font-semibold rounded-md hover:bg-[var(--color-border)] border border-[var(--color-border)]">
                        Manage Assignments
                    </button>
                    <button data-action="close-modal" class="px-4 py-2 bg-[var(--color-secondary)] text-[var(--color-secondary-text)] font-semibold rounded-md">Close</button>
                </div>
            </div>
        </div>
    </div>
    `;
};
