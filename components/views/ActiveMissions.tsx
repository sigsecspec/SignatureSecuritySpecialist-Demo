import { getMissions, getClients, getUserById } from '../../database.js';
import { canAlwaysApproveRoles, managementAndOpsRoles, executiveRoles, operationsRoles } from '../../constants.js';
import { Icons } from '../Icons.js';

export const ActiveMissions = ({ user }) => {
    const allClients = getClients();
    const canSeeAll = canAlwaysApproveRoles.includes(user.role);
    const teamId = canSeeAll ? null : user.teamId;
    const activeMissions = getMissions().filter((m) => {
        if (m.status !== 'Active') return false;
        if (!teamId) return true;
        const client = allClients.find((c) => c.id === m.clientId);
        return client && client.teamId === teamId;
    });

    const liveIndicator = (status) => {
        if (status === 'Active') return '🟢';
        if (status.startsWith('Pending')) return '🟠';
        if (status === 'Cancelled') return '🔴';
        return '⚪️';
    };

    const renderTable = () => `
        <table class="min-w-full leading-normal hidden md:table">
            <thead>
                <tr class="text-left text-[var(--color-text-muted)] uppercase text-xs tracking-wider">
                    <th class="px-5 py-3 font-semibold">Mission</th>
                    <th class="px-5 py-3 font-semibold">Status</th>
                    <th class="px-5 py-3 font-semibold">End Time</th>
                    <th class="px-5 py-3 font-semibold text-center">Guards</th>
                    <th class="px-5 py-3 font-semibold text-right">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-[var(--color-border)]">
                ${activeMissions.length > 0 ? activeMissions.map((mission) => {
                    const client = allClients.find((c) => c.id === mission.clientId);
                    const canManage = canAlwaysApproveRoles.includes(user.role) || (managementAndOpsRoles.includes(user.role) && client && client.teamId === user.teamId);
                    const isOpsOrOwner = [...operationsRoles, ...executiveRoles].includes(user.role);
                    return `
                     <tr class="border-b border-[var(--color-border)] hover:bg-[var(--color-bg-surface-raised)]">
                        <td class="px-5 py-4 text-sm">
                            <p class="font-semibold text-[var(--color-text-base)] whitespace-no-wrap flex items-center gap-2">${liveIndicator(mission.status)} ${mission.title}</p>
                            <p class="text-xs text-[var(--color-text-muted)] whitespace-no-wrap ml-6">${client?.companyName || 'N/A'}</p>
                        </td>
                        <td class="px-5 py-4 text-sm"><span class="status-pill status-blue">Active</span></td>
                        <td class="px-5 py-4 text-sm text-[var(--color-text-muted)]">${new Date(mission.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                        <td class="px-5 py-4 text-sm text-center text-[var(--color-text-muted)]">${mission.claimedBy.length} / ${mission.requiredGuards}</td>
                        <td class="px-5 py-4 text-sm text-right whitespace-nowrap space-x-2">
                            <button data-action="open-track-progress-modal" data-id="${mission.id}" class="font-semibold text-[var(--color-accent)] hover:underline">Track</button>
                            <button data-action="open-mission-details" data-id="${mission.id}" class="font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">Details</button>
                            ${canManage ? `
                                <button data-action="open-edit-mission-modal" data-id="${mission.id}" class="font-semibold text-[var(--color-text-muted)] hover:text-yellow-500 transition-colors">Edit</button>
                            ` : ''}
                            ${isOpsOrOwner ? `
                                <button data-action="open-reassign-modal" data-id="${mission.id}" class="font-semibold text-[var(--color-text-muted)] hover:text-blue-500 transition-colors">Reassign</button>
                                <button data-action="mark-mission-complete" data-id="${mission.id}" class="font-semibold text-[var(--color-text-muted)] hover:text-green-500 transition-colors">Complete</button>
                            ` : ''}
                             ${canManage ? `
                                <button data-action="cancel-mission" data-id="${mission.id}" class="font-semibold text-[var(--color-text-muted)] hover:text-red-500 transition-colors">Cancel</button>
                            ` : ''}
                        </td>
                    </tr>`;
                }).join('') : `<tr><td colspan="5" class="text-center p-8 text-[var(--color-text-muted)]">No active missions.</td></tr>`}
            </tbody>
        </table>
    `;

    const renderMobileCards = () => `
        <div class="md:hidden space-y-4 p-4">
            ${activeMissions.length > 0 ? activeMissions.map((mission, i) => {
                const client = allClients.find((c) => c.id === mission.clientId);
                const canManage = canAlwaysApproveRoles.includes(user.role) || (managementAndOpsRoles.includes(user.role) && client && client.teamId === user.teamId);
                const isOpsOrOwner = [...operationsRoles, ...executiveRoles].includes(user.role);
                return `
                <div class="bg-[var(--color-bg-surface-raised)] p-4 rounded-lg border border-[var(--color-border)] animate-in" style="animation-delay: ${i * 30}ms; opacity: 0;">
                     <div class="flex justify-between items-start">
                        <div>
                            <p class="font-bold text-[var(--color-text-base)] flex items-center gap-2">${liveIndicator(mission.status)} ${mission.title}</p>
                            <p class="text-xs text-[var(--color-text-muted)] ml-6">${client?.companyName || 'N/A'}</p>
                        </div>
                        <span class="status-pill status-blue">Active</span>
                    </div>
                    <div class="mt-4 pt-4 border-t border-[var(--color-border)]">
                        <div class="flex justify-between items-center">
                             <div class="text-sm">
                                <p class="text-[var(--color-text-muted)]">Guards: <span class="font-semibold text-[var(--color-text-base)]">${mission.claimedBy.length}/${mission.requiredGuards}</span></p>
                                <p class="text-[var(--color-text-muted)]">Ends at ${new Date(mission.endTime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</p>
                            </div>
                            <div class="whitespace-nowrap space-x-2">
                                <button data-action="open-track-progress-modal" data-id="${mission.id}" class="px-3 py-1.5 rounded-md text-xs font-semibold bg-[var(--color-accent)] text-[var(--color-accent-text)]">Track</button>
                                <button data-action="open-mission-details" data-id="${mission.id}" class="px-3 py-1.5 rounded-md text-xs font-semibold bg-[var(--color-border)] text-[var(--color-text-base)]">Details</button>
                            </div>
                        </div>
                        ${(canManage) ? `
                        <div class="mt-3 pt-3 border-t border-[var(--color-border)] flex justify-end gap-2">
                             ${isOpsOrOwner ? `
                                <button data-action="open-reassign-modal" data-id="${mission.id}" class="p-1.5 rounded-md text-xs font-semibold bg-blue-500/20 text-blue-400" title="Reassign">${Icons.Users({ className: "w-4 h-4" })}</button>
                                <button data-action="mark-mission-complete" data-id="${mission.id}" class="p-1.5 rounded-md text-xs font-semibold bg-green-500/20 text-green-400" title="Mark Complete">${Icons.CheckCircle({ className: "w-4 h-4" })}</button>
                            ` : ''}
                            ${canManage ? `
                                <button data-action="open-edit-mission-modal" data-id="${mission.id}" class="p-1.5 rounded-md text-xs font-semibold bg-yellow-500/20 text-yellow-400" title="Edit">${Icons.Pencil({ className: "w-4 h-4" })}</button>
                                <button data-action="cancel-mission" data-id="${mission.id}" class="p-1.5 rounded-md text-xs font-semibold bg-red-500/20 text-red-400" title="Cancel">${Icons.X({ className: "w-4 h-4" })}</button>
                            ` : ''}
                        </div>
                        ` : ''}
                    </div>
                </div>
            `;
            }).join('') : `<p class="text-center p-8 text-[var(--color-text-muted)]">No active missions.</p>`}
        </div>
    `;

    return `
        <div class="animate-in" style="opacity: 0;">
            <h1 class="text-3xl font-bold text-[var(--color-text-base)] mb-6">Live Active Missions</h1>
            
            <div class="bg-[var(--color-bg-surface)] rounded-xl border border-[var(--color-border)]">
                ${renderTable()}
                ${renderMobileCards()}
            </div>
        </div>
    `;
};