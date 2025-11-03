

import { getNeedsUniformUsers } from '../../database.js';

export const UniformDistribution = ({ user }) => {
    const usersNeedingUniforms = getNeedsUniformUsers(user.teamId);

    return `
        <div class="animate-in" style="opacity: 0;">
            <h1 class="text-3xl font-bold text-[var(--color-text-base)] mb-6">Uniform Distribution</h1>
            <div class="bg-[var(--color-bg-surface)] shadow-md rounded-lg overflow-hidden border border-[var(--color-border)]">
                <table class="min-w-full leading-normal">
                    <thead class="bg-[var(--color-bg-surface-raised)]">
                        <tr class="text-left text-[var(--color-text-muted)] uppercase text-sm">
                            <th class="px-5 py-3 font-semibold">Name</th>
                            <th class="px-5 py-3 font-semibold">Role</th>
                            <th class="px-5 py-3 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-[var(--color-border)]">
                        ${usersNeedingUniforms.length > 0 ? usersNeedingUniforms.map(u => `
                            <tr class="hover:bg-[var(--color-bg-surface-raised)]">
                                <td class="px-5 py-4 text-sm"><p class="text-[var(--color-text-base)] font-semibold">${u.firstName} ${u.lastName}</p></td>
                                <td class="px-5 py-4 text-sm text-[var(--color-text-muted)]">${u.role}</td>
                                <td class="px-5 py-4 text-sm">
                                    <button data-action="mark-uniform-sent" data-id="${u.id}" class="px-3 py-1 bg-[var(--color-secondary)] text-[var(--color-secondary-text)] rounded-md text-sm font-semibold hover:bg-[var(--color-secondary-hover)]">Mark as Sent</button>
                                </td>
                            </tr>
                        `).join('') : `
                            <tr>
                                <td colspan="3" class="text-center p-6 text-[var(--color-text-muted)]">No users currently need a uniform.</td>
                            </tr>
                        `}
                    </tbody>
                </table>
            </div>
        </div>
    `;
};