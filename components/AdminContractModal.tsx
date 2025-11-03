import { getClients } from '../database.js';

export const AdminContractModal = () => {
    const clients = getClients();
    const inputStyles = "mt-1 block w-full border border-[var(--color-border)] rounded-md shadow-sm p-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] bg-[var(--color-bg-surface-raised)]";
    return `
    <div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-in" data-action="close-modal-backdrop">
        <div class="bg-[var(--color-bg-surface)] rounded-lg shadow-xl w-full max-w-lg border border-[var(--color-border)] max-h-[90vh] overflow-y-auto" data-modal-content>
            <div class="p-6">
                <h2 class="text-2xl font-bold mb-4 text-[var(--color-text-base)]">Create New Contract (Admin)</h2>
                <form id="admin-contract-form" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-[var(--color-text-muted)]">Client</label>
                        <select name="clientId" required class="${inputStyles}">
                            <option value="">Select a Client</option>
                            ${clients.map(c => `<option value="${c.id}">${c.companyName}</option>`).join('')}
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-[var(--color-text-muted)]">Contract Title</label>
                        <input name="title" placeholder="e.g., Downtown Office Security" required class="${inputStyles}" />
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-[var(--color-text-muted)]">Start Date</label>
                            <input name="startDate" type="date" required class="${inputStyles}" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-[var(--color-text-muted)]">End Date</label>
                            <input name="endDate" type="date" required class="${inputStyles}" />
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-[var(--color-text-muted)]">Total Budget ($)</label>
                        <input name="totalBudget" type="number" min="0" step="100" placeholder="50000" required class="${inputStyles}" />
                    </div>
                    <div class="flex items-center">
                        <input id="activate-now" name="activateNow" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-[var(--color-accent)] focus:ring-[var(--color-accent)]">
                        <label for="activate-now" class="ml-2 block text-sm text-[var(--color-text-muted)]">Activate contract immediately (skips approval)</label>
                    </div>
                     <div class="flex justify-end space-x-3 pt-4 border-t border-[var(--color-border)]">
                         <button type="button" data-action="close-modal" class="px-4 py-2 bg-[var(--color-bg-surface-raised)] text-[var(--color-text-base)] font-semibold rounded-md hover:bg-[var(--color-border)] transition">Cancel</button>
                         <button type="submit" class="px-4 py-2 bg-[var(--color-secondary)] text-[var(--color-secondary-text)] font-semibold rounded-md hover:bg-[var(--color-secondary-hover)] transition">Create Contract</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    `;
};