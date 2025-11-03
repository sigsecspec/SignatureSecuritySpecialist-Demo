import { getClients, getUsers, getMissions } from '../../database.js';
import { fieldRoles } from '../../constants.js';

export const ClientGuardRoster = ({ user }) => {
    const client = getClients().find(c => c.userId === user.id);
    if (!client) return `<div>Loading client data...</div>`;
    const allGuards = getUsers(fieldRoles);
    const clientMissions = getMissions().filter(m => m.clientId === client.id);
    const guardIds = new Set();
    clientMissions.forEach(mission => mission.claimedBy.forEach(guardId => guardIds.add(guardId)));
    const guardsWhoWorked = allGuards.filter(guard => guardIds.has(guard.id));
    return `
        <div class="animate-in" style="opacity: 0;">
            <h1 class="text-3xl font-bold text-[var(--color-text-base)] mb-6">My Guard Roster</h1>
            <p class="text-[var(--color-text-muted)] mb-6">Manage your preferred guards. Whitelisted guards get priority on your missions, while blacklisted guards cannot claim them.</p>
            <div class="bg-[var(--color-bg-surface)] shadow-md rounded-lg overflow-hidden border border-[var(--color-border)]">
                <table class="min-w-full leading-normal hidden md:table">
                    <thead class="bg-[var(--color-bg-surface-raised)]"><tr class="text-left text-[var(--color-text-muted)] uppercase text-sm"><th class="px-5 py-3 font-semibold">Guard</th><th class="px-5 py-3 font-semibold">Rating</th><th class="px-5 py-3 font-semibold text-center">Actions</th></tr></thead>
                    <tbody class="divide-y divide-[var(--color-border)]">
                        ${guardsWhoWorked.map(guard => {
                            const isWhitelisted = client.whitelist.includes(guard.id);
                            const isBlacklisted = client.blacklist.includes(guard.id);
                            return `
                                <tr class="hover:bg-[var(--color-bg-surface-raised)]">
                                    <td class="px-5 py-4 text-sm"><p class="text-[var(--color-text-base)] whitespace-no-wrap font-semibold">${guard.firstName} ${guard.lastName}</p><p class="text-[var(--color-text-muted)] whitespace-no-wrap text-xs">${guard.rank}</p></td>
                                    <td class="px-5 py-4 text-sm"><span class="font-semibold text-[var(--color-accent)]">${guard.performanceRating.toFixed(2)} / 5.00</span></td>
                                    <td class="px-5 py-4 text-sm text-center space-x-2">
                                        <button data-action="update-roster" data-guard-id="${guard.id}" data-list-type="whitelist" class="px-3 py-1 rounded-full text-xs font-semibold transition-colors ${isWhitelisted ? 'bg-[var(--color-accent)] text-[var(--color-accent-text)]' : 'bg-[var(--color-bg-surface-raised)] text-[var(--color-text-muted)] hover:bg-[var(--color-border)]'}">${isWhitelisted ? 'Whitelisted' : 'Whitelist'}</button>
                                        <button data-action="update-roster" data-guard-id="${guard.id}" data-list-type="blacklist" class="px-3 py-1 rounded-full text-xs font-semibold transition-colors ${isBlacklisted ? 'bg-red-500/80 text-white' : 'bg-[var(--color-bg-surface-raised)] text-[var(--color-text-muted)] hover:bg-[var(--color-border)]'}">${isBlacklisted ? 'Blacklisted' : 'Blacklist'}</button>
                                    </td>
                                </tr>`;
                        }).join('')}
                    </tbody>
                </table>
                 <div class="md:hidden p-3 space-y-3">
                     ${guardsWhoWorked.map(guard => {
                         const isWhitelisted = client.whitelist.includes(guard.id);
                         const isBlacklisted = client.blacklist.includes(guard.id);
                         return `
                         <div class="bg-[var(--color-bg-surface-raised)] p-3 rounded-lg border border-[var(--color-border)]">
                            <p class="font-bold text-[var(--color-text-base)]">${guard.firstName} ${guard.lastName}</p>
                            <p class="text-xs text-[var(--color-accent)] font-semibold">${guard.performanceRating.toFixed(2)} Rating</p>
                             <div class="mt-2 pt-2 border-t border-[var(--color-border)] flex justify-end space-x-2">
                                 <button data-action="update-roster" data-guard-id="${guard.id}" data-list-type="whitelist" class="px-3 py-1 rounded-full text-xs font-semibold transition-colors ${isWhitelisted ? 'bg-[var(--color-accent)] text-[var(--color-accent-text)]' : 'bg-[var(--color-bg-surface)] text-[var(--color-text-muted)] hover:bg-[var(--color-border)]'}">${isWhitelisted ? 'Whitelisted' : 'Whitelist'}</button>
                                <button data-action="update-roster" data-guard-id="${guard.id}" data-list-type="blacklist" class="px-3 py-1 rounded-full text-xs font-semibold transition-colors ${isBlacklisted ? 'bg-red-500/80 text-white' : 'bg-[var(--color-bg-surface)] text-[var(--color-text-muted)] hover:bg-[var(--color-border)]'}">${isBlacklisted ? 'Blacklisted' : 'Blacklist'}</button>
                            </div>
                        </div>`;
                    }).join('')}
                </div>
            </div>
        </div>
    `;
};