import { getClients, getSites } from '../../database.js';
import { Icons } from '../Icons.js';

export const MySites = ({ user }) => {
    const client = getClients().find(c => c.userId === user.id);
    const sites = client ? getSites().filter(s => s.clientId === client.id) : [];
    return `
         <div class="animate-in" style="opacity: 0;">
            <h1 class="text-3xl font-bold text-[var(--color-text-base)] mb-6">My Sites</h1>
             <div class="space-y-4">
                ${sites.map(site => `<div class="bg-[var(--color-bg-surface)] p-4 border border-[var(--color-border)] rounded-lg shadow-sm"><p class="font-bold text-[var(--color-text-base)]">${site.name}</p><p class="text-sm text-[var(--color-text-muted)]">${site.address}</p></div>`).join('')}
                 <button data-action="open-site-modal" class="w-full text-center p-4 border-2 border-dashed border-[var(--color-border)] rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-bg-surface-raised)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors flex items-center justify-center">${Icons.PlusCircle({className: "w-5 h-5 mr-2"})} Add New Site for Approval</button>
            </div>
        </div>
    `;
};