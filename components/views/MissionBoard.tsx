import { getMissions, getClients, getUserTrainingProgress, getTrainingModules } from '../../database.js';
import { Icons } from '../Icons.js';

export const MissionBoard = ({ user }) => {
    const missions = getMissions(user.teamId);
    const clients = getClients();
    const trainingProgress = getUserTrainingProgress(user.id);
    const allTrainingModules = getTrainingModules();
    const availableMissions = missions.filter(m => m.status === 'Open' || (m.status === 'Claimed' && m.claimedBy.length < m.requiredGuards));
    
    const MissionCard = ({ mission, user, client }) => {
        const isClaimedByUser = mission.claimedBy.includes(user.id);
        const isFull = mission.claimedBy.length >= mission.requiredGuards;
        const isBlacklisted = client && client.blacklist.includes(user.id);
        const requiredTraining = allTrainingModules.find(tm => tm.id === mission.requiredTrainingId);
        const userTraining = trainingProgress.find(p => p.moduleId === mission.requiredTrainingId);
        const userLevelMet = user.level >= mission.requiredLevel;

        let statusText;
        let statusClass;
        let actionButton;

        if (isClaimedByUser) {
            statusText = 'Claimed';
            statusClass = 'status-blue';
            actionButton = `<button disabled class="w-full text-sm font-bold rounded-md bg-[var(--color-bg-surface-raised)] text-[var(--color-text-muted)] cursor-not-allowed py-2.5">Claimed</button>`;
        } else if (isFull) {
            statusText = 'Full';
            statusClass = 'status-gray';
            actionButton = `<button disabled class="w-full text-sm font-bold rounded-md bg-[var(--color-bg-surface-raised)] text-[var(--color-text-muted)] cursor-not-allowed py-2.5">Full</button>`;
        } else if (isBlacklisted) {
            statusText = 'Ineligible';
            statusClass = 'status-red';
            actionButton = `<button disabled class="w-full text-sm font-bold rounded-md bg-[var(--color-bg-surface-raised)] text-[var(--color-text-muted)] cursor-not-allowed py-2.5">Ineligible</button>`;
        } else if (!userLevelMet) {
            statusText = `Lvl ${mission.requiredLevel}+ Req.`;
            statusClass = 'status-yellow';
            actionButton = `<button disabled class="w-full text-sm font-bold rounded-md bg-[var(--color-bg-surface-raised)] text-[var(--color-text-muted)] cursor-not-allowed py-2.5">Level Too Low</button>`;
        } else if (!userTraining || userTraining.status === 'Failed' || userTraining.status === 'Denied') {
            statusText = 'Training Req.';
            statusClass = 'status-yellow';
            actionButton = `<button data-action="navigate" data-type="Training" class="w-full text-sm font-bold rounded-md bg-[var(--color-secondary)] text-white hover:bg-[var(--color-secondary-hover)] transition-colors py-2.5">Go to Training</button>`;
        } else if (userTraining.status === 'Pending Approval') {
            statusText = 'Training Pending';
            statusClass = 'status-yellow';
            actionButton = `<button disabled class="w-full text-sm font-bold rounded-md bg-[var(--color-bg-surface-raised)] text-[var(--color-text-muted)] cursor-not-allowed py-2.5">Pending</button>`;
        } else if (userTraining.status === 'Approved') {
            statusText = 'Available';
            statusClass = 'status-green';
            actionButton = `<button data-action="claim-mission" data-id="${mission.id}" class="w-full text-sm font-bold rounded-md bg-[var(--color-accent)] text-[var(--color-accent-text)] hover:bg-[var(--color-accent-hover)] transition-colors py-2.5">Claim Mission</button>`;
        } else {
            statusText = 'Unavailable';
            statusClass = 'status-gray';
            actionButton = `<button disabled class="w-full text-sm font-bold rounded-md bg-[var(--color-bg-surface-raised)] text-[var(--color-text-muted)] cursor-not-allowed py-2.5">Unavailable</button>`;
        }

        return `
            <div class="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-5 flex flex-col justify-between transition-all duration-300 hover:border-[var(--color-accent)] hover:-translate-y-1">
                <div>
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="font-bold text-lg text-[var(--color-text-base)]">${mission.title}</h3>
                        <div class="status-pill ${statusClass}">${statusText}</div>
                    </div>
                    <p class="text-sm text-[var(--color-text-muted)] mb-4">${client?.companyName || 'N/A'}</p>
                    
                    <div class="text-sm space-y-2 bg-[var(--color-bg-base)] p-3 rounded-lg border border-[var(--color-border)]">
                        <div class="flex justify-between"><span>Pay Rate:</span> <span class="font-semibold text-[var(--color-text-base)]">$${mission.payRate}/hr</span></div>
                        <div class="flex justify-between"><span>Start Time:</span> <span class="font-semibold text-[var(--color-text-base)]">${new Date(mission.startTime).toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</span></div>
                        <div class="flex justify-between"><span>Training:</span> <span class="font-semibold text-[var(--color-text-base)]">${requiredTraining?.title || 'N/A'}</span></div>
                    </div>
                </div>
                <div class="mt-5 flex items-center gap-4">
                    ${actionButton}
                    <button data-action="open-mission-details" data-id="${mission.id}" class="w-full text-center text-sm font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-text-base)] transition-colors py-2.5 rounded-md bg-[var(--color-bg-surface-raised)]">Details</button>
                </div>
            </div>
        `;
    };
    return `
        <div class="animate-in" style="opacity: 0;">
            <div class="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                <h1 class="text-4xl font-bold tracking-tighter text-[var(--color-text-base)]">Mission Board</h1>
                <p class="text-[var(--color-text-muted)] text-sm md:text-base">Available Missions: <span class="font-bold text-[var(--color-text-base)]">${availableMissions.length}</span></p>
            </div>
            ${availableMissions.length > 0 ? `
                <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    ${availableMissions.map((mission, i) => `<div class="animate-in" style="animation-delay: ${i * 50}ms; opacity: 0;">${MissionCard({ mission, user, client: clients.find(c => c.id === mission.clientId) })}</div>`).join('')}
                </div>
            ` : `
                <div class="text-center py-20 bg-[var(--color-bg-surface)] border-2 border-dashed border-[var(--color-border)] rounded-xl">
                    ${Icons.ClipboardList({ className: "w-16 h-16 mx-auto text-[var(--color-text-inactive)]" })}
                    <h2 class="mt-4 text-xl font-semibold text-[var(--color-text-base)]">No Missions Available</h2>
                    <p class="mt-1 text-[var(--color-text-muted)]">Check back later for new opportunities on your team's board.</p>
                </div>
            `}
        </div>
    `;
};