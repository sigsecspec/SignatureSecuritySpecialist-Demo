
import { Icons } from './Icons.js';
// import { getPayrollEntryById, etc } from '../database.js';

export const AdjustPayModal = ({ entryId }) => {
    // const entry = getPayrollEntryById(entryId);
    // if (!entry) return '';
    const inputStyles = "mt-1 block w-full border border-[var(--color-border)] rounded-md shadow-sm p-2 bg-[var(--color-bg-surface-raised)]";
    return `
    <div class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in" data-action="close-modal-backdrop">
        <div class="bg-[var(--color-bg-surface)] rounded-lg shadow-xl w-full max-w-lg border border-[var(--color-border)]" data-modal-content>
            <form id="adjust-pay-form" data-entry-id="${entryId}">
                <div class="p-6">
                    <h2 class="text-2xl font-bold mb-2 text-[var(--color-text-base)]">Adjust Pay</h2>
                    <p class="text-sm text-[var(--color-text-muted)] mb-4">Make manual adjustments to this payroll entry. This action will be logged.</p>
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-[var(--color-text-muted)]">Adjustment Amount ($)</label>
                            <input name="adjustment" type="number" step="0.01" class="${inputStyles}" placeholder="e.g., -25.50 or 50.00" required />
                        </div>
                         <div>
                            <label class="block text-sm font-medium text-[var(--color-text-muted)]">Reason for Adjustment</label>
                            <textarea name="reason" rows="3" required class="${inputStyles}" placeholder="e.g., Uniform deduction"></textarea>
                        </div>
                    </div>
                </div>
                <div class="flex justify-end space-x-3 p-4 bg-[var(--color-bg-surface-raised)] border-t border-[var(--color-border)]">
                    <button type="button" data-action="close-modal" class="px-4 py-2 bg-[var(--color-bg-surface)] text-[var(--color-text-base)] font-semibold rounded-md hover:bg-[var(--color-border)] border border-[var(--color-border)]">Cancel</button>
                    <button type="submit" class="px-4 py-2 bg-[var(--color-accent)] text-[var(--color-accent-text)] font-semibold rounded-md hover:bg-[var(--color-accent-hover)]">Apply Adjustment</button>
                </div>
            </form>
        </div>
    </div>
    `;
};
