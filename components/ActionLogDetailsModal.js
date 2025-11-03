
import { getActionLogEntryById, getUserById } from '../database.js';
import { Icons } from './Icons.js';

export const ActionLogDetailsModal = ({ logEntryId }) => {
    const logEntry = getActionLogEntryById(logEntryId);
    if (!logEntry) return '';

    const user = getUserById(logEntry.userId);

    const renderDetails = (details) => {
        if (!details.before && !details.after) {
            return `<pre class="text-xs whitespace-pre-wrap">${JSON.stringify(details, null, 2)}</pre>`;
        }

        const before = details.before || {};
        const after = details.after || {};
        const allKeys = [...new Set([...Object.keys(before), ...Object.keys(after)])];

        const diffs = allKeys.map(key => {
            const beforeVal = JSON.stringify(before[key]);
            const afterVal = JSON.stringify(after[key]);
            if (beforeVal !== afterVal) {
                return `
                <div class="mt-2">
                    <p class="font-mono text-xs text-[var(--color-text-muted)]">${key}:</p>
                    <p class="font-mono text-xs text-red-400 bg-red-500/10 p-1 rounded">- ${beforeVal || '""'}</p>
                    <p class="font-mono text-xs text-green-400 bg-green-500/10 p-1 rounded">+ ${afterVal || '""'}</p>
                </div>`;
            }
            return '';
        }).join('');

        return diffs || '<p class="text-sm text-[var(--color-text-muted)]">No data changes detected.</p>';
    }

    return `
    <div class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in" data-action="close-modal-backdrop">
        <div class="bg-[var(--color-bg-surface)] rounded-lg shadow-xl w-full max-w-2xl border border-[var(--color-border)] flex flex-col h-full md:h-auto md:max-h-[90vh]" data-modal-content>
            <div class="p-5 border-b border-[var(--color-border)] flex-shrink-0">
                <h2 class="text-2xl font-bold text-[var(--color-text-base)]">Action Log Details</h2>
                <p class="text-sm text-[var(--color-text-muted)]">${logEntry.actionType.replace(/_/g, ' ')}</p>
            </div>
            <div class="p-6 overflow-y-auto space-y-4 flex-grow">
                <div class="text-sm bg-[var(--color-bg-surface-raised)] p-4 rounded-lg border border-[var(--color-border)]">
                    <p><strong>Action ID:</strong> ${logEntry.id}</p>
                    <p><strong>Timestamp:</strong> ${new Date(logEntry.timestamp).toLocaleString()}</p>
                    <p><strong>Performed By:</strong> ${user ? `${user.firstName} ${user.lastName} (${user.role})` : `Unknown User (${logEntry.userId})`}</p>
                    <p><strong>Entity:</strong> ${logEntry.entityType} (${logEntry.entityId})</p>
                    <p><strong>Severity:</strong> ${logEntry.severity}</p>
                </div>
                <div>
                     <h3 class="font-bold text-lg mb-2 text-[var(--color-accent)]">Changes</h3>
                     <div class="bg-[var(--color-bg-surface-raised)] p-4 rounded-lg border border-[var(--color-border)]">
                        ${renderDetails(logEntry.details)}
                     </div>
                </div>
            </div>
            <div class="p-4 bg-[var(--color-bg-surface-raised)] border-t border-[var(--color-border)] flex justify-end items-center space-x-3 flex-shrink-0">
                <button data-action="close-modal" class="px-4 py-2 bg-[var(--color-bg-surface)] text-[var(--color-text-base)] font-semibold rounded-md hover:bg-[var(--color-border)] border border-[var(--color-border)]">Close</button>
            </div>
        </div>
    </div>
    `;
};
