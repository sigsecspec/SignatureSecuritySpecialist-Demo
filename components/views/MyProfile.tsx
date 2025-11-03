
import { Icons } from '../Icons.js';
import { UserRole } from '../../types.js';

export const MyProfile = ({ user }) => `
    <div class="animate-in max-w-3xl mx-auto" style="opacity: 0;">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h1 class="text-3xl font-bold text-[var(--color-text-base)]">My Profile</h1>
            <div class="flex items-center gap-2 mt-4 sm:mt-0">
                <button data-action="open-user-details" data-id="${user.id}" class="flex items-center gap-2 px-4 py-2 text-sm bg-[var(--color-bg-surface-raised)] text-[var(--color-text-base)] font-semibold rounded-md hover:bg-[var(--color-border)] transition-colors">
                    ${Icons.Pencil({ className: "w-4 h-4" })}
                    Edit Profile
                </button>
                <button data-action="open-history-modal" data-id="${user.id}" class="flex items-center gap-2 px-4 py-2 text-sm bg-[var(--color-bg-surface-raised)] text-[var(--color-text-base)] font-semibold rounded-md hover:bg-[var(--color-border)] transition-colors">
                    ${Icons.ClipboardList({ className: "w-4 h-4" })}
                    View History
                </button>
            </div>
        </div>
        <div class="bg-[var(--color-bg-surface)] p-6 border border-[var(--color-border)] rounded-lg shadow-sm">
            <div class="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
                <div class="w-24 h-24 rounded-full bg-[var(--color-bg-surface-raised)] border border-[var(--color-border)] flex items-center justify-center flex-shrink-0">
                    ${Icons.User({ className: "w-12 h-12 text-[var(--color-text-muted)]" })}
                </div>
                <div>
                    <h2 class="text-2xl font-bold text-[var(--color-text-base)] text-center sm:text-left">${user.firstName} ${user.lastName}</h2>
                    <p class="text-[var(--color-text-muted)] text-center sm:text-left">${user.email}</p>
                </div>
            </div>
            <div class="space-y-4">
                <div class="flex justify-between items-center bg-[var(--color-bg-surface-raised)] p-3 rounded-md"><span class="font-medium text-[var(--color-text-muted)]">Role:</span><span class="font-semibold text-[var(--color-text-base)]">${user.role}</span></div>
                <div class="flex justify-between items-center bg-[var(--color-bg-surface-raised)] p-3 rounded-md"><span class="font-medium text-[var(--color-text-muted)]">Rank:</span><span class="font-semibold text-[var(--color-text-base)]">${user.rank}</span></div>
                ${user.role !== UserRole.Client ? `
                <div class="flex justify-between items-center bg-[var(--color-bg-surface-raised)] p-3 rounded-md"><span class="font-medium text-[var(--color-text-muted)]">Level:</span><span class="px-3 py-1 text-sm font-semibold rounded-full bg-[var(--color-secondary)] text-[var(--color-secondary-text)]">${user.level}</span></div>
                <div class="flex justify-between items-center bg-[var(--color-bg-surface-raised)] p-3 rounded-md"><span class="font-medium text-[var(--color-text-muted)]">Performance Rating:</span><span class="font-semibold text-[var(--color-accent)]">${user.performanceRating.toFixed(2)} / 5.00</span></div>
                <div class="flex justify-between items-center bg-[var(--color-bg-surface-raised)] p-3 rounded-md"><span class="font-medium text-[var(--color-text-muted)]">Weekly Hours:</span><span class="font-semibold text-[var(--color-text-base)]">${user.weeklyHours.toFixed(1)} / 40</span></div>
                <div class="bg-[var(--color-bg-surface-raised)] p-3 rounded-md">
                    <span class="font-medium text-[var(--color-text-muted)]">Certifications:</span>
                    <div class="flex flex-wrap gap-2 mt-2">${user.certifications.length > 0 ? user.certifications.map(cert => `<span class="px-2 py-1 text-xs bg-[var(--color-bg-base)] text-[var(--color-text-muted)] rounded-md border border-[var(--color-border)]">${cert}</span>`).join('') : 'None'}</div>
                </div>
                `: ''}
            </div>
        </div>
    </div>
`;
