
import { getMissionsForSpotCheck, getClients } from '../../database.js';
import { Icons } from '../Icons.js';

export const FieldOversight = ({ user }) => {
    const missions = getMissionsForSpotCheck(user.id);
    return `
    <div class="animate-in" style="opacity: 0;">
        <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Field Oversight</h1>
        <p class="text-[var(--text-secondary)] mb-4">Select an active mission to begin a spot check.</p>
         ${missions.length > 0 ? `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${missions.map(mission => {
                    const client = getClients().find(c => c.id === mission.clientId);
                    return `
                    <div class="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-4 flex flex-col justify-between shadow-sm">
                        <div>
                            <h3 class="font-bold text-lg text-[var(--text-primary)]">${mission.title}</h3>
                            <p class="text-sm text-[var(--text-secondary)]">${client?.companyName || 'N/A'}</p>
                            <p class="text-sm text-[var(--text-secondary)] mt-1">Guards on mission: ${mission.claimedBy.length}</p>
                        </div>
                        <div class="mt-4">
                            <button data-action="start-spot-check" data-id="${mission.id}" class="w-full px-4 py-2 text-sm font-bold rounded-md transition-colors bg-[var(--accent-secondary)] text-white hover:bg-[var(--accent-secondary-hover)]">Start Spot Check</button>
                        </div>
                    </div>`
                }).join('')}
            </div>
        ` : `<div class="text-center py-16 bg-[var(--bg-secondary)] border border-dashed border-[var(--border-secondary)] rounded-lg shadow-sm">
                ${Icons.Eye({ className: "w-16 h-16 mx-auto text-[var(--text-secondary)] opacity-50" })}
                <h2 class="mt-4 text-xl font-semibold text-[var(--text-primary)]">No Missions to Supervise</h2>
                <p class="mt-1 text-[var(--text-secondary)]">There are currently no active missions on your team that require supervision.</p>
            </div>`
        }
    </div>`;
};
