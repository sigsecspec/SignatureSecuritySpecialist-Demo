import { canAlwaysApproveRoles, managementAndOpsRoles, executiveRoles, canApproveMissions, operationsRoles } from '../../constants.js';
import { Icons } from '../Icons.js';
import { getClients } from '../../database.js';

export const MissionControl = ({ user, missions, activeFilter }) => {
    const allClients = getClients();

    const statusPill = (status) => {
        let className = '';
        switch (status) {
            case 'Open': className = 'status-green'; break;
            case 'Claimed': className = 'status-blue'; break;
            case 'Active': className = 'status-yellow'; break;
            case 'Completed': className = 'status-purple'; break;
            case 'Cancelled': className = 'status-red'; break;
            case 'Pending Approval':
            case 'Pending Client Confirmation': 
                className = 'status-yellow'; break;
            default: className = 'status-gray';
        }
        return `<span class="status-pill ${className}">${status.replace(' Approval', '').replace(' Client Confirmation', '')}</span>`;
    };

    const renderTable = () => `
        <table class="min-w-full leading-normal hidden md:table">
            <thead>
                <tr class="text-left text-[var(--color-text-muted)] uppercase text-xs tracking-wider">
                    <th class="px-5 py-3 font-semibold">Mission</th>
                    <th class="px-5 py-3 font-semibold">Status</th>
                    <th class="px-5 py-3 font-semibold">Date</th>
                    <th class="px-5 py-3 font-semibold text-center">Guards</th>
                    <th class="px-5 py-3 font-semibold text-right">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-[var(--color-border)]">
                ${missions.length > 0 ? missions.map((mission, i) => {
                    const client = allClients.find(c => c.id === mission.clientId);
                    const canManage = canAlwaysApproveRoles.includes(user.role) || (managementAndOpsRoles.includes(user.role) && client && client.teamId === user.teamId);
                    const isOwner = executiveRoles.includes(user.role);
                    const isOpsOrOwner = [...operationsRoles, ...executiveRoles].includes(user.role);
                    return `
                     <tr class="border-b border-[var(--color-border)] hover:bg-[var(--color-bg-surface-raised)] ${mission.status === 'Cancelled' ? 'opacity-50' : ''}">
                        <td class="px-5 py-4 text-sm">
                            <p class="font-semibold text-[var(--color-text-base)] whitespace-no-wrap">${mission.title}</p>
                            <p class="text-xs text-[var(--color-text-muted)] whitespace-no-wrap">${client?.companyName || 'N/A'}</p>
                        </td>
                        <td class="px-5 py-4 text-sm">${statusPill(mission.status)}</td>
                        <td class="px-5 py-4 text-sm text-[var(--color-text-muted)]">${new Date(mission.startTime).toLocaleDateString()}</td>
                        <td class="px-5 py-4 text-sm text-center text-[var(--color-text-muted)]">${mission.claimedBy.length} / ${mission.requiredGuards}</td>
                        <td class="px-5 py-4 text-sm text-right whitespace-nowrap space-x-2">
                           ${mission.status.startsWith('Pending') && canApproveMissions.includes(user.role) ? `
                                <button data-action="approve-mission" data-id="${mission.id}" class="font-semibold text-green-500 hover:text-green-400 transition-colors">Approve</button>
                                <button data-action="deny-mission" data-id="${mission.id}" class="font-semibold text-red-500 hover:text-red-400 transition-colors">Deny</button>
                           ` : `
                            <button data-action="open-mission-details" data-id="${mission.id}" class="font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">Details</button>
                            ${mission.status !== 'Completed' && mission.status !== 'Cancelled' && canManage ? `
                                <button data-action="open-edit-mission-modal" data-id="${mission.id}" class="font-semibold text-[var(--color-text-muted)] hover:text-yellow-500 transition-colors">Edit</button>
                            ` : ''}
                            ${isOpsOrOwner && mission.status !== 'Completed' && mission.status !== 'Cancelled' ? `
                                <button data-action="open-reassign-modal" data-id="${mission.id}" class="font-semibold text-[var(--color-text-muted)] hover:text-blue-500 transition-colors">Reassign</button>
                                <button data-action="mark-mission-complete" data-id="${mission.id}" class="font-semibold text-[var(--color-text-muted)] hover:text-green-500 transition-colors">Complete</button>
                            ` : ''}
                             ${mission.status !== 'Completed' && mission.status !== 'Cancelled' && canManage ? `
                                <button data-action="cancel-mission" data-id="${mission.id}" class="font-semibold text-[var(--color-text-muted)] hover:text-red-500 transition-colors">Cancel</button>
                            ` : ''}
                            ${isOwner ? `<button data-action="delete-mission-permanently" data-id="${mission.id}" class="font-semibold text-red-700 hover:text-red-500 transition-colors">Delete</button>` : ''}
                           `}
                        </td>
                    </tr>`;
                }).join('') : `<tr><td colspan="5" class="text-center p-8 text-[var(--color-text-muted)]">No missions match the current filter.</td></tr>`}
            </tbody>
        </table>
    `;

    const renderMobileCards = () => `
        <div class="md:hidden space-y-4 p-4">
            ${missions.length > 0 ? missions.map((mission, i) => {
                const client = allClients.find(c => c.id === mission.clientId);
                const canManage = canAlwaysApproveRoles.includes(user.role) || (managementAndOpsRoles.includes(user.role) && client && client.teamId === user.teamId);
                const isOwner = executiveRoles.includes(user.role);
                 const isOpsOrOwner = [...operationsRoles, ...executiveRoles].includes(user.role);
                return `
                <div class="bg-[var(--color-bg-surface-raised)] p-4 rounded-lg border border-[var(--color-border)] animate-in ${mission.status === 'Cancelled' ? 'opacity-50' : ''}" style="animation-delay: ${i*30}ms; opacity: 0;">
                     <div class="flex justify-between items-start">
                        <div>
                            <p class="font-bold text-[var(--color-text-base)]">${mission.title}</p>
                            <p class="text-xs text-[var(--color-text-muted)]">${client?.companyName || 'N/A'}</p>
                        </div>
                        ${statusPill(mission.status)}
                    </div>
                    <div class="mt-4 pt-4 border-t border-[var(--color-border)]">
                        <div class="flex justify-between items-center">
                             <div class="text-sm">
                                <p class="text-[var(--color-text-muted)]">Guards: <span class="font-semibold text-[var(--color-text-base)]">${mission.claimedBy.length}/${mission.requiredGuards}</span></p>
                                <p class="text-[var(--color-text-muted)]">${new Date(mission.startTime).toLocaleString([], {month:'short', day:'numeric', hour:'numeric', minute:'2-digit'})}</p>
                            </div>
                            <div class="whitespace-nowrap space-x-2">
                                <button data-action="open-mission-details" data-id="${mission.id}" class="px-3 py-1.5 rounded-md text-xs font-semibold bg-[var(--color-border)] text-[var(--color-text-base)]">Details</button>
                            </div>
                        </div>
                        ${mission.status.startsWith('Pending') && canApproveMissions.includes(user.role) ? `
                         <div class="mt-3 pt-3 border-t border-[var(--color-border)] flex gap-2">
                            <button data-action="approve-mission" data-id="${mission.id}" class="w-full text-center px-3 py-1.5 rounded-md text-xs font-semibold bg-green-500/20 text-green-400">Approve</button>
                            <button data-action="deny-mission" data-id="${mission.id}" class="w-full text-center px-3 py-1.5 rounded-md text-xs font-semibold bg-red-500/20 text-red-400">Deny</button>
                         </div>
                        ` : `
                        ${(canManage && mission.status !== 'Completed' && mission.status !== 'Cancelled') || isOwner ? `
                        <div class="mt-3 pt-3 border-t border-[var(--color-border)] flex justify-end gap-2">
                             ${isOpsOrOwner && mission.status !== 'Completed' && mission.status !== 'Cancelled' ? `
                                <button data-action="open-reassign-modal" data-id="${mission.id}" class="p-1.5 rounded-md text-xs font-semibold bg-blue-500/20 text-blue-400" title="Reassign">${Icons.Users({className:"w-4 h-4"})}</button>
                                <button data-action="mark-mission-complete" data-id="${mission.id}" class="p-1.5 rounded-md text-xs font-semibold bg-green-500/20 text-green-400" title="Mark Complete">${Icons.CheckCircle({className:"w-4 h-4"})}</button>
                            `: ''}
                            ${canManage && mission.status !== 'Completed' && mission.status !== 'Cancelled' ? `
                                <button data-action="open-edit-mission-modal" data-id="${mission.id}" class="p-1.5 rounded-md text-xs font-semibold bg-yellow-500/20 text-yellow-400" title="Edit">${Icons.Pencil({className:"w-4 h-4"})}</button>
                                <button data-action="cancel-mission" data-id="${mission.id}" class="p-1.5 rounded-md text-xs font-semibold bg-red-500/20 text-red-400" title="Cancel">${Icons.X({className:"w-4 h-4"})}</button>
                            `: ''}
                            ${isOwner ? `<button data-action="delete-mission-permanently" data-id="${mission.id}" class="p-1.5 rounded-md text-xs font-semibold bg-red-800/40 text-red-500" title="Delete">Delete</button>` : ''}
                        </div>
                        `: ''}
                        `}
                    </div>
                </div>
            `;
            }).join('') : `<p class="text-center p-8 text-[var(--color-text-muted)]">No missions match the current filter.</p>`}
        </div>
    `;

    const FilterButton = (status) => {
        const isActive = activeFilter === status;
        return `
            <button data-action="filter-missions" data-status="${status}" class="px-3 py-1 text-sm font-semibold rounded-full transition-colors ${isActive ? 'bg-[var(--color-accent)] text-[var(--color-accent-text)]' : 'bg-[var(--color-bg-surface-raised)] text-[var(--color-text-muted)] hover:bg-[var(--color-border)]'}">
                ${status}
            </button>
        `;
    };

    return `
        <div class="animate-in" style="opacity: 0;">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                 <h1 class="text-4xl font-bold tracking-tighter text-[var(--color-text-base)]">Mission Control</h1>
                 <div class="flex items-center gap-4">
                     <button data-action="filter-missions" data-status="All" class="font-semibold text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-base)]">View All Missions</button>
                     <button data-action="navigate" data-type="PostMission" class="px-4 py-2 flex items-center gap-2 bg-[var(--color-accent)] text-[var(--color-accent-text)] font-bold rounded-lg hover:bg-[var(--color-accent-hover)] transition-colors text-base">
                         <span class="text-xl font-mono -mt-1">🞧</span>
                         Create Mission
                     </button>
                 </div>
            </div>

            <div class="mb-4 flex flex-wrap gap-2">
                ${FilterButton('Pending')}
                ${FilterButton('Open')}
                ${FilterButton('Active')}
                ${FilterButton('Completed')}
                ${FilterButton('Cancelled')}
            </div>

            <div class="bg-[var(--color-bg-surface)] rounded-xl border border-[var(--color-border)]">
                ${renderTable()}
                ${renderMobileCards()}
            </div>

            <div class="mt-6 flex flex-col sm:flex-row justify-between items-center text-sm gap-4">
                <div class="flex gap-2">
                    <button class="px-3 py-1 rounded-md bg-[var(--color-bg-surface-raised)] hover:bg-[var(--color-border)]">&larr; Prev</button>
                    <span class="px-3 py-1 text-[var(--color-text-muted)]">Page 1 of 1</span>
                    <button class="px-3 py-1 rounded-md bg-[var(--color-bg-surface-raised)] hover:bg-[var(--color-border)]">Next &rarr;</button>
                </div>
                 <button class="px-4 py-2 bg-[var(--color-bg-surface-raised)] text-[var(--color-text-muted)] hover:text-[var(--color-text-base)] rounded-md font-semibold text-xs border border-[var(--color-border)]">Export Missions (CSV/PDF)</button>
            </div>
        </div>
    `;
};