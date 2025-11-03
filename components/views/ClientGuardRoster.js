

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
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">My Guard Roster</h1>
            <p class="text-[var(--text-secondary)] mb-6">Manage your preferred guards. Whitelisted guards get priority on your missions, while blacklisted guards cannot claim them.</p>
            <div class="bg-[var(--bg-secondary)] shadow-md rounded-lg overflow-hidden border border-[var(--border-primary)]">
                <table class="min-w-full leading-normal hidden md:table">
                    <thead class="bg-[var(--bg-tertiary)]"><tr class="text-left text-[var(--text-secondary)] uppercase text-sm"><th class="px-5 py-3 font-semibold">Guard</th><th class="px-5 py-3 font-semibold">Rating</th><th class="px-5 py-3 font-semibold text-center">Actions</th></tr></thead>
                    <tbody class="divide-y divide-[var(--border-primary)]">
                        ${guardsWhoWorked.map(guard => {
                            const isWhitelisted = client.whitelist.includes(guard.id);
                            const isBlacklisted = client.blacklist.includes(guard.id);
                            return `
                                <tr class="hover:bg-[var(--bg-tertiary)]">
                                    <td class="px-5 py-4 text-sm"><p class="text-[var(--text-primary)] whitespace-no-wrap font-semibold">${guard.firstName} ${guard.lastName}</p><p class="text-[var(--text-secondary)] whitespace-no-wrap text-xs">${guard.rank}</p></td>
                                    <td class="px-5 py-4 text-sm"><span class="font-semibold text-green-600">${guard.performanceRating.toFixed(2)} / 5.00</span></td>
                                    <td class="px-5 py-4 text-sm text-center space-x-2">
                                        <button data-action="update-roster" data-guard-id="${guard.id}" data-list-type="whitelist" class="px-3 py-1 rounded-full text-xs font-semibold transition-colors ${isWhitelisted ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-700 hover:bg-green-100'}">${isWhitelisted ? 'Whitelisted' : 'Whitelist'}</button>
                                        <button data-action="update-roster" data-guard-id="${guard.id}" data-list-type="blacklist" class="px-3 py-1 rounded-full text-xs font-semibold transition-colors ${isBlacklisted ? 'bg-red-200 text-red-800' : 'bg-gray-200 text-gray-700 hover:bg-red-100'}">${isBlacklisted ? 'Blacklisted' : 'Blacklist'}</button>
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
                         <div class="bg-[var(--bg-tertiary)] p-3 rounded-lg border border-[var(--border-primary)]">
                            <p class="font-bold text-[var(--text-primary)]">${guard.firstName} ${guard.lastName}</p>
                            <p class="text-xs text-green-600 font-semibold">${guard.performanceRating.toFixed(2)} Rating</p>
                             <div class="mt-2 pt-2 border-t border-[var(--border-primary)] flex justify-end space-x-2">
                                 <button data-action="update-roster" data-guard-id="${guard.id}" data-list-type="whitelist" class="px-3 py-1 rounded-full text-xs font-semibold transition-colors ${isWhitelisted ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-700 hover:bg-green-100'}">${isWhitelisted ? 'Whitelisted' : 'Whitelist'}</button>
                                <button data-action="update-roster" data-guard-id="${guard.id}" data-list-type="blacklist" class="px-3 py-1 rounded-full text-xs font-semibold transition-colors ${isBlacklisted ? 'bg-red-200 text-red-800' : 'bg-gray-200 text-gray-700 hover:bg-red-100'}">${isBlacklisted ? 'Blacklisted' : 'Blacklist'}</button>
                            </div>
                        </div>
                        `;
                    }).join('')}
                </div>
            </div>
        </div>
    `;
};