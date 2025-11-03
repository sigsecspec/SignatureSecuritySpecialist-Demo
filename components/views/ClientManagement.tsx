import { getClients, getUserById } from '../../database.js';
import { canAlwaysApproveRoles, managementAndOpsRoles, executiveRoles, canManageAllUsers } from '../../constants.js';
import { Icons } from '../Icons.js';

export const ClientManagement = ({ user }) => {
    const canCreate = executiveRoles.includes(user.role);
    const canSeeAll = canAlwaysApproveRoles.includes(user.role);
    const canEditOnTeam = managementAndOpsRoles.includes(user.role);
    
    const allClients = getClients();
    const clients = allClients.filter(c => {
        if (canSeeAll) return true;
        return c.teamId === user.teamId;
    });

    const canEditClient = (client) => {
        if (canSeeAll) return true;
        if (canEditOnTeam && client.teamId === user.teamId) return true;
        return false;
    };
    const canSuspend = canManageAllUsers.includes(user.role);
    const canDelete = executiveRoles.includes(user.role);
    
    const renderTable = (clientList) => `
       <div class="hidden md:block">
            <table class="min-w-full leading-normal">
                <thead><tr class="text-left text-[var(--color-text-muted)] uppercase text-xs tracking-wider"><th class="px-5 py-3 font-semibold">Company Name</th><th class="px-5 py-3 font-semibold">Contact</th><th class="px-5 py-3 font-semibold">Status</th><th class="px-5 py-3 font-semibold text-right">Actions</th></tr></thead>
                <tbody>
                    ${clientList.map(client => {
                         const contactUser = getUserById(client.userId);
                         const status = contactUser?.status || 'Active';
                         const statusClass = status === 'Active' ? 'status-green' : (status === 'Suspended' ? 'status-yellow' : 'status-red');
                         return `
                        <tr class="border-b border-[var(--color-border)] ${status !== 'Active' ? 'opacity-50' : ''}">
                            <td class="px-5 py-4 text-sm"><p class="font-semibold text-[var(--color-text-base)] whitespace-no-wrap">${client.companyName}</p></td>
                            <td class="px-5 py-4 text-sm"><p class="font-semibold text-[var(--color-text-base)] whitespace-no-wrap">${contactUser ? `${contactUser.firstName} ${contactUser.lastName}` : 'N/A'}</p><p class="text-[var(--color-text-muted)] whitespace-no-wrap text-xs">${client.contactEmail}</p></td>
                            <td class="px-5 py-4 text-sm"><span class="status-pill ${statusClass}">${status}</span></td>
                            <td class="px-5 py-4 text-sm text-right">
                                <div class="flex items-center justify-end gap-2">
                                    <button data-action="open-user-details" data-id="${client.userId}" class="font-semibold text-[var(--color-accent)] hover:underline">Details</button>
                                    <div class="relative actions-dropdown">
                                        <button data-action="toggle-client-actions" class="p-1 rounded-md hover:bg-[var(--color-border)]">
                                            <svg class="w-5 h-5 text-[var(--color-text-muted)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /></svg>
                                        </button>
                                        <div class="actions-dropdown-content hidden absolute right-0 mt-2 w-48 bg-[var(--color-bg-surface-raised)] border border-[var(--color-border)] rounded-md shadow-lg z-10">
                                            ${canEditClient(client) ? `<a href="#" data-action="open-user-details" data-id="${client.userId}" class="block px-4 py-2 text-sm text-[var(--color-text-base)] hover:bg-[var(--color-border)]">Edit</a>` : ''}
                                            ${canSuspend && status === 'Active' ? `<a href="#" data-action="suspend-user" data-id="${client.userId}" class="block px-4 py-2 text-sm text-yellow-400 hover:bg-[var(--color-border)]">Suspend</a>` : ''}
                                            ${canSuspend && status === 'Suspended' ? `<a href="#" data-action="reinstate-user" data-id="${client.userId}" class="block px-4 py-2 text-sm text-green-400 hover:bg-[var(--color-border)]">Reinstate</a>` : ''}
                                            <a href="#" data-action="open-history-modal" data-id="${client.userId}" class="block px-4 py-2 text-sm text-[var(--color-text-base)] hover:bg-[var(--color-border)]">View History</a>
                                            ${canDelete ? `<a href="#" data-action="delete-user-permanently" data-id="${client.userId}" class="block px-4 py-2 text-sm text-red-500 hover:bg-[var(--color-border)]">Delete</a>` : ''}
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>`;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;

    const renderMobileCards = (clientList) => `
        <div class="md:hidden space-y-3 p-4">
            ${clientList.map(client => {
                const contactUser = getUserById(client.userId);
                const status = contactUser?.status || 'Active';
                const statusClass = status === 'Active' ? 'status-green' : (status === 'Suspended' ? 'status-yellow' : 'status-red');
                return `
                <div class="bg-[var(--color-bg-surface-raised)] p-4 rounded-lg ${status !== 'Active' ? 'opacity-50' : ''}">
                    <div class="flex justify-between items-start">
                        <div>
                            <p class="font-bold text-[var(--color-text-base)]">${client.companyName}</p>
                            <p class="text-sm text-[var(--color-text-muted)]">${contactUser ? `${contactUser.firstName} ${contactUser.lastName}` : client.contactEmail}</p>
                        </div>
                        <span class="status-pill ${statusClass}">${status}</span>
                    </div>
                    <div class="mt-4 pt-4 border-t border-[var(--color-border)] flex justify-end">
                        <button data-action="open-user-details" data-id="${client.userId}" class="text-sm text-[var(--color-accent)] font-semibold">Details &rarr;</button>
                    </div>
                </div>
            `}).join('')}
        </div>
    `;

    return `
        <div class="animate-in" style="opacity: 0;">
            <div class="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 class="text-4xl font-bold tracking-tighter text-[var(--color-text-base)]">Client Management</h1>
                <div class="flex items-center gap-2 w-full md:w-auto self-end">
                    ${canCreate ? `
                    <button data-action="open-create-client-modal" class="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 bg-[var(--color-secondary)] text-[var(--color-secondary-text)] font-semibold rounded-md hover:bg-[var(--color-secondary-hover)] transition-colors">
                        ${Icons.PlusCircle({className: "w-5 h-5"})} Create Client
                    </button>
                    <button data-action="import-clients" class="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 bg-[var(--color-bg-surface-raised)] text-[var(--color-text-muted)] font-semibold rounded-md hover:bg-[var(--color-border)] transition-colors" title="Coming soon">
                        ${Icons.ArrowUpTray({className: "w-5 h-5"})} Import
                    </button>
                    `: ''}
                </div>
            </div>
            <div class="flex items-center gap-4 w-full mb-6">
                <div class="relative flex-grow">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                        ${Icons.Search({ className: "w-5 h-5 text-[var(--color-text-muted)]" })}
                    </span>
                    <input type="text" id="client-search-input" placeholder="Search by company, contact, or email..." class="block w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg-surface)] py-2.5 pl-10 pr-3 text-sm placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:ring-0" />
                </div>
            </div>

             <div id="client-list-container" class="bg-[var(--color-bg-surface)] rounded-xl border border-[var(--color-border)]">
                ${renderTable(clients)}
                ${renderMobileCards(clients)}
            </div>
        </div>
    `;
};