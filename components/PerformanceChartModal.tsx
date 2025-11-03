import { Icons } from './Icons.js';
import { getUserById } from '../database.js';

export const PerformanceChartModal = ({ userId }) => {
    const user = getUserById(userId);
    if (!user) return '';

    return `
    <div class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in" data-action="close-modal-backdrop">
        <div class="bg-[var(--color-bg-surface)] rounded-lg shadow-xl w-full max-w-2xl border border-[var(--color-border)] flex flex-col h-full md:h-auto md:max-h-[90vh]" data-modal-content>
            <div class="p-5 border-b border-[var(--color-border)] flex-shrink-0 flex justify-between items-center">
                <div>
                    <h2 class="text-2xl font-bold text-[var(--color-text-base)]">Performance Report</h2>
                    <p class="text-sm text-[var(--color-text-muted)]">${user.firstName} ${user.lastName}</p>
                </div>
                <button data-action="close-modal" class="text-[var(--color-text-muted)] hover:text-[var(--color-text-base)]">
                    ${Icons.X({ className: 'w-6 h-6' })}
                </button>
            </div>
            <div class="p-6 overflow-y-auto flex-grow text-center">
                ${Icons.ChartBar({className: 'w-24 h-24 mx-auto text-[var(--color-text-inactive)] mb-4'})}
                <h3 class="text-lg font-semibold text-[var(--color-text-base)]">Performance Over Time</h3>
                <p class="text-sm text-[var(--color-text-muted)]">A chart showing this user's performance rating history would be displayed here.</p>
                <p class="text-xs text-[var(--color-text-inactive)] mt-2">(Feature not implemented)</p>
            </div>
            <div class="p-4 bg-[var(--color-bg-surface-raised)] border-t border-[var(--color-border)] flex justify-end items-center space-x-3 flex-shrink-0">
                <button data-action="close-modal" class="px-4 py-2 bg-[var(--color-bg-surface)] text-[var(--color-text-base)] font-semibold rounded-md hover:bg-[var(--color-border)] border border-[var(--color-border)]">Close</button>
            </div>
        </div>
    </div>
    `;
};