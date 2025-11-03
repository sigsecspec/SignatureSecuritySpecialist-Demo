
import { Icons } from './Icons.js';
// import { getPayrollEntryById, etc } from '../database.js';

export const PayDetailsModal = ({ entryId }) => {
    // const entry = getPayrollEntryById(entryId);
    // if (!entry) return '';
    return `
    <div class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in" data-action="close-modal-backdrop">
        <div class="bg-[var(--color-bg-surface)] rounded-lg shadow-xl w-full max-w-lg border border-[var(--color-border)]" data-modal-content>
            <div class="p-5 border-b border-[var(--color-border)]">
                <h2 class="text-2xl font-bold text-[var(--color-text-base)]">Pay Breakdown</h2>
                <p class="text-sm text-[var(--color-text-muted)]">Entry ID: ${entryId}</p>
            </div>
            <div class="p-6 text-center text-[var(--color-text-muted)]">
                A detailed breakdown of hours, rates, missions, and any deductions would appear here.
                <p class="text-xs mt-2">(Feature not fully implemented)</p>
            </div>
            <div class="p-4 bg-[var(--color-bg-surface-raised)] border-t border-[var(--color-border)] flex justify-end">
                <button data-action="close-modal" class="px-4 py-2 bg-[var(--color-bg-surface)] text-[var(--color-text-base)] font-semibold rounded-md hover:bg-[var(--color-border)] border border-[var(--color-border)]">Close</button>
            </div>
        </div>
    </div>
    `;
};
