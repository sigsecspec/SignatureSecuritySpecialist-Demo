import { Icons } from '../Icons.js';

export const LiveControl = ({ user }) => `
    <div class="animate-in" style="opacity: 0;">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h1 class="text-3xl font-bold text-[var(--color-text-base)]">Live Control Panel</h1>
            <div class="flex items-center gap-2">
                <button data-action="open-dispatch-guard-modal" class="px-4 py-2 flex items-center gap-2 bg-[var(--color-secondary)] text-[var(--color-secondary-text)] font-semibold rounded-md hover:bg-[var(--color-secondary-hover)] transition-colors">
                    ${Icons.Map({ className: "w-5 h-5" })} Dispatch Guard
                </button>
                <button data-action="alert-all" class="px-4 py-2 flex items-center gap-2 bg-red-800/80 text-red-100 font-semibold rounded-md hover:bg-red-700/80 transition-colors">
                    ${Icons.Bell({ className: "w-5 h-5" })} Alert All
                </button>
            </div>
        </div>
        
        <div class="bg-[var(--color-bg-surface)] p-6 border border-[var(--color-border)] rounded-lg shadow-sm mb-6 h-96 flex items-center justify-center text-center">
            <div>
                 ${Icons.Map({ className: 'w-24 h-24 mx-auto text-[var(--color-text-inactive)] mb-4' })}
                 <h3 class="text-lg font-semibold text-[var(--color-text-base)]">Live Operations Map</h3>
                 <p class="text-sm text-[var(--color-text-muted)]">A live map showing all active personnel and sites would be displayed here.</p>
                 <p class="text-xs text-[var(--color-text-inactive)] mt-1">(Clicking map pins would show details)</p>
            </div>
        </div>
        
        <div>
            <h2 class="text-xl font-bold text-[var(--color-text-base)] mb-4">Live Activity Feed</h2>
            <div class="bg-[var(--color-bg-surface)] shadow-md rounded-lg overflow-hidden border border-[var(--color-border)]">
                <table class="min-w-full leading-normal">
                    <thead class="bg-[var(--color-bg-surface-raised)]"><tr class="text-left text-[var(--color-text-muted)] uppercase text-sm"><th class="px-5 py-3 font-semibold">Time</th><th class="px-5 py-3 font-semibold">User</th><th class="px-5 py-3 font-semibold">Action</th><th class="px-5 py-3 font-semibold text-right">Controls</th></tr></thead>
                    <tbody class="divide-y divide-[var(--color-border)]">
                        <!-- Placeholder Row -->
                        <tr>
                            <td class="px-5 py-4 text-sm text-[var(--color-text-muted)]">${new Date().toLocaleTimeString()}</td>
                            <td class="px-5 py-4 text-sm text-[var(--color-text-base)]">James Lyons</td>
                            <td class="px-5 py-4 text-sm text-[var(--color-text-muted)]">Checked in at Site Alpha</td>
                            <td class="px-5 py-4 text-sm text-right space-x-2">
                                <button class="font-semibold text-[var(--color-accent)] hover:underline">Track</button>
                                <button class="font-semibold text-[var(--color-text-muted)] hover:underline">Message</button>
                            </td>
                        </tr>
                         <tr>
                            <td colspan="4" class="text-center p-8 text-[var(--color-text-muted)]">Live feed would display here...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
`;