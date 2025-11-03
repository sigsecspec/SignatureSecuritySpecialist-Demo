import { getMissions, getClients } from '../../database.js';
import { clientRole } from '../../constants.js';

export const MyMissions = ({ user }) => {
    const allMissions = getMissions();
    let myMissions = [];
    if (user.role === 'Client') {
        const client = getClients().find(c => c.userId === user.id);
        if (client) myMissions = allMissions.filter(m => m.clientId === client.id);
    } else {
        myMissions = allMissions.filter(m => m.claimedBy.includes(user.id));
    }
    const now = new Date();
    const categorizedMissions = {
        active: myMissions.filter(m => m.status === 'Active').sort((a,b) => a.startTime.getTime() - b.startTime.getTime()),
        upcoming: myMissions.filter(m => new Date(m.startTime).getTime() > now.getTime() && (m.status === 'Claimed' || m.status === 'Open' || m.status === 'Pending Approval')).sort((a,b) => a.startTime.getTime() - b.startTime.getTime()),
        past: myMissions.filter(m => new Date(m.endTime).getTime() <= now.getTime() || m.status === 'Completed' || m.status === 'Cancelled').sort((a,b) => b.startTime.getTime() - a.startTime.getTime()),
    };
    const MissionCard = ({ mission, user }) => {
        const isClient = clientRole.includes(user.role);
        let actions = '';
        const canStartMission = new Date() >= new Date(mission.startTime);

        if (!isClient) {
             if(mission.status === 'Active') {
                actions = `<button data-action="view-mission-dashboard" data-id="${mission.id}" class="px-3 py-1 text-sm font-bold rounded-md bg-[var(--color-secondary)] text-[var(--color-secondary-text)] hover:bg-[var(--color-secondary-hover)]">Open Dashboard</button>`;
            } else if (canStartMission && mission.status !== 'Completed' && mission.status !== 'Cancelled' && mission.status !== 'Pending Approval') {
                actions = `<button data-action="start-mission" data-id="${mission.id}" class="px-3 py-1 text-sm font-bold rounded-md bg-[var(--color-accent)] text-[var(--color-accent-text)] hover:bg-[var(--color-accent-hover)]">Start Mission</button>`;
            }
        } else {
            if (mission.status === 'Completed') {
                 actions = `<button data-action="open-appeal-modal" data-id="${mission.id}" class="px-3 py-1 text-sm font-semibold rounded-md bg-red-500/20 text-red-400 hover:bg-red-500/40">Appeal</button>`;
            }
        }

        return `
            <div class="bg-[var(--color-bg-surface)] p-4 border border-[var(--color-border)] rounded-lg shadow-sm">
                <div class="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div class="flex-grow">
                        <p class="font-bold text-[var(--color-text-base)]">${mission.title}</p>
                        <p class="text-sm text-[var(--color-text-muted)]">${new Date(mission.startTime).toLocaleString([], {dateStyle: 'medium', timeStyle: 'short'})}</p>
                        <span class="status-pill mt-1 ${mission.status === 'Completed' ? 'status-green' : mission.status === 'Active' ? 'status-blue' : mission.status === 'Cancelled' ? 'status-red' : mission.status.startsWith('Pending') ? 'status-yellow' : 'status-gray'}">${mission.status}</span>
                    </div>
                    <div class="flex-shrink-0 flex items-center gap-2">
                        <button data-action="open-mission-details" data-id="${mission.id}" class="text-sm font-semibold text-[var(--color-accent)] hover:underline">Details</button>
                        ${actions}
                    </div>
                </div>
            </div>
        `;
    };
    const MissionList = ({ title, missions, user }) => `
        <div>
            <h2 class="text-xl font-semibold text-[var(--color-text-base)] mb-3">${title}</h2>
            ${missions.length > 0 ? `
                <div class="space-y-3">
                    ${missions.map(mission => MissionCard({ mission, user })).join('')}
                </div>
            ` : `<p class="text-[var(--color-text-muted)] italic p-4 bg-[var(--color-bg-surface-raised)] rounded-md border border-[var(--color-border)]">No missions in this category.</p>`}
        </div>
    `;
    return `
        <div class="animate-in" style="opacity: 0;">
            <h1 class="text-3xl font-bold text-[var(--color-text-base)] mb-6">My Missions</h1>
            <div class="space-y-8">
                ${MissionList({ title: "Active Missions", missions: categorizedMissions.active, user })}
                ${MissionList({ title: "Upcoming Missions", missions: categorizedMissions.upcoming, user })}
                ${MissionList({ title: "Past Missions", missions: categorizedMissions.past, user })}
            </div>
        </div>
    `;
};