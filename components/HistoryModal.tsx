import { getActionLogForEntity, getUserById } from '../database.js';
import { Icons } from './Icons.js';

export const HistoryModal = ({ entityInfo }) => {
    const { entityType, entityId } = entityInfo;
    if (!entityType || !entityId) return '';

    const logs = getActionLogForEntity(entityId);
    
    // Attempt to get a friendly name for the entity for the title
    let title = `History for ${entityType}: ${entityId}`;
    if (entityType === 'users') {
        const user = getUserById(entityId);
        if (user) title = `History for ${user.firstName} ${user.lastName}`;
    }
    // Could add cases for other entity types like missions if needed

    const severityClass = (severity) => {
        switch (severity) {
            case 'High': return 'border-red-500';
            case 'Medium': return 'border-yellow-500';
            default: return 'border-green-500';
        }
    };

    return `
    <div class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in" data-action="close-modal-backdrop">
        <div class="bg-[var(--color-bg-surface)] rounded-lg shadow-xl w-full max-w-4xl border border-[var(--color-border)] flex flex-col h-full md:h-auto md:max-h-[90vh]" data-modal-content>
            <div class="p-5 border-b border-[var(--color-border)] flex-shrink-0 flex justify-between items-center">
                <div>
                    <h2 class="text-2xl font-bold text-[var(--color-text-base)]">Action History</h2>
                    <p class="text-sm text-[var(--color-text-muted)]">${title}</p>
                </div>
                <button data-action="close-modal" class="text-[var(--color-text-muted)] hover:text-[var(--color-text-base)]">
                    ${Icons.X({ className: 'w-6 h-6' })}
                </button>
            </div>
            <div class="p-6 overflow-y-auto flex-grow">
                <ul class="space-y-3">
                    ${logs.length > 0 ? logs.map(log => {
                        const actor = getUserById(log.userId);
                        return `
                        <li class="p-3 bg-[var(--color-bg-surface-raised)] rounded-lg border-l-4 ${severityClass(log.severity)}">
                            <div class="flex flex-col sm:flex-row justify-between items-start">
                                <div>
                                    <p class="font-semibold text-[var(--color-text-base)]">${log.actionType.replace(/_/g, ' ')}</p>
                                    <p class="text-xs text-[var(--color-text-muted)]">
                                        By: ${actor ? `${actor.firstName} ${actor.lastName}` : 'System'}
                                    </p>
                                </div>
                                <p class="text-xs text-[var(--color-text-inactive)] mt-1 sm:mt-0">${new Date(log.timestamp).toLocaleString()}</p>
                            </div>
                            <div class="mt-2 pt-2 border-t border-[var(--color-border)]/50">
                                <p class="text-xs text-[var(--color-text-muted)]">${log.details.description}</p>
                            </div>
                        </li>
                        `
                    }).join('') : `
                    <li class="text-center p-8 text-[var(--color-text-muted)]">
                        No history recorded for this entity.
                    </li>
                    `}
                </ul>
            </div>
            <div class="p-4 bg-[var(--color-bg-surface-raised)] border-t border-[var(--color-border)] flex justify-end items-center space-x-3 flex-shrink-0">
                <button data-action="close-modal" class="px-4 py-2 bg-[var(--color-bg-surface)] text-[var(--color-text-base)] font-semibold rounded-md hover:bg-[var(--color-border)] border border-[var(--color-border)]">Close</button>
            </div>
        </div>
    </div>
    `;
};
