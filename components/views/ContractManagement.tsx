import { UserRole } from '../../types.js';
import { executiveRoles, operationsRoles, managementRoles, clientRole } from '../../constants.js';
import { Icons } from '../Icons.js';
import { getClients } from '../../database.js';

export const ContractManagement = ({ user, contracts, activeFilter }: { user: any, contracts: any[], activeFilter: string }) => {
    const allClients = getClients();

    const getStatusPill = (status: string, endDate: Date) => {
        const now = new Date();
        if (status === 'Active' && new Date(endDate) < now) {
            return `<span class="status-pill status-gray">Expired</span>`;
        }
        switch (status) {
            case 'Active': return `<span class="status-pill status-green">Active</span>`;
            case 'Pending': return `<span class="status-pill status-yellow">Pending</span>`;
            case 'Ready for Review': return `<span class="status-pill status-yellow">Pending Approval</span>`;
            case 'Terminated': return `<span class="status-pill status-red">Terminated</span>`;
            case 'Denied': return `<span class="status-pill status-red">Denied</span>`;
            default: return `<span class="status-pill status-gray">${status}</span>`;
        }
    };
    
    // Role-based access control
    const isOwner = user.role === UserRole.Owner || user.role === UserRole.CoOwner;
    const isOpsDirectorManager = user.role === UserRole.OperationsDirector || user.role === UserRole.OperationsManager;
    const isDispatchSecretary = user.role === UserRole.Dispatch || user.role === UserRole.Secretary;
    const isSupervisor = user.role === UserRole.Supervisor;

    let createContractButton = '';
    if (isOwner) {
        createContractButton = `
            <button data-action="open-admin-contract-modal" class="flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)] text-[var(--color-accent-text)] font-semibold rounded-md hover:bg-[var(--color-accent-hover)] transition-colors">
                 <span class="text-xl font-mono -mt-1">🞧</span> Create New Contract
            </button>`;
    } else if (isDispatchSecretary || isOpsDirectorManager) {
        createContractButton = `
            <button data-action="open-contract-modal" class="flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)] text-[var(--color-accent-text)] font-semibold rounded-md hover:bg-[var(--color-accent-hover)] transition-colors">
                 <span class="text-xl font-mono -mt-1">🞧</span> Create New Contract
            </button>`;
    }


    const renderActionButtons = (contract: any) => {
        const canEdit = (isOwner || isOpsDirectorManager) && contract.status === 'Active';
        const canApprove = (isOwner || isOpsDirectorManager) && (contract.status === 'Pending' || contract.status === 'Ready for Review');
        const canTerminate = isOwner && contract.status === 'Active';
        const canRenew = (isOwner || isOpsDirectorManager);
        const canAttach = (isOwner || isOpsDirectorManager || isDispatchSecretary);
        const canNotify = (isOwner || isOpsDirectorManager);
        
        return `
            <button data-action="open-contract-details-modal" data-id="${contract.id}" class="font-semibold text-[var(--color-accent)] hover:underline">Details</button>
            <div class="relative actions-dropdown">
                <button data-action="toggle-guard-actions" class="p-1 rounded-md hover:bg-[var(--color-border)]">
                    <svg class="w-5 h-5 text-[var(--color-text-muted)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /></svg>
                </button>
                <div class="actions-dropdown-content hidden absolute right-0 mt-2 w-48 bg-[var(--color-bg-surface-raised)] border border-[var(--color-border)] rounded-md shadow-lg z-10 text-left">
                    ${canEdit ? `<a href="#" data-action="open-edit-contract-modal" data-id="${contract.id}" class="block px-4 py-2 text-sm text-[var(--color-text-base)] hover:bg-[var(--color-border)]">✏️ Edit</a>` : ''}
                    ${canApprove ? `<a href="#" data-action="approve-contract" data-id="${contract.id}" class="block px-4 py-2 text-sm text-green-400 hover:bg-[var(--color-border)]">✅ Approve</a>` : ''}
                    ${canApprove ? `<a href="#" data-action="deny-contract" data-id="${contract.id}" class="block px-4 py-2 text-sm text-red-400 hover:bg-[var(--color-border)]">🚫 Reject</a>` : ''}
                    ${canRenew ? `<a href="#" onclick="alert('Not implemented')" class="block px-4 py-2 text-sm text-[var(--color-text-base)] hover:bg-[var(--color-border)]">🧾 Renew</a>` : ''}
                    ${canAttach ? `<a href="#" onclick="alert('Not implemented')" class="block px-4 py-2 text-sm text-[var(--color-text-base)] hover:bg-[var(--color-border)]">📎 Attach File</a>` : ''}
                    ${canTerminate ? `<a href="#" data-action="terminate-contract" data-id="${contract.id}" class="block px-4 py-2 text-sm text-red-500 hover:bg-[var(--color-border)]">🗑️ Terminate</a>` : ''}
                    <a href="#" data-action="open-history-modal" data-entity-type="contracts" data-id="${contract.id}" class="block px-4 py-2 text-sm text-[var(--color-text-base)] hover:bg-[var(--color-border)]">🕓 History</a>
                    ${canNotify ? `<a href="#" onclick="alert('Not implemented')" class="block px-4 py-2 text-sm text-[var(--color-text-base)] hover:bg-[var(--color-border)]">✉️ Notify Client</a>` : ''}
                    ${!clientRole.includes(user.role) ? `<a href="#" onclick="alert('Not implemented')" class="block px-4 py-2 text-sm text-[var(--color-text-base)] hover:bg-[var(--color-border)]">💬 Comment</a>` : ''}
                </div>
            </div>
        `;
    };

    const renderTable = () => `
        <div class="hidden md:block">
            <table class="min-w-full leading-normal">
                <thead>
                    <tr class="text-left text-[var(--color-text-muted)] uppercase text-xs tracking-wider">
                        <th class="px-5 py-3 font-semibold">Contract</th>
                        <th class="px-5 py-3 font-semibold">Status</th>
                        <th class="px-5 py-3 font-semibold">Term</th>
                        <th class="px-5 py-3 font-semibold text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-[var(--color-border)]">
                    ${contracts.length > 0 ? contracts.map((contract) => {
                        const client = allClients.find(c => c.id === contract.clientId);
                        return `
                         <tr class="hover:bg-[var(--color-bg-surface-raised)]">
                            <td class="px-5 py-4 text-sm">
                                <p class="font-semibold text-[var(--color-text-base)] whitespace-no-wrap">${contract.title}</p>
                                <p class="text-xs text-[var(--color-text-muted)] whitespace-no-wrap">${client?.companyName || 'N/A'}</p>
                            </td>
                            <td class="px-5 py-4 text-sm">${getStatusPill(contract.status, contract.endDate)}</td>
                            <td class="px-5 py-4 text-sm text-[var(--color-text-muted)]">${new Date(contract.startDate).toLocaleDateString()} - ${new Date(contract.endDate).toLocaleDateString()}</td>
                            <td class="px-5 py-4 text-sm text-right whitespace-nowrap">
                                <div class="flex items-center justify-end gap-2">
                                    ${isSupervisor ? `<button data-action="open-contract-details-modal" data-id="${contract.id}" class="font-semibold text-[var(--color-accent)] hover:underline">Details</button>` : renderActionButtons(contract)}
                                </div>
                            </td>
                        </tr>`;
                    }).join('') : `<tr><td colspan="4" class="text-center p-8 text-[var(--color-text-muted)]">No contracts match the current filter.</td></tr>`}
                </tbody>
            </table>
        </div>
    `;

    const renderMobileCards = () => `
        <div class="md:hidden space-y-3 p-4">
            ${contracts.length > 0 ? contracts.map(contract => {
                const client = allClients.find(c => c.id === contract.clientId);
                return `
                <div class="bg-[var(--color-bg-surface-raised)] p-4 rounded-lg border border-[var(--color-border)]">
                    <div class="flex justify-between items-start">
                        <div>
                            <p class="font-bold text-[var(--color-text-base)]">${contract.title}</p>
                            <p class="text-xs text-[var(--color-text-muted)]">${client?.companyName || 'N/A'}</p>
                        </div>
                        ${getStatusPill(contract.status, contract.endDate)}
                    </div>
                    <div class="mt-3 pt-3 border-t border-[var(--color-border)] flex justify-between items-end">
                        <p class="text-xs text-[var(--color-text-muted)]">${new Date(contract.startDate).toLocaleDateString()} - ${new Date(contract.endDate).toLocaleDateString()}</p>
                         <div class="flex items-center justify-end gap-2">
                            ${isSupervisor ? `<button data-action="open-contract-details-modal" data-id="${contract.id}" class="font-semibold text-[var(--color-accent)] hover:underline">Details</button>` : renderActionButtons(contract)}
                        </div>
                    </div>
                </div>
            `}).join('') : `<p class="text-center text-sm p-4 text-[var(--color-text-muted)]">No contracts found.</p>`}
        </div>
    `;


    const FilterButton = (status: string, label: string) => {
        const isActive = activeFilter === status;
        return `
            <button data-action="filter-contracts" data-status="${status}" class="px-3 py-1 text-sm font-semibold rounded-full transition-colors ${isActive ? 'bg-[var(--color-accent)] text-[var(--color-accent-text)]' : 'bg-[var(--color-bg-surface-raised)] text-[var(--color-text-muted)] hover:bg-[var(--color-border)]'}">
                ${label}
            </button>
        `;
    };

    return `
        <div class="animate-in" style="opacity: 0;">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                 <h1 class="text-4xl font-bold tracking-tighter text-[var(--color-text-base)]">Contract Management</h1>
                 <div class="flex items-center gap-2">
                     ${createContractButton}
                     <button onclick="alert('Not implemented')" class="px-3 py-2 text-sm bg-[var(--color-bg-surface-raised)] text-[var(--color-text-muted)] font-semibold rounded-md hover:bg-[var(--color-border)] transition-colors">
                        📤 Export Contracts
                    </button>
                 </div>
            </div>

            <div class="mb-4 flex flex-wrap items-center gap-2">
                ${FilterButton('Active', 'Active Contracts')}
                ${FilterButton('Pending Approval', 'Pending Approval')}
                ${FilterButton('Expired / Terminated', 'Expired / Terminated')}
                ${isOwner ? FilterButton('Templates', 'Templates') : ''}
                <div class="relative ml-auto">
                    <select class="p-2 text-sm rounded-md bg-[var(--color-bg-surface-raised)] border border-[var(--color-border)] text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:ring-0 appearance-none">
                        <option>Sort by Start Date</option>
                        <option>Sort by Client</option>
                        <option>Sort by Status</option>
                    </select>
                </div>
            </div>

            <div class="bg-[var(--color-bg-surface)] rounded-xl border border-[var(--color-border)]">
                ${renderTable()}
                ${renderMobileCards()}
            </div>

             <div class="mt-6 flex flex-col sm:flex-row justify-between items-center text-sm gap-4">
                <div class="flex items-center gap-2 text-[var(--color-text-muted)]">
                    <input type="checkbox" class="h-4 w-4 rounded border-[var(--color-border)] bg-[var(--color-bg-base)] text-[var(--color-accent)] focus:ring-[var(--color-accent)]/50" />
                    <span>Select All</span>
                    <select class="p-1 text-xs rounded-md bg-[var(--color-bg-surface-raised)] border border-[var(--color-border)]">
                        <option>Bulk Actions</option>
                        <option>Approve Selected</option>
                        <option>Export Selected</option>
                        <option>Terminate Selected</option>
                    </select>
                </div>
                 <div class="flex gap-2">
                    <button class="px-3 py-1 rounded-md bg-[var(--color-bg-surface-raised)] hover:bg-[var(--color-border)]">&larr; Prev</button>
                    <span class="px-3 py-1 text-[var(--color-text-muted)]">Page 1 of 1</span>
                    <button class="px-3 py-1 rounded-md bg-[var(--color-bg-surface-raised)] hover:bg-[var(--color-border)]">Next &rarr;</button>
                </div>
            </div>
        </div>
    `;
};