import { getMissionsForSpotCheck, getClients } from '../../database.js';
import { Icons } from '../Icons.js';

export const FieldOversight = ({ user }) => {
    const missions = getMissionsForSpotCheck(user.id);
    return `
    <div class="animate-in" style="opacity: 0;">
        <h1 class="text-3xl font-bold text-[var(--color-text-base)] mb-6">Field Oversight</h1>
        <p class="text-[var(--color-text-muted)] mb-4">Select an active mission to begin a spot check.</p>
         ${missions.length > 0 ? `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${missions.map(mission => {
                    const client = getClients().find(c => c.id === mission.clientId);
                    return `
                    <div class="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-lg p-4 flex flex-col justify-between shadow-sm">
                        <div>
                            <h3 class="font-bold text-lg text-[var(--color-text-base)]">${mission.title}</h3>
                            <p class="text-sm text-[var(--color-text-muted)]">${client?.companyName || 'N/A'}</p>
                            <p class="text-sm text-[var(--color-text-muted)] mt-1">Guards on mission: ${mission.claimedBy.length}</p>
                        </div>
                        <div class="mt-4">
                            <button data-action="start-spot-check" data-id="${mission.id}" class="w-full px-4 py-2 text-sm font-bold rounded-md transition-colors bg-[var(--color-secondary)] text-[var(--color-secondary-text)] hover:bg-[var(--color-secondary-hover)]">Start Spot Check</button>
                        </div>
                    </div>`
                }).join('')}
            </div>
        ` : `<div class="text-center py-16 bg-[var(--color-bg-surface)] border border-dashed border-[var(--color-border)] rounded-lg shadow-sm">
                ${Icons.Eye({ className: "w-16 h-16 mx-auto text-[var(--color-text-muted)] opacity-50" })}
                <h2 class="mt-4 text-xl font-semibold text-[var(--color-text-base)]">No Missions to Supervise</h2>
                <p class="mt-1 text-[var(--color-text-muted)]">There are currently no active missions on your team that require supervision.</p>
            </div>`
        }
    </div>`;
};