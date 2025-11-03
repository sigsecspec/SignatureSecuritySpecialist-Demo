import { getContracts, getClients } from '../../database.js';
import { Icons } from '../Icons.js';

export const MyContracts = ({ user }) => {
    const client = getClients().find(c => c.userId === user.id);
    const contracts = client ? getContracts().filter(c => c.clientId === client.id) : [];

    const getStatusPill = (status) => {
        switch (status) {
            case 'Active': return 'status-green';
            case 'Pending':
            case 'Ready for Review':
                return 'status-yellow';
            case 'Denied': return 'status-red';
            default: return 'status-gray';
        }
    };

    return `
    <div class="animate-in" style="opacity: 0;">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h1 class="text-3xl font-bold text-[var(--color-text-base)]">My Contracts</h1>
            <button data-action="open-contract-modal" class="flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)] text-[var(--color-accent-text)] font-semibold rounded-md hover:bg-[var(--color-accent-hover)] transition-colors">
                ${Icons.PlusCircle({ className: "w-5 h-5" })} Add New Contract
            </button>
        </div>
        <div class="space-y-4">
            ${contracts.length > 0 ? contracts.map(contract => `
                <div class="bg-[var(--color-bg-surface)] p-4 border border-[var(--color-border)] rounded-lg shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                        <p class="font-bold text-[var(--color-text-base)]">${contract.title}</p>
                        <p class="text-sm text-[var(--color-text-muted)]">
                            ${new Date(contract.startDate).toLocaleDateString()} - ${new Date(contract.endDate).toLocaleDateString()}
                        </p>
                    </div>
                    <div class="flex items-center gap-4">
                         <span class="status-pill ${getStatusPill(contract.status)}">${contract.status}</span>
                         <button class="font-semibold text-sm text-[var(--color-accent)] hover:underline">Details</button>
                    </div>
                </div>
            `).join('') : `
                <div class="text-center py-16 bg-[var(--color-bg-surface-raised)] rounded-lg border-2 border-dashed border-[var(--color-border)]">
                    ${Icons.DocumentDuplicate({ className: "w-12 h-12 mx-auto text-[var(--color-text-inactive)]" })}
                    <h3 class="mt-2 text-lg font-medium text-[var(--color-text-base)]">No Contracts Found</h3>
                    <p class="text-sm text-[var(--color-text-muted)]">Click 'Add New Contract' to get started.</p>
                </div>
            `}
        </div>
    </div>
    `;
};