import { Icons } from './Icons.js';
import { getMissionById, getUserById } from '../database.js';

export const TrackProgressModal = ({ missionId }) => {
    const mission = getMissionById(missionId);
    if (!mission) return '';

    const guards = mission.claimedBy.map((id) => getUserById(id)).filter(Boolean);

    return `
    <div class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in" data-action="close-modal-backdrop">
        <div class="bg-[var(--color-bg-surface)] rounded-lg shadow-xl w-full max-w-2xl border border-[var(--color-border)] flex flex-col h-full md:h-auto md:max-h-[90vh]" data-modal-content>
            <div class="p-5 border-b border-[var(--color-border)] flex-shrink-0 flex justify-between items-center">
                <div>
                    <h2 class="text-2xl font-bold text-[var(--color-text-base)]">Live Mission Progress</h2>
                    <p class="text-sm text-[var(--color-text-muted)]">${mission.title}</p>
                </div>
                 <button data-action="close-modal" class="text-[var(--color-text-muted)] hover:text-[var(--color-text-base)]">
                    ${Icons.X({ className: 'w-6 h-6' })}
                </button>
            </div>
            <div class="p-6 overflow-y-auto flex-grow space-y-6">
                <div>
                    <h3 class="font-bold text-lg mb-2 text-[var(--color-accent)]">Guard Status</h3>
                    <ul class="space-y-2">
                        ${guards.map(g => {
                            const checkIn = mission.checkIns[g.id];
                            const checkOut = mission.checkOuts[g.id];
                            let statusText = 'Pending Check-in';
                            let statusColor = 'text-yellow-400';
                            if (checkOut) {
                                statusText = `Checked Out @ ${new Date(checkOut.time).toLocaleTimeString()}`;
                                statusColor = 'text-red-400';
                            } else if (checkIn) {
                                statusText = `Checked In @ ${new Date(checkIn.time).toLocaleTimeString()}`;
                                statusColor = 'text-green-400';
                            }
                            return `
                                <li class="flex justify-between items-center text-sm p-3 bg-[var(--color-bg-surface-raised)] rounded-lg border border-[var(--color-border)]">
                                    <span class="font-semibold text-[var(--color-text-base)]">${g.firstName} ${g.lastName}</span>
                                    <span class="font-semibold ${statusColor}">${statusText}</span>
                                </li>
                            `
                        }).join('')}
                    </ul>
                </div>
                <div>
                    <h3 class="font-bold text-lg mb-2 text-[var(--color-accent)]">GPS Tracking</h3>
                    <div class="bg-[var(--color-bg-surface-raised)] p-4 rounded-lg border border-[var(--color-border)] text-center text-[var(--color-text-muted)]">
                        <p>${Icons.Map({className: 'w-12 h-12 mx-auto mb-2 text-[var(--color-text-inactive)]'})}</p>
                        <p>Live GPS tracking data would be displayed on a map here.</p>
                        <p class="text-xs">(Feature not implemented in this version)</p>
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