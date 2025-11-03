import { getContracts, getClients } from '../database.js';
import { Icons } from './Icons.js';

export const EditContractModal = ({ contractId }: { contractId: string }) => {
    const contract = getContracts().find((c: any) => c.id === contractId);
    if (!contract) return '';

    const clients = getClients();
    const inputStyles = "mt-1 block w-full border border-[var(--color-border)] rounded-md shadow-sm p-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] bg-[var(--color-bg-surface-raised)]";

    const formatDate = (date: Date) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toISOString().split('T')[0];
    }

    return `
    <div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-in" data-action="close-modal-backdrop">
        <div class="bg-[var(--color-bg-surface)] rounded-lg shadow-xl w-full max-w-lg border border-[var(--color-border)] max-h-[90vh] overflow-y-auto" data-modal-content>
            <div class="p-6 border-b border-[var(--color-border)]">
                <h2 class="text-2xl font-bold mb-4 text-[var(--color-text-base)]">Edit Contract</h2>
            </div>
            <form id="edit-contract-form" data-contract-id="${contract.id}" class="p-6 space-y-4">
                <div>
                    <label class="block text-sm font-medium text-[var(--color-text-muted)]">Client</label>
                    <select name="clientId" required class="${inputStyles}">
                        ${clients.map((c: any) => `<option value="${c.id}" ${contract.clientId === c.id ? 'selected' : ''}>${c.companyName}</option>`).join('')}
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-[var(--color-text-muted)]">Contract Title</label>
                    <input name="title" value="${contract.title}" required class="${inputStyles}" />
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-[var(--color-text-muted)]">Start Date</label>
                        <input name="startDate" type="date" value="${formatDate(contract.startDate)}" required class="${inputStyles}" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-[var(--color-text-muted)]">End Date</label>
                        <input name="endDate" type="date" value="${formatDate(contract.endDate)}" required class="${inputStyles}" />
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-[var(--color-text-muted)]">Total Budget ($)</label>
                    <input name="totalBudget" type="number" min="0" step="100" value="${contract.totalBudget}" required class="${inputStyles}" />
                </div>
                <div class="flex justify-end space-x-3 pt-4 border-t border-[var(--color-border)]">
                    <button type="button" data-action="close-modal" class="px-4 py-2 bg-[var(--color-bg-surface-raised)] text-[var(--color-text-base)] font-semibold rounded-md hover:bg-[var(--color-border)] transition">Cancel</button>
                    <button type="submit" class="px-4 py-2 bg-[var(--color-secondary)] text-[var(--color-secondary-text)] font-semibold rounded-md hover:bg-[var(--color-secondary-hover)] transition">Save Changes</button>
                </div>
            </form>
        </div>
    </div>
    `;
};