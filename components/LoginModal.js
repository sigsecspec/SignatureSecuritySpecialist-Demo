
import { Icons } from './Icons.js';
import { UserRole } from '../types.js';

export const LoginModal = ({ users }) => {
    const sortedUsers = [...users].sort((a, b) => {
        const order = Object.values(UserRole);
        return order.indexOf(a.role) - order.indexOf(b.role);
    });
    return `
        <div class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in" data-action="close-modal-backdrop" style="animation-name: fadeIn;">
            <div class="relative bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-lg shadow-2xl w-full max-w-md" data-modal-content>
                <div class="p-8">
                    <div class="text-center mb-6">
                        <div class="inline-block p-3 bg-[var(--color-accent)]/10 rounded-full mb-3">
                           ${Icons.Shield({ className: 'w-10 h-10 mx-auto text-[var(--color-accent)]' })}
                        </div>
                        <h1 class="text-2xl font-bold text-[var(--color-text-base)]">Command Portal Access</h1>
                        <p class="text-[var(--color-text-muted)] mt-1">Select user profile to authenticate</p>
                    </div>
                    <div class="space-y-3 max-h-[60vh] overflow-y-auto pr-2 -mr-2">
                        ${sortedUsers.map(user => `
                            <button data-action="login" data-id="${user.email}" class="w-full flex items-center text-left bg-[var(--color-bg-surface-raised)] hover:bg-[var(--color-border)] border border-transparent hover:border-[var(--color-accent)] text-[var(--color-text-base)] p-3 rounded-lg transition-all duration-200">
                                <div class="flex-grow">
                                    <p class="font-semibold">${user.firstName} ${user.lastName}</p>
                                    <p class="text-xs text-[var(--color-text-muted)]">${user.role}</p>
                                </div>
                                <div class="ml-auto text-right flex-shrink-0">
                                    ${user.role !== UserRole.Client ? `<span class="px-2 py-0.5 text-xs font-semibold rounded-full bg-[var(--color-secondary)] text-[var(--color-secondary-text)]">Lvl ${user.level}</span>` : ''}
                                </div>
                            </button>
                        `).join('')}
                    </div>
                </div>
                <button data-action="close-modal" class="absolute top-4 right-4 text-[var(--color-text-muted)] hover:text-[var(--color-text-base)] transition-colors rounded-full p-1">
                    ${Icons.X({ className: 'w-6 h-6' })}
                </button>
            </div>
        </div>
    `;
};
